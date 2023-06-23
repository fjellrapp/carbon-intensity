import { RegionalFromTo } from "@/utils/types/region";

export async function getRegional(): Promise<RegionalFromTo> {
  try {
    const response = await fetch("https://api.carbonintensity.org.uk/regional");
    const data = await response.json();
    return data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw e;
    }
    throw new Error(`Unknown error ${e}`);
  }
}

export async function getRegionalByName(
  name: "england" | "scotland" | "wales"
): Promise<RegionalFromTo> {
  try {
    const response = await fetch(
      `https://api.carbonintensity.org.uk/regional/${name}`
    );
    const data = (await response.json()) as RegionalFromTo;
    return data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw e;
    }
    throw new Error(`Unknown error ${e}`);
  }
}
