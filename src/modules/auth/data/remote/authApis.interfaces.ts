import type { UserCredential } from '~libs/firebase';

import type { RequestParams } from '~store/api.interfaces';

import type { SaveLoginActionPayload } from '../local/authSlice.interfaces';

export type AuthRequestPayload = {
  email: string;
  password: string;
};

export type AuthRequestResponse = UserCredential;
export type AuthRequestResult = SaveLoginActionPayload;
export type AuthRequestParams = RequestParams<
  AuthRequestPayload,
  void,
  AuthRequestResult
>;
