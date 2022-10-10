console.log('[HelenaLima] Flappy Bird')

const sprites =  new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

const somHit = new Audio();
somHit.src = './sons/hit.wav'

let globais = {};
let telaAtiva = {};
let frames = 0;

const telaInicio = {
    sprietX: 134,
    sprietY: 0,
    lagura: 174,
    altura: 152,
    x: (canvas.width / 2) - 174 / 2,
    y: 50,
    desenha() {
        contexto.drawImage(
            sprites,
            telaInicio.sprietX, telaInicio.sprietY,
            telaInicio.lagura, telaInicio.altura,
            telaInicio.x, telaInicio.y,
            telaInicio.lagura, telaInicio.altura,
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


const telas = {
    inicio: {
        inicializa(){
            globais.flappyBird = criaFlappyBird();
            globais.chao = criaChao();
            globais.canos = criaCanos();
           
        },

        desenha(){
            
            planoDeFundo.desenha();
            globais.flappyBird.desenha();
            globais.canos.desenha();
            globais.chao.desenha();
            
            telaInicio.desenha();
        },

        click() {
            mudaDeTela(telas.jogo);
        },

        atualiza(){
            globais.chao.atualiza();
        },
    },

    jogo: {
        desenha(){
            planoDeFundo.desenha();
            globais.canos.desenha();
            globais.flappyBird.desenha();
            globais.canos.desenha();
            globais.chao.desenha();
            
        },

        click() {
            globais.flappyBird.pula();
        },

        atualiza() {
            globais.chao.atualiza();
            globais.canos.atualiza();
            globais.flappyBird.atualiza();
           
        }
    },

};



function mudaDeTela(novaTela) {
    telaAtiva = novaTela;

    if(telaAtiva.inicializa){
        telaAtiva.inicializa();
    }
}


function loop() {

    telaAtiva.desenha();
    telaAtiva.atualiza();

    frames += 1

    requestAnimationFrame(loop);
};

function fazColisao(flappyBird, chao) {
    const flappyBirdY = flappyBird.y + flappyBird.altura;
    const chaoY = chao.y;

    if(flappyBirdY >= chaoY) {
        return true;
    }else {
        return false;
    }
};


function criaFlappyBird() {
    const flappyBird = {
        lagura: 33,
        altura: 24,
        x: 10,
        y: 50,
        gravidade: 0.25,
        velocidade: 0,
        pulo: 4.6,
        movimentos: [
            {sprietX: 0, sprietY: 0,},
            {sprietX: 0, sprietY: 26,},
            {sprietX: 0, sprietY: 52,},
        ],
        frameAtual: 0,
        pula() {
            flappyBird.velocidade =- flappyBird.pulo;
        },
        atualiza () {
            if(fazColisao(flappyBird, globais.chao)){
                
                somHit.play();
                setTimeout(() => {
                    mudaDeTela(telas.inicio);
                }, 300);

                
    
                return;
            }
    
            flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade
            flappyBird.y = flappyBird.y + flappyBird.velocidade;
        },
        desenha() {
            flappyBird.atualizaFrameAtual();
            const {sprietX, sprietY} = flappyBird.movimentos[flappyBird.frameAtual];
            contexto.drawImage(
                sprites,
                sprietX,sprietY,
                flappyBird.lagura, flappyBird.altura,
                flappyBird.x, flappyBird.y,
                flappyBird.lagura, flappyBird.altura
            
            );
        },

        atualizaFrameAtual(){
            const intervaloDeFrames = 10;
            const passouOIntervalo = frames % intervaloDeFrames ===0;

            if(passouOIntervalo) {
                const baseDoIncrimento = 1;
                const incremento = baseDoIncrimento + flappyBird.frameAtual
                const baseRepeticao = flappyBird.movimentos.length;
                flappyBird.frameAtual = incremento % baseRepeticao;
            }

           
        },
    };

    return flappyBird;
}


function criaChao() {
    const chao = {
        sprietX: 0,
        sprietY: 610,
        lagura: 224,
        altura: 112,
        x: 0,
        y: canvas.height - 112,
        atualiza(){
            const movimentoDoChao = 1;
            const repeteEm = chao.lagura / 2;

            const movimentação = chao.x - movimentoDoChao;

            chao.x = movimentação % repeteEm
        },
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

    return chao;
};

function criaCanos(){
    const canos = {
        largura: 52,
        altura: 400,
        chao: {
            sprietX: 0,
            sprietY: 169,
        },
        ceu: {
            sprietX: 52,
            sprietY: 169,
        },
        espaco: 80,
        desenha(){
            canos.pares.forEach(function(par) {

                const yRandom = par.y;
                const espacamentoEntreCanos = 90;
    
                const canoCeuX = par.x;
                const canoCeuY = yRandom;

                contexto.drawImage(
                    sprites,
                    canos.ceu.sprietX, canos.ceu.sprietY,
                    canos.largura, canos.altura,
                    canoCeuX, canoCeuY,
                    canos.largura, canos.altura,
                )
    
                const canoChaoX = par.x;
                const canoChaoY = canos.altura + espacamentoEntreCanos + yRandom;
                contexto.drawImage(
                    sprites,
                    canos.chao.sprietX, canos.chao.sprietY,
                    canos.largura, canos.altura,
                    canoChaoX, canoChaoY,
                    canos.largura, canos.altura,
                )

                par.canoCeu = {
                    x: canoCeuX,
                    y: canos.altura + canoCeuY
                }
                par.canoChao = {
                    x: canoChaoX,
                    y: canoChaoY,
                }

            })
        },
        temColisaoComOFlappy(par){

            const cabecaDoFlappy = globais.flappyBird.y;
            const peDoFlappy = globais.flappyBird.y + globais.flappyBird.altura;

            if(globais.flappyBird.x >= par.x){


                if(cabecaDoFlappy <= par.canoCeu.y){
                    return true;
                };            
            
                if(peDoFlappy >= par.canoChao.y){
                    return true;
                };
            
            };

            return false;
        },
        pares: [],
        atualiza() {
            const passou100Frames = frames % 100 === 0;
            if(passou100Frames){
                canos.pares.push({
                    x: canvas.width,
                    y: -150 * (Math.random() + 1),
                });
            }

            canos.pares.forEach(function(par) {
                par.x = par.x - 2;

                if(canos.temColisaoComOFlappy(par)){
                    mudaDeTela(telas.inicio);
                }

                if(par.x + canos.largura <= 0){
                    canos.pares.shift();
                }
            });
        }

    }
    return canos;
};

window.addEventListener('click', function() {
    if (telaAtiva.click) {
        telaAtiva.click();
    };
});

mudaDeTela(telas.inicio);
loop();