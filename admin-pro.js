function showSection(sectionId, element) {
    document.querySelectorAll('.section-view').forEach(sec => sec.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    element.classList.add('active');
}

function toggleForm() {
    const form = document.getElementById('add-form');
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
}

function saveProfessionalContent() {
    const item = {
        title: document.getElementById('p-title').value,
        img: document.getElementById('p-img').value,
        link: document.getElementById('p-link').value,
        date: new Date().toLocaleDateString()
    };

    if (!item.title || !item.img || !item.link) return alert("To'ldiring!");

    let movies = JSON.parse(localStorage.getItem('aura_movies')) || [];
    movies.push(item);
    localStorage.setItem('aura_movies', JSON.stringify(movies));

    alert("Saqlandi!");
    renderContentList();
    toggleForm();
}

function renderContentList() {
    const movies = JSON.parse(localStorage.getItem('aura_movies')) || [];
    const container = document.getElementById('content-list-pro');
    container.innerHTML = movies.map((m, i) => `
        <div style="display:flex; align-items:center; justify-content:space-between; padding:15px; border-bottom:1px solid rgba(255,255,255,0.05);">
            <span>${m.title}</span>
            <button onclick="deleteC(${i})" style="background:none; border:none; color:red; cursor:pointer;">O'chirish</button>
        </div>
    `).join('');
}

window.deleteC = (i) => {
    let movies = JSON.parse(localStorage.getItem('aura_movies')) || [];
    movies.splice(i, 1);
    localStorage.setItem('aura_movies', JSON.stringify(movies));
    renderContentList();
};

function initStats() {
    const chart = document.getElementById('chart-bars');
    const values = [40, 75, 55, 90, 65, 80, 100]; // Mock usage data percentage
    chart.innerHTML = values.map(v => `
        <div class="chart-bar" style="height: ${v}%;" title="Ko'rish darajasi: ${v}%"></div>
    `).join('');

    const users = [
        { name: "Azizjon L.", amount: "$5.00", status: "Muvaffaqiyatli" },
        { name: "Sanjar A.", amount: "$3.00", status: "Muvaffaqiyatli" },
        { name: "Malika K.", amount: "$15.00", status: "Muvaffaqiyatli" }
    ];
    document.getElementById('payment-rows').innerHTML = users.map(u => `
        <tr><td>${u.name}</td><td>${u.amount}</td><td style="color:#00ffaa;">● ${u.status}</td></tr>
    `).join('');

    const activity = [
        "Ali hozir 'Interstellar' ko'rmoqda",
        "Yangi foydalanuvchi qo'shildi: Botir",
        "Server yuki: 12%",
        "Obuna yangilandi: Nodira"
    ];
    document.getElementById('activity-feed').innerHTML = activity.map(a => `
        <div style="font-size:12px; padding:10px; border-left:2px solid var(--primary); margin-bottom:10px; background:rgba(255,255,255,0.02);">
            ${a}
        </div>
    `).join('');

    const userTable = document.getElementById('user-table-body');
    const mockUsers = [
        { n: "Lutfullayev A.", e: "aziz@uz.uz", s: "Premium" },
        { n: "Karimova M.", e: "malika@it.uz", s: "Premium" },
        { n: "Aliyev S.", e: "ali@gmail.com", s: "Free" }
    ];
    userTable.innerHTML = mockUsers.map(u => `
        <tr><td>${u.n}</td><td>${u.e}</td><td><span style="padding:4px 8px; border-radius:6px; font-size:10px; background:rgba(0,210,255,0.1); color:var(--primary);">${u.s}</span></td></tr>
    `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
    initStats();
    renderContentList();
});
