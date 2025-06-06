import { trimStr } from "./utils.js";

let users = [];

const findUser = (user)=>{
    const userName = trimStr(user.name);
    const userRoom = trimStr(user.room);

    return users.find(
        (u)=> trimStr(u.name)===userName&&trimStr(u.room)===userRoom);
    
}

 const addUser = (user) => {
    
    const isExist = findUser(user);

    !isExist && users.push(user);

    const currentUser = isExist || user;

    return { isExist: !!isExist, user: currentUser };
};
export {addUser, findUser};
