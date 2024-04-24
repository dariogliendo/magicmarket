import { useEffect } from 'react'
import './App.css'
import BuildPage from './BuildPage/BuildPage'
import Navigation from './components/Navigation'
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"
import styled from 'styled-components'
import { UseAppDispatch } from './store'
import { initializeCards } from './reducers/cardReducer'


const MainWrapper = styled.div`
  max-width: 1440px;
  width: 80vw;
  height: 100vh;
  margin: auto;
  padding: 2em;
`

const router = createBrowserRouter([
  {
    path: "/:page",
    element: <BuildPage />
  }
])

function App() {
  const dispatch = UseAppDispatch()

  useEffect(() => {
    dispatch(initializeCards())
  })

  return (
    <>
      <Navigation />
      <MainWrapper>
        <RouterProvider router={router}></RouterProvider>
      </MainWrapper>
    </>
  )
}

export default App
