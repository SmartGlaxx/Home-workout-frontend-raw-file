const SETSIDEBAR = 'SETSIDEBAR' ; 
const CURRENTUSERPARSED = 'CURRENTUSERPARSED'; 

const reducer = (state, action)=>{
    switch(action.type){
        case SETSIDEBAR:
            return {...state, sidebarOpen : !state.sidebarOpen}
        case CURRENTUSERPARSED :
            return {...state, currentUserParsed : action.payload}      

        default:
            return {...state}
    }
    return state
}

export default reducer
