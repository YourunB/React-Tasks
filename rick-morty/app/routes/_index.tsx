import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { useSearchParams } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Rick and Morty" },
    { name: "description", content: "Rick and Morty characters" },
  ];
};

export default function Index() {
  const seacrh = useSearchParams();
  console.log(seacrh)
  return (
    <div>
      <div>Test</div>
      <Link to="/about">Open</Link>
    </div>
  );
}
