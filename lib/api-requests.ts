import { HTTP_HEADERS } from '@/constants/http-headers';
import { apiInstance } from '@/lib/api-instance';

type AxiosGetSchemaParams = {
  clientName: string;
  schemaSlug: string;
};

const axiosGetSchema = ({ clientName, schemaSlug }: AxiosGetSchemaParams) => {
  return apiInstance.schemas.schemasControllerFindOne(schemaSlug, {
    headers: {
      [HTTP_HEADERS.CLIENT_NAME_KEY]: clientName,
    },
  });
};

type AxiosGetFormsParams = {
  clientName: string;
  schemaSlug: string;
};

const axiosGetForms = ({ clientName, schemaSlug }: AxiosGetFormsParams) => {
  return apiInstance.forms.formsControllerFindAll(schemaSlug, {
    headers: {
      [HTTP_HEADERS.CLIENT_NAME_KEY]: clientName,
    },
  });
};

type AxiosBatchDeleteFormParams = {
  clientName: string;
  schemaSlug: string;
  ids: number[];
};

const axiosBatchDeleteForm = async ({
  clientName,
  schemaSlug,
  ids,
}: AxiosBatchDeleteFormParams) => {
  return apiInstance.forms.formsControllerBatchRemove(
    schemaSlug,
    { ids },
    {
      headers: {
        [HTTP_HEADERS.CLIENT_NAME_KEY]: clientName,
      },
    },
  );
};

export { axiosBatchDeleteForm, axiosGetForms, axiosGetSchema };
