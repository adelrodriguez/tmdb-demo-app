import Image from "next/image"
import styled from "styled-components"

const Card = styled.div`
  display: flex;

  flex-direction: row;
  gap: 2rem;

  border: 1px solid #eaeaea;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 0.5rem rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const PosterWrapper = styled.div`
  width: 20rem;
  height: 30rem;
  position: relative;

  @media (max-width: 768px) {
    margin: 0 auto;
  }
`

const Poster = styled(Image)`
  height: auto;
  border-radius: 0.5rem;
  margin-right: 16px;
  object-fit: contain;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
`

const Title = styled.h2`
  font-size: 1.5rem;
  margin: 0;
`

const ReleaseDate = styled.p`
  color: #888;
  margin: 0.5rem 0;
`

const Overview = styled.p`
  flex: 1;
  font-size: 1rem;
  line-height: 1.5rem;
  color: #333;
`

const Details = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
`

const Rating = styled.p<{ voteAverage: number }>`
  font-weight: bold;
  color: ${(props) =>
    props.voteAverage >= 7
      ? "#4caf50"
      : props.voteAverage >= 5
      ? "#ff9800"
      : "#f44336"};
`

const RatingDetails = styled.p`
  font-size: 0.9rem;
  color: #555;
`

export default function MovieDetails({
  title,
  imageUrl,
  releaseDate,
  overview,
  voteAverage,
  voteCount,
  popularity,
}: {
  title: string
  imageUrl: string | null
  releaseDate: Date | null
  overview: string
  voteAverage: number
  voteCount: number
  popularity: number
}) {
  return (
    <Card>
      {imageUrl && (
        <PosterWrapper>
          <Poster src={imageUrl} alt={title} fill />
        </PosterWrapper>
      )}
      <Content>
        <Title>{title}</Title>
        {releaseDate && (
          <ReleaseDate>Released on {releaseDate?.getFullYear()}</ReleaseDate>
        )}

        <Overview>{overview}</Overview>
        <Details>
          <Rating voteAverage={voteAverage}>Rating: {voteAverage} / 10</Rating>
          <RatingDetails>
            Votes: {voteCount} | Popularity: {popularity}
          </RatingDetails>
        </Details>
      </Content>
    </Card>
  )
}
