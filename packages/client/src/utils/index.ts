export const pubDateForPost = () => {
  const date: Date = new Date()
  return date.toISOString()
}

export const getReadableDate = (utcDate:string | undefined):string => {
  if (!utcDate) {
    return 'Invalid Date'
  }

  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }
  // date-fns!
  // eslint-disable-next-line
  // @ts-ignore
  return new Date(utcDate).toLocaleDateString(undefined, options)
}
