/**
 * Helper function to toggle password field visibility
 *
 * @export
 * @param {Event} e
 * @param {HTMLInputElement} passwordField
 */
export async function togglePassword(
  e: Event,
  passwordField: HTMLInputElement
) {
  const field = passwordField;

  if (field?.type === 'password') {
    field.type = 'text';
  } else {
    field.type = 'password';
  }
}

/**
 * Helper function to stop page refresh
 *
 * @export
 * @param {Event} e
 */
export function preventDefaultAndStopEvent(e: Event) {
  e?.preventDefault();
  e?.stopPropagation();
}

/**
 *
 *
 * @export
 * @param {string} value
 * @return {string}
 */
export function trimString(value: string): string {
  return value?.replace('/s+/', ' ')?.trim();
}

/**
 * throttling for scroll event
 *
 * @export
 * @param {Function} callbackFn
 * @param {Number} limit
 * @return {*}  {*}
 */
export function throttle(callbackFn: Function, limit: Number): any {
  let wait = false;
  return () => {
    if (!wait) {
      callbackFn();
      wait = true;
      setTimeout(() => {
        wait = false;
      }, limit as number);
    }
  };
}
