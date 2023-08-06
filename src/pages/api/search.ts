import { searchMovies } from "@/services/tmdb"
import type { Movie } from "@/services/tmdb"
import { APIResponse } from "@/utils/api"
import type { NextApiRequest, NextApiResponse } from "next"
import { z } from "zod"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIResponse<Movie[]>>,
) {
  const result = z
    .object({
      query: z.string(),
    })
    .safeParse(req.query)

  if (!result.success) {
    res
      .status(400)
      .json({ error: "No query provided", success: result.success })
    return
  }

  const movies = await searchMovies(result.data.query)

  res.status(200).json({ data: movies, success: result.success })
}
