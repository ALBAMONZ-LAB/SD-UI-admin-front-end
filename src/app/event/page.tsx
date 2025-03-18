import Link from 'next/link';
import ContentLayout from '@sd-ui-admin/layout/ContentLayout';

export default function Event() {
  return (
    <ContentLayout title={'이벤트 목록'}>
      <ul>
        <li>
          <Link href={'/event/1'}>이벤트1 클릭</Link>
        </li>
        <li>
          <Link href={'/event/2'}>이벤트2 클릭</Link>
        </li>
      </ul>
    </ContentLayout>
  );
}
