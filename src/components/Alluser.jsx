import { useEffect, useState } from "react";
import axios from 'axios';
import ProfileCard from "./ProfileCard";
import { useNavigate } from "react-router-dom";



function Alluser (){

    const[users,setUsers]=useState([]);
   

   const navigate=useNavigate();
    useEffect(()=>{
      const token = localStorage.getItem('token');
       if(token!==null){
        const fetchuser= async()=>{
          try {
              const response = await axios.get('http://localhost:4000/api/users/allusers',{
                headers: {
                  Authorization: `Bearer ${token}`, // Attach the token in the Authorization header
                },
              });
              
              
                setUsers(response.data);
                
              
              
            } catch (error) {
              if(error.status!==200){
                navigate('/profile');
              }
              console.error('Error fetching users:', error);
            }
      };
      fetchuser();
       }
       else{
        navigate('/');
       }
        

    },[users])


    return(
        
      <ul className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
        {users.map((user) => (
          <li key={user._id} className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
            <ProfileCard 
                name={user.name}
                usertype={user.usertype}
                image={user.image}
                email={user.email}
                phone={user.phone}
            />
          </li>
        ))}
      </ul>


       
    )
}

 export default Alluser;