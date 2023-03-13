export function getNameFromEmail(email: string | undefined): string {
  if (!email) return '';
  const parts = email.split('@');
  return parts[0];
}
