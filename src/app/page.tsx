import Link from "next/link";

export default function Home() {
  return (
    <div>
      <p>welcome to the main page. click the link below!</p>
      <ul>
        <li>
          <Link href={"/event"}>going to the event page</Link>
        </li>
      </ul>
    </div>
  );
}
