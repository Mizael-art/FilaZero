import { useState, useEffect, useRef, useCallback, createContext, useContext } from "react";

const G = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Urbanist:wght@400;500;600;700;800;900&family=DM+Sans:wght@400;500;600&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    :root{
      --bg:#05070F;--bg2:#080B18;--bg3:#0C1020;
      --cyan:#00D4FF;--purple:#8B3DFF;--violet:#6B21FF;
      --pink:#D946EF;--white:#fff;--green:#00F5A0;
      --red:#FF4060;--amber:#FFB800;--muted:#4A5570;
      --card:rgba(255,255,255,0.035);--border:rgba(255,255,255,0.07);
    }
    html{scroll-behavior:smooth}
    body{font-family:'DM Sans',sans-serif;background:var(--bg);color:#fff;overflow-x:hidden}
    h1,h2,h3,h4{font-family:'Urbanist',sans-serif}
    ::-webkit-scrollbar{width:4px}
    ::-webkit-scrollbar-thumb{background:var(--purple);border-radius:4px}
    input,select{font-family:'DM Sans',sans-serif;color:#fff}
    input::placeholder{color:var(--muted)}
    input:focus,select:focus{outline:none;border-color:rgba(0,212,255,.5)!important;box-shadow:0 0 0 3px rgba(0,212,255,.1)}
    option{background:#0C1020}

    @keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
    @keyframes fadeIn{from{opacity:0}to{opacity:1}}
    @keyframes slideR{from{opacity:0;transform:translateX(32px)}to{opacity:1;transform:translateX(0)}}
    @keyframes blink{0%,100%{opacity:1}50%{opacity:.2}}
    @keyframes spin{to{transform:rotate(360deg)}}
    @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
    @keyframes scanLine{0%{top:0;opacity:1}100%{top:100%;opacity:0}}
    @keyframes cornerBlink{0%,100%{opacity:.5}50%{opacity:1}}
    @keyframes ripple{0%{transform:scale(1);opacity:.5}100%{transform:scale(3.5);opacity:0}}
    @keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
    @keyframes callPulse{0%,100%{transform:scale(1)}20%,60%{transform:scale(1.06)}40%{transform:scale(.95)}}
    @keyframes wave{0%,100%{height:4px}50%{height:24px}}
    @keyframes cyanGlow{0%,100%{box-shadow:0 0 20px rgba(0,212,255,.3),0 0 60px rgba(0,212,255,.1)}50%{box-shadow:0 0 50px rgba(0,212,255,.7),0 0 120px rgba(0,212,255,.25)}}
    @keyframes purpleGlow{0%,100%{box-shadow:0 0 20px rgba(139,61,255,.3)}50%{box-shadow:0 0 60px rgba(139,61,255,.7),0 0 110px rgba(139,61,255,.25)}}
    @keyframes neonBorder{0%,100%{border-color:rgba(0,212,255,.3)}50%{border-color:rgba(0,212,255,.9)}}
    @keyframes particleUp{0%{transform:translateY(100vh) scale(0);opacity:0}10%{opacity:.7}90%{opacity:.7}100%{transform:translateY(-60px) scale(1.2);opacity:0}}
    @keyframes energyFlow{0%{background-position:0% 50%}100%{background-position:200% 50%}}
    @keyframes waveAnim{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
    @keyframes hexFloat{0%,100%{transform:translateY(0) rotate(0deg);opacity:.05}50%{transform:translateY(-22px) rotate(180deg);opacity:.13}}
    @keyframes phoneSpin{0%,100%{transform:perspective(800px) rotateY(-8deg) rotateX(4deg)}50%{transform:perspective(800px) rotateY(-14deg) rotateX(2deg)}}
    @keyframes beamFlow{0%{opacity:.3;transform:scaleX(.8)}50%{opacity:.8;transform:scaleX(1.1)}100%{opacity:.3;transform:scaleX(.8)}}
    @keyframes orbPulse{0%,100%{transform:scale(1);opacity:.6}50%{transform:scale(1.15);opacity:1}}
    @keyframes slideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}

    .up{animation:fadeUp .7s cubic-bezier(.22,1,.36,1) forwards}
    .in{animation:fadeIn .45s ease both}
    .float{animation:float 6s ease-in-out infinite}
    .phone-float{animation:phoneSpin 7s ease-in-out infinite}
    .cglow{animation:cyanGlow 2.5s ease-in-out infinite}
    .pglow{animation:purpleGlow 2.5s ease-in-out infinite}

    .glass{background:rgba(255,255,255,.035);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.07)}
    .glass-cyan{background:rgba(0,212,255,.055);backdrop-filter:blur(20px);border:1px solid rgba(0,212,255,.22)}
    .glass-purple{background:rgba(139,61,255,.06);backdrop-filter:blur(20px);border:1px solid rgba(139,61,255,.22)}
    .glass-dark{background:rgba(5,7,15,.85);backdrop-filter:blur(30px);border:1px solid rgba(255,255,255,.08)}

    .btn-neon{background:linear-gradient(135deg,#8B3DFF,#00D4FF);color:#fff;border:none;border-radius:16px;padding:18px 44px;font-family:'Urbanist',sans-serif;font-weight:800;font-size:17px;cursor:pointer;transition:all .25s cubic-bezier(.22,1,.36,1);box-shadow:0 0 30px rgba(0,212,255,.35),0 0 70px rgba(139,61,255,.2),0 8px 32px rgba(0,0,0,.4);letter-spacing:.3px;position:relative;overflow:hidden}
    .btn-neon::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(255,255,255,.15),transparent);opacity:0;transition:opacity .25s}
    .btn-neon:hover{transform:translateY(-4px) scale(1.02);box-shadow:0 0 60px rgba(0,212,255,.55),0 0 110px rgba(139,61,255,.35),0 12px 40px rgba(0,0,0,.5)}
    .btn-neon:hover::before{opacity:1}
    .btn-neon:active{transform:translateY(0) scale(.99)}
    .btn-outline{background:transparent;color:rgba(255,255,255,.65);border:1px solid rgba(255,255,255,.13);border-radius:14px;padding:13px 26px;font-family:'Urbanist',sans-serif;font-weight:600;font-size:14px;cursor:pointer;transition:all .22s}
    .btn-outline:hover{border-color:var(--cyan);color:var(--cyan);background:rgba(0,212,255,.06)}

    .step-card{position:relative;overflow:hidden;transition:all .3s cubic-bezier(.22,1,.36,1)}
    .step-card::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(0,212,255,.04),rgba(139,61,255,.04));opacity:0;transition:opacity .3s}
    .step-card:hover{transform:translateY(-6px);border-color:rgba(0,212,255,.4)!important}
    .step-card:hover::before{opacity:1}
  `}</style>
);

// ─── DATA ─────────────────────────────────────────────────────────────────────
const LUGARES = [
  {id:"bb",    nome:"Banco do Brasil",       icon:"🏦",tipo:"Banco",         cor:"#00D4FF",tipos:["Abertura de Conta","Empréstimo","Cartão de Crédito","Investimentos","Caixa","Gerente"]},
  {id:"itau",  nome:"Itaú Unibanco",         icon:"🏦",tipo:"Banco",         cor:"#FF6B00",tipos:["Abertura de Conta","Empréstimo","Cartão","Atendimento Geral"]},
  {id:"rest",  nome:"Restaurante Sabor Real", icon:"🍽",tipo:"Restaurante",  cor:"#FF4060",tipos:["Mesa p/ 1","Mesa p/ 2","Mesa p/ 4","Mesa p/ 6+","Balcão","Retirada"]},
  {id:"barb",  nome:"Barbearia Apex",         icon:"✂️",tipo:"Barbearia",   cor:"#8B3DFF",tipos:["Corte Simples","Corte + Barba","Barba Completa","Progressiva","Coloração"]},
  {id:"det",   nome:"DETRAN-SP",              icon:"🚗",tipo:"Órgão Público",cor:"#00F5A0",tipos:["CNH Renovação","1ª Habilitação","Licenciamento","Transferência","Multas"]},
  {id:"cor",   nome:"Correios",               icon:"📬",tipo:"Correios",     cor:"#FFB800",tipos:["Envio","Retirada","SEDEX","PAC","Registrado","Atendimento"]},
  {id:"cart",  nome:"Cartório 1º Ofício",     icon:"📋",tipo:"Cartório",     cor:"#10D9A8",tipos:["Escritura","Registro","Certidão","Reconhecimento de Firma","Autenticação"]},
  {id:"farm",  nome:"Farmácia Popular",       icon:"💊",tipo:"Farmácia",     cor:"#00F5A0",tipos:["Medicamentos","Vacinas","Aferição","Testes Rápidos"]},
];

const NOMES=["Ana Lima","Carlos Souza","Fernanda Rocha","João Pedro","Mariana Costa","Rafael Mendes","Isabela Ferreira","Bruno Alves","Patrícia Gomes","Thiago Santos","Camila Oliveira","Lucas Barbosa","Juliana Neves","Diego Carvalho","Bianca Ribeiro","Marcos Vieira","Amanda Pereira","Rodrigo Andrade","Letícia Moraes","Felipe Castro"];
const GUICHES=["Guichê 01","Guichê 02","Guichê 03","Mesa A","Mesa B","Caixa 1","Caixa 2","Balcão"];

const rng=(a,b)=>Math.floor(Math.random()*(b-a+1))+a;
const pick=a=>a[rng(0,a.length-1)];
let counter=rng(40,80);
const mkTicket=()=>{counter++;return`T-${String(counter).padStart(3,"0")}`;};
const mkQueue=(n=12)=>Array.from({length:n},(_,i)=>({
  id:Math.random().toString(36).slice(2),ticket:mkTicket(),nome:pick(NOMES),
  tipo:pick(LUGARES[0].tipos),status:i===0?"em_atendimento":i===1?"proximo":"aguardando",
  guiche:i===0?pick(GUICHES):null,entrou:Date.now()-rng(2,40)*60000,
  prioridade:Math.random()>.82?"preferencial":"normal",
}));

// ─── CONTEXT ──────────────────────────────────────────────────────────────────
const Ctx=createContext(null);
const useApp=()=>useContext(Ctx);

const Provider=({children})=>{
  const[queue,setQ]=useState(mkQueue(13));
  const[history,setH]=useState([]);
  const[myTicket,setMy]=useState(null);
  const[lugar,setLugar]=useState(null);
  const[toasts,setToasts]=useState([]);
  const[stats,setStats]=useState({hoje:rng(88,120),total:rng(1200,1400),tempo:rng(6,10),satisf:97});
  const tick=useRef(0);

  const toast=useCallback((msg,type="info")=>{
    const id=Date.now();setToasts(t=>[...t,{id,msg,type}]);
    setTimeout(()=>setToasts(t=>t.filter(x=>x.id!==id)),4200);
  },[]);

  useEffect(()=>{
    const iv=setInterval(()=>{
      tick.current++;const t=tick.current;
      setQ(prev=>{
        let q=[...prev];
        if(t%8===0)q=[...q,{id:Math.random().toString(36).slice(2),ticket:mkTicket(),nome:pick(NOMES),tipo:pick(LUGARES[0].tipos),status:"aguardando",guiche:null,entrou:Date.now(),prioridade:Math.random()>.85?"preferencial":"normal"}];
        if(t%12===0&&q.length>2){
          const em=q.find(x=>x.status==="em_atendimento");
          if(em){setH(h=>[{...em,status:"concluido"},...h.slice(0,20)]);setStats(s=>({...s,total:s.total+1,hoje:s.hoje+1}));q=q.filter(x=>x.id!==em.id);}
          q=q.map((p,i)=>({...p,status:i===0?"em_atendimento":i===1?"proximo":"aguardando",guiche:i===0?(p.guiche||pick(GUICHES)):null}));
          if(q[0])toast(`${q[0].ticket} — chamado para ${q[0].guiche}`,"success");
        }
        q=q.map((p,i)=>({...p,status:i===0?"em_atendimento":i===1?"proximo":"aguardando",guiche:i===0?(p.guiche||pick(GUICHES)):null}));
        return q;
      });
      if(t%20===0)setStats(s=>({...s,tempo:Math.max(4,s.tempo+(Math.random()>.5?.4:-.3))}));
    },1000);
    return()=>clearInterval(iv);
  },[toast]);

  const joinQueue=useCallback((nome,tipo,prioridade)=>{
    const ticket=mkTicket();
    const e={id:Math.random().toString(36).slice(2),ticket,nome,tipo,status:"aguardando",guiche:null,entrou:Date.now(),prioridade};
    setQ(p=>[...p,e]);setMy(e);
    toast(`Você entrou na fila! Senha: ${ticket}`,"success");
    return e;
  },[toast]);

  const getPos=useCallback(()=>{
    if(!myTicket)return null;
    const i=queue.findIndex(q=>q.id===myTicket.id);
    return i===-1?null:i;
  },[myTicket,queue]);

  return <Ctx.Provider value={{queue,history,myTicket,lugar,setLugar,toasts,joinQueue,getPos,stats}}>{children}</Ctx.Provider>;
};

// ─── CINEMATIC BACKGROUND ─────────────────────────────────────────────────────
const CinematicBG = () => {
  return (
    <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,overflow:"hidden"}}>
      {/* Deep space base */}
      <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse 120% 80% at 50% 0%,rgba(15,8,40,.9) 0%,#05070F 60%)"}}/>

      {/* Primary orb — top left cyan */}
      <div style={{position:"absolute",top:"-20%",left:"-10%",width:900,height:900,borderRadius:"50%",background:"radial-gradient(circle,rgba(0,212,255,.14) 0%,rgba(0,100,200,.06) 40%,transparent 70%)",filter:"blur(60px)",animation:"orbPulse 6s ease-in-out infinite"}}/>
      {/* Secondary orb — right purple */}
      <div style={{position:"absolute",top:"10%",right:"-10%",width:800,height:800,borderRadius:"50%",background:"radial-gradient(circle,rgba(139,61,255,.16) 0%,rgba(80,20,180,.07) 40%,transparent 70%)",filter:"blur(70px)",animation:"orbPulse 8s 2s ease-in-out infinite"}}/>
      {/* Bottom accent */}
      <div style={{position:"absolute",bottom:"-10%",left:"20%",width:700,height:500,borderRadius:"50%",background:"radial-gradient(circle,rgba(139,61,255,.1) 0%,rgba(0,212,255,.06) 50%,transparent 70%)",filter:"blur(80px)"}}/>

      {/* Animated wave layers — the key effect from images */}
      <svg style={{position:"absolute",bottom:0,left:0,right:0,width:"200%",height:"45%",opacity:.5,animation:"waveAnim 18s linear infinite"}} viewBox="0 0 2400 400" preserveAspectRatio="none">
        <defs>
          <linearGradient id="wg1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(0,212,255,0)"/>
            <stop offset="20%" stopColor="rgba(0,212,255,.5)"/>
            <stop offset="50%" stopColor="rgba(139,61,255,.6)"/>
            <stop offset="80%" stopColor="rgba(0,212,255,.4)"/>
            <stop offset="100%" stopColor="rgba(0,212,255,0)"/>
          </linearGradient>
          <linearGradient id="wg2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(139,61,255,0)"/>
            <stop offset="30%" stopColor="rgba(139,61,255,.4)"/>
            <stop offset="60%" stopColor="rgba(0,212,255,.5)"/>
            <stop offset="100%" stopColor="rgba(139,61,255,0)"/>
          </linearGradient>
        </defs>
        <path d="M0,280 C200,200 400,360 600,260 C800,160 1000,320 1200,240 C1400,160 1600,300 1800,220 C2000,140 2200,280 2400,200 L2400,400 L0,400Z" fill="url(#wg1)" opacity=".6"/>
        <path d="M0,320 C300,240 500,380 700,300 C900,220 1100,360 1300,280 C1500,200 1700,340 1900,260 C2100,180 2300,320 2400,240 L2400,400 L0,400Z" fill="url(#wg2)" opacity=".4"/>
      </svg>

      {/* Wave layer 2 — faster, different phase */}
      <svg style={{position:"absolute",bottom:0,left:0,right:0,width:"200%",height:"30%",opacity:.35,animation:"waveAnim 12s linear infinite reverse"}} viewBox="0 0 2400 300" preserveAspectRatio="none">
        <path d="M0,200 C400,120 600,260 900,180 C1200,100 1400,240 1700,160 C2000,80 2200,220 2400,140 L2400,300 L0,300Z" fill="rgba(0,212,255,.3)"/>
      </svg>

      {/* Floating hexagons */}
      {Array.from({length:6},(_,i)=>(
        <div key={i} style={{position:"absolute",left:`${[8,22,52,68,82,38][i]}%`,top:`${[12,58,18,72,32,48][i]}%`,width:[90,65,110,75,55,95][i],height:[90,65,110,75,55,95][i],border:`1px solid rgba(0,212,255,.1)`,borderRadius:10,transform:"rotate(45deg)",animation:`hexFloat ${[9,11,8,13,10,12][i]}s ${i*.8}s ease-in-out infinite`}}/>
      ))}

      {/* Energy particles */}
      {Array.from({length:16},(_,i)=>(
        <div key={i} style={{position:"absolute",bottom:-20,left:`${rng(3,97)}%`,width:rng(1,3),height:rng(8,20),borderRadius:2,background:i%3===0?"var(--cyan)":i%3===1?"var(--purple)":"rgba(217,70,239,.7)",opacity:(rng(2,6))/10,animation:`particleUp ${rng(14,24)}s ${rng(0,10)}s linear infinite`,filter:"blur(.5px)"}}/>
      ))}

      {/* Grid */}
      <div style={{position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(0,212,255,.018) 1px,transparent 1px),linear-gradient(90deg,rgba(0,212,255,.018) 1px,transparent 1px)",backgroundSize:"64px 64px",maskImage:"radial-gradient(ellipse 90% 90% at 50% 50%,black 30%,transparent 100%)"}}/>
    </div>
  );
};

// ─── TOASTS ───────────────────────────────────────────────────────────────────
const Toasts=()=>{
  const{toasts}=useApp();
  return(
    <div style={{position:"fixed",top:22,right:22,zIndex:9999,display:"flex",flexDirection:"column",gap:10,maxWidth:340}}>
      {toasts.map(n=>(
        <div key={n.id} style={{padding:"14px 20px",borderRadius:16,background:"rgba(5,7,15,.97)",backdropFilter:"blur(30px)",border:n.type==="success"?"1px solid rgba(0,245,160,.35)":"1px solid rgba(0,212,255,.35)",display:"flex",alignItems:"center",gap:11,fontSize:14,fontWeight:600,animation:"slideR .4s ease both",boxShadow:n.type==="success"?"0 4px 30px rgba(0,245,160,.2),0 0 0 1px rgba(0,245,160,.08)":"0 4px 30px rgba(0,212,255,.2)"}}>
          <div style={{width:8,height:8,borderRadius:"50%",background:n.type==="success"?"var(--green)":"var(--cyan)",animation:"blink 1s infinite",flexShrink:0,boxShadow:n.type==="success"?"0 0 10px var(--green)":"0 0 10px var(--cyan)"}}/>
          {n.msg}
        </div>
      ))}
    </div>
  );
};

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
const Navbar=({page,setPage})=>{
  const[sc,setSc]=useState(false);
  useEffect(()=>{const fn=()=>setSc(window.scrollY>40);window.addEventListener("scroll",fn);return()=>window.removeEventListener("scroll",fn);},[]);
  return(
    <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:1000,padding:"0 32px",height:68,display:"flex",alignItems:"center",justifyContent:"space-between",background:sc?"rgba(5,7,15,.88)":"transparent",backdropFilter:sc?"blur(28px)":"none",borderBottom:sc?"1px solid rgba(0,212,255,.12)":"none",transition:"all .35s"}}>
      <div onClick={()=>setPage("home")} style={{cursor:"pointer",display:"flex",alignItems:"center",gap:11}}>
        {/* Logo mark */}
        <div style={{width:38,height:38,borderRadius:11,background:"linear-gradient(135deg,#8B3DFF,#00D4FF)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"Urbanist",fontWeight:900,fontSize:18,boxShadow:"0 0 24px rgba(0,212,255,.4),0 0 48px rgba(139,61,255,.2)"}}>F</div>
        <span style={{fontFamily:"Urbanist",fontWeight:900,fontSize:21,letterSpacing:"-.4px"}}>Fila<span style={{background:"linear-gradient(90deg,#8B3DFF,#00D4FF)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Zero</span></span>
      </div>
      <div style={{display:"flex",gap:6}}>
        {[{id:"painel",l:"Painel"},{id:"admin",l:"Admin"}].map(x=>(
          <button key={x.id} onClick={()=>setPage(x.id)} style={{background:page===x.id?"rgba(0,212,255,.1)":"transparent",color:page===x.id?"var(--cyan)":"var(--muted)",border:"1px solid",borderColor:page===x.id?"rgba(0,212,255,.4)":"transparent",borderRadius:10,padding:"7px 16px",cursor:"pointer",fontSize:13,fontWeight:600,fontFamily:"Urbanist",transition:"all .2s"}}>{x.l}</button>
        ))}
      </div>
    </nav>
  );
};

// ─── BADGE ────────────────────────────────────────────────────────────────────
const Badge=({status,small})=>{
  const M={em_atendimento:{l:"Em atendimento",c:"#00D4FF",bg:"rgba(0,212,255,.1)"},proximo:{l:"Próximo",c:"#8B3DFF",bg:"rgba(139,61,255,.1)"},aguardando:{l:"Aguardando",c:"#4A5570",bg:"rgba(74,85,112,.1)"},concluido:{l:"Concluído",c:"#00F5A0",bg:"rgba(0,245,160,.1)"}};
  const s=M[status]||M.aguardando;
  return <span style={{background:s.bg,color:s.c,border:`1px solid ${s.c}40`,borderRadius:small?7:9,padding:small?"3px 9px":"5px 13px",fontSize:small?10:12,fontWeight:700,whiteSpace:"nowrap",boxShadow:`0 0 8px ${s.c}25`}}>{s.l}</span>;
};

// ─── PHONE MOCKUP — cinematic floating ────────────────────────────────────────
const PhoneMockup=({queue})=>{
  const em=queue[0];
  const pos=2;
  return(
    <div style={{position:"relative",width:240,margin:"0 auto"}}>
      {/* Multi-layer glow */}
      <div style={{position:"absolute",inset:-60,background:"radial-gradient(ellipse,rgba(0,212,255,.22) 0%,rgba(139,61,255,.14) 45%,transparent 70%)",filter:"blur(40px)",zIndex:0,animation:"orbPulse 4s ease-in-out infinite"}}/>
      {/* Energy rings */}
      <div style={{position:"absolute",inset:-30,borderRadius:"50%",border:"1px solid rgba(0,212,255,.12)",zIndex:0,animation:"ripple 3s ease-out infinite"}}/>
      <div style={{position:"absolute",inset:-20,borderRadius:"50%",border:"1px solid rgba(139,61,255,.1)",zIndex:0,animation:"ripple 3s 1s ease-out infinite"}}/>

      {/* Phone chassis */}
      <div className="phone-float" style={{position:"relative",zIndex:1,background:"linear-gradient(145deg,#1a1f2e,#0d1018)",borderRadius:40,padding:5,boxShadow:"0 40px 100px rgba(0,0,0,.8),0 0 0 1px rgba(255,255,255,.08) inset,0 0 40px rgba(0,212,255,.08)"}}>
        {/* Side highlights */}
        <div style={{position:"absolute",top:0,left:0,right:0,bottom:0,borderRadius:40,background:"linear-gradient(135deg,rgba(255,255,255,.08) 0%,transparent 40%,transparent 70%,rgba(0,212,255,.04) 100%)",pointerEvents:"none",zIndex:2}}/>

        {/* Dynamic island */}
        <div style={{position:"absolute",top:12,left:"50%",transform:"translateX(-50%)",width:88,height:24,background:"#060810",borderRadius:20,zIndex:10,border:"1px solid rgba(255,255,255,.07)",display:"flex",alignItems:"center",justifyContent:"center",gap:4}}>
          <div style={{width:6,height:6,borderRadius:"50%",background:"rgba(255,255,255,.15)"}}/>
        </div>

        {/* Screen */}
        <div style={{background:"var(--bg)",borderRadius:36,padding:"44px 16px 22px",minHeight:450,overflow:"hidden",position:"relative"}}>
          {/* Status bar */}
          <div style={{display:"flex",justifyContent:"space-between",fontSize:9,color:"rgba(255,255,255,.45)",marginBottom:16,padding:"0 6px"}}>
            <span style={{fontWeight:700}}>9:41</span><span>◼◼◼  ▐▐</span>
          </div>

          {/* App header */}
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20,padding:"0 4px"}}>
            <div style={{display:"flex",alignItems:"center",gap:7}}>
              <div style={{width:22,height:22,borderRadius:7,background:"linear-gradient(135deg,#8B3DFF,#00D4FF)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:900,boxShadow:"0 0 10px rgba(0,212,255,.4)"}}>F</div>
              <span style={{fontFamily:"Urbanist",fontWeight:800,fontSize:14}}>Fila<span style={{background:"linear-gradient(90deg,#8B3DFF,#00D4FF)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Zero</span></span>
            </div>
            <div style={{fontSize:15,filter:"drop-shadow(0 0 6px rgba(0,212,255,.6))"}}>🔔</div>
          </div>

          {/* Main ticket card */}
          <div style={{background:"rgba(0,212,255,.07)",borderRadius:20,padding:"20px 16px",border:"1px solid rgba(0,212,255,.2)",marginBottom:12,textAlign:"center",position:"relative",overflow:"hidden",boxShadow:"0 0 40px rgba(0,212,255,.1) inset"}}>
            {/* Top accent line */}
            <div style={{position:"absolute",top:0,left:0,right:0,height:1.5,background:"linear-gradient(90deg,transparent,rgba(0,212,255,.8),rgba(139,61,255,.8),transparent)"}}/>

            <div style={{fontSize:10,color:"rgba(255,255,255,.45)",fontWeight:700,letterSpacing:2,textTransform:"uppercase",marginBottom:6}}>Próximo na Fila</div>
            <div style={{fontSize:50,fontWeight:900,fontFamily:"Urbanist",letterSpacing:-1.5,background:"linear-gradient(135deg,#8B3DFF,#00D4FF)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",lineHeight:1,animation:"callPulse 3.5s ease-in-out infinite",textShadow:"none",filter:"drop-shadow(0 0 20px rgba(0,212,255,.5))"}}>
              {em?.ticket||"T-042"}
            </div>

            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7,marginTop:14}}>
              {[{l:"Tempo Est.",v:"12min",c:"var(--cyan)"},{l:"Seu Lugar",v:`${pos}°`,c:"white"},{l:"Status",v:"Aguardando",c:"var(--purple)"},{l:"Serviço",v:"Consulta",c:"rgba(255,255,255,.5)"}].map((s,i)=>(
                <div key={i} style={{background:"rgba(255,255,255,.045)",borderRadius:11,padding:"8px 8px",textAlign:"left",border:"1px solid rgba(255,255,255,.05)"}}>
                  <div style={{fontSize:8,color:"rgba(255,255,255,.35)",fontWeight:700,letterSpacing:1,marginBottom:2}}>{s.l}</div>
                  <div style={{fontSize:12,fontWeight:800,color:s.c,fontFamily:"Urbanist"}}>{s.v}</div>
                </div>
              ))}
            </div>

            {/* Progress bar */}
            <div style={{marginTop:12,background:"rgba(255,255,255,.06)",borderRadius:100,height:4,overflow:"hidden"}}>
              <div style={{height:"100%",width:"30%",borderRadius:100,background:"linear-gradient(90deg,#8B3DFF,#00D4FF)",boxShadow:"0 0 10px rgba(0,212,255,.6)"}}/>
            </div>
          </div>

          {/* Location */}
          <div style={{background:"rgba(255,255,255,.035)",borderRadius:13,padding:"10px 12px",border:"1px solid rgba(255,255,255,.06)",display:"flex",alignItems:"center",gap:9}}>
            <span style={{fontSize:13,filter:"drop-shadow(0 0 4px rgba(0,212,255,.5))"}}>📍</span>
            <div>
              <div style={{fontSize:11,fontWeight:700}}>Clínica Saúde Total</div>
              <div style={{fontSize:9,color:"rgba(255,255,255,.35)"}}>São Paulo · 0.8km</div>
            </div>
            <div style={{marginLeft:"auto",color:"rgba(0,212,255,.5)",fontSize:16}}>›</div>
          </div>

          {/* Bottom nav */}
          <div style={{display:"flex",justifyContent:"space-around",marginTop:16,paddingTop:12,borderTop:"1px solid rgba(255,255,255,.05)"}}>
            {["🏠","📋","🔔","⚙️"].map((ic,i)=>(
              <div key={i} style={{fontSize:16,opacity:i===0?1:.35,filter:i===0?"drop-shadow(0 0 6px rgba(0,212,255,.7))":"none"}}>{ic}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── HOME ─────────────────────────────────────────────────────────────────────
const Home=({setPage})=>{
  const{queue}=useApp();
  const[c,setC]=useState({a:0,r:0,s:0,e:0});
  useEffect(()=>{
    let start=null;const run=ts=>{if(!start)start=ts;const p=Math.min((ts-start)/2400,1);const e=1-Math.pow(1-p,3);setC({a:Math.floor(e*12847),r:Math.floor(e*73),s:Math.floor(e*98),e:Math.floor(e*320)});if(p<1)requestAnimationFrame(run);};
    setTimeout(()=>requestAnimationFrame(run),700);
  },[]);

  return(
    <div style={{minHeight:"100vh",overflowX:"hidden"}}>

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section style={{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"90px 24px 60px",textAlign:"center",position:"relative"}}>

        {/* Live badge */}
        <div className="glass-cyan up" style={{display:"inline-flex",alignItems:"center",gap:9,padding:"9px 22px",borderRadius:100,marginBottom:34,animationDelay:".05s",opacity:0,boxShadow:"0 0 30px rgba(0,212,255,.12)"}}>
          <div style={{width:7,height:7,borderRadius:"50%",background:"var(--green)",animation:"blink 1.4s infinite",boxShadow:"0 0 8px var(--green)"}}/>
          <span style={{fontSize:13,color:"rgba(255,255,255,.7)",fontWeight:600,letterSpacing:.2}}>
            Sistema ativo · <span style={{color:"var(--cyan)",fontWeight:800}}>{queue.length}</span> pessoas na fila agora
          </span>
        </div>

        {/* Logo */}
        <div className="up" style={{marginBottom:26,animationDelay:".1s",opacity:0}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:12,marginBottom:8}}>
            <div style={{width:52,height:52,borderRadius:16,background:"linear-gradient(135deg,#8B3DFF,#00D4FF)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"Urbanist",fontWeight:900,fontSize:26,boxShadow:"0 0 40px rgba(0,212,255,.45),0 0 80px rgba(139,61,255,.25)"}}>F</div>
            <span style={{fontFamily:"Urbanist",fontWeight:900,fontSize:34,letterSpacing:"-.5px"}}>Fila<span style={{background:"linear-gradient(90deg,#8B3DFF,#00D4FF)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Zero</span></span>
          </div>
        </div>

        <h1 className="up" style={{fontSize:"clamp(40px,7vw,90px)",fontWeight:900,lineHeight:1.04,letterSpacing:"-2.5px",maxWidth:820,marginBottom:22,animationDelay:".18s",opacity:0}}>
          Seu tempo vale mais<br/>
          <span style={{background:"linear-gradient(90deg,#8B3DFF 0%,#00D4FF 55%,#8B3DFF 100%)",backgroundSize:"200%",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",animation:"energyFlow 3s linear infinite",display:"inline-block"}}>
            do que esperar.
          </span>
        </h1>

        <p className="up" style={{fontSize:"clamp(15px,2vw,19px)",color:"rgba(255,255,255,.5)",maxWidth:520,lineHeight:1.8,marginBottom:52,animationDelay:".3s",opacity:0}}>
          Fila virtual inteligente em tempo real. Entre na fila de qualquer estabelecimento, acompanhe sua posição e chegue apenas quando sua vez estiver próxima.
        </p>

        {/* CTA */}
        <div style={{position:"relative",marginBottom:72}}>
          <div style={{position:"absolute",inset:-24,borderRadius:"50%",background:"rgba(0,212,255,.07)",animation:"ripple 2.5s ease-out infinite",pointerEvents:"none"}}/>
          <div style={{position:"absolute",inset:-14,borderRadius:"50%",background:"rgba(139,61,255,.07)",animation:"ripple 2.5s .7s ease-out infinite",pointerEvents:"none"}}/>
          <button onClick={()=>setPage("scan")} className="btn-neon" style={{position:"relative",zIndex:2,padding:"20px 60px",fontSize:18,borderRadius:18}}>
            📲  Entrar na Fila
          </button>
        </div>

        {/* Phone mockup */}
        <div className="up" style={{animationDelay:".6s",opacity:0,width:"min(280px,90vw)"}}>
          <PhoneMockup queue={queue}/>
        </div>

        {/* Tipos */}
        <div className="up" style={{marginTop:64,animationDelay:".75s",opacity:0,width:"100%",maxWidth:700}}>
          <div style={{color:"var(--muted)",fontSize:11,fontWeight:700,letterSpacing:2.5,textTransform:"uppercase",marginBottom:18}}>Funciona em qualquer estabelecimento</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:8,justifyContent:"center"}}>
            {LUGARES.map(l=>(
              <div key={l.id} style={{padding:"9px 18px",borderRadius:100,fontSize:12,fontWeight:600,display:"flex",alignItems:"center",gap:7,background:"rgba(255,255,255,.04)",border:`1px solid ${l.cor}28`,transition:"all .2s",cursor:"default"}}>
                <span>{l.icon}</span><span style={{color:"rgba(255,255,255,.6)"}}>{l.tipo}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMO FUNCIONA ────────────────────────────────────────── */}
      <section style={{padding:"100px 24px",borderTop:"1px solid rgba(0,212,255,.07)",position:"relative"}}>
        {/* Section bg glow */}
        <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:800,height:400,background:"radial-gradient(ellipse,rgba(0,212,255,.06) 0%,rgba(139,61,255,.04) 50%,transparent 70%)",filter:"blur(60px)",pointerEvents:"none"}}/>

        <div style={{maxWidth:980,margin:"0 auto",textAlign:"center",position:"relative"}}>
          <div style={{color:"var(--cyan)",fontSize:11,fontWeight:800,letterSpacing:3,textTransform:"uppercase",marginBottom:14}}>Como Funciona</div>
          <h2 style={{fontSize:"clamp(28px,4vw,48px)",fontWeight:900,marginBottom:10,letterSpacing:"-1.5px"}}>Simples, rápido e inteligente.</h2>
          <p style={{color:"rgba(255,255,255,.4)",fontSize:15,marginBottom:64,fontWeight:500}}>Do QR Code à chamada em 4 passos.</p>

          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(210px,1fr))",gap:0,position:"relative"}}>
            {/* Energy beam connector */}
            <div style={{position:"absolute",top:"38%",left:"10%",right:"10%",height:2,background:"linear-gradient(90deg,transparent 0%,rgba(0,212,255,.5) 15%,rgba(139,61,255,.6) 50%,rgba(0,212,255,.5) 85%,transparent 100%)",zIndex:0,animation:"beamFlow 3s ease-in-out infinite"}}/>
            {/* Beam dots */}
            {[25,50,75].map((p,i)=>(
              <div key={i} style={{position:"absolute",top:"calc(38% - 5px)",left:`${p}%`,width:10,height:10,borderRadius:"50%",background:i%2===0?"var(--cyan)":"var(--purple)",boxShadow:i%2===0?"0 0 14px var(--cyan)":"0 0 14px var(--purple)",zIndex:1,animation:`blink ${1+i*.3}s infinite`}}/>
            ))}

            {[
              {n:"1",icon:"📱",title:"Escanear QR Code",desc:"Aponte a câmera para o QR Code do estabelecimento. Reconhecimento instantâneo.",cor:"#00D4FF",bg:"rgba(0,212,255,.08)"},
              {n:"2",icon:"👤",title:"Entrar na Fila Virtual",desc:"Informe seus dados e confirme presença. Menos de 10 segundos para entrar.",cor:"#8B3DFF",bg:"rgba(139,61,255,.08)"},
              {n:"3",icon:"⏱",title:"Acompanhar em Tempo Real",desc:"Veja sua posição e tempo estimado atualizando ao vivo no seu celular.",cor:"#00D4FF",bg:"rgba(0,212,255,.08)"},
              {n:"4",icon:"🔔",title:"Receber Notificação",desc:"Notificação automática quando sua vez está próxima. Chegue no momento certo.",cor:"#8B3DFF",bg:"rgba(139,61,255,.08)"},
            ].map((s,i)=>(
              <div key={i} className="glass step-card" style={{padding:"34px 24px",borderRadius:24,border:`1px solid ${s.cor}20`,position:"relative",overflow:"hidden",textAlign:"left",zIndex:2,margin:"0 8px",background:s.bg,backdropFilter:"blur(20px)"}}>
                {/* Top glow accent */}
                <div style={{position:"absolute",top:0,left:0,right:0,height:2.5,background:`linear-gradient(90deg,transparent,${s.cor},transparent)`}}/>
                {/* Corner number */}
                <div style={{position:"absolute",top:20,right:20,fontFamily:"Urbanist",fontWeight:900,fontSize:48,color:`${s.cor}12`,lineHeight:1}}>{s.n}</div>

                <div style={{width:52,height:52,borderRadius:16,background:`${s.cor}15`,border:`1px solid ${s.cor}30`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,marginBottom:20,boxShadow:`0 0 20px ${s.cor}20`}}>{s.icon}</div>
                <div style={{fontSize:10,color:s.cor,fontWeight:800,letterSpacing:2,marginBottom:10,textTransform:"uppercase"}}>{s.n}. Passo</div>
                <h3 style={{fontSize:17,fontWeight:800,marginBottom:10,letterSpacing:"-.3px",lineHeight:1.3}}>{s.title}</h3>
                <p style={{fontSize:13,color:"rgba(255,255,255,.45)",lineHeight:1.65,fontWeight:500}}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────────────── */}
      <section style={{padding:"70px 24px",borderTop:"1px solid rgba(0,212,255,.07)",background:"rgba(0,212,255,.02)"}}>
        <div style={{maxWidth:880,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(190px,1fr))",gap:20}}>
          {[{v:`+${c.a.toLocaleString("pt-BR")}`,l:"Atendimentos",i:"👥",c:"#00D4FF"},{v:`${c.r}%`,l:"Redução de espera",i:"⚡",c:"#8B3DFF"},{v:`${c.s}%`,l:"Satisfação",i:"⭐",c:"#00F5A0"},{v:`+${c.e}`,l:"Empresas ativas",i:"🏢",c:"#FFB800"}].map((s,i)=>(
            <div key={i} className="glass" style={{padding:"30px 24px",borderRadius:22,textAlign:"center",border:`1px solid ${s.c}20`,position:"relative",overflow:"hidden"}}>
              <div style={{position:"absolute",bottom:-20,right:-10,width:80,height:80,borderRadius:"50%",background:`${s.c}12`,filter:"blur(20px)"}}/>
              <div style={{fontSize:30,marginBottom:12,filter:`drop-shadow(0 0 8px ${s.c}80)`}}>{s.i}</div>
              <div style={{fontSize:42,fontWeight:900,fontFamily:"Urbanist",letterSpacing:"-1.5px",color:s.c,textShadow:`0 0 30px ${s.c}50`}}>{s.v}</div>
              <div style={{color:"rgba(255,255,255,.4)",fontSize:13,marginTop:8,fontWeight:500}}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────── */}
      <footer style={{padding:"44px 24px",borderTop:"1px solid rgba(255,255,255,.05)",textAlign:"center"}}>
        <div style={{fontFamily:"Urbanist",fontWeight:900,fontSize:24,marginBottom:10}}>
          Fila<span style={{background:"linear-gradient(90deg,#8B3DFF,#00D4FF)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Zero</span>
        </div>
        <div style={{color:"rgba(255,255,255,.3)",fontSize:13,marginBottom:18,fontWeight:500}}>Seu tempo vale mais do que esperar.</div>
        <div style={{color:"rgba(255,255,255,.2)",fontSize:12}}>© 2025 FilaZero Tecnologia LTDA · CNPJ 42.731.088/0001-XX · São Paulo, Brasil</div>
      </footer>
    </div>
  );
};

// ─── QR SCAN ──────────────────────────────────────────────────────────────────
const QRScan=({setPage})=>{
  const{setLugar}=useApp();
  const[phase,setPhase]=useState("camera");
  const[selected,setSelected]=useState(null);
  const[scanning,setScanning]=useState(true);

  useEffect(()=>{
    if(phase!=="camera")return;
    const t=setTimeout(()=>{setScanning(false);setTimeout(()=>setPhase("detected"),500);},2800);
    return()=>clearTimeout(t);
  },[phase]);

  const confirm=()=>{if(!selected)return;setLugar(selected);setPage("fila");};

  return(
    <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"90px 24px"}}>
      {phase==="camera"&&(
        <div className="in" style={{display:"flex",flexDirection:"column",alignItems:"center",gap:30,width:"100%",maxWidth:380,textAlign:"center"}}>
          <div>
            <h2 style={{fontFamily:"Urbanist",fontWeight:900,fontSize:28,marginBottom:8,letterSpacing:"-.5px"}}>Apontando câmera...</h2>
            <p style={{color:"rgba(255,255,255,.45)",fontSize:15}}>Escaneie o QR Code do estabelecimento</p>
          </div>
          <div style={{position:"relative",width:280,height:280}}>
            <div style={{position:"absolute",inset:-24,borderRadius:34,background:"radial-gradient(ellipse,rgba(0,212,255,.15) 0%,transparent 65%)",filter:"blur(20px)"}}/>
            <div style={{width:"100%",height:"100%",borderRadius:28,overflow:"hidden",background:"linear-gradient(145deg,#060a18,#0a0e1e,#070c1a)",position:"relative",border:"1px solid rgba(0,212,255,.22)",boxShadow:"0 0 40px rgba(0,212,255,.08) inset"}}>
              <div style={{position:"absolute",inset:0,opacity:.35}}>
                <div style={{position:"absolute",top:"18%",left:"8%",width:80,height:80,borderRadius:12,background:"rgba(255,255,255,.025)"}}/>
                <div style={{position:"absolute",bottom:"12%",right:"8%",width:60,height:80,borderRadius:8,background:"rgba(255,255,255,.025)"}}/>
              </div>
              <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:140,height:140,background:"white",borderRadius:14,padding:8,display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:1.5,boxShadow:"0 0 30px rgba(255,255,255,.1)"}}>
                {[1,1,1,0,1,1,1,1,0,1,0,1,0,1,1,1,1,0,1,1,1,0,0,0,0,0,0,0,1,1,1,0,1,1,1,1,0,1,0,1,0,1,1,1,1,0,1,1,1].map((v,i)=>(
                  <div key={i} style={{borderRadius:1,background:v?"#060910":"transparent",aspectRatio:"1"}}/>
                ))}
              </div>
              {scanning&&<div style={{position:"absolute",left:0,right:0,height:2.5,background:"linear-gradient(90deg,transparent 0%,var(--cyan) 25%,rgba(217,70,239,1) 75%,transparent 100%)",animation:"scanLine 1.4s ease-in-out infinite",top:0,boxShadow:"0 0 16px var(--cyan),0 0 30px rgba(217,70,239,.5)"}}/>}
              {!scanning&&<div style={{position:"absolute",inset:0,background:"rgba(0,245,160,.06)",display:"flex",alignItems:"center",justifyContent:"center"}}><div style={{width:56,height:56,borderRadius:"50%",background:"rgba(0,245,160,.18)",border:"2px solid var(--green)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,boxShadow:"0 0 30px rgba(0,245,160,.3)"}}>✓</div></div>}
            </div>
            {[{top:0,left:0},{top:0,right:0},{bottom:0,left:0},{bottom:0,right:0}].map((pos,i)=>(
              <div key={i} style={{position:"absolute",width:34,height:34,...pos,animation:"cornerBlink 1.5s ease-in-out infinite",animationDelay:`${i*.2}s`}}>
                <div style={{position:"absolute",top:0,left:0,width:"100%",height:3,background:"var(--cyan)",borderRadius:2,boxShadow:"0 0 8px var(--cyan)"}}/>
                <div style={{position:"absolute",top:0,left:0,width:3,height:"100%",background:"var(--cyan)",borderRadius:2,boxShadow:"0 0 8px var(--cyan)"}}/>
              </div>
            ))}
          </div>
          <div style={{display:"flex",alignItems:"center",gap:10,color:"rgba(255,255,255,.45)",fontSize:14,fontWeight:600}}>
            <div style={{width:8,height:8,borderRadius:"50%",background:"var(--cyan)",animation:"blink 1s infinite",boxShadow:"0 0 8px var(--cyan)"}}/>
            Buscando QR Code...
          </div>
        </div>
      )}

      {phase==="detected"&&(
        <div className="in" style={{display:"flex",flexDirection:"column",alignItems:"center",gap:24,width:"100%",maxWidth:460,textAlign:"center"}}>
          <div style={{width:72,height:72,borderRadius:"50%",background:"rgba(0,245,160,.1)",border:"2px solid var(--green)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,boxShadow:"0 0 40px rgba(0,245,160,.25)"}}>✓</div>
          <div>
            <h2 style={{fontFamily:"Urbanist",fontWeight:900,fontSize:28,marginBottom:6,letterSpacing:"-.5px"}}>QR Code detectado!</h2>
            <p style={{color:"rgba(255,255,255,.45)",fontSize:14}}>Selecione o estabelecimento para entrar na fila</p>
          </div>
          <div style={{width:"100%",display:"flex",flexDirection:"column",gap:8,maxHeight:"45vh",overflowY:"auto",paddingRight:4}}>
            {LUGARES.map(l=>(
              <div key={l.id} onClick={()=>setSelected(l)} style={{padding:"15px 20px",borderRadius:18,cursor:"pointer",display:"flex",alignItems:"center",gap:14,background:selected?.id===l.id?`${l.cor}10`:"rgba(255,255,255,.03)",border:selected?.id===l.id?`1px solid ${l.cor}60`:"1px solid rgba(255,255,255,.07)",transition:"all .22s",boxShadow:selected?.id===l.id?`0 0 20px ${l.cor}15`:"none"}}>
                <div style={{width:46,height:46,borderRadius:14,background:`${l.cor}15`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0,border:`1px solid ${l.cor}28`}}>{l.icon}</div>
                <div style={{flex:1,textAlign:"left"}}>
                  <div style={{fontWeight:700,fontSize:15,fontFamily:"Urbanist"}}>{l.nome}</div>
                  <div style={{fontSize:12,color:"rgba(255,255,255,.35)",marginTop:1}}>{l.tipo}</div>
                </div>
                {selected?.id===l.id&&<div style={{width:24,height:24,borderRadius:"50%",background:"var(--green)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,boxShadow:"0 0 14px rgba(0,245,160,.4)"}}>✓</div>}
              </div>
            ))}
          </div>
          <button onClick={confirm} disabled={!selected} className="btn-neon" style={{width:"100%",padding:"17px",fontSize:16,borderRadius:16,opacity:selected?1:.3}}>
            Confirmar e entrar na fila →
          </button>
          <button onClick={()=>setPage("home")} className="btn-outline" style={{width:"100%"}}>← Voltar</button>
        </div>
      )}
    </div>
  );
};

// ─── FILA ─────────────────────────────────────────────────────────────────────
const TRANSITO_ESTADOS = [
  {label:"Trânsito leve",    cor:"#00F5A0", icon:"🟢", extra:"Boa hora para sair"},
  {label:"Trânsito moderado",cor:"#FFB800", icon:"🟡", extra:"Pode haver lentidão"},
  {label:"Trânsito intenso", cor:"#FF4060", icon:"🔴", extra:"Saia com antecedência"},
];

const Fila=({setPage})=>{
  const{joinQueue,myTicket,queue,getPos,lugar}=useApp();
  const[step,setStep]=useState(myTicket?2:1);
  const[form,setForm]=useState({nome:"",tipo:lugar?.tipos[0]||"",prioridade:"normal"});
  const[err,setErr]=useState({});
  const[loading,setLoading]=useState(false);
  // trânsito fictício — fixo para não causar re-render
  const[transit]=useState(()=>({
    distancia: "2.3 km",
    tempoViagem: 8,          // minutos de deslocamento
    estadoIdx: 1,            // 0=leve 1=moderado 2=intenso
    rota: "Av. Paulista → R. Augusta → destino",
  }));
  const tipos=lugar?.tipos||LUGARES[0].tipos;

  const submit=()=>{
    if(!form.nome.trim()||form.nome.trim().length<3){setErr({nome:"Mínimo 3 caracteres."});return;}
    setLoading(true);
    setTimeout(()=>{joinQueue(form.nome.trim(),form.tipo||tipos[0],form.prioridade);setLoading(false);setStep(2);},1200);
  };

  const pos=getPos();
  const me=myTicket?queue.find(q=>q.id===myTicket.id):null;
  const est=pos!==null?Math.max(1,pos*4+2):null;
  // Sair X minutos antes do estimado para chegar no horário
  const sairEm = est!==null ? Math.max(1, est - transit.tempoViagem) : null;
  const transito = TRANSITO_ESTADOS[transit.estadoIdx];

  return(
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:"90px 20px"}}>
      <div style={{width:"100%",maxWidth:500}}>
        {step===1&&(
          <div className="glass-dark up" style={{borderRadius:30,padding:"46px 40px",border:"1px solid rgba(0,212,255,.22)",boxShadow:"0 0 80px rgba(0,212,255,.08),0 0 140px rgba(139,61,255,.06)"}}>
            <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:"linear-gradient(90deg,transparent,var(--cyan),var(--purple),transparent)",borderRadius:"30px 30px 0 0"}}/>
            {lugar&&(
              <div style={{display:"flex",alignItems:"center",gap:13,padding:"14px 18px",borderRadius:16,background:`${lugar.cor}0d`,border:`1px solid ${lugar.cor}28`,marginBottom:30}}>
                <div style={{width:44,height:44,borderRadius:13,background:`${lugar.cor}18`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,border:`1px solid ${lugar.cor}30`,boxShadow:`0 0 16px ${lugar.cor}20`}}>{lugar.icon}</div>
                <div><div style={{fontWeight:700,fontSize:15,fontFamily:"Urbanist"}}>{lugar.nome}</div><div style={{fontSize:12,color:"rgba(255,255,255,.4)"}}>{lugar.tipo}</div></div>
              </div>
            )}
            <div style={{textAlign:"center",marginBottom:32}}>
              <h2 style={{fontFamily:"Urbanist",fontSize:28,fontWeight:900,marginBottom:7,letterSpacing:"-.5px"}}>Pegar sua senha</h2>
              <p style={{color:"rgba(255,255,255,.4)",fontSize:14}}>Preencha para entrar na fila digital</p>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:18}}>
              <div>
                <label style={{fontSize:13,fontWeight:600,display:"block",marginBottom:9,color:"rgba(255,255,255,.6)"}}>Seu nome</label>
                <input type="text" placeholder="Ex: João Pedro Silva" value={form.nome} onChange={e=>{setForm(f=>({...f,nome:e.target.value}));setErr({});}}
                  style={{width:"100%",padding:"15px 18px",background:"rgba(255,255,255,.05)",border:err.nome?"1px solid var(--red)":"1px solid rgba(255,255,255,.1)",borderRadius:14,color:"white",fontSize:15,transition:"all .2s"}}/>
                {err.nome&&<div style={{color:"var(--red)",fontSize:12,marginTop:6,fontWeight:600}}>{err.nome}</div>}
              </div>
              <div>
                <label style={{fontSize:13,fontWeight:600,display:"block",marginBottom:9,color:"rgba(255,255,255,.6)"}}>Tipo de atendimento</label>
                <select value={form.tipo} onChange={e=>setForm(f=>({...f,tipo:e.target.value}))}
                  style={{width:"100%",padding:"15px 18px",background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.1)",borderRadius:14,fontSize:15}}>
                  {tipos.map(t=><option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label style={{fontSize:13,fontWeight:600,display:"block",marginBottom:11,color:"rgba(255,255,255,.6)"}}>Prioridade</label>
                <div style={{display:"flex",gap:10}}>
                  {["normal","preferencial"].map(p=>(
                    <div key={p} onClick={()=>setForm(f=>({...f,prioridade:p}))} style={{flex:1,padding:"14px",borderRadius:14,cursor:"pointer",textAlign:"center",border:form.prioridade===p?"1px solid rgba(0,212,255,.5)":"1px solid rgba(255,255,255,.07)",background:form.prioridade===p?"rgba(0,212,255,.1)":"rgba(255,255,255,.03)",fontSize:14,fontWeight:700,fontFamily:"Urbanist",transition:"all .22s",color:form.prioridade===p?"var(--cyan)":"rgba(255,255,255,.4)",boxShadow:form.prioridade===p?"0 0 20px rgba(0,212,255,.15)":"none"}}>
                      {p==="normal"?"Normal":"⭐ Preferencial"}
                    </div>
                  ))}
                </div>
              </div>
              <button onClick={submit} disabled={loading} className="btn-neon" style={{width:"100%",padding:"17px",fontSize:16,borderRadius:16,marginTop:6,opacity:loading?.8:1}}>
                {loading?<span style={{display:"flex",alignItems:"center",justifyContent:"center",gap:10}}><div style={{width:18,height:18,border:"2px solid rgba(255,255,255,.3)",borderTopColor:"white",borderRadius:"50%",animation:"spin .8s linear infinite"}}/>Entrando...</span>:"Pegar minha senha →"}
              </button>
            </div>
          </div>
        )}

        {step===2&&myTicket&&(
          <div className="in" style={{display:"flex",flexDirection:"column",gap:14}}>
            {/* Ticket principal */}
            <div className="glass-dark" style={{borderRadius:30,padding:"38px",border:"1px solid rgba(0,212,255,.28)",textAlign:"center",boxShadow:"0 0 80px rgba(0,212,255,.14),0 0 140px rgba(139,61,255,.1)",position:"relative",overflow:"hidden"}}>
              <div style={{position:"absolute",top:0,left:0,right:0,height:2.5,background:"linear-gradient(90deg,transparent,var(--cyan),var(--purple),transparent)"}}/>
              {/* Big glow behind ticket number */}
              <div style={{position:"absolute",top:"30%",left:"50%",transform:"translate(-50%,-50%)",width:200,height:200,borderRadius:"50%",background:"radial-gradient(circle,rgba(0,212,255,.12) 0%,transparent 70%)",filter:"blur(30px)",pointerEvents:"none"}}/>

              {lugar&&<div style={{fontSize:12,color:"rgba(255,255,255,.4)",fontWeight:600,marginBottom:10}}>{lugar.icon} {lugar.nome}</div>}
              <div style={{color:"rgba(255,255,255,.4)",fontSize:10,fontWeight:800,letterSpacing:3.5,textTransform:"uppercase",marginBottom:12}}>Sua senha</div>
              <div style={{fontSize:86,fontWeight:900,fontFamily:"Urbanist",letterSpacing:-2,background:"linear-gradient(135deg,#8B3DFF,#00D4FF)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",animation:"callPulse 3s ease-in-out infinite",lineHeight:1,filter:"drop-shadow(0 0 30px rgba(0,212,255,.4))"}}>
                {myTicket.ticket}
              </div>
              {me?.prioridade==="preferencial"&&<div style={{display:"inline-block",background:"rgba(255,184,0,.1)",border:"1px solid rgba(255,184,0,.3)",color:"var(--amber)",borderRadius:9,padding:"4px 16px",fontSize:11,fontWeight:700,marginTop:12,boxShadow:"0 0 16px rgba(255,184,0,.15)"}}>⭐ Atendimento Preferencial</div>}
              <div style={{marginTop:24,paddingTop:20,borderTop:"1px solid rgba(255,255,255,.06)",display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14}}>
                {[{l:"Posição",v:pos!==null?`${pos+1}°`:"—",c:"var(--cyan)"},{l:"À frente",v:pos!==null?pos:"—",c:"var(--purple)"},{l:"Estimado",v:est?`~${est}min`:"—",c:"white"}].map((s,i)=>(
                  <div key={i}><div style={{fontSize:28,fontWeight:900,fontFamily:"Urbanist",color:s.c,textShadow:`0 0 20px ${s.c}60`}}>{s.v}</div><div style={{fontSize:11,color:"rgba(255,255,255,.35)",marginTop:4,fontWeight:600}}>{s.l}</div></div>
                ))}
              </div>
            </div>

            {/* Progress */}
            <div className="glass" style={{borderRadius:20,padding:"20px 22px",border:"1px solid rgba(255,255,255,.07)"}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}><span style={{fontSize:13,fontWeight:700}}>Progresso na fila</span><Badge status={me?.status||"aguardando"}/></div>
              <div style={{background:"rgba(255,255,255,.05)",borderRadius:100,height:7,overflow:"hidden"}}>
                <div style={{height:"100%",borderRadius:100,background:"linear-gradient(90deg,#8B3DFF,#00D4FF)",width:pos!==null?`${Math.max(10,100-(pos/queue.length)*100)}%`:"10%",transition:"width 1.5s ease",boxShadow:"0 0 14px rgba(0,212,255,.7)"}}/>
              </div>
            </div>

            {/* ── NAVEGAÇÃO / TRÂNSITO ─────────────────────────────── */}
            <div className="glass" style={{borderRadius:20,border:`1px solid ${sairEm<=3?"rgba(255,64,96,.4)":sairEm<=6?"rgba(255,184,0,.35)":"rgba(0,212,255,.18)"}`,overflow:"hidden",boxShadow:sairEm<=3?"0 0 30px rgba(255,64,96,.12)":sairEm<=6?"0 0 24px rgba(255,184,0,.1)":"none",transition:"all 1s"}}>
              {/* Header */}
              <div style={{padding:"16px 20px 14px",borderBottom:"1px solid rgba(255,255,255,.06)",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <span style={{fontSize:16}}>🗺️</span>
                  <span style={{fontWeight:700,fontSize:13}}>Navegação até o local</span>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:6,fontSize:12,fontWeight:700,color:transito.cor}}>
                  {transito.icon} {transito.label}
                </div>
              </div>

              {/* Alert banner — sair em X min */}
              {sairEm!==null&&(
                <div style={{padding:"12px 20px",background:sairEm<=3?"rgba(255,64,96,.1)":sairEm<=6?"rgba(255,184,0,.08)":"rgba(0,212,255,.06)",borderBottom:"1px solid rgba(255,255,255,.05)",display:"flex",alignItems:"center",gap:10}}>
                  <div style={{width:32,height:32,borderRadius:10,background:sairEm<=3?"rgba(255,64,96,.18)":sairEm<=6?"rgba(255,184,0,.15)":"rgba(0,212,255,.12)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>
                    {sairEm<=3?"🚨":sairEm<=6?"⚠️":"🕐"}
                  </div>
                  <div>
                    <div style={{fontWeight:800,fontSize:13,fontFamily:"Urbanist",color:sairEm<=3?"var(--red)":sairEm<=6?"var(--amber)":"var(--cyan)"}}>
                      {sairEm<=3
                        ? `Saia agora! ${sairEm} min para chegar`
                        : sairEm<=6
                        ? `Saia em ${sairEm} min — trânsito moderado`
                        : `Saia em ~${sairEm} min para chegar na hora`
                      }
                    </div>
                    <div style={{fontSize:11,color:"rgba(255,255,255,.35)",marginTop:1}}>{transito.extra}</div>
                  </div>
                </div>
              )}

              {/* Stats de navegação */}
              <div style={{padding:"16px 20px",display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12}}>
                {[
                  {icon:"📍",label:"Distância",value:transit.distancia,cor:"rgba(255,255,255,.7)"},
                  {icon:"🚗",label:"Tempo viagem",value:`${transit.tempoViagem} min`,cor:"var(--cyan)"},
                  {icon:"⏱",label:"Espera na fila",value:est?`~${est} min`:"—",cor:"var(--purple)"},
                ].map((s,i)=>(
                  <div key={i} style={{textAlign:"center",padding:"12px 8px",borderRadius:14,background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.05)"}}>
                    <div style={{fontSize:18,marginBottom:5}}>{s.icon}</div>
                    <div style={{fontWeight:800,fontSize:15,fontFamily:"Urbanist",color:s.cor}}>{s.value}</div>
                    <div style={{fontSize:10,color:"rgba(255,255,255,.3)",marginTop:3,fontWeight:600}}>{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Rota */}
              <div style={{padding:"0 20px 16px",display:"flex",alignItems:"center",gap:8}}>
                <div style={{flex:1,fontSize:11,color:"rgba(255,255,255,.3)",fontWeight:500,background:"rgba(255,255,255,.03)",padding:"8px 12px",borderRadius:10,border:"1px solid rgba(255,255,255,.05)"}}>
                  📌 {transit.rota}
                </div>
                <div style={{width:36,height:36,borderRadius:11,background:"linear-gradient(135deg,#8B3DFF,#00D4FF)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,cursor:"pointer",flexShrink:0,boxShadow:"0 0 16px rgba(0,212,255,.3)"}}>🧭</div>
              </div>
            </div>

            {/* Live queue */}
            <div className="glass" style={{borderRadius:20,padding:"20px 22px",border:"1px solid rgba(255,255,255,.07)"}}>
              <div style={{fontSize:13,fontWeight:700,marginBottom:14,display:"flex",alignItems:"center",gap:9}}>
                <div style={{width:7,height:7,borderRadius:"50%",background:"var(--green)",animation:"blink 1.2s infinite",boxShadow:"0 0 8px var(--green)"}}/>
                Fila ao vivo · {queue.length} pessoas
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:6,maxHeight:230,overflowY:"auto"}}>
                {queue.slice(0,7).map((p,i)=>(
                  <div key={p.id} style={{display:"flex",gap:10,alignItems:"center",padding:"10px 13px",borderRadius:12,background:p.id===myTicket.id?"rgba(0,212,255,.08)":"rgba(255,255,255,.02)",border:p.id===myTicket.id?"1px solid rgba(0,212,255,.35)":"1px solid transparent",fontSize:13,transition:"all .4s",boxShadow:p.id===myTicket.id?"0 0 20px rgba(0,212,255,.1)":"none"}}>
                    <span style={{color:"rgba(255,255,255,.3)",fontWeight:800,minWidth:22,fontSize:12}}>{i+1}</span>
                    <span style={{fontFamily:"Urbanist",fontWeight:800,color:p.id===myTicket.id?"var(--cyan)":"rgba(255,255,255,.55)",minWidth:76}}>{p.ticket}</span>
                    <span style={{flex:1,fontSize:12,color:"rgba(255,255,255,.35)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{p.nome.split(" ")[0]}</span>
                    <Badge status={p.status} small/>
                  </div>
                ))}
              </div>
            </div>
            <button onClick={()=>setPage("painel")} className="btn-outline" style={{borderRadius:16,width:"100%",padding:"14px"}}>Ver painel de chamadas →</button>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── PAINEL ───────────────────────────────────────────────────────────────────
const Painel=()=>{
  const{queue,stats}=useApp();
  const[time,setTime]=useState(new Date());
  const[flash,setFlash]=useState(false);
  const prevEm=useRef(null);
  useEffect(()=>{const t=setInterval(()=>setTime(new Date()),1000);return()=>clearInterval(t);},[]);
  useEffect(()=>{
    const em=queue.find(x=>x.status==="em_atendimento");
    if(em&&em.id!==prevEm.current){prevEm.current=em.id;setFlash(true);setTimeout(()=>setFlash(false),2500);}
  },[queue]);

  const em=queue.find(x=>x.status==="em_atendimento");
  const prox=queue.filter(x=>x.status!=="em_atendimento").slice(0,3);

  return(
    <div style={{minHeight:"100vh",padding:"88px 24px 36px",background:flash?"rgba(0,212,255,.02)":"transparent",transition:"background .5s"}}>
      <div style={{maxWidth:1100,margin:"0 auto"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:30}}>
          <div style={{fontFamily:"Urbanist",fontWeight:900,fontSize:30,letterSpacing:"-.5px"}}>
            Fila<span style={{background:"linear-gradient(90deg,#8B3DFF,#00D4FF)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Zero</span>
            <span style={{fontSize:14,fontWeight:500,color:"rgba(255,255,255,.35)",marginLeft:14}}>Painel de Atendimento</span>
          </div>
          <div style={{textAlign:"right"}}>
            <div style={{fontFamily:"Urbanist",fontWeight:900,fontSize:36,letterSpacing:"-1.5px"}}>{time.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit",second:"2-digit"})}</div>
            <div style={{color:"rgba(255,255,255,.35)",fontSize:13}}>{time.toLocaleDateString("pt-BR",{weekday:"long",day:"numeric",month:"long"})}</div>
          </div>
        </div>

        {/* Main ticket */}
        <div className="glass-dark" style={{borderRadius:30,padding:"56px 48px",textAlign:"center",marginBottom:22,border:flash?"1px solid rgba(0,212,255,.8)":"1px solid rgba(0,212,255,.22)",boxShadow:flash?"0 0 100px rgba(0,212,255,.3),0 0 200px rgba(139,61,255,.18)":"0 0 50px rgba(0,212,255,.07)",transition:"all .5s",position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",top:0,left:0,right:0,height:2.5,background:"linear-gradient(90deg,transparent,var(--cyan),var(--purple),transparent)"}}/>
          {/* Background glow */}
          <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:400,height:300,borderRadius:"50%",background:"radial-gradient(circle,rgba(0,212,255,.08) 0%,transparent 70%)",filter:"blur(40px)",pointerEvents:"none"}}/>

          <div style={{color:"rgba(255,255,255,.35)",fontSize:11,fontWeight:800,letterSpacing:4,textTransform:"uppercase",marginBottom:20}}>▶  Senha em Atendimento</div>
          <div style={{fontSize:"clamp(90px,14vw,160px)",fontWeight:900,fontFamily:"Urbanist",letterSpacing:-4,background:"linear-gradient(135deg,#8B3DFF 0%,#00D4FF 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",lineHeight:1,animation:flash?"callPulse .6s ease":"none",filter:"drop-shadow(0 0 40px rgba(0,212,255,.4))"}}>
            {em?.ticket||"—"}
          </div>
          {em&&<>
            <div style={{fontSize:28,fontWeight:700,fontFamily:"Urbanist",marginTop:18}}>{em.nome}</div>
            <div style={{color:"rgba(255,255,255,.4)",fontSize:15,marginTop:5}}>{em.tipo}</div>
            <div style={{display:"inline-block",marginTop:16,background:"rgba(0,212,255,.08)",border:"1px solid rgba(0,212,255,.45)",color:"var(--cyan)",borderRadius:14,padding:"10px 28px",fontSize:18,fontWeight:800,fontFamily:"Urbanist",boxShadow:"0 0 24px rgba(0,212,255,.2)"}}>{em.guiche}</div>
          </>}
          <div style={{display:"flex",gap:5,justifyContent:"center",marginTop:30,alignItems:"flex-end",height:32}}>
            {[.9,.5,.7,.3,.8,.6,1,.4,.7,.5,.9,.3,.6,.8,.4,.7].map((op,i)=><div key={i} style={{width:5,borderRadius:3,background:`rgba(${i%2===0?"0,212,255":"139,61,255"},${op})`,animation:`wave ${[.7,.5,.9,.6,.8,.55,.75,.65,.85,.5,.7,.9,.6,.8,.55,.75][i]}s ${[0,.2,.1,.3,0,.15,.25,.05,.2,.1,.3,0,.15,.25,.05,.2][i]}s ease-in-out infinite`,boxShadow:i%2===0?"0 0 6px rgba(0,212,255,.4)":"0 0 6px rgba(139,61,255,.4)"}}/>)}
          </div>
        </div>

        {/* Next up */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14,marginBottom:20}}>
          {prox.map((p,i)=>(
            <div key={p.id} className="glass" style={{borderRadius:20,padding:"24px 22px",border:i===0?"1px solid rgba(139,61,255,.45)":"1px solid rgba(255,255,255,.07)",boxShadow:i===0?"0 0 30px rgba(139,61,255,.12)":"none"}}>
              <div style={{color:"rgba(255,255,255,.35)",fontSize:10,fontWeight:800,letterSpacing:2.5,textTransform:"uppercase",marginBottom:7}}>{i===0?"Próximo":`${i+1}°`}</div>
              <div style={{fontFamily:"Urbanist",fontWeight:900,fontSize:38,letterSpacing:-1.5,background:i===0?"linear-gradient(135deg,#8B3DFF,#00D4FF)":"none",WebkitBackgroundClip:i===0?"text":"unset",WebkitTextFillColor:i===0?"transparent":"rgba(255,255,255,.45)",filter:i===0?"drop-shadow(0 0 20px rgba(0,212,255,.3))":"none"}}>{p.ticket}</div>
              <div style={{fontSize:13,marginTop:6,color:"rgba(255,255,255,.5)",fontWeight:600}}>{p.nome.split(" ")[0]}</div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(155px,1fr))",gap:12,marginBottom:20}}>
          {[{l:"Na fila",v:queue.length,c:"var(--cyan)"},{l:"Hoje",v:stats.hoje,c:"var(--green)"},{l:"Tempo médio",v:`${stats.tempo.toFixed(1)}min`,c:"var(--purple)"},{l:"Satisfação",v:`${stats.satisf}%`,c:"var(--amber)"},{l:"Total",v:stats.total.toLocaleString("pt-BR"),c:"rgba(255,255,255,.4)"}].map((s,i)=>(
            <div key={i} className="glass" style={{borderRadius:16,padding:"18px",border:"1px solid rgba(255,255,255,.06)"}}>
              <div style={{fontFamily:"Urbanist",fontWeight:900,fontSize:26,color:s.c,textShadow:`0 0 20px ${s.c}50`}}>{s.v}</div>
              <div style={{fontSize:12,color:"rgba(255,255,255,.35)",marginTop:4,fontWeight:600}}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Ticker */}
        <div style={{overflow:"hidden",background:"rgba(0,212,255,.03)",border:"1px solid rgba(0,212,255,.1)",borderRadius:12,padding:"12px 0"}}>
          <div style={{display:"flex",animation:"ticker 28s linear infinite",gap:52,whiteSpace:"nowrap"}}>
            {[...queue,...queue].map((p,i)=>(
              <span key={i} style={{fontSize:13,color:"rgba(255,255,255,.35)",fontWeight:500}}>
                <span style={{color:"var(--cyan)",fontWeight:800}}>{p.ticket}</span> · {p.nome.split(" ")[0]} · {p.tipo}
                <span style={{color:"rgba(0,212,255,.2)",margin:"0 18px"}}>◆</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── ADMIN ────────────────────────────────────────────────────────────────────
const Admin=()=>{
  const{queue,stats,history}=useApp();
  const h=Array.from({length:12},(_,i)=>({l:`${8+i}h`,a:rng(8,28),e:rng(4,14)}));
  const mx=Math.max(...h.map(d=>d.a));
  return(
    <div style={{minHeight:"100vh",padding:"88px 24px 52px"}}>
      <div style={{maxWidth:1100,margin:"0 auto"}}>
        <div style={{marginBottom:34}}>
          <div style={{color:"var(--cyan)",fontSize:11,fontWeight:800,marginBottom:7,letterSpacing:3,textTransform:"uppercase"}}>Painel Administrativo</div>
          <h1 style={{fontFamily:"Urbanist",fontWeight:900,fontSize:36,letterSpacing:"-1.5px"}}>Dashboard <span style={{background:"linear-gradient(90deg,#8B3DFF,#00D4FF)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>FilaZero</span></h1>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(175px,1fr))",gap:14,marginBottom:24}}>
          {[{l:"Fila atual",v:queue.length,c:"#00D4FF"},{l:"Atendidos hoje",v:stats.hoje,c:"#00F5A0"},{l:"Tempo médio",v:`${stats.tempo.toFixed(1)}min`,c:"#8B3DFF"},{l:"Satisfação",v:`${stats.satisf}%`,c:"#FFB800"},{l:"Total",v:stats.total.toLocaleString("pt-BR"),c:"#D946EF"}].map((k,i)=>(
            <div key={i} className="glass" style={{borderRadius:20,padding:"24px 20px",border:`1px solid ${k.c}18`,position:"relative",overflow:"hidden",boxShadow:`0 0 30px ${k.c}10`}}>
              <div style={{position:"absolute",bottom:-12,right:-12,width:80,height:80,borderRadius:"50%",background:`${k.c}12`,filter:"blur(20px)"}}/>
              <div style={{fontFamily:"Urbanist",fontWeight:900,fontSize:32,color:k.c,textShadow:`0 0 25px ${k.c}50`}}>{k.v}</div>
              <div style={{fontSize:12,color:"rgba(255,255,255,.4)",marginTop:4,fontWeight:600}}>{k.l}</div>
            </div>
          ))}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:16,marginBottom:20}}>
          <div className="glass" style={{borderRadius:22,padding:"28px",border:"1px solid rgba(255,255,255,.07)"}}>
            <div style={{fontWeight:800,fontSize:15,fontFamily:"Urbanist",marginBottom:22}}>Atendimentos por hora</div>
            <div style={{display:"flex",gap:5,alignItems:"flex-end",height:150}}>
              {h.map((d,i)=>(
                <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4,height:"100%"}}>
                  <div style={{flex:1,display:"flex",gap:2,alignItems:"flex-end",width:"100%"}}>
                    <div style={{flex:1,borderRadius:"4px 4px 0 0",background:"linear-gradient(180deg,#8B3DFF,rgba(139,61,255,.2))",height:`${(d.a/mx)*100}%`,minHeight:4,boxShadow:"0 0 8px rgba(139,61,255,.3)"}}/>
                    <div style={{flex:1,borderRadius:"4px 4px 0 0",background:"linear-gradient(180deg,#00D4FF,rgba(0,212,255,.15))",height:`${(d.e/mx)*55}%`,minHeight:3,boxShadow:"0 0 8px rgba(0,212,255,.3)"}}/>
                  </div>
                  <div style={{fontSize:9,color:"rgba(255,255,255,.3)",fontWeight:700}}>{d.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="glass" style={{borderRadius:22,padding:"28px",border:"1px solid rgba(255,255,255,.07)"}}>
            <div style={{fontWeight:800,fontSize:15,fontFamily:"Urbanist",marginBottom:22}}>Status em tempo real</div>
            {[{l:"Aguardando",v:queue.filter(x=>x.status==="aguardando").length,c:"#4A5570"},{l:"Em atendimento",v:queue.filter(x=>x.status==="em_atendimento").length,c:"#00D4FF"},{l:"Próximos",v:queue.filter(x=>x.status==="proximo").length,c:"#8B3DFF"}].map(s=>(
              <div key={s.l} style={{marginBottom:16}}>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:13,marginBottom:7,fontWeight:600}}><span style={{color:"rgba(255,255,255,.65)"}}>{s.l}</span><span style={{color:s.c,textShadow:`0 0 10px ${s.c}60`}}>{s.v}</span></div>
                <div style={{height:6,background:"rgba(255,255,255,.05)",borderRadius:100}}>
                  <div style={{height:"100%",borderRadius:100,background:s.c,width:`${Math.max(8,(s.v/Math.max(queue.length,1))*100)}%`,transition:"width 1s ease",boxShadow:`0 0 10px ${s.c}80`}}/>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="glass" style={{borderRadius:22,padding:"28px",border:"1px solid rgba(255,255,255,.07)"}}>
          <div style={{fontWeight:800,fontSize:15,fontFamily:"Urbanist",marginBottom:20,display:"flex",alignItems:"center",gap:9}}>
            Últimos atendimentos
            <div style={{width:7,height:7,borderRadius:"50%",background:"var(--green)",animation:"blink 1.5s infinite",boxShadow:"0 0 8px var(--green)"}}/>
          </div>
          <div>
            <div style={{display:"grid",gridTemplateColumns:"80px 1fr 150px 110px 90px",gap:12,padding:"0 0 12px",borderBottom:"1px solid rgba(255,255,255,.06)",fontSize:10,color:"rgba(255,255,255,.3)",fontWeight:800,letterSpacing:1.5,textTransform:"uppercase"}}>
              <span>Senha</span><span>Nome</span><span>Tipo</span><span>Guichê</span><span>Status</span>
            </div>
            {[...history.slice(0,5),...queue.slice(0,5)].slice(0,9).map((p,i)=>(
              <div key={p.id+i} style={{display:"grid",gridTemplateColumns:"80px 1fr 150px 110px 90px",gap:12,padding:"13px 0",borderBottom:"1px solid rgba(255,255,255,.04)",fontSize:13}}>
                <span style={{fontFamily:"Urbanist",fontWeight:800,background:"linear-gradient(90deg,#8B3DFF,#00D4FF)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{p.ticket}</span>
                <span style={{fontWeight:500}}>{p.nome}</span>
                <span style={{color:"rgba(255,255,255,.4)",fontSize:12}}>{p.tipo}</span>
                <span style={{color:"rgba(255,255,255,.4)",fontSize:12}}>{p.guiche||"—"}</span>
                <Badge status={p.status||"concluido"} small/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── ROOT ──────────────────────────────────────────────────────────────────────
export default function App(){
  const[page,setPage]=useState("home");
  return(
    <Provider>
      <G/>
      <div style={{position:"relative",minHeight:"100vh",background:"var(--bg)"}}>
        <CinematicBG/>
        <div style={{position:"relative",zIndex:1}}>
          <Navbar page={page} setPage={setPage}/>
          <Toasts/>
          {page==="home"  &&<Home setPage={setPage}/>}
          {page==="scan"  &&<QRScan setPage={setPage}/>}
          {page==="fila"  &&<Fila setPage={setPage}/>}
          {page==="painel"&&<Painel/>}
          {page==="admin" &&<Admin/>}
        </div>
      </div>
    </Provider>
  );
}
