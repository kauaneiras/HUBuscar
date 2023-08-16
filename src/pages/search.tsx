import { useParams, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";

import UsersCard from "../components/usersCard";
import SearchBar from "../components/searchBar";

import LoadingImg from "../assets/imgs/Loading.gif";

const Search: React.FC = () => {
    const { searchText } = useParams();
    const [searchResult, setSearchResult] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);


    useEffect(() => {
        fetch(`https://api.github.com/users/${searchText}`)
            .then((response) => response.json())
            .then((data) => {
                if (!data.message) {
                    setSearchResult([data]); setLoading(false);
                } else {
                    fetch(`https://api.github.com/search/users?q=${searchText}`)
                        .then((response) => response.json())
                        .then((searchData) => {
                            setSearchResult(searchData.items); setLoading(false);
                        });
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, [searchText]);

    if (searchResult && searchResult.length === 1 && "name" in searchResult[0]) { return <Navigate to={`/profile/${searchResult[0].login}`} />; }
    if (loading) { return <LoadingImageStyled src={LoadingImg} alt="Loading" />; }
    return (
        <>
            <SearchBar />
            <Container>
                <Title>Não encontramos esse repositório.</Title>
                <Text>Talvez seja algum desses:</Text>
                {searchResult &&
                    searchResult.map((result: any) => (
                        <UsersCard key={result.id} photo={result.avatar_url} login={result.login} />
                    ))}
            </Container>
        </>
    );
}

export default Search;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-top: 30px;
`;

const Title = styled.p`
    font-size: 30px;
    font-weight: 700;
    color: #000000;
    margin-top: 30px;
`;

const Text = styled.p`
font-size: 25px;
font-weight: 500;
color: #000000;
margin-top: 10px;
margin-bottom: 30px;
`;

const LoadingImageStyled = styled.img`
    width: 40%; 
    height: 40%;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 40%;
    left: 30%;
    object-fit: contain;
    `;