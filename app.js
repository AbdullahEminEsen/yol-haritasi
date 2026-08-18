/* =========================================================================
   Z3 Yazılım — Stajyer Yol Haritası · uygulama motoru
   ========================================================================= */

const STORAGE_KEY = "z3_onboarding_progress_v1";

/* ---- düz konu listesi (router + pager için) ---- */
const FLAT = [];
ROADMAP.forEach(phase => phase.topics.forEach(t => FLAT.push({ ...t, phase })));
const TOTAL = FLAT.length;

/* ---- ilerleme durumu ---- */
function loadDone() {
  try { return new Set(JSON.parse(localStorage.getItem(STORAGE_KEY)) || []); }
  catch { return new Set(); }
}
function saveDone(set) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify([...set])); } catch (_) {}
}
let done = loadDone();

/* ---- staj planı ---- */
const PLAN_KEY = "z3_onboarding_plan_duration_v1";
function loadPlanDuration() {
  try { return localStorage.getItem(PLAN_KEY) || null; } catch { return null; }
}
function savePlanDuration(d) {
  try { localStorage.setItem(PLAN_KEY, d); } catch (_) {}
}
let planDuration = loadPlanDuration();

function setPlanDuration(d) {
  planDuration = d;
  savePlanDuration(d);
  route();
}

// Konu sayısını içerik haftalarına olabildiğince eşit dağıtır.
// Kalan sayı varsa (ör. 33/5=6 kalan 3) ilk haftalara birer fazla verir.
function buildSchedule(durationKey) {
  const cfg = PLAN_DURATIONS[durationKey];
  if (!cfg) return null;
  const contentWeeks = cfg.weeks - cfg.projectWeeks;
  const base = Math.floor(TOTAL / contentWeeks);
  const extra = TOTAL % contentWeeks;
  const weeks = [];
  let idx = 0;
  for (let w = 0; w < contentWeeks; w++) {
    const count = base + (w < extra ? 1 : 0);
    weeks.push({ weekNum: w + 1, topics: FLAT.slice(idx, idx + count) });
    idx += count;
  }
  return { cfg, weeks, contentWeeks };
}

/* ---- HTML kaçış + basit sözdizimi renklendirme ---- */
function esc(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
const CLS = { comment:"tok-c", string:"tok-s", var:"tok-v", keyword:"tok-k",
              func:"tok-f", tag:"tok-v", directive:"tok-k", echo:"tok-f", key:"tok-v" };
const RULES = {
  php: [
    ["comment", /\/\/[^\n]*|\/\*[\s\S]*?\*\//],
    ["string",  /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"/],
    ["var",     /\$[A-Za-z_]\w*/],
    ["keyword", /\b(?:function|return|class|extends|implements|public|private|protected|new|use|namespace|if|else|elseif|foreach|for|while|echo|true|false|null|array|void|string|int|float|bool|static|const|abstract|interface|trait|throw|try|catch|as|fn|default)\b/],
  ],
  bash: [
    ["comment", /#[^\n]*/],
    ["string",  /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"/],
    ["func",    /\b(?:sudo|cd|ls|mkdir|touch|cat|less|grep|tail|git|composer|php|artisan|npm|node|vagrant|ssh|ssh-keygen|systemctl|nginx|bash|source|export|nano)\b/],
  ],
  yaml: [
    ["comment", /#[^\n]*/],
    ["string",  /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"/],
    ["key",     /^\s*-?\s*[\w.-]+(?=:)/m],
  ],
  ruby: [
    ["comment", /#[^\n]*/],
    ["string",  /"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/],
    ["keyword", /\b(?:config|Vagrant|do|end|true|false|nil)\b/],
    ["var",     /\b[a-z_]\w*:/],
  ],
  nginx: [
    ["comment", /#[^\n]*/],
    ["var",     /\$[A-Za-z_]\w*/],
    ["keyword", /\b(?:server|listen|server_name|root|index|location|try_files|fastcgi_pass|fastcgi_index|fastcgi_param|include|return|rewrite|error_log|access_log)\b/],
  ],
  html: [
    ["comment",   /\{\{--[\s\S]*?--\}\}/],
    ["directive", /@[a-zA-Z]+/],
    ["echo",      /\{\{[\s\S]*?\}\}|\{!![\s\S]*?!!\}/],
    ["string",    /"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/],
    ["tag",       /&lt;\/?[\w-]+/],
  ],
};
function highlight(code, lang) {
  const rules = RULES[lang] || [];
  let out = esc(code);
  if (!rules.length) return out;
  const combined = new RegExp(rules.map(r => "(" + r[1].source + ")").join("|"),
                              rules.some(r => r[1].flags.includes("m")) ? "gm" : "g");
  const types = rules.map(r => r[0]);
  out = out.replace(combined, (...args) => {
    const groups = args.slice(1, 1 + rules.length);
    for (let i = 0; i < groups.length; i++) {
      if (groups[i] != null) return `<span class="${CLS[types[i]]}">${groups[i]}</span>`;
    }
    return args[0];
  });
  return out;
}

/* ---- kod bloğu HTML'i ---- */
function codeBlock(block) {
  return `
    <div class="code">
      <div class="code-head">
        <span class="fn">${esc(block.fn || block.lang)}</span>
        <button class="cp" onclick="copyCode(this)">
          <span>⧉</span><span>Kopyala</span>
        </button>
      </div>
      <pre data-raw="${esc(block.src).replace(/"/g, "&quot;")}"><code>${highlight(block.src, block.lang)}</code></pre>
    </div>`;
}
function copyCode(btn) {
  const raw = btn.closest(".code").querySelector("pre").getAttribute("data-raw");
  const txt = raw.replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
  navigator.clipboard?.writeText(txt).then(() => {
    const label = btn.querySelectorAll("span")[1];
    const old = label.textContent;
    label.textContent = "Kopyalandı ✓";
    setTimeout(() => (label.textContent = old), 1500);
  });
}

/* ---- navigasyonu kur ---- */
function buildNav() {
  const nav = document.getElementById("nav");
  const planLink = `
    <a class="plan-nav-link" href="#plan" data-id="plan">
      <span class="pnl-ico">📅</span><span>Staj Planı</span>
    </a>`;
  const phases = ROADMAP.map(phase => {
    const topics = phase.topics.map(t => `
      <a class="topic" href="#${t.id}" data-id="${t.id}">
        <span class="dot"></span>
        <span class="tt">${t.title}</span>
      </a>`).join("");
    return `
      <div class="phase" data-phase="${phase.id}">
        <div class="phase-head"><span class="pn">${phase.num}</span>${phase.title}</div>
        ${topics}
      </div>`;
  }).join("");
  nav.innerHTML = planLink + phases;
}

/* ---- ilerleme göstergelerini güncelle ---- */
function refreshProgress() {
  const n = FLAT.filter(t => done.has(t.id)).length;
  const pct = TOTAL ? Math.round((n / TOTAL) * 100) : 0;
  document.getElementById("pct").textContent = "%" + pct;
  document.getElementById("bar").style.width = pct + "%";
  document.getElementById("pmeta").textContent = `${n} / ${TOTAL} konu tamamlandı`;
  document.getElementById("tbpct").textContent = "%" + pct;

  // nav noktaları + faz durumları
  document.querySelectorAll(".topic").forEach(a => {
    a.classList.toggle("done", done.has(a.dataset.id));
  });
  ROADMAP.forEach(phase => {
    const all = phase.topics.every(t => done.has(t.id));
    const el = document.querySelector(`.phase[data-phase="${phase.id}"]`);
    if (el) el.classList.toggle("done", all);
  });
}

function toggleDone(id, btn) {
  if (done.has(id)) done.delete(id); else done.add(id);
  saveDone(done);
  refreshProgress();
  if (btn) syncCompleteBtn(btn, id);
}
function syncCompleteBtn(btn, id) {
  const isDone = done.has(id);
  btn.classList.toggle("is-done", isDone);
  btn.querySelector(".lbl").textContent = isDone ? "Tamamlandı" : "Bu konuyu tamamladım";
}

function resetProgress() {
  if (!confirm("Tüm ilerleme sıfırlansın mı? Bu geri alınamaz.")) return;
  done = new Set(); saveDone(done); refreshProgress(); route();
}

/* ---- HERO (giriş) ---- */
function renderHero() {
  const phaseCount = ROADMAP.length;

  // ilerlemeye göre akıllı buton
  const firstUndone = FLAT.find(t => !done.has(t.id));
  let btn;
  if (done.size === 0) {
    btn = `<a class="start-btn" href="#${FLAT[0].id}">Başla → ${FLAT[0].title}</a>`;
  } else if (firstUndone) {
    btn = `<a class="start-btn" href="#${firstUndone.id}">Kaldığın yerden devam et → ${firstUndone.title}</a>
           <a class="restart-link" href="#${FLAT[0].id}">baştan başla</a>`;
  } else {
    btn = `<a class="start-btn" href="#${FLAT[0].id}">Tümünü bitirdin 🎉 → baştan göz at</a>`;
  }

  return `
  <div class="hero">
    <div class="eyebrow">Onboarding · v1</div>
    <h2 class="title">Sıfırdan üretime,<br>adım adım.</h2>
    <p class="hero-lead">Z3'e yeni katılan bir geliştirici olarak nereden başlayacağını bu yol haritası söyler. Terminalden ilk Pull Request'ine kadar, bizim kullandığımız araçlarla ve gerçek örneklerle ilerlersin.</p>

    <div class="chips">
      <span class="chip">PHP</span><span class="chip">Laravel</span>
      <span class="chip">Vagrant</span><span class="chip">Homestead</span>
      <span class="chip">MySQL</span><span class="chip">nginx</span>
      <span class="chip">Bootstrap</span><span class="chip">Git</span>
    </div>

    <div class="hero-grid">
      <div class="stat"><div class="n">${phaseCount}</div><div class="l">faz</div></div>
      <div class="stat"><div class="n">${TOTAL}</div><div class="l">konu</div></div>
      <div class="stat"><div class="n">${done.size}</div><div class="l">tamamladın</div></div>
    </div>

    <div class="hero-note">
      <b>Nasıl kullanılır?</b> Soldaki menüden sırayla ilerle. Her konunun sonunda
      <em>“Bu konuyu tamamladım”</em> butonu var — işaretledikçe üstteki çubuk dolar ve
      ilerlemen tarayıcında saklanır. Sıra önerilen yoldur ama takıldığın yeri atlayıp geri dönebilirsin.
    </div>

    <div class="hero-cta">${btn}</div>
    <a class="hero-plan-link" href="#plan">📅 Staj süren belli mi? Haftalık planını oluştur →</a>

    <p style="margin-top:34px;color:var(--muted);font-size:13px;font-family:var(--mono)">
      Takıldığında sormaktan çekinme. Bir şeyi bilmemek ayıp değil; iki gün tek başına savaşmak öyle.
    </p>
  </div>`;
}

/* ---- staj planı sayfası ---- */
function renderPlan() {
  const durations = Object.keys(PLAN_DURATIONS);
  const active = planDuration && PLAN_DURATIONS[planDuration] ? planDuration : null;

  const picker = `
    <div class="plan-picker">
      ${durations.map(d => `
        <button class="plan-chip ${active === d ? "active" : ""}" onclick="setPlanDuration('${d}')">
          ${PLAN_DURATIONS[d].label}
        </button>`).join("")}
    </div>`;

  if (!active) {
    return `
      <div class="eyebrow">Staj Planı</div>
      <h2 class="title">Ne kadar sürede bitireceksin?</h2>
      <p class="hero-lead">Staj süren kaç iş günü? Seçtiğine göre sana haftalık bir program çıkaralım — hangi hafta hangi konuları bitirmiş olman gerektiğini gösterir.</p>
      ${picker}`;
  }

  const sch = buildSchedule(active);
  const weekRows = sch.weeks.map(w => {
    const items = w.topics.map(t => `
      <a class="plan-topic ${done.has(t.id) ? "done" : ""}" href="#${t.id}">
        <span class="pt-dot"></span><span>${t.title}</span>
      </a>`).join("");
    return `
      <div class="plan-week">
        <div class="pw-head"><span class="pw-num">${w.weekNum}. hafta</span><span class="pw-count">${w.topics.length} konu</span></div>
        <div class="pw-topics">${items}</div>
      </div>`;
  }).join("");

  const projectLabel = sch.cfg.projectWeeks > 1
    ? `${sch.contentWeeks + 1}–${sch.cfg.weeks}. haftalar`
    : `${sch.cfg.weeks}. hafta`;

  return `
    <div class="eyebrow">Staj Planı</div>
    <h2 class="title">${PLAN_DURATIONS[active].label} için program</h2>
    <p class="hero-lead">${PLAN_DURATIONS[active].note}</p>
    ${picker}
    <div class="sec-lbl">Haftalık program</div>
    ${weekRows}
    <div class="sec-lbl">Proje</div>
    <div class="checkpoint">
      <div class="cp-head">
        <span class="cp-tag">${projectLabel}</span>
        <span class="cp-opt">bitirme projesi</span>
      </div>
      <div class="cp-body">
        <b>${FINAL_PROJECT.title}</b>
        <p>${FINAL_PROJECT.desc}</p>
      </div>
      <a class="cp-btn" href="${FINAL_PROJECT.url}" target="_blank" rel="noopener">Projemi paylaş →</a>
    </div>`;
}

/* ---- bir konuyu render et ---- */
/* ---- faz sonu checkpoint kartı (opsiyonel) ---- */
function checkpointCard(phase) {
  const cp = phase.checkpoint;
  if (!cp) return "";
  const hasUrl = cp.url && cp.url.trim();
  return `
    <div class="checkpoint">
      <div class="cp-head">
        <span class="cp-tag">Faz ${phase.num} · Checkpoint</span>
        <span class="cp-opt">opsiyonel</span>
      </div>
      <div class="cp-body">
        <b>${phase.title} — bitirdin mi?</b>
        <p>${cp.desc}</p>
      </div>
      ${hasUrl
        ? `<a class="cp-btn" href="${cp.url}" target="_blank" rel="noopener">Sonuçlarımı paylaş →</a>`
        : `<span class="cp-btn-off">Form linki yakında eklenecek</span>`}
    </div>`;
}

function renderTopic(t, index) {
  const prev = index > 0 ? FLAT[index - 1] : null;
  const next = index < FLAT.length - 1 ? FLAT[index + 1] : null;
  const isDone = done.has(t.id);
  const phaseTopics = t.phase.topics;
  const isLastInPhase = phaseTopics[phaseTopics.length - 1].id === t.id;
  const checkpoint = isLastInPhase ? checkpointCard(t.phase) : "";

  const codes = (t.code || []).map(codeBlock).join("");
  const steps = (t.steps && t.steps.length)
    ? `<div class="sec-lbl">Pratik adımlar</div><ol class="steps">${t.steps.map(s => `<li>${s}</li>`).join("")}</ol>` : "";
  const res = (t.resources && t.resources.length)
    ? `<div class="sec-lbl">Kaynaklar</div><ul class="resources">${t.resources.map(r =>
        `<li><a href="${r.url}" target="_blank" rel="noopener"><span class="rt">${r.t || "Link"}</span><span>${r.label}</span><span class="arw">→</span></a></li>`).join("")}</ul>` : "";

  return `
    <div class="crumb">
      <span class="ph">Faz ${t.phase.num}</span><span class="sep">/</span>
      <span>${t.phase.title}</span>
    </div>
    <h2 class="title">${t.title}</h2>
    <div class="why">
      <div class="why-lbl">Neden önemli?</div>
      <p>${t.why}</p>
    </div>
    <div class="body">${t.body}</div>
    ${codes ? `<div class="sec-lbl">Kod</div>${codes}` : ""}
    ${steps}
    ${res}

    <div class="complete">
      <div class="ctxt">
        <b>Bu konuyu bitirdin mi?</b>
        <span>İşaretle, ilerlemen kaydedilsin ve çubuk dolsun.</span>
      </div>
      <button class="btn-done ${isDone ? "is-done" : ""}" onclick="toggleDone('${t.id}', this)">
        <span class="chk">✓</span><span class="lbl">${isDone ? "Tamamlandı" : "Bu konuyu tamamladım"}</span>
      </button>
    </div>
    ${checkpoint}

    <div class="pager">
      ${prev
        ? `<a href="#${prev.id}"><div class="pg-dir">← Önceki</div><div class="pg-title">${prev.title}</div></a>`
        : `<a class="disabled"><div class="pg-dir">← Önceki</div><div class="pg-title">—</div></a>`}
      ${next
        ? `<a class="next" href="#${next.id}"><div class="pg-dir">Sonraki →</div><div class="pg-title">${next.title}</div></a>`
        : `<a class="next disabled"><div class="pg-dir">Sonraki →</div><div class="pg-title">Bitti 🎉</div></a>`}
    </div>`;
}

/* ---- router ---- */
function route() {
  const id = location.hash.replace(/^#/, "");
  const content = document.getElementById("content");

  if (id === "plan") {
    content.innerHTML = renderPlan();
  } else {
    const idx = FLAT.findIndex(t => t.id === id);
    content.innerHTML = idx === -1 ? renderHero() : renderTopic(FLAT[idx], idx);
  }

  document.querySelectorAll(".topic, .plan-nav-link").forEach(a =>
    a.classList.toggle("active", a.dataset.id === id));
  refreshProgress();
  window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  closeNav();
}

/* ---- mobil menü ---- */
function openNav() { document.body.classList.add("nav-open"); }
function closeNav() { document.body.classList.remove("nav-open"); }

/* ---- başlat ---- */
buildNav();
refreshProgress();
window.addEventListener("hashchange", route);
route();
