export const initialState = {
    Search:""
}

function Reducer(state,action){
switch(action.type){
case "SEARCH":
    return {...state,Search:action.item}
}
}


export default Reducer