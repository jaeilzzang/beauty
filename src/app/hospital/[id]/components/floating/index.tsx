import Image from "next/image";

import styles from "./floating.module.scss";

export type FloatItem = {
  name: string;
  href: string;
};
export interface FloatingProps {
  float: FloatItem[];
}

const Floating = ({ float }: FloatingProps) => {
  return (
    <div className={styles.floating}>
      {float.map(({ name, href }) => {
        return (
          // target="_blank" 새창열기
          <a key={name} href={href} target="_blank" rel="noopener noreferrer">
            <Image
              // 확장자 png, svg 나뉜걸 통일
              // 이미지 파일 이름도 네이밍과 통일
              src={`/icons/icon_sns_${name}.png`}
              alt={name}
              width={24}
              height={24}
            />
          </a>
        );
      })}
    </div>
  );
};

export default Floating;
