import { createContext, useContext, useState } from "react";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [online, setOnline] = useState(false); // başlangıç değeri false

  const updateStatus = async (userId, newOnline) => {
    try {
      await axios.patch(`http://localhost:5000/users/${userId}`, {
        online: newOnline,
      });
    } catch (error) {
      console.log("Durum güncelleme hatası", error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        id,
        setId,
        email,
        setEmail,
        name,
        setName,
        password,
        setPassword,
        online,
        setOnline,
        updateStatus,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
