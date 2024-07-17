export interface HospitalDetailEventInputDto {
  id: string;
}

export interface HospitalDetailEventData {
  id: number;
  created_at: string;
  date_from: string;
  date_to: string;
  id_hospital: number;
  name: string;
  imageurls: string[];
  image_desc_urls: string[];
  id_surgeries: number[];
  description: string;
  id_unique: number;
}

export interface HospitalDetailEventOutDto {
  data: HospitalDetailEventData[];
  count: number;
}
