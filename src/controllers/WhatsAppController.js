class WhatsAppController{

    constructor(){

        console.log("WhatsAppController ok");

        this.elementsPrototypea();
        this.loadElements();

    }

    loadElements(){
        this.el ={};
        document.querySelectorAll('[id]').forEach(element=>{
            this.el[Format.getCamelCase(element.id)] = element;
        });
    }
    /**
     * metodo responsavel por criar funcoes para a classe element
     */
    elementsPrototypea(){

        Element.prototype.hide = function(){
            this.style.display = 'none';
            return this;
        }

        Element.prototype.show = function(){
            this.style.display = 'block';
            return this;
        }

        Element.prototype.toggle = function(){
            this.style.display = (this.style.display === 'none') ? 'block': 'none';
            return this;
        }

        /**
         * @param events recebe os eventos separados por espaco
         * @param fn funcao de callback
         */
        Element.prototype.on = function(events, fn){
            events.split(' ').forEach(event=>{
                this.addEventListener(event, fn);
            });
            return this;
        }
        /**
         * @param styles is object ex: {widyh: '50%', etc}
         */
        Element.prototype.css = function(styles){
            for(name in styles){
                this.style[name] = styles[name];
            }
            return this;
        }

        Element.prototype.addClass = function(name){
            this.classList.add(name);
            return this;
        }

        Element.prototype.removeClass = function(name){
            this.classList.remove(name);
            return this;
        }

        Element.prototype.toggleClass = function(name){
            this.classList.toggle(name);
            return this;
        }

        Element.prototype.hasClass = function(name){
            return this.classList.contains(name);
        }
    }

}