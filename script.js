document.addEventListener('DOMContentLoaded', () => {
    // 1. Stories Population (Top Circles)
    const stories = [
        { n: "Yer ostida", i: "https://api.dicebear.com/7.x/avataaars/svg?seed=yer" },
        { n: "Boshpana", i: "https://api.dicebear.com/7.x/avataaars/svg?seed=bosh" },
        { n: "Mutaxassis", i: "https://api.dicebear.com/7.x/avataaars/svg?seed=mut" },
        { n: "Jahl roh", i: "https://api.dicebear.com/7.x/avataaars/svg?seed=jah" },
        { n: "Persi Jekso", i: "https://api.dicebear.com/7.x/avataaars/svg?seed=per" },
        { n: "Allo", i: "https://api.dicebear.com/7.x/avataaars/svg?seed=allo" }
    ];
    document.getElementById('stories-row').innerHTML = stories.map(s => `
        <div class="story-item">
            <div class="story-circle"><img src="${s.i}" alt=""></div>
            <span>${s.n}</span>
        </div>
    `).join('');

    // 2. Genres Population
    const genres = [
        { n: "Jangari", i: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=300" },
        { n: "Komediya", i: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=300" },
        { n: "Kriminal", i: "https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?q=80&w=300" },
        { n: "Sarguzasht", i: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?q=80&w=300" }
    ];
    document.getElementById('genre-grid').innerHTML = genres.map(g => `
        <div class="genre-card" style="background-image: url('${g.i}')">
            <span>${g.n}</span>
        </div>
    `).join('');

    // 3. Movies Population
    const movies = [
        { t: "Hiyla", i: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=400", p: true },
        { t: "Orzuga qadam", i: "https://images.unsplash.com/photo-1485095329441-dbf71cd0620d?q=80&w=400", p: false },
        { t: "Hamnet", i: "https://images.unsplash.com/photo-1535016120720-40c646bebb70?q=80&w=400", p: true },
        { t: "Qochqin", i: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=400", p: false }
    ];

    function renderRow(id) {
        document.getElementById(id).innerHTML = movies.map(m => `
            <div class="movie-item">
                <div class="poster-wrapper" style="background-image: url('${m.i}')">
                    <div class="${m.p ? 'premium-badge' : 'free-badge'}">${m.p ? 'PREMIUM' : 'Bepul'}</div>
                </div>
                <h4>${m.t}</h4>
            </div>
        `).join('');
    }

    renderRow('row-translated');
    renderRow('row-premiere');

    // 4. Handle dynamic movies from admin panel
    const stored = JSON.parse(localStorage.getItem('aura_movies')) || [];
    if (stored.length > 0) {
        const row = document.getElementById('row-translated');
        stored.forEach(item => {
            const div = document.createElement('div');
            div.className = 'movie-item';
            div.innerHTML = `
                <div class="poster-wrapper" style="background-image: url('${item.img}')">
                    <div class="free-badge">Bepul</div>
                </div>
                <h4>${item.title}</h4>
            `;
            row.prepend(div);
        });
    }
});
