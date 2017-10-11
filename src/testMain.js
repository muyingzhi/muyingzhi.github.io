
var Counter = require("./pages/bazi/BzCounter")
var counter = new Counter()

console.log("BZ",counter.count(new Date(),3,5))

var pi = Math.PI
class Apple{
	constructor(props){
        // super(props);
        this.weight = 0;//props.weight||0
        this.color = "RED"//props.color||''
    }
    getColor(){
        return "RED"
    }
}

var apple = new Apple();
console.log(apple.getColor());

var pi2 = Math.sin(45/360*pi*2);
console.log("pi: pai*2 sin");
console.log(pi2)