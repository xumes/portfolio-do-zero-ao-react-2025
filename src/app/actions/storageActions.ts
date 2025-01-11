"use server"

import cuid from "@bugsnag/cuid"
import { createClient } from "../../lib/supabase"

const BUCKET_NAME = "portfolio-images"

export async function uploadImage(file: File) {
    try {
        const supabase = createClient()

        // verifica se o bucket já existe ou cria caso não exista ainda
        createBucketIfNotExist()

        const fileExtension = file.name.split(".").pop()
        const fileName = `${cuid()}.${fileExtension}`
        const filePath = `portfolio/${fileName}`

        const {error: uploadError} = await supabase.storage
            .from(BUCKET_NAME)
            .upload(filePath, file)

        if (uploadError) {
            console.error("UPLOAD ERROR", uploadError)
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

async function createBucketIfNotExist(): Promise<void> {
    const supabase = createClient()

    const {data: buckets, error: bucketError} = await supabase.storage.listBuckets()
    if (bucketError) {
        throw new Error("Erro ao listar os buckets", bucketError)
    }

    const bucketExists = buckets.some(bucket => bucket.name === BUCKET_NAME)

    if (bucketExists) return 

    const {error} = await supabase.storage.createBucket(BUCKET_NAME, {
        public: true
    })

    if (error) {
        throw new Error("Erro ao criar o bucket", error)
    }

    return
}
