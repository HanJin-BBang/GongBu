const $=id=>document.getElementById(id);const colors=['#ff6b87','#ffb347','#ffe66d','#7cdb9b','#6bc8ff','#b49aff','#ffffff'];let color=colors[0],kind='rabbit',history=[],paints={rabbit:{},butterfly:{},car:{},train:{},bus:{},firetruck:{},airplane:{}},song=0,playing=false,ctx=null,notesTimer=null,step=0,installEvent=null;const shapes={
rabbit:`<g class="moving bounce"><path class="paint" data-part="body" d="M118 212C94 230 83 270 101 308Q119 340 200 340Q281 340 299 308C317 270 306 230 282 212Z" fill="#fff"/><path class="paint" data-part="ear-left" d="M127 138Q85 70 104 26Q123 0 151 49Q175 91 172 139Z" fill="#fff"/><path class="paint" data-part="ear-right" d="M228 139Q225 91 249 49Q277 0 296 26Q315 70 273 138Z" fill="#fff"/><path class="paint" data-part="inner-ear-left" d="M132 115Q109 69 117 44Q134 44 151 117Z" fill="#ffe0e7"/><path class="paint" data-part="inner-ear-right" d="M249 117Q266 44 283 44Q291 69 268 115Z" fill="#ffe0e7"/><path class="paint" data-part="head" d="M100 170Q100 121 153 122Q200 111 247 122Q300 121 300 170Q320 240 265 265Q200 296 135 265Q80 240 100 170Z" fill="#fff"/><ellipse cx="159" cy="202" rx="20" ry="11" fill="#ffd8e4"/><ellipse cx="241" cy="202" rx="20" ry="11" fill="#ffd8e4"/><ellipse cx="165" cy="177" rx="9" ry="12" fill="#514658"/><ellipse cx="235" cy="177" rx="9" ry="12" fill="#514658"/><ellipse cx="162" cy="172" rx="3" ry="4" fill="#fff"/><ellipse cx="232" cy="172" rx="3" ry="4" fill="#fff"/><path d="M190 202Q200 196 210 202L200 210Z" fill="#f29eaf"/><path class="line" d="M200 210V216M200 216Q187 231 177 216M200 216Q213 231 223 216M133 213L105 207M134 224L107 229M266 213L295 207M266 224L293 229"/><path class="paint" data-part="tummy" d="M164 281Q200 266 236 281Q253 306 233 324Q200 336 167 324Q147 306 164 281Z" fill="#fff"/><path class="paint" data-part="left-paw" d="M111 294Q124 281 146 292Q163 308 155 331Q132 344 111 329Q100 310 111 294Z" fill="#fff"/><path class="paint" data-part="right-paw" d="M289 294Q276 281 254 292Q237 308 245 331Q268 344 289 329Q300 310 289 294Z" fill="#fff"/><path class="line" d="M131 316L127 325M140 316L141 326M269 316L273 325M260 316L259 326"/></g>`,
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
 stopReading();readingLayout.hidden=true;playHub.hidden=true;playLayout.hidden=false;
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

// Installation QR dialog
const qrDialog=document.getElementById('qrDialog');document.getElementById('showQr').addEventListener('click',()=>{qrDialog.hidden=false});document.getElementById('closeQr').addEventListener('click',()=>{qrDialog.hidden=true});qrDialog.addEventListener('click',e=>{if(e.target===qrDialog)qrDialog.hidden=true});

/* Original illustrated read-aloud stories, graded for preschool ages. */
const readingStories=[
 {category:"동물",icon:"🐰",title:"토끼의 당근",pages:[["🌅🐰","햇살이 포근한 아침이었어요. 작은 토끼 보리는 창문을 열고 기지개를 켰지요. 오늘은 엄마에게 맛있는 당근 수프를 만들어 드리기로 한 날이에요."],["🌳🥕","보리는 작은 바구니를 들고 텃밭으로 갔어요. 그런데 어제까지 보이던 당근이 하나도 없었어요. 보리는 귀를 쫑긋 세우고 주변을 살펴보았지요."],["🐿️🐰","그때 다람쥐가 나무 뒤에서 고개를 내밀었어요. '바람이 세게 불어서 당근 바구니가 언덕 아래로 굴러갔어!' 보리는 다람쥐와 함께 언덕으로 달려갔어요."],["🥕🧺","언덕 아래에는 당근이 여기저기 흩어져 있었어요. 둘은 하나씩 주워 바구니에 담았지요. 커다란 당근 하나는 힘을 합쳐서 겨우 들어 올렸어요."],["🏡🍲","집으로 돌아온 보리는 엄마와 함께 수프를 끓였어요. 따뜻한 냄새가 집 안 가득 퍼졌지요. '함께 도와줘서 더 맛있구나!' 모두가 웃으며 수프를 나누어 먹었답니다."]]},
 {category:"동물",icon:"🐻",title:"곰의 소풍",pages:[["☀️🐻","토요일 아침, 아기 곰 두두는 소풍 가방을 챙겼어요. 사과 두 개와 작은 물병, 그리고 아끼는 노란 손수건도 넣었지요."],["🌲🦋","숲길에는 나비가 팔랑팔랑 날고 있었어요. 두두는 나비를 따라 걷다가 처음 보는 갈림길 앞에 섰어요. 어느 길로 가야 할지 몰라 잠시 멈췄지요."],["🐦🌳","나뭇가지 위의 새가 노래했어요. '졸졸 흐르는 시냇물 소리를 따라가 봐!' 두두는 귀를 기울였고, 멀리서 물소리가 들려왔어요."],["💧🐿️","시냇가에 도착하니 다람쥐가 배고픈 얼굴로 앉아 있었어요. 두두는 사과 하나를 건네주었어요. 다람쥐는 기뻐하며 가장 예쁜 소풍 자리를 알려 주었답니다."],["🍎🌈","두두는 풀밭에 앉아 남은 사과를 먹었어요. 구름 사이로 햇살이 비치고 작은 무지개가 떠올랐지요. 오늘 소풍에서 가장 좋았던 것은 친구를 만난 일이었어요."]]},
 {category:"동물",icon:"🐢",title:"천천히 거북이",pages:[["🐢🌞","거북이 토토는 친구들과 언덕 위 꽃밭에 가기로 했어요. 친구들은 빠르게 달려갔지만 토토는 천천히 한 걸음씩 걸었지요."],["🐜🌼","길에서 작은 개미가 무거운 나뭇잎을 옮기는 모습을 보았어요. 토토는 잠시 멈춰 개미를 도와주었어요. 개미는 고맙다고 인사했지요."],["🐌💦","조금 더 가니 달팽이가 물웅덩이 앞에서 망설이고 있었어요. 토토는 넓은 나뭇잎을 놓아 작은 다리를 만들어 주었어요."],["🌷🦋","꽃밭에 도착했을 때 친구들은 이미 놀고 있었어요. 토토는 길에서 만난 개미와 달팽이 이야기를 들려주었어요. 친구들은 토토의 이야기에 귀를 기울였지요."],["🌄🐢","해가 질 무렵 모두 함께 집으로 돌아갔어요. 토토는 생각했어요. '천천히 가면 다른 친구들이 보이는구나.' 그날 토토의 마음은 아주 따뜻했답니다."]]},
 {category:"탈것",icon:"🚂",title:"칙칙폭폭 기차",pages:[["🚂🌄","아침 햇살이 반짝이자 작은 파란 기차가 눈을 떴어요. 오늘은 처음으로 산 너머 마을까지 손님을 태우고 가는 날이었지요."],["🚉👨‍👩‍👧","역에는 가족들과 동물 친구들이 기다리고 있었어요. '모두 탔나요?' 기차가 물었어요. 차장님이 깃발을 흔들자 칙칙폭폭 출발했어요."],["🌉💨","기차는 길고 높은 다리를 건넜어요. 바람이 세게 불어 조금 무서웠지만 기차는 천천히 바퀴를 굴렸어요. 손님들은 창밖의 반짝이는 강을 바라보았지요."],["⛰️🌻","터널을 빠져나오자 노란 꽃밭이 펼쳐졌어요. 기차는 꽃을 밟지 않도록 정해진 선로를 따라 조심조심 달렸어요."],["🏘️🎉","드디어 산 너머 마을에 도착했어요. 마을 친구들이 손을 흔들며 환영했지요. 파란 기차는 뿌듯한 마음으로 기적을 울렸답니다. '뿌우! 다음 여행에서 또 만나요!'"]]},
 {category:"탈것",icon:"🚒",title:"용감한 소방차",pages:[["🚒🏠","빨간 소방차 반짝이는 소방서에서 하루를 시작했어요. 바퀴를 닦고 물탱크도 가득 채웠지요. 오늘도 누군가를 도울 준비가 되었어요."],["🚨🐱","그때 구조 요청이 들어왔어요. 작은 고양이가 높은 나무 위에서 내려오지 못하고 있었어요. 반짝이는 사이렌을 켜고 출동했지요."],["🌳🪜","현장에 도착한 소방관은 주변을 안전하게 정리했어요. 그리고 튼튼한 사다리를 천천히 올렸지요. 고양이는 겁이 나서 야옹야옹 울고 있었어요."],["👩‍🚒🐈","소방관이 부드러운 목소리로 말했어요. '괜찮아, 우리가 도와줄게.' 고양이는 조심스럽게 품에 안겨 땅으로 내려왔어요."],["❤️🚒","고양이의 가족이 고맙다고 인사했어요. 반짝이는 기분 좋게 소방서로 돌아왔지요. 용감하다는 건 누군가를 안전하게 돕는 일이랍니다."]]},
 {category:"탈것",icon:"🚀",title:"달나라 여행",pages:[["🚀👧","하늘을 좋아하는 아이 별이는 작은 로켓을 타고 우주 여행을 떠났어요. 안전띠를 매고 숫자를 세었지요. 셋, 둘, 하나! 출발!"],["🌍✨","창밖으로 파란 지구가 점점 작아졌어요. 별이는 반짝이는 별들과 인사했어요. 우주에는 아주 조용하고 신비로운 빛이 가득했지요."],["🌙🐇","달에 도착하니 달 토끼가 기다리고 있었어요. 달 토끼는 별이에게 동그란 달 돌을 보여 주며 달의 이야기를 들려주었어요."],["⭐🛰️","돌아가는 길에 작은 인공위성이 길을 잃은 것처럼 보였어요. 별이는 반짝이는 지구를 가리키며 방향을 알려 주었지요."],["🌎🏡","마침내 지구에 돌아온 별이는 가족을 꼭 안았어요. '우주도 멋지지만 우리 집이 제일 좋아!' 그날 밤 별이는 달을 보며 손을 흔들었답니다."]]},
 {category:"자연",icon:"🌱",title:"작은 씨앗",pages:[["🌰🌿","작은 씨앗 하나가 포근한 흙 속에 누워 있었어요. 씨앗은 밖이 어떤 곳인지 궁금했지만 아직은 캄캄했지요."],["🌧️💧","어느 날 촉촉한 빗방울이 흙을 적셨어요. 씨앗은 물을 마시고 몸을 쭉 늘렸어요. 작은 뿌리가 아래로 자라기 시작했지요."],["☀️🌱","따뜻한 햇살이 비치자 초록 새싹이 땅 위로 고개를 내밀었어요. '안녕, 세상아!' 새싹은 바람에 살랑살랑 흔들렸어요."],["🐝🌼","날이 지나며 잎이 커지고 꽃봉오리가 생겼어요. 어느 아침, 노란 꽃이 활짝 피었어요. 벌 한 마리가 찾아와 반갑게 인사했지요."],["🌻🦋","꽃은 바람과 햇빛, 비에게 고맙다고 말했어요. 작고 조용한 씨앗은 어느새 친구들에게 그늘과 향기를 나누는 꽃이 되었답니다."]]},
 {category:"자연",icon:"☁️",title:"구름의 모양",pages:[["☁️🌤️","하늘에 작은 구름 뭉치가 둥둥 떠 있었어요. 구름은 자기에게 어떤 모양이 어울릴지 궁금했어요."],["🐑☁️","바람이 살짝 불자 구름은 복슬복슬한 양이 되었어요. 풀밭의 아이들이 '양이다!' 하고 손가락으로 가리켰지요."],["🐘🌬️","조금 더 큰 바람이 불자 이번에는 코가 긴 코끼리 모양이 되었어요. 구름은 신나서 하늘을 한 바퀴 돌았어요."],["🐳🌊","오후에는 커다란 고래 모양으로 변했어요. 아래에서 바다를 바라보던 아이가 구름 고래에게 손을 흔들었지요."],["🌇☁️","해가 질 무렵 구름은 다시 포근한 솜뭉치가 되었어요. '어떤 모양이든 나는 나야.' 구름은 노을빛 이불을 덮고 쉬었답니다."]]},
 {category:"생활",icon:"🧸",title:"장난감 정리",pages:[["🧸🧱","하루는 민이가 블록으로 높은 성을 만들었어요. 인형과 자동차도 함께 놀았지요. 방 안은 신나는 놀이 세상이 되었어요."],["🌙🧺","저녁이 되자 장난감들이 바닥에 가득했어요. 민이는 졸렸지만 장난감도 제자리에서 쉬고 싶을 것 같았어요."],["🚗📦","민이는 자동차를 상자에 넣고 블록을 색깔별로 모았어요. 곰 인형은 침대 옆 작은 의자에 앉혀 주었지요."],["🧸✨","장난감이 하나씩 제자리로 돌아가자 방이 넓어졌어요. 민이는 잃어버린 줄 알았던 파란 블록도 찾았답니다."],["🏡💤","민이는 깨끗한 방을 보며 활짝 웃었어요. '내일 또 재미있게 놀자!' 곰 인형도 고개를 끄덕이는 것 같았지요."]]},
 {category:"생활",icon:"🤝",title:"함께 나누기",pages:[["🍪👧","소라는 엄마와 함께 동그란 과자를 구웠어요. 고소한 냄새가 집 안에 가득 퍼졌지요. 소라는 과자를 접시에 담았어요."],["👦🍪","그때 친구 준이가 놀러 왔어요. 준이는 과자를 보고 눈을 반짝였지만 말없이 기다렸어요."],["🤔💛","소라는 가장 큰 과자를 혼자 먹고 싶었어요. 하지만 친구와 함께 먹으면 더 즐거울 것 같았지요."],["🍪🤝","소라는 과자를 반으로 나누어 준이에게 건넸어요. 두 친구는 나란히 앉아 과자를 먹으며 재미있는 이야기를 나누었어요."],["😊🌈","준이가 말했어요. '고마워, 정말 맛있어!' 소라도 웃었어요. 과자는 반으로 줄었지만 기쁨은 두 배가 되었답니다."]]},
 {category:"모험",icon:"🦕",title:"공룡 친구",pages:[["🥚🌲","옛날 옛날, 커다란 숲속에 반짝이는 알 하나가 있었어요. 작은 공룡 루루가 알을 발견하고 조심스럽게 귀를 기울였어요."],["🦖✨","톡, 톡! 알에 금이 가더니 아기 공룡이 고개를 내밀었어요. 아기 공룡은 처음 보는 세상이 신기해서 눈을 동그랗게 떴지요."],["🌿💦","루루는 아기 공룡에게 시원한 물이 있는 곳과 부드러운 풀밭을 보여 주었어요. 둘은 함께 천천히 숲길을 걸었어요."],["🌧️🍃","갑자기 비가 내리기 시작했어요. 루루는 커다란 잎사귀를 찾아 아기 공룡 위에 펼쳐 주었어요. 둘은 빗소리를 들으며 비가 그치기를 기다렸지요."],["🌈🦕","비가 그치자 무지개가 떴어요. 아기 공룡은 루루에게 몸을 기대며 고맙다고 말하는 듯했어요. 그렇게 둘은 가장 친한 친구가 되었답니다."]]},
 {category:"모험",icon:"🐟",title:"바닷속 보물",pages:[["🐟🌊","작은 물고기 파랑이는 산호초 사이를 헤엄치며 놀고 있었어요. 어느 날 바닷속에 반짝이는 빛이 보였어요."],["🐚✨","파랑이는 빛을 따라가다가 커다란 조개를 발견했어요. 조개 안에는 동그랗고 빛나는 진주가 있었지요."],["🦀🐠","파랑이는 보물을 혼자 가져가고 싶었지만, 길을 잃은 작은 게를 만났어요. 파랑이는 먼저 게가 집으로 돌아가도록 도와주었어요."],["🐢🪸","돌아오는 길에 바다거북이 말했어요. '진주보다 더 빛나는 건 친구를 도운 네 마음이란다.' 파랑이는 부끄럽게 웃었지요."],["🐟💙","파랑이는 진주를 조개에게 돌려주고 친구들과 산호초로 돌아왔어요. 모두 함께 헤엄치는 바다는 어떤 보물보다 아름다웠답니다."]]}
];
let readingAge=3,readingIndex=0,readingPage=0,readingPlaying=false,readingSession=0,readingAuto=true;
const readingLayout=document.getElementById('readingLayout');
function stopReading(){readingPlaying=false;readingSession++;if('speechSynthesis' in window)window.speechSynthesis.cancel()}
function bestKoreanVoice(){
 if(!('speechSynthesis' in window))return null;
 const voices=window.speechSynthesis.getVoices().filter(v=>v.lang.toLowerCase().startsWith('ko'));
 return voices.sort((a,b)=>{const score=v=>(v.localService?3:0)+(/female|여성|yuna|sora|sunhi|heami|google 한국어|microsoft/i.test(v.name)?8:0)+(/natural|neural|premium/i.test(v.name)?10:0);return score(b)-score(a)})[0]||null;
}
function readText(){
 stopReading();
 if(!('speechSynthesis' in window)){document.getElementById('readingSpeak').textContent='🔇 음성 미지원';return}
 const session=readingSession,story=readingStories[readingIndex],page=story.pages[readingPage];
 const utterance=new SpeechSynthesisUtterance(page[1]);utterance.lang='ko-KR';utterance.rate=readingAge===3?.83:readingAge===5?.89:.94;utterance.pitch=1.02;
 const voice=bestKoreanVoice();if(voice)utterance.voice=voice;
 readingPlaying=true;
 utterance.onend=()=>{if(session!==readingSession)return;readingPlaying=false;if(readingAuto&&readingPage<story.pages.length-1){readingPage++;showReading(false);readText()}};
 utterance.onerror=()=>{if(session===readingSession)readingPlaying=false};
 window.speechSynthesis.speak(utterance);
}
function showReading(speak=false){
 const story=readingStories[readingIndex],page=story.pages[readingPage];
 document.getElementById('readingPicture').textContent=page[0];
 document.getElementById('readingTitle').textContent=story.title;
 document.getElementById('readingCount').textContent=(readingIndex+1)+' / '+readingStories.length+'권 · '+(readingPage+1)+' / '+story.pages.length+'쪽';
 document.getElementById('readingText').textContent=page[1];
 document.querySelectorAll('[data-read-age]').forEach(b=>b.classList.toggle('selected',Number(b.dataset.readAge)===readingAge));
 document.querySelectorAll('[data-read-category]').forEach(b=>b.classList.toggle('selected',b.dataset.readCategory===story.category));
 if(speak)readText();
}
function readingCategoryButtons(){
 const wrap=document.getElementById('readingCategories');wrap.innerHTML='';
 for(const category of ['동물','탈것','자연','생활','모험']){
  const btn=document.createElement('button');btn.textContent=category;btn.dataset.readCategory=category;
  btn.addEventListener('click',()=>{readingIndex=readingStories.findIndex(s=>s.category===category);readingPage=0;showReading(true)});
  wrap.appendChild(btn);
 }
}
function enterReading(){
 stopReading();playHub.hidden=true;playLayout.hidden=true;readingLayout.hidden=false;
 readingCategoryButtons();showReading(true);
}
document.getElementById('chooseReading').addEventListener('click',enterReading);
document.querySelectorAll('[data-read-age]').forEach(btn=>btn.addEventListener('click',()=>{readingAge=Number(btn.dataset.readAge);showReading(true)}));
document.getElementById('readingSpeak').addEventListener('click',readText);
document.getElementById('readingStop').addEventListener('click',stopReading);
document.getElementById('readingNext').addEventListener('click',()=>{const pages=readingStories[readingIndex].pages.length;if(readingPage<pages-1)readingPage++;else{readingIndex=(readingIndex+1)%readingStories.length;readingPage=0}showReading(true)});
document.getElementById('readingPrev').addEventListener('click',()=>{if(readingPage>0)readingPage--;else{readingIndex=(readingIndex+readingStories.length-1)%readingStories.length;readingPage=readingStories[readingIndex].pages.length-1}showReading(true)});
document.getElementById('homeHub').addEventListener('click',()=>{stopReading();readingLayout.hidden=true});

/* Install guidance: never force a browser switch or silently redirect. */
const appUrl='https://hanjin-bbang.github.io/GongBu/';
const browserHelp=document.getElementById('browserHelp');
const installHint=document.getElementById('qrInstallHint');
let pendingAppInstall=null;
window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();pendingAppInstall=event;installHint.textContent='이 기기에서 앱 설치를 지원해요.'});
window.addEventListener('appinstalled',()=>{pendingAppInstall=null;browserHelp.hidden=true;installHint.textContent='설치가 완료됐어요! 홈 화면에서 열어 주세요.'});
function isStandalone(){return window.matchMedia('(display-mode: standalone)').matches||window.navigator.standalone===true}
function showBrowserHelp(){if(!isStandalone())browserHelp.hidden=false}
document.getElementById('qrInstall').addEventListener('click',async()=>{
 if(isStandalone()){installHint.textContent='이미 앱으로 실행 중이에요.';return}
 if(pendingAppInstall){const prompt=pendingAppInstall;pendingAppInstall=null;await prompt.prompt();return}
 installHint.textContent='Chrome의 ⋮ 메뉴에서 앱 설치 또는 홈 화면에 추가를 선택하세요. 다른 브라우저라면 주소를 복사해 Chrome에서 열어 주세요.';
 showBrowserHelp();
});
document.getElementById('copyAppUrl').addEventListener('click',async()=>{
 try{await navigator.clipboard.writeText(appUrl);document.getElementById('copyAppUrl').textContent='✓ 복사됨'}catch(e){window.prompt('아래 주소를 복사하세요',appUrl)}
});
document.getElementById('dismissBrowserHelp').addEventListener('click',()=>browserHelp.hidden=true);
const agent=navigator.userAgent||'';
if(/Android/i.test(agent)&&!isStandalone()&&!/Chrome\/|CriOS\//i.test(agent)&&!sessionStorage.getItem('browserHelpDismissed')){
 showBrowserHelp();sessionStorage.setItem('browserHelpDismissed','1');
}
