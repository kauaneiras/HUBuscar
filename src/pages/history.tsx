import React from 'react';
import UsersCard from '../components/usersCard';

interface User {login: string; photo: string;}

const History: React.FC = () => {
    const storedUsers = (JSON.parse(localStorage.getItem('storedUsers') || '[]') as User[]).reverse();

    console.log(storedUsers);
    return (
        <div>
            <h1>History</h1>
            {storedUsers.map((user, index) => (<UsersCard key={index} login={user.login} photo={user.photo}/>))}
        </div>
    );
};  

export default History;
