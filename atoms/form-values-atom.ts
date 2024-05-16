import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

import { type FormValues } from '@/constants/form';

const FORM_VALUES_ATOM_KEY = 'formValues';

const { persistAtom } = recoilPersist({
  key: FORM_VALUES_ATOM_KEY,
});

const formValuesAtom = atom<FormValues | undefined>({
  key: FORM_VALUES_ATOM_KEY,
  default: undefined,
  effects_UNSTABLE: [persistAtom],
});

export { formValuesAtom };
