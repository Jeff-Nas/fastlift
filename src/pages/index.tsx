import Link from "next/link";
export default function Home() {
  return (
    <div>
      <h2>Bem vindo ao FastLift</h2>
      <div className="flex gap-2">
        <Link href={"/jlg"}>Manuais</Link>
        <Link href="/visualizador">Visualizador</Link>
      </div>
    </div>
  );
}
