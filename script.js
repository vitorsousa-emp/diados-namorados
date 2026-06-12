/* =========================================================
   NOSSO UNIVERSO — script.js
   Lógica da experiência interativa de Dia dos Namorados
   ========================================================= */

// ---------- Dados editáveis ----------
const TIMELINE = [
  { img: "assets/primeiro_encontro.jpeg", title: "Primeiro Encontro", desc: "O dia em que o jogo começou. Você apareceu na tela e meu coração apertou Start." },

  { img: "assets/primeiro_beijo.jpeg", title: "Primeiro Beijo", desc: "Item raro coletado. Combo de borboletas no estômago: ATIVO." },

  { img: "assets/foto_dia_engraçado.jpeg", title: "Nossa foto mais engraçada", desc: "Aquela que ninguém entende além da gente. Easter egg só nosso." },

  { img: "assets/primeira_viagem.jpeg", title: "Nossa Primeira Viagem", desc: "Mapa expandido. Novos cenários, mesmos parceiros de aventura." },

  { img: "assets/primeira soneca.jpeg", title: "Primeira soneca", desc: "Nesse dia compartilhamos algo que desde então em qualquer oportunidade fazemos, DORMIR." },

  { img: "assets/aniversariovitor.jpeg", title: "Primeiro aniversario juntos", desc: "comemoração de mais 1 ano de vida, nessa fase estáva conhecendo o amor de verdade." },

  { img: "assets/aniversarioluana.jpeg", title: "Expação de domino, amor", desc: "Nesse momento chegamos na fase de quebrar a pareira da intimidade e nesse dia nossas almas se conectaram." },

  { img: "assets/embreve.png", title: "Nintendo Switch Adquirido", desc: "Player 2 conectado. Co-op ativado para o resto da vida.", locked: true },

  { img: "assets/embreve.png", title: "Planos de Futuro", desc: "Construindo a base, item por item. Save automático ativado.", locked: true },
];

const MINIGAMES = [
  {
    id: "catch-hearts",
    title: "Caça Corações",
    desc: "Toque nos corações antes que desapareçam. Colete 10 para vencer!",
    cover: "assets/catchhearts.png", // imagem que você vai colocar em assets/
    badge: "❤ CLÁSSICO"
  },
  {
    id: "search-of-the-princess",   // troca pelo id do seu jogo
    title: "search of the princess",
    desc: "Uma aventura em busca do amor verdadeiro acompanhe vitor nessa jornada incrivel em busca da princessa luana infretando varios desafios",
    cover: "assets/searchoftheprincess.png",     // imagem que você vai colocar em assets/
    badge: "✨ NOVO",
    link: "https://jogodeaventuravitoreluana.lovable.app"
  },
];

const STATS = [
  { label: "dias juntos", value: "calc-days", max: 100, kind: "" },
  { label: "Risadas", value: "infinitas", max: 100, kind: "gold" },
  { label: "Missões concluídas", value: "92%", max: 92, kind: "" },
  { label: "Discussões superadas", value: "Todas", max: 100, kind: "green" },
  { label: "Nível de parceria", value: "100%", max: 100, kind: "gold" },
  { label: "Amor acumulado", value: "MAX", max: 100, kind: "" },
];

const INVENTORY = [
  { icon: "🎟️", title: "Ingresso do primeiro encontro", text: "Guardado em lugar especial onde os bons saves moram, Deadpool e wolverine ficaram sempre nas nossas memorias" },
  { icon: "🍝", title: "Nossa comida favorita", text: "+50 de felicidade. Bônus se comermos juntos no sofá." },
  { icon: "📸", title: "Fotos inesquecíveis", text: "Aquelas fotos que sempre tiro de você dormindo ou do seu pé fofinho." },
  { icon: "🎮", title: "Controle Player 2", text: "Reservado eternamente para você." },
  { icon: "🍕", title: "Pizza caseira", text: "dos momento mais divertidos de quando cozinhamos juntos" },
  { icon: "🎁", title: "presente", text: "Símbolo de todos os presentes que já te dei ou vou te dar" },
  { icon: "🗝️", title: "Chave do meu coração", text: "Não precisa devolver. É sua." },
  { icon: "💍", title: "Item misterioso", text: "Ainda em desenvolvimento... fica de olho nas proximas atualizações." },
];

const ACHIEVEMENTS = [
  { icon: "🏆", name: "Melhor Companhia", desc: "Por tornar todos os dias especiais para mim." },
  { icon: "🏆", name: "Sobrevivemos à TPM", desc: "É um periodo muito complexo mais passamos por ele juntos" },
  { icon: "🏆", name: "Especialistas em escolher filme por 40 min", desc: "E no fim a gente vê outra coisa mesmo." },
  { icon: "🏆", name: "Parceiros de Todas as Horas", desc: "Co-op desde o tutorial, estamos sempre juntos independente do que aconteça" },
  { icon: "🏆", name: "Amor Verdadeiro", desc: "Conquista lendária. Drop rate: você." },
  { icon: "🏆", name: "Raiva aleaatoria", desc: "Eu nunca sei o motivo mas você sempre está certa" },
  { icon: "🏆", name: "Faça uma loucura", desc: "Eu e você sabemos oque foi" },
];

const LETTER = `Luana,

Obrigado por você ser essa garota incrível que você é.
Sei que temos nossas dificuldades e brigas, mas cada
momento com você é especial e incrível, e seu sei que não 
estamos na época de comemorar comprando oque queremos, saindo para
onde queremos e nos presenteamos oque queremos, mas quero que saiba
que eu não ligo, pois sei que isso é uma fase e no final nos iremos
superar ela como sempre fazemos e iremos para o próximo nível juntos

quero sempre está ao seu lado, pois você é e sempre será minha xubirubinha, minha fofinha
e minha pipizinha eu te amo muito muito muito mesmo!

Feliz Dia dos Namorados.

Com amor,
Vitor ❤`;

// Data de início do relacionamento (ajuste se quiser)
const START_DATE = new Date("2024-08-16");

// ---------- Estado + persistência ----------
const STORAGE_KEY = "nosso-universo:v1";
const state = loadState();

function loadState() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || { visited: {}, gameDone: false };
  } catch { return { visited: {}, gameDone: false }; }
}
function saveState() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); updateProgress(); }
function markVisited(id) { state.visited[id] = true; saveState(); }

// ---------- criar o card de jogos ----------

function buildMinigameSelect() {
  const wrap = document.getElementById("minigame-select");
  wrap.innerHTML = "";
  MINIGAMES.forEach(game => {
    const card = document.createElement("button");
    card.className = "mg-card";
    card.innerHTML = `
      <div class="mg-badge">${game.badge}</div>
      <img class="mg-cover" src="${game.cover}" alt="${game.title}">
      <div class="mg-info">
        <div class="mg-title">${game.title}</div>
        <div class="mg-desc">${game.desc}</div>
      </div>
      <span class="mg-play">▶ JOGAR</span>
    `;
    card.addEventListener("click", () => {
      if (game.link) {
        window.open(game.link, "_blank");
      } else {
        showScreen("screen-" + game.id);
      }
    });
    wrap.appendChild(card);
  });
}


// ---------- Navegação entre screens ----------
const screens = document.querySelectorAll(".screen");
function showScreen(id) {
  screens.forEach(s => s.classList.toggle("active", s.id === id));
  window.scrollTo({ top: 0, behavior: "smooth" });
  if (id !== "screen-start" && id !== "screen-intro") markVisited(id);
  if (id === "screen-stats") animateStats();
  if (id === "screen-letter") typeLetter();
}

document.querySelectorAll("[data-go]").forEach(btn =>
  btn.addEventListener("click", () => showScreen(btn.dataset.go))
);
document.querySelectorAll("[data-back]").forEach(btn =>
  btn.addEventListener("click", () => showScreen("screen-menu"))
);

// ---------- START ----------
document.getElementById("btn-start").addEventListener("click", startIntro);
document.addEventListener("keydown", e => {
  if (e.key === "Enter" && document.getElementById("screen-start").classList.contains("active")) {
    startIntro();
  }
});



// ---------- INTRO (efeito máquina de escrever) ----------
function typeText(target, text, speed = 35, done) {
  let i = 0;
  let active = true;
  target.textContent = "";
  target._stopTyping = () => { active = false; target.textContent = text; if (done) done(); };
  const tick = () => {
    if (!active) return;
    if (i < text.length) {
      target.textContent += text[i++];
      if (text[i - 1] !== " " && text[i - 1] !== "\n") beep(180 + Math.random() * 60, 0.03);
      setTimeout(tick, speed);
    } else if (done) done();
  };
  tick();
}

function typeIntro() {
  const el = document.getElementById("intro-text");
  const lines = [
    "> Inicializando cartucho...",
    "> Carregando memórias...",
    "> Save File encontrado.",
    "",
    "  Jogadores detectados:",
    "  PLAYER 1: VITOR",
    "  PLAYER 2: LUANA",
    "",
    "  Nivel atual:",
    "  Construindo uma vida juntos. ❤",
    "",
    "> Pressione CONTINUAR.",
  ];
  const fullText = lines.join("\n");
  typeText(el, fullText, 28, () => {
    document.getElementById("btn-intro-next").classList.remove("hidden");
  });
}
document.getElementById("btn-intro-next").addEventListener("click", () => showScreen("screen-menu"));

// ---------- musica ----------

function startIntro() {
  startBGM();
  showScreen("screen-intro");
  setTimeout(() => typeIntro(), 1400);
}

let bgm;
function startBGM() {
  if (bgm) return; // evita duplicar
  bgm = new Audio("assets/song/temadefundo_1.mp3"); // coloque o nome do seu arquivo aqui
  bgm.loop = true;
  bgm.volume = 0.50; // volume médio (~35%)
  bgm.play().catch(() => { }); // catch por política de autoplay
}

// ---------- clink soud ----------
function typeText(target, text, speed = 35, done) {
  let i = 0;
  target.textContent = "";
  const tick = () => {
    if (i < text.length) {
      target.textContent += text[i++];
      if (text[i - 1] !== " " && text[i - 1] !== "\n") beep(180 + Math.random() * 60, 0.03); // ← som
      setTimeout(tick, speed);
    } else if (done) done();
  };
  tick();
}

// ---------- TIMELINE ----------
function buildTimeline() {
  const wrap = document.getElementById("timeline");
  wrap.innerHTML = "";
  TIMELINE.forEach((it, idx) => {
    const el = document.createElement("button");
    el.className = "timeline-item";
    const media = it.img
      ? `<img class="ti-thumb" src="${it.img}" alt="${it.title}" loading="lazy">`
      : `<div class="ti-thumb-placeholder">${it.icon || "📷"}</div>`;
    el.innerHTML = `
      ${media}
      <div class="ti-text">
        <span class="ti-title">${it.locked ? "🔒 BLOQUEADO" : `FASE ${String(idx + 1).padStart(2, "0")} — DESBLOQUEADA`}</span>
        <div class="ti-label">${it.title}</div>
        ${it.desc ? `<div class="ti-desc">${it.desc}</div>` : ""}
      </div>`;
    el.addEventListener("click", () => openModal(it, idx));
    wrap.appendChild(el);
  });
}




// Fechar clicando fora ou no botão
document.getElementById("modal-overlay").addEventListener("click", function (e) {
  if (e.target === this) closeModal();
});
document.getElementById("btn-tl-close").addEventListener("click", closeModal);

document.getElementById("modal-overlay").addEventListener("click", function (e) {
  if (e.target === this) closeModal();
});

// ---------- STATS ----------
function buildStats() {
  const wrap = document.getElementById("stats-panel");
  wrap.innerHTML = "";
  STATS.forEach(s => {
    let val = s.value;
    if (val === "calc-days") {
      const days = Math.max(1, Math.floor((Date.now() - START_DATE) / 86400000));
      val = `${days} `;
    }
    const row = document.createElement("div");
    row.className = "stat-row";
    row.innerHTML = `
      <div class="label"><span>${s.label}</span><span>${val}</span></div>
      <div class="bar"><div class="bar-fill ${s.kind}" data-target="${s.max}"></div></div>`;
    wrap.appendChild(row);
  });
}
function animateStats() {
  // anima as barras quando entrar
  requestAnimationFrame(() => {
    document.querySelectorAll("#stats-panel .bar-fill").forEach(b => {
      b.style.width = b.dataset.target + "%";
    });
  });
}

// ---------- INVENTORY ----------
function buildInventory() {
  const wrap = document.getElementById("inventory");
  wrap.innerHTML = "";
  INVENTORY.forEach(it => {
    const slot = document.createElement("button");
    slot.className = "inv-slot";
    slot.textContent = it.icon;
    slot.setAttribute("aria-label", it.title);
    slot.addEventListener("click", () => openModal({
      title: it.title, icon: it.icon, text: it.text
    }));
    wrap.appendChild(slot);
  });
}

// ---------- ACHIEVEMENTS ----------
function buildAchievements() {
  const wrap = document.getElementById("achievements");
  wrap.innerHTML = "";
  ACHIEVEMENTS.forEach(a => {
    const el = document.createElement("div");
    el.className = "ach";
    el.innerHTML = `
      <div class="icon">${a.icon}</div>
      <div>
        <div class="name">${a.name}</div>
        <div class="desc">${a.desc}</div>
      </div>`;
    wrap.appendChild(el);
  });
}

// ---------- MODAL (unificado — timeline + inventário) ----------
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modal-content");
document.getElementById("modal-close").addEventListener("click", closeModal);
modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

function openModal(it, idx) {
  // chamado pela timeline (tem img/icon + desc)
  if (idx !== undefined) {
    const mediaEl = document.getElementById("modal-media");
    mediaEl.innerHTML = it.img
      ? `<img class="modal-img" src="${it.img}" alt="${it.title}">`
      : `<div class="modal-img-placeholder">${it.icon || "📷"}</div>`;
    document.getElementById("modal-phase").textContent =
      `FASE ${String(idx + 1).padStart(2, "0")} — DESBLOQUEADA`;
    document.getElementById("modal-title").textContent = it.title;
    document.getElementById("modal-desc").textContent = it.desc || "";
    document.getElementById("modal-overlay").style.display = "flex";
    return;
  }
  // chamado pelo inventário/conquistas (modal genérico)
  modalContent.innerHTML = `
    <div class="modal-content">
      <span class="big-emoji">${it.icon || ""}</span>
      <h3>${it.title}</h3>
      <p>${it.text || ""}</p>
    </div>`;
  modal.classList.remove("hidden");
  beep(440, 0.06);
}

function closeModal() {
  modal.classList.add("hidden");
  document.getElementById("modal-overlay").style.display = "none";
}

// ---------- TOAST ----------
function toast(text) {
  const t = document.getElementById("toast");
  document.getElementById("toast-text").textContent = text;
  t.classList.remove("hidden");
  beep(660, 0.08);
  setTimeout(() => beep(880, 0.08), 120);
  clearTimeout(toast._t);
  toast._t = setTimeout(() => t.classList.add("hidden"), 3500);
}

// ---------- MINIGAME ----------
const gameArea = document.getElementById("game-area");
const hgScore = document.getElementById("hg-score");
const hgTime = document.getElementById("hg-time");
let gameLoop, gameTimer, spawner, score, timeLeft;

document.getElementById("btn-game-start").addEventListener("click", startGame);

function startGame() {
  score = 0; timeLeft = 30;
  hgScore.textContent = 0;
  hgTime.textContent = timeLeft;
  gameArea.innerHTML = "";

  spawner = setInterval(spawnHeart, 700);
  gameTimer = setInterval(() => {
    timeLeft--;
    hgTime.textContent = timeLeft;
    if (timeLeft <= 0 || score >= 10) endGame();
  }, 1000);
}

function spawnHeart() {
  const h = document.createElement("div");
  h.className = "heart-target";
  h.textContent = Math.random() > 0.85 ? "💖" : "❤";
  const rect = gameArea.getBoundingClientRect();
  const size = 32;
  h.style.left = Math.random() * (rect.width - size) + "px";
  h.style.top = Math.random() * (rect.height - size) + "px";
  h.addEventListener("click", () => {
    score++;
    hgScore.textContent = score;
    h.remove();
    beep(520 + score * 30, 0.05);
    if (score >= 10) endGame();
  });
  gameArea.appendChild(h);
  setTimeout(() => h.remove(), 1400);
}

function endGame() {
  clearInterval(spawner); clearInterval(gameTimer);
  gameArea.innerHTML = "";
  const win = score >= 10;
  const msg = document.createElement("div");
  msg.style.textAlign = "center";
  msg.style.fontFamily = "var(--font-pixel)";
  msg.style.fontSize = "12px";
  msg.style.color = "var(--gold)";
  msg.style.padding = "20px";
  msg.style.lineHeight = "2";
  msg.innerHTML = win
    ? `🎉 PARABÉNS! 🎉<br/><br/>Você desbloqueou a<br/>conquista mais rara de todas:<br/><br/><span style="color:var(--rose);font-size:16px">❤ AMOR VERDADEIRO ❤</span><br/><br/><br/>`
    : `Tente de novo!<br/>Você fez ${score}/10 ❤<br/><br/>`;
  const btn = document.createElement("button");
  btn.className = "retro-btn small";
  btn.textContent = "▶ Jogar novamente";
  btn.addEventListener("click", () => {
    gameArea.innerHTML = "";
    const s = document.createElement("button");
    s.id = "btn-game-start";
    s.className = "retro-btn";
    s.textContent = "▶ Iniciar";
    s.addEventListener("click", startGame);
    gameArea.appendChild(s);
  });
  msg.appendChild(btn);
  gameArea.appendChild(msg);

  if (win && !state.gameDone) {
    state.gameDone = true; saveState();
    toast("❤ Amor Verdadeiro desbloqueado");
  }
}

// ---------- CARTA FINAL ----------
let letterTyped = false;
function typeLetter() {
  const el = document.getElementById("letter-text");
  const btn = document.getElementById("btn-final");
  if (letterTyped) { el.textContent = LETTER; btn.classList.remove("hidden"); return; }
  letterTyped = true;
  typeText(el, LETTER, 25, () => btn.classList.remove("hidden"));
}
document.getElementById("btn-final").addEventListener("click", () => {
  toast("Save completo ❤");
  showScreen("screen-saved");
});
document.getElementById("btn-restart").addEventListener("click", () => showScreen("screen-start"));

// ---------- RESET ----------
document.getElementById("btn-reset").addEventListener("click", () => {
  if (confirm("Resetar progresso?")) {
    localStorage.removeItem(STORAGE_KEY);
    state.visited = {}; state.gameDone = false;
    updateProgress();
    document.querySelectorAll(".menu-card").forEach(c => c.classList.remove("done"));
  }
});

// ---------- Progresso ----------
function updateProgress() {
  const totalSections = 6;
  const done = Object.keys(state.visited).filter(k =>
    ["screen-timeline", "screen-stats", "screen-inventory", "screen-achievements", "screen-minigame", "screen-letter"].includes(k)
  ).length;
  const pct = Math.round((done / totalSections) * 100);
  const el = document.getElementById("save-progress");
  if (el) el.innerHTML = `SAVE: <b>${pct}%</b>`;
  // marcar cards visitados
  document.querySelectorAll(".menu-card").forEach(c => {
    if (state.visited[c.dataset.go]) c.classList.add("done");
  });
}

// ---------- Bip sintético (sem assets de áudio) ----------
let audioCtx;
function beep(freq = 440, dur = 0.08) {
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    const o = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    o.type = "square";
    o.frequency.value = freq;
    g.gain.value = 0.40;
    o.connect(g); g.connect(audioCtx.destination);
    o.start();
    g.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + dur);
    o.stop(audioCtx.currentTime + dur);
  } catch { }
}

document.querySelectorAll("[data-go-minigame]").forEach(btn =>
  btn.addEventListener("click", () => showScreen("screen-minigame"))
);

// ---------- Init ----------
buildTimeline();
buildStats();
buildInventory();
buildAchievements();
buildMinigameSelect();
updateProgress();