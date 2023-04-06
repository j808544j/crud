import { Context, HttpRequest } from "@azure/functions";
import * as jwt from "jsonwebtoken";

export default function auth(
  context: Context,
  req: HttpRequest,
  next: () => void
) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new Error("Authorization header missing");
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      throw new Error("Token missing from Authorization header");
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET environment variable not set");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded", decoded);
    next();
  } catch (error) {
    context.res = {
      status: 401,
      body: "Unauthorized" + `${error}`,
    };
  }
}
