
var pi = Math.PI
class Obj{
	constructor(props){
        // super(props);
        this.weight = 0;//props.weight||0
        this.color = "RED"//props.color||''
    }
    getColor(){
        return "RED"
    }
}
export const Apple = Obj;