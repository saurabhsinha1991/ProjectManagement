import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getData } from '../utils/api';

export default function useFindUser() {
   const [user, setUser] = useState(null);
   const [loading, setLoading] = useState(true);
   const history = useHistory();

   async function findUser() {
        try {
            const response = await getData('/api/auth/user');
            if (response?.msg === "Unauthorized") {
                await history.push('/login');
            }
            setUser(response);
        } catch(err) {
            console.log('Error', err);
        }
        setLoading(false);
    }

    useEffect(() => {
        findUser();
    }, []);

    return {
        user,
        setUser,
        findUser,
        loading,
   }
}