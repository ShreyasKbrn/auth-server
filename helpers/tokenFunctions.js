const crypto = require("crypto");
const saltRounds = 10;

const salt = 'password';

let encrypt = (data) => {
    var cipher = crypto.createCipher('aes-256-ctr',salt)
    var crypted = cipher.update(data,'utf8','hex')
    crypted += cipher.final('hex');
    return crypted;
}

let decrypt = (cipher) => {
    var decipher = crypto.createDecipher('aes-256-ctr', salt)
    var dec = decipher.update(cipher,'hex','utf8')
    dec += decipher.final('utf8');
    return dec;
}

let generateToken = (user) => {
    //new Date()*1+user.email
    return encrypt(new Date()*1+user.email);
}

let addTokenToTokenPool = (token, tokenPool) => {
    return tokenPool.push(token);
}

let removeTokenFromTokenPool = (token, tokenPool) => {
    return tokenPool.splice( tokenPool.indexOf(token), 1 );
}

let isTokenInPool = (token, tokenPool) => {
    if (tokenPool.indexOf(token) > 0 ) {
        return true;
    } else return false;
}

let getEmailFromCipher = (token) => {
    let decrypted = decrypt(token);
    return decrypted.substring(13); 
}


module.exports = {
    generateToken,
    addTokenToTokenPool,
    removeTokenFromTokenPool,
    isTokenInPool,
    getEmailFromCipher
}
//console.log(getEmailFromCipher(encrypt(new Date()*1+"shreyaskbrn6@gmail.com")));

//console.log( createTokenString({email: 's@k.c', id: 7}) === createTokenString({email: 's@k.c', id: 7}));