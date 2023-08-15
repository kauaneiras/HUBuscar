import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface UsersCardProps { login: string; photo: string; }

const UsersCard: React.FC<UsersCardProps> = (props) => {
    const handleLinkClick = () => {
        const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
        const userExists = storedUsers.some((user: any) => user.login === props.login);

        if (!userExists) {
            const userData = { login: props.login, photo: props.photo };
            storedUsers.push(userData);
            localStorage.setItem('users', JSON.stringify(storedUsers));
        }
    };

    return (
        <Link
            to={`/profile/${props.login}`}
            style={{ textDecoration: 'none', color: '#000' }}
            onClick={handleLinkClick}
        >
            <Card>
                <UserImg src={props.photo} alt="user" />
                <UserName>{props.login}</UserName>
            </Card>
        </Link>
    );
};

export default UsersCard;

const Card = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 80vw;
    height: 200px;
    border-radius: 10px;
    box-shadow: 0px 0px 4px 1px rgba(0,0,0,0.2);
    margin: 20px 0;
    padding: 20px;
    font-family: 'Roboto', sans-serif;
    font-size: 20px;
    color: #000;
    text-align: center;
    overflow: hidden;
    
    &:hover{
        box-shadow: 0px 0px 4px 1px rgba(0,0,0,0.5);
        background-color: #f2f2f2;
    }
`;

const UserImg = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin: 10px 0;
`;

const UserName = styled.p`
    font-weight: bold;
    margin: 10px 0;
`;
