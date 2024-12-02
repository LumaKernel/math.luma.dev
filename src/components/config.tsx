import type { FC } from 'react';
import { NextSeo } from 'next-seo';

export type Props = {
  title?: string;
  description?: string;
  path?: string;
  subdomain?: string;
  published?: boolean;
  isIpynb?: boolean;
  ipynbLang?: string;
  ipynbRelPath?: string;
  termUsage: {
    defined: Array<{
      termName: string;
      placeSlug?: string | null;
    }>;
    used: Array<{
      termName: string;
      placeSlug?: string | null;
    }>;
  };
};
const Config: FC<Props> = ({ title, path, subdomain, description }) => (
  <>
    <NextSeo
      title={`${title} - ${subdomain}.luma.dev`}
      description={description}
      canonical={`https://${subdomain}.luma.dev/${path}`}
    />
  </>
);

export default Config;
