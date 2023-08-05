import Head from "next/head"
import { Inter } from "next/font/google"
import { useSearchParams } from "next/navigation"
import SearchBar from "@/components/SearchBar"
import { useQuery } from "@tanstack/react-query"
import { Movie } from "@/services/tmdb"
import MovieGrid from "@/components/MovieGrid"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
  const params = useSearchParams()
  const query = params.get("search") || ""

  const { isLoading, error, data } = useQuery({
    queryKey: ["search", query],
    queryFn: () =>
      fetch("/api/search?query=" + query).then((res) => res.json()),
    select: (data) => data.result as Movie[],
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
        <SearchBar />
        <MovieGrid movies={data || []} />
      </main>
    </>
  )
}
