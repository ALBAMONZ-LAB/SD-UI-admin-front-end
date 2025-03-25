import { PageJsonContentsItem } from '@sd-ui-admin/types';

export interface FloatingButtonProps {
  contents: PageJsonContentsItem;
}

export const FloatingButton = ({ contents }: FloatingButtonProps) => (
  <button style={contents.style} aria-disabled>
    {contents.text}
  </button>
);
