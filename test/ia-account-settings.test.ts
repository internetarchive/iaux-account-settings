import { html, fixture, expect } from '@open-wc/testing';
import { stub } from 'sinon';
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
    expect(settingsTemplate?.querySelector('#borrow-history')).to.be.exist;

    // you are an admin
    expect(settingsTemplate?.querySelector('.admin-functions')).to.be.exist;

    // has not linked with third-party accounts
    expect(settingsTemplate?.querySelector('#linked-account')).to.not.be.exist;
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
    el.mailingLists = mailingLists;
    el.selectedMailingLists = ['ml_best_of', 'ml_donors'];
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
    el.mailingLists = mailingLists;
    el.selectedMailingLists = ['ml_best_of', 'ml_donors'];
    el.linkedProviders = { goolge: true };
    el.lookingToAuth = false;

    await el.updateComplete;

    // expect(el.shadowRoot?.querySelector('#linked-account')).to.be.exist;
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
    el.mailingLists = mailingLists;
    el.selectedMailingLists = ['ml_best_of', 'ml_donors'];
    el.lookingToAuth = false;

    await el.updateComplete;

    const settingsTemplate = el.shadowRoot?.querySelector('.settings-template');
    const deleteLink = settingsTemplate?.querySelector(
      '.delete-link a'
    ) as HTMLElement;
    await deleteLink!.click();

    // delete section/option has been rendered
    expect(el.shadowRoot?.querySelector('.delete-section')).to.be.exist;
  });

  it('click on save button', async () => {
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
    el.saveButtonDisabled = false;
    el.lookingToAuth = false;

    await el.updateComplete;

    const settingsTemplate = el.shadowRoot?.querySelector('.settings-template');
    const saveButton = settingsTemplate?.querySelector(
      '.header .primary'
    ) as HTMLElement;

    const saveAccountSettings = stub(el, 'saveAccountSettings');
    await saveButton.click();

    expect(saveAccountSettings).to.have.callCount(1);
  });
});
