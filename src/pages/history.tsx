import React, {useEffect, useState} from 'react';
import styled from 'styled-components';

import UsersCardHistory from '../components/usersCardHistory';
import SearchBar from '../components/searchBar';

import colors from '../style/colors';

interface UserHistory { login: string; photo: string; bio: any; location: string; email: string; }
const History: React.FC = () => {
    const storedUsers = (JSON.parse(localStorage.getItem('storedUsers') || '[]') as UserHistory[]).reverse();
    const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);

    useEffect(() => {
        const updateScreenWidth = () => { setScreenWidth(window.innerWidth); }
        window.addEventListener('resize', updateScreenWidth);
        return () => { window.removeEventListener('resize', updateScreenWidth); }
    }, []);

    return (
        <>
            <SearchBar />
            <Container screenWidth={screenWidth}>
                <h1>Suas Pesquisas Recentes 🔍</h1>
                {storedUsers.map((user, index) => (<UsersCardHistory key={index} login={user.login} bio={user.bio} photo={user.photo} location={user.location} email={user.email}/>))}
            </Container>
        </>
    );
};
export default History;

interface RepoInfosProps { screenWidth: any; }

const Container = styled.div<RepoInfosProps>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100vw;
    background-color:${colors.background};
    h1{ margin: 20px; font-size: ${({ screenWidth }) => (screenWidth < 600 ? '25px' : '30px')}; }
`;