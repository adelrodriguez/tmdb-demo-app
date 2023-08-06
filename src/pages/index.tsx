import Head from "next/head"
import { Inter } from "next/font/google"
import { useSearchParams } from "next/navigation"
import SearchBar from "@/components/SearchBar"
import { useQuery } from "@tanstack/react-query"
import { Movie } from "@/services/tmdb"
import MovieGrid from "@/components/MovieGrid"
import { APIResponse } from "@/utils/api"
import styled from "styled-components"
import MovieGridLoading from "@/components/MovieGridLoading"

const inter = Inter({ subsets: ["latin"] })

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
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${inter.className}`}>
        <Hero>
          <H1>Search Movie DB</H1>
          <SearchBar />
        </Hero>
        {!!error && <div>Error</div>}
        <GridWrapper>
          {isLoading ? <MovieGridLoading /> : <MovieGrid movies={data || []} />}
        </GridWrapper>
      </main>
    </>
  )
}
