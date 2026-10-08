import { useState } from "react";

export const useForm = (initialForm = {}) => {
  const [formState, setFormState] = useState(initialForm);

  const handleInputChange = ({ target }) => {
    const { name, value } = target;

    setFormState((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setFormState(initialForm);
  };

  return {
    formState,
    handleInputChange,
    handleReset,
  };
};