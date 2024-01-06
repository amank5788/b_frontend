import { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import UserContext from "../context/UserContext";

function Signin (){
      
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const navigate = useNavigate();
    const{setUser}=useContext(UserContext);

   const handleLogin= async (e)=>{
    e.preventDefault();
    try{
       const res= await axios.post('http://localhost:4000/api/users/signin',{email,password});
       const token=res.data.token;

        // Save the token in local storage or state for subsequent requests
      localStorage.setItem('token', token);
      console.log("logged in");
      setUser(email);
      navigate('/profile');

      // Redirect or perform actions after successful login
    } catch(err){
           
      console.error('Login failed:', err);
    }

   }
if(localStorage.getItem('token')===null){
    return(
        <>
             <div className="bg-white dark:bg-gray-900">
    <div className="flex justify-center h-screen">
        <div className="hidden bg-cover lg:block lg:w-2/3" style={{backgroundImage : 'url("https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80")'}}>
            <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
                <div>
                    <h2 className="text-2xl font-bold text-white sm:text-3xl">Made by Aman</h2>

                    <p className="max-w-xl mt-3 text-gray-300">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. In
                        autem ipsa, nulla laboriosam dolores, repellendus perferendis libero suscipit nam temporibus
                        molestiae
                    </p>
                </div>
            </div>
        </div>

        <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
            <div className="flex-1">
                <div className="text-center">
                    <div className="flex justify-center mx-auto">
                        <img className="w-auto h-7 sm:h-8" src="https://merakiui.com/images/logo.svg" alt="" />
                    </div>

                    <p className="mt-3 text-gray-500 dark:text-gray-300">Sign in to access your account</p>
                </div>

                <div className="mt-8">
                    <form onSubmit={handleLogin}>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Email Address</label>
                            <input type="email" name="email" id="email" placeholder="example@example.com" className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" 
                                value={email}
                                required
                                onChange={(e)=>{setEmail(e.target.value)}}
                            />
                        </div>

                        <div className="mt-6">
                            <div className="flex justify-between mb-2">
                                <label htmlFor="password" className="text-sm text-gray-600 dark:text-gray-200">Password</label>
                               
                            </div>

                            <input type="password" name="password" id="password" placeholder="Your Password" className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" 
                                value={password}
                                required
                                onChange={(e)=>{setPassword(e.target.value)}}
                            />
                        </div>

                        <div className="mt-6">
                            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                            type="submit"
                            >
                                Sign in
                            </button>
                        </div>

                    </form>

                    <p className="mt-6 text-sm text-center text-gray-400">Don&#x27;t have an account yet? <Link to='/signup' className="text-blue-500 focus:outline-none focus:underline hover:underline">Sign up</Link>.</p>
                </div>
            </div>
        </div>
    </div>
</div>
        </>
    )
}
else{
    navigate('/profile')
}
   
}

 export default Signin;





 