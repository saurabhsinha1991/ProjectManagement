import { useState } from "react";
import { postData } from "../utils/api";

function useAuth() {
    const [token, setToken] = useState(null);
    const loginFn = async (details) => {
        try {
            const { token } = await postData('/api/auth', details);
            setToken(token);
        } catch(err) {
            console.log('Error', err);
        }
    }

    return {
        token,
        loginFn
    };
}

export default useAuth;