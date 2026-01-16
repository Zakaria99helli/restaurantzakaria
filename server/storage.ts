import { MemStorage } from "./mem_storage";
import type { User, InsertUser, Order, InsertOrder } from "../shared/schema";
import session from "express-session";

export interface IStorage {
    sessionStore: session.Store;
    getUser(id: string): Promise<User | undefined>;
    getUserByUsername(username: string): Promise<User | undefined>;
    getUsers(): Promise<User[]>;
    createUser(user: InsertUser): Promise<User>;
    updateUser(id: string, user: Partial<User>): Promise<User | undefined>;
    deleteUser(id: string): Promise<boolean>;
    createOrder(order: InsertOrder): Promise<Order>;
    getOrders(): Promise<Order[]>;
    getOrder(id: string): Promise<Order | undefined>;
    updateOrderStatus(id: string, status: string): Promise<Order | undefined>;
    archiveOrder(id: string): Promise<Order | undefined>;
    getArchivedOrders(): Promise<Order[]>;
}

export const storage = new MemStorage();
