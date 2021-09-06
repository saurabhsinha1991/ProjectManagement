import { useState } from "react";

function useLoggedIn() {
    const [isLoggedIn, setLogin] = useState(false);

    return [isLoggedIn];
}

export default useLoggedIn;