import Link from "next/link";
export default function Home() {
  return (
    <div>
      <h2>Bem vindo ao FastLift</h2>
      <Link href={"/jlg"}>Manuais</Link>
    </div>
  );
}
