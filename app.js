// JavaScript Document
"use strict"
const apiKey = '95a17c1f631843d4a4ec1d247df6f90c';
const main = document.querySelector('main');
const sourceSelector = document.querySelector('#sourceSelector');
const defaultSource = 'Bild';

function createArticle(article){
    return `
        <div class = "article">
            <a href = "${article.url}">
                <h2>${article.title}</h2>
                <img src="${article.urlToImage}">
                <p>${article.description}</p>
            </a>
        </div>
    `;
}

async function updateNews(source = defaultSource) {
    const res = await fetch(`https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apiKey}`);
    const json = await res.json();

    main.innerHTML = json.articles.map(createArticle).join('\n');
}

async function updateSources() {
    const res = await fetch(`https://newsapi.org/v2/sources?language=de&apiKey=${apiKey}`);
    const json = await res.json();

    sourceSelector.innerHTML = json.sources.map(src => `<option value="${src.id}">${src.name}</option>`).join('\n');
}

window.addEventListener('load', async e => {
    updateNews();
    await updateSources();
    sourceSelector.value = defaultSource;

    sourceSelector.addEventListener('change', e => {
        updateNews(e.target.value);
    });

    if('serviceWorker' in navigator){
        try {
            navigator.serviceWorker.register('sw.js');
            console.log('SW registered');
        } catch(error) {
            console.log('SW reg failed');
        }
    }
});