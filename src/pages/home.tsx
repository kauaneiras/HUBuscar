import styled from 'styled-components';
import React, { useState } from 'react';
import SearchBar from '../components/searchBar';


const Home: React.FC = () => {
    const [count, setCount] = useState(0);
    return (
        <><SearchBar />
            <Container>
                <Title>Home</Title>
                <SubTitle>Contador: {count}</SubTitle>
                <Button onClick={() => setCount((count) => count + 1)}>Clique aqui</Button>
            </Container>
        </>
    );
}

export default Home;

const Container = styled.div`
    background-color: #e5e5e5;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
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