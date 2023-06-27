import { html, fixture, expect } from '@open-wc/testing';
import type { IAAccountSettings } from '../src/ia-account-settings';
import '../src/ia-account-settings';
import mailingLists from '../src/assets/mailing-lists';

describe('IAAccountSettings', () => {
  it('default user data/fields rendered on page', async () => {
    const el = await fixture<IAAccountSettings>(
      html`<ia-account-settings></ia-account-settings>`
    );
    el.userData = {
      identifier: '@foo-bar',
      screenname: 'foo-bar',
      email: 'abc@gmail.com',
      isAdmin: true,
    };
    el.mailingLists = mailingLists;
    el.selectedMailingLists = ['ml_best_of', 'ml_donors'];
    el.lookingToAuth = false;

    await el.updateComplete;

    const settingsTemplate = el.shadowRoot?.querySelector('.settings-template');

    // has rendered initial fields for user
    expect(settingsTemplate?.querySelector('ia-pic-uploader')).to.be.exist;
    expect(settingsTemplate?.querySelector('#screenname')).to.be.exist;
    expect(settingsTemplate?.querySelector('#email')).to.be.exist;
    expect(settingsTemplate?.querySelector('#password')).to.be.exist;
    expect(settingsTemplate?.querySelector('#loan-history')).to.be.exist;

    // you are an admin
    expect(settingsTemplate?.querySelector('.admin-functions')).to.be.exist;

    // has not linked with third-party accounts
    expect(settingsTemplate?.querySelector('#ia-google')).to.not.be.exist;
  });

  it('render third-party sign-in authentication template', async () => {
    const el = await fixture<IAAccountSettings>(
      html`<ia-account-settings></ia-account-settings>`
    );
    el.linkedProviders = ['google'];

    await el.updateComplete;

    expect(el.shadowRoot?.querySelector('slot[name="ia-google-login')).to.be
      .exist;
  });

  it('display verification template', async () => {
    const el = await fixture<IAAccountSettings>(
      html`<ia-account-settings></ia-account-settings>`
    );
    el.userData = {
      identifier: '@foo-bar',
      screenname: 'foo-bar',
      email: 'abc@gmail.com',
      isAdmin: true,
    };
    el.lookingToAuth = true;

    await el.updateComplete;

    expect(el.shadowRoot?.querySelector('authentication-template')).to.be.exist;
  });

  it('has google account linked', async () => {
    const el = await fixture<IAAccountSettings>(
      html`<ia-account-settings></ia-account-settings>`
    );
    el.userData = {
      identifier: '@foo-bar',
      screenname: 'foo-bar',
      email: 'abc@gmail.com',
      isAdmin: true,
    };
    el.lookingToAuth = true;

    await el.updateComplete;
    expect(el.shadowRoot?.querySelector('authentication-template')).to.be.exist;
  });

  it('attempted to delete account', async () => {
    const el = await fixture<IAAccountSettings>(
      html`<ia-account-settings></ia-account-settings>`
    );
    el.userData = {
      identifier: '@foo-bar',
      screenname: 'foo-bar',
      email: 'abc@gmail.com',
      isAdmin: true,
    };
    el.lookingToAuth = false;

    await el.updateComplete;

    const settingsTemplate = el.shadowRoot?.querySelector('.settings-template');
    const deleteLink = settingsTemplate?.querySelector(
      '.delete-link'
    ) as HTMLElement;
    await deleteLink!.click();

    // delete section/option has been rendered
    expect(el.shadowRoot?.querySelector('.delete-section')).to.be.exist;
  });

  it('test validation functions', async () => {
    const el = await fixture<IAAccountSettings>(
      html`<ia-account-settings></ia-account-settings>`
    );
    el.userData = {
      identifier: '@foo-bar',
      screenname: 'a',
      password: '1',
      isAdmin: true,
    };
    el.saveButtonDisabled = false;
    el.lookingToAuth = false;
    await el.updateComplete;

    // validation for password input field
    el.validatePassword();
    expect(el.fieldsError.password).to.equal(
      'The password needs to be between 3 and 100 characters long.'
    );

    // validation for password input field
    el.validateEmail();
    expect(el.fieldsError.email).to.equal(
      'This does not appear to be a valid email address.'
    );

    // validation for password input field
    el.validateScreenname();
    expect(el.fieldsError.screenname).to.equal(
      'The screen name needs to be between 3 and 127 characters long.'
    );

    el.userData.screenname = 'neeraj\\sharma';
    await el.updateComplete;
    el.validateScreenname();
    expect(el.fieldsError.screenname).to.equal(
      'This does not appear to be a valid screen name.'
    );
  });

  it('check saveAccountSettings funtion', async () => {
    const el = await fixture<IAAccountSettings>(
      html`<ia-account-settings></ia-account-settings>`
    );
    el.userData = {
      identifier: '@foo-bar',
      screenname: 'foo-bar',
      email: 'abc@gmail.com',
      isAdmin: true,
    };
    el.saveButtonDisabled = false;
    el.lookingToAuth = false;

    await el.updateComplete;
    const event = new Event('click');
    await el.saveAccountSettings(event);

    expect(el.showLoadingIndicator).to.be.true;
    expect(el.saveButtonDisabled).to.be.true;
    expect(el.hasFieldError()).to.be.true;
  });

  it('check profilePictureUpload function', async () => {
    const el = await fixture<IAAccountSettings>(
      html`<ia-account-settings></ia-account-settings>`
    );
    el.userData = {
      identifier: '@foo-bar',
      screenname: 'foo-bar',
      email: 'abc@gmail.com',
      isAdmin: true,
    };
    el.saveButtonDisabled = false;
    el.lookingToAuth = false;

    await el.updateComplete;

    el.changeSaveButtonState();
    el.profilePictureUploaded();
    const updatedFields = el.querySelector('.data-updated span');

    expect(el.saveButtonDisabled).to.be.true;
    expect(updatedFields?.classList);
  });

  it('change password field type to text|password', async () => {
    const el = await fixture<IAAccountSettings>(
      html`<ia-account-settings></ia-account-settings>`
    );
    el.userData = {
      identifier: '@foo-bar',
      screenname: 'foo-bar',
      email: 'abc@gmail.com',
      isAdmin: true,
    };
    el.saveButtonDisabled = false;
    el.lookingToAuth = false;

    await el.updateComplete;
    const settingsTemplate = el.shadowRoot?.querySelector('.settings-template');
    const passwordIcon = settingsTemplate?.querySelector(
      '.password-icon'
    ) as HTMLButtonElement;
    const passwordfield = settingsTemplate?.querySelector(
      '#password'
    ) as HTMLInputElement;

    passwordIcon.click();
    expect(passwordfield.type).to.be.equal('text');

    passwordIcon.click();
    expect(passwordfield.type).to.be.equal('password');
  });

  it('set input fields value to userData', async () => {
    const el = await fixture<IAAccountSettings>(
      html`<ia-account-settings></ia-account-settings>`
    );
    el.userData = {
      identifier: '@foo-bar',
      screenname: 'foo-bar',
      email: 'abc@gmail.com',
      isAdmin: true,
    };
    el.saveButtonDisabled = false;
    el.lookingToAuth = false;

    await el.updateComplete;

    const settingsTemplate = el.shadowRoot?.querySelector('.settings-template');

    // for screenName
    const screanName = settingsTemplate?.querySelector(
      '#screenname'
    ) as HTMLInputElement;
    screanName.value = 'neeraj-archive';
    screanName.dispatchEvent(new InputEvent('input'));
    await el.updateComplete;
    el.resetErrorFields('screanname');
    expect(el.userData.screenname).to.be.equal('neeraj-archive');

    // for email
    const email = settingsTemplate?.querySelector('#email') as HTMLInputElement;
    email.value = 'neeraj123@gmail.com';
    email.dispatchEvent(new InputEvent('input'));
    await el.updateComplete;
    el.resetErrorFields('email');
    expect(el.userData.email).to.be.equal('neeraj123@gmail.com');

    // for password
    const password = settingsTemplate?.querySelector(
      '#password'
    ) as HTMLInputElement;
    password.value = 'neeraj123';
    password.dispatchEvent(new InputEvent('input'));
    await el.updateComplete;
    el.resetErrorFields('password');
    expect(el.userData.password).to.be.equal('neeraj123');

    // for loan History
    const loanCheck = settingsTemplate?.querySelector(
      '#loan-history'
    ) as HTMLInputElement;
    loanCheck.checked = false;
    loanCheck.dispatchEvent(new Event('click'));
    await el.updateComplete;
    el.changeSaveButtonState();
    expect(el.loanHistoryFlag).to.be.equal('private');

    // for linked Provider
    el.linkedProviders = ['google'];
    await el.updateComplete;
    const thirdPartyAuth = settingsTemplate?.querySelector(
      '#ia-google'
    ) as HTMLInputElement;
    thirdPartyAuth.checked = false;
    thirdPartyAuth.dispatchEvent(new Event('click'));
  });
});
