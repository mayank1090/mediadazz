// Minimal curated list of countries and their dial codes.
// This keeps the UI exactly as-is while making the selector dynamic and
// realistic. If you later want a full library (flags, search, formatting),
// swap this out for a package like `react-phone-number-input` or
// `react-phone-input-2`.

export type CountryDial = {
  name: string;
  code: string; // ISO2
  dial_code: string; // e.g. +971
  minLength: number;
  maxLength: number;
};

export const countryDialCodes: CountryDial[] = [
  { name: 'United Arab Emirates', code: 'AE', dial_code: '+971', minLength: 9, maxLength: 9 },
  { name: 'United States', code: 'US', dial_code: '+1', minLength: 10, maxLength: 10 },
  { name: 'India', code: 'IN', dial_code: '+91', minLength: 10, maxLength: 10 },
  { name: 'United Kingdom', code: 'GB', dial_code: '+44', minLength: 10, maxLength: 10 },
  { name: 'Canada', code: 'CA', dial_code: '+1', minLength: 10, maxLength: 10 },
  { name: 'Australia', code: 'AU', dial_code: '+61', minLength: 9, maxLength: 9 },
  { name: 'Germany', code: 'DE', dial_code: '+49', minLength: 10, maxLength: 11 },
  { name: 'France', code: 'FR', dial_code: '+33', minLength: 9, maxLength: 9 },
  { name: 'Saudi Arabia', code: 'SA', dial_code: '+966', minLength: 9, maxLength: 9 },
  { name: 'Pakistan', code: 'PK', dial_code: '+92', minLength: 10, maxLength: 10 },
  { name: 'Bangladesh', code: 'BD', dial_code: '+880', minLength: 10, maxLength: 10 },
  { name: 'Philippines', code: 'PH', dial_code: '+63', minLength: 10, maxLength: 10 },
  { name: 'Singapore', code: 'SG', dial_code: '+65', minLength: 8, maxLength: 8 },
  { name: 'Netherlands', code: 'NL', dial_code: '+31', minLength: 9, maxLength: 9 },
  { name: 'South Africa', code: 'ZA', dial_code: '+27', minLength: 9, maxLength: 9 }
];

export default countryDialCodes;
