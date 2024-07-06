import React from "react";

// import styles from "../styles/event.module.scss";
import { EventCard } from "@/components/molecules/card";

const descTest = `이벤트 초과하는건 밑줄로 표현하기이벤트 초과하는건 밑줄로 표현하기
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

const EventTab = () => {
  return (
    <>
      <EventCard
        href="/event/1"
        src="/img/thumbnail.jpeg"
        alt="thumbnail"
        date="date"
        desc={descTest}
        title="예쁘니까 울랄라"
      />
      <EventCard
        href="/event/1"
        src="/img/thumbnail.jpeg"
        alt="thumbnail"
        date="date"
        desc={descTest}
        title="예쁘니까 울랄라"
      />
      <EventCard
        href="/event/1"
        src="/img/thumbnail.jpeg"
        alt="thumbnail"
        date="date"
        desc={descTest}
        title="예쁘니까 울랄라"
      />
      <EventCard
        href="/event/1"
        src="/img/thumbnail.jpeg"
        alt="thumbnail"
        date="date"
        desc={descTest}
        title="예쁘니까 울랄라"
      />
      <EventCard
        href="/event/1"
        src="/img/thumbnail.jpeg"
        alt="thumbnail"
        date="date"
        desc={descTest}
        title="예쁘니까 울랄라"
      />
      <EventCard
        href="/event/1"
        src="/img/thumbnail.jpeg"
        alt="thumbnail"
        date="date"
        desc={descTest}
        title="예쁘니까 울랄라"
      />
      <EventCard
        href="/event/1"
        src="/img/thumbnail.jpeg"
        alt="thumbnail"
        date="date"
        desc={descTest}
        title="예쁘니까 울랄라"
      />
      <EventCard
        href="/event/1"
        src="/img/thumbnail.jpeg"
        alt="thumbnail"
        date="date"
        desc={descTest}
        title="예쁘니까 울랄라"
      />
    </>
  );
};

export default EventTab;
