export interface HospitalBeautyData {
  id: number;
  name: string;
  imageurls: string[];
}

export interface HospitalLocationInputDto {
  locationNum: string;
}

export interface HospitalLocationOutputDto {
  total: number;
  data: HospitalBeautyData[];
}
