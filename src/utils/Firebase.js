const firebase = require('firebase');
require('firebase/firestore');

export class Firebase{

    constructor(){

        this._config = {
            apiKey: "AIzaSyAL-EuzKHhLhlfh7tBn040NTaKITqxCSaQ",
            authDomain: "whatsapp-clone-cfa9c.firebaseapp.com",
            databaseURL: "https://whatsapp-clone-cfa9c.firebaseio.com",
            projectId: "whatsapp-clone-cfa9c",
            storageBucket: "gs://whatsapp-clone-cfa9c.appspot.com",
            messagingSenderId: "471779378851",
            appId: "1:471779378851:web:75e0a20e9241a540"
        };

        this.init();

    }

    init(){
        if(!window._initializedFirebase){
            // Initialize Firebase
            firebase.initializeApp(this._config);
            window._initializedFirebase = true;
        }
        
    }

    static db(){
        return firebase.firestore();
    }

    static hd(){
        return firebase.storage();
    }

    initAuth(){
        return new Promise((s, f)=>{
            let provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider).then(result=>{
                let token = result.credential.accessToken;
                let user = result.user;
                s({
                    user, 
                    token
                });
            }).catch(err=>{
                f(err);
            });
        });
    }

}