export interface HospitalDetailReviewInputDto {
  id: string;
}

export interface HospitalDetailReviewOutDto {
  map: string;
  tel: string;
  desc_address: string;
  desc_openninghour: string;
  desc_facilities: string;
  desc_doctors_imgurls: string[];
  id_hospital: number;
  etc: string;
}
