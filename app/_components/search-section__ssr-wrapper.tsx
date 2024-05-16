'use client';

import { useRecoilValue } from 'recoil';

import SearchSectionForm from '@/app/_components/search-section-form';
import { formValuesAtom } from '@/atoms/form-values-atom';
import { SearchStateEnum, searchStateAtom } from '@/atoms/search-state-atom';
import { type FormValues } from '@/constants/form';
import { useRecoilValue__Ssr } from '@/hooks/use-recoil-state__ssr';
import { cn } from '@/lib/utils';

const SearchSection__SsrWrapper = () => {
  const formValues = useRecoilValue__Ssr(formValuesAtom);

  if (formValues === null) {
    return null;
  }

  return <SearchSection formValues={formValues} />;
};

type SearchSectionProps = {
  formValues: FormValues | undefined;
};

const SearchSection = ({ formValues }: SearchSectionProps) => {
  const searchState = useRecoilValue(searchStateAtom);

  return (
    <section
      className={cn(
        'rounded-md bg-white p-4 shadow-sm',
        searchState === SearchStateEnum.Loading &&
          'animate-pulse outline outline-2 outline-neutral-400',
        searchState === SearchStateEnum.Error &&
          'bg-red-100/20 outline outline-2 outline-red-500',
        searchState === SearchStateEnum.Success &&
          'bg-green-100/20 outline outline-2 outline-green-500',
      )}
    >
      <SearchSectionForm defaultFormValues={formValues} />
    </section>
  );
};

export default SearchSection__SsrWrapper;
