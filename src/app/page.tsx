import Link from "next/link";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
          <h1 className="text-6xl">Bem Vindo ao meu <span className="text-blue-600">Portfólio!</span></h1>
          <p className="mt-3 text-2xl">
            Comece a construir o seu portfólio profissional hoje!
          </p>
          <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
            <Link href="/portfolio" className="p-6 mt-6 text-left border rounded-xl hover:text-blue-600 focus:text-blue-600">
              <h2 className="text-2xl font-semibold">Ver Portfólio</h2>
              <p className="mt-4 text-xl">Explore os projetos e trabalhos realizados.</p>
            </Link>
            <div className="p-6 mt-6 text-left border rounded-xl hover:text-blue-600 focus:text-blue-600">
              <h2 className="text-2xl font-semibold">Área Administrativa</h2>
              <p className="mt-4 text-xl">Gerencie seu portfólio (requer login).</p>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
