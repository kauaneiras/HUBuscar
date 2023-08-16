import React, {useState, useEffect} from "react";
import styled, {keyframes} from "styled-components";
import { Link } from "react-router-dom";

import colors from "../style/colors";

import logo from "../assets/imgs/Logo.png";
import history from "../assets/imgs/history.png";
import about from "../assets/imgs/about.png";

interface NavBarProps { setNavbarOpen: (value: boolean) => void; }
const Navbar: React.FC<NavBarProps> = ({ setNavbarOpen }) => {
    const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);

    useEffect(() => {
        const updateScreenWidth = () => { setScreenWidth(window.innerWidth); }
        window.addEventListener('resize', updateScreenWidth);
        return () => { window.removeEventListener('resize', updateScreenWidth); }
    }, []);

    return (
        <CoverScreen onClick={() => setNavbarOpen(false)}>
            <Nav screenWidth={screenWidth}>
                <NavLinks>
                    <Link to="/" onClick={() => setNavbarOpen(false)}>
                        <LogoBox screenWidth={screenWidth}> 
                            <LogoContainer>
                                <LogoImg src={logo} screenWidth={screenWidth} />
                                <LogoText>HUBuscar</LogoText>
                            </LogoContainer>
                            <LinkButton screenWidth={screenWidth}><h1>X</h1></LinkButton>
                        </LogoBox>
                    </Link>
                    <Link to="/history"><Butons screenWidth={screenWidth}><ButtonImg screenWidth={screenWidth} src={history}/>Histórico</Butons></Link>
                    <Link to="/about"><Butons screenWidth={screenWidth}><ButtonImg src={about} screenWidth={screenWidth}/>About</Butons></Link>
                </NavLinks>
            </Nav>
        </CoverScreen>
    );
};

export default Navbar;

interface RepoInfosProps { screenWidth: number; }

const slideAnimation = keyframes`
  from {transform: translateX(-100%);}
  to {transform: translateX(0);}
`;
const CoverScreen = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 500%;
    z-index : 10;
    background-color: rgba(0,0,0,0.5);
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
`;
const Nav = styled.nav<RepoInfosProps>`
    left: 0;
    width: ${({ screenWidth }) => (screenWidth < 1200 ? (screenWidth > 600? '50%' : '100%') : '20%')};
    height: 100%;
    background-color: ${colors.backgroungNavBar};
    animation: ${slideAnimation} 0.6s ease-in-out;
`;
const NavLinks = styled.ul`
    list-style: none;
    display: flex;
    height: 100%;
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
`;
const Butons = styled.button<RepoInfosProps>`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    background-color: ${colors.navbarButtonBackground};
    width: ${({ screenWidth }) => (screenWidth < 1200 ? (screenWidth > 600? '50vw' : '100vw') : '20vw')};
    height: 50px;
    border: none;
    font-size: 1.4rem;
    font-weight: 500;
    color: #000;
    cursor: pointer;
    &:hover {color: #fff; background-color: ${colors.navbarButtonBackgroundHover};}
    &:active {color: #fff; background-color: ${colors.navbarButtonBackgroundActive};}
    padding: 10px;
`;
const ButtonImg = styled.img<RepoInfosProps>`
    display: ${({ screenWidth }) => (screenWidth < 1200 ? 'none': 'block')};
    width: 30px;
    height: 30px;
    margin-right: 10px;
`;
const LogoBox = styled.div<RepoInfosProps>`
    width: ${({ screenWidth }) => (screenWidth < 1200 ? (screenWidth > 600? '50vw' : '100vw') : '20vw')};
    height: 100px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: ${colors.backgroundNavbarLogo};

`;
const LogoText = styled.h1`
    font-size: 1.8rem;
    font-weight: 600;
    color: ${colors.navbarLogoText};
    margin-left: 10px;
    font-family: 'Helvetica Neue', sans-serif;
`;
const LogoImg = styled.img<RepoInfosProps>`width: 50px; height: 50px;
`;

const LinkButton = styled.div<RepoInfosProps>`
    z-index: 10;
    display: ${({ screenWidth }) => (screenWidth > 600 ? 'none': 'flex')};
    position: absolute;
    right: 10px;
    height: 40px;
    width: 40px;
    border-radius: 27px;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.5);
    transition: background-color 0.3s ease; 
    font-size: 10px;
    &:hover {
        background-color: rgba(255, 255, 255, 1); 
    }

`
const LogoContainer = styled.div`
    display: flex;
    flex-direction: row;
`