import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import lupa from '../assets/imgs/lupa.png';
import menu from '../assets/imgs/menu.png';

export default function SearchBar() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [searchText, setSearchText] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isExpanded) {inputRef.current?.focus();}
        const handleDocumentClick = (event: MouseEvent) => {
            if (!event.target) return;
            const target = event.target as HTMLElement;
            if (!target.closest('#search-bar-container')) {
                setIsExpanded(false);
                setSearchText('');
            }
        };
        document.addEventListener('click', handleDocumentClick);
        return () => {document.removeEventListener('click', handleDocumentClick);};
    }, [isExpanded]);

    return (
        <SearchBarAndSuggestionContainer onBlur={() => setIsExpanded(false)}>
            <Container id="search-bar-container">
                {!isExpanded && <MenuIcon src={menu} alt="menu" />}
                <SearchIconContainer isExpanded={isExpanded} onClick={() => !isExpanded && setIsExpanded(true)} disabled={isExpanded}>
                    <SearchIcon src={lupa} />
                    <Input
                        ref={inputRef}
                        isExpanded={isExpanded}
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        placeholder="Pesquise por um usuário"
                    />
                    {searchText && <ClearButton onClick={() => setSearchText('')}>X</ClearButton>}
                </SearchIconContainer>
            </Container>
            <AlignSuggestion>{searchText && <Link to={`/search/${searchText}`}>
            <SuggestionContainer>
                <SearchIcon src={lupa} />
                {searchText}
                <p> Pesquisar no HUBuscar </p>
                </SuggestionContainer>
                </Link>}
            </AlignSuggestion>
        </SearchBarAndSuggestionContainer>
    );
};

const SearchBarAndSuggestionContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const AlignSuggestion = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
`;

const SuggestionContainer = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: white;
    border: 1px solid #ccc;
    width: 90%;
    top: 50px;
    left: 5%;
    color: black;
    font-size: 20px;
    padding: 10px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
    padding-left: 20px;
    padding-right: 20px;
`;

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    margin-left: 20px;
    margin-right: 20px;
`;

const SearchIconContainer = styled.button<{ isExpanded: boolean }>`
    width: ${props => (props.isExpanded ? '100%' : '50px')};
    height: 50px;
    border-radius: 25px;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: ${(props) => (props.isExpanded ? '0.6s' : 'none')};
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
`;

const SearchIcon = styled.img`
    width: 30px;
    height: 30px;
`;

const MenuIcon = styled.img`
    width: 30px;
    height: 30px;
`;

const Input = styled.input<{ isExpanded: boolean }>`
    width: ${props => (props.isExpanded ? 'calc(100% - 40px)' : '0')};
    height: 100%;
    border: none;
    outline: none;
    font-size: 20px;
    transition: 0.3s;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
    background-color: transparent;
`;

const ClearButton = styled.button`
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    font-size: 20px;
    font-weight: bold;
    transition: 0.3s;
    color: red;

    &:hover {
        color: white;
    }
`;
