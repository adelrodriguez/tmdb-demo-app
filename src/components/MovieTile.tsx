import styled from "styled-components"
import Image from "next/image"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ImageWrapper = styled.div`
  width: 100%;
  height: 200px;
  position: relative;
`

const Title = styled.h2`
  font-size: 1rem;
  font-weight: 500;
  margin-top: 0.5rem;
  text-align: center;
`

export default function MovieTile({
  title,
  imageUrl,
}: {
  title: string
  imageUrl: string
}) {
  return (
    <Container>
      <ImageWrapper>
        <Image
          src={imageUrl}
          alt={title}
          fill
          style={{ objectFit: "contain" }}
        />
      </ImageWrapper>
      <Title>{title}</Title>
    </Container>
  )
}
