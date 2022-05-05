/* eslint-disable react-hooks/exhaustive-deps */
import {useMemo} from 'react'
import { useSortedAparts } from "./useSortedAparts";

export const usePaginatedAndSorted = (apartments, selectedSort, page, apartsToShow) => {
  const sortedAparts = useSortedAparts(apartments, selectedSort);

  const paginatedAndSortedAparts = useMemo(() => {
    if (!sortedAparts) return [];
    return [...sortedAparts].slice((page-1)*apartsToShow, page*apartsToShow);
  }, [page, sortedAparts, apartsToShow]);

  return paginatedAndSortedAparts;
}