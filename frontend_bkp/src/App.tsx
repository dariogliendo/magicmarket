import { useEffect } from 'react'
import './App.css'
import CardList from './components/CardList'
import Filter from './components/Filter'
import { UseAppDispatch } from './store'
import { initializeCards } from './reducers/cardReducer'

function App() {
  const dispatch = UseAppDispatch()

  useEffect(() => {
    dispatch(initializeCards())
  })

  return (
    <>
      <Filter />
      <CardList />
    </>
  )
}

export default App
