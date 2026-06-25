const PREMIUM_SECTORS = [
  { ar: "الصحة والسلامة", en: "Health & Safety", icon: "🛡️", seed: "safety" },
  { ar: "المحروقات", en: "Hydrocarbons", icon: "🛢️", seed: "oil" },
  { ar: "الصناعة", en: "Industry", icon: "🏭", seed: "industry" },
  { ar: "النقل", en: "Transport", icon: "🚚", seed: "transport" },
  { ar: "الأمن", en: "Security", icon: "🔒", seed: "security" },
  { ar: "الإدارة", en: "Management", icon: "📋", seed: "management" },
  { ar: "التجارة", en: "Commerce", icon: "🛒", seed: "commerce" },
  { ar: "الإعلام الآلي", en: "Computer Science", icon: "💻", seed: "computer" },
  { ar: "علوم التسيير", en: "Management Sciences", icon: "📊", seed: "msci" },
  { ar: "الأعمال", en: "Business", icon: "💼", seed: "business" },
]

function premiumImg(item, w, h){
  return "https://picsum.photos/seed/premium-" + item.seed + "/" + w + "/" + h
}

function renderUniverse(){
  const root = document.getElementById("universe-items")
  if (!root) return
  const first = PREMIUM_SECTORS.slice(0, 5)
  const second = PREMIUM_SECTORS.slice(5)
  const ringOne = document.createElement("div")
  const ringTwo = document.createElement("div")
  ringOne.className = "uni-orbit"
  ringTwo.className = "uni-orbit"

  function addCards(ring, items, radius){
    items.forEach((s, i) => {
      const a = (Math.PI * 2 * i) / items.length - Math.PI / 2
      const x = 50 + Math.cos(a) * radius
      const y = 50 + Math.sin(a) * radius
      const card = document.createElement("article")
      card.className = "uni-card"
      card.style.left = x + "%"
      card.style.top = y + "%"
      card.style.backgroundImage = "url('" + premiumImg(s, 500, 500) + "')"
      card.innerHTML = '<div class="label"><span>' + s.icon + '</span><b>' + s.ar + '</b><small>' + s.en + '</small></div>'
      ring.appendChild(card)
    })
  }

  addCards(ringOne, first, 45)
  addCards(ringTwo, second, 47)
  root.innerHTML = ""
  root.appendChild(ringOne)
  root.appendChild(ringTwo)
}

function renderMagazine(){
  const root = document.getElementById("magazine")
  if (!root) return
  const hero = PREMIUM_SECTORS[7]
  root.innerHTML = '<div class="mag-hero"><div class="mag-copy"><div class="mag-kicker">✦ Executive layout</div><h3>قطاعات المركز بواجهة شركة عالمية</h3><p>تجربة راقية: صورة قوية، عنوان كبير، وقائمة قطاعات منظمة تشبه مواقع المؤسسات الكبرى.</p></div></div><div class="mag-panel"></div>'
  const heroEl = root.querySelector(".mag-hero")
  const panel = root.querySelector(".mag-panel")
  heroEl.style.backgroundImage = "url('" + premiumImg(hero, 1100, 900) + "')"
  PREMIUM_SECTORS.slice(0, 5).forEach((s, i) => {
    const item = document.createElement("button")
    item.className = "mag-item" + (i === 0 ? " active" : "")
    item.innerHTML = '<div class="mag-thumb"></div><div class="mag-text"><b>' + s.ar + '</b><small>' + s.en + '</small></div><div class="mag-no">0' + (i + 1) + '</div>'
    item.querySelector(".mag-thumb").style.backgroundImage = "url('" + premiumImg(s, 240, 240) + "')"
    item.addEventListener("mouseenter", () => {
      panel.querySelectorAll(".mag-item").forEach((x) => x.classList.remove("active"))
      item.classList.add("active")
      heroEl.style.backgroundImage = "url('" + premiumImg(s, 1100, 900) + "')"
      root.querySelector(".mag-copy h3").textContent = s.ar
      root.querySelector(".mag-copy p").textContent = "قسم " + s.en + " مع عرض بصري قوي ومنظم يصلح لموقع رسمي احترافي."
    })
    panel.appendChild(item)
  })
}

function renderCinema(){
  const root = document.getElementById("cinema")
  if (!root) return
  root.innerHTML = '<div class="cinema-copy"><div class="badge">Cinematic selection</div><h3>اختر القطاع مثل مشهد سينمائي</h3><p>بطاقات عميقة ومتراكبة. اضغط على أي بطاقة لتصبح في المقدمة بشكل فاخر ومختلف.</p></div><div class="stack-stage"></div><div class="stack-hint">اضغط على البطاقات للتغيير</div>'
  const stage = root.querySelector(".stack-stage")
  PREMIUM_SECTORS.slice(0, 7).forEach((s, i) => {
    const card = document.createElement("article")
    card.className = "stack-card" + (i === 0 ? " active" : "")
    const offset = i - 3
    const x = offset * 46
    const y = Math.abs(offset) * 16
    const r = offset * 6
    card.style.zIndex = String(10 - Math.abs(offset))
    card.style.transform = "translate(calc(-50% + " + x + "px), calc(-50% + " + y + "px)) rotateZ(" + r + "deg) rotateY(" + (-offset * 8) + "deg)"
    card.style.backgroundImage = "url('" + premiumImg(s, 650, 900) + "')"
    card.innerHTML = '<div class="meta"><span>' + s.icon + '</span><b>' + s.ar + '</b><small>' + s.en + '</small></div>'
    card.addEventListener("click", () => {
      stage.querySelectorAll(".stack-card").forEach((x) => x.classList.remove("active"))
      card.classList.add("active")
    })
    stage.appendChild(card)
  })
}

function renderGlassPanels(){
  const root = document.getElementById("glass-panels")
  if (!root) return
  root.innerHTML = PREMIUM_SECTORS.map(s =>
    '<div class="glass-panel"><span class="icon">' + s.icon + '</span><h3>' + s.ar + '</h3><p>قطاع بحثي وتدريبي متميز يجمع بين النظرية والتطبيق العملي.</p><span class="en">' + s.en + '</span></div>'
  ).join("")
}

/* 14 — Spotlight Cursor Cards */
function renderSpotlight(){
  const root = document.getElementById("spotlight-grid")
  if (!root) return
  root.innerHTML = PREMIUM_SECTORS.map(s =>
    '<article class="spot-card"><span class="si">' + s.icon + '</span><h3>' + s.ar + '</h3><p>' + s.en + '</p></article>'
  ).join("")
  root.querySelectorAll(".spot-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect()
      card.style.setProperty("--mx", (e.clientX - r.left) + "px")
      card.style.setProperty("--my", (e.clientY - r.top) + "px")
    })
  })
}

/* 15 — Magnetic Tiles */
function renderMagnetic(){
  const root = document.getElementById("magnetic-grid")
  if (!root) return
  root.innerHTML = PREMIUM_SECTORS.map(s =>
    '<div class="mag-tile"><span class="mi">' + s.icon + '</span><b>' + s.ar + '</b></div>'
  ).join("")
  root.querySelectorAll(".mag-tile").forEach((tile) => {
    tile.addEventListener("mousemove", (e) => {
      const r = tile.getBoundingClientRect()
      const x = (e.clientX - r.left - r.width / 2) / (r.width / 2)
      const y = (e.clientY - r.top - r.height / 2) / (r.height / 2)
      tile.style.transform = "translate(" + (x * 16) + "px," + (y * 16) + "px) scale(1.07)"
    })
    tile.addEventListener("mouseleave", () => { tile.style.transform = "" })
  })
}

/* 16 — Coverflow 3D Gallery */
function renderCoverflow(){
  const root = document.getElementById("coverflow")
  if (!root) return
  root.innerHTML = '<button class="cf-nav cf-prev">‹</button><div class="cf-stage"></div><button class="cf-nav cf-next">›</button>'
  const stage = root.querySelector(".cf-stage")
  let active = Math.floor(PREMIUM_SECTORS.length / 2)
  const items = PREMIUM_SECTORS.map((s, i) => {
    const el = document.createElement("article")
    el.className = "cf-item"
    el.style.backgroundImage = "url('" + premiumImg(s, 500, 700) + "')"
    el.innerHTML = '<div class="cf-cap"><span>' + s.icon + '</span><b>' + s.ar + '</b></div>'
    el.addEventListener("click", () => { active = i; layout() })
    stage.appendChild(el)
    return el
  })
  function layout(){
    items.forEach((el, i) => {
      const o = i - active
      const abs = Math.abs(o)
      el.style.transform = "translateX(" + (o * 58) + "%) translateZ(" + (-abs * 170) + "px) rotateY(" + (o * -32) + "deg)"
      el.style.zIndex = String(100 - abs)
      el.style.opacity = abs > 3 ? "0" : "1"
    })
  }
  root.querySelector(".cf-prev").onclick = () => { active = Math.max(0, active - 1); layout() }
  root.querySelector(".cf-next").onclick = () => { active = Math.min(items.length - 1, active + 1); layout() }
  layout()
}

document.addEventListener("DOMContentLoaded", () => {
  renderUniverse()
  renderMagazine()
  renderCinema()
  renderGlassPanels()
  renderSpotlight()
  renderMagnetic()
  renderCoverflow()
})
