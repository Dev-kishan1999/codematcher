// export const setEmail = (payload) =>{
//     localStorage.setItem("email",payload.email)
// }

// export const getEmail = (payload) =>{
//     return localStorage.getItem("email")
// }

export const setUserSub = (payload) =>{
    localStorage.setItem("usersub",payload.sub);
}

export const getUserSub = (payload) =>{
    return localStorage.getItem("usersub");
}