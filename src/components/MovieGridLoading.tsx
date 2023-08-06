import styled, { keyframes } from "styled-components"

const shimmer = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`

const SkeletonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const SkeletonImageWrapper = styled.div`
  width: 100%;
  height: 200px;
  position: relative;

  background: #f0f0f0;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite linear;
`

const SkeletonTitle = styled.div`
  height: 1.25rem;
  width: 100%;
  margin-top: 0.5rem;

  background: #f0f0f0;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite linear;
  color: transparent;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
`

export default function MovieGridLoading({
  elements = 10,
}: {
  elements?: number
}) {
  return (
    <Grid>
      {Array.from({ length: elements }).map((_, index) => (
        <SkeletonContainer key={index}>
          <SkeletonImageWrapper />
          <SkeletonTitle />
        </SkeletonContainer>
      ))}
    </Grid>
  )
}
