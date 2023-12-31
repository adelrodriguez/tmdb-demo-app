import { APIResponse } from "@/utils/api"
import { Inter } from "next/font/google"
import { Movie } from "@/services/tmdb"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"
import ErrorMessage from "@/components/ErrorMessage"
import Head from "next/head"
import MovieGrid from "@/components/MovieGrid"
import MovieGridLoading from "@/components/MovieGridLoading"
import SearchBar from "@/components/SearchBar"
import styled from "styled-components"

const inter = Inter({ subsets: ["latin"] })

const Main = styled.main`
  display: flex;
  flex-direction: column;
  font-family: ${inter.style.fontFamily};
  height: 100vh;
`

const Hero = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 1rem;

  background-color: #f3f4f6;
  padding: 2rem;
  border-radius: 0.5rem;
`

const H1 = styled.h1`
  font-size: 3rem;
  line-height: 1;
  text-align: center;
`

const ErrorWrapper = styled.div`
  display: flex;
  justify-content: center;

  flex: 1;
  height: 100%;
`

const GridWrapper = styled.div`
  margin: 2.5rem 5rem;
`

export default function Home() {
  const params = useSearchParams()
  const query = params.get("search") || ""

  const { isLoading, error, data } = useQuery({
    queryKey: ["search", query],
    queryFn: () =>
      fetch("/api/search?query=" + query).then((res) => res.json()),
    select: (result: APIResponse<Movie[]>) => {
      if (!result.success) {
        return []
      }

      return result.data
    },
  })

  return (
    <>
      <Head>
        <title>Search Movie DB</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🎬</text></svg>"
        />
      </Head>
      <Main>
        <Hero>
          <H1>Search Movie DB</H1>
          <SearchBar />
        </Hero>
        {!!error && (
          <ErrorWrapper>
            <ErrorMessage message="Something went wrong" />
          </ErrorWrapper>
        )}
        <GridWrapper>
          {isLoading ? <MovieGridLoading /> : <MovieGrid movies={data || []} />}
        </GridWrapper>
      </Main>
    </>
  )
}
