import env from "@/config/env"
import { z } from "zod"

const MovieSchema = z
  .object({
    id: z.number().int(),
    title: z.string(),
    overview: z.string(),
    poster_path: z.string().nullable(),
  })
  .transform((data) => ({
    id: data.id,
    title: data.title,
    overview: data.overview,
    posterPath: data.poster_path,
  }))

export type Movie = z.infer<typeof MovieSchema>

export async function searchMovies(query: string) {
  const response = await fetch(
    env.TMDB_API_URL +
      "search/movie?query=" +
      query +
      "&api_key=" +
      env.TMDB_API_KEY,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    },
  )

  const unparsedData = await response.json()

  const data = z
    .object({
      results: z.array(MovieSchema),
    })
    .parse(unparsedData)

  return data
}
