import { useMemo } from 'react';

export const useSortedAparts = (apartments, selectedSort) => {
  const sortedApartments = useMemo(() => {
    if(!selectedSort) return apartments;
    return [...apartments].sort((a, b) => a[selectedSort].localeCompare(b[selectedSort]));
  }, [selectedSort, apartments]);

  return sortedApartments;
};