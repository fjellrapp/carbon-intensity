"use client";
import PieChartSimple from "@/components/Charts/PieChart";
import Dialog from "@/components/Dialog";
import Dropdown from "@/components/Select";
import Table from "@/components/Table";
import { getRegionalByName } from "@/service/CarbonIntensity";
import { readonlyRegions } from "@/utils/constants/regions";
import { IntensityIndexEnum } from "@/utils/enum/intensityIndexEnum";
import { Region, Regional } from "@/utils/types/region";
import { Fragment, useState } from "react";
import { ImSpinner2 } from "react-icons/im";

/**
 * The main module for displaying the table and the modal.
 */
export default function CarbonIntensity({
  initialRegion,
}: {
  initialRegion: Regional;
}) {
  const [currentRegion, setCurrentRegion] = useState(initialRegion);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);

  // Generates a type from readonlyRegions
  type RegionType = (typeof readonlyRegions)[number];

  const handleChange = async (value: RegionType) => {
    setIsLoading(true);
    const currentRegionData = await getRegionalByName(value);
    setIsLoading(false);
    setCurrentRegion(currentRegionData);
  };

  const handleRowSelect = (region: Region) => {
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
    const { data } = selectedRegion;

    return (
      <div className="flex flex-col items-center gap-4">
        <p className="text-lg font-bold">Current carbon intensity</p>

        {data.map((regionData, index) => (
          <span
            className={`text-2xl font-bold ${getColorIntensity(
              regionData.intensity.index
            )}`}
            key={`${regionData}-${index}`}
          >
            {regionData.intensity.forecast}
          </span>
        ))}
        <small className="text-gray-500 ">
          <sub>g</sub>CO<sub>2</sub>/kWh
        </small>
      </div>
    );
  };

  const CarbonIntensityGenerationmixChart = () => {
    if (!selectedRegion) {
      return null;
    }
    const { shortname, data } = selectedRegion;
    return (
      <>
        {data.map((regionData, index) => (
          <PieChartSimple
            dataKey="perc"
            data={regionData.generationmix}
            key={`chart-${shortname}-${index}`}
          />
        ))}
      </>
    );
  };

  return (
    <>
      <div className="col-span-2 col-start-3 md:col-start-7 lg:col-start-9 md:col-span-full">
        <div className="pr-6">
          <Dropdown
            label={"Select a country"}
            options={readonlyRegions}
            onChange={async (event) => {
              await handleChange(event.target.value as RegionType);
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
            tableRowHeadings={
              <>
                {currentRegion.data.map((region) => (
                  <Fragment key={`${region.regionid}`}>
                    <Table.TableRow isTableHead>
                      <Table.TableHead>Dnoregion</Table.TableHead>
                      <Table.TableHead>Shortname</Table.TableHead>
                      <Table.TableHead>Intensity</Table.TableHead>
                    </Table.TableRow>
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
                        <Table.TableRow onClick={() => handleRowSelect(region)}>
                          <Table.TableData>{region.dnoregion}</Table.TableData>
                          <Table.TableData>{region.shortname}</Table.TableData>
                          <Table.TableData>
                            {regionData.intensity.forecast}
                          </Table.TableData>
                        </Table.TableRow>
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
          <CarbonIntensityGenerationmixChart />
        </Dialog>
      )}
    </>
  );
}
