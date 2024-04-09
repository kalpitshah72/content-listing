import { useEffect, useState } from "react";
import "./App.css";
import MovieItem from "./components/MovieItem";
import StickyHeader from "./components/StickyHeader";

function App() {
  const [pageData, setPageData] = useState([]);
  const [items, setItems] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  // Function to fetch data
  const fetchData = async (page, isBack = false) => {
    try {
      const response = await fetch(
        `https://test.create.diagnal.com/data/page${page}.json`
      );
      const data = await response.json();
      // Check for backButton scenario
      if (isBack) {
        setItems([...data?.page?.["content-items"]?.content]);
      } else {
        setPageData([...pageData, data]);
        setItems([...items, ...data?.page?.["content-items"]?.content]);
      }
    } catch (error) {
      // Catch Error
      console.error(error, "error");
    }
  };

  useEffect(() => {
    // Function calling for fetch data
    fetchData(pageNumber);
  }, [pageNumber]);

  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const debouncedFetchData = debounce(fetchData, 500); // Adjust debounce delay as needed

  useEffect(() => {
    function handleScroll() {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 5) {
        setPageNumber((prevPage) => prevPage + 1);
      }
    }

    const debouncedHandleScroll = debounce(handleScroll, 500); // Adjust debounce delay as needed

    window.addEventListener("scroll", debouncedHandleScroll);
    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll);
    };
  }, [pageNumber, debouncedFetchData]);

  return (
    <div className="bg-[#171717] text-[#FFFFFF] ">
      <StickyHeader
        title={pageData?.[pageNumber - 1]?.page?.title}
        setSearchQuery={setSearchQuery}
        searchQuery={searchQuery}
        setItems={setItems}
        setPageNumber={setPageNumber}
        items={items}
        fetchData={fetchData}
      />
      <MovieItem items={items} />
    </div>
  );
}

export default App;
