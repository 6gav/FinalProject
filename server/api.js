const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccount.json');
const crypto = require('crypto');


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://temp-sim-database.firebaseio.com',
});

var auth = admin.auth();
var db = admin.database().ref();

module.exports = {


    registerUser: function(user){
        


        auth.createUser({
            email: user.email,
            password: user.password,
            displayName: user.username
        })
        .then(data => {
            var userRef = db.child(data.uid);
            userRef.set({password: user.password, displayName: user.username});
        });


    },


    loginUser: function(user, cb){

        var currentUser = auth.getUserByEmail(user.email)
        .then(res => {
            console.log(res.toJSON());
            db.child(res.uid).once('value', (snapshot)=> {
                var val = snapshot.val();
                if(!val){
                    cb({statusCode: 404, message: 'User not found!'});
                    return;
                }

                if(val.password == user.password){
                    cb({statusCode: 0, message: 'Login successful'});
                    return;
                }

                cb({statusCode: 500, message: 'Password incorrect'});
                

            });
        })
        .catch(res => {
            console.log(res);
            cb({statusCode: 404, message: res.errorInfo.message});
        });
        
    }

}