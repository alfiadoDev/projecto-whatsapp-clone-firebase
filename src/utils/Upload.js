import { Firebase } from './Firebase';

export class Upload{

    static send(file, from){

        return new Promise((s, f)=>{
            let reference = Firebase.hd().ref(from).child(Date.now() + "_" + file.name);
            let uploadTask = reference.put(file);

            uploadTask.on('state_changed', e=>{
                
            }, err=>{
                f(err);
            },  async ()=>{
                await reference.getDownloadURL().then(url=>{
                    s(url);
                });
            });       
        }); 
    }
}