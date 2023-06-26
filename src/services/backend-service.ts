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
    baseHost: '/account/index.php',
    headers: {},
    ...options,
  };

  log(option);

  let baseHost = option.baseHost;
  let response = {};

  let formData = new FormData();
  formData.append('csrf-token', option.csrfToken);
  formData.append('action', option.action);
  formData.append('email', option.email);
  formData.append('identifier', option.identifier);
  formData.append('screenname', option.userData.screenname);

  if (option.action === 'verify-password') {
    formData.append('password', option.userData.password);
  } else if (option.action === 'delete-account') {
    formData.append('delete-confirm', option.confirmDelete);
  } else if (option.action === 'save-account') {
    formData.append('user-data', JSON.stringify(option.userData));
    formData.append('selected-Mailing-lists', option.selectedMailingLists);
    formData.append('loan-history-flag', option.loanHistoryFlag);
  } else if (option.action === 'save-file') {
    formData = option.file;
    baseHost = `${option.endpoint}?${option.getParam}`;
  }

  if (window?.location?.pathname === '/demo/') baseHost = '/demo/';

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
          console.log(option.userData.screenname);
          if (option.userData.screenname === 'neeraj-archive') {
            return {
              success: false,
              updatedFields: {
                csrf_token: 'CSRF token is not valid.',
              },
            };
          } else {
            return {
              success: true,
              updatedFields: {
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
