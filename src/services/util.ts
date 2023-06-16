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
  const button = e.target as HTMLImageElement;
  const field = passwordField;

  if (field?.type === 'password') {
    field.type = 'text';
    button.src = 'https://archive.org/images/eye.svg';
    button.alt = 'View text';
  } else {
    field.type = 'password';
    button.src = 'https://archive.org/images/eye-crossed.svg';
    button.alt = 'Hide text';
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
