
/**
 * Get the appropriate text for payment period based on language and billing cycle
 * @param preferredLanguage User's preferred language
 * @param isYearly Whether the billing cycle is yearly
 * @returns Localized text for payment period
 */
export const getPaymentPeriodText = (
  preferredLanguage: string,
  isYearly: boolean
): string => {
  if (preferredLanguage === 'Español') {
    return isYearly ? 'Anual' : 'Mensual';
  } else if (preferredLanguage === 'Português') {
    return isYearly ? 'Anual' : 'Mensal';
  }
  return isYearly ? 'Yearly' : 'Monthly';
};

/**
 * Get the savings text based on user's preferred language
 * @param preferredLanguage User's preferred language
 * @returns Localized savings text
 */
export const getSavingsText = (
  preferredLanguage: string
): string => {
  if (preferredLanguage === 'Español') {
    return '¡Ahorra 20%!';
  } else if (preferredLanguage === 'Português') {
    return 'Economize 20%!';
  }
  return 'Save 20%!';
};
