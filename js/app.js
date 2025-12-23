const KEY = "bookburgh.collection";
const $ = id => document.getElementById(id);

document.querySelectorAll('.nav a').forEach(link => {
  link.onclick = (e) => {
    e.preventDefault();
    document.querySelectorAll('.nav a').forEach(l=>l.classList.remove('active'));
    link.classList.add('active');
    document.querySelectorAll('.panel').forEach(p=>p.classList.remove('active'));
    document.getElementById(link.dataset.panel).classList.add('active');
  };
});

function updatePriceEstimate(){
  const txt = $("cap-price").value;
  const m = txt.match(/([R$€£])\s?([\d,.]+)/);
  if(m){
    let val = parseFloat(m[2].replace(/,/g,''));
    const rates = {USD:18.5, EUR:20.1, GBP:23.5};
    if(m[1] === '$') val *= rates.USD;
    if(m[1] === '€') val *= rates.EUR;
    if(m[1] === '£') val *= rates.GBP;
    $("cap-zar").textContent = "≈ R" + Math.round(val).toLocaleString();
  }
}

$("cap-price").oninput = updatePriceEstimate;

$("cap-add").onclick = () => {
  const title = $("cap-title").value.trim();
  if (!title) return;
  const list = JSON.parse(localStorage.getItem(KEY) || "[]");
  list.unshift({
    id: Date.now(),
    title,
    writer: $("cap-writer").value,
    genre: $("cap-genre").value,
    rarity: $("cap-rarity").value,
    edition: $("cap-edition").value,
    priceText: $("cap-price").value,
    description: $("capture").value
  });
  localStorage.setItem(KEY, JSON.stringify(list));
  renderWishlist();
};

function renderWishlist(){
  const list = JSON.parse(localStorage.getItem(KEY) || "[]");
  $("wishlist").innerHTML = list.map(i => `
    <div class="wish-item">
      <strong>${i.title}</strong><br>
      by ${i.writer || 'Unknown'}<br>
      <small>${i.priceText || 'N/A'}</small>
    </div>
  `).join('');
}

renderWishlist();
