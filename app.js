const SECTORS = [
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

const img = (s, n = 600) => `https://picsum.photos/seed/bm-${s.seed}/${n}/${n}`

function renderBento(){
  const cls = ["b-xl", "b-sm", "b-sm", "b-tall", "b-sm", "b-wide", "b-sm", "b-sm", "b-tall", "b-sm"]
  document.getElementById("bento").innerHTML = SECTORS.map((s, i) => `
    <article class="bento-item reveal ${cls[i] || ""}" style="background-image:url('${img(s, 700)}')">
      <div class="overlay"></div>
      <div class="card-cap"><span class="ico">${s.icon}</span><h3>${s.ar}</h3><p>${s.en}</p></div>
    </article>`).join("")
}

function renderHex(){
  document.getElementById("hexagon").innerHTML = SECTORS.map((s) => `
    <div class="hex reveal">
      <div class="hex-in" style="background-image:url('${img(s, 400)}')">
        <div class="hex-ov"></div>
        <div class="hex-cap"><span>${s.icon}</span><b>${s.ar}</b></div>
      </div>
    </div>`).join("")
}

function renderSplit(){
  const list = document.getElementById("split-list")
  const big = document.getElementById("split-image")
  list.innerHTML = SECTORS.map((s, i) => `
    <button class="split-item ${i === 0 ? "active" : ""}" data-seed="${s.seed}">
      <span>${s.icon}</span><b>${s.ar}</b><i>${s.en}</i>
    </button>`).join("")
  big.innerHTML = `<div class="overlay"></div><div class="split-cap"><span class="ico"></span><b></b><small></small></div>`
  const setBig = (s) => {
    big.style.backgroundImage = `url('${img(s, 1100)}')`
    big.querySelector(".ico").textContent = s.icon
    big.querySelector("b").textContent = s.ar
    big.querySelector("small").textContent = s.en
  }
  setBig(SECTORS[0])
  list.querySelectorAll(".split-item").forEach((btn) => {
    const act = () => {
      list.querySelectorAll(".split-item").forEach((b) => b.classList.remove("active"))
      btn.classList.add("active")
      setBig(SECTORS.find((x) => x.seed === btn.dataset.seed))
    }
    btn.addEventListener("mouseenter", act)
    btn.addEventListener("click", act)
  })
}

function renderCarousel(){
  const track = document.getElementById("carousel-track")
  track.innerHTML = SECTORS.map((s) => `
    <div class="caro-card" style="background-image:url('${img(s, 600)}')">
      <div class="overlay"></div>
      <div class="card-cap"><span class="ico">${s.icon}</span><h3>${s.ar}</h3><p>${s.en}</p></div>
    </div>`).join("")
  const step = 300
  const prev = document.getElementById("caro-prev")
  const next = document.getElementById("caro-next")
  if (prev) prev.onclick = () => track.scrollBy({ left: -step, behavior: "smooth" })
  if (next) next.onclick = () => track.scrollBy({ left: step, behavior: "smooth" })
}

function renderOrbit(){
  const ring = document.getElementById("orbit-ring")
  const n = SECTORS.length
  const R = 205
  ring.innerHTML = SECTORS.map((s, i) => {
    const a = (360 / n) * i
    return `<div class="orbit-item" style="transform:rotate(${a}deg) translate(${R}px) rotate(-${a}deg)">
      <div class="orbit-rot">
        <div class="orbit-card" style="background-image:url('${img(s, 220)}')">
          <div class="overlay"></div>
          <div class="orbit-cap"><span>${s.icon}</span><b>${s.ar}</b></div>
        </div>
      </div>
    </div>`
  }).join("")
}

function renderMosaic(){
  document.getElementById("mosaic").innerHTML = SECTORS.map((s, i) => `
    <figure class="mosaic-item reveal ${i % 3 === 0 ? "tall" : ""}" style="background-image:url('${img(s, i % 3 === 0 ? 900 : 600)}')">
      <div class="overlay"></div>
      <figcaption><span>${s.icon}</span> ${s.ar}</figcaption>
    </figure>`).join("")
}

function renderFlip(){
  document.getElementById("flip").innerHTML = SECTORS.map((s) => `
    <div class="flip reveal">
      <div class="flip-in">
        <div class="flip-front" style="background-image:url('${img(s, 500)}')">
          <div class="overlay"></div>
          <h3><span>${s.icon}</span> ${s.ar}</h3>
        </div>
        <div class="flip-back">
          <span class="ico">${s.icon}</span>
          <b>${s.ar}</b>
          <small>${s.en}</small>
          <p>اكتشف مشاريع ونشاطات هذا القطاع البحثية والتدريبية.</p>
        </div>
      </div>
    </div>`).join("")
}

function renderTilt(){
  const wrap = document.getElementById("tilt")
  wrap.innerHTML = SECTORS.slice(0, 8).map((s) => `
    <div class="tilt-card" style="background-image:url('${img(s, 500)}')">
      <div class="overlay"></div>
      <div class="card-cap"><span class="ico">${s.icon}</span><h3>${s.ar}</h3><p>${s.en}</p></div>
    </div>`).join("")
  wrap.querySelectorAll(".tilt-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width - 0.5
      const py = (e.clientY - r.top) / r.height - 0.5
      card.style.transform = `perspective(800px) rotateY(${px * 18}deg) rotateX(${py * -18}deg) scale(1.06)`
    })
    card.addEventListener("mouseleave", () => { card.style.transform = "" })
  })
}

function renderMarquee(){
  const row = document.getElementById("marquee-row")
  const items = SECTORS.concat(SECTORS)
  row.innerHTML = items.map((s) => `<div class="marq-pill"><span>${s.icon}</span> ${s.ar}</div>`).join("")
}

function initReveal(){
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); obs.unobserve(en.target) } })
  }, { threshold: 0.12 })
  document.querySelectorAll(".reveal").forEach((node) => obs.observe(node))
}

function initPick(){
  const toast = document.getElementById("toast")
  let timer = null
  document.querySelectorAll(".pick").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".design").forEach((d) => d.classList.remove("picked"))
      const sec = btn.closest(".design")
      sec.classList.add("picked")
      toast.textContent = "اخترت: " + btn.dataset.pick + " — أخبر Notion AI برقم التصميم لأطبّقه ✨"
      toast.classList.add("show")
      clearTimeout(timer)
      timer = setTimeout(() => toast.classList.remove("show"), 4200)
    })
  })
}

function boot(){
  renderBento(); renderHex(); renderSplit(); renderCarousel(); renderOrbit();
  renderMosaic(); renderFlip(); renderTilt(); renderMarquee();
  initReveal(); initPick();
}
document.addEventListener("DOMContentLoaded", boot)
