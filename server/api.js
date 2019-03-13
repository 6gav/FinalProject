const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccount.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://temp-sim-database.firebaseio.com',
});

var auth = admin.auth();

module.exports = {
    


    registerUser: function(user){
        console.log(user);
        
        auth.createUser({
            email: user.email,
            password: user.password,
            displayName: user.username
        });

    },


    loginUser: function(user){
        console.log(user);

    }

}