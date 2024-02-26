import React, {useEffect, useReducer} from 'react'
import  reducer  from '../Reducer/app-reducer'
import Axios from 'axios'
import API from '../Resources/api'

const SETSIDEBAR = 'SETSIDEBAR' ; 
const CURRENTUSERPARSED = 'CURRENTUSERPARSED'; 

const getLoggedIn = ()=>{
    let value
    if(localStorage.getItem('LoggedIn') == "true"){
        value = localStorage.getItem('LoggedIn')
    }else{
        value = localStorage.getItem('LoggedIn')
    }
    return value
}


const getCurrentUser = ()=>{
    let value
    if(localStorage.getItem('CurrentUser')){
         value = localStorage.getItem('CurrentUser')
    }else{
        value = {}
    }
    return value
}


const AppContext = React.createContext()
const initialState = {
    loading: false,
    loggedIn : getLoggedIn(),
    currentUserParsed : {},
    currentUser : getCurrentUser(),
    sidebarOpen : false
}

export const AppProvider = ({children})=>{
    const [state, dispatch] = useReducer(reducer, initialState)

   
   const setCurrentUser = (value)=>{
        localStorage.setItem('CurrentUser',JSON.stringify(value))
    }

   const fetchCurrentUser=async(userUrl)=>{
    const options = {
        url: userUrl,
        method : "GET",
        headers : {
            "Accept" : "application/json",
            "Content-Type" : "application/json;cjarset=UTF-8"
        }
    }
   
    const result = await Axios(options)
    const {response, userData} = result.data
        if(response == "Success" && userData){
            dispatch({type : CURRENTUSERPARSED , payload : userData})
        }else{
            dispatch({type : CURRENTUSERPARSED , payload : {}})
        }
   }
   useEffect(()=>{
    const currentUserObj = state.currentUser     
    if(Object.keys(currentUserObj).length != 0){
        const {_id} = JSON.parse(state.currentUser)
        fetchCurrentUser(`${API}/user/${_id}/profile`)
    }
   },[state.currentUser])

   
   const setLoggedIn =(value)=>{
       if(value == true){
        localStorage.setItem('LoggedIn',"true")
       }else if(value == false){
        localStorage.setItem('LoggedIn',"false")
       }
   }

   
   const openSidebar = ()=>{
       dispatch({type : SETSIDEBAR})
   }

    return <AppContext.Provider value={{
        ...state, setCurrentUser, setLoggedIn, openSidebar}}>
    {children}
    </AppContext.Provider>
}

export const UseAppContext = ()=>{
    return React.useContext(AppContext)
}

