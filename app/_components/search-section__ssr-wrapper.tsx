'use client';

import SearchSectionForm from '@/app/_components/search-section-form';
import { formValuesAtom } from '@/atoms/form-values-atom';
import { type FormValues } from '@/constants/form';
import { useRecoilValue__Ssr } from '@/hooks/use-recoil-state__ssr';

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
  return (
    <section className="rounded-md bg-white p-4 shadow-sm">
      <SearchSectionForm defaultFormValues={formValues} />
    </section>
  );
};

export default SearchSection__SsrWrapper;
