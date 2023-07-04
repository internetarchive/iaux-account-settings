export type UserModel = {
  isAdmin?: boolean;
  picture?: string;
  borrowHistory?: string | boolean;
  password?: string;
  email?: string;
  screenname?: string;
  identifier?: string;
};

export type ErrorModel = {
  picture?: string;
  email?: string;
  screenname?: string;
  password?: string;
};

export interface MailingList {
  key: string;
  name: string;
  interest_id: string;
  selected_by_default: boolean;
  public: boolean;
  short_desc: string;
}

export type MailingListsModel = {
  [key: string]: MailingList;
};

export type SelectedMailingListsModel = Array<string>;

export type LinkedProvidersModel = Array<string>;

export type ResponseModel = {
  success?: boolean;
  error?: string;
  data?: object;
  fields?: object;
};

export type GoogleConfigModel = {
  verifyUser?: string;
  csrftoken?: string;
  googleId?: string;
  class?: string;
  baseHost?: string;
};
