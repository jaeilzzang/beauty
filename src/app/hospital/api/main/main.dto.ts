export interface HospitalDetailMainInputDto {
  id: string;
}

export interface HospitalDetails {
  etc: string;
  tel: string;
  blog: string;
  ticktok: string;
  youtube: string;
  facebook: string;
  homepage: string;
  snapchat: string;
  instagram: string;
  kakaotalk: string;
}

export interface Hospital {
  imageurls: string[];
  name: string;
  hospital_details: HospitalDetails;
}

export interface HospitalDetailMainOutput {
  data: Hospital[];
}
