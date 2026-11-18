const $=id=>document.getElementById(id);const colors=['#ff6b87','#ffb347','#ffe66d','#7cdb9b','#6bc8ff','#b49aff','#ffffff'];let color=colors[0],kind='rabbit',history=[],paints={rabbit:{},butterfly:{},car:{},train:{},bus:{},firetruck:{},airplane:{}},song=0,playing=false,ctx=null,notesTimer=null,step=0,installEvent=null;const shapes={
rabbit:`<g class="moving bounce"><ellipse class="paint" data-part="body" cx="195" cy="260" rx="86" ry="65" fill="#fff"/><ellipse class="paint" data-part="ear1" cx="145" cy="95" rx="32" ry="77" transform="rotate(-14 145 95)" fill="#fff"/><ellipse class="paint" data-part="ear2" cx="246" cy="95" rx="32" ry="77" transform="rotate(14 246 95)" fill="#fff"/><ellipse class="paint" data-part="head" cx="196" cy="172" rx="92" ry="83" fill="#fff"/><ellipse class="paint" data-part="cheek1" cx="147" cy="198" rx="21" ry="14" fill="#fff"/><ellipse class="paint" data-part="cheek2" cx="245" cy="198" rx="21" ry="14" fill="#fff"/><circle cx="163" cy="164" r="7" fill="#514658"/><circle cx="228" cy="164" r="7" fill="#514658"/><path class="line" d="M190 190q7 8 14 0m-7 8v8m0 0q-11 12-20 0m20 0q11 12 20 0"/><ellipse class="paint" data-part="foot1" cx="147" cy="313" rx="37" ry="20" fill="#fff"/><ellipse class="paint" data-part="foot2" cx="250" cy="313" rx="37" ry="20" fill="#fff"/></g>`,
butterfly:`<g class="moving flutter"><ellipse class="paint" data-part="wing1" cx="118" cy="137" rx="87" ry="83" transform="rotate(-26 118 137)" fill="#fff"/><ellipse class="paint" data-part="wing2" cx="282" cy="137" rx="87" ry="83" transform="rotate(26 282 137)" fill="#fff"/><ellipse class="paint" data-part="wing3" cx="125" cy="249" rx="69" ry="67" transform="rotate(22 125 249)" fill="#fff"/><ellipse class="paint" data-part="wing4" cx="275" cy="249" rx="69" ry="67" transform="rotate(-22 275 249)" fill="#fff"/><ellipse class="paint" data-part="body" cx="200" cy="185" rx="24" ry="111" fill="#fff"/><circle cx="193" cy="129" r="4" fill="#554a58"/><circle cx="208" cy="129" r="4" fill="#554a58"/><path class="line" d="M198 139q5 6 10 0M195 76q-35-35-41-48m52 48q35-35 41-48"/></g>`,
car:`<g class="moving drive"><path class="paint" data-part="body" d="M45 208Q45 183 74 182H98L132 119Q144 104 161 104H267Q282 104 294 124L329 182H348Q368 182 368 210V271H45Z" fill="#fff"/><path class="paint" data-part="window1" d="M146 131H201V182H118Z" fill="#fff"/><path class="paint" data-part="window2" d="M215 131H265L303 182H215Z" fill="#fff"/><circle class="paint" data-part="wheel1" cx="120" cy="270" r="39" fill="#fff"/><circle class="paint" data-part="wheel2" cx="292" cy="270" r="39" fill="#fff"/><circle cx="120" cy="270" r="15" fill="#554a58"/><circle cx="292" cy="270" r="15" fill="#554a58"/><path class="line" d="M54 218H79M335 218H359"/></g>`};

// Extra big, easy-to-color vehicle illustrations.
shapes.train=`<g class="moving drive"><rect class="paint" data-part="carriage" x="45" y="105" width="310" height="162" rx="32" fill="#fff"/><rect class="paint" data-part="roof" x="77" y="75" width="245" height="39" rx="15" fill="#fff"/><rect class="paint" data-part="window1" x="75" y="134" width="67" height="70" rx="13" fill="#fff"/><rect class="paint" data-part="window2" x="166" y="134" width="67" height="70" rx="13" fill="#fff"/><rect class="paint" data-part="window3" x="257" y="134" width="67" height="70" rx="13" fill="#fff"/><rect class="paint" data-part="stripe" x="58" y="221" width="283" height="27" rx="8" fill="#fff"/><circle class="paint" data-part="wheel1" cx="110" cy="281" r="29" fill="#fff"/><circle class="paint" data-part="wheel2" cx="289" cy="281" r="29" fill="#fff"/><path class="line" d="M55 318H350M55 335H350"/></g>`;
shapes.bus=`<g class="moving drive"><rect class="paint" data-part="body" x="35" y="100" width="330" height="170" rx="28" fill="#fff"/><rect class="paint" data-part="window1" x="60" y="126" width="78" height="77" rx="12" fill="#fff"/><rect class="paint" data-part="window2" x="155" y="126" width="78" height="77" rx="12" fill="#fff"/><rect class="paint" data-part="door" x="250" y="126" width="88" height="124" rx="9" fill="#fff"/><rect class="paint" data-part="stripe" x="53" y="218" width="182" height="26" rx="7" fill="#fff"/><circle class="paint" data-part="wheel1" cx="105" cy="276" r="34" fill="#fff"/><circle class="paint" data-part="wheel2" cx="294" cy="276" r="34" fill="#fff"/></g>`;
shapes.firetruck=`<g class="moving drive"><rect class="paint" data-part="back" x="35" y="145" width="205" height="126" rx="17" fill="#fff"/><path class="paint" data-part="front" d="M240 169H306L360 213V271H240Z" fill="#fff"/><rect class="paint" data-part="window" x="265" y="184" width="50" height="47" rx="7" fill="#fff"/><rect class="paint" data-part="ladder" x="70" y="103" width="184" height="29" rx="7" fill="#fff"/><path class="line" d="M100 103V132M135 103V132M170 103V132M205 103V132"/><rect class="paint" data-part="light" x="176" y="121" width="45" height="24" rx="8" fill="#fff"/><circle class="paint" data-part="wheel1" cx="111" cy="274" r="35" fill="#fff"/><circle class="paint" data-part="wheel2" cx="302" cy="274" r="35" fill="#fff"/></g>`;
shapes.airplane=`<g class="moving flutter"><path class="paint" data-part="body" d="M45 174Q45 153 79 153H312Q365 153 372 181Q365 206 312 206H79Q45 206 45 174Z" fill="#fff"/><path class="paint" data-part="wing1" d="M169 158L204 58Q215 40 236 58L258 158Z" fill="#fff"/><path class="paint" data-part="wing2" d="M168 202L205 305Q215 321 237 303L258 202Z" fill="#fff"/><path class="paint" data-part="tail" d="M90 155L63 105Q56 95 45 105L47 173Z" fill="#fff"/><circle class="paint" data-part="window1" cx="285" cy="179" r="13" fill="#fff"/><circle class="paint" data-part="window2" cx="322" cy="179" r="13" fill="#fff"/></g>`;
const songs=[
{name:'🎵 반짝 산책',category:'동요풍',bpm:330,notes:[262,330,392,330,349,294,262,0,294,349,440,349,392,330,262,0]},
{name:'🐰 토끼 발걸음',category:'동요풍',bpm:260,notes:[392,392,440,392,330,330,294,0,349,349,392,349,294,262,262,0]},
{name:'🌈 무지개 여행',category:'동요풍',bpm:350,notes:[262,294,330,392,440,392,330,294,262,330,392,523,440,392,330,262]},
{name:'🚂 기차 소풍',category:'동요풍',bpm:290,notes:[330,392,440,392,330,294,262,294,330,392,523,440,392,330,294,262]},
{name:'🚗 자동차 여행',category:'동요풍',bpm:300,notes:[262,330,392,523,392,330,294,349,440,392,330,294,262,294,330,0]},
{name:'☁️ 구름 위 산책',category:'집중 배경음',bpm:1000,notes:[262,330,392,523,392,330,294,349],ambient:true},
{name:'🌙 조용한 별빛',category:'집중 배경음',bpm:1300,notes:[220,330,440,330,247,370,494,370],ambient:true},
{name:'🌿 숲속 쉼표',category:'집중 배경음',bpm:1100,notes:[196,294,392,294,220,330,440,330],ambient:true}
];function render(){const svg=$('art');svg.innerHTML=shapes[kind]+'<g id="drawLayer"></g><rect id="drawHit" x="0" y="0" width="400" height="360" fill="transparent" style="pointer-events:none"/>';restoreLines();svg.querySelectorAll('.paint').forEach(el=>{const part=el.dataset.part;if(paints[kind][part])el.setAttribute('fill',paints[kind][part])});$('canvasbox').classList.remove('playing');$('animate').textContent='▶ 움직여!';document.querySelectorAll('[data-art]').forEach(b=>b.classList.toggle('selected',b.dataset.art===kind));const current=document.querySelector('[data-art="'+kind+'"]');if(current)$('pictureName').textContent=current.textContent;if(typeof drawMode!=='undefined')modeUI();}function palette(){colors.forEach(c=>{const b=document.createElement('button');b.className='color'+(color===c?' selected':'');b.style.background=c;b.setAttribute('aria-label','색상 선택');b.onclick=()=>{color=c;document.querySelectorAll('.color').forEach(x=>x.classList.remove('selected'));b.classList.add('selected')};$('palette').appendChild(b)})}palette();document.querySelector('.choose').onclick=e=>{const b=e.target.closest('[data-art]');if(b){kind=b.dataset.art;history=[];render();if(typeof courseActive!=='undefined'&&courseActive)closeCourse()}};$('art').addEventListener('click',e=>{const el=e.target.closest('.paint');if(!el)return;if(drawMode)return;const part=el.dataset.part;history.push({kind,part,old:paints[kind][part]});paints[kind][part]=color;el.setAttribute('fill',color);$('message').textContent='우와! 정말 예쁘다! 🌟'});$('undo').onclick=()=>{if(drawMode&&strokes[kind].length){strokes[kind].pop();render();return}const h=history.pop();if(!h)return;paints[h.kind][h.part]=h.old;if(kind===h.kind)render()};$('clear').onclick=()=>{paints[kind]={};strokes[kind]=[];history=[];render();$('message').textContent='새 그림을 색칠해 보자!'};$('animate').onclick=()=>{const active=$('canvasbox').classList.toggle('playing');$('animate').textContent=active?'⏸ 멈추기':'▶ 움직여!';$('message').textContent=active?'내 그림이 움직여요! 🎉':'색칠하고 또 움직여 보자!'};let musicVolume=.32;function tone(freq,time,ambient=false,voice='lead',length=null){if(!freq||!ctx)return;const osc=ctx.createOscillator(),gain=ctx.createGain();osc.type=ambient?'sine':voice==='bass'?'sine':voice==='harmony'?'sine':'triangle';osc.frequency.value=freq;const duration=length||(ambient?1.7:voice==='bass'?.68:.28);const peak=(ambient?.023:voice==='bass'?.035:voice==='harmony'?.025:.085)*musicVolume;gain.gain.setValueAtTime(.0001,time);gain.gain.linearRampToValueAtTime(peak,time+(ambient?.35:.025));gain.gain.exponentialRampToValueAtTime(.0001,time+duration);osc.connect(gain).connect(ctx.destination);osc.start(time);osc.stop(time+duration+.02)}function tick(){if(!playing||!ctx)return;const track=songs[song],n=step%track.notes.length,t=ctx.currentTime+.035;const root=track.ambient?track.notes[Math.floor(step/4)*4%track.notes.length]:[262,220,196,247][Math.floor(step/4)%4];tone(track.notes[n],t,!!track.ambient);if(step%4===0){tone(root/2,t,!!track.ambient,'bass',track.ambient?2.4:.8);tone(root*1.5,t+.04,!!track.ambient,'harmony',track.ambient?2.1:.7)}if(!track.ambient&&step%2===0){tone(root*2,t+.12,false,'harmony',.13)}step++}function stop(){playing=false;clearInterval(notesTimer);notesTimer=null;$('playMusic').textContent='▶ 음악'}function start(){try{ctx=ctx||new(window.AudioContext||window.webkitAudioContext)();ctx.resume();playing=true;step=0;tick();notesTimer=setInterval(tick,songs[song].bpm);$('playMusic').textContent='⏸ 음악'}catch{$('message').textContent='이 기기에서 음악을 재생할 수 없어요.'}}$('playMusic').onclick=()=>playing?stop():start();function switchSong(d){const was=playing;stop();song=(song+d+songs.length)%songs.length;$('songName').textContent=songs[song].name;$('musicCategory').textContent=songs[song].category;if(was)start()}$('prevSong').onclick=()=>switchSong(-1);$('nextSong').onclick=()=>switchSong(1);window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();installEvent=e});$('install').onclick=async()=>{if(installEvent){installEvent.prompt();installEvent=null}else alert('브라우저 메뉴에서 홈 화면에 추가를 선택해 주세요. 삼성 인터넷: 메뉴 → 현재 페이지 추가 → 홈 화면')};document.addEventListener('visibilitychange',()=>{if(document.hidden)stop()});

// Finger and S Pen free drawing: SVG paths keep coordinates aligned on every screen.
let drawMode=false,activePointer=null,activeStroke=null;
const strokes={rabbit:[],butterfly:[],car:[],train:[],bus:[],firetruck:[],airplane:[]};
function restoreLines(){const layer=$('drawLayer');if(!layer)return;layer.innerHTML='';for(const stroke of strokes[kind]){const path=document.createElementNS('http://www.w3.org/2000/svg','path');path.setAttribute('d',stroke.d);path.setAttribute('fill','none');path.setAttribute('stroke',stroke.color);path.setAttribute('stroke-width','13');path.setAttribute('stroke-linecap','round');path.setAttribute('stroke-linejoin','round');layer.appendChild(path)}}
function modeUI(){document.querySelectorAll('[data-mode]').forEach(b=>{b.classList.toggle('selected',b.dataset.mode===(drawMode?'draw':'fill'))});$('drawHit').style.pointerEvents=drawMode?'all':'none';$('art').style.touchAction=drawMode?'none':'manipulation';$('message').textContent=drawMode?'손가락으로 쓱쓱 색칠해 봐! 🖍️':'그림을 콕 누르면 색이 채워져! 🪣'}
document.querySelectorAll('[data-mode]').forEach(b=>b.onclick=()=>{drawMode=b.dataset.mode==='draw';render();modeUI()});
const point=e=>{const p=$('art').createSVGPoint();p.x=e.clientX;p.y=e.clientY;const m=$('art').getScreenCTM();if(!m)return null;const q=p.matrixTransform(m.inverse());return {x:Math.max(0,Math.min(400,q.x)),y:Math.max(0,Math.min(360,q.y))}};
$('art').addEventListener('pointerdown',e=>{if(!drawMode||e.target.id!=='drawHit')return;e.preventDefault();const p=point(e);if(!p)return;activePointer=e.pointerId;activeStroke={color,d:'M'+p.x.toFixed(1)+' '+p.y.toFixed(1)+' l0.1 0.1'};strokes[kind].push(activeStroke);$('art').setPointerCapture(e.pointerId);restoreLines()});
$('art').addEventListener('pointermove',e=>{if(!drawMode||activePointer!==e.pointerId||!activeStroke)return;e.preventDefault();const p=point(e);if(!p)return;activeStroke.d+=' L'+p.x.toFixed(1)+' '+p.y.toFixed(1);restoreLines()});
function finishStroke(e){if(activePointer===e.pointerId){activePointer=null;activeStroke=null}}
$('art').addEventListener('pointerup',finishStroke);$('art').addEventListener('pointercancel',finishStroke);
render();

/* Age-adaptive, ad-free learning games. All questions are local and require no accounts. */
let age=3,questionNumber=0,currentQuestion=null;
try{const a=Number(localStorage.getItem('gongbu_age'));if([3,5,6].includes(a))age=a}catch{}
const objects=[['rabbit','🐰','토끼'],['butterfly','🦋','나비'],['car','🚗','자동차'],['train','🚆','기차'],['bus','🚌','버스'],['firetruck','🚒','소방차'],['airplane','✈️','비행기']];
const colorNames=[['빨간색','🔴'],['노란색','🟡'],['파란색','🔵'],['초록색','🟢'],['보라색','🟣'],['주황색','🟠']];
function questionBank(){
 if(age===3)return [
 ...colorNames.map(([name,emoji],i)=>({prompt:name+'을 찾아봐!',choices:[emoji,colorNames[(i+2)%6][1],colorNames[(i+4)%6][1]],answer:emoji})),
 ...objects.slice(0,5).map(([k,e,n],i)=>({prompt:n+'는 어디 있을까?',choices:[e,objects[(i+2)%7][1],objects[(i+4)%7][1]],answer:e}))
 ];
 if(age===5)return [
 ...objects.map(([k,e,n],i)=>({prompt:n+'를 골라봐!',choices:[e,objects[(i+2)%7][1],objects[(i+4)%7][1]],answer:e})),
 ...[1,2,3,4,5].map(n=>({prompt:'별이 '+n+'개인 것은?',choices:['⭐'.repeat(n),'⭐'.repeat(n===5?2:n+1),'⭐'.repeat(n===1?3:n-1)],answer:'⭐'.repeat(n)})),
 ...[['동그라미','🔴','🟦','🔺'],['세모','🔺','🔴','🟦'],['네모','🟦','🔺','🔴']].map(x=>({prompt:x[0]+'를 찾아봐!',choices:x.slice(1),answer:x[1]}))
 ];
 return [
 ...[1,2,3,4,5].map(n=>({prompt:n+' + 1 = ?',choices:[String(n+1),String(n),String(n+2)],answer:String(n+1)})),
 ...[2,3,4,5,6].map(n=>({prompt:n+' - 1 = ?',choices:[String(n-1),String(n),String(n-2)],answer:String(n-1)})),
 ...objects.map(([k,e,n],i)=>({prompt:e+' 이름은 무엇일까?',choices:[n,objects[(i+2)%7][2],objects[(i+4)%7][2]],answer:n}))
 ];
}
function newQuestion(){const bank=questionBank();currentQuestion=bank[questionNumber%bank.length];questionNumber++;$('learningTitle').textContent=age===3?'🐣 색깔·그림 놀이':age===5?'🌱 숫자·모양 놀이':'⭐ 생각하는 놀이';$('learningPrompt').textContent=currentQuestion.prompt;$('learningResult').textContent='';const choices=[...currentQuestion.choices];const rotation=questionNumber%choices.length;choices.push(...choices.splice(0,rotation));$('learningChoices').innerHTML='';for(const answer of choices){const b=document.createElement('button');b.textContent=answer;b.onclick=()=>{if(answer===currentQuestion.answer){$('learningResult').textContent='정답! 참 잘했어! 🎉';$('message').textContent='최고야! 🌟'}else{$('learningResult').textContent='다시 한번 골라볼까? 💛'}};$('learningChoices').appendChild(b)}}
document.querySelectorAll('[data-age]').forEach(b=>b.onclick=()=>{age=Number(b.dataset.age);questionNumber=0;try{localStorage.setItem('gongbu_age',String(age))}catch{}document.querySelectorAll('[data-age]').forEach(x=>x.classList.toggle('selected',Number(x.dataset.age)===age));newQuestion()});
document.querySelectorAll('[data-age]').forEach(x=>x.classList.toggle('selected',Number(x.dataset.age)===age));
$('newQuestion').onclick=newQuestion;newQuestion();

// Calm default volume; parent-adjustable volume without external audio downloads.
$('musicVolume').addEventListener('input',e=>{musicVolume=Number(e.target.value)/100});
$('musicCategory').textContent=songs[song].category;

// Simple next/previous picture controls within reach of the coloring area.
const pictureOrder=['rabbit','butterfly','car','train','bus','firetruck','airplane'];function changePicture(delta){const i=pictureOrder.indexOf(kind);kind=pictureOrder[(i+delta+pictureOrder.length)%pictureOrder.length];history=[];render();modeUI()}
$('prevArt').onclick=()=>changePicture(-1);$('nextArt').onclick=()=>changePicture(1);

/* Guided prewriting course: road tracing -> coloring -> movement -> Hangul tracing.
   All artwork and strokes remain local. The child can retry without failure scoring. */
let courseActive=false,coursePhase=0,courseKind='train',courseStroke=null,coursePointer=null;
const courseLabels=['길 따라가기','그림 색칠하기','움직여 보기','글자 따라 쓰기'];
const courseWords={train:'기차',car:'자동차'};
const coursePaths={
 train:'M35 270 C100 270 105 120 185 120 S290 270 365 175',
 car:'M30 250 C80 250 105 140 180 180 S290 300 370 150'
};
function courseSvgBase(){return $('courseSvg')}
function courseText(){return courseWords[courseKind]}
function closeCourse(){courseActive=false;$('courseStatus').hidden=true;$('courseControls').hidden=true;$('courseOverlay').hidden=true;$('startCourse').textContent='✏️ 따라 배우기';$('message').textContent='다른 그림도 색칠해 보자!'}
function courseDrawGuide(){
 const svg=courseSvgBase();svg.innerHTML='';courseStroke=null;
 if(coursePhase===0){
 const path=document.createElementNS('http://www.w3.org/2000/svg','path');path.setAttribute('d',coursePaths[courseKind]);path.setAttribute('stroke','#f6c45e');path.setAttribute('stroke-width','36');path.setAttribute('fill','none');path.setAttribute('stroke-linecap','round');svg.appendChild(path);
 const dashed=path.cloneNode();dashed.setAttribute('stroke','#fff');dashed.setAttribute('stroke-width','5');dashed.setAttribute('stroke-dasharray','12 12');svg.appendChild(dashed);
 svg.insertAdjacentHTML('beforeend','<text x="30" y="230" font-size="34">🏁</text><text x="340" y="125" font-size="34">⭐</text>');
 $('courseHint').textContent=courseKind==='train'?'🚂 손가락이나 펜으로 기찻길을 따라가요!':'🚗 자동차가 가는 길을 따라가요!';
 }else if(coursePhase===3){
 const word=courseText();const letters=[...word];const size=letters.length===2?118:90;const start=letters.length===2?80:45;
 letters.forEach((letter,i)=>{const t=document.createElementNS('http://www.w3.org/2000/svg','text');t.textContent=letter;t.setAttribute('x',String(start+i*(size+4)));t.setAttribute('y','224');t.setAttribute('font-size',String(size));t.setAttribute('font-weight','900');t.setAttribute('fill','#fff');t.setAttribute('stroke','#9db5cf');t.setAttribute('stroke-width','2.3');t.setAttribute('stroke-dasharray','5 4');t.setAttribute('paint-order','stroke');svg.appendChild(t)});
 $('courseHint').textContent='✏️ '+word+' — 큰 글자를 따라 써 봐요!';
 }
}
function courseShow(){
 $('courseStatus').hidden=false;$('courseControls').hidden=false;$('courseTitle').textContent=courseKind==='train'?'🚂 기차 놀이':'🚗 자동차 놀이';$('courseStep').textContent=(coursePhase+1)+' / 4 · '+courseLabels[coursePhase];
 $('courseNext').textContent=coursePhase===3?'🎉 완료':'다음 단계 ▶';
 $('courseOverlay').hidden=coursePhase===0||coursePhase===3;
 if(!$('courseOverlay').hidden)courseDrawGuide();
 if(coursePhase===1){$('courseOverlay').hidden=true;$('courseHint').textContent='';drawMode=false;modeUI();$('message').textContent='🎨 기차나 자동차를 원하는 색으로 칠해요!'}
 if(coursePhase===2){$('courseOverlay').hidden=true;$('canvasbox').classList.add('playing');$('animate').textContent='⏸ 멈추기';$('message').textContent='🎉 그림이 움직여요!'}
 if(coursePhase===0||coursePhase===3){$('courseOverlay').hidden=false;$('canvasbox').classList.remove('playing');courseDrawGuide();$('message').textContent='선을 따라 그려봐요!'}
}
function beginCourse(){courseKind=kind==='car'?'car':'train';if(kind!==courseKind){kind=courseKind;render()}courseActive=true;coursePhase=0;$('startCourse').textContent='✏️ 학습 중';$('courseStatus').hidden=false;$('courseOverlay').hidden=false;$('courseControls').hidden=false;courseShow();$('message').textContent='🚂 첫 번째 미션! 길을 따라 선을 그려봐요.'}
$('startCourse').addEventListener('click',beginCourse);$('closeCourse').onclick=closeCourse;
$('courseNext').onclick=()=>{if(!courseActive)return;if(coursePhase===3){closeCourse();$('message').textContent='🌟 모든 놀이를 끝냈어요! 정말 잘했어요!';return}coursePhase++;courseShow()};
$('courseRetry').onclick=()=>{if(coursePhase===1){paints[kind]={};strokes[kind]=[];render()}if(coursePhase===2){$('canvasbox').classList.remove('playing')}courseShow()};
function coursePoint(e){const svg=courseSvgBase();const rect=svg.getBoundingClientRect();if(!rect.width||!rect.height)return null;const x=(e.clientX-rect.left)*400/rect.width,y=(e.clientY-rect.top)*360/rect.height;return{x:Math.max(0,Math.min(400,x)),y:Math.max(0,Math.min(360,y))}}
function coursePaint(e,first){if(!courseActive||!(coursePhase===0||coursePhase===3))return;const p=coursePoint(e);if(!p)return;e.preventDefault();if(first){courseStroke=document.createElementNS('http://www.w3.org/2000/svg','path');courseStroke.setAttribute('fill','none');courseStroke.setAttribute('stroke','#568fe2');courseStroke.setAttribute('stroke-width','12');courseStroke.setAttribute('stroke-linecap','round');courseStroke.setAttribute('stroke-linejoin','round');courseStroke.setAttribute('d','M'+p.x+' '+p.y);courseSvgBase().appendChild(courseStroke)}else if(courseStroke){courseStroke.setAttribute('d',courseStroke.getAttribute('d')+' L'+p.x+' '+p.y)}}
$('courseSvg').addEventListener('pointerdown',e=>{coursePointer=e.pointerId;coursePaint(e,true);$('courseSvg').setPointerCapture(e.pointerId)});
$('courseSvg').addEventListener('pointermove',e=>{if(coursePointer===e.pointerId)coursePaint(e,false)});
for(const event of ['pointerup','pointercancel'])$('courseSvg').addEventListener(event,e=>{if(coursePointer===e.pointerId){coursePointer=null;courseStroke=null}});

// Make the course entry resilient to taps on nested elements and PWA updates.
document.querySelector('.right-panel').addEventListener('click',e=>{if(e.target.closest('#startCourse')&&!courseActive){beginCourse()}});
