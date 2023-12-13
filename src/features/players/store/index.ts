import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

import { actions, key, reducer } from './reducer';
import saga from './saga';

export const usePlayersSlide = () => {
  useInjectReducer({ key, reducer });
  useInjectSaga({
    key,
    saga,
  });
  return { actions };
};
