export interface HospitalBeautyData {
  id: number;
  name: string;
  imageurls: string[];
}

export interface HospitalBeautyOutputDto {
  data: HospitalBeautyData[];
}
