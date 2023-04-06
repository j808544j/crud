import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import * as bcrypt from "bcrypt";
import { client, getUserCollection } from "../db";
import { schema } from "./schema";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    const { error, value } = schema.validate(req.body);
    if (error) {
      context.res = {
        status: 400,
        body: "Invalid request data. " + error,
      };
    } else {
      const result = await AddUser(value);

      context.res = {
        status: 200,
        body: { message: `User created successfully - ${result.insertedId}` },
      };
    }
  } catch (error) {
    context.res = {
      status: 500,
      body: { message: "Internal server error" + `${error}` },
    };
  } finally {
    await client.close();
  }
};

async function AddUser(value) {
  const hashedPassword = await bcrypt.hash(value.password, 10);

  const user = {
    username: value.username,
    password: hashedPassword,
  };

  const collection = await getUserCollection();
  return await collection.insertOne(user);
}

export default httpTrigger;
