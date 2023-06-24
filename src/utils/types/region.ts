import { IntensityIndexEnum } from "../enum/intensityIndexEnum";

// Used with https://api.carbonintensity.org.uk/regional/{county}
export interface Regional {
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
  intensity: Intensity;
  to: string;
}

export interface Generationmix {
  fuel: string;
  perc: number;
}

export interface Intensity {
  forecast: number;
  index: IntensityIndexEnum;
}
