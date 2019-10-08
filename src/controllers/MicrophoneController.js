import { ClassEvent } from "../utils/ClassEvent";

export class MicrophoneController extends ClassEvent{

    constructor(){
        super();

        this._isAvailable = false;

        this._mimeType = 'audio/webm';

        navigator.mediaDevices.getUserMedia({
            audio: true
        }).then(stream=>{
            this._isAvailable = true;

            this._stream = stream;
            
            this.tigger('ready', this._stream);
        }).catch(err=>{
            console.error(err);
        });

    }

    stop(){
        this._stream.getTracks().forEach(track=>{
            track.stop();
        });
    }

    startRecorder(){
        if(this._isAvailable){
            this._mediaRecorder = new MediaRecorder(this._stream, {
                mimeType: this._mimeType
            });
            this._recordedChunks = [];

            this._mediaRecorder.addEventListener('dataavailable', e=>{
                if(e.data.size > 0) this._recordedChunks.push(e.data);
            });
            this._mediaRecorder.addEventListener('stop', e=>{
                let blob = new Blob(this._recordedChunks, {
                    type: this._mimeType
                });
                let fileName = `rec${Date.now()}.webm`;

                let audioContext = new AudioContext();

                let reader = new FileReader();

                reader.onload = e =>{
                    audioContext.decodeAudioData(reader.result).then(decode=>{

                        let file = new File([blob], fileName, {
                            type: this._mimeType,
                            lastModified: Date.now()
                        });
                        this.tigger('recorded', file, decode);

                    });
                    
                    
                }
                reader.readAsArrayBuffer(blob);

                

                /*let fileReader = new FileReader();
                fileReader.onload = e=>{
                    let audio = new Audio(fileReader.result);
                    audio.play();
                }
                fileReader.readAsDataURL(file);*/
            });
            this._mediaRecorder.start();
            this.startTimer();
        }
    }

    stopRecorder(){
        if(this._isAvailable){
            this._mediaRecorder.stop();
            this.stop();
            this.stopTimer();
        }
    }

    startTimer(){
        let start = Date.now();

        this._recordMicrophoneInterval = setInterval(()=>{
            this.tigger('recordtimer', (Date.now() - start));
        },100);
    }

    stopTimer(){
        clearInterval(this._recordMicrophoneInterval);
    }

}