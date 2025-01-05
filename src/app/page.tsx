import Link from "next/link";

export default function Home() {
  return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <section className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
          <h1 className="text-6xl">Bem Vindo ao meu <span className="text-blue-600">Portfólio!</span></h1>
          <p className="mt-3 text-2xl">
            Comece a construir o seu portfólio profissional hoje!
          </p>
          <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
            <Link href="/portfolio" className="p-6 mt-6 text-left border rounded-xl hover:text-blue-600 focus:text-blue-600">
              <h2 className="text-2xl font-semibold">Ver Portfólio</h2>
              <p className="mt-4 text-xl">Explore os projetos e trabalhos realizados.</p>
            </Link>
            <Link href="/admin" className="p-6 mt-6 text-left border rounded-xl hover:text-blue-600 focus:text-blue-600">
              <h2 className="text-2xl font-semibold">Área Administrativa</h2>
              <p className="mt-4 text-xl">Gerencie seu portfólio (requer login).</p>
            </Link>
          </div>
        </section>
        <section>
          <div className="w-full px-20 bg-secondary">
            <h2 className="text-4xl font-bold mb-4">Sobre o Projeto</h2>
            <p className="text-xl mb-4">
            Este portfolio foi criado como parte de um curso moderno de React e Next.js,
            demonstrando as melhores práticas e tecnologias atuais de desenvolvimento web.
            </p>
            <p className="text-xl">
            Explore as diferentes seções para ver como utilizamos componentes reutilizáveis,
            roteamento dinâmico, e integrações com serviços modernos como Supabase e Clerk.
            </p>
          </div>
        </section>
      </div>
  );
}
