import { useState } from 'react'

export default function useStorage() {
  const [data, setData] = useState()

  return { data, setData }
}
