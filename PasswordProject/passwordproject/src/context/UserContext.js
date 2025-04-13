import { createContext, useContext, useState } from "react";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [editId, setEditId] = useState("");
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [realName, setRealName] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [online, setOnline] = useState(false); // başlangıç değeri false
  const [isAdmin, setIsAdmin] = useState(false);

  const updateStatus = async (userId, newOnline) => {
    try {
      await axios.patch(`http://localhost:5000/users/${userId}`, {
        online: newOnline,
      });
    } catch (error) {
      console.log("Durum güncelleme hatası", error);
    }
  };

  const updateBio = async (userId, newBio) => {
    try {
      await axios.patch(`http://localhost:5000/users/${userId}`, {
        bio: newBio,
      });
    } catch (error) {
      console.log("Bio güncelleme hatası", error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        editId,
        setEditId,
        id,
        setId,
        email,
        setEmail,
        realName,
        setRealName,
        name,
        setName,
        bio,
        setBio,
        image,
        setImage,
        password,
        setPassword,
        online,
        setOnline,
        updateStatus,
        updateBio,
        isAdmin,
        setIsAdmin,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
