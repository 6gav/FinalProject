const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccount.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://temp-sim-database.firebaseio.com',
});

var auth = admin.auth();
var db = admin.database().ref();

function registerUser(user, cb){
    if(!user.username || !user.password || !user.email){
        cb({});
        return;
    }

    var error = {};

    auth.createUser({
        email: user.email,
        password: user.password,
        displayName: user.username
    })
    .then(data => {
        var userRef = db.child(data.uid);
        userRef.set({password: user.password, displayName: user.username});
        cb({status: "Ok"});
    })
    .catch(err => {
        cb({error: err.errorInfo});
    });

}

function loginUser(user, cb){
    console.log('Logging in');
    var currentUser = auth.getUserByEmail(user.email)
    .then(res => {
        console.log(res.toJSON());
        db.child(res.uid).once('value', (snapshot)=> {
            var val = snapshot.val();
            console.log(val);
            if(!val){
                cb({statusCode: 404, message: 'User not found!', uid: -1});
                return;
            }

            if(val.password == user.password){
                cb({statusCode: 0, message: 'Login successful', user: {uid: res.uid, displayName: val.displayName, email: res.email}});
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

function setUserCell(){
    
}


module.exports.loginUser = loginUser;

module.exports.registerUser = registerUser;