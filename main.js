
function enviouPalavraDigitada ( palavraDigitada, palavraCerta ) {
    // aqui você deve escrever um algoritímo que verifica se a pessoa digitou a palavra de forma correta
    // retorne true se sim e false se digitou errado
    return palavraDigitada === palavraCerta;
}

function novoPonto (vidaAtual, acertouPalavra) {
    // aqui você vai ver se o usuário acertou a palavra,
    // caso sim você deve retornar a vida atual dele,
    // caso contrário retorne a vida atual - 1
    // se o usuário ficar com zero vidas ou menos chame a função:
    //     end()
    if (!acertouPalavra){
        vidaAtual--;
    }
    if (vidaAtual <= 0) end();
    return vidaAtual;
}

function mensagemFimJogo (totalPontos) {
    // aqui você deve retornar uma mensagem de fim de jogo
    return "Você fez um total de " + totalPontos + " pontos";
}