import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { prisma } from '../prisma/db';
import type { ApiResponse, HealthCheck, User } from "shared";

const app = new Elysia()
    .use(cors())
    .use(swagger())
    .get("/", async (): Promise<ApiResponse<HealthCheck & { userCount?: number }>> => {
        console.log("Health check. DATABASE_URL:", process.env.DATABASE_URL);
        let userCount = 0;
        try {
            userCount = await prisma.user.count();
        } catch (e) {
            console.error("Health check DB error:", e);
        }
        return {
            data: { status: "ok", userCount },
            message: "server running"
        }
    })
    .get("/users", async () => {
        console.log("Fetching users from DB...");
        try {
            const users = await prisma.user.findMany()
            console.log("Found", users.length, "users");
            const response: ApiResponse<User[]> = {
                data: users,
                message: "User list retrieved"
            }
            return response
        } catch (error) {
            console.error("Error fetching users:", error);
            return {
                data: [],
                message: "Error retrieving users"
            }
        }
    })
    .listen(3000);

console.log(`🦊 Backend → http://localhost:${app.server?.port}`);
console.log(`📖 Swagger → http://localhost:${app.server?.port}/swagger`);

export type App = typeof app;