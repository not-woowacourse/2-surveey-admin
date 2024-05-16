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
    return (
      <section className="rounded-md bg-white p-4 shadow-sm">
        Loading...
      </section>
    );
  }

  if (results[0].isError || results[1].isError) {
    return (
      <section className="rounded-md bg-white p-4 shadow-sm">Error</section>
    );
  }

  if (results[0].data === undefined || results[1].data === undefined) {
    return (
      <section className="rounded-md bg-white p-4 shadow-sm">No data</section>
    );
  }

  const [schema, forms] = [results[0].data.data, results[1].data.data];

  const { headers, data } = getResultSectionDataTableData({ schema, forms });

  return (
    <section className="rounded-md bg-white shadow-sm">
      <ResultSectionDataTable headers={headers} data={data} />
    </section>
  );
};

export default ResultSection__SsrWrapper;
