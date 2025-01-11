"use client";

import {z} from "zod"
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { toast } from "@/hooks/use-toast";
import { uploadImage } from "../actions/storageActions";
import { addPortfolioItem } from "../actions/portfolioActions";
import { useRouter } from "next/navigation";

const MAX_FILE_SIZE = 5000000 // 5MB

const formSchema = z.object({
  title: z.string().min(2, 
    {message: "O título deve ter pelo menos 2 caracteres"}
    ).max(50,
    {message: "O título deve ter no máximo 50 caracteres"}
    ),
  description: z.string(),
  image: z.any()
    .refine((files) => files?.length == 1, {message: "A imagem é obrigatória"})
    .refine((files) => files?.[0].size <= MAX_FILE_SIZE, {message: "Tamanho máximo de 5Mb"}),
  tags: z.string(),
  projectUrl: z.string().optional().refine(
        (url) => !url || z.string().url().safeParse(url).success, 
        { message: "Por favor, insira uma URL válida para o seu projeto, ou deixe em branco."}
  ),
  githubUrl: z.string().optional().refine(
    (url) => !url || z.string().url().safeParse(url).success, 
    { message: "Por favor, insira uma URL válida para o seu repositório, ou deixe em branco."}
),
})

export default function PorftolioForm() {
  const router = useRouter()
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      tags: "",
      githubUrl: "",
      projectUrl: ""
    }
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()

    reader.onloadend = () => {
      setPreviewImage(reader.result as string)
    }

    reader.readAsDataURL(file)
  }

  const handleFormSubmit = async (value: z.infer<typeof formSchema>) => {
    try {
      const file = value.image[0]

      // Upload da Imagem usando Server Action
      const { success: uploadImageSuccess, data: image, error: uploadError } = await uploadImage(file)
      if (!uploadImageSuccess) {
        throw new Error(uploadError)
      }

      const imageUrl = image?.publicUrl ? image.publicUrl : ""
      console.log("Url da Imagem no Supabase storage", imageUrl)

      // Salvar no banco de dados usando Server Action
      const {success, data, error} = await addPortfolioItem({
        title: value.title,
        description: value.description,
        imageUrl: imageUrl,
        tags: value.tags.split(",").map(tag => tag.trim()),
        projectUrl: value.projectUrl,
        githubUrl: value.githubUrl
      })

      if (!success) {
        throw new Error(error)
      }

      console.log("Dados inseridos no banco de dados:", data)

      toast({
        title: "Projeto adicionado com sucesso!",
        description: "Seu novo projeto foi adicionado ao portfólio",
        variant: "default"
      })

      router.push("/admin")

    } catch (error) {
      console.error("FormOnSubmit: Erro ao adicionar projeto", error)
      toast({
        title: "Erro ao adicionar um projeto",
        description: "Ocorreu um erro ao adicionar o projeto. Por favor, tente novamente",
        variant: "destructive"
      })
    }
  }

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <Card className="w-full md:w-1/2 px-8 py-4">
      <Form {...form}>
      <form className="space-y-8" onSubmit={form.handleSubmit(handleFormSubmit)}>
        <FormField
          control={form.control}
          name="title"
          render={({field}) => (
            <FormItem>
              <FormLabel>Título do Projeto</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>o nome do seu projeto</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({field}) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormDescription>
                uma descrição detalhada do seu projeto
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          render={({field: {onChange, value, ...rest}}) => (
            <FormItem>
              <FormLabel>URL da Imagem</FormLabel>
              <FormControl>
                <Input 
                  type="file"
                  accept="image/*"
                  multiple={false}
                  onChange={(e) => {
                    onChange(e.target.files)
                    handleImageUpload(e)
                  }}
                  {...rest}
                />
              </FormControl>
              <FormDescription>
                a URL da imagem principal do seu projeto
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({field}) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <Input placeholder="React, Next.js, Tailwind" {...field} />
              </FormControl>
              <FormDescription>Tags separadas por vírgula</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="projectUrl"
          render={({field}) => (
            <FormItem>
              <FormLabel>URL do projeto</FormLabel>
              <FormControl>
                <Input placeholder="https://www.meu-projeto.com" {...field} />
              </FormControl>
              <FormDescription>
                A URL onde seu projeto está hospedado
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="githubUrl"
          render={({field}) => (
            <FormItem>
              <FormLabel>URL do Github</FormLabel>
              <FormControl>
                <Input placeholder="https://www.github.com/usuario/repositorio" {...field} />
              </FormControl>
              <FormDescription>
                A URL do repositório Github do projeto
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Salvar</Button>
      </form>
    </Form>
    </Card>
    <Card className="w-full md:w-1/2">
          <CardHeader>
            <CardTitle>Preview da Imagem</CardTitle>
          </CardHeader>
          <CardContent>
            {previewImage ? (
              <div className="relative w-full h-64">
                <Image 
                  alt="Preview da Imagem do projeto"
                  src={previewImage}
                  layout="fill"
                  objectFit="cover"
                  className="rouded-md"
                />
              </div>
            ) : (
              <div className="w-full h-64 flex items-center justify-center rounded-md">
                <p>Nenhuma imagem selecionada</p>
              </div>
            )}
          </CardContent>
    </Card>
    </div>
    
  );
}
