export const hostOf = (subdomain: string) => {
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3032';
  }
  return `https://${subdomain}.luma.dev`;
};
