
      import playAnswer,{genRandomNotes} from "./playAnswer.js";

      
      const canvas = document.getElementById('output');

      const { Renderer, Stave, StaveNote, Accidental, GraceNote, GraceNoteGroup, Voice, Formatter, Beam, Stem } =
        Vex.Flow;

      let rightAnswer = [];
      let yourAnswer=['','','','']

      const TIME4_4 = {
        num_beats: 4,
        beat_value: 4,
        resolution: Vex.Flow.RESOLUTION,
      };
      // return;

      function note(params) {
        if(params.keys==undefined){
          // c4/8
          let noteStr = params;
          let temp = noteStr.split("/");
          let duration = temp[1]
          let scaleKeys = temp[0].substring(0,1)+"/"+temp[0].substring(1,2);
          params = {
            keys: [scaleKeys],
            duration: duration
          }
        }
        return new StaveNote(params);
      }
      //----随机产生音符🎵，并记录首字母作为答案
      function staveNotes(){
        const renderer = new Renderer(canvas, Renderer.Backends.CANVAS);
        const context = renderer.getContext();
        const clientWidth = document.body.clientWidth
        renderer.resize(clientWidth, 210);
        // Create and draw the tablature stave
        const stave = new Stave(10, 40, clientWidth - 20);
        stave.addClef('treble').addTimeSignature('4/4');
        stave.setContext(context).draw();

      
        const notesA = [];
        for(let i=0;i<4;i++){
          const noteString = genRandomNotes(1)[0];
          notesA.push(note(noteString));
          rightAnswer[i] = (noteString.substring(0,1));
        }
        //4拍分小结
        const barCount = Math.ceil(notesA.length / 4);//节拍数
        for(let i =0;i<barCount;i++){
          let staveOne = null;
          if (i==0){
            staveOne = stave;
          } else {
            staveOne = new Stave((300 + 10)+250*(i-1), 40, 250);
            staveOne.setContext(context).draw();
          }
          const notes2 = notesA.splice(0,4);
          const beams2 = Beam.generateBeams(notes2);
          Formatter.FormatAndDraw(context, staveOne, notes2);
          beams2.forEach(beam => {
            beam.setContext(context).draw();
          });
        }
      }
      //----画五线谱
      staveNotes()
      //----答案显示
      playAnswer(['','','',''], yourAnswer);
      //----响应键盘操作
      let keyDownCount=0;
      document.onkeydown=function({key}){
        if(key=="0"){
            //---再来一题
            yourAnswer=['','','','']
            rightAnswer=['','','','']
            //----画五线谱
            staveNotes()
            //---
            playAnswer(['','','',''], yourAnswer);
            keyDownCount=0
            return;
        }
        //------其它，输入的答案，显示出来
        if(keyDownCount<4){
            yourAnswer[keyDownCount] = (key.toUpperCase());
            playAnswer(['','','',''], yourAnswer);
        }
        keyDownCount++
        //-----
        if(keyDownCount>=4){
            //---答题结束，显示答案
            playAnswer(rightAnswer, yourAnswer);

        }
    }
var parentNode = document.querySelector('.div-answer-selector')
var slibNodes = parentNode.children;
for(let i=0;i<slibNodes.length;i++){
    let one = slibNodes[i];
    one.onclick=function(){
      let zimu = this.innerText;
      if(keyDownCount<4){
        yourAnswer[keyDownCount] = (zimu);
        playAnswer(['','','',''], yourAnswer);
      }
      keyDownCount++
      //-----
      if(keyDownCount>=4){
          //---答题结束，显示答案
          playAnswer(rightAnswer, yourAnswer);
      }
    }
}
      