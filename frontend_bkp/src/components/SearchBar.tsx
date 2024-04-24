import { useEffect, useState } from "react"
import { UseAppDispatch } from "../store"
import { textFilter } from "../reducers/filterReducer"
import { applyFilter } from "../reducers/cardReducer"

const SearchBar = () => {
  const [value, setValue] = useState('')
  const dispatch = UseAppDispatch()
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(textFilter(value))
      dispatch(applyFilter())
    }, 1000)
    return () => clearTimeout(timeoutId)
  }, [value])

  return (
    <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
  )
}

export default SearchBar