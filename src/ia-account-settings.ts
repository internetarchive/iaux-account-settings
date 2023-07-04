import {
  html,
  css,
  LitElement,
  CSSResultGroup,
  PropertyValues,
  nothing,
} from 'lit';
import { property, customElement, state, query } from 'lit/decorators.js';
import { backendServiceHandler } from './services/backend-service';
import log from './services/log';
import {
  togglePassword,
  preventDefaultAndStopEvent,
  trimString,
  throttle,
} from './services/util';
import { AccountSettings } from './styles/account-settings';
import { IAButtonStyles } from './styles/ia-buttons';
import type { IAAccountSettingsInterface } from './ia-account-settings.interface';
import type {
  UserModel,
  ErrorModel,
  ResponseModel,
  MailingListsModel,
  SelectedMailingListsModel,
  LinkedProvidersModel,
} from './models';

import '@internetarchive/ia-activity-indicator/ia-activity-indicator';
import '@internetarchive/ia-pic-uploader';
import './components/authentication-template';
import eyeCrossed from './assets/eye-crossed';
import eyeOpen from './assets/eye-open';

@customElement('ia-account-settings')
export class IAAccountSettings
  extends LitElement
  implements IAAccountSettingsInterface
{
  /**
   * contains user information
   *
   * @type {UserModel}
   * @memberof IAUXAccountSettings
   */
  @property({ type: Object }) userData: UserModel = {};

  /**
   * active mailing lists available
   *
   * @type {MailingListsModel}
   * @memberof IAUXAccountSettings
   */
  @property({ type: Object }) mailingLists?: MailingListsModel;

  /**
   * user's selected mailing lists
   *
   * @type {SelectedMailingListsModel}
   * @memberof IAUXAccountSettings
   */
  @property({ type: Array }) selectedMailingLists: SelectedMailingListsModel =
    [];

  /**
   * contain linked provider
   *
   * @type {LinkedProvidersModel}
   * @memberof IAUXAccountSettings
   */
  @property({ type: Array }) linkedProviders: LinkedProvidersModel = [];

  /**
   * contain profile picture URL
   *
   * @type {String}
   * @memberof IAUXAccountSettings
   */
  @property({ type: String }) profilePicture: String = '';

  /**
   * contain boolean status loan history visibility
   *
   * @type {String | Boolean}
   * @memberof IAUXAccountSettings
   */
  @property({ type: String }) loanHistoryFlag: String | Boolean = '';

  /**
   * contain profile csrf token
   *
   * @type {String}
   * @memberof IAUXAccountSettings
   */
  @property({ type: String }) csrfToken: String = '';

  /**
   * contain fileSelect input field
   *
   * @private
   * @type {HTMLInputElement}
   * @memberof IAUXAccountSettings
   */
  @state() private fileInput?: HTMLInputElement;

  /**
   * contains error data for form fields
   *
   * @private
   * @type {ErrorModel}
   * @memberof IAUXAccountSettings
   */
  @state() fieldsError: ErrorModel = {};

  /**
   * open delete form
   *
   * @private
   * @type {Boolean}
   * @memberof IAUXAccountSettings
   */
  @state() private attemptToDelete?: Boolean;

  /**
   * enable delete button when you make sure
   *
   * @private
   * @type {Boolean}
   * @memberof IAUXAccountSettings
   */
  @state() private confirmDelete?: Boolean = false;

  /**
   * object that contains updated fields data/text
   *
   * @private
   * @type {Object}
   * @memberof IAAccountSettings
   */
  @state() private responseFields?: ResponseModel = {};

  /**
   * determine if need to disable save button
   *
   * @private
   * @type {Boolean}
   * @memberof IAAccountSettings
   */
  @state() saveButtonDisabled?: Boolean = true;

  /**
   * determine if want to show authenticate page
   *
   * @type {Boolean}
   * @memberof IAUXAccountSettings
   */
  @state() lookingToAuth?: Boolean = true;

  /**
   * determine if need to show loading indicator on buttons
   *
   * @type {Boolean}
   * @memberof IAUXAccountSettings
   */
  @state() showLoadingIndicator?: Boolean;

  /**
   * set true if want to make header sticky
   *
   * @type {Boolean}
   * @memberof IAUXAccountSettings
   */
  @state() isStickyHeader?: Boolean = false;

  /**
   * toggle password field type to text|password
   * @type {Boolean}
   * @memberof IAUXAccountSettings
   */
  @state() private showPassword?: Boolean = false;

  /**
   * flag to verify if API has executed
   * @type {Boolean}
   * @memberof IAUXAccountSettings
   */
  @state() private apiHasExecuted?: Boolean = false;

  /**
   * since we moved pic upload feature in separate component,
   * just selecting this component to get new selected profile picture
   *
   * @private
   * @type {HTMLFormElement}
   * @memberof IAAccountSettings
   */
  @query('ia-pic-uploader') private iaPicUploader?: HTMLFormElement;

  /**
   * grabe password field to toggle its visibility
   *
   * @private
   * @type {HTMLInputElement}
   * @memberof IAAccountSettings
   */
  @query('#password') private passwordField?: HTMLInputElement;

  private passwordMinLength = 3;

  private passwordMaxLength = 100;

  private passwordLengthMessage = `The password needs to be between ${this.passwordMinLength} and ${this.passwordMaxLength} characters long.`;

  private userAvatarSuccessMsg =
    'Your profile picture has been updated. Please allow 5 minutes for the change to take effect.';

  private providerUnlinkMsg = 'Your Google account has been unlinked.';

  private oldUserData: UserModel = {
    email: '',
    screenname: '',
  };

  private ImageHasUploaded = false;

  private providerHasUnlinked = false;

  // we need to store the temp provider user wants to unlink from account
  private unlinkProviders: LinkedProvidersModel = [];

  firstUpdated() {
    this.oldUserData = Object.assign(this.oldUserData, {
      email: this.userData.email,
      screenname: this.userData.screenname,
    });

    this.bindEvents();
  }

  updated(changed: PropertyValues) {
    this.fileInput = this.iaPicUploader?.shadowRoot?.querySelector(
      '.file-selector'
    ) as HTMLInputElement;

    if (changed.has('userData') || changed.has('selectedMailingLists')) {
      this.showLoadingIndicator = false;
      this.responseFields = {};
    }

    if (changed.has('fieldsError') && this.hasFieldError()) {
      this.saveButtonDisabled = true;
    }

    if (changed.has('apiHasExecuted') && this.apiHasExecuted === true) {
      // display provider unlinked message
      if (this.providerHasUnlinked) {
        this.responseFields = {
          ...this.responseFields,
          fields: {
            unlink: this.providerUnlinkMsg,
            ...this.responseFields?.fields,
          },
        };
      }

      // display image has uploaded message
      if (this.ImageHasUploaded) {
        this.responseFields = {
          ...this.responseFields,
          fields: {
            file: this.userAvatarSuccessMsg,
            ...this.responseFields?.fields,
          },
        };
      }

      this.apiHasExecuted = false;
    }
  }

  bindEvents() {
    // check if google auth authentication completed, show setting page
    document.addEventListener('IAThirdPartyAuth:verifiedLogin', () => {
      log('IAThirdPartyAuth:verifiedLogin');
      this.lookingToAuth = false;
    });

    // scroll event to make sticky header
    window.addEventListener(
      'scroll',
      throttle(() => {
        if (window.scrollY > this.offsetTop) {
          this.isStickyHeader = true;
        } else {
          this.isStickyHeader = false;
        }
      }, 50)
    );
  }

  render() {
    return html`
      <main id="maincontent">
        <div class="container">
          ${this.lookingToAuth
            ? this.verificationTemplate
            : this.settingsTemplate}
        </div>
      </main>
    `;
  }

  /** @inheritdoc */
  setScreenname(e: Event) {
    const input = e.target as HTMLInputElement;
    this.userData.screenname = input.value;
    this.resetErrorFields('screenname');
  }

  /** @inheritdoc */
  setEmail(e: Event) {
    const input = e.target as HTMLInputElement;
    this.userData.email = input.value;
    this.fieldsError.email = '';
    this.resetErrorFields('email');
  }

  /** @inheritdoc */
  setPassword(e: Event) {
    const input = e.target as HTMLInputElement;
    this.userData.password = input.value;
    this.fieldsError.password = '';
    this.resetErrorFields('password');
  }

  /** @inheritdoc */
  setLoanHistory(e: Event) {
    const input = e.target as HTMLInputElement;
    this.loanHistoryFlag = input.checked ? 'public' : 'private';
    this.changeSaveButtonState();
  }

  /** @inheritdoc */
  setMailingList(e: Event) {
    const input = e.target as HTMLInputElement;
    const fieldName = input.name;

    if (input.checked) {
      this.selectedMailingLists.push(fieldName);
    } else {
      const index = this.selectedMailingLists.indexOf(fieldName);
      this.selectedMailingLists.splice(index, 1);
    }

    this.changeSaveButtonState();
  }

  setLinkedProvider(e: Event) {
    const input = e.target as HTMLInputElement;
    const { provider } = input.dataset;
    if (!provider) {
      return;
    }

    if (!input.checked) {
      this.unlinkProviders.push(provider);
    } else {
      const index = this.unlinkProviders.indexOf(provider);
      this.unlinkProviders.splice(index, 1);
    }

    this.changeSaveButtonState();
  }

  changeSaveButtonState() {
    this.saveButtonDisabled = !!this.hasFieldError();
  }

  /** @inheritdoc */
  resetErrorFields(field: string) {
    let errorFields = {};

    if (field === 'email') {
      errorFields = { ...this.fieldsError, email: '' };
    } else if (field === 'screenname') {
      errorFields = { ...this.fieldsError, screenname: '' };
    } else {
      errorFields = { ...this.fieldsError, password: '' };
    }

    this.saveButtonDisabled = false;
    this.fieldsError = errorFields;
  }

  /** @inheritdoc */
  hasFieldError() {
    return Object.values(this.fieldsError).some(value => value !== '');
  }

  /** @inheritdoc */
  async validateScreenname() {
    let error = '';
    this.userData.screenname = trimString(this.userData.screenname as string);

    const invalidLength =
      this.userData.screenname.length < 3 ||
      this.userData.screenname.length > 127;

    if (this.userData.screenname === '' || invalidLength) {
      error = 'The screen name needs to be between 3 and 127 characters long.';
    } else if (this.userData.screenname?.includes('\\')) {
      error = 'This does not appear to be a valid screen name.';
    } else if ((await this.isScreennameAvailable()) === false) {
      error = `The screen name ${this.userData.screenname} is already taken.`;
    }

    this.fieldsError = { ...this.fieldsError, screenname: error };
  }

  /** @inheritdoc */
  async validateEmail() {
    let error = '';
    this.userData.email = trimString(this.userData.email as string);

    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!this.userData.email?.match(emailRegex)) {
      error = 'This does not appear to be a valid email address.';
    } else if (!(await this.isEmailAvailable())) {
      error = `${this.userData.email} is already taken.`;
    }

    this.fieldsError = { ...this.fieldsError, email: error };
  }

  /** @inheritdoc */
  async validatePassword() {
    const passwordLength = this.userData.password?.length as number;
    const invalidLength =
      passwordLength < this.passwordMinLength ||
      passwordLength > this.passwordMaxLength;

    if (this.userData.password && invalidLength) {
      this.fieldsError = {
        ...this.fieldsError,
        password: this.passwordLengthMessage,
      };
    }
  }

  /** @inheritdoc */
  async isEmailAvailable() {
    if (this.userData.email !== this.oldUserData?.email) {
      const response = (await backendServiceHandler({
        action: 'email-available',
        email: this.userData.email,
      })) as ResponseModel;

      return response.success;
    }

    return true;
  }

  /** @inheritdoc */
  async isScreennameAvailable() {
    if (this.userData.screenname !== this.oldUserData.screenname) {
      const response = (await backendServiceHandler({
        action: 'screenname-available',
        screenname: this.userData.screenname,
      })) as ResponseModel;

      return response.success;
    }

    return true;
  }

  /**
   * @inheritdoc
   */
  async saveAccountSettings(event: Event) {
    this.showLoadingIndicator = true;
    this.saveButtonDisabled = true;
    preventDefaultAndStopEvent(event);

    // reset field state
    this.ImageHasUploaded = false;
    this.providerHasUnlinked = false;
    this.responseFields = {};

    await this.validateScreenname();
    await this.validateEmail();
    await this.validatePassword();

    // dispatch enternal events
    this.emitProfileAvatarSaveEvent();
    this.emitUnlinkProviderEvent();

    // if don't have any active error, just procced to save settings
    if (!this.hasFieldError()) {
      const response = (await backendServiceHandler({
        action: 'save-account',
        identifier: this.userData.identifier,
        userData: this.userData,
        csrfToken: this.csrfToken,
        selectedMailingLists: this.selectedMailingLists,
        loanHistoryFlag: this.loanHistoryFlag,
      })) as ResponseModel;

      if (response) {
        this.responseFields = response;
      }

      if (response.success === true) {
        this.apiHasExecuted = true;
      }

      // reset the password field after password changed
      this.userData.password = '';
      this.passwordField!.value = '';
    }

    setTimeout(async () => {
      this.showLoadingIndicator = false;
    }, 100);
  }

  /**
   * show success message when profile-picture is uploaded successfully
   *
   * @memberof IAAccountSettings
   */
  profilePictureUploaded() {
    this.saveButtonDisabled = true;
    this.ImageHasUploaded = true;
    this.apiHasExecuted = true;
  }

  /**
   * if user selector new profile avatar, we need to dispatch event to ia-pic-uploader component
   */
  emitProfileAvatarSaveEvent() {
    if (this.fileInput?.files?.length) {
      document.dispatchEvent(new Event('saveProfileAvatar'));
    }
  }

  /**
   * dispatch event to unlink provider at ia-third-party-auth component
   */
  emitUnlinkProviderEvent() {
    if (Object.values(this.unlinkProviders).length === 0) return nothing;

    // if user want to unlinkProvider, dispatch an event to ia-third-party-auth
    const provider = Object.values(this.unlinkProviders).filter(
      key => key ?? nothing
    );

    if (provider) {
      log(`${provider} provider should be unlinked!`);
      document.dispatchEvent(
        new CustomEvent('IAThirdPartyAuth:unlinkProvider', {
          detail: { provider },
        })
      );

      this.providerHasUnlinked = true;

      // reset linked providers
      this.unlinkProviders = [];
      this.linkedProviders = [];
    }

    return nothing;
  }

  get verificationTemplate() {
    return html` <authentication-template
      authenticationType="${!Object.keys(this.linkedProviders).length
        ? 'ia'
        : ''}"
      identifier=${this.userData.identifier}
      email=${this.userData.email}
      csrfToken=${this.csrfToken}
      @ia-authenticated=${() => {
        this.lookingToAuth = false;
        try {
          localStorage.setItem('keep-authenticated', 'yes');
        } catch (error) {
          /** it's ok to empty */
        }
      }}
    >
      <slot name="ia-google-login"></slot>
    </authentication-template>`;
  }

  get settingsTemplate() {
    /* eslint-disable lit-a11y/click-events-have-key-events, lit-a11y/anchor-is-valid */
    return html`<div
      class="settings-template ${this.isStickyHeader ? 'sticky-header' : ''} "
    >
      <form id="form" name="account-settings" method="post" autocomplete="off">
        <div
          class="form-element header ${this.showLoadingIndicator
            ? 'pointer-none'
            : ''}"
        >
          <h2>Account settings</h2>
          <button
            type="button"
            class="ia-button dark"
            @click=${() => {
              setTimeout(() => {
                window.location.href = '/';
              }, 10);
            }}
          >
            Cancel
          </button>
          <button
            class="ia-button primary"
            @click=${(e: Event) => {
              this.saveAccountSettings(e);
            }}
            .disabled=${this.saveButtonDisabled}
          >
            ${this.showLoadingIndicator
              ? this.loadingIndicatorTemplate
              : 'Save changes'}
          </button>
        </div>

        <div class="body-content">
          <div
            class="data-updated 
            ${this.responseFields?.success ? 'success' : 'error'}"
          >
            ${this.getResponseTemplate}
          </div>

          <div class="form-element">
            <label>Change profile picture</label>
            <ia-pic-uploader
              identifier=${this.userData.identifier}
              picture="${this.profilePicture}"
              ?lookingAtMyAccount=${true}
              type="compact"
              @fileChanged=${e => {
                this.fieldsError.profile = e.detail.error;
                this.changeSaveButtonState();
              }}
              @fileUploaded=${() => {
                this.profilePictureUploaded();
              }}
            ></ia-pic-uploader>
          </div>

          <div class="form-element ">
            <label for="screenname">
              Change screenname <small>(will not change user id)</small>
            </label>
            <input
              type="text"
              class="form-control"
              id="screenname"
              name="screenname"
              .value="${this.userData.screenname}"
              @input=${this.setScreenname}
              @blur=${this.validateScreenname}
            />
            <span class="error-field">${this.fieldsError.screenname}</span>
          </div>

          <div class="form-element">
            <label for="email">
              Change email <small>(verification will be required)</small>
            </label>
            <input
              type="email"
              class="form-control"
              id="email"
              name="email"
              .value="${this.userData.email}"
              @input=${this.setEmail}
              @blur=${this.validateEmail}
            />
            <span class="error-field">${this.fieldsError.email}</span>
          </div>

          <div class="form-element">
            <label for="password">
              Change Internet Archive / Open Library password
            </label>
            <input
              type="password"
              class="form-control"
              id="password"
              name="password"
              autocomplete="new-password"
              @input=${this.setPassword}
              @blur=${this.validatePassword}
            />
            <button
              type="button"
              class="password-icon"
              @click="${(e: Event) => {
                togglePassword(e, this.passwordField as HTMLInputElement);
                this.showPassword = !this.showPassword;
              }}"
            >
              ${this.showPassword ? eyeOpen : eyeCrossed}
            </button>
            <span class="error-field">${this.fieldsError.password}</span>
          </div>

          <div class="form-element">
            <label>Set borrow history</label>
            <input
              type="checkbox"
              id="loan-history"
              name="loan-history"
              .checked=${this.loanHistoryFlag === 'public' ||
              this.loanHistoryFlag === true}
              @click=${this.setLoanHistory}
            />
            <label for="loan-history"> Visible to the public</label>
          </div>

          <div class="form-element newsletter">
            <label>Newsletter subscriptions</label>
            <p>
              Stay up to date with what's happening at the Internet Archive by
              signing up for our free newsletters.
            </p>
            ${this.mailingListsTemplate}
          </div>

          <div class="form-element">
            <label for="linked-account"
              >Linked 3rd party accounts (e.g. Google)</label
            >
            ${Object.keys(this.linkedProviders).length
              ? this.linkedAccountTemplate
              : 'You have no linked accounts'}
          </div>

          <div
            class="form-element delete-account ${this.attemptToDelete
              ? 'hide'
              : ''}"
          >
            <button
              type="button"
              class="delete-link"
              href="javascript:void(0)"
              @click=${() => {
                this.attemptToDelete = true;
              }}
            >
              Delete Internet Archive / Open Library account
            </button>
          </div>

          ${this.attemptToDelete ? this.deleteAccountTemplate : ''}
        </div>
      </form>

      ${this.userData.isAdmin ? this.adminFunctionsTemplate : ''}
    </div>`;
  }

  get getResponseTemplate() {
    // &#10006; htmlentity denotes error symbol
    if (this.responseFields?.success === false) {
      return html`<span class="error-field"
        >&#10006; ${this.responseFields?.error}</span
      >`;
    }

    // &#10003; htmlentity denotes success symbol
    return Object.values(this.responseFields?.fields ?? {})?.map(
      msg => html`<span class="success-field">&#10003; ${msg}</span>`
    );
  }

  get mailingListsTemplate() {
    if (!this.mailingLists) return nothing;

    return Object.entries(this.mailingLists).map(list => {
      if (!list[1].public) return nothing;

      return html`<input
          type="checkbox"
          id="${list[1].key}"
          name="${list[1].key}"
          @click=${this.setMailingList}
          .checked=${Object.values(this.selectedMailingLists).includes(
            list[1].key
          )}
        />
        <label for="${list[1].key}">
          ${list[1].name}: ${list[1].short_desc}</label
        ><br /> `;
    });
  }

  get linkedAccountTemplate() {
    return Object.values(this.linkedProviders)?.map(provider => {
      if (this.linkedProviders[provider] === false)
        return html`You have no linked accounts`;

      return html` <input
          name="ia-${provider}"
          id="ia-${provider}"
          type="checkbox"
          data-provider=${provider}
          checked
          @click=${this.setLinkedProvider}
        />
        <label for="ia-${provider}"> ${provider}</label>`;
    });
  }

  get loadingIndicatorTemplate() {
    return html` <ia-activity-indicator
      mode="processing"
      class="go-button-loading-icon"
    ></ia-activity-indicator>`;
  }

  get deleteAccountTemplate() {
    return html`
      <div class="form-element delete-section">
        <label>Delete Internet Archive / Open Library account</label>
        <p>
          Items you've uploaded will remain on the Internet Archive. If you wish
          to remove items,<br />
          please do so before deleting your account.
        </p>
        <a
          href="https://help.archive.org/help/how-do-i-delete-my-account/"
          target="_blank"
          >Click here for instructions on removing your items.</a
        ><br />

        <input
          type="checkbox"
          id="confirm-delete"
          name="confirm-delete"
          @click=${() => {
            this.confirmDelete = !this.confirmDelete;
          }}
        />
        <label for="confirm-delete"
          >I'm sure I want to delete my account.</label
        >
        <p>This action cannot be reversed.</p>
        ${this.getDeleteButton}
      </div>
    `;
  }

  get getDeleteButton() {
    return html`<button
      id="delete-button"
      class="ia-button danger ${this.showLoadingIndicator
        ? 'pointer-none'
        : ''}"
      type="button"
      ?disabled=${!this.confirmDelete}
      @click=${async () => {
        this.showLoadingIndicator = true;
        const response = (await backendServiceHandler({
          action: 'delete-account',
          confirmDelete: this.confirmDelete,
          csrfToken: this.csrfToken,
        })) as ResponseModel;

        if (response.success) window.location.reload();
      }}
    >
      ${this.showLoadingIndicator
        ? this.loadingIndicatorTemplate
        : 'Delete account'}
    </button>`;
  }

  get adminFunctionsTemplate() {
    return html`<div class="col-md-4">
      <div class="form-element admin-functions">
        <h2>Admin functions</h2>
        <hr />
        <ul>
          <li>
            <a href="https://pi.archive.org/control/setadmin.php"
              >Grant or revoke administrator privileges</a
            >
          </li>
          <li>
            <a href="https://pi.archive.org/control/useradmin.php"
              >User Administration</a
            >
          </li>
          <li>
            <a href="https://archive.org/iathreads/forum-new.php"
              >Make a new Forum</a
            >
          </li>
        </ul>
      </div>
    </div>`;
  }

  static get styles(): CSSResultGroup {
    return [
      IAButtonStyles,
      AccountSettings,
      css`
        :host {
          display: block;
          padding: 25px;
          font-size: 1.4rem;
          outline: none;
          border: none;
        }

        .ia-button.primary {
          width: 138px;
        }

        ia-pic-uploader:focus,
        ia-pic-uploader:focus-visible {
          outline: none;
        }

        /* sticky header on scroll */
        .sticky-header .header {
          position: fixed;
          top: 0;
          width: 100%;
          padding: 20px 0;
          z-index: 2;
          background: #fff;
        }
        .sticky-header .body-content {
          margin-top: 50px;
        }
      `,
    ];
  }
}
