import { useParams } from "react-router-dom";
import styled from "styled-components";

export default function Search() {
    const {searchText} = useParams();
    return (
        <Container>
            <Title>Search</Title>
            <SubTitle>Search Text: {searchText}</SubTitle>
        </Container>
    );
}

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
