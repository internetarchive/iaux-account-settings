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
import { togglePassword, preventDefault, trimString } from './services/util';
import { AccountSettings } from './styles/account-settings';
import { IAButtonStyles } from './styles/ia-buttons';
import type { IAAccountSettingsInterface } from './ia-account-settings.interface';
import type {
  UserModel,
  ErrorModel,
  ResponseModel,
  MailingListsModel,
  SelectedMailingListsModel,
  GoogleConfigModel,
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
   * @type {String}
   */
  @property({ type: String }) profilePicture: String = '';

  /**
   * contain boolean status about google account is linked
   * @type {String | Boolean}
   */
  @property({ type: String }) loanHistoryFlag: String | Boolean = '';

  /**
   * contain boolean status about google account is linked
   * @type {Boolean}
   */
  @property({ type: Boolean }) googleLinked: Boolean = false;

  /**
   * google auth config
   *
   * @type {GoogleConfigModel}
   * @memberof IAAccountSettings
   */
  @property({ type: Object }) googleConfig: GoogleConfigModel = {};

  /**
   * contain boolean status about google account is linked
   * @type {String}
   */
  @property({ type: String }) profileCsrfToken: String = '';

  /**
   * contain fileSelect input field
   * @type {HTMLInputElement}
   */
  @state() private fileInput?: HTMLInputElement;

  /**
   * determine if want to show authenticate page
   *
   * @private
   * @type {Boolean}
   * @memberof IAUXAccountSettings
   */
  @state() private lookingToAuth?: Boolean = true;

  /**
   * contains error data for form fields
   *
   * @private
   * @type {ErrorModel}
   * @memberof IAUXAccountSettings
   */
  @state() private fieldsError: ErrorModel = {};

  /**
   * determine if need to show loading indicator on buttons
   * @private
   * @type {Boolean}
   * @memberof IAUXAccountSettings
   */
  @state() showLoadingIndicator?: Boolean;

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
   * determine if need to disable save button
   *
   * @private
   * @type {Boolean}
   * @memberof IAAccountSettings
   */
  @state() saveButtonDisabled?: Boolean = true;

  /**
   * object that contains updated fields data/text
   *
   * @private
   * @type {Object}
   * @memberof IAAccountSettings
   */
  @state() private updatedFields?: ResponseModel = {};

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
    'Your profile picture uploaded succesfully, it may take few seconds to reflect.';

  private oldUserData: UserModel = {
    email: '',
    screenname: '',
  };

  firstUpdated() {
    this.oldUserData = Object.assign(this.oldUserData, {
      email: this.userData.email,
      screenname: this.userData.screenname,
    });
  }

  updated(changed: PropertyValues) {
    this.fileInput = this.iaPicUploader?.shadowRoot?.querySelector(
      '.file-selector'
    ) as HTMLInputElement;

    if (changed.has('userData') || changed.has('selectedMailingLists')) {
      this.showLoadingIndicator = false;
      this.updatedFields = {};
    }
  }

  render() {
    const keepAuth = localStorage.getItem('keep-authenticated');
    return html`
      <main id="maincontent">
        <div class="container">
          ${this.lookingToAuth && keepAuth !== 'yes'
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
    this.saveButtonDisabled = false;
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

    this.saveButtonDisabled = false;
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

    this.fieldsError = errorFields;
    this.saveButtonDisabled = false;
  }

  /** @inheritdoc */
  hasFieldError() {
    /* eslint-disable-next-line array-callback-return, consistent-return */
    return Object.values(this.fieldsError).every(value => {
      if (value !== '') {
        return true;
      }
    });
  }

  /** @inheritdoc */
  async validateScreenname() {
    let error = '';
    this.userData.screenname = trimString(this.userData.screenname as string);

    if (this.userData.screenname === '') {
      error = 'Screen name can not be empty.';
    } else if (this.userData.screenname?.match(/[\\]/gm)) {
      error = 'Invalid screen name';
    } else if ((await this.isScreennameAvailable()) === false) {
      error = 'This screen name is already being used by another user.';
    }

    if (error) this.saveButtonDisabled = true;
    this.fieldsError = { ...this.fieldsError, screenname: error };
  }

  /** @inheritdoc */
  async validateEmail() {
    let error = '';
    this.userData.email = trimString(this.userData.email as string);

    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (this.userData.email === '') {
      error = 'Email address can not be empty.';
    } else if (!this.userData.email?.match(emailRegex)) {
      error = 'Email address contains invalid characters and/or whitespace.';
    } else if (await !this.isEmailAvailable()) {
      error = 'This email address is already being used by another user.';
    }

    if (error) this.saveButtonDisabled = true;
    this.fieldsError = { ...this.fieldsError, email: error };
  }

  /** @inheritdoc */
  async validatePassword() {
    this.userData.password = trimString(this.userData.password as string);
    const invalidPassword =
      this.userData.password.length < this.passwordMinLength ||
      this.userData.password.length > this.passwordMaxLength;

    if (this.userData.password && invalidPassword) {
      this.saveButtonDisabled = true;
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
    preventDefault(event);

    await this.validateScreenname();
    await this.validateEmail();
    await this.validatePassword();

    // check if user selected different user-avatar,
    // if yes, dispatch an event to ia-pic-uploader component
    if (this.fileInput?.files?.length) {
      document.dispatchEvent(new CustomEvent('saveProfileAvatar'));
    }

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
    this.saveButtonDisabled = false;

    this.updatedFields = {
      ...this.updatedFields,
      ...{
        file: this.userAvatarSuccessMsg,
      },
    } as ResponseModel;
  }

  get verificationTemplate() {
    return html` <authentication-template
      authenticationType="${this.googleLinked ? 'google' : 'ia'}"
      identifier=${this.userData.identifier}
      email=${this.userData.email}
      googleConfig=${JSON.stringify(this.googleConfig)}
      @ia-authenticated=${() => {
        this.lookingToAuth = false;
        try {
          localStorage.setItem('keep-authenticated', 'yes');
        } catch (error) {
          /** it's ok to empty */
        }
      }}
    ></authentication-template>`;
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
            type="compact"
            @fileChanged=${() => {
              this.saveButtonDisabled = false;
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
          <img
            class="password-icon"
            src="https://archive.org/images/eye-crossed.svg"
            @click=${(e: Event) =>
              togglePassword(e, this.passwordField as HTMLInputElement)}
            alt="View text"
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
          ${this.googleLinked
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

    return Object.entries(this.mailingLists as object).map(list => {
      if (!list[1].public) return html``;

      return html`<input
          type="checkbox"
          id="${list[1].key}"
          name="${list[1].key}"
          .checked=${this.selectedMailingLists?.includes(list[1].key as string)}
          @click=${this.setMailingList}
        />
        <label for="${list[1].key}">
          ${list[1].name}: ${list[1].short_desc}</label
        ><br /> `;
    });
  }

  get linkedAccountTemplate() {
    return html` <input
        name="linked-account"
        id="linked-account"
        type="checkbox"
        .checked="${this.googleLinked}"
      />
      <label for="linked-account"> Google</label>`;
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
          color: var(--iaux-account-settings-text-color, #000);
          font-size: 1.4rem;
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
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
