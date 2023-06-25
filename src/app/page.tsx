import CarbonIntensity from "@/module/CarbonIntensity";
import { getRegionalByName } from "@/service/CarbonIntensity";

async function getInitialRegionalData() {
  return await getRegionalByName("england");
}

export default async function Home() {
  // Get the default regional data serverside.
  const region = await getInitialRegionalData();

  return (
    <main className="grid grid-cols-4 row-auto gap-12 md:grid-cols-8 lg:grid-cols-12">
      <div className="my-12 col-span-full place-self-center">
        <h1 className="text-5xl font-bold md:text-6xl" data-testid="heading">
          Carbon intensity
        </h1>
      </div>
      <CarbonIntensity initialRegion={region} />
    </main>
  );
}
