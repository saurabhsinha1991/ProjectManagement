import { useState } from "react";
import { postData } from "../utils/api";

export const useRegister = () => {
  const [showForm, setShowForm] = useState(false);
  const [regError , setRegError] = useState('')
  const showRegisterForm = () => setShowForm(true);

  const postRegisterDetails = async (name, email, password) => {
     let res = await postData("/api/register", { name, email, password });
      setRegError(res?.error?.[0]?.msg)
  };

  return {
    showForm,
    regError,
    setShowForm,
    setRegError,
    showRegisterForm,
    postRegisterDetails,
  };
};
