'use client';

import { useEffect } from 'react';

import { useQueries } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';

import ResultSectionDataTable from '@/app/_components/result-section-data-table';
import { getResultSectionDataTableData } from '@/app/_utils/get-result-section-data-table-data';
import { formValuesAtom } from '@/atoms/form-values-atom';
import { SearchStateEnum, searchStateAtom } from '@/atoms/search-state-atom';
import { type FormValues } from '@/constants/form';
import { QUERY_KEYS } from '@/constants/query-keys';
import { useRecoilValue__Ssr } from '@/hooks/use-recoil-state__ssr';
import { axiosGetForms, axiosGetSchema } from '@/lib/api-requests';

const ResultSection__SsrWrapper = () => {
  const formValues = useRecoilValue__Ssr(formValuesAtom);

  if (formValues === null) {
    return null;
  }

  if (formValues === undefined) {
    return null;
  }

  return <ResultSection formValues={formValues} />;
};

type ResultSectionProps = {
  formValues: FormValues;
};

const ResultSection = ({ formValues }: ResultSectionProps) => {
  const setSearchState = useSetRecoilState(searchStateAtom);

  const results = useQueries({
    queries: [
      {
        queryKey: QUERY_KEYS.SCHEMA(formValues),
        queryFn: () => axiosGetSchema(formValues),
      },
      {
        queryKey: QUERY_KEYS.FORMS(formValues),
        queryFn: () => axiosGetForms(formValues),
        refetchInterval: 10000,
      },
    ],
  });

  /**
   * TODO: useEffect로 전역 상태를 변경하는 건 좋지 않다. 하지만 귀찮다.
   */
  useEffect(() => {
    if (results[0].isLoading || results[1].isLoading) {
      setSearchState(SearchStateEnum.Loading);
      return;
    }

    if (
      results[0].isError ||
      results[1].isError ||
      results[0].data === undefined ||
      results[1].data === undefined
    ) {
      setSearchState(SearchStateEnum.Error);
      return;
    }

    setSearchState(SearchStateEnum.Success);
  }, [results]);

  if (results[0].isLoading || results[1].isLoading) {
    return null;
  }

  if (results[0].isError || results[1].isError) {
    return null;
  }

  if (results[0].data === undefined || results[1].data === undefined) {
    return null;
  }

  const [schema, forms] = [results[0].data.data, results[1].data.data];

  const { headers, data } = getResultSectionDataTableData({ schema, forms });

  return (
    <section>
      <ResultSectionDataTable
        headers={headers}
        data={data}
        schema={schema}
        formValues={formValues}
      />
    </section>
  );
};

export default ResultSection__SsrWrapper;
