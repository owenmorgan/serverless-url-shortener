import { _500, _404, _200 } from "../../utils/api";
import { APIGatewayEvent } from "aws-lambda";
import { getShortUrl, incrementClick } from "../../utils/dynamodb";

export async function handler(
  ev: APIGatewayEvent
): Promise<{ statusCode: number; body?: string; headers: any }> {
  try {
    console.log(JSON.stringify(ev));
    const b = JSON.parse(ev.body as string);
    const id = b.id;
    console.log(`got id ${id}`);

    const su = await getShortUrl(id);
    console.log(JSON.stringify(su));
    if (su) {
      console.log(`incrementing ${id}`);
      await incrementClick(su);
    }
    return _200({});
  } catch (error) {
    console.log((error as Error).message);
    return _500();
  }
}
