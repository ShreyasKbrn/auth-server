let usersData = require('../../mockData/users');
let db = require('../../db/conn');
let userModel = require("../../db/models/user_model");

/*
  { id: 12,
    email: 'rachel.howell@reqres.in',
    first_name: 'Rachel',
    last_name: 'Howell',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/hebertialmeida/128.jpg' }
*/

getUserByEmail = async (user) => {
    /**Returns
     * 1. User found {status: 1, userProfile}
     * 2. User not found {status: -1}
     */
    // for (let i=0; i<usersData.profiles.length; i++) {
    //     let { email} = usersData.profiles[i];
    //     if (email === user.email) {
    //         return {status: 1, profile: usersData.profiles[i]};
    //     }
    // }
    // return {status: -1}
    try {
        let doc = await userModel.find({
            email: user.email
        });
        
        if (doc.length === 0) {
            return {status: -1};
        } else {
            return {status: 1, profile: doc[0]};
        }

    } catch (e) {
        console.log(e);
    }

}

validateUserCredentials = (user) => {
    /**RESPONSE
     * 1. Valid credentials {status: 1, profile}
     * 2. Invalid: {status: -1}
     */
    let response = getUserByEmail({email: user.email});
    if (response.status === 1) {
        if (response.profile.id === user.id) {
            return {status: 1, profile: user.profile}
        } else return {status: -1};
    } else {
        return {status: -1}
    }
}

addUser = async (userData) => {
    /**Status Codes
     * -1: User with email already exists
     * 1: User added
     */
    let email = userData.email;
    let first_name = userData.first_name;
    let last_name = userData.last_name;
    let response = await getUserByEmail({email:email});
    if (response['status']=== 1) {
        return {status: -1};
    } else {
        let new_user = new userModel(Object.assign({}, {
            email: email, 
            first_name: first_name, 
            last_name: last_name,
        }));
        try {
            let doc = await new_user.save();
            return {status: 1, profile: doc};
        } catch (e) {
            return {status: -1};
        }
    }
}


let main = async ()=> {
    let usr = await addUser({
        email: 'idk1234567@g.com',
        first_name: 'idk',
        last_name: 'kumar'
    })
    console.log(usr);
}
main();
module.exports = {getUserByEmail, validateUserCredentials, addUser}

// console.log(addUser({email: 's@k.c', first_name: 's', last_name: 'k'}))
// console.log(getAllUsers());
//console.log(!!userExists({email: 'hreyaskbrn6@gmail.com', id: 13}));