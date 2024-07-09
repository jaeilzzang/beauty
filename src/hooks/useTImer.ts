import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

interface useTimerProps {
  time: number;

  isStart: boolean | undefined;

  setTimeOver: Dispatch<SetStateAction<boolean>>;
  timeOver: boolean;
}

const useTimer = ({ setTimeOver, isStart, timeOver, time }: useTimerProps) => {
  const timeRef = useRef<number>(time);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [state, setState] = useState({
    minute: Math.floor(time / 60),
    second: time % 60,
  });

  useEffect(() => {
    if (!isStart || timeOver) return;

    timerRef.current = setInterval(() => {
      const time = timeRef.current;
      const minute = Math.floor(time / 60);
      const second = time % 60;

      timeRef.current--;

      setState({ minute, second });

      if (timerRef.current && timeRef.current < 0) {
        clearInterval(timerRef.current);
        setTimeOver(true);
      }
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isStart, setTimeOver, timeOver]);

  return state;
};

export default useTimer;
