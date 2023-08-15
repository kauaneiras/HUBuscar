import React, {useEffect, useState} from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Navbar : React.FC = () => {
    const [scroll, setScroll] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            setScroll(window.scrollY > 50);
        });
    }, []);

    return (
        <Nav scroll={scroll}>
            <Logo href="/">Logo</Logo>
            <NavLinks>
                <Link to="/"><Butons>Inicio</Butons></Link>
                <Link to="/about"><Butons>Sobre</Butons></Link>
                <Link to="/history"><Butons>Buscas Recentes</Butons></Link>
            </NavLinks>
        </Nav>
    );
};

export default Navbar;

const Nav = styled.nav<{scroll: boolean}>`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 80px;
    padding: 0 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: ${({scroll}) => (scroll ? "#fff" : "transparent")};
    box-shadow: ${({scroll}) => (scroll ? "0 5px 10px rgba(0, 0, 0, 0.12)" : "none")};
    transition: 0.4s;
    z-index: 2;
`;

const Logo = styled.a`
    color: #000;
    font-size: 35px;
    font-weight: 600;
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: 2px;
`;

const NavLinks = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
`;

const Butons = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 1rem;
    margin: 0 0.25rem;
    font-weight: 500;
    color: #000;
    text-decoration: none;
    cursor: pointer;
    transition: 0.3s;
    &:hover {
        color: #000;
    }
    &:active {
        color: #000;
    }
    &:last-child {
        margin-right: 0;
    }
`;

