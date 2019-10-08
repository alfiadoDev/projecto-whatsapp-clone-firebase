import { Model } from "./Model";
import { Firebase } from "./../utils/Firebase";

export class Chat extends Model{

    constructor(){
        
        super();

    }

    get users() { return this._data.users; }
    set users(value) { this._data.users = value; }

    get timeStamp() { return this._data.timeStamp; }
    set timeStamp(value) { this._data.timeStamp = value; }

    static getRef(){
        return Firebase.db().collection('/chats');
    }

    static find(myEmail, anyEmail){

        return Chat.getRef()
            .where(btoa(myEmail), '==', true)
            .where(btoa(anyEmail), '==', true)
            .get();

    }

    static create(myEmail, anyEmail){

        return new Promise((s, f)=>{
            let users = {};
            let time = new Date();
            users[btoa(myEmail)] = true;
            users[btoa(anyEmail)] = true;
            Chat.getRef().add({
                users,
                timeStamp: time
            }).then(doc=>{
                Chat.getRef().doc(doc.id).get().then(chat=>{
                    s(chat);
                }).catch(err=>{ f(err);});
            }).catch(err=>{ f(err);});
        });

    }

    static createIfNotExist(myEmail, anyEmail){
        return new Promise((s, f)=>{
            Chat.find(myEmail, anyEmail).then(chats=>{
                if(chats.empty){
                    Chat.create(myEmail, anyEmail).then(chat=>{
                        s(chat);
                    });
                }else{
                    chats.forEach(chat=>{
                        s(chat);
                    });
                }
            }).catch(err=>{ f(err); });
        });
    }

}