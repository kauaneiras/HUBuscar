//criar função home, que retorna uma pagina preta escrito home no centro em vermelho

import styled from 'styled-components';
import { useState } from 'react';

export default function Home() {
    const [count, setCount] = useState(0);
    return (
        <Container>
            <Title>Home</Title>
            <SubTitle>Contador: {count}</SubTitle>
            <Button onClick={() => setCount((count) => count + 1)}>Clique aqui</Button>
        </Container>
    );
}

const Container = styled.div`
    background-color: black;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items:center;
    color: red;
    font-size: 50px;
    font-weight: bold;
`;

const Title = styled.h1`
    color: red;
    font-size: 50px;
    font-weight: bold;
`;

const SubTitle = styled.h2`
    color: red;
    font-size: 30px;
    font-weight: bold;
`;

const Button = styled.button`
    background-color: red;
    color: white;
    font-size: 20px;
    font-weight: bold;
    padding: 10px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    margin-top: 20px;
    transition: 0.3s;

    &:hover{
        background-color: white;
        color: red;
    }
`;