import { z } from "zod";

export const itemSchema = z.object({
  productId: z.string().min(1),
  quantity: z.number().int().min(1),
  price: z.number().nonnegative(),
  name: z.any().optional(),
  selectedExtras: z.array(z.string()).optional(),
  selectedRemovals: z.array(z.string()).optional(),
});

export const insertOrderSchema = z.object({
  tableNumber: z.string().min(1),
  items: z.array(itemSchema).min(1),
  total: z.number().nonnegative().optional(),
  notes: z.string().optional(),
});

export const orderSchema = insertOrderSchema.extend({
  id: z.string(),
  status: z.string(),
  createdAt: z.date().optional(),
});

export const insertUserSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
  role: z.string().optional(),
});

export const userSchema = insertUserSchema.extend({
  id: z.string(),
  isAdmin: z.boolean().optional(),
});

export type Item = z.infer<typeof itemSchema>;
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = z.infer<typeof orderSchema>;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = z.infer<typeof userSchema>;

export type SelectUser = User;