import Link from 'next/link';

export default function Event() {
  return (
    <ul>
      <li>
        <Link href={'/event/1'}>이벤트1 클릭</Link>
      </li>
      <li>
        <Link href={'/event/2'}>이벤트2 클릭</Link>
      </li>
    </ul>
  );
}
