
const { Renderer, Stave, StaveNote, Accidental, GraceNote, GraceNoteGroup, Voice, Formatter, Beam, Stem } =
    Vex.Flow;
function drawStave(notes){
    const barNo = Math.round(Math.random()*4 + 1 );
    const canvas = document.getElementById('staveCanvas');
    const renderer = new Renderer(canvas, Renderer.Backends.CANVAS);
    renderer.resize(620, 210);
    const context = renderer.getContext();
    const stave = new Stave(10, 40, 300);

    stave.addClef('treble').addTimeSignature(barNo + '/4' );
    stave.setContext(context).draw();
    console.log(notes);
    let notesA=[];
    notes.forEach((one,idx) =>{
        notesA.push(note(one))
    })
    

    setNotes(context, stave, notesA, barNo);

}
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

  function setNotes(context, stave, notesA, barNo){
    const barCount = Math.ceil(notesA.length / barNo);//节拍数
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