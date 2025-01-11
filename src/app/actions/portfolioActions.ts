"use server"

import prisma from "../../lib/prisma"

type AddPortfolioInput = {
    title: string
    description: string
    imageUrl: string
    tags: string[]
    projectUrl?: string
    githubUrl?: string
}

export async function addPortfolioItem(data: AddPortfolioInput) {
    try {
        const portfolioItem = await prisma.portfolioItem.create({
            data: {
                title: data.title,
                description: data.description,
                imageUrl: data.imageUrl,
                projectUrl: data.projectUrl,
                githubUrl: data.githubUrl,
                tags: data.tags,
            }
        })

        return {
            success: true, data: portfolioItem
        }
    }
    catch (error) {
        console.error("PortfolioActions: Error adding portfolio item: ", error)
        return {
            success: false,
            error: "Erro ao adicionar item de Portfólio"
        }
    }
}