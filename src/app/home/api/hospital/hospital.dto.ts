export interface HospitalOutputDto {
  id: number;
  created_at: string;
  name: string;
  searchkey: string;
  latitude: number;
  longitude: number;
  imageurls: string[];
  id_surgeries: number[];
  id_unique: number;
  location: string;
}
