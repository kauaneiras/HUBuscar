import React from 'react';
import styled from 'styled-components';

import UsersCardHistory from '../components/usersCardHistory';
import SearchBar from '../components/searchBar';

import colors from '../style/colors';

interface UserHistory { login: string; photo: string; bio: any; location: string; }
const History: React.FC = () => {
    const storedUsers = (JSON.parse(localStorage.getItem('storedUsers') || '[]') as UserHistory[]).reverse();
    console.log(storedUsers);
    return (
        <>
            <SearchBar />
            <Container>
                <h1>Suas Pesquisas Recentes 🔍</h1>
                {storedUsers.map((user, index) => (<UsersCardHistory key={index} login={user.login} bio={user.bio} photo={user.photo} location={user.location} />))}
            </Container>
        </>
    );
};
export default History;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100vw;
    background-color:${colors.background};
    h1{margin: 20px;}
`;

