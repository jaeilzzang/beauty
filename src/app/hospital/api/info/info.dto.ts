export interface HospitalDetailInfoInputDto {
  id: string;
}

export interface HospitalInfo {
  id_unique: number;
  name: string;
  latitude: number;
  longitude: number;
}

export interface HospitalDetailInfo {
  hospital_details: {
    map: string;
    tel: string;
    desc_address: string;
    desc_openninghour: string;
    desc_facilities: string;
    desc_doctors_imgurls: string[];
    id_hospital: number;
    etc: string;
  };
}

export interface HospitalDetailInfoOutDto {
  data: Array<HospitalInfo & HospitalDetailInfo>;
}
