import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";

export default function Search() {
  const { searchText } = useParams();
  const [searchResult, setSearchResult] = useState<any>(null);

  useEffect(() => {
    // Fazendo a primeira requisição para obter detalhes do usuário diretamente
    fetch(`https://api.github.com/users/${searchText}`)
      .then((response) => response.json())
      .then((data) => {
        if (!data.message) {
          setSearchResult([data]);
        } else {
          // Se não encontrar diretamente, fazer a pesquisa de usuários
          fetch(`https://api.github.com/search/users?q=${searchText}`)
            .then((response) => response.json())
            .then((searchData) => {
              setSearchResult(searchData.items);
            });
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [searchText]);

  return (
    <div>
      {searchResult &&
        searchResult.map((user: any) => (
          <UserDetails key={user.id}>
            <img src={user.avatar_url} alt={`${user.login} Avatar`} />
            <h2>{user.name}</h2>
            <p>Username: {user.login}</p>
            {user.location && <p>Location: {user.location}</p>}
            {user.followers && <p>Followers: {user.followers}</p>}
            {user.following && <p>Following: {user.following}</p>}
            {user.public_repos && <p>Public Repos: {user.public_repos}</p>}
            <a href={user.html_url}>Profile</a>
          </UserDetails>
        ))}
    </div>
  );
}


const UserDetails = styled.div`
  text-align: center;

  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin: 10px auto;
  }

  h2 {
    font-size: 1.5rem;
    margin: 10px 0;
  }

  p {
    font-size: 1.2rem;
  }

  a {
    display: inline-block;
    margin-top: 10px;
    padding: 5px 10px;
    background-color: #007bff;
    color: white;
    text-decoration: none;
    border-radius: 5px;
  }
`;



