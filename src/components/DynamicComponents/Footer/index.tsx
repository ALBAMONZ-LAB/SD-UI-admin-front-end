import { PageJsonContentsItem, StyleConfig } from '@sd-ui-admin/types';

export interface FooterProps {
  contents: Partial<PageJsonContentsItem>;
  sectionStyle?: Partial<StyleConfig>;
}

export const Footer = ({ contents }: FooterProps) => {
  return <footer style={contents.style}>{contents.src}</footer>;
};
