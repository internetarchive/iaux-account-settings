export interface IAAccountSettingsInterface {
  /**
   * set screenname in UserModel
   *
   * @param {Event} event
   * @memberof IAAccountSettingsInterface
   */
  setScreenname(event: Event): void;

  /**
   * set email in UserModel
   *
   * @param {Event} event
   * @memberof IAAccountSettingsInterface
   */
  setEmail(event: Event): void;

  /**
   * set password in UserModel
   *
   * @param {Event} event
   * @memberof IAAccountSettingsInterface
   */
  setPassword(event: Event): void;

  /**
   * set user loan history visiblility preferences
   *
   * @param {Event} event
   * @memberof IAAccountSettingsInterface
   */
  setLoanHistory(event: Event): void;

  /**
   * check if fields has errors
   *
   * @return {*}  {boolean}
   * @memberof IAAccountSettingsInterface
   */
  hasFieldError(): boolean;

  /**
   * reset error fields
   *
   * @param {string} value
   * @memberof IAAccountSettingsInterface
   */
  resetErrorFields(value: string): void;

  /**
   * validate the screenname and set error in ErrorModel
   *
   * @return {*}  {Promise<void>}
   * @memberof IAAccountSettingsInterface
   */
  validateScreenname(): Promise<void>;

  /**
   * return true if screenname is available
   *
   * @return {*}  {boolean}
   * @memberof IAAccountSettingsInterface
   */
  isScreennameAvailable(): Promise<boolean | undefined>;

  /**
   * validate the email and set error in ErrorModel
   *
   * @return {*}  {Promise<void>}
   * @memberof IAAccountSettingsInterface
   */
  validateEmail(): Promise<void>;

  /**
   * after validation, save the account setting
   *
   * @param {Event} event
   * @return {*}  {Promise<void>}
   * @memberof IAAccountSettingsInterface
   */
  saveAccountSettings(event: Event): Promise<void>;
}
