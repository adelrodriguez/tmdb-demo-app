import { debounce } from "@/utils"
import { usePathname, useSearchParams } from "next/navigation"
import { useRouter } from "next/router"
import styled from "styled-components"

const Input = styled.input`
  display: block;
  width: 100%;

  max-width: 30rem;

  border-radius: 0.375rem;

  padding: 0.5rem 0.75rem;

  color: #1a1a1a;

  ::placeholder {
    color: #9ca3af;
    opacity: 1;
  }

  font-size: 0.875rem;
  line-height: 1.5rem;
`

export default function SearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const handleChange = debounce(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      // Weird but needed to fix the type error
      // Info: https://github.com/vercel/next.js/issues/49245
      const params = new URLSearchParams(searchParams.toString())

      params.set("search", e.target.value)

      router.push(pathname + "?" + params.toString())
    },

    500,
  )

  return <Input onChange={handleChange} placeholder="Search for a movie" />
}
