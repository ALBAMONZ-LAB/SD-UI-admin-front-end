import Link from 'next/link';
import ContentLayout from "@sd-ui-admin/layout/ContentLayout";

export default function Home() {
  return (
    <ContentLayout title={'메인페이지'} >
      <h3>CI/CD 배포 확인중.. EC2 재부팅 테스트..</h3>
    </ContentLayout>
  );
}
