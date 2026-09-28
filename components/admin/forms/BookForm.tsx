
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z, ZodType } from "zod"
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { bookSchema } from "@/lib/validations";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import FileUpload from "@/components/FileUpload";
import ColorPicker from "../ColorPicker";
import { createBook, updateBook } from "@/lib/admin/actions/book";
import { toast } from "@/components/ui/toast";

interface Props extends Partial<Book> {
  type?: "create" | "update"
}

const BookForm = ({
  type, ...book
}: Props) => {

  const router = useRouter();


  const form = useForm<
    z.input<typeof bookSchema>,
    any,
    z.output<typeof bookSchema>
  >({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: book.title ?? '',
      description: book.description ?? '',
      author: book.author ?? '',
      genre: book.genre ?? '',
      rating: book.rating ?? 1,
      totalCopies: book.totalCopies ?? 1,
      coverUrl: book.coverUrl ?? '',
      coverColor: book.coverColor ?? '',
      videoUrl: book.videoUrl ?? '',
      summary: book.summary ?? '',
    },
  })

  const onSubmit = async (values: z.infer<typeof bookSchema>) => {
    const isUpdate = type === "update" && book.id

    const result = isUpdate
      ? await updateBook(book.id!, values)
      : await createBook(values)

    if (result.success) {
      toast.add({
        title: "Success",
        description: isUpdate ? "Book updated successfully" : "Book created successfully",
        type: "success",
      })

      router.push(`/admin/books/${result.data.id}`)
    } else {
      toast.add({
        title: "Error",
        description: result.message,
        type: "error",
      })
    }
  }

  return (

    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name={"title"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Book Title
              </FormLabel>
              <FormControl>


                <Input
                  required
                  className="book-form_input"
                  {...field}
                  placeholder="Book title"
                />

              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"author"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Author
              </FormLabel>
              <FormControl>


                <Input
                  required
                  className="book-form_input"
                  {...field}
                  placeholder="Book author"
                />

              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"genre"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Genre
              </FormLabel>
              <FormControl>


                <Input
                  required
                  className="book-form_input"
                  {...field}
                  placeholder="Book genre"
                />

              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"rating"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Rating
              </FormLabel>
              <FormControl>


                <Input
                  type="number"
                  min={1}
                  max={5}
                  className="book-form_input"
                  {...field}
                  value={field.value as number}
                  placeholder="Book rating"
                />

              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"totalCopies"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Total Copies
              </FormLabel>
              <FormControl>


                <Input
                  type="number"
                  min={1}
                  max={10000}
                  className="book-form_input"
                  {...field}
                  value={field.value as number}
                  placeholder="Total Copies"
                />

              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={"coverUrl"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Book Image
              </FormLabel>
              <FormControl>

                <FileUpload
                  type="image"
                  accept="image/*"
                  placeholder="Upload a book cover"
                  folder="book/covers"
                  variant="light"
                  onFileChange={field.onChange}
                  value={field.value}
                />

              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={"coverColor"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Primary color
              </FormLabel>
              <FormControl>
                <ColorPicker onPickerChange={field.onChange} value={field.value} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"description"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Book Description
              </FormLabel>
              <FormControl>

                <Textarea
                  placeholder="Book description"
                  rows={10}
                  className="book-form_input"
                  {...field}
                />

              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={"videoUrl"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Book Trailer
              </FormLabel>
              <FormControl>
                <FileUpload
                  type="video"
                  accept="video/*"
                  placeholder="Upload a book trailer"
                  folder="book/videos"
                  variant="light"
                  onFileChange={field.onChange}
                  value={field.value}
                />

              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={"summary"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Book Summary
              </FormLabel>
              <FormControl>

                <Textarea
                  placeholder="Book summary"
                  rows={5}
                  className="book-form_input"
                  {...field}
                />

              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


        <Button type="submit" className="book-form_btn">
          {type === "update" ? "Update Book" : "Add Book To Library"}
        </Button>
      </form>
    </Form>


  )
};



export default BookForm