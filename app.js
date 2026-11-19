const $=id=>document.getElementById(id);const colors=['#ff6b87','#ffb347','#ffe66d','#7cdb9b','#6bc8ff','#b49aff','#ffffff'];let color=colors[0],kind='rabbit',history=[],paints={rabbit:{},butterfly:{},car:{},train:{},bus:{},firetruck:{},airplane:{}},song=0,playing=false,ctx=null,notesTimer=null,step=0,installEvent=null;const shapes={
rabbit:`<g class="moving bounce"><path class="paint" data-part="rabbit" d="M121 130C105 105 93 53 104 31C116 8 142 28 159 63C173 88 177 109 180 122Q196 117 212 122C215 100 221 69 236 42C253 11 278 12 287 34C296 57 279 110 265 135C301 157 322 195 320 236C318 274 297 309 266 322Q238 341 197 339Q157 341 128 323C92 307 75 271 75 234C75 191 92 153 121 130Z" fill="#fff"/><path class="paint" data-part="inner-ear-left" d="M133 113C116 79 112 45 120 41C132 37 153 84 155 119Z" fill="#fff" stroke-width="3"/><path class="paint" data-part="inner-ear-right" d="M237 119C241 85 260 39 272 41C281 44 270 86 254 114Z" fill="#fff" stroke-width="3"/><ellipse class="paint" data-part="belly" cx="197" cy="269" rx="70" ry="49" fill="#fff" stroke-width="3"/><ellipse cx="153" cy="213" rx="20" ry="11" fill="#ffdce4" stroke="none"/><ellipse cx="241" cy="213" rx="20" ry="11" fill="#ffdce4" stroke="none"/><ellipse cx="162" cy="178" rx="7" ry="10" fill="#514658" stroke="none"/><ellipse cx="231" cy="178" rx="7" ry="10" fill="#514658" stroke="none"/><path d="M185 204Q197 215 209 204Q197 199 185 204Z" fill="#ee9da9" stroke="none"/><path class="line" d="M197 213V220M197 220Q183 232 174 219M197 220Q211 232 220 219"/><path class="line" d="M131 202L88 197M132 216L92 224M262 202L305 197M262 216L301 224"/><path class="line" d="M150 325Q159 309 174 316M219 316Q235 309 245 325"/></g>`,
butterfly:`<g class="moving flutter"><path class="paint" data-part="wing1" d="M183 169Q115 55 54 76Q-2 103 48 179Q91 233 183 191Z" fill="#fff"/><path class="paint" data-part="wing2" d="M217 169Q285 55 346 76Q402 103 352 179Q309 233 217 191Z" fill="#fff"/><path class="paint" data-part="wing3" d="M183 202Q102 181 80 246Q66 310 137 310Q174 303 190 234Z" fill="#fff"/><path class="paint" data-part="wing4" d="M217 202Q298 181 320 246Q334 310 263 310Q226 303 210 234Z" fill="#fff"/><ellipse class="paint" data-part="body" cx="200" cy="194" rx="22" ry="106" fill="#fff"/><circle cx="193" cy="131" r="4" fill="#554a58"/><circle cx="207" cy="131" r="4" fill="#554a58"/><path class="line" d="M194 145Q200 151 206 145M191 95Q155 48 135 50M209 95Q245 48 265 50"/></g>`,
car:`<g class="moving drive"><path class="paint" data-part="body" d="M45 208Q45 183 74 182H98L132 119Q144 104 161 104H267Q282 104 294 124L329 182H348Q368 182 368 210V271H45Z" fill="#fff"/><path class="paint" data-part="window1" d="M146 131H201V182H118Z" fill="#fff"/><path class="paint" data-part="window2" d="M215 131H265L303 182H215Z" fill="#fff"/><circle class="paint" data-part="wheel1" cx="120" cy="270" r="39" fill="#fff"/><circle class="paint" data-part="wheel2" cx="292" cy="270" r="39" fill="#fff"/><circle cx="120" cy="270" r="15" fill="#554a58"/><circle cx="292" cy="270" r="15" fill="#554a58"/><path class="line" d="M54 218H79M335 218H359"/></g>`};

// Extra big, easy-to-color vehicle illustrations.
shapes.train=`<g class="moving drive"><rect class="paint" data-part="carriage" x="45" y="105" width="310" height="162" rx="32" fill="#fff"/><rect class="paint" data-part="roof" x="77" y="75" width="245" height="39" rx="15" fill="#fff"/><rect class="paint" data-part="window1" x="75" y="134" width="67" height="70" rx="13" fill="#fff"/><rect class="paint" data-part="window2" x="166" y="134" width="67" height="70" rx="13" fill="#fff"/><rect class="paint" data-part="window3" x="257" y="134" width="67" height="70" rx="13" fill="#fff"/><rect class="paint" data-part="stripe" x="58" y="221" width="283" height="27" rx="8" fill="#fff"/><circle class="paint" data-part="wheel1" cx="110" cy="281" r="29" fill="#fff"/><circle class="paint" data-part="wheel2" cx="289" cy="281" r="29" fill="#fff"/><path class="line" d="M55 318H350M55 335H350"/></g>`;
shapes.bus=`<g class="moving drive"><rect class="paint" data-part="body" x="35" y="100" width="330" height="170" rx="28" fill="#fff"/><rect class="paint" data-part="window1" x="60" y="126" width="78" height="77" rx="12" fill="#fff"/><rect class="paint" data-part="window2" x="155" y="126" width="78" height="77" rx="12" fill="#fff"/><rect class="paint" data-part="door" x="250" y="126" width="88" height="124" rx="9" fill="#fff"/><rect class="paint" data-part="stripe" x="53" y="218" width="182" height="26" rx="7" fill="#fff"/><circle class="paint" data-part="wheel1" cx="105" cy="276" r="34" fill="#fff"/><circle class="paint" data-part="wheel2" cx="294" cy="276" r="34" fill="#fff"/></g>`;
shapes.firetruck=`<g class="moving drive"><rect class="paint" data-part="back" x="35" y="145" width="205" height="126" rx="17" fill="#fff"/><path class="paint" data-part="front" d="M240 169H306L360 213V271H240Z" fill="#fff"/><rect class="paint" data-part="window" x="265" y="184" width="50" height="47" rx="7" fill="#fff"/><rect class="paint" data-part="ladder" x="70" y="103" width="184" height="29" rx="7" fill="#fff"/><path class="line" d="M100 103V132M135 103V132M170 103V132M205 103V132"/><rect class="paint" data-part="light" x="176" y="121" width="45" height="24" rx="8" fill="#fff"/><circle class="paint" data-part="wheel1" cx="111" cy="274" r="35" fill="#fff"/><circle class="paint" data-part="wheel2" cx="302" cy="274" r="35" fill="#fff"/></g>`;
shapes.airplane=`<g class="moving flutter"><path class="paint" data-part="body" d="M45 174Q45 153 79 153H312Q365 153 372 181Q365 206 312 206H79Q45 206 45 174Z" fill="#fff"/><path class="paint" data-part="wing1" d="M169 158L204 58Q215 40 236 58L258 158Z" fill="#fff"/><path class="paint" data-part="wing2" d="M168 202L205 305Q215 321 237 303L258 202Z" fill="#fff"/><path class="paint" data-part="tail" d="M90 155L63 105Q56 95 45 105L47 173Z" fill="#fff"/><circle class="paint" data-part="window1" cx="285" cy="179" r="13" fill="#fff"/><circle class="paint" data-part="window2" cx="322" cy="179" r="13" fill="#fff"/></g>`;

const moreArt=[
['truck','🚚 트럭','<rect class="paint" data-part="cargo" x="45" y="120" width="210" height="135" rx="14" fill="#fff"/><path class="paint" data-part="cab" d="M255 165H320L365 218V255H255Z" fill="#fff"/><circle class="paint" data-part="wheel1" cx="110" cy="267" r="34" fill="#fff"/><circle class="paint" data-part="wheel2" cx="304" cy="267" r="34" fill="#fff"/>'],
['excavator','🚜 굴착기','<rect class="paint" data-part="body" x="75" y="177" width="185" height="83" rx="18" fill="#fff"/><path class="paint" data-part="cab" d="M128 178V112H221L247 178Z" fill="#fff"/><path class="paint" data-part="arm" d="M249 174L305 95L355 158L336 174L299 135L266 197Z" fill="#fff"/><ellipse class="paint" data-part="track" cx="165" cy="276" rx="113" ry="27" fill="#fff"/>'],
['ship','🚢 배','<path class="paint" data-part="hull" d="M40 206H365L314 294H100Z" fill="#fff"/><rect class="paint" data-part="deck" x="120" y="139" width="171" height="67" rx="8" fill="#fff"/><rect class="paint" data-part="chimney" x="185" y="85" width="48" height="54" fill="#fff"/><circle class="paint" data-part="window1" cx="164" cy="173" r="13" fill="#fff"/><circle class="paint" data-part="window2" cx="246" cy="173" r="13" fill="#fff"/>'],
['rocket','🚀 로켓','<path class="paint" data-part="body" d="M200 36Q130 105 150 258H250Q270 105 200 36Z" fill="#fff"/><circle class="paint" data-part="window" cx="200" cy="145" r="34" fill="#fff"/><path class="paint" data-part="leftfin" d="M150 206L95 280H158Z" fill="#fff"/><path class="paint" data-part="rightfin" d="M250 206L305 280H242Z" fill="#fff"/><path class="paint" data-part="flame" d="M170 258L200 337L230 258Z" fill="#fff"/>'],
['cat','🐱 고양이','<path class="paint" data-part="head" d="M90 153L95 65L155 109Q200 90 245 109L305 65L310 153Q338 267 200 283Q62 267 90 153Z" fill="#fff"/><ellipse class="paint" data-part="body" cx="200" cy="293" rx="92" ry="45" fill="#fff"/><circle cx="157" cy="180" r="8" fill="#514658"/><circle cx="243" cy="180" r="8" fill="#514658"/><path class="line" d="M190 215L200 223L210 215M200 223Q185 240 170 225M200 223Q215 240 230 225"/>'],
['dog','🐶 강아지','<ellipse class="paint" data-part="head" cx="200" cy="174" rx="106" ry="102" fill="#fff"/><ellipse class="paint" data-part="ear1" cx="92" cy="150" rx="38" ry="77" fill="#fff"/><ellipse class="paint" data-part="ear2" cx="308" cy="150" rx="38" ry="77" fill="#fff"/><ellipse class="paint" data-part="body" cx="200" cy="294" rx="83" ry="44" fill="#fff"/><circle cx="163" cy="174" r="8" fill="#514658"/><circle cx="237" cy="174" r="8" fill="#514658"/><ellipse cx="200" cy="217" rx="15" ry="11" fill="#514658"/>'],
['bear','🐻 곰','<circle class="paint" data-part="ear1" cx="112" cy="99" r="43" fill="#fff"/><circle class="paint" data-part="ear2" cx="288" cy="99" r="43" fill="#fff"/><circle class="paint" data-part="head" cx="200" cy="183" r="118" fill="#fff"/><ellipse class="paint" data-part="muzzle" cx="200" cy="228" rx="48" ry="34" fill="#fff"/><circle cx="158" cy="177" r="8" fill="#514658"/><circle cx="242" cy="177" r="8" fill="#514658"/><ellipse cx="200" cy="215" rx="12" ry="9" fill="#514658"/>'],
['fish','🐟 물고기','<ellipse class="paint" data-part="body" cx="192" cy="189" rx="122" ry="86" fill="#fff"/><path class="paint" data-part="tail" d="M292 190L371 115V263Z" fill="#fff"/><path class="paint" data-part="fin" d="M149 112L196 60L231 112Z" fill="#fff"/><circle cx="124" cy="168" r="10" fill="#514658"/>'],
['dinosaur','🦕 공룡','<path class="paint" data-part="body" d="M70 266Q50 170 154 160L188 81Q211 46 241 70L272 112L246 157Q312 185 345 263L291 277L254 241L209 285L169 280L153 248Z" fill="#fff"/><path class="paint" data-part="tail" d="M82 213L20 170L60 280Z" fill="#fff"/><circle cx="236" cy="102" r="7" fill="#514658"/>'],
['apple','🍎 사과','<path class="paint" data-part="fruit" d="M200 136Q100 74 70 167Q38 273 156 323Q200 343 240 323Q359 272 330 167Q300 74 200 136Z" fill="#fff"/><path class="paint" data-part="leaf" d="M200 116Q220 45 288 65Q268 116 200 116Z" fill="#fff"/><path class="line" d="M200 131Q190 98 200 72"/>'],
['flower','🌸 꽃','<ellipse class="paint" data-part="petal1" cx="200" cy="100" rx="45" ry="66" fill="#fff"/><ellipse class="paint" data-part="petal2" cx="270" cy="167" rx="66" ry="45" fill="#fff"/><ellipse class="paint" data-part="petal3" cx="200" cy="235" rx="45" ry="66" fill="#fff"/><ellipse class="paint" data-part="petal4" cx="130" cy="167" rx="66" ry="45" fill="#fff"/><circle class="paint" data-part="center" cx="200" cy="167" r="42" fill="#fff"/><path class="line" d="M200 272V337M200 310Q145 270 135 313"/>'],
['tree','🌳 나무','<rect class="paint" data-part="trunk" x="174" y="200" width="52" height="139" rx="10" fill="#fff"/><circle class="paint" data-part="leaf1" cx="136" cy="164" r="83" fill="#fff"/><circle class="paint" data-part="leaf2" cx="260" cy="164" r="83" fill="#fff"/><circle class="paint" data-part="leaf3" cx="200" cy="101" r="84" fill="#fff"/>'],
['sun','☀️ 해님','<circle class="paint" data-part="face" cx="200" cy="180" r="95" fill="#fff"/><path class="line" d="M200 35V65M200 295V325M55 180H85M315 180H345M97 77L117 97M283 263L303 283M303 77L283 97M117 263L97 283"/><circle cx="168" cy="166" r="8" fill="#514658"/><circle cx="232" cy="166" r="8" fill="#514658"/><path class="line" d="M165 207Q200 245 235 207"/>'],
['house','🏠 집','<path class="paint" data-part="roof" d="M42 161L200 40L358 161Z" fill="#fff"/><rect class="paint" data-part="wall" x="79" y="160" width="242" height="165" fill="#fff"/><rect class="paint" data-part="door" x="176" y="224" width="54" height="101" fill="#fff"/><rect class="paint" data-part="window" x="107" y="192" width="48" height="50" fill="#fff"/>'],
['star','⭐ 별','<path class="paint" data-part="star" d="M200 28L250 134L365 149L281 231L301 347L200 292L99 347L119 231L35 149L150 134Z" fill="#fff"/>']
];

moreArt.push(
['helicopter','🚁 헬리콥터','<ellipse class="paint" data-part="body" cx="180" cy="195" rx="125" ry="65" fill="#fff"/><rect class="paint" data-part="window" x="113" y="151" width="76" height="52" rx="23" fill="#fff"/><path class="paint" data-part="tail" d="M292 184L370 139L366 231L292 205Z" fill="#fff"/><path class="line" d="M88 120H290M190 120V132M112 276H280M130 257L112 276M263 257L280 276"/>'],
['tractor','🚜 트랙터','<path class="paint" data-part="body" d="M63 210H330V261H63Z" fill="#fff"/><path class="paint" data-part="cab" d="M145 210V126H259L285 210Z" fill="#fff"/><circle class="paint" data-part="wheel1" cx="126" cy="265" r="53" fill="#fff"/><circle class="paint" data-part="wheel2" cx="301" cy="271" r="33" fill="#fff"/>'],
['submarine','🚤 잠수함','<ellipse class="paint" data-part="body" cx="200" cy="210" rx="155" ry="82" fill="#fff"/><path class="paint" data-part="tower" d="M170 141V83H250V141Z" fill="#fff"/><circle class="paint" data-part="window1" cx="125" cy="208" r="23" fill="#fff"/><circle class="paint" data-part="window2" cx="207" cy="208" r="23" fill="#fff"/><circle class="paint" data-part="window3" cx="287" cy="208" r="23" fill="#fff"/>'],
['elephant','🐘 코끼리','<ellipse class="paint" data-part="body" cx="220" cy="245" rx="105" ry="75" fill="#fff"/><ellipse class="paint" data-part="ear" cx="146" cy="166" rx="67" ry="77" fill="#fff"/><circle class="paint" data-part="head" cx="214" cy="155" r="80" fill="#fff"/><path class="paint" data-part="trunk" d="M248 185Q266 235 242 277Q228 303 199 274L210 249Q228 265 230 238L220 191Z" fill="#fff"/><circle cx="227" cy="146" r="8" fill="#514658"/>'],
['turtle','🐢 거북이','<ellipse class="paint" data-part="shell" cx="193" cy="195" rx="117" ry="89" fill="#fff"/><circle class="paint" data-part="head" cx="324" cy="183" r="47" fill="#fff"/><ellipse class="paint" data-part="foot1" cx="121" cy="272" rx="32" ry="26" fill="#fff"/><ellipse class="paint" data-part="foot2" cx="265" cy="272" rx="32" ry="26" fill="#fff"/><circle cx="335" cy="173" r="7" fill="#514658"/><path class="line" d="M190 115V270M90 195H300"/>'],
['chick','🐥 병아리','<ellipse class="paint" data-part="body" cx="200" cy="211" rx="110" ry="107" fill="#fff"/><circle class="paint" data-part="head" cx="200" cy="125" r="83" fill="#fff"/><path class="paint" data-part="beak" d="M184 146L238 159L184 174Z" fill="#fff"/><ellipse class="paint" data-part="wing" cx="133" cy="228" rx="45" ry="30" fill="#fff"/><circle cx="174" cy="125" r="8" fill="#514658"/><path class="line" d="M170 315L160 340M231 315L240 340"/>'],
['strawberry','🍓 딸기','<path class="paint" data-part="fruit" d="M95 132Q200 90 305 132Q321 241 200 335Q79 241 95 132Z" fill="#fff"/><path class="paint" data-part="leaf" d="M120 133L100 85L164 103L200 54L237 103L303 85L280 133Z" fill="#fff"/><circle cx="155" cy="186" r="5" fill="#514658"/><circle cx="236" cy="186" r="5" fill="#514658"/><circle cx="197" cy="240" r="5" fill="#514658"/>'],
['icecream','🍦 아이스크림','<path class="paint" data-part="cone" d="M132 187H268L200 337Z" fill="#fff"/><circle class="paint" data-part="scoop1" cx="157" cy="156" r="60" fill="#fff"/><circle class="paint" data-part="scoop2" cx="241" cy="156" r="60" fill="#fff"/><circle class="paint" data-part="scoop3" cx="200" cy="91" r="60" fill="#fff"/>']
);
for(const [key,label,markup] of moreArt){shapes[key]='<g class="moving bounce">'+markup+'</g>';paints[key]={}}

/* Ninety additional scene compositions. Each combines a main illustration with
   a distinct, separately colorable scene element and setting. */
const sceneBases=[
 ['rabbit','🐰 토끼'],['butterfly','🦋 나비'],['car','🚗 자동차'],['train','🚆 기차'],
 ['bus','🚌 버스'],['firetruck','🚒 소방차'],['airplane','✈️ 비행기'],
 ['cat','🐱 고양이'],['dog','🐶 강아지'],['bear','🐻 곰'],
 ['fish','🐟 물고기'],['dinosaur','🦕 공룡'],['apple','🍎 사과'],
 ['flower','🌸 꽃'],['tree','🌳 나무'],['house','🏠 집'],
 ['truck','🚚 트럭'],['rocket','🚀 로켓']
];
const sceneStyles=[
 {name:'햇님과',badge:'☀️',markup:'<circle class="paint" data-part="sun" cx="338" cy="51" r="34" fill="#fff"/>'},
 {name:'구름과',badge:'☁️',markup:'<ellipse class="paint" data-part="cloud1" cx="90" cy="52" rx="48" ry="22" fill="#fff"/><ellipse class="paint" data-part="cloud2" cx="318" cy="76" rx="43" ry="19" fill="#fff"/>'},
 {name:'별빛',badge:'⭐',markup:'<path class="paint" data-part="star1" d="M65 25L76 51L103 54L82 72L89 98L65 84L41 98L48 72L27 54L54 51Z" fill="#fff"/><path class="paint" data-part="star2" d="M332 22L341 43L364 46L347 61L352 83L332 72L312 83L317 61L300 46L323 43Z" fill="#fff"/>'},
 {name:'꽃밭',badge:'🌼',markup:'<circle class="paint" data-part="flower1" cx="57" cy="310" r="23" fill="#fff"/><circle class="paint" data-part="flower2" cx="338" cy="310" r="23" fill="#fff"/><path class="line" d="M57 333V356M338 333V356"/>'},
 {name:'풍선',badge:'🎈',markup:'<ellipse class="paint" data-part="balloon1" cx="58" cy="64" rx="27" ry="40" fill="#fff"/><ellipse class="paint" data-part="balloon2" cx="344" cy="64" rx="27" ry="40" fill="#fff"/><path class="line" d="M58 105Q45 140 59 170M344 105Q356 140 344 170"/>'}
];
const sceneKeys=[];
for(const [base,label] of sceneBases){
 for(let i=0;i<sceneStyles.length;i++){
  const scene=sceneStyles[i],key='scene_'+base+'_'+i;
  const main=shapes[base].replace(/data-part="([^"]+)"/g,'data-part="main_$1"');
  const reduced='<g transform="translate(35 38) scale(.82)">'+main+'</g>';
  shapes[key]=reduced+'<g class="moving bounce">'+scene.markup+'</g>';
  paints[key]={};sceneKeys.push([key,scene.badge+' '+label+' '+scene.name]);
 }
}
const songs=[
{name:'🎵 반짝 산책',category:'동요풍',bpm:330,notes:[262,330,392,330,349,294,262,0,294,349,440,349,392,330,262,0]},
{name:'🐰 토끼 발걸음',category:'동요풍',bpm:260,notes:[392,392,440,392,330,330,294,0,349,349,392,349,294,262,262,0]},
{name:'🌈 무지개 여행',category:'동요풍',bpm:350,notes:[262,294,330,392,440,392,330,294,262,330,392,523,440,392,330,262]},
{name:'🚂 기차 소풍',category:'동요풍',bpm:290,notes:[330,392,440,392,330,294,262,294,330,392,523,440,392,330,294,262]},
{name:'🚗 자동차 여행',category:'동요풍',bpm:300,notes:[262,330,392,523,392,330,294,349,440,392,330,294,262,294,330,0]},
{name:'☁️ 구름 위 산책',category:'집중 배경음',bpm:1000,notes:[262,330,392,523,392,330,294,349],ambient:true},
{name:'🌙 조용한 별빛',category:'집중 배경음',bpm:1300,notes:[220,330,440,330,247,370,494,370],ambient:true},
{name:'🌿 숲속 쉼표',category:'집중 배경음',bpm:1100,notes:[196,294,392,294,220,330,440,330],ambient:true}
 ];
const extraTunes=[
['🐣 아침 인사',[262,294,330,392,330,294,262,0,330,349,392,440,392,330,262,0]],
['🦕 공룡 행진',[196,262,294,330,294,262,196,0,220,294,330,392,330,294,220,0]],
['🚀 우주 탐험',[262,392,523,494,440,392,330,294,262,330,440,523,587,523,392,0]],
['🐟 바닷속 친구',[294,349,392,349,294,262,294,0,349,440,392,349,330,294,262,0]],
['🌼 꽃밭 춤',[330,392,440,523,440,392,330,0,349,392,494,523,494,392,349,0]],
['🎈 풍선 여행',[262,330,392,440,392,330,294,262,330,392,523,440,392,330,262,0]],
['🐻 곰의 소풍',[220,262,294,330,294,262,220,0,247,294,330,392,330,294,247,0]],
['⭐ 별빛 자장가',[262,330,392,330,294,349,440,349],true],
['🌧️ 빗방울 산책',[294,392,440,392,330,392,494,392],true],
['🌲 숲속 아침',[196,262,330,392,220,294,349,440],true],
['🌊 잔잔한 바다',[220,330,392,330,247,370,440,370],true],
['☁️ 낮잠 구름',[262,349,440,349,294,392,494,392],true]
];
for(const [name,notes,ambient] of extraTunes)songs.push({name,category:ambient?'집중 배경음':'창작 동요풍',bpm:ambient?1150:320,notes,ambient:!!ambient});
function render(){const svg=$('art');svg.innerHTML=shapes[kind]+'<g id="drawLayer" pointer-events="none"></g><g id="outlineLayer" pointer-events="none"></g>';restoreLines();svg.querySelectorAll('.paint').forEach(el=>{const part=el.dataset.part;if(paints[kind][part])el.setAttribute('fill',paints[kind][part])});const overlay=$('outlineLayer');const outline=document.createElementNS('http://www.w3.org/2000/svg','g');outline.innerHTML=shapes[kind];outline.querySelectorAll('.paint').forEach(el=>{el.setAttribute('fill','none');el.style.fill='none';el.style.pointerEvents='none'});outline.querySelectorAll('*').forEach(el=>el.style.pointerEvents='none');overlay.appendChild(outline);$('canvasbox').classList.remove('playing');$('animate').textContent='▶ 움직여!';document.querySelectorAll('[data-art]').forEach(btn=>btn.classList.toggle('selected',btn.dataset.art===kind));const current=document.querySelector('[data-art="'+kind+'"]');if(current)$('pictureName').textContent=current.textContent;if(typeof drawMode!=='undefined')modeUI()}
function palette(){colors.forEach(c=>{const b=document.createElement('button');b.className='color'+(color===c?' selected':'');b.style.background=c;b.setAttribute('aria-label','색상 선택');b.onclick=()=>{color=c;document.querySelectorAll('.color').forEach(x=>x.classList.remove('selected'));b.classList.add('selected')};$('palette').appendChild(b)})}palette();document.querySelector('.choose').onclick=e=>{const b=e.target.closest('[data-art]');if(b){kind=b.dataset.art;history=[];render();if(typeof courseActive!=='undefined'&&courseActive)closeCourse()}};$('art').addEventListener('click',e=>{const el=e.target.closest('.paint');if(!el)return;if(drawMode)return;const part=el.dataset.part;history.push({kind,part,old:paints[kind][part]});paints[kind][part]=color;el.setAttribute('fill',color);$('message').textContent='우와! 정말 예쁘다! 🌟'});$('undo').onclick=()=>{if(drawMode&&strokes[kind].length){strokes[kind].pop();render();return}const h=history.pop();if(!h)return;paints[h.kind][h.part]=h.old;if(kind===h.kind)render()};$('clear').onclick=()=>{paints[kind]={};strokes[kind]=[];history=[];render();$('message').textContent='새 그림을 색칠해 보자!'};$('animate').onclick=()=>{const active=$('canvasbox').classList.toggle('playing');$('animate').textContent=active?'⏸ 멈추기':'▶ 움직여!';$('message').textContent=active?'내 그림이 움직여요! 🎉':'색칠하고 또 움직여 보자!'};let musicVolume=.32;function tone(freq,time,ambient=false,voice='lead',length=null){if(!freq||!ctx)return;const osc=ctx.createOscillator(),gain=ctx.createGain();osc.type=ambient?'sine':voice==='bass'?'sine':voice==='harmony'?'sine':'triangle';osc.frequency.value=freq;const duration=length||(ambient?1.7:voice==='bass'?.68:.28);const peak=(ambient?.023:voice==='bass'?.035:voice==='harmony'?.025:.085)*musicVolume;gain.gain.setValueAtTime(.0001,time);gain.gain.linearRampToValueAtTime(peak,time+(ambient?.35:.025));gain.gain.exponentialRampToValueAtTime(.0001,time+duration);osc.connect(gain).connect(ctx.destination);osc.start(time);osc.stop(time+duration+.02)}function tick(){if(!playing||!ctx)return;const track=songs[song],n=step%track.notes.length,t=ctx.currentTime+.035;const root=track.ambient?track.notes[Math.floor(step/4)*4%track.notes.length]:[262,220,196,247][Math.floor(step/4)%4];tone(track.notes[n],t,!!track.ambient);if(step%4===0){tone(root/2,t,!!track.ambient,'bass',track.ambient?2.4:.8);tone(root*1.5,t+.04,!!track.ambient,'harmony',track.ambient?2.1:.7)}if(!track.ambient&&step%2===0){tone(root*2,t+.12,false,'harmony',.13)}step++}function stop(){playing=false;clearInterval(notesTimer);notesTimer=null;$('playMusic').textContent='▶ 음악'}function start(){try{ctx=ctx||new(window.AudioContext||window.webkitAudioContext)();ctx.resume();playing=true;step=0;tick();notesTimer=setInterval(tick,songs[song].bpm);$('playMusic').textContent='⏸ 음악'}catch{$('message').textContent='이 기기에서 음악을 재생할 수 없어요.'}}$('playMusic').onclick=()=>playing?stop():start();function switchSong(d){const was=playing;stop();song=(song+d+songs.length)%songs.length;$('songName').textContent=songs[song].name;$('musicCategory').textContent=songs[song].category;if(was)start()}$('prevSong').onclick=()=>switchSong(-1);$('nextSong').onclick=()=>switchSong(1);window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();installEvent=e});$('install').onclick=async()=>{if(installEvent){installEvent.prompt();installEvent=null}else alert('브라우저 메뉴에서 홈 화면에 추가를 선택해 주세요. 삼성 인터넷: 메뉴 → 현재 페이지 추가 → 홈 화면')};document.addEventListener('visibilitychange',()=>{if(document.hidden)stop()});

// Finger and S Pen free drawing: SVG paths keep coordinates aligned on every screen.
let drawMode=false,activePointer=null,activeStroke=null;
const strokes={rabbit:[],butterfly:[],car:[],train:[],bus:[],firetruck:[],airplane:[]};for(const [key] of moreArt)strokes[key]=[];for(const [key] of sceneKeys)strokes[key]=[];
function restoreLines(){const layer=$('drawLayer');if(!layer)return;layer.innerHTML='';for(const stroke of strokes[kind]){const path=document.createElementNS('http://www.w3.org/2000/svg','path');path.setAttribute('d',stroke.d);path.setAttribute('fill','none');path.setAttribute('stroke',stroke.color);path.setAttribute('stroke-width','13');path.setAttribute('stroke-linecap','round');path.setAttribute('stroke-linejoin','round');layer.appendChild(path)}}
function modeUI(){document.querySelectorAll('[data-mode]').forEach(b=>{b.classList.toggle('selected',b.dataset.mode===(drawMode?'draw':'fill'))});$('art').style.touchAction=drawMode?'none':'manipulation';$('message').textContent=drawMode?'손가락으로 쓱쓱 색칠해 봐! 🖍️':'그림을 콕 누르면 색이 채워져! 🪣'}
document.querySelectorAll('[data-mode]').forEach(b=>b.onclick=()=>{drawMode=b.dataset.mode==='draw';render();modeUI()});
const point=e=>{const p=$('art').createSVGPoint();p.x=e.clientX;p.y=e.clientY;const m=$('art').getScreenCTM();if(!m)return null;const q=p.matrixTransform(m.inverse());return {x:Math.max(0,Math.min(400,q.x)),y:Math.max(0,Math.min(360,q.y))}};
$('art').addEventListener('pointerdown',e=>{if(!drawMode)return;e.preventDefault();const p=point(e);if(!p)return;activePointer=e.pointerId;activeStroke={color,d:'M'+p.x.toFixed(1)+' '+p.y.toFixed(1)+' l0.1 0.1'};strokes[kind].push(activeStroke);$('art').setPointerCapture(e.pointerId);restoreLines()});
$('art').addEventListener('pointermove',e=>{if(!drawMode||activePointer!==e.pointerId||!activeStroke)return;e.preventDefault();const p=point(e);if(!p)return;activeStroke.d+=' L'+p.x.toFixed(1)+' '+p.y.toFixed(1);restoreLines()});
function finishStroke(e){if(activePointer===e.pointerId){activePointer=null;activeStroke=null}}
$('art').addEventListener('pointerup',finishStroke);$('art').addEventListener('pointercancel',finishStroke);
try{render()}catch(err){console.error('Initial render failed',err);$('message').textContent='그림을 준비하는 중 문제가 생겼어요. 다시 열어주세요.'}

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
document.querySelectorAll('[data-age]').forEach(b=>b.onclick=()=>{age=Number(b.dataset.age);questionNumber=0;if(typeof courseActive!=='undefined'&&courseActive){coursePhase=0;courseShow()}try{localStorage.setItem('gongbu_age',String(age))}catch{}document.querySelectorAll('[data-age]').forEach(x=>x.classList.toggle('selected',Number(x.dataset.age)===age));newQuestion()});
document.querySelectorAll('[data-age]').forEach(x=>x.classList.toggle('selected',Number(x.dataset.age)===age));
$('newQuestion').onclick=newQuestion;newQuestion();

// Calm default volume; parent-adjustable volume without external audio downloads.
$('musicVolume').addEventListener('input',e=>{musicVolume=Number(e.target.value)/100});
$('musicCategory').textContent=songs[song].category;

// Simple next/previous picture controls within reach of the coloring area.
const pictureOrder=['rabbit','butterfly','car','train','bus','firetruck','airplane',...moreArt.map(x=>x[0]),...sceneKeys.map(x=>x[0])];function changePicture(delta){const i=pictureOrder.indexOf(kind);kind=pictureOrder[(i+delta+pictureOrder.length)%pictureOrder.length];history=[];render();modeUI()}
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
const courseMissions={
 3:[['선 따라가기','M45 190H355'],['동그라미','M200 90A100 100 0 1 1 199.9 90'],['물결선','M35 180Q110 75 200 180T365 180'],['그림 색칠하기',null],['움직여 보기',null]],
 5:[['지그재그 선','M35 265L100 100L165 265L230 100L295 265L365 100'],['세모 따라가기','M200 70L345 300H55Z'],['네모 따라가기','M90 85H310V290H90Z'],['숫자 따라 쓰기','5'],['그림 색칠하기',null],['움직여 보기',null]],
 6:[['복잡한 길','M30 285C80 40 160 320 200 160S320 50 370 275'],['숫자 따라 쓰기','12'],['한글 따라 쓰기','기차'],['한글 따라 쓰기','자동차'],['그림 색칠하기',null],['움직여 보기',null]]
};
function missionList(){return courseMissions[age]||courseMissions[3]}
function currentMission(){return missionList()[coursePhase]||missionList()[0]}
function drawTraceText(svg,word){const letters=[...word],size=letters.length>2?80:116,start=letters.length>2?36:90;letters.forEach((letter,i)=>{const t=document.createElementNS('http://www.w3.org/2000/svg','text');t.textContent=letter;t.setAttribute('x',String(start+i*(size+4)));t.setAttribute('y','225');t.setAttribute('font-size',String(size));t.setAttribute('font-weight','900');t.setAttribute('fill','#fff');t.setAttribute('stroke','#9db5cf');t.setAttribute('stroke-width','2.3');t.setAttribute('stroke-dasharray','5 4');t.setAttribute('paint-order','stroke');svg.appendChild(t)})}
function courseDrawGuide(){
 const svg=courseSvgBase();svg.innerHTML='';courseStroke=null;
 const [title,guide]=currentMission();
 if(guide&&guide.startsWith('M')){
  const path=document.createElementNS('http://www.w3.org/2000/svg','path');path.setAttribute('d',guide);path.setAttribute('stroke','#f6c45e');path.setAttribute('stroke-width',age===3?'32':'23');path.setAttribute('fill','none');path.setAttribute('stroke-linecap','round');path.setAttribute('stroke-linejoin','round');svg.appendChild(path);
  const dashed=path.cloneNode();dashed.setAttribute('stroke','#fff');dashed.setAttribute('stroke-width','5');dashed.setAttribute('stroke-dasharray','10 12');svg.appendChild(dashed);
 }else if(guide)drawTraceText(svg,guide);
 $('courseHint').textContent='✏️ '+title+' — 손가락으로 천천히 따라 그려요!';
}
function courseShow(){
 const [title]=currentMission();$('courseStatus').hidden=false;$('courseControls').hidden=false;
 $('courseTitle').textContent=age+'세 · '+(courseKind==='train'?'🚂 기차':'🚗 자동차')+' 학습';
 $('courseStep').textContent=(coursePhase+1)+' / '+missionList().length+' · '+title;
 $('courseNext').textContent=coursePhase===missionList().length-1?'🎉 완료':'다음 단계 ▶';
 const coloring=title==='그림 색칠하기',moving=title==='움직여 보기';
 $('courseOverlay').hidden=coloring||moving;
 $('canvasbox').classList.remove('playing');$('animate').textContent='▶ 움직여!';
 if(coloring){drawMode=false;modeUI();$('message').textContent='🎨 좋아하는 색을 골라 그림을 칠해요!'}
 else if(moving){$('canvasbox').classList.add('playing');$('animate').textContent='⏸ 멈추기';$('message').textContent='🎉 내가 색칠한 그림이 움직여요!'}
 else{courseDrawGuide();$('message').textContent='✏️ '+title+'를 따라 해 봐요!'}
}
function beginCourse(){try{courseKind=kind==='car'?'car':'train';if(kind!==courseKind){kind=courseKind;render()}courseActive=true;coursePhase=0;$('startCourse').textContent='✏️ 학습 중';$('courseStatus').hidden=false;$('courseOverlay').hidden=false;$('courseControls').hidden=false;courseShow();$('message').textContent='🚂 첫 번째 미션! 길을 따라 선을 그려봐요.'}catch(err){console.error('Course start failed',err);$('message').textContent='학습 화면을 여는 중 문제가 생겼어요.'}}
$('startCourse').addEventListener('click',beginCourse);$('closeCourse').onclick=closeCourse;
$('courseNext').onclick=()=>{if(!courseActive)return;if(coursePhase===missionList().length-1){closeCourse();$('message').textContent='🌟 모든 놀이를 끝냈어요! 정말 잘했어요!';return}coursePhase++;courseShow()};
$('courseRetry').onclick=()=>{if(currentMission()[0]==='그림 색칠하기'){paints[kind]={};strokes[kind]=[];render()}if(currentMission()[0]==='움직여 보기'){$('canvasbox').classList.remove('playing')}courseShow()};
function coursePoint(e){const svg=courseSvgBase();const rect=svg.getBoundingClientRect();if(!rect.width||!rect.height)return null;const x=(e.clientX-rect.left)*400/rect.width,y=(e.clientY-rect.top)*360/rect.height;return{x:Math.max(0,Math.min(400,x)),y:Math.max(0,Math.min(360,y))}}
function coursePaint(e,first){if(!courseActive||$('courseOverlay').hidden)return;const p=coursePoint(e);if(!p)return;e.preventDefault();if(first){courseStroke=document.createElementNS('http://www.w3.org/2000/svg','path');courseStroke.setAttribute('fill','none');courseStroke.setAttribute('stroke','#568fe2');courseStroke.setAttribute('stroke-width','12');courseStroke.setAttribute('stroke-linecap','round');courseStroke.setAttribute('stroke-linejoin','round');courseStroke.setAttribute('d','M'+p.x+' '+p.y);courseSvgBase().appendChild(courseStroke)}else if(courseStroke){courseStroke.setAttribute('d',courseStroke.getAttribute('d')+' L'+p.x+' '+p.y)}}
$('courseSvg').addEventListener('pointerdown',e=>{coursePointer=e.pointerId;coursePaint(e,true);$('courseSvg').setPointerCapture(e.pointerId)});
$('courseSvg').addEventListener('pointermove',e=>{if(coursePointer===e.pointerId)coursePaint(e,false)});
for(const event of ['pointerup','pointercancel'])$('courseSvg').addEventListener(event,e=>{if(coursePointer===e.pointerId){coursePointer=null;courseStroke=null}});

// Make the course entry resilient to taps on nested elements and PWA updates.


// Open the quiz from the mobile toolbar without covering the age buttons.
const mobileQuiz=document.getElementById('mobileQuiz');if(mobileQuiz)mobileQuiz.addEventListener('click',()=>{const details=document.querySelector('.learn-details');details.open=!details.open;mobileQuiz.textContent=details.open?'✕ 문제 닫기':'🧠 문제 놀이'});

/* Home navigation: keep the existing coloring engine isolated and reusable. */
const playHub=document.getElementById('playHub'),playLayout=document.getElementById('playLayout');
function enterPlay(mode){
 playHub.hidden=true;playLayout.hidden=false;
 document.getElementById('homeHub').textContent='⌂ 놀이 선택';
 if(mode==='study'){
   beginCourse();
 }else if(courseActive){closeCourse()}
}
document.getElementById('chooseImagine').addEventListener('click',()=>enterPlay('imagine'));
document.getElementById('chooseStudy').addEventListener('click',()=>enterPlay('study'));
document.getElementById('homeHub').addEventListener('click',()=>{
 if(courseActive)closeCourse();
 playLayout.hidden=true;playHub.hidden=false;
});
