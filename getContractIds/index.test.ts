import { Context, HttpRequest } from "@azure/functions";
import httpTrigger from "./index";

describe("get Contract IDs", () => {
  let context: Context;
  let request: HttpRequest;

  beforeEach(() => {
    context = { log: () => {} } as unknown as Context;
    request = { query: {} } as unknown as HttpRequest;
  });

  test("returns all ids present in DB with code 200", async () => {
    await httpTrigger(context, request);
    expect(context.res.status).toMatch("200");
  });
});
