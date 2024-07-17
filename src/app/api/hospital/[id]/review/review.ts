export interface HospitalDetailReviewInputDto {
  id: string;
}

export interface ReviewData {
  id: number;
  created_at: string;
  id_event: number;
  id_hospital: number;
  id_surgeries: string[]; // Assuming the array contains strings, adjust if different
  reviewimageurls: string[]; // Assuming the array contains strings, adjust if different
  description: string;
  id_unique: number;
  user_no: number | null;

  hospital: { name: string };
  user: { nickname: string } | null;
}

export interface HospitalDetailReviewOutDto {
  data: ReviewData[];
  count: number;
}
