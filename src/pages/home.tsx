import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import SearchBar from '../components/searchBar';
import bemvindo from '../assets/imgs/bemvindo.png'
import bemvindotablet from '../assets/imgs/bemvindotablet.png'
import bemvindomobile from '../assets/imgs/bemvindomobile.png'

const Home: React.FC = () => {
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
                {
                    screenWidth < 600 ? <img src={bemvindomobile} /> :
                    (screenWidth < 1150 ? <img src={bemvindotablet} /> : <img src={bemvindo} />)
                }
            </Container>
        </>
    );
}

export default Home;
interface RepoInfosProps {screenWidth: number;}
const Container = styled.div<RepoInfosProps>`
    background-color: #e5e5e5;
    top: 70px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: red;
    font-size: 50px;
    font-weight: bold;
    position: fixed;
    z-index: -1;
    img{ 
        width: 100%; 
        height: 100%;
        object-fit: cover;
    }
`;

