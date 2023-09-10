import { useRef, useState } from "react";
import "./searchResult.css";
export const SearchField = () => {
  const inputRef = useRef();
  const [searchEngine, setSearchEngine] = useState("algolia");
  const [searchTime, setSearchTime] = useState(null);
  const [isResultFetching, setIsResultFetching] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [searchResult, setSearchResult] = useState({});
  const [error, setError] = useState(false);
  const fetchSearchResult = async (sValue) => {
    const response = await fetch(
      `https://hn.algolia.com/api/v1/search?query=${sValue}`
    );
    const data = await response.json();
    data && setSearchResult(data);
    data && setIsResultFetching(true);
    setSearchTime(data.serverTimeMS);
  };
  const fetchResultForGoogle = async (sValue) => {
    const response = await fetch(
      `${import.meta.env.VITE_SEARCH_URL}?key=${
        import.meta.env.VITE_SEARCH_KEY
      }&cx=${import.meta.env.VITE_SEARCH_ENGINE_ID}&q=${sValue}`
    );
    if (response.status !== 429) {
      const data = await response.json();
      setSearchResult(data);
      setIsResultFetching(true);
      setSearchTime(data.searchInformation.searchTime);
    } else {
      setError("search Engine Daily Limit Exceeded, Please Use algolia");
      setSearchEngine("algolia");
      setIsDisabled(true);
    }
  };
  const startSearch = () => {
    setError(false);
    const filterValue = inputRef.current.value.trim();
    filterValue.length > 0 &&
      searchEngine === "algolia" &&
      fetchSearchResult(filterValue);
    filterValue.length > 0 &&
      searchEngine === "google" &&
      fetchResultForGoogle(filterValue);
  };
  return (
    <div className="search flex-grow-up relative">
      <input
        type="search"
        autoFocus
        className="padding-sm pl shadow-3d t-light transition radius-2 w-full"
        style={{ "--value": 2 }}
        placeholder="Search..."
        ref={inputRef}
        onChange={startSearch}
      />
      <div className="absolute w-full flex justify-between mt">
        <span>Result Fetched in : {searchTime} ms</span>
        <select
          className="select"
          name="searchEngine"
          value={searchEngine}
          onChange={(e) => setSearchEngine(e.target.value)}
        >
          <option value="google" disabled={isDisabled}>
            Google
          </option>
          <option value={"google-v2"}>Google V2</option>
          <option value="algolia">Algolia</option>
        </select>
      </div>
      {isResultFetching && searchEngine === "algolia" && (
        <ul
          className="searchResult shadow-3d mt radius-1 flex flex-col gap-sm absolute overflow-auto"
          style={{ "--value": 4 }}
        >
          {searchResult?.hits?.length > 0 &&
            searchResult?.hits?.map((item) => (
              <li
                key={item.objectID}
                className="shadow-3d transition padding-sm radius-1"
              >
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="t-light"
                >
                  {item.title}
                </a>
              </li>
            ))}
        </ul>
      )}
      {isResultFetching && searchEngine === "google" && !error ? (
        <ul
          className="searchResult shadow-3d mt radius-1 flex flex-col gap-sm absolute overflow-auto"
          style={{ "--value": 4 }}
        >
          {searchResult?.items?.length > 0 &&
            searchResult?.items?.map((item) => (
              <li
                key={item.cachedId}
                className="shadow-3d transition padding-sm radius-1"
              >
                <a
                  href={item.link}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="t-light"
                >
                  <span className="text-ellipse">{item.title}</span>
                </a>
              </li>
            ))}
        </ul>
      ) : (
        <p className="t-warning">{error}</p>
      )}
    </div>
  );
};
