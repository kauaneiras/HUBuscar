import React from "react";
import styled, {keyframes} from "styled-components";
import { Link } from "react-router-dom";
import colors from "../style/colors";

interface NavBarProps { setNavbarOpen: (value: boolean) => void; }

const Navbar: React.FC<NavBarProps> = ({ setNavbarOpen }) => {


    return (
        <CoverScreen onClick={() => setNavbarOpen(false)}>
            <Nav>
                <NavLinks>
                    <Link to="/"><Logo>HUBuscar</Logo></Link>
                    <Link to="/history"><Butons>Buscas Recentes</Butons></Link>
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
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    height: 100%;
`;

const Butons = styled.button`
    background-color: #fff;
    width: 100%;
    height: 50px;
    border: none;
    font-size: 1.5rem;
    font-weight: 600;
    color: #000;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    &:hover {color: #fff; background-color: #0BA0E3;}
`;

const Logo = styled.div`
    background-color: blue;
    width: 100%;
    height: 50px;
    border: none;
    font-size: 1.5rem;
    font-weight: 600;
    color: #000;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    &:hover {
        color: #fff;
        background-color: red;

    }
`;




