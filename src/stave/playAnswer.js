export default function(rightAnswer, yourAnswer){
    // let yourAnswer =['D','C','D','F'];
    let tdElements = document.getElementsByTagName("td");
    for(let i=0;i<4;i++){
        tdElements[i+1].innerHTML=rightAnswer[i]
    }
    let score=0;
    for(let i=0;i<4;i++){
        let oneSpan=document.createElement("span") ;
        oneSpan.innerText = yourAnswer[i]
        if(yourAnswer[i]==rightAnswer[i]){
            tdElements[i+6].setAttribute("style","background-color:green");
            score+=25;
        } else {
            tdElements[i+6].setAttribute("style","background-color:red");
        }
        tdElements[i+6].innerHTML=''
        tdElements[i+6].appendChild(oneSpan)
        document.getElementById("yourScore").innerText = score +"分"
    }
}
export function hideAnswer(){
    //----不显示
    let tds = document.getElementsByTagName("td");
    for(let i=1;i<5;i++){
        tds[i].innerText = ""
    }
}
export function genRandomNotes(notesCount){
    let notesList = [
        'B', 'A', 'G', 'F', 'E', 'D', 'C'
    ]
    let result = []
    let i = 0
    while (i < notesCount) {
        // 
        let num = notesList.length + 3
        // 音 随机
        let index = Math.ceil(Math.random() * num)
        // 音阶随机 3 4 5
        const scale = Math.ceil(Math.random() * 3)+2;
        // 拍随机 2 4 8 16
        const tmp =  Math.pow(2,Math.round(Math.random()*4 + 1))
        if (index < notesList.length) {
            let note = notesList[index]+scale+"/" + tmp
            result.push(note)
            i++
        } else {
        }
        // i++
    }
    return result
}