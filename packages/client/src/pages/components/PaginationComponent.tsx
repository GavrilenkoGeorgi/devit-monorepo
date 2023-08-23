import React, { useEffect } from 'react'
import Pagination from 'react-bootstrap/Pagination'

type PaginationComponentProps = {
  itemsCount: number,
  currentPage: number,
  itemsPerPage: number,
  setPage: (number: number) => void,
  alwaysShown?: boolean
}

const PaginationComponent = ({
  itemsCount,
  itemsPerPage,
  currentPage,
  setPage,
  alwaysShown = true
}: PaginationComponentProps) => {
  const pagesCount = Math.ceil(itemsCount / itemsPerPage)
  const isPaginationShown = alwaysShown ? true : pagesCount > 1
  const isCurrentPageFirst = currentPage === 1
  const isCurrentPageLast = currentPage === pagesCount

  const changePage = (number: number) => {
    if (currentPage === number) return
    setPage(number)
  }

  const onPageNumberClick = (pageNumber: number) => {
    changePage(pageNumber)
  }

  const onPreviousPageClick = () => {
    changePage(currentPage - 1)
  }

  const onNextPageClick = () => {
    changePage(currentPage + 1)
  }

  const setLastPageAsCurrent = () => {
    if (currentPage > pagesCount) {
      setPage(pagesCount)
    }
  }

  let isPageNumberOutOfRange: boolean

  const pageNumbers = [...new Array(pagesCount)].map((_, index) => {
    const pageNumber = index + 1
    const isPageNumberFirst = pageNumber === 1
    const isPageNumberLast = pageNumber === pagesCount
    const isCurrentPageWithinTwoPageNumbers =
      Math.abs(pageNumber - currentPage) <= 2

    if (
      isPageNumberFirst ||
      isPageNumberLast ||
      isCurrentPageWithinTwoPageNumbers
    ) {
      isPageNumberOutOfRange = false
      return (
        <Pagination.Item
          key={pageNumber}
          onClick={() => onPageNumberClick(pageNumber)}
          active={pageNumber === currentPage}
        >
          {pageNumber}
        </Pagination.Item>
      )
    }

    if (!isPageNumberOutOfRange) {
      isPageNumberOutOfRange = true
      return <Pagination.Ellipsis key={pageNumber} className="muted" />
    }

    return null
  })

  useEffect(setLastPageAsCurrent, [pagesCount])

  return (
    <>
      {isPaginationShown && (
        <Pagination>
          <Pagination.Prev
            onClick={onPreviousPageClick}
            disabled={isCurrentPageFirst}
          />
          {pageNumbers}
          <Pagination.Next
            onClick={onNextPageClick}
            disabled={isCurrentPageLast}
          />
        </Pagination>
      )}
    </>
  )
}

export default PaginationComponent
