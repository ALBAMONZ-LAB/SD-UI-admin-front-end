import Link from "next/link";

export default function Home() {
  return (
    <div>
      <p>CI/CD 배포 확인중.. ESLint 수정</p>
      <ul>
        <li>
          <Link href={"/event"}>going to the event page</Link>
        </li>
      </ul>
    </div>
  );
}
