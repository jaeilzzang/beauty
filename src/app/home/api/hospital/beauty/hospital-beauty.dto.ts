export interface HospitalBeautyData {
  id: number;
  name: string;
  imageurls: string[];
  id_unique: string;
}

export interface HospitalBeautyOutputDto {
  data: HospitalBeautyData[];
}
