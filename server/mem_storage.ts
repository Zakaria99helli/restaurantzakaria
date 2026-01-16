import { users, orders, type User, type InsertUser, type Order, type InsertOrder } from "../shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

export class MemStorage {
    private users: Map<string, User>;
    private orders: Map<string, Order>;
    sessionStore: session.Store;
    currentId: number;

    constructor() {
        this.users = new Map();
        this.orders = new Map();
        this.currentId = 1;
        this.sessionStore = new MemoryStore({
            checkPeriod: 86400000,
        });
    }

    async getUser(id: string): Promise<User | undefined> {
        return this.users.get(id);
    }

    async getUserByUsername(username: string): Promise<User | undefined> {
        return Array.from(this.users.values()).find(
            (user) => user.username === username,
        );
    }

    async getUsers(): Promise<User[]> {
        return Array.from(this.users.values());
    }

    async createUser(insertUser: InsertUser): Promise<User> {
        const id = (this.currentId++).toString();
        const user: User = {
            ...insertUser,
            id,
            role: insertUser.role || "staff",
            isAdmin: "false"
        };
        this.users.set(id, user);
        return user;
    }

    async updateUser(id: string, update: Partial<User>): Promise<User | undefined> {
        const user = await this.getUser(id);
        if (!user) return undefined;
        const updatedUser = { ...user, ...update };
        this.users.set(id, updatedUser);
        return updatedUser;
    }

    async deleteUser(id: string): Promise<boolean> {
        return this.users.delete(id);
    }

    async createOrder(insertOrder: InsertOrder): Promise<Order> {
        const id = (this.currentId++).toString();
        const order: Order = {
            ...insertOrder,
            id,
            status: "pending",
            createdAt: new Date(),
            items: insertOrder.items
        };
        this.orders.set(id, order);
        return order;
    }

    async getOrders(): Promise<Order[]> {
        return Array.from(this.orders.values()).sort((a, b) =>
            (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)
        );
    }

    async getOrder(id: string): Promise<Order | undefined> {
        return this.orders.get(id);
    }

    async updateOrderStatus(id: string, status: string): Promise<Order | undefined> {
        const order = await this.getOrder(id);
        if (!order) return undefined;
        const updatedOrder = { ...order, status };
        this.orders.set(id, updatedOrder);
        return updatedOrder;
    }

    async archiveOrder(id: string): Promise<Order | undefined> {
        const order = await this.getOrder(id);
        if (!order) return undefined;
        const updatedOrder = { ...order, status: "archived" };
        this.orders.set(id, updatedOrder);
        return updatedOrder;
    }

    async getArchivedOrders(): Promise<Order[]> {
        return Array.from(this.orders.values())
            .filter(order => order.status === "archived")
            .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
    }
}
