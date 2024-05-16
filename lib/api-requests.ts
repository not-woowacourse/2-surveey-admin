import { HTTP_HEADERS } from '@/constants/http-headers';
import { apiInstance } from '@/lib/api-instance';

type AxiosGetSchemaParams = {
  clientName: string;
  schemaSlug: string;
};

const axiosGetSchema = ({ clientName, schemaSlug }: AxiosGetSchemaParams) => {
  return () =>
    apiInstance.schemas.schemasControllerFindOne(schemaSlug, {
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
  return () =>
    apiInstance.forms.formsControllerFindAll(schemaSlug, {
      headers: {
        [HTTP_HEADERS.CLIENT_NAME_KEY]: clientName,
      },
    });
};

type AxiosGetFormParams = {
  clientName: string;
  schemaSlug: string;
  formId: number;
};

const axiosGetForm = async ({
  clientName,
  schemaSlug,
  formId,
}: AxiosGetFormParams) => {
  return () =>
    apiInstance.forms.formsControllerFindOneById(schemaSlug, formId, {
      headers: {
        [HTTP_HEADERS.CLIENT_NAME_KEY]: clientName,
      },
    });
};

export { axiosGetForm, axiosGetForms, axiosGetSchema };
