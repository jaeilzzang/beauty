import { ReviewCard } from "@/components/molecules/card";
import { getHospitalReviewAPI } from "@/app/api/hospital/[id]/review";

interface ReviewTabProps {
  id: string;
}

const ReviewTab = async ({ id }: ReviewTabProps) => {
  const { data, count } = await getHospitalReviewAPI({ id });

  // console.log(data, "event");

  return (
    <>
      {data.map((e) => (
        <ReviewCard
          key={e.id_unique}
          src={e.reviewimageurls[0]}
          alt="thumbnail"
          content={e.description}
          id={e.user?.nickname || ""}
          name={e.hospital.name}
        />
      ))}
    </>
  );
};

export default ReviewTab;
