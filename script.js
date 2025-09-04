(() => {
  const $ = sel => document.querySelector(sel);
  const q = $("#q");
  const list = $("#list");

  const normalize = s => (s||"").toString().normalize("NFC").replace(/\s+/g," ").trim().toLowerCase();

  const data = (Array.isArray(window.PRELOADED) ? window.PRELOADED : []).map(r => ({
    name: r.name,
    table: r.table,
    norm: normalize(r.name),
  }));

  function render(query){
    list.innerHTML = "";
    const v = (query||"").trim();
    const norm = normalize(v);
    if (norm.length < 3) return;

    const results = data.filter(x => x.norm.includes(norm)).slice(0, 300);
    if (!results.length) {
      const li = document.createElement("li");
      li.innerHTML = `<span class="name" style="color:#8a8a8a">Няма резултати</span><span class="table"></span>`;
      list.appendChild(li);
      return;
    }

    results.forEach(r => {
      const li = document.createElement("li");
      li.innerHTML = `<span class="name">${escapeHTML(r.name)}</span><span class="table">${escapeHTML(r.table)}</span>`;
      list.appendChild(li);
    });
  }

  function escapeHTML(s){
    return (s||"").replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
  }

  q.addEventListener("input", () => render(q.value));
})();