import { getMovie } from "@/services/tmdb"
import type { Movie } from "@/services/tmdb"
import { APIResponse } from "@/utils/api"
import type { NextApiRequest, NextApiResponse } from "next"
import { z } from "zod"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIResponse<Movie>>,
) {
  const result = z
    .object({
      movieId: z.string().min(1),
    })
    .safeParse(req.query)

  if (!result.success) {
    res.status(400).json({ error: "No ID provided", success: result.success })
    return
  }

  try {
    const movie = await getMovie(result.data.movieId)

    res.status(200).json({ data: movie, success: true })
  } catch (error) {
    res.status(500).json({ error: (error as Error).message, success: false })
  }
}
