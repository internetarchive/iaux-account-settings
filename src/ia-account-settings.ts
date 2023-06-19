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
  @property({ type: Object }) selectedMailingLists: SelectedMailingListsModel =
    {};

  /**
   * contain boolean status about google account is linked
   *
   * @type {String}
   * @memberof IAUXAccountSettings
   */
  @property({ type: String }) profilePicture: String = '';

  /**
   * contain boolean status about google account is linked
   *
   * @type {String | Boolean}
   * @memberof IAUXAccountSettings
   */
  @property({ type: String }) loanHistoryFlag: String | Boolean = '';

  /**
   * contain boolean status about google account is linked
   *
   * @type {LinkedProvidersModel}
   * @memberof IAUXAccountSettings
   */
  @property({ type: Object }) linkedProviders: LinkedProvidersModel = {};

  /**
   * contain boolean status about google account is linked
   *
   * @type {String}
   * @memberof IAUXAccountSettings
   */
  @property({ type: String }) profileCsrfToken: String = '';

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
  @state() private fieldsError: ErrorModel = {};

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
  @state() private updatedFields?: ResponseModel = {};

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
  @state() lookingToAuth?: Boolean = false;

  /**
   * determine if need to show loading indicator on buttons
   *
   * @type {Boolean}
   * @memberof IAUXAccountSettings
   */
  @state() showLoadingIndicator?: Boolean;

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

  private oldUserData: UserModel = {
    email: '',
    screenname: '',
  };

  // we need to store the provider user wants to unlink from account
  private unlinkProviders: LinkedProvidersModel = {};

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
      this.updatedFields = {};
    }

    if (changed.has('fieldsError') && this.hasFieldError()) {
      log('buttton keep disabled');
      this.saveButtonDisabled = true;
    }
  }

  bindEvents() {
    // check if google auth authentication completed, show setting page
    document.addEventListener('IAThirdPartyAuth:verifiedLogin', () => {
      log('IAThirdPartyAuth:verifiedLogin');
      this.lookingToAuth = false;
    });
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
  setBorrowHistory(e: Event) {
    const input = e.target as HTMLInputElement;
    this.loanHistoryFlag = input.checked ? 'public' : 'private';
    this.changeSaveButtonState();
  }

  /** @inheritdoc */
  setMailingList(e: Event) {
    const input = e.target as HTMLInputElement;
    const fieldName = input.name;

    if (input.checked) {
      this.selectedMailingLists[fieldName] = true;
    } else {
      this.selectedMailingLists[fieldName] = false;
    }

    this.changeSaveButtonState();
  }

  setLinkedProvider(e: Event) {
    const input = e.target as HTMLInputElement;
    const { provider } = input.dataset;
    if (!provider) {
      return;
    }

    if (input.checked) {
      this.unlinkProviders[provider] = false;
    } else {
      this.unlinkProviders[provider] = true;
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

    if (this.userData.screenname === '') {
      error = 'The screen name needs to be between 3 and 127 characters long.';
    } else if (this.userData.screenname?.includes('\\')) {
      error = 'The screen name needs to be between 3 and 127 characters long.';
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

    if (this.userData.email === '') {
      error = 'This does not appear to be a valid email address.';
    } else if (!this.userData.email?.match(emailRegex)) {
      error = 'This does not appear to be a valid email address.';
    } else if (!(await this.isEmailAvailable())) {
      error = `${this.userData.email} is already taken.`;
    }

    this.fieldsError = { ...this.fieldsError, email: error };
  }

  /** @inheritdoc */
  async validatePassword() {
    this.userData.password = trimString(this.userData.password as string);
    const invalidPassword =
      this.userData.password.length < this.passwordMinLength ||
      this.userData.password.length > this.passwordMaxLength;

    if (this.userData.password && invalidPassword) {
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
        selectedMailingLists: this.selectedMailingLists,
        loanHistoryFlag: this.loanHistoryFlag,
      })) as ResponseModel;

      if (response.success && response.updatedFields) {
        this.updatedFields = response.updatedFields;
      }
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

    this.updatedFields = {
      ...this.updatedFields,
      ...{
        file: this.userAvatarSuccessMsg,
      },
    } as ResponseModel;
  }

  /**
   * if user selector new profile avatar, we need to dispatch event to ia-pic-uploader component
   */
  emitProfileAvatarSaveEvent() {
    if (this.fileInput?.files?.length) {
      log('profile avatar should be updated!');
      document.dispatchEvent(new Event('saveProfileAvatar'));
    }
  }

  /**
   * dispatch event to unlink provider at ia-third-party-auth component
   */
  emitUnlinkProviderEvent() {
    if (Object.keys(this.unlinkProviders).length === 0) return nothing;

    // if user want to unlinkProvider, dispatch an event to ia-third-party-auth
    const provider = Object.keys(this.unlinkProviders).filter(
      key => key ?? nothing
    );

    if (provider) {
      log(`${provider} provider should be unlinked!`);
      document.dispatchEvent(
        new CustomEvent('IAThirdPartyAuth:unlinkProvider', {
          detail: { provider },
        })
      );
    }

    return nothing;
  }

  get verificationTemplate() {
    return html` <authentication-template
      authenticationType="${!this.linkedProviders.length ? 'ia' : ''}"
      identifier=${this.userData.identifier}
      email=${this.userData.email}
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
    return html`<div class="settings-template">
      <form id="form" name="account-settings" method="post" autocomplete="off">
        <div
          class="form-element header ${this.showLoadingIndicator
            ? 'pointer-none'
            : ''}"
        >
          <h2>Account settings</h2>
          <button
            class="ia-button dark"
            @click=${() => window.location.reload()}
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

        <div class="form-element data-updated">${this.getResponseTemplate}</div>

        <div class="form-element">
          <label>Change profile picture</label>
          <ia-pic-uploader
            identifier=${this.userData.identifier}
            picture="${this.profilePicture}"
            ?lookingAtMyAccount=${true}
            type="compact"
            @fileChanged=${() => {
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
          <input
            type="image"
            class="password-icon"
            src="https://archive.org/images/eye-crossed.svg"
            alt="View text"
            @click=${(e: Event) => {
              preventDefaultAndStopEvent(e);
              togglePassword(e, this.passwordField as HTMLInputElement);
            }}
          />
          <span class="error-field">${this.fieldsError.password}</span>
        </div>

        <div class="form-element">
          <label>Set borrow history</label>
          <input
            type="checkbox"
            id="borrow-history"
            name="borrow-history ${this.loanHistoryFlag}"
            .checked=${this.loanHistoryFlag === 'public' ||
            this.loanHistoryFlag === true}
            @click=${this.setBorrowHistory}
          />
          <label for="borrow-history"> Visible to the public</label>
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
          class="form-element delete-link ${this.attemptToDelete ? 'hide' : ''}"
        >
          <a
            href="javascript:void(0)"
            @click=${() => {
              this.attemptToDelete = true;
              window.scrollTo();
            }}
            >Delete Internet Archive / Open Library account (requires
            confirmation)
          </a>
        </div>

        ${this.attemptToDelete ? this.deleteAccountTemplate : ''}
      </form>

      ${this.userData.isAdmin ? this.adminFunctionsTemplate : ''}
    </div>`;
  }

  get getResponseTemplate() {
    return Object.values(this.updatedFields as object)?.map(
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
          .checked=${this.selectedMailingLists[list[1].key] === true}
          @click=${this.setMailingList}
        />
        <label for="${list[1].key}">
          ${list[1].name}: ${list[1].short_desc}</label
        ><br /> `;
    });
  }

  get linkedAccountTemplate() {
    return Object.keys(this.linkedProviders)?.map(provider => {
      if (this.linkedProviders[provider] === false)
        return html`You have no linked accounts`;

      return html` <input
          name="ia-${provider}"
          id="ia-${provider}"
          type="checkbox"
          data-provider=${provider}
          .checked=${this.linkedProviders[provider] === true}
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
          please do so before delete your account.
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
        <p for="borrow-history">This action cannot be reversed.</p>
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
          <li>
            <a href="https://pi.archive.org/control/blockparty.php"
              >Block Party</a
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
      `,
    ];
  }
}
