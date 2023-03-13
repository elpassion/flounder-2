export const getMaskedEmail = (email: string) => {
  const emailParts = email.split('@');
  if (emailParts.length !== 2) throw new Error('Pass valid email');
  const maskedFirstPart = `${emailParts[0][0]}***`;
  const maskedSecondPart = `${emailParts[1][0]}***`;
  return `${maskedFirstPart}@${maskedSecondPart}`;
};
