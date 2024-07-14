export interface HospitalDetailMainInputDto {
  id: string;
}

export interface HospitalDetailMainOutput {
  data: {
    kakaotalk: string;
    facebook: string;
    instagram: string;
    blog: string;
    youtube: string;
    ticktok: string;
    snapchat: string;
    etc: string;
    tell: string;
    homepage: string;
    hospital: {
      imageurls: string[];
    };
  }[];
}
