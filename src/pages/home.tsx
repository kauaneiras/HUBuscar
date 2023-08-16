import styled from 'styled-components';
import React from 'react';

import SearchBar from '../components/searchBar';

import bemvindo from '../assets/imgs/bemvindo.png'

const Home: React.FC = () => {
    return (
        <>
            <SearchBar />
            <Container><img src={bemvindo} alt="bem vindo" /></Container>
        </>
    );
}

export default Home;

const Container = styled.div`
    background-color: #e5e5e5;
    top: 70px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: red;
    font-size: 50px;
    font-weight: bold;
    position: fixed;
    z-index: -1;
    img{ width: 100%; height: 100%;}
`;

