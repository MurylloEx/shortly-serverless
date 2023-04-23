import { createGlobalStyle } from 'styled-components';

export const ApplicationStyle = createGlobalStyle`
  html, body, #root {
    height: 100%;
    background-color: #f4f5f8;
    font: 600 12px Nunito, sans-serif;
  }

  #root {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;
