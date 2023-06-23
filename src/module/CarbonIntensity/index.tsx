"use client";
import Dropdown from "@/components/Select";
import Table from "@/components/Table";
import { getRegionalByName } from "@/service/CarbonIntensity";
import { RegionalFromTo } from "@/utils/types/region";
import { Fragment, useState } from "react";

export default function CarbonIntensity({
  defaultData,
}: {
  defaultData: RegionalFromTo;
}) {
  const [currentRegion, setCurrentRegion] = useState(defaultData);
  const regions = ["england", "scotland", "wales"] as const;

  const handleChange = async (value: (typeof regions)[number]) => {
    const currentRegionData = await getRegionalByName(value);
    setCurrentRegion(currentRegionData);
  };

  return (
    <>
      <div className="col-span-2 col-start-3 md:col-start-7 lg:col-start-9 md:col-span-full">
        <div className="pr-6">
          <Dropdown
            label={"Select a country"}
            options={regions}
            placeholder="Choose a country"
            onChange={async (event) => {
              await handleChange(
                event.target.value as (typeof regions)[number]
              );
            }}
          />
        </div>
      </div>
      <div className="col-span-full">
        <Table
          tableRowHeadings={
            <>
              {currentRegion.data.map((region) => (
                <Fragment key={`${region.regionid}`}>
                  <tr>
                    <Table.TableHead>Dnoregion</Table.TableHead>
                    <Table.TableHead>Shortname</Table.TableHead>
                    <Table.TableHead>Intensity</Table.TableHead>
                  </tr>
                </Fragment>
              ))}
            </>
          }
          tableRowBody={
            <>
              {currentRegion.data.map((region) => (
                <Fragment key={`${region.regionid}`}>
                  {region.data.map((regionData, index) => (
                    <Fragment key={`${regionData.intensity.forecast}-${index}`}>
                      <tr>
                        <Table.TableData>{region.dnoregion}</Table.TableData>
                        <Table.TableData>{region.shortname}</Table.TableData>
                        <Table.TableData>
                          {regionData.intensity.forecast}
                        </Table.TableData>
                      </tr>
                    </Fragment>
                  ))}
                </Fragment>
              ))}
            </>
          }
        />
      </div>
    </>
  );
}
