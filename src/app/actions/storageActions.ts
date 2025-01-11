"use server"

import cuid from "@bugsnag/cuid"
import { createClient } from "../../lib/supabase"

const BUCKET_NAME = "portfolio-images"

export async function uploadImage(file: File) {
    try {
        const supabase = createClient()

        const fileExtension = file.name.split(".").pop()
        const fileName = `${cuid()}.${fileExtension}`
        const filePath = `portfolio/${fileName}`

        const {error: uploadError} = await supabase.storage
            .from(BUCKET_NAME)
            .upload(filePath, file)

        if (uploadError) {
            throw new Error("Erro ao fazer upload")
        }

        const {data: publicUrl} = await supabase.storage
            .from(BUCKET_NAME)
            .getPublicUrl(filePath)

        if (!publicUrl) {
            throw new Error("Erro ao capturar a url pública da imagem")
        }

        return {
            success: true,
            data: publicUrl
        }
    }
    catch (error) {
        console.error("storageActions: Error in uploadImage: ", error)
        return {
            success: false,
            error: "Falha ao fazer upload da imagem"
        }
    }
}
