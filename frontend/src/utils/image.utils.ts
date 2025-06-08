export function isBase64Image(str?: string): boolean {
  if (!str) return false;
  return /^data:image\/[a-zA-Z0-9.+-]+;base64,[A-Za-z0-9+/=]+$/.test(str);
}
