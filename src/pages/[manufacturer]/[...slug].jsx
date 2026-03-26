import { useRouter } from "next/router";

export default function ManualsPage() {
  const router = useRouter();
  console.log(router.query);
  return (
    <div>
      <h1>{router.asPath}</h1>
    </div>
  );
}
