import { useEffect,useState } from "react";
import { Navigate} from "react-router-dom";


const Auth = ({children}) =>{
    const [currentUser,setCurrentUser] = useState(); // usestae for current user

    useEffect(()=>{
        const StoredUser = localStorage.getItem("user"); // get user data in localstorage
        
        if(StoredUser){
            const user = JSON.parse(StoredUser);    // check data : data found then parse to state
            setCurrentUser(user);
        }
        else{
            setCurrentUser(null);   // else state is null

        }
    },[]);

    if(currentUser === undefined){  //check user is undefined : then return null
        return null;
    }
    if(currentUser === null){
        return <Navigate to="/login" replace/>  //if user null navigte login
    }
    return children;
};
export default Auth;