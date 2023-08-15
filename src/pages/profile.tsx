import { useParams, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SearchBar from '../components/searchBar';
import RepoCard from '../components/repoCard';
import colors from '../style/colors';

const Profile: React.FC = () => {
    const { login } = useParams<{ login: string }>();
    const [data, setData] = useState<any>({});
    const [repos, setRepos] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);

    useEffect(() => {
        const updateScreenWidth = () => { setScreenWidth(window.innerWidth); }
        window.addEventListener('resize', updateScreenWidth);
        return () => { window.removeEventListener('resize', updateScreenWidth); }
    }, []);

    useEffect(() => {
        fetch(`https://api.github.com/users/${login}`)
            .then((response) => response.json())
            .then((userData) => {
                setData(userData);
                setLoading(false);
    
                const storedUsers = JSON.parse(localStorage.getItem('storedUsers') || '[]');
    
                const userIndex = storedUsers.findIndex((user: any) => user.login === userData.login);
    
                if (userIndex !== -1) {storedUsers.splice(userIndex, 1);}
                storedUsers.push({login: userData.login,photo: userData.avatar_url,bio: userData.bio,location: userData.location});
    
                localStorage.setItem('storedUsers', JSON.stringify(storedUsers));
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, [login]);
    
    useEffect(() => {
        fetch(`https://api.github.com/users/${login}/repos`)
            .then((response) => response.json())
            .then((reposData) => {
                setRepos(reposData);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, [login]);

    console.log(repos);
    if (loading) { return <h1>Loading...</h1>; }

    return (
        <>
            <SearchBar />
            <Container>
                <UserInfos screenWidth={screenWidth}>
                    <UserPhoto src={data.avatar_url} alt="Foto de perfil" />

                    <UserInfosTexts>
                        <UserName>{data.name}</UserName>
                        <UserLogin>{data.login}</UserLogin>
                        <UserBio>{data.bio}</UserBio>
                        <UserLocation>{data.location}</UserLocation>
                        <UserEmail>{data.email}</UserEmail>
                        <UserFollowers>{data.followers}</UserFollowers>
                        <UserFollowing>{data.following}</UserFollowing>

                        {/* <UserPhoto src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoWkjPpfBCjY8AOZ1PBilxSpfNWnFUdlT5QlGAqcTwkw&s" alt="Foto de perfil" />
                        <UserName>juju</UserName>
                        <UserLogin>jujujuju</UserLogin>
                        <UserBio>Sou dev</UserBio>
                        <UserLocation>Brasilia</UserLocation>
                        <UserEmail>juju@email.com</UserEmail>
                        <UserFollowers>43</UserFollowers>
                        <UserFollowing>45</UserFollowing> */}

                        <Link to={`https://github.com/${login}`}><GoToGitHub>Ver no GitHub</GoToGitHub></Link>
                    </UserInfosTexts>
                </UserInfos>
                <RepoInfos screenWidth={screenWidth}>
                    {repos.map((repo: any) => (
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
                </RepoInfos>
            </Container>
        </>
    );
}


interface RepoInfosProps { screenWidth: number; }

const Container = styled.div`
    display: flex;  
    height: 100vh;
    width: 100vw;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-around;
    margin-top: 50px;
    padding: 0 50px;
    background-color: ${colors.light.searchBarBackground};
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
    padding: 40px;
`;

const UserInfosTexts = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
`;
const UserPhoto = styled.img`width: 80%; height: auto; border-radius: 50%; `; //arrumar de forma que a imagem fique inteira
const UserName = styled.h1`font-size: 30px; margin-top: 20px;`;
const UserLogin = styled.h2`font-size: 20px; margin-top: 10px;`;
const UserBio = styled.p`font-size: 15px; margin-top: 10px;`;
const UserLocation = styled.p`font-size: 15px; margin-top: 10px;`;
const UserEmail = styled.p`font-size: 15px; margin-top: 10px;`;
const UserFollowers = styled.p`font-size: 15px; margin-top: 10px;`;
const UserFollowing = styled.p`font-size: 15px; margin-top: 10px;`;

const GoToGitHub = styled.button`
    text-decoration: none;
    color: #000;
    background-color: #f2f2f2;
    font-size: 20px;
    margin-top: 10px;
    &:hover { color: #000; text-decoration: underline;}
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

export default Profile;
