import Image from "next/image";

interface FloatingProps {
  float: {
    name: string;
    href: string;
  }[];
}

const Floating = ({ float }: FloatingProps) => {
  console.log(float, "float");

  return (
    <div>
      {float.map(({ name, href }) => {
        return (
          <a key={name} href={href}>
            <Image
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
