"use client";

import { getHospitalReviewAPI } from "@/app/api/hospital/[id]/review";
import LoadingSpinner from "@/components/atoms/loading/spinner";
import { ReviewCard } from "@/components/molecules/card";
import { useInfinity } from "@/hooks/useInfinity";
import { useParams } from "next/navigation";
import { useRef, Fragment } from "react";

const ReviewTab = () => {
  const { id }: { id: string } = useParams();
  const observerElem = useRef<HTMLDivElement>(null);

  const { data, error, isFetching, isFetchingNextPage, status } = useInfinity({
    observerElem,
    queryKey: ["hospital_detail", id],
    fetchFn: (pageParam) => getHospitalReviewAPI({ id, pageParam }),
  });

  if (!data || status === "pending") return <LoadingSpinner />;

  if (error && status === "error") return <div>Error: {error.message}</div>;

  return (
    <>
      {data.pages.map((item, i) => (
        <Fragment key={i}>
          {item.data.map(
            ({ id_unique, reviewimageurls, description, user, hospital }) => (
              <ReviewCard
                key={id_unique}
                src={reviewimageurls[0]}
                alt="thumbnail"
                content={description}
                id={user?.nickname || ""}
                name={hospital.name}
              />
            )
          )}
        </Fragment>
      ))}
      {isFetching && isFetchingNextPage ? (
        <LoadingSpinner />
      ) : (
        <div ref={observerElem}></div>
      )}
    </>
  );
};

export default ReviewTab;
