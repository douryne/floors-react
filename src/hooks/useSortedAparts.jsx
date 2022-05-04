import { useMemo } from 'react';

export const useSortedAparts = (apartments, {sortType, from}) => {
  const sortedApartments = useMemo(() => {
    if(!sortType) return apartments;
    return [...apartments].sort((a, b) => {
     return from === 'min' ? a[sortType] - b[sortType] : b[sortType] - a[sortType];
    });
  }, [sortType, from, apartments]);

  return sortedApartments;
};