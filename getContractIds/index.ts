import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { client, getContractCollection } from "../db";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    const collection = await getContractCollection();
    const documents = await collection.find({}).project({ _id: 1 }).toArray();
    context.res = {
      status: "200",
      success: true,
      body: documents,
    };
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
