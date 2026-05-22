import { useState, useEffect, useRef, useCallback, createContext, useContext } from "react";

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Urbanist:wght@300;400;500;600;700;800;900&family=Mulish:wght@300;400;500;600;700&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --blue:        #1D6FFF;
      --blue-light:  #4F94FF;
      --blue-dark:   #0A4FCC;
      --cyan:        #00D4FF;
      --navy:        #060C1A;
      --navy2:       #0C1426;
      --navy3:       #111D35;
      --white:       #FFFFFF;
      --green:       #00E583;
      --red:         #FF4D6A;
      --amber:       #FFB800;
      --muted:       #5A6A8A;
      --border:      rgba(29,111,255,0.18);
      --glow:        rgba(29,111,255,0.35);
    }

    html { scroll-behavior: smooth; }

    body {
      font-family: 'Mulish', sans-serif;
      background: var(--navy);
      color: var(--white);
      overflow-x: hidden;
    }

    h1,h2,h3,h4,h5,h6 {
      font-family: 'Urbanist', sans-serif;
    }

    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: var(--navy); }
    ::-webkit-scrollbar-thumb { background: var(--blue); border-radius: 4px; }

    @keyframes float {
      0%,100% { transform: translateY(0px); }
      50%      { transform: translateY(-14px); }
    }
    @keyframes glow-pulse {
      0%,100% { box-shadow: 0 0 24px rgba(29,111,255,0.35); }
      50%      { box-shadow: 0 0 56px rgba(29,111,255,0.7), 0 0 100px rgba(0,212,255,0.15); }
    }
    @keyframes ticker {
      0%   { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(28px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
    @keyframes slideInRight {
      from { opacity: 0; transform: translateX(36px); }
      to   { opacity: 1; transform: translateX(0); }
    }
    @keyframes blink {
      0%,100% { opacity: 1; }
      50%      { opacity: 0.25; }
    }
    @keyframes spin {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }
    @keyframes shimmer {
      0%   { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    @keyframes callAnim {
      0%,100%    { transform: scale(1); }
      10%,30%,50%{ transform: scale(1.04); }
      20%,40%    { transform: scale(0.97); }
    }
    @keyframes particleRise {
      0%   { transform: translateY(110vh) rotate(0deg); opacity: 0; }
      8%   { opacity: 0.7; }
      92%  { opacity: 0.7; }
      100% { transform: translateY(-60px) rotate(540deg); opacity: 0; }
    }
    @keyframes waveform {
      0%,100% { height: 4px; }
      50%      { height: 22px; }
    }
    @keyframes scanH {
      0%   { transform: translateY(0); opacity: 0.06; }
      50%  { opacity: 0.12; }
      100% { transform: translateY(100vh); opacity: 0.06; }
    }
    @keyframes borderGlow {
      0%,100% { border-color: rgba(29,111,255,0.25); }
      50%      { border-color: rgba(0,212,255,0.6); }
    }

    .anim-up   { animation: fadeInUp 0.65s ease both; }
    .anim-in   { animation: fadeIn 0.4s ease both; }
    .float     { animation: float 5s ease-in-out infinite; }
    .glow-pulse{ animation: glow-pulse 2.5s ease-in-out infinite; }
    .blink     { animation: blink 1.6s ease infinite; }

    .glass {
      background: rgba(255,255,255,0.03);
      backdrop-filter: blur(18px);
      border: 1px solid rgba(255,255,255,0.07);
    }
    .glass-blue {
      background: rgba(29,111,255,0.07);
      backdrop-filter: blur(24px);
      border: 1px solid rgba(29,111,255,0.22);
    }
    .glass-strong {
      background: rgba(255,255,255,0.055);
      backdrop-filter: blur(32px);
      border: 1px solid rgba(255,255,255,0.1);
    }

    .btn-primary {
      background: linear-gradient(135deg, #1D6FFF 0%, #00D4FF 100%);
      color: white;
      border: none;
      border-radius: 12px;
      padding: 14px 28px;
      font-family: 'Urbanist', sans-serif;
      font-weight: 700;
      font-size: 15px;
      cursor: pointer;
      transition: all 0.22s;
      box-shadow: 0 4px 24px rgba(29,111,255,0.38);
      letter-spacing: 0.3px;
    }
    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 36px rgba(29,111,255,0.55);
    }
    .btn-secondary {
      background: rgba(29,111,255,0.08);
      color: var(--blue-light);
      border: 1px solid rgba(29,111,255,0.3);
      border-radius: 12px;
      padding: 14px 28px;
      font-family: 'Urbanist', sans-serif;
      font-weight: 600;
      font-size: 15px;
      cursor: pointer;
      transition: all 0.22s;
    }
    .btn-secondary:hover {
      background: rgba(29,111,255,0.15);
      transform: translateY(-1px);
    }

    input, select, textarea { font-family: 'Mulish', sans-serif; }

    input::placeholder { color: var(--muted); }
    input:focus, select:focus {
      border-color: rgba(29,111,255,0.6) !important;
      box-shadow: 0 0 0 3px rgba(29,111,255,0.15);
      outline: none;
    }
  `}</style>
);

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
const NOMES = ["Ana Lima","Carlos Souza","Fernanda Rocha","João Pedro","Mariana Costa","Rafael Mendes","Isabela Ferreira","Bruno Alves","Patrícia Gomes","Thiago Santos","Camila Oliveira","Lucas Barbosa","Juliana Neves","Diego Carvalho","Bianca Ribeiro","Marcos Vieira","Amanda Pereira","Rodrigo Andrade","Letícia Moraes","Felipe Castro","Natália Cunha","Gustavo Lopes","Daniela Ramos","Eduardo Batista","Vanessa Pinto","Pedro Henrique","Aline Correia","William Freitas","Tatiane Monteiro","André Figueiredo"];
const TIPOS = ["Consulta Geral","Exame Rápido","Retorno Médico","Odontologia","Nutrição","Vacinação","Triagem","Atendimento Prioritário","Farmácia","Recepção"];
const GUICHES = ["Guichê 01","Guichê 02","Guichê 03","Sala A","Sala B","Consultório 1","Consultório 2","Balcão Central"];

const rng = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = arr => arr[rng(0, arr.length - 1)];

let globalCounter = rng(240, 290);
const genTicket = () => { globalCounter++; return `ZF-${globalCounter}`; };

const genQueue = (n = 13) =>
  Array.from({ length: n }, (_, i) => ({
    id: Math.random().toString(36).slice(2),
    ticket: genTicket(),
    nome: pick(NOMES),
    tipo: pick(TIPOS),
    status: i === 0 ? "em_atendimento" : i === 1 ? "proximo" : "aguardando",
    guiche: i === 0 ? pick(GUICHES) : null,
    entrou: Date.now() - rng(2, 45) * 60000,
    prioridade: Math.random() > 0.8 ? "preferencial" : "normal",
  }));

// ─── CONTEXT ──────────────────────────────────────────────────────────────────
const QueueCtx = createContext(null);

const QueueProvider = ({ children }) => {
  const [queue, setQueue]   = useState(genQueue(14));
  const [called, setCalled] = useState(null);
  const [history, setHistory] = useState([]);
  const [stats, setStats]   = useState({ total: rng(1200,1400), hoje: rng(88,120), tempo_medio: rng(6,10), satisfacao: 97 });
  const [myTicket, setMyTicket] = useState(null);
  const [toasts, setToasts] = useState([]);
  const tick = useRef(0);

  const toast = useCallback((msg, type = "info") => {
    const id = Date.now();
    setToasts(t => [...t, { id, msg, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 4200);
  }, []);

  useEffect(() => {
    const iv = setInterval(() => {
      tick.current++;
      const t = tick.current;
      setQueue(prev => {
        let q = [...prev];
        if (t % 8 === 0) {
          q = [...q, { id: Math.random().toString(36).slice(2), ticket: genTicket(), nome: pick(NOMES), tipo: pick(TIPOS), status: "aguardando", guiche: null, entrou: Date.now(), prioridade: Math.random() > 0.85 ? "preferencial" : "normal" }];
        }
        if (t % 12 === 0 && q.length > 2) {
          const em = q.find(x => x.status === "em_atendimento");
          if (em) { setHistory(h => [{ ...em, status: "concluido", fim: Date.now() }, ...h.slice(0,20)]); setStats(s => ({ ...s, total: s.total+1, hoje: s.hoje+1 })); q = q.filter(x => x.id !== em.id); }
          q = q.map((p,i) => ({ ...p, status: i===0?"em_atendimento":i===1?"proximo":"aguardando", guiche: i===0?(p.guiche||pick(GUICHES)):null }));
          if (q[0]) { setCalled(q[0]); toast(`${q[0].ticket} — ${q[0].nome.split(" ")[0]} chamado para ${q[0].guiche}`, "success"); }
        }
        q = q.map((p,i) => ({ ...p, status: i===0?"em_atendimento":i===1?"proximo":"aguardando", guiche: i===0?(p.guiche||pick(GUICHES)):null }));
        return q;
      });
      if (t % 20 === 0) setStats(s => ({ ...s, tempo_medio: Math.max(4, s.tempo_medio + (Math.random()>0.5?0.4:-0.3)) }));
    }, 1000);
    return () => clearInterval(iv);
  }, [toast]);

  const joinQueue = useCallback((nome, tipo, prioridade) => {
    const ticket = genTicket();
    const entry = { id: Math.random().toString(36).slice(2), ticket, nome, tipo, status: "aguardando", guiche: null, entrou: Date.now(), prioridade };
    setQueue(prev => [...prev, entry]);
    setMyTicket(entry);
    toast(`Você entrou na fila! Senha: ${ticket}`, "success");
    return entry;
  }, [toast]);

  const getMyPos = useCallback(() => {
    if (!myTicket) return null;
    const i = queue.findIndex(q => q.id === myTicket.id);
    return i === -1 ? null : i;
  }, [myTicket, queue]);

  return (
    <QueueCtx.Provider value={{ queue, called, history, stats, myTicket, toasts, joinQueue, getMyPos }}>
      {children}
    </QueueCtx.Provider>
  );
};

const useQueue = () => useContext(QueueCtx);

// ─── PARTICLES ────────────────────────────────────────────────────────────────
const Particles = () => (
  <div style={{ position:"fixed",inset:0,pointerEvents:"none",zIndex:0,overflow:"hidden" }}>
    {Array.from({length:20},(_,i)=>(
      <div key={i} style={{
        position:"absolute", bottom:-20, left:`${rng(3,97)}%`,
        width:rng(2,5), height:rng(2,5), borderRadius:"50%",
        background: i%3===0?"var(--cyan)":"var(--blue)",
        opacity:(rng(2,7))/10,
        animation:`particleRise ${rng(14,28)}s ${rng(0,12)}s linear infinite`,
      }}/>
    ))}
    <div style={{ position:"absolute",top:"15%",left:"10%",width:700,height:700,borderRadius:"50%",background:"radial-gradient(circle,rgba(29,111,255,0.07) 0%,transparent 70%)",filter:"blur(50px)" }}/>
    <div style={{ position:"absolute",bottom:"5%",right:"5%",width:500,height:500,borderRadius:"50%",background:"radial-gradient(circle,rgba(0,212,255,0.05) 0%,transparent 70%)",filter:"blur(40px)" }}/>
    <div style={{ position:"absolute",top:"60%",left:"50%",width:300,height:300,borderRadius:"50%",background:"radial-gradient(circle,rgba(29,111,255,0.05) 0%,transparent 70%)",filter:"blur(30px)" }}/>
    {/* Horizontal scan line */}
    <div style={{ position:"absolute",left:0,right:0,height:1,background:"linear-gradient(90deg,transparent,rgba(29,111,255,0.15),transparent)",animation:"scanH 8s linear infinite" }}/>
  </div>
);

// ─── TOASTS ───────────────────────────────────────────────────────────────────
const Toasts = () => {
  const { toasts } = useQueue();
  return (
    <div style={{ position:"fixed",top:20,right:20,zIndex:9999,display:"flex",flexDirection:"column",gap:10,maxWidth:340 }}>
      {toasts.map(n => (
        <div key={n.id} style={{
          padding:"13px 18px", borderRadius:14,
          background:"rgba(6,12,26,0.92)", backdropFilter:"blur(20px)",
          border: n.type==="success"?"1px solid rgba(0,229,131,0.35)":"1px solid rgba(29,111,255,0.4)",
          display:"flex",alignItems:"center",gap:10,fontSize:14,fontWeight:600,
          animation:"slideInRight 0.4s ease both",
          boxShadow: n.type==="success"?"0 4px 24px rgba(0,229,131,0.12)":"0 4px 24px rgba(29,111,255,0.18)",
        }}>
          <div style={{ width:8,height:8,borderRadius:"50%",background:n.type==="success"?"var(--green)":"var(--cyan)",flexShrink:0,animation:"blink 1s infinite" }}/>
          {n.msg}
        </div>
      ))}
    </div>
  );
};

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
const Navbar = ({ page, setPage }) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(()=>{ const fn=()=>setScrolled(window.scrollY>40); window.addEventListener("scroll",fn); return()=>window.removeEventListener("scroll",fn); },[]);

  return (
    <nav style={{
      position:"fixed",top:0,left:0,right:0,zIndex:1000,
      padding:"0 28px",height:66,
      display:"flex",alignItems:"center",justifyContent:"space-between",
      background: scrolled?"rgba(6,12,26,0.88)":"transparent",
      backdropFilter: scrolled?"blur(24px)":"none",
      borderBottom: scrolled?"1px solid rgba(29,111,255,0.12)":"none",
      transition:"all 0.35s",
    }}>
      <div onClick={()=>setPage("home")} style={{ cursor:"pointer",display:"flex",alignItems:"center",gap:11 }}>
        <div style={{
          width:38,height:38,borderRadius:12,
          background:"linear-gradient(135deg,#1D6FFF,#00D4FF)",
          display:"flex",alignItems:"center",justifyContent:"center",
          fontSize:17,fontWeight:900,fontFamily:"Urbanist",
          boxShadow:"0 4px 18px rgba(29,111,255,0.45)",
        }}>Z</div>
        <span style={{ fontFamily:"Urbanist",fontWeight:900,fontSize:21,letterSpacing:"-0.5px" }}>
          Zero<span style={{ color:"var(--cyan)" }}>Fila</span>
        </span>
      </div>

      <div style={{ display:"flex",gap:6,alignItems:"center" }}>
        {[{id:"painel",label:"Painel"},{id:"admin",label:"Admin"},{id:"login",label:"Login"}].map(item=>(
          <button key={item.id} onClick={()=>setPage(item.id)} style={{
            background: page===item.id?"rgba(29,111,255,0.18)":"transparent",
            color: page===item.id?"var(--blue-light)":"var(--muted)",
            border:"1px solid",
            borderColor: page===item.id?"rgba(29,111,255,0.45)":"transparent",
            borderRadius:9,padding:"7px 15px",cursor:"pointer",
            fontSize:13,fontWeight:600,fontFamily:"Urbanist",
            transition:"all 0.2s",
          }}>{item.label}</button>
        ))}
        <button onClick={()=>setPage("fila")} className="btn-primary" style={{ padding:"9px 22px",fontSize:14,borderRadius:10 }}>
          Entrar na Fila →
        </button>
      </div>
    </nav>
  );
};

// ─── STATUS BADGE ─────────────────────────────────────────────────────────────
const Badge = ({ status, small }) => {
  const M = {
    em_atendimento:{ label:"Em atendimento", color:"#4F94FF", bg:"rgba(29,111,255,0.16)" },
    proximo:       { label:"Próximo",         color:"#00D4FF", bg:"rgba(0,212,255,0.13)" },
    aguardando:    { label:"Aguardando",      color:"#5A6A8A", bg:"rgba(90,106,138,0.12)" },
    concluido:     { label:"Concluído",       color:"#00E583", bg:"rgba(0,229,131,0.14)" },
  };
  const s = M[status]||M.aguardando;
  return (
    <span style={{
      background:s.bg, color:s.color,
      border:`1px solid ${s.color}40`,
      borderRadius:small?6:9,
      padding:small?"3px 8px":"5px 13px",
      fontSize:small?10:12,fontWeight:700,
      letterSpacing:0.3,whiteSpace:"nowrap",
    }}>{s.label}</span>
  );
};

// ─── LIVE PREVIEW ─────────────────────────────────────────────────────────────
const LivePreview = ({ queue }) => (
  <div className="glass-blue glow-pulse" style={{ borderRadius:24,padding:22,maxWidth:480,width:"100%" }}>
    <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16 }}>
      <div style={{ display:"flex",gap:6 }}>
        {["#FF5F57","#FEBC2E","#28C840"].map(c=><div key={c} style={{ width:11,height:11,borderRadius:"50%",background:c }}/>)}
      </div>
      <div style={{ display:"flex",gap:7,alignItems:"center" }}>
        <div style={{ width:7,height:7,borderRadius:"50%",background:"var(--green)",animation:"blink 1.2s infinite" }}/>
        <span style={{ fontSize:12,color:"var(--muted)",fontWeight:600 }}>Ao vivo agora</span>
      </div>
    </div>
    <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
      {queue.slice(0,5).map((p,i)=>(
        <div key={p.id} style={{
          display:"flex",alignItems:"center",gap:12,
          padding:"12px 14px",borderRadius:13,
          background:i===0?"rgba(29,111,255,0.2)":"rgba(255,255,255,0.025)",
          border:i===0?"1px solid rgba(29,111,255,0.5)":"1px solid rgba(255,255,255,0.05)",
          transition:"all 0.5s",
          animation:i===0?"callAnim 2.5s ease-in-out infinite":"none",
        }}>
          <span style={{ fontFamily:"Urbanist",fontWeight:900,fontSize:15,color:i===0?"var(--cyan)":"rgba(255,255,255,0.45)",minWidth:74 }}>{p.ticket}</span>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:13,fontWeight:600 }}>{p.nome.split(" ")[0]} {p.nome.split(" ")[1]?.charAt(0)}.</div>
            <div style={{ fontSize:11,color:"var(--muted)" }}>{p.tipo}</div>
          </div>
          <Badge status={p.status} small/>
        </div>
      ))}
    </div>
  </div>
);

// ─── QR CODE ──────────────────────────────────────────────────────────────────
const QRCode = () => {
  const url = typeof window!=="undefined"?window.location.href:"https://zerofila.app";
  const src = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(url)}&bgcolor=0C1426&color=FFFFFF&margin=10`;
  return (
    <div style={{ display:"inline-block",position:"relative" }}>
      <div className="glass-blue glow-pulse" style={{ borderRadius:26,padding:26,display:"inline-block",animation:"borderGlow 3s ease infinite" }}>
        <img src={src} alt="QR Code" style={{ width:180,height:180,borderRadius:14,display:"block" }}/>
        <div style={{ textAlign:"center",marginTop:14 }}>
          <div style={{ fontFamily:"Urbanist",fontWeight:900,fontSize:19 }}>Zero<span style={{ color:"var(--cyan)" }}>Fila</span></div>
          <div style={{ fontSize:12,color:"var(--muted)",marginTop:4,fontWeight:500 }}>Escaneie com a câmera do celular</div>
        </div>
      </div>
      <div style={{ position:"absolute",top:-9,right:-9,width:26,height:26,borderRadius:"50%",background:"var(--green)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,boxShadow:"0 0 14px rgba(0,229,131,0.5)",animation:"blink 2s infinite" }}>✓</div>
    </div>
  );
};

// ─── LANDING PAGE ─────────────────────────────────────────────────────────────
const Landing = ({ setPage }) => {
  const { stats, queue } = useQueue();
  const [c, setC] = useState({ a:0, r:0, s:0, e:0 });

  useEffect(()=>{
    const targets={a:12847,r:73,s:98,e:320};
    let start=null;
    const run=ts=>{ if(!start)start=ts; const p=Math.min((ts-start)/2200,1); const e=1-Math.pow(1-p,3); setC({a:Math.floor(e*targets.a),r:Math.floor(e*targets.r),s:Math.floor(e*targets.s),e:Math.floor(e*targets.e)}); if(p<1)requestAnimationFrame(run); };
    setTimeout(()=>requestAnimationFrame(run),600);
  },[]);

  const testimonials=[
    {nome:"Dra. Ana Beatriz Santos",cargo:"Diretora Médica",empresa:"Clínica São Lucas",text:"Reduziram 80% das reclamações de espera. Nossos pacientes adoraram a experiência.",av:"AB"},
    {nome:"Roberto Fonseca",cargo:"Gerente de Operações",empresa:"Barbearia Apex",text:"A implementação foi instantânea. Em 10 minutos já estava funcionando perfeitamente.",av:"RF"},
    {nome:"Camila Teixeira",cargo:"Coordenadora",empresa:"Boteco do Chef",text:"Zero reclamações sobre fila desde que instalamos. Simplesmente incrível.",av:"CT"},
    {nome:"Dr. Marcos Leal",cargo:"Dentista & Sócio",empresa:"OralCare Clínica",text:"Profissionalismo total. A experiência do paciente mudou completamente.",av:"ML"},
  ];

  return (
    <div style={{ minHeight:"100vh",overflowX:"hidden" }}>

      {/* ── HERO ── */}
      <section style={{ minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"110px 24px 60px",textAlign:"center",position:"relative" }}>
        <div style={{ position:"absolute",top:"28%",left:"50%",transform:"translateX(-50%)",width:900,height:650,background:"radial-gradient(ellipse,rgba(29,111,255,0.1) 0%,transparent 70%)",filter:"blur(60px)",pointerEvents:"none" }}/>

        {/* live badge */}
        <div className="glass-blue anim-up" style={{ display:"inline-flex",alignItems:"center",gap:9,padding:"8px 20px",borderRadius:100,marginBottom:30,animationDelay:"0.05s",opacity:0 }}>
          <div style={{ width:7,height:7,borderRadius:"50%",background:"var(--green)",animation:"blink 1.4s infinite" }}/>
          <span style={{ fontSize:13,color:"rgba(255,255,255,0.65)",fontWeight:600 }}>
            Sistema ativo · <span style={{ color:"var(--cyan)" }}>{queue.length}</span> pessoas na fila agora
          </span>
        </div>

        <h1 className="anim-up" style={{ fontSize:"clamp(44px,7.5vw,92px)",fontWeight:900,lineHeight:1.03,letterSpacing:"-2.5px",maxWidth:880,marginBottom:26,animationDelay:"0.15s",opacity:0 }}>
          Chega de perder<br/>
          <span style={{ background:"linear-gradient(90deg,#1D6FFF 0%,#00D4FF 60%,#4F94FF 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>
            tempo em filas.
          </span>
        </h1>

        <p className="anim-up" style={{ fontSize:"clamp(16px,2.2vw,20px)",color:"var(--muted)",maxWidth:560,lineHeight:1.75,marginBottom:42,animationDelay:"0.28s",opacity:0,fontWeight:400 }}>
          Entre na fila digitalmente, acompanhe sua posição em tempo real e seja chamado sem aglomeração.
        </p>

        <div className="anim-up" style={{ display:"flex",gap:14,flexWrap:"wrap",justifyContent:"center",animationDelay:"0.42s",opacity:0 }}>
          <button onClick={()=>setPage("fila")} className="btn-primary" style={{ padding:"17px 38px",fontSize:16,borderRadius:14 }}>
            ⚡ Entrar na fila agora
          </button>
          <button onClick={()=>setPage("painel")} className="btn-secondary" style={{ padding:"17px 38px",fontSize:16,borderRadius:14 }}>
            Ver demonstração →
          </button>
        </div>

        <div className="anim-up float" style={{ marginTop:64,width:"min(520px,95vw)",animationDelay:"0.6s",opacity:0 }}>
          <LivePreview queue={queue}/>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ padding:"72px 24px",borderTop:"1px solid rgba(29,111,255,0.1)" }}>
        <div style={{ maxWidth:960,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:20 }}>
          {[
            {val:`+${c.a.toLocaleString("pt-BR")}`,label:"Atendimentos",icon:"👥"},
            {val:`${c.r}%`,label:"Redução de espera",icon:"⚡"},
            {val:`${c.s}%`,label:"Satisfação",icon:"⭐"},
            {val:`+${c.e}`,label:"Empresas ativas",icon:"🏢"},
          ].map((s,i)=>(
            <div key={i} className="glass" style={{ padding:"30px 24px",borderRadius:22,textAlign:"center",border:"1px solid rgba(29,111,255,0.14)",transition:"all 0.3s" }}>
              <div style={{ fontSize:30,marginBottom:10 }}>{s.icon}</div>
              <div style={{ fontSize:42,fontWeight:900,fontFamily:"Urbanist",letterSpacing:"-1px",background:"linear-gradient(135deg,#fff,rgba(255,255,255,0.7))",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>{s.val}</div>
              <div style={{ color:"var(--muted)",fontSize:14,marginTop:6,fontWeight:500 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ padding:"72px 24px" }}>
        <div style={{ maxWidth:860,margin:"0 auto",textAlign:"center" }}>
          <div style={{ color:"var(--cyan)",fontSize:12,fontWeight:700,letterSpacing:2.5,textTransform:"uppercase",marginBottom:14 }}>Como funciona</div>
          <h2 style={{ fontSize:"clamp(28px,4vw,46px)",fontWeight:900,marginBottom:56,letterSpacing:"-1.5px" }}>Simples como três passos</h2>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:20 }}>
            {[
              {n:"01",icon:"📱",title:"Escaneie o QR Code",desc:"Acesse a fila pelo seu celular, em qualquer lugar, sem instalar nada."},
              {n:"02",icon:"✍️",title:"Entre na fila digital",desc:"Preencha seu nome e tipo de atendimento em poucos segundos."},
              {n:"03",icon:"🔔",title:"Aguarde sua chamada",desc:"Receba alertas e acompanhe sua posição em tempo real."},
            ].map((s,i)=>(
              <div key={i} className="glass" style={{ padding:"36px 26px",borderRadius:22,border:"1px solid rgba(255,255,255,0.07)",position:"relative",overflow:"hidden" }}>
                <div style={{ position:"absolute",top:14,right:18,fontSize:52,fontWeight:900,fontFamily:"Urbanist",color:"rgba(29,111,255,0.07)",lineHeight:1 }}>{s.n}</div>
                <div style={{ fontSize:38,marginBottom:16 }}>{s.icon}</div>
                <h3 style={{ fontSize:18,fontWeight:800,marginBottom:10,letterSpacing:"-0.3px" }}>{s.title}</h3>
                <p style={{ color:"var(--muted)",fontSize:14,lineHeight:1.65 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI SECTION ── */}
      <section style={{ padding:"72px 24px",background:"rgba(29,111,255,0.04)",borderTop:"1px solid rgba(29,111,255,0.1)" }}>
        <div style={{ maxWidth:960,margin:"0 auto" }}>
          <div style={{ textAlign:"center",marginBottom:52 }}>
            <div style={{ display:"inline-flex",gap:8,alignItems:"center",background:"rgba(0,212,255,0.1)",borderRadius:100,padding:"7px 18px",border:"1px solid rgba(0,212,255,0.3)",marginBottom:16 }}>
              <span style={{ fontSize:11,color:"var(--cyan)",fontWeight:800,letterSpacing:2,textTransform:"uppercase" }}>✦ ZeroFila AI</span>
            </div>
            <h2 style={{ fontSize:"clamp(24px,3.5vw,42px)",fontWeight:900,letterSpacing:"-1.5px" }}>
              Inteligência que prevê,<br/>otimiza e encanta.
            </h2>
            <p style={{ color:"var(--muted)",marginTop:14,fontSize:16,maxWidth:500,margin:"14px auto 0",lineHeight:1.65 }}>
              ZeroFila AI prevê o tempo médio de espera com precisão inteligente, adaptando o fluxo em tempo real.
            </p>
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:16 }}>
            {[
              {icon:"🎯",title:"Previsão de tempo",desc:"Algoritmo aprende com padrões de atendimento histórico.",color:"#1D6FFF"},
              {icon:"🔄",title:"Otimização de fluxo",desc:"Redistribui filas automaticamente para reduzir gargalos.",color:"#00D4FF"},
              {icon:"📉",title:"Menos aglomeração",desc:"Pessoas esperam em qualquer lugar, não na porta.",color:"#00E583"},
              {icon:"✨",title:"Experiência zero fila",desc:"Do físico ao digital em segundos. Zero fricção.",color:"#FFB800"},
            ].map((card,i)=>(
              <div key={i} className="glass-strong" style={{ padding:"28px 22px",borderRadius:20,border:`1px solid ${card.color}22` }}>
                <div style={{ width:50,height:50,borderRadius:15,background:`${card.color}18`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,marginBottom:16,border:`1px solid ${card.color}30` }}>{card.icon}</div>
                <h3 style={{ fontSize:16,fontWeight:800,marginBottom:8,letterSpacing:"-0.3px" }}>{card.title}</h3>
                <p style={{ fontSize:13,color:"var(--muted)",lineHeight:1.6 }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding:"72px 24px" }}>
        <div style={{ maxWidth:960,margin:"0 auto" }}>
          <h2 style={{ textAlign:"center",fontSize:"clamp(24px,3vw,38px)",fontWeight:900,marginBottom:48,letterSpacing:"-1.5px" }}>Quem usa, não volta atrás</h2>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:18 }}>
            {testimonials.map((t,i)=>(
              <div key={i} className="glass" style={{ padding:"28px",borderRadius:22,border:"1px solid rgba(255,255,255,0.07)" }}>
                <div style={{ display:"flex",gap:3,marginBottom:14 }}>{Array(5).fill(0).map((_,j)=><span key={j} style={{ color:"#FFB800",fontSize:14 }}>★</span>)}</div>
                <p style={{ color:"rgba(255,255,255,0.78)",fontSize:14,lineHeight:1.7,marginBottom:20 }}>"{t.text}"</p>
                <div style={{ display:"flex",gap:12,alignItems:"center" }}>
                  <div style={{ width:42,height:42,borderRadius:"50%",background:"linear-gradient(135deg,#1D6FFF,#00D4FF)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:800,flexShrink:0 }}>{t.av}</div>
                  <div>
                    <div style={{ fontSize:14,fontWeight:700 }}>{t.nome}</div>
                    <div style={{ fontSize:12,color:"var(--muted)" }}>{t.cargo} · {t.empresa}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── QR CODE ── */}
      <section style={{ padding:"80px 24px",background:"linear-gradient(180deg,rgba(29,111,255,0.07) 0%,transparent 100%)",borderTop:"1px solid rgba(29,111,255,0.1)" }}>
        <div style={{ maxWidth:560,margin:"0 auto",textAlign:"center" }}>
          <h2 style={{ fontSize:"clamp(24px,3vw,40px)",fontWeight:900,marginBottom:14,letterSpacing:"-1.5px" }}>Escaneie e entre<br/>na fila agora mesmo</h2>
          <p style={{ color:"var(--muted)",marginBottom:40,fontSize:16 }}>Aponte a câmera do celular para o QR Code abaixo.</p>
          <QRCode/>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ padding:"48px 24px",borderTop:"1px solid rgba(29,111,255,0.1)" }}>
        <div style={{ maxWidth:960,margin:"0 auto" }}>
          <div style={{ display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:32,marginBottom:40 }}>
            <div>
              <div style={{ fontFamily:"Urbanist",fontWeight:900,fontSize:24,marginBottom:8 }}>Zero<span style={{ color:"var(--cyan)" }}>Fila</span></div>
              <div style={{ color:"var(--muted)",fontSize:14,fontWeight:500 }}>Seu tempo vale mais.</div>
              <div style={{ display:"flex",gap:10,marginTop:16 }}>
                {["𝕏","in","ig","yt"].map(s=>(
                  <div key={s} className="glass" style={{ width:36,height:36,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,cursor:"pointer",border:"1px solid rgba(29,111,255,0.18)" }}>{s}</div>
                ))}
              </div>
            </div>
            {[
              {title:"Produto",links:["Funcionalidades","Preços","API","Integrações"]},
              {title:"Empresa",links:["Sobre nós","Blog","Carreiras","Parceiros"]},
              {title:"Legal",links:["LGPD","Privacidade","Termos de Uso","Cookies"]},
            ].map((col,i)=>(
              <div key={i}>
                <div style={{ fontWeight:700,fontSize:14,marginBottom:16,fontFamily:"Urbanist" }}>{col.title}</div>
                {col.links.map(l=><div key={l} style={{ color:"var(--muted)",fontSize:13,marginBottom:10,cursor:"pointer",fontWeight:500 }}>{l}</div>)}
              </div>
            ))}
          </div>
          <div style={{ borderTop:"1px solid rgba(255,255,255,0.05)",paddingTop:24,display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:12 }}>
            <div style={{ color:"var(--muted)",fontSize:13 }}>© 2025 ZeroFila Tecnologia LTDA · Todos os direitos reservados.</div>
            <div style={{ color:"var(--muted)",fontSize:13 }}>CNPJ 42.731.088/0001-XX · São Paulo, Brasil</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// ─── FILA PAGE ─────────────────────────────────────────────────────────────────
const FilaPage = ({ setPage }) => {
  const { joinQueue, myTicket, queue, getMyPos } = useQueue();
  const [step, setStep] = useState(myTicket ? 2 : 1);
  const [form, setForm] = useState({ nome:"", tipo:TIPOS[0], prioridade:"normal" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const submit = () => {
    const errs = {};
    if (!form.nome.trim() || form.nome.trim().length < 3) errs.nome = "Nome deve ter ao menos 3 caracteres.";
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    setTimeout(() => { joinQueue(form.nome.trim(), form.tipo, form.prioridade); setLoading(false); setStep(2); }, 1300);
  };

  const pos = getMyPos();
  const myEntry = myTicket ? queue.find(q=>q.id===myTicket.id) : null;
  const est = pos !== null ? Math.max(1, pos*4+rng(1,3)) : null;

  return (
    <div style={{ minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:"80px 20px" }}>
      <div style={{ width:"100%",maxWidth:480 }}>
        {step===1 && (
          <div className="glass-strong anim-up" style={{ borderRadius:28,padding:"44px 40px",border:"1px solid rgba(29,111,255,0.25)" }}>
            <div style={{ textAlign:"center",marginBottom:36 }}>
              <div style={{ width:66,height:66,borderRadius:22,background:"linear-gradient(135deg,#1D6FFF,#00D4FF)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 20px",fontSize:28,boxShadow:"0 8px 32px rgba(29,111,255,0.4)" }}>🎟</div>
              <h2 style={{ fontFamily:"Urbanist",fontSize:28,fontWeight:900,marginBottom:8,letterSpacing:"-0.5px" }}>Entrar na Fila</h2>
              <p style={{ color:"var(--muted)",fontSize:15 }}>Preencha os dados para pegar sua senha.</p>
            </div>
            <div style={{ display:"flex",flexDirection:"column",gap:18 }}>
              <div>
                <label style={{ fontSize:13,fontWeight:700,display:"block",marginBottom:8,color:"rgba(255,255,255,0.75)",letterSpacing:"0.3px" }}>Seu nome completo</label>
                <input type="text" placeholder="Ex: Maria Fernanda Santos" value={form.nome}
                  onChange={e=>{setForm(f=>({...f,nome:e.target.value}));setErrors({});}}
                  style={{ width:"100%",padding:"14px 16px",background:"rgba(255,255,255,0.045)",border:errors.nome?"1px solid var(--red)":"1px solid rgba(29,111,255,0.2)",borderRadius:12,color:"white",fontSize:15,transition:"all 0.2s" }}/>
                {errors.nome&&<div style={{ color:"var(--red)",fontSize:12,marginTop:6,fontWeight:600 }}>{errors.nome}</div>}
              </div>
              <div>
                <label style={{ fontSize:13,fontWeight:700,display:"block",marginBottom:8,color:"rgba(255,255,255,0.75)" }}>Tipo de atendimento</label>
                <select value={form.tipo} onChange={e=>setForm(f=>({...f,tipo:e.target.value}))}
                  style={{ width:"100%",padding:"14px 16px",background:"rgba(255,255,255,0.045)",border:"1px solid rgba(29,111,255,0.2)",borderRadius:12,color:"white",fontSize:15 }}>
                  {TIPOS.map(t=><option key={t} value={t} style={{ background:"#0C1426" }}>{t}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize:13,fontWeight:700,display:"block",marginBottom:10,color:"rgba(255,255,255,0.75)" }}>Prioridade</label>
                <div style={{ display:"flex",gap:10 }}>
                  {["normal","preferencial"].map(p=>(
                    <div key={p} onClick={()=>setForm(f=>({...f,prioridade:p}))} style={{
                      flex:1,padding:"12px 16px",borderRadius:12,cursor:"pointer",textAlign:"center",
                      border:form.prioridade===p?"1px solid rgba(29,111,255,0.55)":"1px solid rgba(255,255,255,0.07)",
                      background:form.prioridade===p?"rgba(29,111,255,0.18)":"rgba(255,255,255,0.03)",
                      fontSize:14,fontWeight:700,fontFamily:"Urbanist",transition:"all 0.22s",
                      color:form.prioridade===p?"var(--blue-light)":"var(--muted)",
                    }}>
                      {p==="normal"?"Normal":"⭐ Preferencial"}
                    </div>
                  ))}
                </div>
              </div>
              <button onClick={submit} disabled={loading} className="btn-primary" style={{ width:"100%",padding:"16px",fontSize:16,borderRadius:14,marginTop:8,opacity:loading?0.8:1 }}>
                {loading
                  ? <span style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:10 }}><div style={{ width:18,height:18,border:"2px solid rgba(255,255,255,0.3)",borderTopColor:"white",borderRadius:"50%",animation:"spin 0.8s linear infinite" }}/>Entrando...</span>
                  : "Pegar minha senha →"}
              </button>
            </div>
          </div>
        )}

        {step===2 && myTicket && (
          <div className="anim-in" style={{ display:"flex",flexDirection:"column",gap:18 }}>
            {/* Ticket */}
            <div className="glass-strong" style={{ borderRadius:28,padding:"36px",border:"1px solid rgba(29,111,255,0.4)",textAlign:"center",boxShadow:"0 24px 64px rgba(29,111,255,0.2)" }}>
              <div style={{ color:"var(--muted)",fontSize:12,fontWeight:700,letterSpacing:2.5,textTransform:"uppercase",marginBottom:12 }}>Sua senha</div>
              <div style={{ fontSize:74,fontWeight:900,fontFamily:"Urbanist",letterSpacing:-2,background:"linear-gradient(135deg,#1D6FFF,#00D4FF)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",animation:"callAnim 3s ease-in-out infinite" }}>
                {myTicket.ticket}
              </div>
              {myEntry?.prioridade==="preferencial"&&(
                <div style={{ display:"inline-block",background:"rgba(255,184,0,0.12)",border:"1px solid rgba(255,184,0,0.3)",color:"#FFB800",borderRadius:8,padding:"4px 14px",fontSize:12,fontWeight:700,marginTop:8 }}>⭐ Atendimento Preferencial</div>
              )}
              <div style={{ marginTop:22,paddingTop:22,borderTop:"1px solid rgba(255,255,255,0.07)",display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:16 }}>
                {[{label:"Posição",val:pos!==null?`${pos+1}°`:"—"},{label:"À frente",val:pos!==null?pos:"—"},{label:"Estimado",val:est?`~${est}min`:"—"}].map((s,i)=>(
                  <div key={i}>
                    <div style={{ fontSize:24,fontWeight:900,fontFamily:"Urbanist" }}>{s.val}</div>
                    <div style={{ fontSize:11,color:"var(--muted)",marginTop:3,fontWeight:500 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress */}
            <div className="glass" style={{ borderRadius:20,padding:"24px",border:"1px solid rgba(29,111,255,0.15)" }}>
              <div style={{ display:"flex",justifyContent:"space-between",marginBottom:12 }}>
                <span style={{ fontSize:13,fontWeight:700 }}>Progresso da fila</span>
                <Badge status={myEntry?.status||"aguardando"}/>
              </div>
              <div style={{ background:"rgba(255,255,255,0.06)",borderRadius:100,height:8,overflow:"hidden" }}>
                <div style={{ height:"100%",borderRadius:100,background:"linear-gradient(90deg,#1D6FFF,#00D4FF)",width:pos!==null?`${Math.max(10,100-(pos/queue.length)*100)}%`:"10%",transition:"width 1.5s ease",boxShadow:"0 0 14px rgba(29,111,255,0.7)" }}/>
              </div>
            </div>

            {/* Queue live */}
            <div className="glass" style={{ borderRadius:20,padding:"24px",border:"1px solid rgba(29,111,255,0.12)" }}>
              <div style={{ fontSize:13,fontWeight:700,marginBottom:14,display:"flex",alignItems:"center",gap:8 }}>
                <div style={{ width:7,height:7,borderRadius:"50%",background:"var(--green)",animation:"blink 1.2s infinite" }}/>
                Fila ao vivo · {queue.length} pessoas
              </div>
              <div style={{ display:"flex",flexDirection:"column",gap:7,maxHeight:240,overflowY:"auto" }}>
                {queue.slice(0,8).map((p,i)=>(
                  <div key={p.id} style={{
                    display:"flex",gap:10,alignItems:"center",padding:"10px 12px",borderRadius:10,
                    background:p.id===myTicket.id?"rgba(29,111,255,0.15)":"rgba(255,255,255,0.025)",
                    border:p.id===myTicket.id?"1px solid rgba(29,111,255,0.4)":"1px solid transparent",
                    fontSize:13,transition:"all 0.45s",
                  }}>
                    <span style={{ color:"var(--muted)",fontWeight:800,minWidth:22 }}>{i+1}</span>
                    <span style={{ fontFamily:"Urbanist",fontWeight:800,color:p.id===myTicket.id?"var(--cyan)":"rgba(255,255,255,0.65)",minWidth:78 }}>{p.ticket}</span>
                    <span style={{ flex:1,fontSize:12,color:"var(--muted)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{p.nome.split(" ")[0]}</span>
                    <Badge status={p.status} small/>
                  </div>
                ))}
              </div>
            </div>
            <button onClick={()=>setPage("painel")} className="btn-secondary" style={{ borderRadius:14 }}>Ver painel de chamadas →</button>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── PAINEL ────────────────────────────────────────────────────────────────────
const Painel = () => {
  const { queue, called, stats } = useQueue();
  const [time, setTime] = useState(new Date());
  const [flash, setFlash] = useState(false);
  useEffect(()=>{ const t=setInterval(()=>setTime(new Date()),1000); return()=>clearInterval(t); },[]);
  useEffect(()=>{ if(called){setFlash(true);setTimeout(()=>setFlash(false),2200);} },[called]);

  const em = queue.find(x=>x.status==="em_atendimento");
  const proximos = queue.filter(x=>x.status!=="em_atendimento").slice(0,3);

  return (
    <div style={{ minHeight:"100vh",padding:"80px 24px 32px",background:flash?"rgba(29,111,255,0.04)":"transparent",transition:"background 0.5s" }}>
      <div style={{ maxWidth:1100,margin:"0 auto" }}>
        {/* Header */}
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:32 }}>
          <div>
            <div style={{ fontFamily:"Urbanist",fontWeight:900,fontSize:30,letterSpacing:"-1px" }}>
              Zero<span style={{ color:"var(--cyan)" }}>Fila</span>
              <span style={{ fontSize:14,fontWeight:500,color:"var(--muted)",marginLeft:12,letterSpacing:0 }}>Painel de Atendimento</span>
            </div>
          </div>
          <div style={{ textAlign:"right" }}>
            <div style={{ fontFamily:"Urbanist",fontWeight:900,fontSize:34,letterSpacing:"-1.5px" }}>
              {time.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit",second:"2-digit"})}
            </div>
            <div style={{ color:"var(--muted)",fontSize:13,marginTop:2,fontWeight:500 }}>
              {time.toLocaleDateString("pt-BR",{weekday:"long",day:"numeric",month:"long"})}
            </div>
          </div>
        </div>

        {/* Main ticket */}
        <div className="glass-strong" style={{
          borderRadius:28,padding:"52px 44px",textAlign:"center",marginBottom:24,
          border:flash?"1px solid rgba(0,212,255,0.7)":"1px solid rgba(29,111,255,0.3)",
          boxShadow:flash?"0 0 80px rgba(29,111,255,0.3)":"none",
          transition:"all 0.5s",position:"relative",overflow:"hidden",
          animation:flash?"borderGlow 0.5s ease":"none",
        }}>
          <div style={{ color:"var(--muted)",fontSize:12,fontWeight:800,letterSpacing:3,textTransform:"uppercase",marginBottom:18 }}>▶ Senha em Atendimento</div>
          <div style={{
            fontSize:"clamp(88px,14vw,148px)",fontWeight:900,fontFamily:"Urbanist",letterSpacing:-4,
            background:"linear-gradient(135deg,#1D6FFF 0%,#00D4FF 100%)",
            WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",
            lineHeight:1,animation:flash?"callAnim 0.5s ease":"none",
          }}>{em?.ticket||"—"}</div>
          {em&&(
            <div style={{ marginTop:18 }}>
              <div style={{ fontSize:26,fontWeight:700,fontFamily:"Urbanist" }}>{em.nome}</div>
              <div style={{ color:"var(--muted)",fontSize:15,marginTop:5,fontWeight:500 }}>{em.tipo}</div>
              <div style={{ display:"inline-block",marginTop:14,background:"rgba(29,111,255,0.18)",border:"1px solid rgba(29,111,255,0.5)",color:"var(--blue-light)",borderRadius:12,padding:"9px 22px",fontSize:17,fontWeight:800,fontFamily:"Urbanist",letterSpacing:"-0.5px" }}>{em.guiche}</div>
            </div>
          )}
          {/* waveform */}
          <div style={{ display:"flex",gap:4,justifyContent:"center",marginTop:30,alignItems:"flex-end",height:30 }}>
            {Array.from({length:14}).map((_,i)=>(
              <div key={i} style={{ width:4,borderRadius:2,background:`rgba(29,111,255,${0.25+Math.random()*0.75})`,animation:`waveform ${(0.45+Math.random()*0.9).toFixed(2)}s ${(Math.random()*0.5).toFixed(2)}s ease-in-out infinite` }}/>
            ))}
          </div>
        </div>

        {/* Proximos */}
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:16,marginBottom:20 }}>
          {proximos.map((p,i)=>(
            <div key={p.id} className="glass" style={{ borderRadius:20,padding:"24px 22px",border:i===0?"1px solid rgba(0,212,255,0.35)":"1px solid rgba(255,255,255,0.07)" }}>
              <div style={{ color:"var(--muted)",fontSize:11,fontWeight:800,letterSpacing:2,textTransform:"uppercase",marginBottom:8 }}>{i===0?"Próximo":`${i+1}°`}</div>
              <div style={{ fontFamily:"Urbanist",fontWeight:900,fontSize:34,letterSpacing:-1,color:i===0?"var(--cyan)":"rgba(255,255,255,0.55)" }}>{p.ticket}</div>
              <div style={{ fontSize:13,marginTop:5,color:"rgba(255,255,255,0.7)",fontWeight:600 }}>{p.nome.split(" ")[0]}</div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(155px,1fr))",gap:14,marginBottom:20 }}>
          {[
            {label:"Na fila",val:queue.length,icon:"👥",color:"var(--blue-light)"},
            {label:"Atendidos hoje",val:stats.hoje,icon:"✅",color:"var(--green)"},
            {label:"Tempo médio",val:`${stats.tempo_medio.toFixed(1)}min`,icon:"⏱",color:"var(--cyan)"},
            {label:"Satisfação",val:`${stats.satisfacao}%`,icon:"⭐",color:"#FFB800"},
            {label:"Total geral",val:stats.total.toLocaleString("pt-BR"),icon:"📊",color:"var(--muted)"},
          ].map((s,i)=>(
            <div key={i} className="glass" style={{ borderRadius:16,padding:"18px 16px",border:"1px solid rgba(29,111,255,0.1)" }}>
              <div style={{ fontSize:22,marginBottom:8 }}>{s.icon}</div>
              <div style={{ fontFamily:"Urbanist",fontWeight:900,fontSize:26,color:s.color }}>{s.val}</div>
              <div style={{ fontSize:12,color:"var(--muted)",marginTop:3,fontWeight:500 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Ticker */}
        <div style={{ overflow:"hidden",background:"rgba(29,111,255,0.06)",border:"1px solid rgba(29,111,255,0.15)",borderRadius:12,padding:"12px 0" }}>
          <div style={{ display:"flex",animation:"ticker 28s linear infinite",gap:48,whiteSpace:"nowrap" }}>
            {[...queue,...queue].map((p,i)=>(
              <span key={i} style={{ fontSize:13,color:"var(--muted)",padding:"0 4px",fontWeight:500 }}>
                <span style={{ color:"var(--cyan)",fontWeight:800 }}>{p.ticket}</span> · {p.nome.split(" ")[0]} · {p.tipo}
                <span style={{ color:"rgba(29,111,255,0.4)",margin:"0 16px" }}>◆</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── ADMIN ────────────────────────────────────────────────────────────────────
const Admin = () => {
  const { queue, stats, history } = useQueue();
  const hourly = Array.from({length:12},(_,i)=>({ hora:`${8+i}h`, atend:rng(8,28), espera:rng(4,14) }));
  const barMax = Math.max(...hourly.map(d=>d.atend));

  return (
    <div style={{ minHeight:"100vh",padding:"80px 24px 48px" }}>
      <div style={{ maxWidth:1100,margin:"0 auto" }}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:36 }}>
          <div>
            <div style={{ color:"var(--muted)",fontSize:12,fontWeight:800,marginBottom:6,letterSpacing:2,textTransform:"uppercase" }}>Painel Administrativo</div>
            <h1 style={{ fontFamily:"Urbanist",fontWeight:900,fontSize:34,letterSpacing:"-1.5px" }}>
              Dashboard <span style={{ color:"var(--cyan)" }}>ZeroFila</span>
            </h1>
          </div>
          <div className="glass" style={{ borderRadius:10,padding:"9px 16px",fontSize:12,color:"var(--muted)",display:"flex",alignItems:"center",gap:7,border:"1px solid rgba(29,111,255,0.2)" }}>
            <div style={{ width:6,height:6,borderRadius:"50%",background:"var(--green)",animation:"blink 1.5s infinite" }}/>
            Sistema operacional
          </div>
        </div>

        {/* KPIs */}
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(175px,1fr))",gap:16,marginBottom:26 }}>
          {[
            {label:"Fila atual",val:queue.length,delta:"+2",icon:"👥",color:"#1D6FFF"},
            {label:"Atendidos hoje",val:stats.hoje,delta:"+8",icon:"✅",color:"#00E583"},
            {label:"Tempo médio",val:`${stats.tempo_medio.toFixed(1)}min`,delta:"-0.5",icon:"⏱",color:"#00D4FF"},
            {label:"Satisfação",val:`${stats.satisfacao}%`,delta:"+1%",icon:"⭐",color:"#FFB800"},
            {label:"Total acumulado",val:stats.total.toLocaleString("pt-BR"),delta:"+1.2k",icon:"📈",color:"#A78BFA"},
          ].map((kpi,i)=>(
            <div key={i} className="glass" style={{ borderRadius:20,padding:"24px 20px",border:"1px solid rgba(255,255,255,0.06)",position:"relative",overflow:"hidden" }}>
              <div style={{ position:"absolute",bottom:-10,right:-10,width:80,height:80,borderRadius:"50%",background:`${kpi.color}12`,filter:"blur(18px)" }}/>
              <div style={{ fontSize:26,marginBottom:10 }}>{kpi.icon}</div>
              <div style={{ fontFamily:"Urbanist",fontWeight:900,fontSize:30,color:kpi.color }}>{kpi.val}</div>
              <div style={{ fontSize:12,color:"var(--muted)",marginTop:3,fontWeight:500 }}>{kpi.label}</div>
              <div style={{ fontSize:11,marginTop:8,color:"var(--green)",fontWeight:700 }}>↑ {kpi.delta} hoje</div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div style={{ display:"grid",gridTemplateColumns:"2fr 1fr",gap:18,marginBottom:20 }}>
          {/* Bar chart */}
          <div className="glass" style={{ borderRadius:22,padding:"28px",border:"1px solid rgba(29,111,255,0.12)" }}>
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24 }}>
              <div>
                <div style={{ fontWeight:800,fontSize:16,fontFamily:"Urbanist" }}>Atendimentos por hora</div>
                <div style={{ color:"var(--muted)",fontSize:12,marginTop:3,fontWeight:500 }}>Hoje · Tempo real</div>
              </div>
              <div style={{ display:"flex",gap:14,fontSize:12 }}>
                {[{label:"Atendimentos",color:"#1D6FFF"},{label:"Espera avg",color:"#00D4FF"}].map(l=>(
                  <div key={l.label} style={{ display:"flex",gap:6,alignItems:"center",color:"var(--muted)",fontWeight:600 }}>
                    <div style={{ width:10,height:10,borderRadius:2,background:l.color }}/>
                    {l.label}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display:"flex",gap:6,alignItems:"flex-end",height:160 }}>
              {hourly.map((d,i)=>(
                <div key={i} style={{ flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4,height:"100%" }}>
                  <div style={{ flex:1,display:"flex",gap:3,alignItems:"flex-end",width:"100%" }}>
                    <div style={{ flex:1,borderRadius:"4px 4px 0 0",background:"linear-gradient(180deg,#1D6FFF,rgba(29,111,255,0.3))",height:`${(d.atend/barMax)*100}%`,minHeight:4,transition:"height 1s ease" }}/>
                    <div style={{ flex:1,borderRadius:"4px 4px 0 0",background:"linear-gradient(180deg,#00D4FF,rgba(0,212,255,0.25))",height:`${(d.espera/barMax)*60}%`,minHeight:4 }}/>
                  </div>
                  <div style={{ fontSize:10,color:"var(--muted)",fontWeight:600 }}>{d.hora}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Status */}
          <div className="glass" style={{ borderRadius:22,padding:"28px",border:"1px solid rgba(29,111,255,0.12)" }}>
            <div style={{ fontWeight:800,fontSize:16,marginBottom:6,fontFamily:"Urbanist" }}>Status atual</div>
            <div style={{ color:"var(--muted)",fontSize:12,marginBottom:22,fontWeight:500 }}>Distribuição em tempo real</div>
            <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
              {[
                {label:"Aguardando",count:queue.filter(x=>x.status==="aguardando").length,color:"#5A6A8A"},
                {label:"Em atendimento",count:queue.filter(x=>x.status==="em_atendimento").length,color:"#1D6FFF"},
                {label:"Próximos",count:queue.filter(x=>x.status==="proximo").length,color:"#00D4FF"},
              ].map(s=>(
                <div key={s.label}>
                  <div style={{ display:"flex",justifyContent:"space-between",fontSize:13,marginBottom:6,fontWeight:600 }}>
                    <span style={{ color:"rgba(255,255,255,0.8)" }}>{s.label}</span>
                    <span style={{ color:s.color }}>{s.count}</span>
                  </div>
                  <div style={{ height:6,background:"rgba(255,255,255,0.06)",borderRadius:100 }}>
                    <div style={{ height:"100%",borderRadius:100,background:s.color,width:`${Math.max(8,(s.count/Math.max(queue.length,1))*100)}%`,transition:"width 1s ease",boxShadow:`0 0 10px ${s.color}80` }}/>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop:24,paddingTop:20,borderTop:"1px solid rgba(255,255,255,0.07)" }}>
              <div style={{ fontSize:12,color:"var(--muted)",marginBottom:6,fontWeight:600 }}>Horário de pico</div>
              <div style={{ fontFamily:"Urbanist",fontWeight:900,fontSize:22 }}>14h – 16h</div>
              <div style={{ fontSize:12,color:"var(--muted)",marginTop:3 }}>Média de 22 senhas/hora</div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="glass" style={{ borderRadius:22,padding:"28px",border:"1px solid rgba(29,111,255,0.12)" }}>
          <div style={{ fontWeight:800,fontSize:16,marginBottom:20,display:"flex",alignItems:"center",gap:8,fontFamily:"Urbanist" }}>
            Últimos atendimentos
            <div style={{ fontSize:12,fontWeight:500,color:"var(--muted)",marginLeft:4 }}>atualizado em tempo real</div>
            <div style={{ width:6,height:6,borderRadius:"50%",background:"var(--green)",animation:"blink 1.5s infinite",marginLeft:4 }}/>
          </div>
          <div>
            <div style={{ display:"grid",gridTemplateColumns:"80px 1fr 160px 110px 90px",gap:12,padding:"0 0 12px",borderBottom:"1px solid rgba(255,255,255,0.07)",fontSize:11,color:"var(--muted)",fontWeight:800,letterSpacing:1.2,textTransform:"uppercase" }}>
              <span>Senha</span><span>Paciente</span><span>Tipo</span><span>Guichê</span><span>Status</span>
            </div>
            {[...history.slice(0,8),...queue.slice(0,5)].slice(0,10).map((p,i)=>(
              <div key={p.id+i} style={{ display:"grid",gridTemplateColumns:"80px 1fr 160px 110px 90px",gap:12,padding:"13px 0",borderBottom:"1px solid rgba(255,255,255,0.04)",fontSize:13,animation:i===0?"fadeIn 0.5s ease":"none" }}>
                <span style={{ fontFamily:"Urbanist",fontWeight:800,color:"var(--cyan)" }}>{p.ticket}</span>
                <span style={{ fontWeight:500 }}>{p.nome}</span>
                <span style={{ color:"var(--muted)",fontSize:12 }}>{p.tipo}</span>
                <span style={{ color:"var(--muted)",fontSize:12 }}>{p.guiche||"—"}</span>
                <Badge status={p.status||"concluido"} small/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── LOGIN ────────────────────────────────────────────────────────────────────
const Login = ({ setPage }) => {
  const [form, setForm] = useState({ email:"", senha:"" });
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);

  const go = () => {
    setLoading(true);
    setTimeout(()=>{ setLoading(false); setOk(true); setTimeout(()=>setPage("admin"),1200); },1600);
  };

  return (
    <div style={{ minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:"20px" }}>
      <div style={{ width:"100%",maxWidth:440 }}>
        <div className="glass-strong anim-up" style={{ borderRadius:28,padding:"50px 44px",border:"1px solid rgba(29,111,255,0.25)" }}>
          {!ok ? (
            <>
              <div style={{ textAlign:"center",marginBottom:36 }}>
                <div style={{ width:68,height:68,borderRadius:22,background:"linear-gradient(135deg,#1D6FFF,#00D4FF)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 20px",fontFamily:"Urbanist",fontWeight:900,fontSize:30,boxShadow:"0 10px 36px rgba(29,111,255,0.45)" }}>Z</div>
                <h2 style={{ fontFamily:"Urbanist",fontSize:28,fontWeight:900,letterSpacing:"-0.5px" }}>Entrar na plataforma</h2>
                <p style={{ color:"var(--muted)",fontSize:14,marginTop:8,fontWeight:500 }}>Acesso restrito ao painel administrativo</p>
              </div>
              <div style={{ display:"flex",flexDirection:"column",gap:16 }}>
                <div>
                  <label style={{ fontSize:13,fontWeight:700,display:"block",marginBottom:8,color:"rgba(255,255,255,0.7)" }}>E-mail corporativo</label>
                  <input type="email" placeholder="admin@zerofila.app" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))}
                    style={{ width:"100%",padding:"14px 16px",background:"rgba(255,255,255,0.045)",border:"1px solid rgba(29,111,255,0.2)",borderRadius:12,color:"white",fontSize:15 }}/>
                </div>
                <div>
                  <label style={{ fontSize:13,fontWeight:700,display:"block",marginBottom:8,color:"rgba(255,255,255,0.7)" }}>Senha</label>
                  <input type="password" placeholder="••••••••" value={form.senha} onChange={e=>setForm(f=>({...f,senha:e.target.value}))}
                    style={{ width:"100%",padding:"14px 16px",background:"rgba(255,255,255,0.045)",border:"1px solid rgba(29,111,255,0.2)",borderRadius:12,color:"white",fontSize:15 }}/>
                </div>
                <button onClick={go} disabled={loading} className="btn-primary" style={{ width:"100%",padding:"16px",fontSize:16,borderRadius:14,marginTop:8 }}>
                  {loading
                    ? <span style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:10 }}><div style={{ width:18,height:18,border:"2px solid rgba(255,255,255,0.3)",borderTopColor:"white",borderRadius:"50%",animation:"spin 0.8s linear infinite" }}/>Autenticando...</span>
                    : "Acessar painel →"}
                </button>
                <div style={{ textAlign:"center",fontSize:12,color:"var(--muted)",marginTop:2,fontWeight:500 }}>Use qualquer e-mail e senha para demonstração</div>
              </div>
            </>
          ) : (
            <div style={{ textAlign:"center",animation:"fadeIn 0.5s ease" }}>
              <div style={{ fontSize:58,marginBottom:16 }}>✅</div>
              <h2 style={{ fontFamily:"Urbanist",fontSize:24,fontWeight:900 }}>Acesso concedido!</h2>
              <p style={{ color:"var(--muted)",marginTop:8 }}>Redirecionando para o painel...</p>
              <div style={{ marginTop:24,height:3,background:"rgba(255,255,255,0.07)",borderRadius:100,overflow:"hidden" }}>
                <div style={{ height:"100%",background:"linear-gradient(90deg,#1D6FFF,#00D4FF)",borderRadius:100,animation:"ticker 1.2s ease forwards",width:"100%" }}/>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── ROOT ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  return (
    <QueueProvider>
      <GlobalStyles/>
      <div style={{ position:"relative",minHeight:"100vh",background:"var(--navy)" }}>
        <Particles/>
        <div style={{ position:"relative",zIndex:1 }}>
          <Navbar page={page} setPage={setPage}/>
          <Toasts/>
          {page==="home"  && <Landing setPage={setPage}/>}
          {page==="fila"  && <FilaPage setPage={setPage}/>}
          {page==="painel"&& <Painel/>}
          {page==="admin" && <Admin/>}
          {page==="login" && <Login setPage={setPage}/>}
        </div>
      </div>
    </QueueProvider>
  );
}
