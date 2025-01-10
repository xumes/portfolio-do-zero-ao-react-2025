import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function AdminPage() {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Gerenciar Portfolio</h1>
        <Button asChild>
          <Link href="/admin/portfolio/new">
            <PlusCircle className="mr-2 h-5 w-5" /> Novo Item
          </Link>
        </Button>
      </div>
      <div>
        <h2>Table</h2>
      </div>
    </div>
  );
}
