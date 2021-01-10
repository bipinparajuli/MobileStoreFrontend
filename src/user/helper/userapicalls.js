import { API } from "../../Backend"

// export const googleLogin = user => {
//     console.log(user);
// return fetch(`${API}/signinwithgoogle`,{
// method:"POST",
// headers:{
// Accept:"application/json",
// "Content-Type":"application-json"   
// },
// body:JSON.stringify(user)

// }).then(response => response.json())
// .catch(e => console.log(e));
// }

export const googleLogin = user => {
    console.log(user);
return fetch(`${API}/signinwithgoogle`,{
    method:"POST",
    headers:{
        Accept:'application/json',
        "Content-Type":"application/json"
    },
    body:JSON.stringify(user)
})
.then(response => {
return response.json();
})
.catch(err => console.log(err))
}

export const getSearchItem = item => {
    console.log(item);
return fetch(`${API}/product/${item}`,{
    method:"GET",
    // headers:{
    //     Accept:'application/json',
    //     "Content-Type":"application/json"
    // },
    // body:JSON.stringify(item)
})
.then(response => {
return response.json();
})
.catch(err => console.log(err))
}