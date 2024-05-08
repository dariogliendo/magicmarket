import styled from "styled-components"

const NavigationWrapper = styled.div`
  width: 100%;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 10vh;
  border-bottom: 1px solid var(--color-details-grey);
  background-color: var(--background-color);

  .logo-wrapper {
    flex: 0;
    flex-basis: 100px;
    display: grid;
    place-content: center;

    img {
      width: 50px;
    }
  }

  .navigation-list {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;

    ul {
      margin: 0;
      padding: 0;
      height: 100%;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      list-style: none;
      gap: 0;
      align-items: stretch;
      min-width: 30%;

      li {
        height: 100%;
        
        a {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: var(--color-menu-grey);
          text-align: center;
          height: 100%;
        }

        &:hover {
          background-color: var(--color-menu-hover);
          
          a {
            color: var(--color-accent);
          }
        }
      }
    }
  }
`

const Navigation = () => {
  return (
    <NavigationWrapper>
      <div className="logo-wrapper">
        <img src="./magic.png" alt="Magic Market Logo" />
      </div>
      <div className="navigation-list">
        <ul>
          <li><a href="/">Explore</a></li>
          <li><a href="/">Build</a></li>
          <li><a href="/">Shop</a></li>
        </ul>
      </div>
    </NavigationWrapper>
  )
}

export default Navigation