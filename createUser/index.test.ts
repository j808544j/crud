import { Context, HttpRequest } from "@azure/functions";
import httpTrigger from "./index";

describe("CreateUser", () => {
  let context: Context;
  let request: HttpRequest;

  beforeEach(() => {
    context = { log: () => {} } as unknown as Context;
    request = { query: {} } as unknown as HttpRequest;
  });

  test("if new user created return 200", async () => {
    request.body = {
      username: "dinesh4",
      password: "password",
    };
    await httpTrigger(context, request);
    expect(context.res.status).toMatch("200");
  });
  test("if invalid user input", async () => {
    request.body = {
      username: "",
      password: "",
    };
    await httpTrigger(context, request);
    expect(context.res.status).toMatch("400");
  });
});
