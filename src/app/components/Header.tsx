import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export default function Header() {
    return (
        <header className="sticky top-0 z-50 bg-background/90 border-b shadow-sm">
            <nav className="container mx-auto px-6 py-3">
                <ul className="flex justify-between items-center">
                    <li>
                        <Link href="/" className="text-lg font-semibold text-foreground">
                            Meu Portfólio
                        </Link>
                    </li>
                    <li className="flex items-center space-x-4">
                        <Link href="/portfolio" className="text-foreground hover:text-foreground/80">  
                            Projetos
                        </Link>

                        <Link href="/admin" className="text-foreground hover:text-foreground/80"> 
                            Admin
                        </Link>
                        
                        <ThemeToggle />
                    </li>
                </ul>
            </nav>
        </header>
    )
}

