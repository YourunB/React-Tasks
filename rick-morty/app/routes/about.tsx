import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Rick and Morty" },
    { name: "description", content: "Rick and Morty characters" },
  ];
};

export default function About() {
  return (
    <div>About</div>
  );
}
