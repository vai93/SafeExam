const a0_0x515490=a0_0x2d99;function a0_0x2d99(_0x454aab,_0x1cc5b0){const _0x902350=a0_0x9023();return a0_0x2d99=function(_0x2d99ed,_0x4a2f8a){_0x2d99ed=_0x2d99ed-0x76;let _0x29d145=_0x902350[_0x2d99ed];return _0x29d145;},a0_0x2d99(_0x454aab,_0x1cc5b0);}(function(_0x123985,_0x403ab0){const _0x4a953a=a0_0x2d99,_0x2f9316=_0x123985();while(!![]){try{const _0x111c77=parseInt(_0x4a953a(0x8b))/0x1+-parseInt(_0x4a953a(0x81))/0x2*(parseInt(_0x4a953a(0xa2))/0x3)+-parseInt(_0x4a953a(0x9a))/0x4*(-parseInt(_0x4a953a(0x94))/0x5)+parseInt(_0x4a953a(0x9e))/0x6*(-parseInt(_0x4a953a(0x82))/0x7)+parseInt(_0x4a953a(0x80))/0x8+parseInt(_0x4a953a(0x8f))/0x9+-parseInt(_0x4a953a(0x86))/0xa*(parseInt(_0x4a953a(0x89))/0xb);if(_0x111c77===_0x403ab0)break;else _0x2f9316['push'](_0x2f9316['shift']());}catch(_0x49c230){_0x2f9316['push'](_0x2f9316['shift']());}}}(a0_0x9023,0x91ce4));const path1=a0_0x515490(0x92);function a0_0x9023(){const _0x3cc8b7=['rollNumber','15xtFdxm','name','log','quizScore','setItem','forEach','1546484knfhzg','radio','href','No\x20name\x20found','12xNexmT','/idCheck.html','POST','addEventListener','3UJLOAE','preventDefault','style','api/submitQuiz','Internet\x20connection\x20issue.\x20Answers\x20saved\x20locally.\x20Please\x20reconnect\x20and\x20retry.','submit','unsentQuizData','getItem','display','error','application/json','message','1508032ghFsWT','1590958QjQRzB','4092214xyCHqY','checked','getElementById','score','1130840PHKUMx','Error\x20submitting\x20answers:','location','55Kxwjhf','success','1004596INbHAB','removeItem','from','flex','6969240DTSXsx','Error\x20submitting\x20quiz:','stringify','/submit.html'];a0_0x9023=function(){return _0x3cc8b7;};return a0_0x9023();}let path2=a0_0x515490(0x9f);const testId=sessionStorage[a0_0x515490(0x7b)]('testId');let quizSubmitted=![];const quizForm=document[a0_0x515490(0x84)]('quizForm');quizForm[a0_0x515490(0xa1)](a0_0x515490(0x79),async _0x30fbca=>{const _0x458a1a=a0_0x515490;_0x30fbca[_0x458a1a(0xa3)]();if(quizSubmitted){console[_0x458a1a(0x96)]('Quiz\x20already\x20submitted.');return;}quizSubmitted=!![],loader1[_0x458a1a(0x76)][_0x458a1a(0x7c)]=_0x458a1a(0x8e),spinner1[_0x458a1a(0x76)][_0x458a1a(0x7c)]='block';const _0x48bfa6=sessionStorage[_0x458a1a(0x7b)](_0x458a1a(0x93))||'No\x20roll\x20number\x20found',_0x4554c2=sessionStorage[_0x458a1a(0x7b)]('name')||_0x458a1a(0x9d),_0xcfe879=sessionStorage[_0x458a1a(0x7b)]('violation')||![],_0x363fe2=new Date(),_0x42946d={};Array[_0x458a1a(0x8d)](quizForm['elements'])[_0x458a1a(0x99)](_0x15ee5b=>{const _0x105f27=_0x458a1a;_0x15ee5b[_0x105f27(0x95)]&&_0x15ee5b['type']===_0x105f27(0x9b)&&_0x15ee5b[_0x105f27(0x83)]&&(_0x42946d[_0x15ee5b['name']]=_0x15ee5b['value']);}),localStorage[_0x458a1a(0x98)](_0x458a1a(0x7a),JSON[_0x458a1a(0x91)]({'rollNumber':_0x48bfa6,'testId':testId,'answers':_0x42946d,'studentName':_0x4554c2}));try{const _0x349d00=await fetch(_0x458a1a(0x77),{'method':_0x458a1a(0xa0),'headers':{'Content-Type':_0x458a1a(0x7e)},'body':JSON[_0x458a1a(0x91)]({'rollNumber':_0x48bfa6,'testId':testId,'answers':_0x42946d,'violation':_0xcfe879,'studentName':_0x4554c2,'submittedAt':_0x363fe2})}),_0x5c6bd5=await _0x349d00['json']();_0x5c6bd5[_0x458a1a(0x8a)]?(localStorage[_0x458a1a(0x8c)](_0x458a1a(0x7a)),localStorage[_0x458a1a(0x98)](_0x458a1a(0x97),_0x5c6bd5[_0x458a1a(0x85)]),window[_0x458a1a(0x88)]['href']=path1):(console[_0x458a1a(0x7d)](_0x458a1a(0x87),error[_0x458a1a(0x7f)]),alert('Error\x20submitting\x20answers.\x20Please\x20try\x20again.'),window[_0x458a1a(0x88)]['href']=path2);}catch(_0x568f1c){console[_0x458a1a(0x7d)](_0x458a1a(0x90),_0x568f1c),alert(_0x458a1a(0x78)),window['location'][_0x458a1a(0x9c)]=path2;}finally{loader1[_0x458a1a(0x76)][_0x458a1a(0x7c)]='none';}});