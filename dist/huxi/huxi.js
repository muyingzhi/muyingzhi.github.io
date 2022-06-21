import myGuage from './huxi-guage.js'
import myList from './huxi-graph.js'

new Vue({
    el: '#app',
    data: function() {
      return { huxi: 100 }
    },
    mounted(){
        let _this = this;
        document.onkeydown=function({key}){
            _this.huxi = key * 100 + Math.random()*100;
            _this.draw();
        }
    },
    methods: {
        doStart(){
            this.huxi = Math.random()*1000+200
            this.draw();
        },
        doClear(){
            myGuage.clean();
            myList.clean();
        },
        draw(){

            myGuage.draw("guage",Math.round(this.huxi));
            myList.draw("list");
        },
        keyevent(){
            console.log(arguments)
        }
    }
})