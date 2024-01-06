import { useEffect } from "react";
import { useNavigate } from "react-router-dom";




function Page404 (){

    const navigate=useNavigate();
useEffect(()=>{
    setTimeout(()=>{
        navigate('/profile');
    },3000)
},[])

    return(
        <>
          <div className="flex justify-center h-screen items-center ">
          <div>
            <h2 className=" text-red-500 text-center font-bold">Page not found</h2>
            <p className=" text-yellow-500 text-center">you will be redirected to home screen</p>
          </div>
          </div>
        </>
    )
}

 export default Page404;