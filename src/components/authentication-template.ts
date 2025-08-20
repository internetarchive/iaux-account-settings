/* eslint-disable */
import { html, css, LitElement, CSSResultGroup } from 'lit';
import { property, customElement, state, query } from 'lit/decorators.js';
import { IAButtonStyles } from '../styles/ia-buttons';
import { AccountSettings } from '../styles/account-settings';
import type { ResponseModel } from '../models';
import { backendServiceHandler } from '../services/backend-service';
import { togglePassword, preventDefaultAndStopEvent } from '../services/util';

import '@internetarchive/ia-activity-indicator';

import eyeCrossed from '../assets/eye-crossed';
import eyeOpen from '../assets/eye-open';

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
   * contain profile csrf token
   *
   * @type {String}
   * @memberof IAUXAccountSettings
   */
  @property({ type: String }) csrfToken: string = '';

  /**
   * show loading indicator when form is submitted
   *
   * @private
   * @type {boolean}
   * @memberof AuthenticationTemplate
   */
  @state() showLoadingIndicator?: boolean;

  /**
   * toggle password field type to text|password
   * @type {Boolean}
   * @memberof IAUXAccountSettings
   */
  @state() private showPassword?: Boolean = false;

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
  @state() passwordError?: string = '';

  @query('.password') private passwordField?: HTMLInputElement;

  /**
   * verify IA password to change you protected settings
   *
   * @param {Event} event
   * @memberof AuthenticationTemplate
   */
  async verifyIAPassword(event: Event) {
    preventDefaultAndStopEvent(event);

    if (!this.password) {
      this.passwordField?.focus();
      this.passwordError = " * password can't be empty";
      return;
    }

    this.showLoadingIndicator = true;
    const response = (await backendServiceHandler({
      action: 'verify-password',
      identifier: this.identifier,
      password: this.password,
      csrfToken: this.csrfToken,
    })) as ResponseModel;

    if (response.success === true) {
      // successfully authenticated
      this.dispatchEvent(
        new CustomEvent('ia-authenticated', {
          detail: { token: response.token },
        })
      );
    } else {
      this.passwordField?.focus();
      this.passwordError = response.error;
    }

    this.showLoadingIndicator = false;
  }

  /**
   * set password value to property
   *
   * @param {Event} event
   * @memberof AuthenticationTemplate
   */
  setPassword(event: Event) {
    const input = event.target as HTMLInputElement;
    this.password = input.value;
    this.passwordError = '';
  }

  get iaPasswordVerification() {
    return html`
      <p class="title">
        To access your account settings, as an extra security measure, please
        enter your password.
      </p>
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
          @click=${(event: Event) => {
            this.verifyIAPassword(event);
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

  get providerVerification() {
    return html`
      <p class="title">
        To access your account settings, as an extra security measure, please
        sign in with Google.
      </p>
      <div class="form-element footer">
        <a @click=${() => (this.authenticationType = 'ia')}
          >Prefer to use your Internet Archive password?</a
        >
      </div>
      <slot></slot>
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
              : this.providerVerification
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
        .authentication-template .title {
          max-width: 35rem;
          margin-bottom: 2rem;
        }
        .footer {
          position: absolute;
          bottom: -50px;
          width: 300px;
        }
        .ia-button {
          width: 130px;
          padding: 0 1rem;
        }
      `,
    ];
  }
}
