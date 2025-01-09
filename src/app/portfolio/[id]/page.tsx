import PortfolioDetail from "@/app/components/PortfolioDetail";

type PortfolioDetailParams = {
  params: {
    id: string;
  };
};

export default function PortfolioDetailPage({ params }: PortfolioDetailParams) {
  return <PortfolioDetail id={params.id} />;
}
