/* eslint-disable */

import log from './log';

/**
 * Helper to call loan service
 * @param {Object} options
 */
export async function backendServiceHandler(options: any) {
  const option = {
    action: null,
    identifier: '',
    userData: {},
    selectedMailingLists: [],
    csrfToken: '',
    baseHost: '/account/index.php',
    headers: {},
    ...options,
  };

  log(option);

  let baseHost = option.baseHost;
  let response = {};

  let formData = new FormData();
  formData.append('action', option.action);
  formData.append('identifier', option.identifier);
  formData.append('csrf-token', option.csrfToken);

  if (option.action === 'email-available') {
    formData.append('email', option.email);
  } else if (option.action === 'screenname-available') {
    formData.append('screenname', option.screenname);
  } else if (option.action === 'verify-password') {
    formData.append('password', option.password);
  } else if (option.action === 'delete-account') {
    formData.append('delete-confirm', option.confirmDelete);
  } else if (option.action === 'save-account') {
    formData.append('userdata', JSON.stringify(option.userData));
    formData.append('selected-mailing-lists', option.selectedMailingLists);
    formData.append('loan-history-flag', option.loanHistoryFlag);
  }

  if (window?.location?.pathname === '/demo/') baseHost = '/demo/';

  console.log(window?.location.pathname);

  try {
    await fetch(baseHost, {
      mode: 'no-cors',
      method: 'POST',
      headers: option.headers,
      body: formData,
    })
      .then(response => {
        log('response - ', response);

        /**
         * return success response for /demo/ server...
         * @ignore
         */
        if (baseHost === '/demo/') {
          if (
            option.userData.screenname === 'neeraj-archive' &&
            option.action === 'email-available'
          ) {
            return {
              success: false,
              error:
                'Invalid CSRF token, please refresh the page and try again later.',
            };
          } else {
            return {
              success: true,
              fields: {
                screenname: 'Your screen name has been updated successfully.',
                mailing_lists: 'Mailing lists has been updated!',
              },
            };
          }
        }

        /**
         * The response is a Response instance.
         * You parse the data into a useable format using `.json()`
         */
        return response.json();
      })
      .then(data => {
        response = data;
      });
  } catch (error) {}

  return response;
}
