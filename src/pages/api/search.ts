import { searchMovies } from "@/services/tmdb"
import type { Movie } from "@/services/tmdb"
import type { NextApiRequest, NextApiResponse } from "next"
import { z } from "zod"

const SearchSchema = z.object({
  query: z.string(),
})

type Data =
  | {
      result: Movie[]
    }
  | {
      error: string
    }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const result = SearchSchema.safeParse(req.query)

  if (!result.success) {
    res.status(400).json({ error: "No query provided" })
    return
  }

  const movies = await searchMovies(result.data.query)

  res.status(200).json({ result: movies.results })
}
