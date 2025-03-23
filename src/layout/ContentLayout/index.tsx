import { ReactNode } from 'react';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import * as styles from './index.css';

export interface ContentLayoutProps {
  title?: string;
  children: ReactNode;
}

function ContentLayout({ children, title }: ContentLayoutProps) {
  return (
    <div className={styles.contentLayout}>
      <h1>{title}</h1>
      {children}
    </div>
  );
}

export default ContentLayout;
