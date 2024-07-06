import Image from "next/image";

// import styles from "../styles/review.module.scss";

import { ReviewCard } from "@/components/molecules/card";

const testContent = `이벤트 초과하는건 밑줄로 표현하기이벤트 초과하는건 밑줄로 표현하기
          이벤트 초과하는건 밑줄로 표현하기 이벤트 초과하는건 밑줄로 표현하기
          이벤트 초과하는건 밑줄로 표현하기 이벤트 초과하는건 밑줄로 표현하기
          이벤트 초과하는건 밑줄로 표현하기 이벤트 초과하는건 밑줄로 표현하기
          이벤트 초과하는건 밑줄로 표현하기 이벤트 초과하는건 밑줄로 표현하기
          이벤트 초과하는건 밑줄로 표현하기 이벤트 초과하는건 밑줄로 표현하기
          이벤트 초과하는건 밑줄로 표현하기 이벤트 초과하는건 밑줄로 표현하기
          이벤트 초과하는건 밑줄로 표현하기 이벤트 초과하는건 밑줄로 표현하기
          이벤트 초과하는건 밑줄로 표현하기 이벤트 초과하는건 밑줄로 표현하기
          이벤트 초과하는건 밑줄로 표현하기 이벤트 초과하는건 밑줄로 표현하기
          이벤트 초과하는건 밑줄로 표현하기 이벤트 초과하는건 밑줄로 표현하기`;

const ReviewTab = () => {
  return (
    <>
      <ReviewCard
        src={"/img/thumbnail.jpeg"}
        alt="thumbnail"
        content={testContent}
        id="id"
        name="name"
      />
      <ReviewCard
        src={"/img/thumbnail.jpeg"}
        alt="thumbnail"
        content={testContent}
        id="id"
        name="name"
      />
      <ReviewCard
        src={"/img/thumbnail.jpeg"}
        alt="thumbnail"
        content={testContent}
        id="id"
        name="name"
      />
      <ReviewCard
        src={"/img/thumbnail.jpeg"}
        alt="thumbnail"
        content={testContent}
        id="id"
        name="name"
      />
      <ReviewCard
        src={"/img/thumbnail.jpeg"}
        alt="thumbnail"
        content={testContent}
        id="id"
        name="name"
      />
      <ReviewCard
        src={"/img/thumbnail.jpeg"}
        alt="thumbnail"
        content={testContent}
        id="id"
        name="name"
      />
      <ReviewCard
        src={"/img/thumbnail.jpeg"}
        alt="thumbnail"
        content={testContent}
        id="id"
        name="name"
      />
      <ReviewCard
        src={"/img/thumbnail.jpeg"}
        alt="thumbnail"
        content={testContent}
        id="id"
        name="name"
      />
      <ReviewCard
        src={"/img/thumbnail.jpeg"}
        alt="thumbnail"
        content={testContent}
        id="id"
        name="name"
      />
    </>
  );
};

export default ReviewTab;
