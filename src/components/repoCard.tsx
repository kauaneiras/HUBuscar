import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import Forks from '../assets/imgs/fork.png';
import Stars from '../assets/imgs/stars.webp';

import colors from '../style/colors';

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
};

const RepoCard: React.FC<RepoCardProps> = (props) => {
    function formatDate(i: string): string { const date = new Date(i); return format(date, 'dd MMM yyyy'); }
    const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);

    useEffect(() => {
        const updateScreenWidth = () => { setScreenWidth(window.innerWidth); }
        window.addEventListener('resize', updateScreenWidth);
        return () => { window.removeEventListener('resize', updateScreenWidth); }
    }, []);

    return (
        <Link to={`https://github.com/${props.login}/${props.name}`} style={{ textDecoration: 'none', color: '#000' }}>
            <Card>
                <Name screenWidth={screenWidth}>💾 {props.name}<ForksAndStars screenWidth={screenWidth}><img src={Forks} alt="forks" /> {props.forks} | <img src={Stars} alt="stars" /> {props.stars}</ForksAndStars></Name>
                <Description screenWidth={screenWidth}>{props.description}</Description>
                <Language style={{color: generateRandomColor()}}>💻 {props.language}</Language>
                <MoreInfo screenWidth={screenWidth}>
                    <Created_at  screenWidth={screenWidth}>🌐 Criado em: {formatDate(props.created_at)}</Created_at>
                    <Update_at  screenWidth={screenWidth}>🕜 Atualizado: {formatDate(props.update_at)} </Update_at>
                </MoreInfo>
            </Card>
        </Link>
    );
};

export default RepoCard;

//-------------------------------------------- Styled Components --------------------------------------------------//
interface RepoInfosProps { screenWidth: any; }

const Name = styled.p<RepoInfosProps>`
    font-weight: 700; margin: 10px 0; 
    font-size: ${({ screenWidth }) => (screenWidth < 600 ? '15px' : '20px')};
    display: flex; 
    flex-direction: row; 
    align-items: center; 
    justify-content: space-between; 
    width: 100%;
`;
const Description = styled.p<RepoInfosProps>`
    margin: 10px 0;
    font-size: ${({ screenWidth }) => (screenWidth < 600 ? '10px' : '15px')};
`;
const Created_at = styled.p <RepoInfosProps>`
    margin: 10px 0; 
    font-weight: 700;
    font-size: ${({ screenWidth }) => (screenWidth < 600 ? '10px' : '15px')};
`;
const Update_at = styled.p<RepoInfosProps>`
    margin: 10px 0; 
    font-size: ${({ screenWidth }) => (screenWidth < 600 ? '10px' : '15px')};
    font-weight: 700;
`;
const Language = styled.p`margin: 10px 0; font-size: 15px; font-weight: 700;`;
const Card = styled.div`
    display: flex;
    position: relative;
    background-color: ${colors.repoCardsBackground};
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
    color: #000000;
    overflow: hidden;
    transition: all 0.4s ease-in-out;
    &:hover{
        box-shadow: 0px 0px 4px 1px rgba(0,0,0,0.5);
        background-color: ${colors.repoCardsBackgroundHover};
    }
`;
const MoreInfo = styled.div<RepoInfosProps>`
    background-color: ${colors.repoCardsMoreInfoBackground};
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
    font-size: ${({ screenWidth }) => (screenWidth < 600 ? '5px' : '20px')};
    color: #000;
    text-align: center;
    overflow: hidden;'
   
`;
const ForksAndStars = styled.div<RepoInfosProps>`
    display: ${({ screenWidth }) => (screenWidth < 600 ? 'none' : 'flex')};
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 150px;
    height: 50px;
    border-radius: 10px;
    img{width: 20px; height: 20px;}
`;
const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    do {
        color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
    } while (calculateBrightness(color) > 180);
    return color;
};

const calculateBrightness = (color: any) => {
    const hex = color.substring(1);
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    return (r * 299 + g * 587 + b * 314) / 1000;
};