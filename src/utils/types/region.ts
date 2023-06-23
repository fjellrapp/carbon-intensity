import { IntensityIndexEnum } from "../enum/intensityIndexEnum";

export interface RegionalFromTo {
  data: Array<Region>;
}

export interface Region {
  data: RegionData[];
  dnoregion: string;
  regionid: number;
  shortname: string;
}
export interface RegionData {
  from: string;
  generationmix: Array<Generationmix>;
  intensity: {
    forecast: number;
    index: IntensityIndexEnum;
  };
  to: string;
}

export interface Generationmix {
  fuel: string;
  perc: number;
}
