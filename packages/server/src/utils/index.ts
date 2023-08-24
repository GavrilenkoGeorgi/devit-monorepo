export const paginate = (items: [], page = 1, limit = 10) => {
  const offset = limit * (page - 1)
  const pages = Math.ceil(items.length / limit)
  const paginatedItems = items.slice(offset, limit * page)
  return {
    docs: paginatedItems,
    page,
    pages,
    limit,
    total: items.length,
  }
}
