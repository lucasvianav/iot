export const debounce = (callback: () => any, delay: number): () => void => {
  let timeout: NodeJS.Timeout
  return () => {
    clearTimeout(timeout)
    timeout = setTimeout(callback, delay)
  }
}
