import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import * as schema from '../shared/schema';

// استخدام Pool العادي لـ PostgreSQL المحلية في الساندبوكس
export const pool = new pg.Pool({
  connectionString: "postgresql://ubuntu:ubuntu@localhost:5432/restaurant_db",
});

export const db = drizzle(pool, { schema });
