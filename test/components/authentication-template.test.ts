import { html, fixture, expect } from '@open-wc/testing';
import { stub } from 'sinon';
import type { AuthenticationTemplate } from '../../src/components/authentication-template';
import '../../src/components/authentication-template';

describe('AuthenticationTemplate', () => {
  it('render ia password authentication template', async () => {
    const el = await fixture<AuthenticationTemplate>(
      html`<authentication-template></authentication-template>`
    );
    el.authenticationType = 'ia';
    el.identifier = '@foo-bar';
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector('.authentication-template')).to.be
      .exist;
    expect(el.shadowRoot?.querySelector('#password')).to.be.exist;
  });

  it('check set password function ', async () => {
    const el = await fixture<AuthenticationTemplate>(
      html`<authentication-template></authentication-template>`
    );
    el.authenticationType = 'ia';
    el.identifier = '@foo-bar';
    await el.updateComplete;

    const password = el.shadowRoot?.querySelector(
      '#password'
    ) as HTMLInputElement;
    password.value = 'neeraj123';
    password.dispatchEvent(new InputEvent('input'));
    await el.updateComplete;

    expect(el.passwordError).to.be.equal('');
  });

  it('authentication account using ia password', async () => {
    const el = await fixture<AuthenticationTemplate>(
      html`<authentication-template></authentication-template>`
    );
    el.authenticationType = 'ia';
    el.identifier = '@foo-bar';
    await el.updateComplete;

    const button = el.shadowRoot?.querySelector('.primary') as HTMLElement;
    const verifyIAPassword = stub(el, 'verifyIAPassword');
    await button?.click();

    expect(el.shadowRoot?.querySelector('.authentication-template')).to.be
      .exist;
    expect(verifyIAPassword).to.have.callCount(1);
  });
});
