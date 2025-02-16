export type AuthenticationRequest = {
  email?: string,
  password?: string
}

export type AuthenticationResponse = {
  token?: string
}

export type RegistrationRequest = {
  firstname?: string;
  username?: string;
  email?: string;
  password?: string;
}
