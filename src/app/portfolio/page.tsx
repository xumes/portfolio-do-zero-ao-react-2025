import { PortfolioCard } from "../components/PortfolioCard";

const portfolioItems = [
  {
    id: "abc001",
    title: "Meu primeiro portfólio",
    description: "Este item foi crado durante o curso Do Zero Ao React 2025",
    imageUrl: "/placeholder.svg",
    tags: ["Typescript", "React", "Next.js"],
  },
  {
    id: "xpto001",
    title: "E-commerce Website",
    description:
      "A fully functional online store built with Next.js and Stripe",
    imageUrl: "/placeholder.svg?height=300&width=400",
    tags: ["Next.js", "React", "Stripe", "Tailwind CSS"],
  },
  {
    id: "xpto002",
    title: "Task Management App",
    description: "A productivity app for managing daily tasks and projects",
    imageUrl: "/placeholder.svg?height=300&width=400",
    tags: ["React", "Redux", "Node.js", "MongoDB"],
  },
  {
    id: "xpto003",
    title: "Weather Dashboard",
    description: "Real-time weather information with interactive maps",
    imageUrl: "/placeholder.svg?height=300&width=400",
    tags: ["React", "OpenWeatherMap API", "Leaflet"],
  },
  {
    id: "xpto004",
    title: "Social Media Analytics Tool",
    description: "Track and analyze social media performance across platforms",
    imageUrl: "/placeholder.svg?height=300&width=400",
    tags: ["Python", "Django", "D3.js", "REST APIs"],
  },
  {
    id: "xpto005",
    title: "Fitness Tracking Mobile App",
    description: "iOS and Android app for tracking workouts and nutrition",
    imageUrl: "/placeholder.svg?height=300&width=400",
    tags: [
      "React Native",
      "Firebase",
      "HealthKit",
      "Google Fit",
      "Supabase",
      "Shadcn/ui",
    ],
  },
  {
    id: "xpto006",
    title: "AI-powered Chatbot",
    description: "Customer service chatbot with natural language processing",
    imageUrl: "/placeholder.svg?height=300&width=400",
    tags: ["Python", "TensorFlow", "NLP", "Flask"],
  },
];

export default function PortfolioPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-semibold mb-8 text-center">
        Página Portfolio
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolioItems.map((item) => (
          <PortfolioCard
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.description}
            imageUrl={item.imageUrl}
            tags={item.tags}
          />
        ))}
      </div>
    </div>
  );
}
