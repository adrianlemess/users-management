export type User = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

export type UserSignInInput = {
  email: string;
  password: string;
};

export type UserSignInResponse = {
  token: string;
};

export type UserSignUpResponse = UserSignInResponse & {
  id: number;
};

// Since the API doesn't return the password in the Get User endpoints, we will not include it in the User type
export type UserSignUpInput = User & {
  password: string;
};

export type REQUEST_STATUS = "idle" | "pending" | "resolved" | "rejected";