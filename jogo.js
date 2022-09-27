console.log('[HelenaLima] Flappy Bird')

const sprites =  new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');


const chao = {
    sprietX: 0,
    sprietY: 610,
    lagura: 224,
    altura: 112,
    x: 0,
    y: canvas.height - 112,
    desenha() {
        contexto.drawImage(
            sprites,
            chao.sprietX, chao.sprietY,
            chao.lagura, chao.altura,
            chao.x, chao.y,
            chao.lagura, chao.altura,
        );

        contexto.drawImage(
            sprites,
            chao.sprietX, chao.sprietY,
            chao.lagura, chao.altura,
            (chao.x + chao.lagura), chao.y,
            chao.lagura, chao.altura,
        );
    },
};


const planoDeFundo = {
    sprietX: 390,
    spriteY: 0,
    lagura: 275,
    altura: 204,
    x: 0,
    y: canvas.height - 204,
    desenha() {

        contexto.fillStyle = '#70c5ce'
        contexto.fillRect(0, 0, canvas.width, canvas.height)

        contexto.drawImage(
            sprites,
            planoDeFundo.sprietX, planoDeFundo.spriteY,
            planoDeFundo.lagura, planoDeFundo.altura,
            planoDeFundo.x, planoDeFundo.y,
            planoDeFundo.lagura, planoDeFundo.altura,
        );

        contexto.drawImage(
            sprites,
            planoDeFundo.sprietX, planoDeFundo.spriteY,
            planoDeFundo.lagura, planoDeFundo.altura,
            (planoDeFundo.x + planoDeFundo.lagura), planoDeFundo.y,
            planoDeFundo.lagura, planoDeFundo.altura,
        );
    },
};


const flappyBird = {
    sprietX: 0,
    sprietY: 0,
    lagura: 33,
    altura: 24,
    x: 10,
    y: 50,
    gravidade: 0.25,
    velocidade: 0,
    atualiza () {
        flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade
        flappyBird.y = flappyBird.y + flappyBird.velocidade;
    },
    desenha() {
        contexto.drawImage(
            sprites,
            flappyBird.sprietX, flappyBird.sprietY,
            flappyBird.lagura, flappyBird.altura,
            flappyBird.x, flappyBird.y,
            flappyBird.lagura, flappyBird.altura
        
        );
    },
};



function loop() {

    flappyBird.atualiza();

    planoDeFundo.desenha();
    chao.desenha();
    flappyBird.desenha();
    




    requestAnimationFrame(loop);
}



loop();