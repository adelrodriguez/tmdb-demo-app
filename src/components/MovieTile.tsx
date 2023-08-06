import styled from "styled-components"
import Image from "next/image"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  :hover {
    transition-property: transform;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
    transform: scale(1.05);
  }
`

const ImageWrapper = styled.div`
  width: 100%;
  height: 200px;
  position: relative;
`

const Poster = styled(Image)`
  object-fit: contain;
`

const EmptyImage = styled.div`
  width: 100%;
  height: 200px;
  background-color: #f0f0f0;
  object-fit: contain;
  aspect-ratio: 1;
`

const Title = styled.h2`
  font-size: 1rem;
  line-height: 1.25rem;
  font-weight: 300;
  margin-top: 0.5rem;
  text-align: center;
`

export default function MovieTile({
  title,
  imageUrl,
  year,
}: {
  title: string
  imageUrl: string | null
  year: number | null
}) {
  return (
    <Container>
      <ImageWrapper>
        {imageUrl ? <Poster src={imageUrl} alt={title} fill /> : <EmptyImage />}
      </ImageWrapper>
      <Title>
        {title} {year && `(${year})`}
      </Title>
    </Container>
  )
}
