const HTML_TAG_REGEX = /<[^>]*>/g;

interface FieldLimits {
  name: number;
  email: number;
  phone: number;
  address: number;
  general: number;
}

const MAX_LENGTHS: FieldLimits = {
  name: 100,
  email: 254,
  phone: 20,
  address: 500,
  general: 250,
};

/**
 * Strip HTML tags and trim whitespace from user input.
 */
export const stripHtml = (value: string): string =>
  value.replace(HTML_TAG_REGEX, '').trim();

/**
 * Sanitize a text input: strip HTML, enforce max length, trim.
 */
export const sanitizeText = (
  value: string,
  maxLength: number = MAX_LENGTHS.general
): string => stripHtml(value).slice(0, maxLength);

/**
 * Sanitize all string fields in a profile-shaped object.
 */
export const sanitizeProfileData = <T extends Record<string, unknown>>(
  data: T
): T => {
  const fieldLimitMap: Record<string, number> = {
    first_name: MAX_LENGTHS.name,
    last_name: MAX_LENGTHS.name,
    email: MAX_LENGTHS.email,
    mobile: MAX_LENGTHS.phone,
    postal_address: MAX_LENGTHS.address,
    employment_status: MAX_LENGTHS.general,
  };

  const sanitized = { ...data };
  for (const [key, value] of Object.entries(sanitized)) {
    if (typeof value === 'string') {
      const limit = fieldLimitMap[key] ?? MAX_LENGTHS.general;
      (sanitized as Record<string, unknown>)[key] = sanitizeText(value, limit) || undefined;
    }
  }
  return sanitized;
};
