'use client';

import Link from 'next/link';
import { useState } from 'react';
import * as styles from './index.css';

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* 모바일에서 사이드바 토글 버튼 */}
      <button className={styles.toggleButton} onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>

      {/* 사이드바 메뉴 */}
      <aside className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}>
        <Link href="/" className={styles.sidebarHeader}>
          SD-UI Admin
        </Link>
        <nav>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link href="/event" className={styles.navLink}>
                이벤트 목록
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/event-history" className={styles.navLink}>
                이벤트 이력
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
