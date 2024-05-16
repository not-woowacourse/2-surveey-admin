import { atom } from 'recoil';

enum SearchStateEnum {
  Idle = 'idle',
  Loading = 'loading',
  Error = 'error',
  Success = 'success',
}

const searchStateAtom = atom<SearchStateEnum>({
  key: 'searchState',
  default: SearchStateEnum.Idle,
});

export { SearchStateEnum, searchStateAtom };
