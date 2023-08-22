import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

export function useRssFeed() {
  return useQuery({
    queryKey: ['rss-items'],
    queryFn: async () => {
      const { data } = await axios.get(
        'http://localhost:5000/api/rss-items',
      )
      console.log(data)
      return data
    },
  })
}
