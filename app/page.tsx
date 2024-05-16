import ResultSection__SsrWrapper from '@/app/_components/result-section__ssr-wrapper';
import SearchSection__SsrWrapper from '@/app/_components/search-section__ssr-wrapper';

const RootPage = () => {
  return (
    <div className="flex flex-col gap-4 px-2 py-4 md:px-4">
      <SearchSection__SsrWrapper />
      <ResultSection__SsrWrapper />
    </div>
  );
};

export default RootPage;
