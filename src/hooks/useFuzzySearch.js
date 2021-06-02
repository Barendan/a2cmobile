import Fuse from 'fuse.js';
import isEqual from 'lodash.isequal';
import { useEffect, useRef, useState } from 'react';

const useFuzzySearch = ({ list, options, term }) => {
  const [query, setQuery] = useState(() => {
    if (term) return term;
    return undefined;
  });
  const [results, setResults] = useState(list);

  const fuseRef = useRef();

  useEffect(() => {
    fuseRef.current = new Fuse(list, options);
  }, [list, options]);

  useEffect(() => {
    if (!(fuseRef && fuseRef.current)) {
      return;
    }

    const newResults = query
      ? fuseRef.current.search(query).map(({ item }) => item)
      : list;
    if (isEqual(results, newResults)) {
      return;
    }

    setResults(newResults);
  }, [list, results, query]);

  return {
    results,
    query,
    setQuery,
  };
};

export default useFuzzySearch;