import { ReactNode } from "react"
import styled from "styled-components"

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`

const H2 = styled.h2`
  font-size: 2rem;
  line-height: 1;
  text-align: center;
`

export default function ErrorMessage({
  message,
  children,
}: {
  message: string
  children?: ReactNode
}) {
  return (
    <ErrorContainer>
      <H2>{message}</H2>
      {children}
    </ErrorContainer>
  )
}
