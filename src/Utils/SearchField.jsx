import { useContext, useEffect, useState } from "react";
import "./searchResult.css";
import { userContext } from "../Context/Context";
export const SearchField = () => {
  const [searchEngine, setSearchEngine] = useState("algolia");
  const [loading, setLoading] = useState(false);
  const [searchTime, setSearchTime] = useState(null);
  const [isResultFetching, setIsResultFetching] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [searchResult, setSearchResult] = useState({});
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState('')
  const { setFrameLink } = useContext(userContext)
  const fetchSearchResult = async (sValue) => {
    setLoading(true)
    const response = await fetch(
      `https://hn.algolia.com/api/v1/search?query=${sValue}`
    );
    const data = await response.json();
    data && setSearchResult(data);
    data && setIsResultFetching(true);
    data && setLoading(false)
    setSearchTime(data.serverTimeMS);
    console.log(data)
  };
  const fetchResultForGoogle = async (
    sValue,
    key = import.meta.env.VITE_SEARCH_KEY
  ) => {
    setLoading(true)
    const response = await fetch(
      `${import.meta.env.VITE_SEARCH_URL}?key=${key}&cx=${import.meta.env.VITE_SEARCH_ENGINE_ID
      }&q=${sValue}`
    );
    if (response.status !== 429) {
      const data = await response.json();
      setSearchResult(data);
      setIsResultFetching(true);
      setSearchTime(data.searchInformation.searchTime);
      setLoading(false)
    } else {
      setError("search Engine Daily Limit Exceeded, Please Use algolia");
      setSearchEngine("algolia");
      setIsDisabled(true);
      setLoading(false)
    }
  };
  const linkHandler = (e, link) => {
    e.preventDefault()
    setFrameLink(link)
  }
  const startSearch = () => {
    setError(false);
    setIsResultFetching(false);
    setIsDisabled(false);
    const filterValue = searchTerm.trim();
    filterValue.length > 0 &&
      searchEngine === "algolia" &&
      fetchSearchResult(filterValue);
    filterValue.length > 0 &&
      searchEngine === "google" &&
      fetchResultForGoogle(filterValue);
    filterValue.length > 0 &&
      searchEngine === "google-v2" &&
      fetchResultForGoogle(filterValue, import.meta.env.VITE_SEARCH_KEY_V2);
  };
  useEffect(() => {
    const getSearch = setTimeout(() => {
      startSearch()
    }, 500)
    return () => clearTimeout(getSearch)
  }, [searchTerm])
  return (
    <div className="search flex-grow-up relative">
      <input
        type="search"
        autoFocus
        className="padding-sm pl shadow-3d t-light transition radius-2 w-full"
        style={{ "--value": 2 }}
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="search-engine absolute w-full flex justify-between gap-sm mt">
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
      {
        loading && <p className="searchResult w-full radius-1 mt flex flex-col gap-sm absolute overflow-auto pad-x-y top">
          Loading Result...
        </p>
      }
      {isResultFetching && searchEngine === "algolia" && (
        <ul
          className="searchResult shadow-3d mt radius-1 flex flex-col gap-sm absolute overflow-auto top"
          style={{ "--value": 4 }}
        >
          <li className="sticky">Search Result for : {searchTerm}</li>
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
                  onClick={(e) => linkHandler(e, item.url)}
                >
                  {item.story_title || item.title}
                </a>
              </li>
            ))}
        </ul>
      )}
      {isResultFetching && searchEngine === "google" && !error ? (
        <ul
          className="searchResult shadow-3d mt radius-1 flex flex-col gap-sm absolute overflow-auto top"
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
                  onClick={(e) => linkHandler(e, item.link)}
                >
                  <span className="text-ellipse" dangerouslySetInnerHTML={{ __html: item.htmlTitle || item.title }}></span>
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
