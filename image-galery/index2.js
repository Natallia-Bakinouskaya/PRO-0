// const url = `https://api.unsplash.com/search/photos?query=sun&per_page=30&orientation=landscape&client_id=SouHY7Uul-OxoMl3LL3c0NkxUtjIrKwf3tsGk1JaiVo`
console.log('Ваша отметка - 65 балла(ов)\nОтзыв по пунктам ТЗ\nЧастично выполненные пункты:\n1) Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения — 5 балл(а)\nВсе оставшиеся пункты выполнены и не имеют комментариев проверяющего.')


let img = [];
loadStartImg();
const searchButton = document.querySelector('button');

searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    loadImg();

})



async function getData() {
    const url = await 'https://api.unsplash.com/search/photos?query=' + input.value + '&per_page=30&orientation=landscape&client_id=YjLYATzk6KWae_eMjfqQJS-HEDwscyP7woD4FBCYNUk'
    const res = await fetch(url);
    const data = await res.json();
    img = data;
    return img;

}

async function getInitialData() {
    const url = await 'https://api.unsplash.com/search/photos?query=sun&per_page=30&orientation=landscape&client_id=YjLYATzk6KWae_eMjfqQJS-HEDwscyP7woD4FBCYNUk'
    const res = await fetch(url);
    const data = await res.json();
    img = data;
    return img;

}

function removeImg() {
    document.querySelector(".grid").textContent = "";

}

async function loadImg() {
    await removeImg();
    await getData();
    if (img.results.length == 0) {
        document.querySelector(".grid").innerHTML = "Nothing found"
    }

    for (let i = 0; i < img.results.length; i++) {
        let image = document.createElement("div");
        image.className = "img";
        image.style.backgroundImage = "url(" + img.results[i].urls.regular + ")";
        document.querySelector(".grid").appendChild(image);
    }

}

async function loadStartImg() {

    await getInitialData();

    for (let i = 0; i < img.results.length; i++) {
        let image = document.createElement("div");
        image.className = "img";
        image.style.backgroundImage = "url(" + img.results[i].urls.regular + ")";
        document.querySelector(".grid").appendChild(image);
    }

}