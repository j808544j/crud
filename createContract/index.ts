import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { client, getContractCollection } from "../db";
import { schema } from "./schema";
import auth from "../auth";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  auth(context, req, async () => {
    try {
      const { error, value } = schema.validate(req.body);

      if (error) {
        context.res = {
          status: 400,
          body: "Invalid request data. " + error,
        };
      } else {
        const collection = await getContractCollection();
        const existingDocument = await collection.findOne(value);

        if (!existingDocument) {
          const result = await collection.insertOne(value);
          context.res = {
            status: 200,
            success: true,
            body: `ContractID : ${result.insertedId}`,
          };
        } else {
          context.res = {
            status: 409,
            success: false,
            body: "Document already exists",
          };
        }
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
  });
};

export default httpTrigger;
