import { useState } from "react";
import { postData } from "../utils/api";

export const useRegister = () => {
  const [showForm, setShowForm] = useState(false);
  const showRegisterForm = () => setShowForm(true);

  const postRegisterDetails = async (name, email, password) => {
    await postData("/api/register", { name, email, password });
  };

  return {
    showForm,
    setShowForm,
    showRegisterForm,
    postRegisterDetails,
  };
};
