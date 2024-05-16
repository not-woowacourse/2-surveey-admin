import { Forms } from '@/__generated__/Forms';
import { Schemas } from '@/__generated__/Schemas';
import { API_PROXY_PATH } from '@/constants/url';

const schemasApiInstance = new Schemas({
  baseURL: API_PROXY_PATH,
});

const formsApiInstance = new Forms({
  baseURL: API_PROXY_PATH,
});

const apiInstance = {
  schemas: schemasApiInstance,
  forms: formsApiInstance,
};

export { apiInstance };
