import { useState } from "react"
import styled from "styled-components"

const SearchBarWrapper = styled.div`
  --color-searchbar-background: #444444;
  --color-searchbar-placeholder: #C0C0C0;
  --color-searchbar-iconbutton-hover: #535353;

  background-color: var(--color-searchbar-background);
  width: 100%;
  min-height: 3em;
  display: flex;
  flex-direction: row;
  padding: 1em;
  border-radius: 8px;

  form {
    flex: 1;
    input {
      width: 100%;
      appearance: none;
      outline: none;
      border: none;
      background-color: transparent;
    }
  }
  
  .iconButton {
    all: revert;
    appearance: none;
    outline: none;
    border: none;
    background-color: transparent;
    cursor: pointer;
    padding: 0.5em;
    border-radius: 50%;

    &.settings {
      color: #858585;
    }

    &:hover {
      background-color: var(--color-searchbar-iconbutton-hover);
    }

    i {
      font-size: 1.5em;
    }
  }
  
`

const SearchBar = () => {
  const [searchText, setSearchText] = useState<string>("")
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false)

  const onSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    console.log(searchText)
  }

  return (
    <>
      <SearchBarWrapper>
        <form action="" onSubmit={onSearch}>
          <input type="text" placeholder="Search..." value={searchText} onChange={(e) => setSearchText(e.target.value)} />
        </form>
        <button className="iconButton settings" onClick={() => setShowAdvanced(!showAdvanced)}>
          <i className="fa-solid fa-sliders"></i>
        </button>
        <button className="iconButton" onClick={onSearch}>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </SearchBarWrapper>
    </>
  )
}

export default SearchBar