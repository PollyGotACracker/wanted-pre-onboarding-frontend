import { rest } from "msw";
import { setupServer } from "msw/node";
import { authServices, todoServices } from "./handlers";

const authServer = setupServer(...authServices);
const todoServer = setupServer(...todoServices);

export { authServer, todoServer, rest };
