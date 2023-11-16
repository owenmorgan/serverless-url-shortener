import { ShortURL } from "../types/shorturl";
import { DynamoDB } from "aws-sdk";

const linkTable = process.env.LINK_TABLE as string;

const dynamodb = new DynamoDB.DocumentClient();

export async function putShortUrl(shortURL: ShortURL): Promise<boolean> {
  if (!linkTable || linkTable == "") {
    throw new Error("'LINK_TABLE' Environment Variable Not Set");
  }
  await dynamodb
    .put({
      TableName: linkTable,
      Item: {
        type: "SHORT_URL",
        sk: `id#${shortURL.id}`,
        ...shortURL,
      },
      ConditionExpression: "attribute_not_exists(id)",
    })
    .promise();

  return true;
}

export async function getShortUrl(id: string): Promise<ShortURL | null> {
  if (!linkTable || linkTable == "") {
    throw new Error("'LINK_TABLE' Environment Variable Not Set");
  }
  try {
    const resp = await dynamodb
      .get({
        TableName: linkTable,
        Key: {
          type: "SHORT_URL",
          sk: `id#${id}`,
        },
      })
      .promise();
    return resp.Item as ShortURL;
  } catch (error) {}
  return null;
}

export async function incrementClick(shortURL: ShortURL): Promise<boolean> {
  if (!linkTable || linkTable == "") {
    throw new Error("'LINK_TABLE' Environment Variable Not Set");
  }
  shortURL.clicks++;
  console.log(JSON.stringify(shortURL));
  await dynamodb
    .put({
      TableName: linkTable,
      Item: {
        type: "SHORT_URL",
        sk: `id#${shortURL.id}`,
        ...shortURL,
      },
    })
    .promise();

  return true;
}
