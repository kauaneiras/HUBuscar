import { createGlobalStyle } from 'styled-components';

const ResetCSS = createGlobalStyle`
body, h1, h2, h3, h4, h5, h6, p, ol, ul, li, figure, figcaption, blockquote, dl, dd {margin: 0; padding: 0;}
  body {font-family: Arial, sans-serif; font-size: 16px;}
  ol, ul {list-style: none;}
  a {text-decoration: none; color: inherit;}
  *, *::before, *::after {box-sizing: border-box;}
`;

export default ResetCSS;