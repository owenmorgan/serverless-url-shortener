import { redirect, _500, _404 } from "../../utils/api";
import { APIGatewayEvent } from "aws-lambda";

export async function handler(
  ev: APIGatewayEvent
): Promise<{ statusCode: number; body?: string; headers: any }> {
  try {
    return redirect('https://www.jelifish.co.uk/');
  } catch (error) {
    console.log((error as Error).message);
    return _500();
  }
}
