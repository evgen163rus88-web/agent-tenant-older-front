const DATA_KEY = "AUTH_TOKEN";
export interface AuthDto {
  accessToken?: string;
}

export function getBearer() {
  const res = localStorage.getItem(DATA_KEY);

  return res && (JSON.parse(res) as AuthDto);
}

export function setBearer(token: AuthDto) {
  localStorage.setItem(DATA_KEY, JSON.stringify(token));
}

export function clearBearer() {
  localStorage.removeItem(DATA_KEY);
}
