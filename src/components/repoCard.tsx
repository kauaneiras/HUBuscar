import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

interface RepoCardProps {
    login: string;
    name: string;
    description: string;
    created_at: string;
    update_at: string;
    language: string;
    stars: number;
    forks: number;
    link: string;
}
const RepoCard: React.FC<RepoCardProps> = (props) => {

    function formatDate(i: string): string {
        const date = new Date(i);
        return format(date, 'dd MMM yyyy');
    }

    console.log(props);


    return (
        <Link to={`https://github.com/${props.login}/${props.name}`} style={{ textDecoration: 'none', color: '#000' }}>
            <Card>
                <Name>{props.name}</Name>
                <Description>{props.description}</Description>
                <Language>{props.language}</Language>
                <MoreInfo>
                    <Created_at>{formatDate(props.created_at)}</Created_at>
                    <Update_at>{formatDate(props.update_at)} </Update_at>
                </MoreInfo>
            </Card>
        </Link>
    );
};


export default RepoCard;

const Card = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
    height: auto;
    border-radius: 10px;
    box-shadow: 0px 0px 4px 1px rgba(0,0,0,0.2);
    margin: 20px 0;
    padding: 20px;
    font-family: 'Roboto', sans-serif;
    font-size: 20px;
    color: #000;
    overflow: hidden;
    
    &:hover{
        box-shadow: 0px 0px 4px 1px rgba(0,0,0,0.5);
        background-color: #f2f2f2;
    }
`;

const Name = styled.p`font-weight: bold; margin: 10px 0;`;
const Description = styled.p`margin: 10px 0;`;
const Created_at = styled.p`margin: 10px 0;`;
const Update_at = styled.p`margin: 10px 0;`;
const Language = styled.p`margin: 10px 0;`;

const MoreInfo = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 50px;
    border-radius: 10px;
    box-shadow: 0px 0px 4px 1px rgba(0,0,0,0.2);
    margin: 20px 0;
    padding: 20px;
    font-family: 'Roboto', sans-serif;
    font-size: 20px;
    color: #000;
    text-align: center;
    overflow: hidden;'
`;


