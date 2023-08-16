//------------------------------------- Imports --------------------------------------//
import React from "react";
import styled, {keyframes} from "styled-components";
import { Link } from "react-router-dom";
//------------------------------------- Styles -------------------------------------//
import colors from "../style/colors";
//------------------------------------- Images -------------------------------------//
import logo from "../assets/imgs/Logo.png";
import history from "../assets/imgs/history.png";
import about from "../assets/imgs/about.png";

interface NavBarProps { setNavbarOpen: (value: boolean) => void; }
const Navbar: React.FC<NavBarProps> = ({ setNavbarOpen }) => {

    return (
        <CoverScreen onClick={() => setNavbarOpen(false)}>
            <Nav>
                <NavLinks>
                    <Link to="/"><LogoBox><LogoImg src={logo}/><LogoText>HUBuscar</LogoText> </LogoBox></Link>
                    <Link to="/history"><Butons><ButtonImg src={history}/>Historico</Butons></Link>
                    <Link to="/about"><Butons><ButtonImg src={about}/>About</Butons></Link>
                </NavLinks>
            </Nav>
        </CoverScreen>
    );
};

export default Navbar;

const slideAnimation = keyframes`
  from {transform: translateX(-100%);}
  to {transform: translateX(0);}
`;
const CoverScreen = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index : 10;
    background-color: rgba(0,0,0,0.5);
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
`;
const Nav = styled.nav`
    left: 0;
    width: 20%;
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
const Butons = styled.button`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    background-color: ${colors.navbarButtonBackground};
    width: 20vw;
    height: 50px;
    border: none;
    font-size: 1.4rem;
    font-weight: 500;
    color: #000;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    &:hover {color: #fff; background-color: ${colors.navbarButtonBackgroundHover};}
    &:active {color: #fff; background-color: ${colors.navbarButtonBackgroundActive};}
`;
const ButtonImg = styled.img`
    width: 30px;
    height: 30px;
    margin-right: 10px;
`;
const LogoBox = styled.div`
    width: 20vw;
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
const LogoImg = styled.img`width: 50px; height: 50px;`;