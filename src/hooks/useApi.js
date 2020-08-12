import { useCallback, useState } from 'react'
import api from '../services/api'

const useApi = () => {
  const [data, setData] = useState([])

  const request = useCallback(async (url) => {
    try {
      const response = await api.get(url)
      setData(response.data)
    } catch (err) {
      console.log(err)
    }
  }, [request])
  return {
    data,
    request
  }
}

export default useApi
