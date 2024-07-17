export interface HospitalBeautyData {
  id: number;
  name: string;
  imageurls: string[];
  id_unique: string;
}

export interface HospitalLocationInputDto {
  locationNum: string;
}

export interface HospitalLocationOutputDto {
  total: number;
  data: HospitalBeautyData[];
}
