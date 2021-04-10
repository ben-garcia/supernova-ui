/**
 * Checks if an input element has been checked
 *
 * it does this by checking for the ':checked' pseduo class
 *
 * @param elementId the id of the input
 *
 * @returns result whether the input is checked
 */
export const inputIsChecked = (elementId: string) => {
  const input = document.getElementById(elementId);
  if (input) {
    return input.matches(':checked');
  }
  return false;
};
