export function encodeToken(token) {
  return token.split("|").pop();
}
