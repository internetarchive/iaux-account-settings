/* eslint-disable */
import { html, css, LitElement, CSSResultGroup } from 'lit';
import { property, customElement, state, query } from 'lit/decorators.js';
import { IAButtonStyles } from '../styles/ia-buttons';
import { AccountSettings } from '../styles/account-settings';
import type { GoogleConfigModel, ResponseModel } from '../models';
import { backendServiceHandler } from '../services/backend-service';
import { togglePassword, preventDefault, trimString } from '../services/util';

import '@internetarchive/ia-activity-indicator/ia-activity-indicator';

@customElement('authentication-template')
export class AuthenticationTemplate extends LitElement {
  /**
   * authenticate type eg. ia|third-party
   *
   * @type {string}
   * @memberof AuthenticationTemplate
   */
  @property({ type: String }) authenticationType?: string = 'ia';

  /**
   * user identifier
   *
   * @type {string}
   * @memberof AuthenticationTemplate
   */
  @property({ type: String }) identifier: string = '';

  /**
   * user email/username
   *
   * @type {string}
   * @memberof AuthenticationTemplate
   */
  @property({ type: String }) email: string = '';

  /**
   * google auth configuration
   *
   * @type {GoogleConfigModel}
   * @memberof AuthenticationTemplate
   */
  @property({ type: Object }) googleConfig: GoogleConfigModel = {};

  /**
   * show loading indicator when form is submitted
   *
   * @private
   * @type {boolean}
   * @memberof AuthenticationTemplate
   */
  @state() showLoadingIndicator?: boolean;

  /**
   * hold the password
   * @private
   * @type {string}
   * @memberof IAUXAccountSettings
   */
  @state() private password?: string = '';

  /**
   * hold the password field error
   * @private
   * @type {string}
   * @memberof IAUXAccountSettings
   */
  @state() private passwordError?: string = '';

  @query('.password') private passwordField?: HTMLInputElement;

  /**
   * verify IA password to change you protected settings
   *
   * @param {Event} event
   * @memberof AuthenticationTemplate
   */
  async verifyIAPassword(event: Event) {
    preventDefault(event);

    if (!trimString(this.password as string)) {
      this.passwordField?.focus();
      this.passwordError = " * password can't be empty";
      return;
    }

    this.showLoadingIndicator = true;
    const response = (await backendServiceHandler({
      action: 'verify-password',
      identifier: this.identifier,
      password: trimString(this.password as string),
    })) as ResponseModel;

    if (response.success === true) {
      // successfully authenticated
      this.dispatchEvent(new Event('ia-authenticated'));
    } else {
      this.passwordField?.focus();
      this.passwordError = ' * invalid password';
    }

    this.showLoadingIndicator = false;
  }

  /**
   * set password value to property
   *
   * @param {Event} e
   * @memberof AuthenticationTemplate
   */
  setPassword(e: Event) {
    const input = e.target as HTMLInputElement;
    this.password = input.value;
    this.passwordError = '';
  }

  get iaPasswordVerification() {
    return html`
      <p>Please verify your password again to change protected settings.</p>
      <div class="form-element">
        <label for="password">Internet Archive password</label>
        <input
          type="password"
          class="form-control password"
          id="password"
          name="password"
          required
          @input=${this.setPassword}
        />
        <img
          class="password-icon"
          src="https://archive.org/images/eye-crossed.svg"
          @click=${(e: Event) =>
            togglePassword(e, this.passwordField as HTMLInputElement)}
          alt="Hide text"
        />
        <span class="error-field">${this.passwordError}</span>
        <a
          href="/account/forgot-password?email=${encodeURIComponent(
            this.email
          )}"
          >Forgot password?</a
        >
      </div>
      <div class="form-element">
        <button
          class="ia-button primary ${this.showLoadingIndicator
            ? 'pointer-none'
            : ''}"
          @click=${(e: Event) => {
            this.verifyIAPassword(e);
          }}
        >
          ${this.showLoadingIndicator
            ? html` <ia-activity-indicator
                mode="processing"
                class="go-button-loading-icon"
              ></ia-activity-indicator>`
            : 'Verify password'}
        </button>
      </div>
    `;
  }

  get googleVerification() {
    return html`
      <p>Please sign in again to change protected settings.</p>
      <div class="form-element footer">
        <a @click=${() =>
          (this.authenticationType =
            'ia')}>Prefer to use your Internet Archive password?</a>
      </div>
      <div class="third-party-login-cta">
        <ia-third-party-auth
          verifyUser="${this.googleConfig.verifyUser}"
          csrftoken="${this.googleConfig.csrftoken}"
          googleId="${this.googleConfig.googleId}"
          class="${this.googleConfig.class}"
          baseHost=""${this.googleConfig.baseHost}"
        >
          <div><div id="g_id_signin"></div></div>
        </ia-third-party-auth>
      </div>
    `;
  }

  render() {
    return html`
      <div class="authentication-template">
        <form method="post" name="authentication-settings" autocomplete="off">
          <div class="form-element">
            <h2>Account settings</h2>
          </div>
          ${
            this.authenticationType === 'ia'
              ? this.iaPasswordVerification
              : this.googleVerification
          }
        </form>
      </div
    `;
  }

  /**
   * CSS
   */
  static get styles(): CSSResultGroup {
    return [
      AccountSettings,
      IAButtonStyles,
      css`
        .authentication-template {
          position: relative;
        }
        .authentication-template a {
          display: inherit;
          width: fit-content;
          cursor: pointer;
        }
        .footer {
          position: absolute;
          bottom: -50px;
        }
        .ia-button {
          width: 130px;
          padding: 0 1rem;
        }
      `,
    ];
  }
}
