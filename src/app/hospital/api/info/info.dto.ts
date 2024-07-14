export interface HospitalDetailInfoInputDto {
  id: string;
}

export interface HospitalDetailInfoOutDto {
  map: string;
  tel: string;
  desc_address: string;
  desc_openninghour: string;
  desc_facilities: string;
  desc_doctors_imgurls: string[];
  id_hospital: number;
  etc: string;
}
