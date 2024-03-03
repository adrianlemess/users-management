// Note: This file is used to store all the constants that come from .env files
// This file is also used to mock the constants when running tests
// See: https://stackoverflow.com/a/74882007
const { VITE_API_URL: BASE_URL } = import.meta.env;

export { BASE_URL };
