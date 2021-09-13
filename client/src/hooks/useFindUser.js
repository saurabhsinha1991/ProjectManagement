import { useState, useEffect } from 'react';
import { getData } from '../utils/api';

export default function useFindUser() {
   const [user, setUser] = useState(null);
   const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function findUser() {
            try {
                const response = await getData('/api/auth/user');
                setUser(response);
            } catch(err) {
                console.log('Error', err);
            }
            setLoading(false);
        }
        findUser();
    }, []);

    return {
        user,
        setUser,
        loading,
   }
}