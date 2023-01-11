import { useEffect, useState } from 'react'

export default function useStorage(key, defaultValue) {
  const [data, setData] = useState(getData)

  function getData() {
    const response = sessionStorage.getItem(key)
    if (response) return JSON.parse(response)
    return defaultValue
  }

  function updateData(key, data) {
    sessionStorage.setItem(key, JSON.stringify(data))
  }

  function removeData(key) {
    sessionStorage.removeItem(key)
  }

  useEffect(() => {
    updateData(key, data)
  }, [key, data])

  return { data, setData, removeData }
}
