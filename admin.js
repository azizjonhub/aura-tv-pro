function switchTab(tab) {
    const movieSec = document.getElementById('movies-section');
    const tvSec = document.getElementById('tv-section');
    const tabs = document.querySelectorAll('.tab-btn');

    tabs.forEach(t => t.classList.remove('active'));

    if (tab === 'movies') {
        movieSec.style.display = 'block';
        tvSec.style.display = 'none';
        tabs[0].classList.add('active');
    } else {
        movieSec.style.display = 'none';
        tvSec.style.display = 'block';
        tabs[1].classList.add('active');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const movieForm = document.getElementById('movie-form');
    const tvForm = document.getElementById('tv-form');
    const movieList = document.getElementById('movie-list');
    const tvList = document.getElementById('tv-list');

    // Ma'lumotlarni yuklash
    function loadContent() {
        const movies = JSON.parse(localStorage.getItem('aura_movies')) || [];
        const tvChannels = JSON.parse(localStorage.getItem('aura_tv')) || [];

        movieList.innerHTML = '';
        movies.forEach((m, index) => {
            movieList.innerHTML += `
                <div class="list-item">
                    <img src="${m.img}" alt="${m.title}">
                    <div class="list-item-info">
                        <h4>${m.title}</h4>
                        <p>${m.genre}</p>
                    </div>
                    <button class="btn-delete" onclick="deleteItem('movies', ${index})">O'chirish</button>
                </div>
            `;
        });

        tvList.innerHTML = '';
        tvChannels.forEach((tv, index) => {
            tvList.innerHTML += `
                <div class="list-item">
                    <img src="${tv.logo}" alt="${tv.title}">
                    <div class="list-item-info">
                        <h4>${tv.title}</h4>
                        <p>Jonli efir</p>
                    </div>
                    <button class="btn-delete" onclick="deleteItem('tv', ${index})">O'chirish</button>
                </div>
            `;
        });
    }

    // O'chirish funksiyasi global qilamiz
    window.deleteItem = (type, index) => {
        const key = type === 'movies' ? 'aura_movies' : 'aura_tv';
        let items = JSON.parse(localStorage.getItem(key)) || [];
        items.splice(index, 1);
        localStorage.setItem(key, JSON.stringify(items));
        loadContent();
    };

    // Film qo'shish
    movieForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newMovie = {
            title: document.getElementById('movie-title').value,
            genre: document.getElementById('movie-genre').value,
            img: document.getElementById('movie-img').value,
            video: document.getElementById('movie-video').value,
            rating: (Math.random() * (9.9 - 7.0) + 7.0).toFixed(1)
        };

        const movies = JSON.parse(localStorage.getItem('aura_movies')) || [];
        movies.push(newMovie);
        localStorage.setItem('aura_movies', JSON.stringify(movies));

        movieForm.reset();
        loadContent();
        alert('Film muvaffaqiyatli qo\'shildi!');
    });

    // TV Kanal qo'shish
    tvForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newTV = {
            title: document.getElementById('tv-title').value,
            logo: document.getElementById('tv-logo').value,
            stream: document.getElementById('tv-stream').value
        };

        const tvItems = JSON.parse(localStorage.getItem('aura_tv')) || [];
        tvItems.push(newTV);
        localStorage.setItem('aura_tv', JSON.stringify(tvItems));

        tvForm.reset();
        loadContent();
        alert('TV Kanal qo\'shildi!');
    });

    loadContent();
});
