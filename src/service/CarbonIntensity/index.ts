import { Regional } from "@/utils/types/region";

export async function getRegionalByName(
  name: "england" | "scotland" | "wales"
): Promise<Regional> {
  try {
    const response = await fetch(
      `https://api.carbonintensity.org.uk/regional/${name}`
    );
    const data = (await response.json()) as Regional;
    return data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw e;
    }
    throw new Error(`Unknown error ${e}`);
  }
}
