import { useEffect, useState } from "react";
import UserContext from "./UserContext";


const UserContextProvider=({children})=>{
const [user,setUser]=useState('');


useEffect(() => {
    // Retrieve data from localStorage on component mount
    const storedData = localStorage.getItem('myContextData');
    if (storedData) {
      setUser(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    // Save data to localStorage when context data changes
    if (user) {
      localStorage.setItem('myContextData', JSON.stringify(user));
    }
    else{
        localStorage.removeItem('myContextData'); 
    }
  }, [user]);


    return(
        <UserContext.Provider value={{user,setUser}}>
           {children}
        </UserContext.Provider>
    )
}
export default UserContextProvider;