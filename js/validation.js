const a0_0xae8598=a0_0x1b5a;(function(_0x534d3f,_0x50ea65){const _0x30de76=a0_0x1b5a,_0xcc3915=_0x534d3f();while(!![]){try{const _0x12433a=-parseInt(_0x30de76(0x191))/0x1+parseInt(_0x30de76(0x19b))/0x2+parseInt(_0x30de76(0x1a3))/0x3+parseInt(_0x30de76(0x19d))/0x4+parseInt(_0x30de76(0x19c))/0x5*(parseInt(_0x30de76(0x1a0))/0x6)+parseInt(_0x30de76(0x184))/0x7*(-parseInt(_0x30de76(0x182))/0x8)+-parseInt(_0x30de76(0x1a2))/0x9*(parseInt(_0x30de76(0x1a6))/0xa);if(_0x12433a===_0x50ea65)break;else _0xcc3915['push'](_0xcc3915['shift']());}catch(_0x2b65fc){_0xcc3915['push'](_0xcc3915['shift']());}}}(a0_0x2bda,0x5c2dd));const path1='/idCheck.html';sessionStorage[a0_0xae8598(0x185)](a0_0xae8598(0x196)),sessionStorage['removeItem'](a0_0xae8598(0x18c)),sessionStorage[a0_0xae8598(0x185)](a0_0xae8598(0x186));const originalWidth=screen[a0_0xae8598(0x17f)],originalHeight=screen[a0_0xae8598(0x1a1)];function isSplitScreen(){const _0x1fe691=a0_0xae8598;return window['innerWidth']<originalWidth*0.8||window[_0x1fe691(0x198)]<originalHeight*0.8;}function checkSplitScreenBeforeLogin(){return isSplitScreen()&&(alert('Split-screen\x20mode\x20detected.\x20Please\x20exit\x20split-screen\x20to\x20proceed.'),window['location']['reload']()),!![];}document['getElementById'](a0_0xae8598(0x19a))[a0_0xae8598(0x197)]('submit',async _0x9323bd=>{const _0x122ef4=a0_0xae8598;!checkSplitScreenBeforeLogin()&&(_0x9323bd[_0x122ef4(0x1a4)](),window[_0x122ef4(0x19e)]['reload']());_0x9323bd[_0x122ef4(0x1a4)](),showLoader();const _0x61a2f1=document[_0x122ef4(0x18b)](_0x122ef4(0x196))[_0x122ef4(0x18a)][_0x122ef4(0x180)]();sessionStorage[_0x122ef4(0x1aa)]('rollNumber',_0x61a2f1),sessionStorage[_0x122ef4(0x185)](_0x122ef4(0x186)),sessionStorage[_0x122ef4(0x185)]('violation');const _0x83c5e9=document[_0x122ef4(0x18b)](_0x122ef4(0x18e))['value'][_0x122ef4(0x180)]();try{const _0x3cdfa2=await fetch('api/validation',{'method':'POST','headers':{'Content-Type':'application/json'},'body':JSON[_0x122ef4(0x192)]({'rollNumber':_0x61a2f1,'uniqueKey':_0x83c5e9}),'credentials':'include'}),_0x2f75ee=await _0x3cdfa2[_0x122ef4(0x18d)]();_0x3cdfa2['ok']&&_0x2f75ee[_0x122ef4(0x183)]?(sessionStorage['setItem']('name',_0x2f75ee[_0x122ef4(0x18c)]),sessionStorage[_0x122ef4(0x1aa)]('rollNumber',_0x2f75ee['rollNumber']),alert(_0x122ef4(0x1ab)),window[_0x122ef4(0x19e)][_0x122ef4(0x189)]=path1):alert(_0x2f75ee[_0x122ef4(0x199)]||_0x122ef4(0x190));}catch(_0x1966af){console['error'](_0x122ef4(0x1a9),_0x1966af),alert('An\x20error\x20occurred\x20during\x20validation.\x20Please\x20try\x20again\x20later.');}finally{hideLoader();}});function createLoader(){const _0x1b7931=a0_0xae8598;if(!document[_0x1b7931(0x18b)]('loader')){const _0x557f7e=document[_0x1b7931(0x18f)](_0x1b7931(0x193));_0x557f7e['id']=_0x1b7931(0x17e),_0x557f7e['style'][_0x1b7931(0x194)]=_0x1b7931(0x1a5),_0x557f7e[_0x1b7931(0x181)]=_0x1b7931(0x19f),document['body'][_0x1b7931(0x1a7)](_0x557f7e);}}function showLoader(){const _0x368b44=a0_0xae8598;createLoader(),document[_0x368b44(0x18b)](_0x368b44(0x17e))[_0x368b44(0x187)][_0x368b44(0x195)]=_0x368b44(0x1a8);}function hideLoader(){const _0x49abd1=a0_0xae8598,_0xbec20e=document[_0x49abd1(0x18b)](_0x49abd1(0x17e));_0xbec20e&&(_0xbec20e[_0x49abd1(0x187)][_0x49abd1(0x195)]=_0x49abd1(0x188));}function a0_0x1b5a(_0x311f1e,_0x4cf05b){const _0x2bdab7=a0_0x2bda();return a0_0x1b5a=function(_0x1b5aa3,_0x1c9c27){_0x1b5aa3=_0x1b5aa3-0x17e;let _0x2a0835=_0x2bdab7[_0x1b5aa3];return _0x2a0835;},a0_0x1b5a(_0x311f1e,_0x4cf05b);}function a0_0x2bda(){const _0x38a8b0=['\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20Login...\x20Please\x20wait.\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20id=\x22spinner\x22\x20style=\x22\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20border:\x208px\x20solid\x20#6bf3ac;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20border-top:\x208px\x20solid\x20#3498db;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20border-radius:\x2050%;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20width:\x2050px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20height:\x2050px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20animation:\x20spin\x202s\x20linear\x20infinite;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20margin-top:\x2010px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x22></div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<style>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20@keyframes\x20spin\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x200%\x20{\x20transform:\x20rotate(0deg);\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20100%\x20{\x20transform:\x20rotate(360deg);\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</style>\x0a\x20\x20\x20\x20\x20\x20\x20\x20','2687724SiWKho','availHeight','4797HloWfp','944469VQxMbj','preventDefault','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20display:\x20none;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20position:\x20fixed;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20top:\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20left:\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20width:\x20100%;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20height:\x20100%;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20background:\x20rgba(255,\x20255,\x20255,\x200.8);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20display:\x20flex;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20justify-content:\x20center;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20align-items:\x20center;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20flex-direction:\x20column;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20font-size:\x2020px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20font-weight:\x20bold;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20color:\x20#333;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','3460kXiIHJ','appendChild','flex','Error\x20validating\x20student:','setItem','Validation\x20successful!','loader','availWidth','trim','innerHTML','56oiqqWf','success','558019Mixemk','removeItem','validStudent','style','none','href','value','getElementById','name','json','uniqueKey','createElement','Validation\x20failed','239523yZnUHs','stringify','div','cssText','display','rollNumber','addEventListener','innerHeight','message','quizForm','952042fMxZMO','5PXUooo','482908aOQXLN','location'];a0_0x2bda=function(){return _0x38a8b0;};return a0_0x2bda();}