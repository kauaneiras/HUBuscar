import { useParams, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SearchBar from '../components/searchBar';
import RepoCard from '../components/repoCard';
import colors from '../style/colors';
import LoadingImg from '../assets/imgs/Loading.gif'
import LoadingMobile from '../assets/imgs/LoadingMobile.gif'
import ReposLoading from '../assets/imgs/ReposLoading.gif'
import filterRepos from '../utils/filterRepos';

const Profile: React.FC = () => {
    const { login } = useParams<{ login: string }>();
    const [data, setData] = useState<any>({});
    const [repos, setRepos] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingRepos, setLoadingRepos] = useState<boolean>(true);
    const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);
    const [filtering, setFiltering] = useState<string>('recent_update');

    useEffect(() => {
        const updateScreenWidth = () => { setScreenWidth(window.innerWidth); }
        window.addEventListener('resize', updateScreenWidth);
        return () => { window.removeEventListener('resize', updateScreenWidth); }
    }, []);

    useEffect(() => {
        fetch(`https://api.github.com/users/${login}`)
            .then((response) => response.json())
            .then((userData) => {
                setData(userData); setLoading(false);
                const storedUsers = JSON.parse(localStorage.getItem('storedUsers') || '[]');
                const userIndex = storedUsers.findIndex((user: any) => user.login === userData.login);
                if (userIndex !== -1) { storedUsers.splice(userIndex, 1); }
                storedUsers.push({ login: userData.login, photo: userData.avatar_url, bio: userData.bio, location: userData.location, email: userData.email, followers: userData.followers, following: userData.following });
                localStorage.setItem('storedUsers', JSON.stringify(storedUsers));
            })
            .catch((error) => { console.error("Error fetching data:", error); });
    }, [login]);

    useEffect(() => {
        fetch(`https://api.github.com/users/${login}/repos`)
            .then((response) => response.json())
            .then((reposData) => { setRepos(reposData); setLoadingRepos(false); })
            .catch((error) => { console.error("Error fetching data:", error); });
    }, [login]);

    if (loading) { screenWidth < 850 ? <LoadingImageStyled src={LoadingMobile} alt="Loading" /> : <LoadingImageStyled src={LoadingImg} alt="Loading" />; }
    const sortedRepos = filterRepos(repos, filtering);
    const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => { setFiltering(event.target.value); };
    console.log('USER: ', data)
    return (
        <>
            <SearchBar />
            <Container>
                <UserInfos screenWidth={screenWidth}>
                    <UserPhoto src={data.avatar_url} alt="Foto de perfil" />
                    <UserInfosTexts>
                        <UserName>{data.name}</UserName>
                        <UserLogin>🌐 {data.login}</UserLogin>
                        <UserBio>{data.bio}</UserBio>
                        <UserLocation>📌 {data.location}</UserLocation>
                        <UserEmail>📧 {data.email}</UserEmail>
                        <UserFollowers>🔹 Seguidores: {data.followers}</UserFollowers>
                        <UserFollowing>🔹 Seguindo: {data.following}</UserFollowing>
                        <Link to={`https://github.com/${login}`} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <GoToGitHub>Ver no GitHub</GoToGitHub>
                        </Link>
                    </UserInfosTexts>
                </UserInfos>
                <RepoInfos screenWidth={screenWidth}>
                    {loadingRepos ? <LoadingRepoImageStyled src={ReposLoading} alt="Loading" /> :
                        <div>
                            <FilterSelectContainer>
                                <FilterSelect onChange={handleFilterChange}>
                                    <option value="last_created">Criado por Ultimo</option>
                                    <option value="created_first">Criado Primeiro</option>
                                    <option value="recent_update">Atualizado Recente</option>
                                    <option value="less_update">Não Atualizado</option>
                                    <option value="name">Nome do Repositorio</option>
                                    <option value="stars">Stars</option>
                                    <option value="forks">Forks</option>
                                </FilterSelect>
                            </FilterSelectContainer>
                            {sortedRepos.map((repo: any) => (
                                <RepoCard
                                    key={repo.id}
                                    login={data.login}
                                    name={repo.name}
                                    description={repo.description}
                                    language={repo.language}
                                    stars={repo.stargazers_count}
                                    forks={repo.forks}
                                    link={repo.html_url}
                                    created_at={repo.created_at}
                                    update_at={repo.updated_at}
                                />
                            ))}
                        </div>
                    }
                </RepoInfos>
            </Container>
        </>
    );
}


interface RepoInfosProps { screenWidth: number; }

const Container = styled.div`
    display: flex;  
    height: 100%;
    width: 100vw;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-around;
    padding: 50px;
    background-color: ${colors.background};
`;
const UserInfos = styled.div<RepoInfosProps>`
    display: flex;
    height: 80%;
    width:  ${({ screenWidth }) => (screenWidth < 850 ? '100%' : '30%')};
    min-width: 300px;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    border-radius: 10px;
    background-color: #f2f2f2;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
    margin-bottom: 40px;
`;
const UserInfosTexts = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
    padding: 50px;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
`;
const GoToGitHub = styled.button`
    text-decoration: none;
    color: white;
    background-color: #00BAEA;
    font-size: 15px;
    font-weight: 700;
    margin-top: 10px;
    border: none;
    margin-top: 20px;
    height: 50px;
    width: 150px;
    border-radius: 10px;
    center: 0;
    &:hover {background-color: #00A0D8; cursor: pointer;}
`;
const RepoInfos = styled.div<RepoInfosProps>`
    display: flex;
    height: auto;
    width: ${({ screenWidth }) => (screenWidth < 850 ? '100%' : '60%')};
    flex-direction: column;
    justify-content: flex-start;
    border-radius: 10px;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75); 
    padding: 40px;
`;
const LoadingImageStyled = styled.img`
    width: 40%; 
    height: 40%;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 40%;
    left: 40%;
    object-fit: contain;
    `;
const FilterSelectContainer = styled.div`
    display: flex;
    justify-content: flex-end;
  `;
const FilterSelect = styled.select`
    width: 200px;
    height: 30px;
    border-radius: 5px;
    border: none;
    background-color: #f2f2f2;
    font-size: 15px;
    margin-bottom: 20px;
    margin-top: 20px;
    margin-right: 20px;
    padding-left: 10px;
    &:hover { background-color: #e6e6e6; }
    &:active { background-color: #d9d9d9; }
    &:focus { background-color: #d9d9d9; }
`;

const LoadingRepoImageStyled = styled.img`
    width: 40%; 
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
    object-fit: contain;
    `;

const UserPhoto = styled.img`width: 80%; height: auto; border-radius: 50%; `; //arrumar de forma que a imagem fique inteira
const UserName = styled.h1`font-size: 30px; margin-top: 20px;`;
const UserLogin = styled.h2`font-size: 20px; margin-top: 10px;`;
const UserBio = styled.p`font-size: 15px; margin-top: 10px;`;
const UserLocation = styled.p`font-size: 15px; margin-top: 10px;`;
const UserEmail = styled.p`font-size: 15px; margin-top: 10px;`;
const UserFollowers = styled.p`font-size: 15px; margin-top: 10px;`;
const UserFollowing = styled.p`font-size: 15px; margin-top: 10px;`;
export default Profile;


