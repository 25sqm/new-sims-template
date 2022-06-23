export function encodeToken(token: any) {
  return token.split("|").pop();
}
