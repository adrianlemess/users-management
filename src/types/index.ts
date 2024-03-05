export type Pagination<T> = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: T[];
};

export type User = {
  // When we send the user to the API, we don't include the id
  id?: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar?: string;
};

export type UserSignInInput = {
  email: string;
  password: string;
};

export type UserSignResponse = {
  id?: number;
  token: string;
  email?: string;
  first_name?: string;
  last_name?: string;
};

// Since the API doesn't return the password in the Get User endpoints, we will not include it in the User type
export type UserSignUpInput = User & {
  password: string;
};

export type REQUEST_STATUS = "idle" | "pending" | "resolved" | "rejected";
