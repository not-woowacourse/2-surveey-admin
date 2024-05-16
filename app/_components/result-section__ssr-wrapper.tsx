'use client';

import { useQueries } from '@tanstack/react-query';

import ResultSectionDataTable from '@/app/_components/result-section-data-table';
import { getResultSectionDataTableData } from '@/app/_utils/get-result-section-data-table-data';
import { formValuesAtom } from '@/atoms/form-values-atom';
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
  const { clientName, schemaSlug } = formValues;

  const results = useQueries({
    queries: [
      {
        queryKey: QUERY_KEYS.SCHEMA(formValues),
        queryFn: axiosGetSchema({ clientName, schemaSlug }),
      },
      {
        queryKey: QUERY_KEYS.FORMS(formValues),
        queryFn: axiosGetForms({ clientName, schemaSlug }),
        refetchInterval: 10000,
      },
    ],
  });

  if (results[0].isLoading || results[1].isLoading) {
    return <section>Loading...</section>;
  }

  if (results[0].isError || results[1].isError) {
    return <section>Error</section>;
  }

  if (results[0].data === undefined || results[1].data === undefined) {
    return <section>No data</section>;
  }

  const [schema, forms] = [results[0].data.data, results[1].data.data];

  const { headers, data } = getResultSectionDataTableData({ schema, forms });

  return (
    <section>
      <ResultSectionDataTable headers={headers} data={data} schema={schema} />
    </section>
  );
};

export default ResultSection__SsrWrapper;
