import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SearchBar from '../components/searchBar';
import colors from '../style/colors';
import about from "../assets/imgs/about.png";

const About: React.FC = () => {
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
                <h1>Sobre o projeto <Icone src={about}></Icone></h1>
                <Box>
                    <Text>Este projeto foi desenvolvido utilizando ReactJS, Typescript e Styled Components.</Text>

                    <h1>Sobre o autor <Icone src={about}></Icone></h1>
                    <Text><strong>Nome:</strong> Kauan T. Eiras</Text>
                    <Text><strong>Contato: </strong></Text>
                    <LinkBox>
                    <ProfileLink href="https://github.com/kauaneiras" target="_blank" rel="noopener noreferrer"><img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" />Github</ProfileLink>
                    <ProfileLink href="https://www.linkedin.com/in/kauan-de-torres-eiras-9a9563171/" target="_blank" rel="noopener noreferrer"><img src="https://cdn-icons-png.flaticon.com/512/174/174857.png"/> Linkedin</ProfileLink>
                    <ProfileLink href="mailto:kauante@hotmail.com" target="_blank" rel="noopener noreferrer"><img src="https://cdn-icons-png.flaticon.com/512/542/542638.png"/>E-mail</ProfileLink>
                    </LinkBox>
                </Box>
            </Container>
        </>
    );
};

export default About;

interface RepoInfosProps {screenWidth: number;}

const Container = styled.div<RepoInfosProps>`
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100vh;
        width: 100vw;
        text-align: left;
        background-color: ${colors.background};
        h1 {
            margin: 20px;
            font-size: ${({ screenWidth }) => (screenWidth < 600 ? '25px' : '30px')};
            text-align:center;
            padding: 20px;
        }
        padding: 20px;
    `;

const Icone = styled.img`
        width: 25px;
        height: 25px;
    `;

const ProfileLink = styled.a`
        color: #000;
        text-decoration: none;
        margin: 5px 0;
        font-size: 20px;
        font-weight: 500;
        img{
            width: 25px;
            height: 25px;
            margin-right: 5px;
        }
    `;

const Text = styled.p`
        font-size: 25px;
        font-weight: 500;
        margin-bottom: 10px;
`
const Box = styled.div`
        margin-left: 10px;
`

const LinkBox = styled.div`
        display: flex;
        flex-direction: column;
`