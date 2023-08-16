import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface UsersCardHistoryProps {login: string; photo: string; bio: any; location: string; email: string;}
const UsersCardHistory: React.FC<UsersCardHistoryProps> = (props) => {
    const handleLinkClick = () => {
        const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
        const userExists = storedUsers.some((user: any) => user.login === props.login);
        if (!userExists) {
            const userData = { login: props.login, photo: props.photo };
            storedUsers.push(userData);
            localStorage.setItem('users', JSON.stringify(storedUsers));
        }
    };
    const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);

    useEffect(() => {
        const updateScreenWidth = () => { setScreenWidth(window.innerWidth); }
        window.addEventListener('resize', updateScreenWidth);
        return () => { window.removeEventListener('resize', updateScreenWidth); }
    }, []);

    return (
        <Link to={`/profile/${props.login}`}
            style={{ textDecoration: 'none', color: '#000' }}
            onClick={handleLinkClick}>
            <Card screenWidth={screenWidth}>
                <UserImg src={props.photo} alt="user" />
                <Container>
                <UserName>➜ {props.login}</UserName>
                <UserBio>{props.bio}</UserBio>
                <UserEmail>📧 {props.email}</UserEmail>
                <UserLocation>📌 {props.location}</UserLocation>
                </Container>
            </Card>
        </Link>
    );
};

export default UsersCardHistory;

interface RepoInfosProps { screenWidth: any; }

const Card = styled.div<RepoInfosProps>`
    display: flex;
    flex-direction: ${({ screenWidth }) => (screenWidth < 800 ? 'column' : 'row')};
    align-items: center;
    justify-content: center;
    width: ${({ screenWidth }) => (screenWidth < 600 ? '80vw' : '60vw')};
    height: auto;
    border-radius: 10px;
    box-shadow: 0px 0px 4px 1px rgba(0,0,0,0.2);
    margin: 20px 0;
    padding: 10px;
    font-family: 'Roboto', sans-serif;
    font-size: 20px;
    color: #000;
    overflow: hidden;
    &:hover{
        box-shadow: 0px 0px 4px 1px rgba(0,0,0,0.5);
        background-color: #f2f2f2;
    }
`;
const Container = styled.div`
    display: flex;
    width: 80%;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 20px;
`;
const UserImg = styled.img`
    height: 150px;    
    width: 150px;
    border-radius: 50%;
    margin: 10px 0;
    margin-right: 20px;
    margin-left: 40px;
`;
const UserName = styled.p`font-weight: bold; margin: 10px 0; font-size: 25px;`;
const UserBio = styled.p`margin: 10px 0; font-size: 18px;`;
const UserLocation = styled.p`margin: 10px 0; font-size: 18px;`;
const UserEmail = styled.p`margin: 10px 0; font-size: 18px;`;