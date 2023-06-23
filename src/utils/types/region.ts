export interface RegionalFromTo {
  data: Array<{
    data: RegionData[];
    dnoregion: string;
    regionid: number;
    shortname: string;
  }>;
}

export interface RegionData {
  from: string;
  generationmix: Array<Generationmix>;
  intensity: {
    forecast: number;
    index: string;
  };
  to: string;
}

export interface Generationmix {
  fuel: string;
  perc: number;
}
