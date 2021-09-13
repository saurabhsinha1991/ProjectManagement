import React, { useContext } from 'react';
import { UserContext } from '../../hooks/UserContext';

function Home() {
    const { user } = useContext(UserContext);
    return (
        <h1>Logged in as {user.name}</h1>
    )
}

export default Home;
