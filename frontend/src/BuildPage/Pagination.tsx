import { useNavigate, useParams } from "react-router-dom";
import { getCards } from "../reducers/cardReducer";
import { UseAppDispatch } from "../store"
import styled from "styled-components";

const PaginationElement = styled.div`
  gap: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`


const Pagination = () => {
  const {page: paramPage} = useParams()
  const navigate = useNavigate()
  const dispatch = UseAppDispatch()
  const page = paramPage ? parseInt(paramPage) : 1

  dispatch(getCards({ params: {page}}))

  const setPage = (page: number) => {
    navigate('/' + page)
  }

  return (
    <PaginationElement>
      { page > 1 && <button onClick={() => setPage(page-1)}>Previous</button>}
      { page > 2 && <button onClick={() => setPage(page-2)}>{page-2}</button> }
      { page > 1 && <button onClick={() => setPage(page-1)}>{page-1}</button> }
      <button style={{border: '2px red solid'}} onClick={() => setPage(page)}>{page}</button>
      <button onClick={() => setPage(page+1)}>{page+1}</button>
      <button onClick={() => setPage(page+2)}>{page + 2}</button>
      { page <= 1 && <button onClick={() => setPage(page+3)}>{page+3}</button>}
      { page <= 2 && <button onClick={() => setPage(page+4)}>{page+4}</button>}
      <button onClick={() => setPage(page+1)}>Next</button>
    </PaginationElement>
  )
}

export default Pagination