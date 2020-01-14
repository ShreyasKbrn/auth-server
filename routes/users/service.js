let usersData = require('../../mockData/users');

/*
  { id: 12,
    email: 'rachel.howell@reqres.in',
    first_name: 'Rachel',
    last_name: 'Howell',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/hebertialmeida/128.jpg' }
*/

getUserByEmail = (user) => {
    /**Returns
     * 1. User found {status: 1, userProfile}
     * 2. User not found {status: -1}
     */
    for (let i=0; i<usersData.profiles.length; i++) {
        let { email} = usersData.profiles[i];
        if (email === user.email) {
            return {status: 1, profile: usersData.profiles[i]};
        }
    }
    return {status: -1}
}

validateUserCredentials = (user) => {
    /**RESPONSE
     * 1. Valid credentials {status: 1, profile}
     * 2. Invalid: {status: -1}
     */
    let response = getUserByEmail({email: user.email});
    if (response.status === 1) {
        if (response.profile.id == user.id) {
            return {status: 1, profile: user.profile}
        } else return {status: -1};
    } else {
        return {status: -1}
    }
}

addUser = (userData) => {
    /**Status Codes
     * -1: User with email already exists
     * 1: User added
     */
    let id = new Date()*1;
    let email = userData.email;
    let first_name = userData.first_name;
    let last_name = userData.last_name;
    let avatar = 'https://image.flaticon.com/icons/png/512/21/21294.png'

    if (getUserByEmail({email:email})['status']=== 1) {
        return {status: -1};
    } else {
        let profile = {
            id: id, 
            email: email, 
            first_name: first_name, 
            last_name: last_name,
            avatar
        };
        usersData.profiles.push(profile);
        return {status: 1, profile: profile}
    }
}

getAllUsers = () => {
    return usersData.profiles;
}

module.exports = {getUserByEmail, validateUserCredentials, addUser, getAllUsers}

// console.log(addUser({email: 's@k.c', first_name: 's', last_name: 'k'}))
// console.log(getAllUsers());
//console.log(!!userExists({email: 'hreyaskbrn6@gmail.com', id: 13}));