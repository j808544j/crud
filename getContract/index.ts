import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { client, getContractCollection } from "../db";
const { ObjectId } = require("mongodb");

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    const collection = await getContractCollection();
    const document = await collection.findOne({
      _id: new ObjectId(req.params.id),
    });
    if (document) {
      context.res = {
        status: "200",
        success: true,
        body: document,
      };
    } else {
      context.res = {
        status: "404",
        success: false,
        body: "Document Not found",
      };
    }
  } catch (err) {
    context.res = {
      status: "500",
      success: false,
      body: "Internal server error" + `${err}`,
    };
  } finally {
    await client.close();
  }
};

export default httpTrigger;
