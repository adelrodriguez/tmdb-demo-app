import env from "@/config/env"
import { z } from "zod"

const MovieSchema = z
  .object({
    id: z.number().int(),
    overview: z.string(),
    poster_path: z.string().nullable(),
    release_date: z.string(),
    title: z.string(),
    vote_average: z.number(),
    vote_count: z.number(),
    popularity: z.number(),
  })
  .transform((data) => ({
    id: data.id,
    overview: data.overview,
    posterPath: data.poster_path,
    releaseDate: data.release_date,
    title: data.title,
    voteAverage: data.vote_average,
    voteCount: data.vote_count,
    popularity: data.popularity,
  }))

export type Movie = z.infer<typeof MovieSchema>

export async function searchMovies(query: string): Promise<Movie[]> {
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

  if (response.status === 401) {
    throw new Error("Invalid TMDB API Key")
  }

  const unparsedData = await response.json()

  const data = z
    .object({
      results: z.array(MovieSchema),
    })
    .parse(unparsedData)

  return data.results
}

export async function getMovie(id: string): Promise<Movie> {
  const response = await fetch(env.TMDB_API_URL + "movie/" + id, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + env.TMDB_API_READ_ACCESS_TOKEN,
    },
  })

  if (response.status === 401) {
    throw new Error("Invalid TMDB API Key")
  }

  const unparsedData = await response.json()

  const data = MovieSchema.parse(unparsedData)

  return data
}
