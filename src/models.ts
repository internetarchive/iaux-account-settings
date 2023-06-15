export interface FileModel {
  name?: '';
  size?: '';
  type?: '';
  lastModified?: '';
}

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
  email?: string;
  screenname?: string;
  password?: string;
};

export type MailingListsModel = {
  [key: string]: object;
};

export type SelectedMailingListsModel = {
  [key: string]: any;
};

export type LinkedProvidersModel = {
  [key: string]: any;
};

export type ResponseModel = {
  success?: boolean;
  error?: string;
  data?: object;
  updatedFields?: object;
};

export type GoogleConfigModel = {
  verifyUser?: string;
  csrftoken?: string;
  googleId?: string;
  class?: string;
  baseHost?: string;
};
