import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import * as jwt from "jsonwebtoken";
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
        success: false,
        body: "Invalid request data. " + error,
      };
      return;
    }

    const { username, password } = value;
    const user = await validateUser(username, password);

    if (user) {
      const token = generateToken(user);
      context.res = { status: "200", success: true, body: token };
    } else {
      context.res = {
        status: "401",
        success: false,
        body: "Invalid username or password",
      };
    }
  } catch (err) {
    context.res = {
      status: 500,
      success: false,
      body: "Internal server error" + `${err}`,
    };
  } finally {
    await client.close();
  }
};

async function validateUser(
  username: string,
  password: string
): Promise<User | null> {
  const collection = await getUserCollection();
  const user = await collection.findOne({ username });

  if (user && bcrypt.compareSync(password, user.password)) {
    return { _id: user._id, username: user.username, password: user.password };
  } else {
    return null;
  }
}

function generateToken(user: User): string {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
}

interface User {
  _id: string;
  username: string;
  password: string;
}

export default httpTrigger;
