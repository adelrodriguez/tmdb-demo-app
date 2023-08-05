import { debounce } from "@/utils"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import styled from "styled-components"

const Input = styled.input`
  width: 100%;
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
