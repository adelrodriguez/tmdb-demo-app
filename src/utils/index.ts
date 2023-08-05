export function debounce(fn: (...args: any[]) => void, delay: number) {
  let timeoutID: NodeJS.Timeout | null = null

  return function (...args: any[]) {
    if (timeoutID) {
      clearTimeout(timeoutID)
    }
    timeoutID = setTimeout(() => fn(...args), delay)
  }
}
