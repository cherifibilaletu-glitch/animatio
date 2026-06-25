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

document.addEventListener("DOMContentLoaded", () => {
  renderUniverse()
  renderMagazine()
  renderCinema()
})
