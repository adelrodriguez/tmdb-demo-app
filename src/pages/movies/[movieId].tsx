import { Movie } from "@/services/tmdb"
import { APIResponse } from "@/utils/api"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"

export default function MoviePage() {
  const router = useRouter()
  const movieId = router.query.movieId as string
  const { isLoading, error, data } = useQuery({
    queryKey: [movieId],
    queryFn: () => fetch("/api/movies/" + movieId).then((res) => res.json()),
    select: (result: APIResponse<Movie>) => {
      if (!result.success) {
        return null
      }

      return result.data
    },
  })

  if (error) {
    return <div>Error</div>
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!data) {
    return <main>No data to display</main>
  }

  return (
    <main>
      <h1>{data?.title}</h1>
    </main>
  )
}
