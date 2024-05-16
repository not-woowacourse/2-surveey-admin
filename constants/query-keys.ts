import { type FormValues } from '@/constants/form';

const QUERY_KEYS = {
  SCHEMA: (formValues: FormValues) => ['schema', formValues],
  FORMS: (formValues: FormValues) => ['forms', formValues],
  FORM_OF: (formValues: FormValues, formId: string) => [
    'form',
    formValues,
    formId,
  ],
};

export { QUERY_KEYS };
