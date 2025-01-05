import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export function PortfolioCard() {
    return (
        <Card>
            <div>
                <Image 
                    alt="Titulo do Item de Portofolio" 
                    src=""
                />
            </div>
            <CardHeader>
                <CardTitle>Titulo</CardTitle>
                <CardDescription>Descrição</CardDescription>
            </CardHeader>
            <CardContent>
                <Badge>React</Badge>
                <Badge>Next.js</Badge>
                <Badge>Typescript</Badge>
            </CardContent>
            <CardFooter>
                <Button>Ver Detalhes</Button>
            </CardFooter>
        </Card>
    )
}