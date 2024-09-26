//@ts-check

const MAX_TIME = 30;
const MAX_LIFE = 5;

const words = [
    "zoológico", "herói", "panela", "amizade", "campo", "dedal", "jarro", "chave", "piano", "tesoura",
    "balão", "caneca", "prédio", "velha", "fada", "caminho", "presente", "vaca", "vitrine", "empada",
    "estrela", "ventilador", "pedra", "livraria", "macaco", "jogo", "dedo", "lago", "sala", "relógio",
    "prato", "ganso", "flor", "esgoto", "sabão", "erva", "prego", "gato", "lenha", "esquina",
    "laranja", "chuva", "bala", "hospital", "roupa", "inglês", "universo", "pastel", "futebol", "beleza",
    "esperança", "orelha", "sabedoria", "cabelereiro", "cerveja", "abacaxi", "zumbi", "faca", "saco", "zebra",
    "medalha", "colher", "tigre", "fita", "biblioteca", "norte", "margem", "rio", "amor", "vidro",
    "telefone", "incenso", "cabra", "vassoura", "ostra", "elefante", "jumento", "jardim", "fábrica", "violão",
    "lua", "marmelada", "porco", "garrafa", "mercado", "fogão", "costas", "sorriso", "coelho", "galho",
    "lata", "cadeira", "pássaro", "rainha", "maçã", "viagem", "cachorro", "museu", "ferradura", "índio",
    "floresta", "repolho", "cenoura", "vermelho", "mamão", "dentadura", "picareta", "noite", "igreja", "olho",
    "parede", "porta", "goiaba", "dança", "carro", "doce", "creme", "caneta", "xerife", "vendedor",
    "covas", "japonês", "nuvem", "imagem", "urubu", "labirinto", "sol", "bola", "copo", "professor",
    "vacina", "pistola", "pente", "leite", "festa", "luz", "navio", "sapato", "matagal", "inseto",
    "janela", "família", "mochila", "lagoa", "couro", "teatro", "folha", "água", "ocasião", "moeda",
    "tartaruga", "mulher", "casa", "canto", "camisa", "energia", "jornal", "muro", "dinheiro", "pena",
    "inverno", "moinho", "banheiro", "forno", "corredor", "xícara", "jardineiro", "dentista", "peixe", "panda",
    "velocidade", "japonês", "vapor", "pano", "fruta", "árvore", "ponte", "grama", "música", "famoso",
    "locomotiva", "joaninha", "cidade", "chocolate", "piscina", "bomba", "manteiga", "melancia", "girafa", "criança",
    "grão", "pirata", "rainha", "mar", "livro", "uva", "igreja", "passagem", "farinha", "leopardo"
];

const Obj = {
    /** @type {HTMLButtonElement} */
    // @ts-ignore
    get btStart () { return document.querySelector("#btStart"); },
    /** @type {HTMLDivElement} */
    // @ts-ignore
    get menu () { return document.querySelector("#menu"); },
    /** @type {HTMLDivElement} */
    // @ts-ignore
    get game () { return document.querySelector("#game"); },
    /** @type {HTMLInputElement} */
    // @ts-ignore
    get text () { return document.querySelector("#text"); },
    /** @type {HTMLSpanElement} */
    // @ts-ignore
    get word () { return document.querySelector("#word"); },
    /** @type {HTMLDivElement} */
    // @ts-ignore
    get time () { return document.querySelector("#time"); },
    /** @type {HTMLDivElement} */
    // @ts-ignore
    get score () { return document.querySelector("#score"); },
    /** @type {HTMLDivElement} */
    // @ts-ignore
    get life () { return document.querySelector("#life"); },
    /** @type {HTMLDivElement} */
    // @ts-ignore
    get message () { return document.querySelector("#message"); },
}

const Props = {
    score: 0,
    life: 0,
}

function randomWord () {
    const qtd = words.length;
    const idx = Math.trunc(Math.random() * qtd);
    return words[idx];
}

function newText () {
    const text = randomWord().toUpperCase();
    Obj.word.innerHTML = text;
    return text;
}

const setError = (() => {
    let time;
    return () => {
        if (time) clearTimeout(time);
        Obj.text.setAttribute("error", "1");
        Obj.text.disabled = true;
        time = setTimeout(() => {
            Obj.text.removeAttribute("error");
            Obj.text.value = "";
            Obj.text.disabled = false;
            Obj.text.focus();
        },500)
    }
})()

function renderTime (max, actual) {
    if (actual >= max) {
        return true;
    } else {
        const porcent = 100 - ( actual / max ) * 100;
        Obj.time.style.backgroundImage = `linear-gradient(to right, #0a0 ${porcent}%, #333 ${porcent}%)`;
        return false;
    }
}

const processFrame = (() => {
    let time;
    let maxTime = 0;
    let actualTime = 0;

    const endTime = () => {
        if (time) clearInterval(time);
    }

    const startTime = () => {
        maxTime = MAX_TIME;
        actualTime = 0;
        renderTime(maxTime, actualTime);
        time = setInterval(() => {
            actualTime++;
            const finish = renderTime(maxTime, actualTime);
            if (finish) {
                maxTime = Math.trunc(maxTime * .8);
                actualTime = 0;
                end()
            }
        }, 1000)
    }

    return { startTime, endTime }

})()

function showLife () {
    Obj.life.innerHTML = Props.life.toString();
}

function showScore () {
    Obj.score.innerHTML = Props.score.toString();
}

function clearText () {
    Obj.text.value = "";
}

function start () {
    Props.score = 0;
    Props.life = MAX_LIFE;
    showLife();
    showScore();

    Obj.menu.style.display = "none";
    Obj.game.style.display = "block";
    clearText();
    Obj.text.focus();
    let text = newText();
    processFrame.startTime();
    Obj.text.onkeyup = ({ key }) => {
        if ( key === "Enter" ) {
            const wordOk = enviouPalavraDigitada(Obj.text.value.toUpperCase(), text);
            if (wordOk){
                Props.score += Props.life;
                text = newText();
                showScore();
                clearText();
            } else {
                setError();
            }
            //@ts-ignore
            Props.life = novoPonto(Props.life, wordOk);
            showLife();
        }
    }
}

function end () {
    processFrame.endTime();
    Obj.menu.style.display = "block";
    Obj.game.style.display = "none";
    Obj.message.innerHTML = mensagemFimJogo(Props.score);

}

function main () {
    Obj.btStart.addEventListener("click", start);
}

window.addEventListener("DOMContentLoaded", main);