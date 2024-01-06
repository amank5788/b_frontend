
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';





function Profile (){

    const [data, setData] = useState({});
    const navigate=useNavigate();
    const{setUser}=useContext(UserContext)
  useEffect(() => {
    // Get the token from local storage after successful login
    const token = localStorage.getItem('token');
      console.log(token)
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the token in the Authorization header
          },
        });
       
        setData(response.data); // Assuming response.data contains user information
        
        
      } catch (error) {
        // Handle error fetching user data
        console.error('Error fetching user data:', error);
      }
    };

    if (token!==null) {
      
      fetchUserData();
    }
    else{
      navigate('/');
    }
  }, []);

 function handleupdate(e){
   e.preventDefault();
   navigate('/profile/edit',{ state: { name:data.name,email:data.email,image:data.image} });
 }


 const deleteUser = async (emailToDelete) => {
  
  try {
    const response = await axios.delete('http://localhost:4000/api/users/profile/delete', {
      data: { email: emailToDelete },
    });
    if(response.status===200){
      localStorage.removeItem('token');
   
      navigate('/');
      setUser('');
    }
    
    
    console.log(response.status); // Handle success response
  } catch (error) {
    
    console.error('Error deleting user:', error);
  }
};




    return(
        <>
          
{data ?(
<div
    className="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16 bg-white shadow-xl rounded-lg text-gray-900">
    <div className="rounded-t-lg h-32 overflow-hidden">
        <img className="object-cover object-top w-full" src='https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ' alt='Mountain' />
    </div>
    <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
        <img className="object-cover object-center h-32" src={data.image} alt='Woman looking front' />
    </div>
    <div className="text-center mt-2">
        <h2 className="font-semibold">{data.name}</h2>
        <p className="text-gray-500">{data.usertype}</p>
        <p className="text-gray-500">{data.email}</p>
        <p className="text-gray-500">{data.phone}</p>
    </div>
    
    <div className="p-4 border-t mx-8 mt-2">
         {data.usertype==='admin'?(
          <>
          <button className="w-1/2 block mx-auto rounded-full bg-gray-900 hover:shadow-lg font-semibold text-white px-6 py-2">
          <Link to='/profile/alluser' >All User </Link>
        </button>
          </>
         ):(<></>)}
        <button className="w-1/2 block my-2 mx-auto rounded-full bg-gray-900 hover:shadow-lg font-semibold text-white px-6 py-2"
        onClick={(e)=>handleupdate(e)}>
         Update
        </button>
        <button className="w-1/2 block my-2 mx-auto rounded-full bg-gray-900 hover:shadow-lg font-semibold text-white px-6 py-2"
        onClick={()=>deleteUser(data.email)}
        >
          Delete
        </button>
    </div>
</div>) :  (
        <p>Loading...</p>
      )

}
        </>
    )
}

 export default Profile;