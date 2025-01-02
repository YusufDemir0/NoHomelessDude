import {createContext, useState } from "react";


export const UserContext = createContext()


export const UserContextProvider = ({children}) => {
 
     const [userState,setUserState] = useState({username:null,token:null,mail:null,password:null,photo:null})

     return <UserContext.Provider value={{userState,setUserState}}>
                 {children}
            </UserContext.Provider>

}
