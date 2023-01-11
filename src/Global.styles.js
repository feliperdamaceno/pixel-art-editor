import { createGlobalStyle } from 'styled-components'

export const colors = {
  background: '#323232',
  dark: '#272727',
  black: '#000',
  white: '#fff'
}

export const GlobalStyles = createGlobalStyle`
  html {
    font-size: 62.5%;
    box-sizing: border-box;
  }

  *,
  *::after,
  *::before {
    box-sizing: inherit;
  }

  body {
    font-family: 'Nunito', sans-serif;
    font-size: 1.6rem;
    margin: 0;
  }

  input,
  button {
    font: inherit;
  }
`
