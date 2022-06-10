import React, { useEffect, useState } from "react";
import Customize from "../components/Customize"
import PageList from "../components/PageList";
import PaginationButton from "../components/PaginationButton";

export default function Pagination(props) {
  const [loading, setLoading] = useState(false);
  const [pageData, setPageData] = useState([]);
  
  const [postsPerPage,setPostPerPage] = useState(4);
  const [limit,setLimitPerFetch] = useState(8);

  const [nextToken, setNextToken] = useState(undefined);
  const [nextNextToken, setNextNextToken] = useState();
  const [previousTokens, setPreviousTokens] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  

  const [countPage, setCountPage] = useState(0);
  const [isPrevNext, setIsPrevNext] = useState(false);


  const hasPrev = previousTokens.length;
  const hasPrevTest = currentPage === 1
  const hasNext = nextNextToken;
  let totalPageCount = Math.ceil(pageData.length / postsPerPage)
  let hasNextTest = currentPage === totalPageCount

  useEffect(() => {
    fetchPage();
  }, [nextToken,limit,postsPerPage]);

  async function fetchPage() {
    setLoading(true);
    const pageinatie =
      await props.awsRawan.paginationFinalCodesViaAmplifyGQLClient(
        limit,
        nextToken
      );
    setPageData(pageinatie.data.paginationFinalCodes.items);
    if(pageinatie.data.paginationFinalCodes.items.length !== 0 ) {
      setNextNextToken(pageinatie.data.paginationFinalCodes.nextToken);
    }else {
      setNextNextToken(null);
    }
    setLoading(false);
  }

  useEffect(() => {
    //console.log("2nd EFFECT",isPrevNext)
    if(isPrevNext) {
      setCurrentPage(totalPageCount)
      setCountPage((prev) => prev - totalPageCount)
    }else {
      setCurrentPage(1)
    }
   // isPrevNext ? setCurrentPage(totalPosts) : setCurrentPage(1);
  }, [pageData]);


  const prevFun = () => {
    setIsPrevNext(true)
    if(!hasPrevTest) {
       // console.log("PREV IF");
        setCurrentPage(currentPage - 1);
    }else{
       // console.log("PREV ELSE")
        setPageData([])
        setNextToken(previousTokens.pop());
        setPreviousTokens([...previousTokens]);
        setNextNextToken(null);
    }
  };

  const nextFun = () => {
    setIsPrevNext(false)
    if(!hasNextTest) {
        //console.log("NEXT IF", currentPage);
        setCurrentPage(currentPage + 1);
    }else{
       // console.log("NEXT ELSE")
        setCountPage((prev) => prev + totalPageCount)
        setPageData([])
        setPreviousTokens((prev) => [...prev, nextToken]);
        setNextToken(nextNextToken);
        setNextNextToken(null);
    };
}

const paginate = (pageNumber) => setCurrentPage(pageNumber);

const indexOfLastPost = currentPage * postsPerPage;
const indexOfFirstPost = indexOfLastPost - postsPerPage;
const currentPosts = pageData.slice(indexOfFirstPost, indexOfLastPost);

  // console.log("pageData", pageData);
  // console.log("nextNextToken", nextNextToken);
  // console.log("previousTokens", previousTokens);
  // console.log("nextToken", nextToken);
  // console.log("indexOfFirstPost", indexOfFirstPost);
  // console.log("indexOfLastPost", indexOfLastPost);
  // console.log("currentPosts", currentPosts);
  // console.log("!hasNext && hasNextTest",!hasNext , hasNextTest)
  // console.log("currentPage", currentPage);
  // console.log("totalPageCount", totalPageCount);
  // console.log("countPage ++",countPage)


  const customFormSubmit = (postsPerPageArg,limitPerFetch) => {
      setPostPerPage(postsPerPageArg)
      setLimitPerFetch(limitPerFetch)
      setPageData([])
      setCurrentPage(1);
      setCountPage(0);
      setPreviousTokens([]);
      setNextToken(undefined);
      setNextNextToken(null);
      setIsPrevNext(false)
  };
  console.log("GATSBY_ENV", process.env.GATSBY_DEV);
  console.log("GATSBY_ENV", process.env.DEV);

  return (
    <div className="page_root" style={{ textAlign: "center" }}>
      <Customize 
      postsPerPage={postsPerPage}
      limit={limit}
      customFormSubmit={customFormSubmit}/>

      <PageList pageData={currentPosts} loading={loading} />

        <PaginationButton
        initialPageCount={totalPageCount}
        paginate={paginate}
        currentPage={currentPage}
        countPage={countPage}
        prevFun={prevFun}
        hasPrev={hasPrev}
        hasPrevTest={hasPrevTest}
        nextFun={nextFun}
        hasNext={hasNext}
        hasNextTest={hasNextTest}
      />
    </div>
  );
}
