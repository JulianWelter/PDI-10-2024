import { Elysia } from "elysia";
import userRoutes from "./controllers/UserController";

const app = new Elysia()

app.group('/v1', (app)=> app.use(userRoutes))
.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
