"use client";
import Dialog from "@/components/Dialog";
import Dropdown from "@/components/Select";
import Table from "@/components/Table";
import TableRow from "@/components/Table/TableRow";
import { getRegionalByName } from "@/service/CarbonIntensity";
import { IntensityIndexEnum } from "@/utils/enum/intensityIndexEnum";
import { Region, RegionalFromTo } from "@/utils/types/region";
import { Fragment, useState } from "react";
import { ImSpinner2 } from "react-icons/im";

export default function CarbonIntensity({
  defaultData,
}: {
  defaultData: RegionalFromTo;
}) {
  const [currentRegion, setCurrentRegion] = useState(defaultData);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);

  const regions = ["england", "scotland", "wales"] as const;

  const handleChange = async (value: (typeof regions)[number]) => {
    setIsLoading(true);
    const currentRegionData = await getRegionalByName(value);
    setIsLoading(false);
    setCurrentRegion(currentRegionData);
  };

  const handleRowSelect = (region: Region) => {
    console.log(region);
    setSelectedRegion(region);
  };

  const getColorIntensity = (intensity: IntensityIndexEnum) => {
    switch (intensity) {
      case IntensityIndexEnum.veryLow:
        return "text-green-500";
      case IntensityIndexEnum.low:
        return "text-green-400";
      case IntensityIndexEnum.moderate:
        return "text-yellow-500";
      case IntensityIndexEnum.high:
        return "text-yellow-600";
      case IntensityIndexEnum.veryHigh:
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const CarbonIntensityInfo = () => {
    if (!selectedRegion) {
      return null;
    }
    const { dnoregion, shortname, data } = selectedRegion;

    return (
      <div className="flex flex-col items-center gap-4">
        <p className="text-xl font-bold">Current carbon intensity</p>

        {data.map((regionData, index) => (
          <span
            className={`text-lg font-bold ${getColorIntensity(
              regionData.intensity.index
            )}`}
            key={`${regionData}-${index}`}
          >
            {regionData.intensity.forecast}
          </span>
        ))}
      </div>
    );
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
      <div className="rounded-md col-span-full">
        {isLoading ? (
          <div className="flex items-center justify-center">
            <ImSpinner2 className="w-6 h-6 animate-spin" />
          </div>
        ) : (
          <Table
            onRowSelect={(event) => {}}
            tableRowHeadings={
              <>
                {currentRegion.data.map((region) => (
                  <Fragment key={`${region.regionid}`}>
                    <TableRow isTableHead>
                      <Table.TableHead>Dnoregion</Table.TableHead>
                      <Table.TableHead>Shortname</Table.TableHead>
                      <Table.TableHead>Intensity</Table.TableHead>
                    </TableRow>
                  </Fragment>
                ))}
              </>
            }
            tableRowBody={
              <>
                {currentRegion.data.map((region) => (
                  <Fragment key={`${region.regionid}`}>
                    {region.data.map((regionData, index) => (
                      <Fragment
                        key={`${regionData.intensity.forecast}-${index}`}
                      >
                        <TableRow onClick={() => handleRowSelect(region)}>
                          <Table.TableData>{region.dnoregion}</Table.TableData>
                          <Table.TableData>{region.shortname}</Table.TableData>
                          <Table.TableData>
                            {regionData.intensity.forecast}
                          </Table.TableData>
                        </TableRow>
                      </Fragment>
                    ))}
                  </Fragment>
                ))}
              </>
            }
          />
        )}
      </div>
      {selectedRegion && (
        <Dialog
          title={`${selectedRegion.dnoregion}`}
          onClose={() => setSelectedRegion(null)}
        >
          <CarbonIntensityInfo />
        </Dialog>
      )}
    </>
  );
}
