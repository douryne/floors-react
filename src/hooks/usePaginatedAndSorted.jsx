/* eslint-disable react-hooks/exhaustive-deps */
import {useMemo} from 'react'
import { useSortedAparts } from "./useSortedAparts";

export const usePaginatedAndSorted = (apartments, selectedSort, page, setPage, apartsToShow) => {
  const sortedAparts = useSortedAparts(apartments, selectedSort);

  useMemo(() => {
    setPage(1);
  }, [sortedAparts])

  const paginatedAndSortedAparts = useMemo(() => {
    if (!sortedAparts) return [];
    return [...sortedAparts].slice((page-1)*apartsToShow, page*apartsToShow);
  }, [page, sortedAparts, apartsToShow]);

  return paginatedAndSortedAparts;
}