/* Practice case: The Missing Pie. Nothing here relates to the real case. */
(()=>{
const LS='practice-pie-v1';
const LIVE='https://predator.tail66b1e9.ts.net/s/whitcombe';
const FACE='teddy', K='practice';
const SALT='pie-practice|';
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const esc=s=>String(s).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
let st={};try{st=JSON.parse(localStorage.getItem(LS)||'{}')}catch(e){}
st.seen=st.seen||{};st.pins=st.pins||{};st.mmo=st.mmo||{};st.hints=st.hints||0;
st.unl=st.unl||{};st.lab=st.lab||[];st.v3=st.v3||{};st.sup=st.sup||{};
const save=()=>localStorage.setItem(LS,JSON.stringify(st));

async function sha(s){const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(SALT+s));return [...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('').slice(0,24)}
const HASH={lock:'547074241b9266a2b1fe18cb',who:'06fb4f95ecf3f493757c02e9',mot:'761b80d5c37f566a46853aea',mea:'35294ae0eedd890ff890f3fe',opp:'03731a314b09d8144c073843'};

function toast(m){const t=$('#toast');t.textContent=m;t.style.display='block';clearTimeout(toast.t);toast.t=setTimeout(()=>t.style.display='none',2200)}
function syncHead(){const h=$('header.top');if(h){const b=$('.prac-banner');const ht=(h.offsetHeight+(b?b.offsetHeight:0));document.documentElement.style.setProperty('--head',ht+'px')}}
function show(v){$$('#tabs button').forEach(b=>b.classList.toggle('on',b.dataset.v==v));$$('.view').forEach(x=>x.classList.toggle('on',x.id=='v-'+v));window.scrollTo(0,0);
  if(v=='board')renderBoard();if(v=='files')renderFiles();if(v=='accuse')renderAccuse();if(v=='hints')renderHints();if(v=='interview'){renderChips();play('listen',true)}if(v=='tools')renderTool();syncHead();requestAnimationFrame(syncHead)}
$('#tabs').onclick=e=>{const b=e.target.closest('button[data-v]');if(b)show(b.dataset.v)};
addEventListener('resize',syncHead);syncHead();

const T=$$('template[id^="d-"]');const DOCS=T.map(t=>({id:t.id.slice(2),g:t.dataset.g,t:t.dataset.t,el:t}));const NBASE=DOCS.length;
function addDoc(id,title,html,group){if(DOCS.find(d=>d.id==id))return;const t=document.createElement('template');t.id='d-'+id;t.dataset.g=group;t.dataset.t=title;t.innerHTML=html;document.body.appendChild(t);DOCS.push({id,g:group,t:title,el:t})}

const EXTRA={
 L1:['June\'s recipe tin (unlocked)','<div class="doc"><div class="hd"><div><div class="agency">WILLOW BEND HARVEST BAKE-OFF</div>Contents of June Abernathy\'s recipe tin</div><div>Unlocked · 3-digit tin</div></div><p>A worn card is tucked under the blueberry-pie recipe:</p><p class="hand">Blueberry filling stains like ink — purple on paws, blue on tongues, and it never comes out of a beagle. If Pickles gets into my baking again I am telling the whole of Maple Lane. — J.</p><p>The recipe itself is ordinary: flour, butter, sugar, lemon zest, and “too many berries.” A faint purple smear marks the bottom of the tin.</p><p class="foot">Logged after the tin was opened in the practice Evidence Locker. Practice: nothing here relates to the real case.</p></div>'],
 R1:['Lab: filling in the pie tin','<div class="doc"><div class="hd"><div><div class="agency">WILLOW BEND COMMUNITY LAB</div>Request for examination</div><div>R1 · food residue</div></div><p><b>Item:</b> Pie tin from Walt Penrose\'s side yard.</p><p>The residue is cooked blueberry filling (anthocyanin stain, lemon, sugar). The rim has small crescent tooth marks consistent with a medium dog, not a rodent. Filling is still tacky: hours, not days.</p><p class="foot">Practice lab result. Filed as a new exhibit.</p></div>'],
 R2:['Lab: purple porch prints','<div class="doc"><div class="hd"><div><div class="agency">WILLOW BEND COMMUNITY LAB</div>Request for examination</div><div>R2 · stain analysis</div></div><p><b>Item:</b> Swab of purple prints on Walt\'s porch.</p><p>The pigment is blueberry filling (anthocyanin stain, lemon, sugar), not beet juice or paint. Print size and pad pattern are consistent with a beagle.</p><p class="foot">Practice lab result. Filed as a new exhibit.</p></div>'],
 T4:['3D: Blueberry crumbs on the fence post','<div class="doc"><div class="hd"><div><div class="agency">3D WALKTHROUGH</div>Observation logged in the side yard</div><div>T4</div></div><p>At the fence gap, on the yard-facing side of the post and about a beagle\'s nose high, several dark-blue crumbs are stuck to the wood. A few more lie in the grass at the foot of the post.</p><p>They are not in the original photo of the tin. They could only be noticed by walking the yard.</p><p class="foot">Logged from the practice 3D walkthrough. Practice: nothing here relates to the real case.</p></div>'],
 S1:['Supplemental statement: Walt Penrose','<div class="doc"><div class="hd"><div><div class="agency">WILLOW BEND PRACTICE INTERVIEW</div>Supplemental statement</div><div>S1 · 22 Oct</div></div><p>During the interview, Walt Penrose admitted the following:</p><p>While he dozed on the porch around half past two, his beagle Pickles squeezed through the fence gap, pulled June Abernathy\'s pie off the low kitchen windowsill, and ate most of it in the side yard. He woke, found the tin and the purple-mouthed dog, and was too embarrassed to tell June — they have a long tomato-and-ribbon rivalry.</p><p>He offers to make it right with a (store) pie.</p><p class="foot">Auto-filed when Walt\'s answer included the admission. Practice only.</p></div>']
};
function restore(){
  if(st.unl.L1)addDoc('L1',EXTRA.L1[0],EXTRA.L1[1],'Unlocked: evidence locker');
  st.lab.forEach(k=>{const id=LABR[k]&&LABR[k][0];if(id&&EXTRA[id])addDoc(id,EXTRA[id][0],EXTRA[id][1],'Lab results')});
  if(st.v3.T4)addDoc('T4',EXTRA.T4[0],EXTRA.T4[1],'3D walkthrough');
  if(st.sup.S1)addDoc('S1',EXTRA.S1[0],EXTRA.S1[1],'Witness statements');
}

function renderFiles(){const gs=[...new Set(DOCS.map(d=>d.g))];$('#groups').innerHTML=gs.map(g=>`<h4>${g}</h4><div class="files">${DOCS.filter(d=>d.g==g).map(d=>`<button class="folder${st.pins[d.id]?' pinned':''}" data-id="${d.id}"><div class="id">EXHIBIT ${d.id}</div><div class="nm">${d.t}</div>${st.seen[d.id]?'<span class="seen">✓ read</span>':''}</button>`).join('')}</div>`).join('');updPill();renderChips()}
function updPill(){const n=Object.keys(st.seen).filter(k=>DOCS.slice(0,NBASE).some(d=>d.id==k)).length;$('#pill').textContent=st.locked?`Score ${st.score}/100`:`Files read ${n}/${NBASE}`}
$('#groups').onclick=e=>{const f=e.target.closest('.folder');if(f)openDoc(DOCS.findIndex(d=>d.id==f.dataset.id))};
let cur=0;
function openDoc(i){if(i<0)return;cur=(i+DOCS.length)%DOCS.length;const d=DOCS[cur];$('#vtitle').textContent=`${d.id} · ${d.el.dataset.t.replace(/&amp;/g,'&')}`;$('#vbody').innerHTML='';$('#vbody').appendChild(d.el.content.cloneNode(true));
  $('#vbody').querySelectorAll('.photo svg').forEach(s=>{s.style.cursor='zoom-in';s.onclick=()=>{const z=s.dataset.z!='1';s.dataset.z=z?'1':'0';s.style.width=z?'250%':'100%';s.style.cursor=z?'zoom-out':'zoom-in';s.parentElement.style.overflow='auto'}});
  $('#vpin').innerHTML=st.pins[d.id]?'📌<span class="pl"> Unpin</span>':'📌<span class="pl"> Pin</span>';$('#viewer').classList.add('on');$('#viewer').scrollTop=0;document.body.style.overflow='hidden';st.seen[d.id]=1;save();updPill()}
function closeDoc(){$('#viewer').classList.remove('on');document.body.style.overflow='';renderFiles()}
$('#vclose').onclick=closeDoc;$('#vprev').onclick=()=>openDoc(cur-1);$('#vnext').onclick=()=>openDoc(cur+1);
$('#vpin').onclick=()=>{const id=DOCS[cur].id;if(st.pins[id])delete st.pins[id];else st.pins[id]=1;save();$('#vpin').innerHTML=st.pins[id]?'📌<span class="pl"> Unpin</span>':'📌<span class="pl"> Pin</span>';toast(st.pins[id]?'Pinned to board':'Unpinned');renderChips()};
document.addEventListener('keydown',e=>{if(!$('#viewer').classList.contains('on'))return;if(e.key=='Escape')closeDoc();if(e.key=='ArrowRight')openDoc(cur+1);if(e.key=='ArrowLeft')openDoc(cur-1)});

const SUS=[['walt','Walt Penrose'],['pickles','Pickles (the beagle)'],['squirrels','Squirrels']];
function renderBoard(){const sym=['·','✓','✗','?'];$('#mmo tbody').innerHTML=SUS.map(s=>`<tr><td class="nm">${s[1]}</td>${['mo','me','op'].map(c=>{const v=st.mmo[s[0]+c]||0;return `<td><button class="cell" data-k="${s[0]+c}" data-s="${v}">${sym[v]}</button></td>`}).join('')}</tr>`).join('');
  const p=Object.keys(st.pins);$('#pinhelp').style.display=p.length?'none':'block';$('#pins').innerHTML=p.map((id,i)=>{const d=DOCS.find(x=>x.id==id);return d?`<button class="pin" style="--r:${(i%5-2)*1.2}deg" data-id="${id}"><b>${id}</b><br>${d.t}</button>`:''}).join('')}
$('#mmo').onclick=e=>{const b=e.target.closest('.cell');if(!b)return;const v=((st.mmo[b.dataset.k]||0)+1)%4;st.mmo[b.dataset.k]=v;save();renderBoard()};
$('#pins').onclick=e=>{const b=e.target.closest('.pin');if(b)openDoc(DOCS.findIndex(d=>d.id==b.dataset.id))};

const PEN=[5,10,15];
const HINTS=[
  "June left a number in one of the kitchen papers in the case file. It opens something in the Evidence Locker under Tools &amp; Lab.",
  "Walk the side yard in 3D. One thing on the fence is not in the photo file — you can log it as a new exhibit and then show it to Walt.",
  "Walt keeps blaming squirrels and beet juice. Show him the photo of Pickles' blue tongue, or put the fence-post crumbs together with the purple prints. Watch his face when a question makes him uncomfortable — then a confession is auto-filed as a statement."
];
function renderHints(){let h='';for(let i=0;i<3;i++){if(i<st.hints)h+=`<div class="hint"><b>Hint ${i+1}</b> <span class="small">(−${PEN[i]})</span><br>${HINTS[i]}</div>`;else if(i==st.hints&&!st.locked)h+=`<button class="btn ghost" id="hbtn">Unlock hint ${i+1} (−${PEN[i]} points)</button>`}
  if(st.locked&&st.hints<3)h+='<p class="small">This practice case is closed. See the Accuse tab for the reveal.</p>';$('#hintbox').innerHTML=h||'';const b=$('#hbtn');if(b)b.onclick=()=>{if(confirm(`Unlock hint ${st.hints+1}? This costs ${PEN[st.hints]} points.`)){st.hints++;save();renderHints()}}}

const OPT={
  who:[['pickles','Pickles the beagle ate the pie, and Walt hid it afterward'],['walt','Walt Penrose took the pie off the sill himself'],['june','June Abernathy hid her own pie'],['squirrels','Squirrels dragged the tin into the yard']],
  mot:[['pride','Walt was too embarrassed to tell June, given their tomato-and-ribbon rivalry'],['sabotage','Walt wanted to ruin June\'s bake-off entry on purpose'],['hunger','Walt planned the theft because he was hungry'],['joke','It was a prank June was in on']],
  mea:[['gap','Pickles squeezed through the fence gap and pulled the pie off the low windowsill'],['reach','Walt reached over the fence and lifted the tin'],['squirrel','A squirrel knocked the pie down and dragged it'],['window','Someone came through June\'s window']],
  opp:[['doze','Walt dozed on the porch around 2:30, leaving Pickles unsupervised'],['water','It happened while Walt was watering tomatoes, in full view'],['night','It happened after dark, long after the pie was gone'],['morning','June moved the tin herself at 3:00']]
};
const EVG={
  mot:{groups:[[8,['L1','S1']],[7,['C1']]],extra:['N1']},
  mea:{groups:[[8,['T4']],[7,['T1','L1']]],extra:['R1']},
  opp:{groups:[[8,['T3','S1']],[7,['T2','R2']]],extra:['R1','C1']}
};

function renderAccuse(){const w=$('#accwrap');if(st.locked){w.innerHTML=st.result+`<div class="reveal" style="margin-top:16px"><h3>What happened</h3><p>Pickles, Walt's beagle, squeezed through the fence gap while Walt dozed around half past two, pulled June's blueberry pie off the low kitchen windowsill, and ate it in the side yard. Walt woke, saw the tin and the purple-mouthed dog, and was too embarrassed to tell June because of their long rivalry at the bake-off.</p><p>You could prove it with the case photos, the crumbs logged in the 3D yard, a lab result that the prints were blueberry filling (not beet juice), the note in June's recipe tin, and Walt's own admission once you showed him the right exhibit.</p><p class="foot" style="color:#655c4e">Practice: nothing here relates to the real case. Reset below to try again, or go back to the real case when you're ready.</p></div><p style="margin-top:18px"><button class="btn ghost" id="resetall">Reset this practice on this device</button></p>`;
  $('#resetall').onclick=()=>{if(confirm('Erase practice progress, notes, and the accusation on this device?')){localStorage.removeItem(LS);localStorage.removeItem('practice-sid');location.reload()}};return}
  const radio=(n,arr)=>arr.map(o=>`<label class="opt"><input type="radio" name="${n}" value="${o[0]}">${o[1]}</label>`).join('');
  const ev=n=>`<div class="small" style="margin-top:10px">Key evidence: pick up to 4 exhibits that prove it. Lab results, unlocked papers, and 3D observations count. Wrong picks cost points.</div><div class="evpick" data-n="${n}">${DOCS.map(d=>`<label><input type="checkbox" value="${d.id}"> ${d.id} · ${d.t}</label>`).join('')}</div>`;
  w.innerHTML=`<p class="lede">One shot, same shape as the real case: who, why, and how, plus opportunity, and cite evidence for each. Scored out of 100${st.hints?`, minus ${[0,5,15,30][st.hints]} for hints used`:''}. This is only the missing-pie story.</p>
  <form class="acc" id="acc"><fieldset><legend>1 · Who did it</legend>${radio('who',OPT.who)}</fieldset>
  <fieldset><legend>2 · Motive (why Walt hid it)</legend>${radio('mot',OPT.mot)}${ev('mot')}</fieldset>
  <fieldset><legend>3 · Means (how the pie was taken)</legend>${radio('mea',OPT.mea)}${ev('mea')}</fieldset>
  <fieldset><legend>4 · Opportunity (when)</legend>${radio('opp',OPT.opp)}${ev('opp')}</fieldset>
  <button class="btn red" type="submit" style="font-size:16px;padding:14px 22px">Lock in accusation</button></form>`;
  $$('.evpick').forEach(p=>p.onchange=e=>{const c=p.querySelectorAll('input:checked');if(c.length>4){e.target.checked=false;toast('Max 4 exhibits per category')}});
  $('#acc').onsubmit=async e=>{e.preventDefault();const f=new FormData(e.target);const a={who:f.get('who'),mot:f.get('mot'),mea:f.get('mea'),opp:f.get('opp')};if(!a.who||!a.mot||!a.mea||!a.opp){toast('Answer all four parts first');return}
    const evs={};$$('.evpick').forEach(p=>evs[p.dataset.n]=[...p.querySelectorAll('input:checked')].map(i=>i.value));
    if(Object.values(evs).some(v=>!v.length)){toast('Cite at least one exhibit for each of motive, means, opportunity');return}
    if(!confirm('Lock in this accusation? You cannot change it.'))return;
    let rows=[],tot=0;
    const lab=(k,v)=>(OPT[k].find(o=>o[0]==v)||[,''])[1];
    const okWho=(await sha('who|'+a.who))==HASH.who;const pw=okWho?25:0;tot+=pw;rows.push(['Who',lab('who',a.who),okWho,pw,25]);
    for(const c of ['mot','mea','opp']){const ok=(await sha(c+'|'+a[c]))==HASH[c];const p1=ok?10:0;
      let p2=0;const g=EVG[c];const hit=new Set();let wrong=0;
      evs[c].forEach(id=>{let inG=false;g.groups.forEach((gr,gi)=>{if(gr[1].includes(id)){inG=true;hit.add(gi)}});if(!inG&&!g.extra.includes(id))wrong++});
      hit.forEach(gi=>p2+=g.groups[gi][0]);p2=Math.max(0,p2-3*wrong);const mx=g.groups.reduce((s,x)=>s+x[0],0);
      const nm={mot:'Motive',mea:'Means',opp:'Opportunity'}[c];rows.push([nm,lab(c,a[c]),ok,p1,10]);rows.push([nm+': evidence',evs[c].join(', '),p2==mx?true:(p2>0?null:false),p2,mx]);tot+=p1+p2}
    const pen=[0,5,15,30][st.hints];const final=Math.max(0,tot-pen);
    const rank=final>=90?'Chief of Detectives':final>=75?'Lead Detective':final>=55?'Detective, Second Grade':final>=35?'Rookie Investigator':'Back to Traffic Duty';
    st.score=final;st.locked=1;
    st.result=`<div class="reveal"><div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px"><div><div class="small" style="color:#665">FINAL SCORE</div><div class="big">${final}<span style="font-size:20px;color:#555">/100</span></div><div style="font-family:'Special Elite';font-size:20px">${rank}</div></div><div class="stamp" style="position:static;transform:rotate(-6deg)">${okWho?'CASE CLOSED':'WRONG CULPRIT'}</div></div>
    <table class="scoretbl" style="margin-top:12px;width:100%;font-size:13.5px">${rows.map(r=>`<tr><td><b>${r[0]}</b></td><td>${r[1]}</td><td>${r[2]===true?'✅':r[2]===null?'🟡':'❌'}</td><td style="text-align:right">${r[3]}/${r[4]}</td></tr>`).join('')}${pen?`<tr><td><b>Hints used</b></td><td>${st.hints}</td><td></td><td style="text-align:right">−${pen}</td></tr>`:''}</table></div>`;
    save();updPill();renderAccuse();window.scrollTo(0,0)}}

let tool='locker';
$('#toolnav').onclick=e=>{const b=e.target.closest('button');if(!b)return;tool=b.dataset.t;$$('#toolnav button').forEach(x=>x.classList.toggle('on',x==b));renderTool()};
const LAB_ITEMS=[['tin','Pie tin from the side yard'],['prints','Swab of purple prints on the porch'],['crumbs','Crumbs from the fence post']];
const LAB_TESTS=[['tr','Food residue / stain analysis'],['fp','Fingerprints']];
const LAB_APP={tin:['tr','fp'],prints:['tr'],crumbs:['tr']};
const LABR={'tin|tr':['R1','Lab: filling in the pie tin'],'prints|tr':['R2','Lab: purple porch prints']};
restore();
function crumbsOk(){return !!st.v3.T4}
function renderTool(){const tb=$('#toolbox');
  if(tool=='locker'){const u=st.unl.L1;
    tb.innerHTML=`<div class="lockcard"><div style="font-size:13px;opacity:.8">June's kitchen · recipe tin</div>
      <svg viewBox="0 0 200 110" width="200" style="margin:10px auto;display:block"><rect x="20" y="18" width="160" height="78" rx="10" fill="#8a5a32" stroke="#3a2410" stroke-width="3"/><ellipse cx="100" cy="18" rx="70" ry="12" fill="#6b4424"/><text x="100" y="66" text-anchor="middle" fill="#f3e7c6" font-size="13" font-family="Georgia">JUNE'S RECIPES</text></svg>
      ${u?'<p style="color:#7f7">✓ Opened. See the “Unlocked” folder in Case Files.</p><button class="btn" id="opL1">Open</button>':`<p class="small">A three-digit combination. June wrote the number down somewhere in the case file.</p><div class="dial">${[0,1,2].map(i=>`<input inputmode="numeric" maxlength="1" data-i="${i}" value="0" aria-label="Digit ${i+1}">`).join('')}</div><button class="btn" id="trytin">Try combination</button><div id="cmsg" class="small" style="margin-top:8px"></div>`}</div>`;
    if(u)$('#opL1').onclick=()=>openDoc(DOCS.findIndex(d=>d.id=='L1'));
    if(!u){$$('.dial input').forEach(i=>{i.onfocus=()=>i.select();i.oninput=()=>{i.value=i.value.replace(/\D/g,'').slice(-1);const n=i.nextElementSibling;if(i.value&&n)n.focus()}});
      $('#trytin').onclick=async()=>{const code=$$('.dial input').map(i=>i.value||'0').join('');if(await sha('lock|'+code)==HASH.lock)unlockL1(code);else{$('#cmsg').textContent='The lid doesn\'t budge.'}}}}
  if(tool=='lab'){const left=4-st.lab.length;const items=LAB_ITEMS.filter(i=>i[0]!='crumbs'||crumbsOk());
    tb.innerHTML=`<div class="labform"><div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:6px;border-bottom:2px solid #222;padding-bottom:6px;margin-bottom:10px"><b>WILLOW BEND · REQUEST FOR LABORATORY EXAMINATION</b><span>Requests left: <b>${left}</b>/4</span></div>
    <div class="ltnote"><b>Practice lab.</b> Pick an item and a test. A residue test on the tin or the porch prints is worth filing. Fingerprints may turn up nothing — that still counts as a request, just like the real case. ${crumbsOk()?'The fence-post crumbs are available to test.':'Walk the 3D yard if you want a third item to test.'}</div>
    <label>Item / subject</label><select id="li"><option value="">Choose…</option>${items.map(i=>`<option value="${i[0]}">${i[1]}</option>`).join('')}</select>
    <label>Examination requested</label><select id="lt"><option value="">Choose an item first…</option></select>
    <label>Justification</label><textarea id="lj" rows="2" placeholder="What do you expect this to show?"></textarea>
    <button class="btn red" id="lsub" ${left<=0?'disabled':''}>Submit request</button> <span class="small" style="color:#555">Four requests in this practice. Results become new exhibits.</span></div>
    <div class="labres">${st.lab.slice().reverse().map(r=>{const [it,te]=r.split('|');const x=LABR[r];const inm=(LAB_ITEMS.find(i=>i[0]==it)||[])[1],tn=(LAB_TESTS.find(i=>i[0]==te)||[])[1];return `<div class="hint"><b>${inm}</b> · ${tn}<br>${x?`Result filed as exhibit <b>${x[0]}</b>. <button class="btn ghost" data-o="${x[0]}" style="padding:3px 10px;font-size:12px">Open</button>`:'No probative findings for this examination.'}</div>`}).join('')}</div>`;
    tb.querySelectorAll('[data-o]').forEach(b=>b.onclick=()=>openDoc(DOCS.findIndex(d=>d.id==b.dataset.o)));
    $('#li').onchange=()=>{const it=$('#li').value,ok=LAB_APP[it]||[];$('#lt').innerHTML='<option value="">Choose…</option>'+LAB_TESTS.map(t=>{const on=ok.includes(t[0]),done=st.lab.includes(it+'|'+t[0]);return `<option value="${t[0]}" ${on&&!done?'':'disabled'}>${t[1]}${on?(done?' (already done)':''):' (n/a for this item)'}</option>`}).join('')};
    $('#lsub').onclick=()=>{const k=$('#li').value+'|'+$('#lt').value;if(!$('#li').value||!$('#lt').value){toast('Choose an item and an examination');return}if(st.lab.includes(k)){toast('Already requested');return}
      if(!(LAB_APP[$('#li').value]||[]).includes($('#lt').value)){toast('That examination does not apply to this item');return}
      st.lab.push(k);const x=LABR[k];if(x)addDoc(x[0],EXTRA[x[0]][0],EXTRA[x[0]][1],'Lab results');save();renderTool();renderChips();toast(x?'Result received: exhibit '+x[0]:'No probative findings')}}
  if(tool=='yard'){const n=st.v3.T4?1:0;
    tb.innerHTML=`<div class="panel"><b style="color:#f3e7c6">June's windowsill &amp; side yard (3D)</b> <span class="small">A short walk-around of the practice scene. Drag to look around, pinch or scroll to zoom, tap objects to inspect. A few things can only be noticed in the yard itself and can be logged as new exhibits.</span>
    <div style="margin:12px 0"><button class="btn" id="go3d" style="padding:10px 16px;font-size:15px">🧊 Enter the side yard</button></div>
    <div class="small">Observations logged: ${n}${n?' (T4)':''}. Needs WebGL; works on phones.</div>
    <p class="small" style="margin-top:8px">Practice: nothing here relates to the real case.</p></div>`;
    $('#go3d').onclick=open3D}
}
function unlockL1(code){st.unl.L1=code;save();addDoc('L1',EXTRA.L1[0],EXTRA.L1[1],'Unlocked: evidence locker');toast('Unlocked!');renderTool();renderChips();openDoc(DOCS.findIndex(d=>d.id=='L1'))}

function open3D(){if($('#s3d'))return;const o=document.createElement('div');o.id='s3d';o.innerHTML='<iframe src="yard3d.html" title="Practice 3D yard" allow="fullscreen"></iframe>';document.body.appendChild(o);document.body.style.overflow='hidden'}
function close3D(){const o=$('#s3d');if(o)o.remove();document.body.style.overflow='';if(tool=='yard')renderTool();renderChips()}
window.addEventListener('message',e=>{if(e.origin!==location.origin)return;const m=e.data;if(!m||m.src!=='practice3d')return;
  if(m.t=='close')close3D();
  if(m.t=='obs'&&m.id=='T4'){const n=!st.v3.T4;st.v3.T4=1;addDoc('T4',EXTRA.T4[0],EXTRA.T4[1],'3D walkthrough');st.pins.T4=1;save();toast(n?'New exhibit T4 logged and pinned':'Already logged: T4');renderChips()}});
window.__practice={hasObs:id=>!!st.v3[id]};

const CHIP_LABEL={C1:'June\'s complaint',N1:'Kitchen notepad',T1:'Tin by the fence',T2:'Purple paw prints',T3:'Pickles, close up',T4:'Blueberry crumbs on the fence post',L1:'June\'s recipe tin',R1:'Lab: tin filling',R2:'Lab: porch prints',S1:'Walt\'s statement'};
function renderChips(){const box=$('#evchips');if(!box)return;const list=[...DOCS].sort((a,b)=>((st.pins[b.id]?1:0)-(st.pins[a.id]?1:0)));
  box.innerHTML=list.map(d=>{const t=CHIP_LABEL[d.id]||d.t;return `<button type="button" class="chip${st.pins[d.id]?' pinned':''}" data-ex="${d.id}" data-t="${esc(d.t)}" title="${esc(d.t)}"><b>${d.id}</b> ${esc(t)}</button>`}).join('');
  box.querySelectorAll('button').forEach(b=>b.onclick=()=>ask('',b.dataset.ex,b.dataset.t,'[shows] '+b.dataset.t))}

// ---- interview (same live endpoint and portrait system) ----
let sid=localStorage.getItem('practice-sid');if(!sid){sid='practice-'+crypto.getRandomValues(new Uint32Array(2)).join('');localStorage.setItem('practice-sid',sid)}
let voice=localStorage.getItem('practice-voice')!=='0';
const vb=$('#vox');
const setVB=()=>{if(!vb)return;vb.innerHTML=voice?'🔊 <span class="lbl">Voice</span>':'🔈 <span class="lbl">Voice</span>';vb.setAttribute('aria-pressed',voice?'true':'false')};
setVB();if(vb)vb.onclick=()=>{voice=!voice;localStorage.setItem('practice-voice',voice?'1':'0');setVB();if(!voice)stopAudio()};
const help=$('#ivhelp'),pop=$('#help-pop');
if(help)help.onclick=()=>{const on=pop.hidden;pop.hidden=!on;help.setAttribute('aria-expanded',on?'true':'false')};
$('#ivreset')&&($('#ivreset').onclick=()=>{if(confirm('Start the interview over? Your case-file progress is kept.')){localStorage.removeItem('practice-sid');location.hash='interview';location.reload()}});

$('#still').src='../img/'+FACE+'.jpg';const V=[$('#v0'),$('#v1')];let curV=0,clip='';
const src=n=>'../vid/'+FACE+'-'+n+'.mp4';
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
function play(n,loop){if(reduce||!$('#v0'))return Promise.resolve();return new Promise(res=>{const nx=V[1-curV];nx.loop=!!loop;nx.onended=loop?null:()=>res();nx.src=src(n);nx.currentTime=0;nx.play().then(()=>{nx.classList.add('on');V[curV].classList.remove('on');V[curV].pause();curV=1-curV;clip=n;if(loop)res()}).catch(()=>res())})}
play('listen',true);
let audio=null,gen=0;function stopAudio(){gen++;if(audio){audio.pause();audio=null}speechSynthesis&&speechSynthesis.cancel()}
const sents=t=>(t.match(/[^.!?…]+(?:[.!?…]+|$)/g)||[]).map(x=>x.trim()).filter(Boolean);
async function say(text){if(!voice)return;const g=++gen;for(const s of sents(text)){if(g!=gen)return;try{const r=await fetch(LIVE+'/api/tts',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({character:K,text:s})});if(!r.ok)throw 0;const b=await r.blob();if(g!=gen)return;audio=new Audio(URL.createObjectURL(b));await new Promise(res=>{audio.onended=res;audio.onerror=res;audio.play().catch(res)})}catch(e){if('speechSynthesis' in window){await new Promise(res=>{const u=new SpeechSynthesisUtterance(s);u.onend=res;u.onerror=res;speechSynthesis.speak(u)})}}}}
function fmt(t){t=String(t||'').trim();const out=[];let last=0;t.replace(/\*([^*]+)\*/g,(m,x,i)=>{out.push(['s',t.slice(last,i)]);out.push(['n',x]);last=i+m.length});out.push(['s',t.slice(last)]);
  return out.map(([w,x])=>{x=x.replace(/^[\s“”"]+|[\s“”"]+$/g,'');return !x?'':w=='n'?`<i class="sd">${esc(x)}</i>`:'“'+esc(x)+'”'}).filter(Boolean).join(' ')}
const speech=t=>String(t).replace(/\*[^*]*\*/g,' ').replace(/[“”"]/g,'').replace(/\s+/g,' ').trim();
const chat=$('#chat');
function add(cls,html){const d=document.createElement('div');d.className=cls;d.innerHTML=html;chat.appendChild(d);chat.scrollTop=chat.scrollHeight;return d}
async function typeOut(el,html,cps){const tmp=document.createElement('div');tmp.innerHTML=html;const full=tmp.textContent;if(reduce){el.innerHTML=html;return}
  el.textContent='';for(let i=0;i<=full.length;i+=2){el.textContent=full.slice(0,i);chat.scrollTop=chat.scrollHeight;await new Promise(r=>setTimeout(r,1000/cps*2))}el.innerHTML=html}
const BEATS=['scratches his chin','glances at the fence','rocks back on his heels','fiddles with a button on his cardigan'];
const ADM=/(pickles|she).{0,90}(ate|eaten|got (into|through)|pulled|stole)|((dozed|napped|asleep).{0,90}(pie|pickles|fence))|(sorry.{0,50}(june|pie|embarrass))|(i('ll| will) (bake|make|buy).{0,40}pie)/i;
let busy=false;
function fileSupp(){if(st.sup.S1)return;st.sup.S1=1;save();addDoc('S1',EXTRA.S1[0],EXTRA.S1[1],'Witness statements');st.pins.S1=1;toast('New exhibit filed: S1 (supplemental statement)');renderChips()}
async function ask(msg,ex,title,label){if(busy)return;busy=true;add('qq'+(ex?' ev':''),esc(label||msg));const el=add('aa','<i class="typing sd">…</i>');let b=0;const ft=setInterval(()=>{el.innerHTML=`<i class="typing sd">${BEATS[b++%4]}…</i>`},1800);
  let j=null;try{for(let t=0;t<2;t++){const r=await fetch(LIVE+'/api/ask',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({session:sid,suspect:K,message:msg||'',present:ex||undefined,present_title:title||undefined})});
    j=await r.json().catch(()=>({}));if(r.status==429&&t==0){el.innerHTML='<i class="typing sd">Give him a moment…</i>';await new Promise(s=>setTimeout(s,Math.min(15,Math.max(2,+j.retry_after||5))*1000));continue}if(!r.ok)throw new Error(j.error||'error');break}}
  catch(e){clearInterval(ft);el.innerHTML='<i class="sd">Walt needs a moment. Ask that again in a few seconds.</i>';busy=false;return}
  clearInterval(ft);const html=fmt(j.reply),mood=['uneasy','sad'].includes(j.mood)?j.mood:'neutral';
  if(mood!='neutral')await play(mood,false);$('#pv').classList.add('talking');play('talk',true);
  await Promise.all([typeOut(el,html,voice?18:45),say(speech(j.reply))]);$('#pv').classList.remove('talking');play('listen',true);busy=false;
  if(ex==='T3'||ADM.test(j.reply||''))fileSupp()}
$('#f').onsubmit=e=>{e.preventDefault();const q=$('#q').value.trim();if(!q)return;$('#q').value='';ask(q)};
renderChips();
const SR=window.SpeechRecognition||window.webkitSpeechRecognition;const mic=$('#mic');
if(!SR){if(mic)mic.style.display='none'}else{
  let rec=null,recOn=false,recSticky=false,recT0=0;
  const hint=$('#listen-hint');
  const micUI=()=>{mic.classList.toggle('rec',recOn);mic.setAttribute('aria-pressed',recOn?'true':'false');if(hint){hint.hidden=!recOn;hint.classList.toggle('on',recOn)}};
  const micStart=()=>{if(recOn||!SR)return;try{rec=new SR();rec.lang='en-US';rec.interimResults=true;rec.continuous=false;rec.maxAlternatives=1;
    rec.onresult=ev=>{$('#q').value=[...ev.results].map(r=>r[0].transcript).join(' ')};
    rec.onend=()=>{if(!recOn)return;recOn=false;recSticky=false;rec=null;micUI();if($('#q').value){$('#q').focus();toast('Check the words, then tap Ask')}};
    rec.onerror=e=>{const err=e&&e.error;if(err=='aborted'||(err=='no-speech'&&!recSticky))return;toast(err=='not-allowed'||err=='service-not-allowed'?'Microphone is blocked. Allow mic access for this site to ask out loud.':err=='no-speech'?'Didn\'t hear anything. Hold 🎙 and speak, or tap 🎙 to start.':'Voice input hiccup: '+err)};
    rec.start();recOn=true;recT0=Date.now();micUI()}catch(e){recOn=false;micUI();toast((e&&e.name)=='NotAllowedError'?'Microphone is blocked. Allow mic access for this site to ask out loud.':'Voice input isn\'t available in this browser.')}};
  const micStop=()=>{try{if(rec&&recOn)rec.stop()}catch(e){}};
  mic.addEventListener('pointerdown',e=>{e.preventDefault();try{mic.setPointerCapture(e.pointerId)}catch(_){ }if(recOn){micStop();return}micStart();recSticky=false});
  mic.addEventListener('pointerup',()=>{if(!recOn)return;if(Date.now()-recT0<400){recSticky=true;toast('Listening… tap 🎙 again when you\'re done')}else micStop()});
  mic.addEventListener('pointercancel',()=>{if(recOn&&!recSticky)micStop()});
  mic.addEventListener('contextmenu',e=>e.preventDefault());
}
fetch(LIVE+'/health').then(r=>r.json()).then(h=>{$('#stat').textContent=h.practice?'Live interview connected. Walt answers in his own words.':'The practice suspect is not installed on the server yet.'}).catch(()=>{$('#stat').innerHTML='Can\'t reach the interview room. Turn on Tailscale on this device, then reload.'});

show((location.hash||'').replace('#','')||'brief');
window.__practiceApp={show,openDoc,open3D,unlockL1,st,DOCS,toast,ask,fileSupp,renderTool,renderFiles,renderAccuse,renderHints,renderBoard,toolSet:t=>{tool=t;$$('#toolnav button').forEach(x=>x.classList.toggle('on',x.dataset.t==t));renderTool()}};
})();
