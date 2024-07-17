export interface LocationData {
  id_unique: string;
  imageurls: string[];
  name: string;
  location: string;
  latitude: number;
  longitude: number;
}

export interface LocationOutputDto {
  data: LocationData[];
  count: number;
}
