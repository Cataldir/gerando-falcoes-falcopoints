const LINKEDIN_SHARE_URL = 'https://www.linkedin.com/sharing/share-offsite/?url=';
const FACEBOOK_SHARE_URL = 'https://www.facebook.com/sharer/sharer.php?u=';

export const getLinkedInShareLink = (message: string) => {
  const encoded = encodeURIComponent(message);
  return `${LINKEDIN_SHARE_URL}${encoded}`;
};

export const getFacebookShareLink = (message: string) => {
  const encoded = encodeURIComponent(message);
  return `${FACEBOOK_SHARE_URL}${encoded}`;
};
