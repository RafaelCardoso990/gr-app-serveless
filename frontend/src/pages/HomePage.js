import React from "react";
import styled from "styled-components";
import Logos from "../shared/images/grlogo.png";

function HomePage() {
  return (
    <Main>
      <h1>HomePage</h1>
      <Logo src={Logos} alt="Logo" />
      <h1>Teste2</h1>
    </Main>
  );
}

const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Logo = styled.img`
  width: 300px;
  height: 300px;
`;

export default HomePage;
