import ContentLayout from '@sd-ui-admin/layout/ContentLayout';
import EventRegisterClient from '@sd-ui-admin/app/event/register/client';

export default async function EventRegisterPage() {
  return (
    <ContentLayout title={'이벤트 등록'}>
      <EventRegisterClient />
    </ContentLayout>
  );
}
