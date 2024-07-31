import { capitalizeWord } from "@/utils/word";
import { ResolvingMetadata, Metadata } from "next";
import { RecommendTab } from "./tab";

interface Props {
  params: { id: string };
  searchParams: { tab: string };
}

export async function generateMetadata(
  { searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `Recommend | ${capitalizeWord(searchParams.tab)}`,
    openGraph: {
      images: [...previousImages],
    },
  };
}

const RecommendDetailPage = ({ searchParams }: Props) => {
  const currentTab = searchParams.tab;

  return (
    <main>
      <RecommendTab currentTab={currentTab} />
    </main>
  );
};

export default RecommendDetailPage;
