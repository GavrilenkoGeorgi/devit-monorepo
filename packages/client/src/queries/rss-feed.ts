import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

export const useRssFeed = ((url: string) => {

  return useQuery({
    queryKey: ['rss-items'],
    queryFn: async () => {
      const { data } = await axios.get(url)
      return data
    },
  })
})
