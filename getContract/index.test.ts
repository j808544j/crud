import { Context, HttpRequest } from "@azure/functions";
import httpTrigger from "./index";

describe("get Contract by providing id in url", () => {
  let context: Context;
  let request: HttpRequest;

  beforeEach(() => {
    context = { log: () => {} } as unknown as Context;
    request = { query: {} } as unknown as HttpRequest;
  });

  test("when id exists in DB", async () => {
    request.params = { id: "642e63a44242ad5c367142e0" };
    await httpTrigger(context, request);
    expect(context.res.status).toMatch("200");
  });
  test("when id does not exist in DB", async () => {
    request.params = { id: "642e63a44242ad5c367142e1" };
    await httpTrigger(context, request);
    expect(context.res.status).toMatch("404");
    expect(context.res.body).toMatch("Document Not found");
  });
});
