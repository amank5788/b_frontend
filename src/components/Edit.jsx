import { useContext, useEffect, useState } from "react";
import axios from 'axios';
import { useLocation, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";




function Edit (){
   
    const[name,setName]=useState('');
    const[image,setImage]=useState('');
     const[warning,setWarning]=useState(false);
    const location = useLocation();
   
    const navigate=useNavigate();
    const{user}=useContext(UserContext);
     

    useEffect(()=>{
      
         if(localStorage.getItem('token')!==null){
          
          setName(location.state.name);
         }
         else{
          
          navigate('/');
         }
         
          
         
    },[])

    

    function handleImage(event){
      
      var reader=new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = function (event) {
        

        const base64WithoutPrefix = event.target.result.split(',')[1];

  // Get the length of the decoded base64 string in bytes
          const byteLength = (atob(base64WithoutPrefix).length)/1024;
        
        if(byteLength<=50){
          setImage(event.target.result);
          setWarning(false);
          
        }
        else{
          setWarning(true);
        }
         
         
        
    
         
         
        };
      
      reader.onerror=err=>{
        console.log(err);
      }
    }


    const handleSubmit = async (e) =>{
      e.preventDefault();
      const email=location.state.email;
      if(!warning){
        try {
          const response=await axios.put('http://localhost:4000/api/users/profile/update',{
              
          name,
          image,
          email,
  
          });
            if(response.status===200){
              if(user===email){
                navigate('/profile');
              }
              else{
                navigate('/profile/alluser');
              }
              
            }
          console.log("user updated",response.data)
        } catch(err){
          console.log('error updating user',err);
        }
      }
     
      
    }


    
   if(localStorage.getItem('token')!==null){
    return(
      <>
            <section className="bg-white dark:bg-gray-900">
    <div className="flex justify-center min-h-screen">
        <div className="hidden bg-cover lg:block lg:w-2/5" style={{backgroundImage:'url("https://images.unsplash.com/photo-1494621930069-4fd4b2e24a11?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80")'}}>
        </div>

        <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
            <div className="w-full">
                <h1 className="text-2xl font-semibold tracking-wider text-gray-800 capitalize dark:text-white">
                    Get your free account now.
                </h1>

                <p className="mt-4 text-gray-500 dark:text-gray-400">
                    Let’s get you all set up so you can verify your personal account and begin setting up your profile.
                </p>

                <div className="flex justify-center ">
                <img className="w-1/6 rounded-full" src={location.state.image} alt="current dp"/>
                </div>

                <form className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
                
                    <div>
                        <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Full Name</label>
                        <input type="text" placeholder="jhon" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" 
                         value={name}
                         onChange={(e)=>{setName(e.target.value)}}
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Profile Picture</label>
                        
                        <input type="file" accept="image/*"  size="512000" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" 
                            onChange={handleImage}
                        />
                        <p className=" text-yellow-600">Image size does not exceeds 50KB</p>
                        <p className={`${warning===true ?'':'hidden'} text-red-600`}>Image size exceeds 50KB</p>
                        
                    </div>

                    

                   



                    <button
                        className="flex items-center justify-between w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                        onClick={handleSubmit}
                        >
                        <span> Update </span>

                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 rtl:-scale-x-100" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clipRule="evenodd" />
                        </svg>
                    </button>
                </form>
            </div>
        </div>
    </div>
</section>
        </>
    )
   }
}

 export default Edit;