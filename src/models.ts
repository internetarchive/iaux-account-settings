export interface FileModel {
  name?: '';
  size?: '';
  type?: '';
  lastModified?: '';
}

export type FilesModel = {
  length?: number;
  files?: FileModel[];
};

export type URL = string;

export type UserModel = {
  isAdmin?: boolean;
  picture?: string;
  borrowHistory?: string | boolean;
  password?: string;
  email?: string;
  screenname?: string;
  identifier?: string;
  // [key: string]: string;
};

export type ErrorModel = {
  email?: string;
  screenname?: string;
  password?: string;
};

export type List = {
  key?: string;
  short_desc?: string;
  public?: boolean;
  name?: string;
};

export type MailingLists = {
  [key: string]: object;
};

export type SelectedMailingLists = {
  [key: string]: any;
};

export type ServiceResponseModel = {
  status: boolean;
  message: string;
};

export type ResponseModel = {
  success?: boolean;
  error?: string;
  data?: object;
  updatedFields?: object;
};

export type ResponseModel1 = {
  status?: boolean;
  updatedFields?: object;
};

export const getDefaultUserData = (): UserModel => ({
  identifier: '',
  screenname: '',
  email: '',
  password: '',
  picture: '',
  borrowHistory: '',
  isAdmin: false,
});

export type GoogleConfigModel = {
  verifyUser?: string;
  csrftoken?: string;
  googleId?: string;
  class?: string;
  baseHost?: string;
};
