import SearchBar from "./SearchBar"
import CardList from "./CardList";
import Pagination from "./Pagination";

const BuildPage = () => {
  return (
    <div style={{width: "100%", height: "100%"}}>
      <SearchBar/>
      <CardList/>
      <Pagination></Pagination>
    </div>
  )
}

export default BuildPage