import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <p>CI/CD 배포 확인중.. EC2 재부팅 테스트..</p>
      <ul>
        <li>
          <Link href={'/event-detail'}>going to the event page</Link>
        </li>
        <li>
          <Link href={'/event-history'}>going to the event history page</Link>
        </li>
      </ul>
    </div>
  );
}
