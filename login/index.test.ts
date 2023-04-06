import { Context, HttpRequest } from "@azure/functions";
import httpTrigger from "./index";

describe("Login", () => {
  let context: Context;
  let request: HttpRequest;

  beforeEach(() => {
    context = { log: () => {} } as unknown as Context;
    request = { query: {} } as unknown as HttpRequest;
  });

  test("if user present in DB then return 200", async () => {
    request.body = {
      username: "dinesh1",
      password: "password",
    };
    await httpTrigger(context, request);
    expect(context.res.status).toMatch("200");
  });

  test("if user not present in DB then return 401", async () => {
    request.body = {
      username: "dinesh200",
      password: "password",
    };
    await httpTrigger(context, request);
    expect(context.res.status).toMatch("401");
    expect(context.res.body).toMatch("Invalid username or password");
  });
});
