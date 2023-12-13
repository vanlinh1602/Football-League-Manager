import type { FirebaseError } from 'firebase/app';
import _ from 'lodash';
import type { ApiProblems } from 'types';

export default (error: any) => {
  if ((error as FirebaseError).code) {
    return `Firebase error: ${error.code}`;
  }

  if ((error as ApiProblems).kind) {
    if (_.get(error, 'error.response.data.errors')) {
      return _.get(error, 'error.response.data.errors', [])
        .map(({ message }: { message: string }) => message)
        .join(', ');
    }
    if (_.get(error, 'error.response.data')) {
      return error?.error?.response?.data;
    }
    return error?.error?.message;
  }

  if (error.errors) {
    return Object.values(error.errors).join(', ');
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'Unkown error';
};
