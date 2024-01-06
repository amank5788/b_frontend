import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import axios from 'axios';



function ProfileCard (props){

    const[dot,setDot]=useState('hidden')
    const navigate=useNavigate();
    const{user,setUser}=useContext(UserContext);
    function handleClick(){
          if(dot==='hidden') setDot('');
          else setDot('hidden');

    }

    function handleEdit(e){
          e.preventDefault();
         navigate('/profile/edit',{ state: { name:props.name,email:props.email,image:props.image} })

    }

    const deleteUser = async () => {
  
        try {
          const response = await axios.delete('http://localhost:4000/api/users/profile/delete', {
            data: { email: props.email },
          });
          if(response.status===200){
            if(user===props.email){
                localStorage.removeItem('token');
         
                navigate('/');
                setUser('');
            }
            else{
                navigate('/profile/alluser')
            }
            
          }
          
          
          console.log(response.status); // Handle success response
        } catch (error) {
         
          console.error('Error deleting user:', error);
        }
      };  


    return(
        <>
           

<div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <div className="flex justify-end px-4 pt-4">
        <button id="dropdownButton" data-dropdown-toggle="dropdown" className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" type="button"
        onClick={handleClick}
        >
            <span className="sr-only">Open dropdown</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
            </svg>
        </button>
        
        <div id="dropdown" className={`z-10 ${dot} text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>
            <ul className="py-2" aria-labelledby="dropdownButton">
            <li>
                <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white hover:cursor-pointer"
                onClick={(e)=>handleEdit(e)}
                >Edit</p>
            </li>
           
            <li>
                <p className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white hover:cursor-pointer"
                onClick={()=>deleteUser()}
                >Delete</p>
            </li>
            </ul>
        </div>
    </div>
    <div className="flex flex-col items-center pb-10">
        <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={props.image} alt=""/>
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{props.name}</h5>
        <span className="text-sm text-gray-500 dark:text-gray-400"> {props.usertype}</span>
        <span className="text-sm text-gray-500 dark:text-gray-400"> {props.email}</span>
        <span className="text-sm text-gray-500 dark:text-gray-400"> {props.phone}</span>
        
    </div>
</div>

        </>
    )
}

 export default ProfileCard;