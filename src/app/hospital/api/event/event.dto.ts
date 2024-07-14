export interface HospitalDetailEventInputDto {
  id: string;
}

export interface HospitalDetailEventOutDto {
  map: string;
  tel: string;
  desc_address: string;
  desc_openninghour: string;
  desc_facilities: string;
  desc_doctors_imgurls: string[];
  id_hospital: number;
  etc: string;
}
