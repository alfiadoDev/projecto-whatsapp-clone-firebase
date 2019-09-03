export class Format{
    /**
     * 
     * @param {recebe uma string para transformar em cameCase} text 
     */
    static getCamelCase(text){
        let div = document.createElement('div');

        div.innerHTML = `<div data-${text}="id"></div>`;

        return Object.keys(div.firstChild.dataset)[0];
    }

    static toTime(duration){

        let secounds = parseInt((duration / 1000) % 60);
        let minutes = parseInt((duration / (1000 * 60)) % 60);
        let hours = parseInt((duration / (1000 * 60 * 60)) % 24);

        if(hours > 0){
            return `${hours}:${minutes.toString().padStart(2, '0')}:${secounds.toString().padStart(2, '0')}`;
        }else{
            return `${minutes}:${secounds.toString().padStart(2, '0')}`;
        }
    }

    static dateToTime(date, locale = 'pt-BR'){
        return date.toLocaleTimeString(locale, {
            hours: '2-digit',
            minutes: '2-digit'
        });
    }

    static timeStampToTime(timeStamp){
        return (timeStamp && typeof timeStamp.toDate === 'function') ? Format.dateToTime(timeStamp.toDate()) : '';
    }
}