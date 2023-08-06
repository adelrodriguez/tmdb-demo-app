import { Movie } from "@/services/tmdb"
import MovieTile from "@/components/MovieTile"
import styled from "styled-components"
import Link from "next/link"

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
`

const NavLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`

export default function MovieGrid({ movies }: { movies: Movie[] }) {
  function getMovieYear(releaseDate: string) {
    const year = new Date(releaseDate).getFullYear()

    if (isNaN(year)) return null

    return year
  }
  return (
    <Container>
      {movies.map((movie) => (
        <NavLink href={`/movies/${movie.id}`} key={movie.id}>
          <MovieTile
            title={movie.title}
            imageUrl={
              movie.posterPath &&
              `https://image.tmdb.org/t/p/original${movie.posterPath}`
            }
            year={getMovieYear(movie.releaseDate)}
          />
        </NavLink>
      ))}
    </Container>
  )
}
