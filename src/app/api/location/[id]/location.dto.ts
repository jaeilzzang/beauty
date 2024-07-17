export interface LocationDetailInputDto {
  id: string;
}

export interface LocationDetailData {
  id_unique: string;
  imageurls: string[];
  name: string;
  location: string;
  latitude: number;
  longitude: number;
}

export interface LocationDetailOutputDto {
  data: LocationDetailData[];
  count: number;
}
