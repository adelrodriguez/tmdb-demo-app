import { Movie } from "@/services/tmdb"
import { APIResponse } from "@/utils/api"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { Inter } from "next/font/google"
import Head from "next/head"
import styled from "styled-components"
import ErrorMessage from "@/components/ErrorMessage"
import Link from "next/link"
import MovieDetails from "@/components/MovieDetails"
import { generateImageUrl } from "@/utils/image"
import LoadingSpinner from "@/components/Loading"

const inter = Inter({ subsets: ["latin"] })

const Main = styled.main`
  display: flex;
  flex-direction: column;
  font-family: ${inter.style.fontFamily};
  height: 100vh;

  background-color: #f9fafb;
`

const DetailsWrapper = styled.div`
  display: flex;
  max-width: 70rem;

  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin: 0 auto;

  @media (max-width: 70rem) {
    margin: 0 2rem;
  }
`

const GoBack = styled.div`
  cursor: pointer;
  margin-top: 1rem;
  font-size: 1rem;
  line-height: 1.25rem;
  font-weight: 300;
  align-self: flex-end;
`

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

  if (error || data === null) {
    return (
      <Main>
        <ErrorMessage message="Sorry, we couldn't find that movie">
          <Link href="/">Go back home</Link>
        </ErrorMessage>
      </Main>
    )
  }

  if (isLoading) {
    return (
      <>
        <Head>
          <title>Loading... | Movie Details</title>
        </Head>
        <Main>
          <DetailsWrapper>
            <LoadingSpinner />
          </DetailsWrapper>
        </Main>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>{data?.title} | Movie Details</title>
      </Head>
      <Main>
        <DetailsWrapper>
          {data && (
            <>
              <MovieDetails
                {...data}
                imageUrl={data.posterPath && generateImageUrl(data.posterPath)}
                releaseDate={new Date(data.releaseDate)}
              />
              <GoBack onClick={router.back}>🔙 Go back</GoBack>
            </>
          )}
        </DetailsWrapper>
      </Main>
    </>
  )
}
