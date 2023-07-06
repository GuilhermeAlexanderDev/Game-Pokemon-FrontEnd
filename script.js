const url = 'https://pokeapi.co/api/v2/pokemon/';

const selectPokemonInput = document.querySelector('.selectMyPokemon input');
const buttonSelectPokemon = document.querySelector('.selectMyPokemon button');

let POKEMONID = '1';

buttonSelectPokemon.addEventListener('click', () => {
  POKEMONID = selectPokemonInput.value;
  console.log(POKEMONID);
  myPokemonInit(POKEMONID);
});

let hpPlayerAtual = 100;
let ATKmove1 = '';
let ATKmove2 = '';
let ATKmove3 = '';
let ATKmove4 = '';

function myPokemonInit(POKEMONID) {
  fetch(url + POKEMONID)
    .then(response => response.json())
    .then(data => {
      const NOME = data.name;
      const HP = 100;
      const ataques1 = data.moves[18].move.name;
      const ataques2 = data.moves[24].move.name;
      const ataques3 = data.moves[57].move.name;
      const ataques4 = data.moves[7].move.name;

      const nomePokemon = document.querySelector('h2.nomePokemon');
      nomePokemon.textContent = NOME.toUpperCase();

      const hpPlayer = document.querySelector('.hpPlayer');
      hpPlayer.textContent = `${HP} / ${HP}`;

      const image = document.querySelector('img.MyPokemon');
      image.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/${POKEMONID}.gif`;

      const move1 = document.querySelector('#move1Player');
      const move2 = document.querySelector('#move2Player');
      const move3 = document.querySelector('#move3Player');
      const move4 = document.querySelector('#move4Player');
      move1.textContent = ataques1;
      move2.textContent = ataques2;
      move3.textContent = ataques3;
      move4.textContent = ataques4;

      ATKmove1 = ataques1;
      ATKmove2 = ataques2;
      ATKmove3 = ataques3;
      ATKmove4 = ataques4;
    })
    .catch(error => {
      console.log('Ocorreu um erro:', error);
    });
}

myPokemonInit(25);

function aplicarDanoPlayer(dano) {
  hpPlayerAtual -= dano / 2;

  const hpPlayer = document.querySelector('.hpPlayer');
  hpPlayer.textContent = `${hpPlayerAtual} / ${hpPlayerAtual}`;

  const pokemonVida = document.querySelector('.pokemonVida');
  pokemonVida.style.width = `${hpPlayerAtual}%`;
  if (hpPlayerAtual <= 40) {
    pokemonVida.classList.add('dano')
  }

  if (hpPlayerAtual <= 0) {
    hpPlayerAtual = 0;
    pokemonVida.style.width = '0%';
    hpPlayer.textContent = `${hpPlayerAtual} / ${hpPlayerAtual}`;

    disablePlayerMoves();

    const vs = document.querySelector('.messagem .Text');
    vs.style.color = '#F00';
    vs.textContent = 'VOCÊ FOI DERROTADO!!';
    setTimeout(() => {
      location.reload();
    }, 2000);
  }
}

function disablePlayerMoves() {
    const buttons = document.querySelectorAll('.atkButton');
    buttons.forEach(button => {
      button.disabled = true;
    });
  }

let hpInimigoAtual = 0;
let atkInimigoMove1 = '';
let atkInimigoMove2 = '';
let atkInimigoMove3 = '';
let atkInimigoMove4 = '';

function gerarInimigo() {
  const inimigoAleatorio = Math.floor(Math.random() * 350);

  fetch(url + inimigoAleatorio)
    .then(response => response.json())
    .then(data => {
      const NOME = data.name;
      const HP = data.stats[0].base_stat + 50;

      hpInimigoAtual = HP;

      const pokemonImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${inimigoAleatorio}.gif`;
      const ataques1 = data.moves[4].move.name;
      const ataques2 = data.moves[6].move.name;
      const ataques3 = data.moves[5].move.name;
      const ataques4 = data.moves[10].move.name;

      atkInimigoMove1 = ataques1;
      atkInimigoMove2 = ataques2;
      atkInimigoMove3 = ataques3;
      atkInimigoMove4 = ataques4;

      const nomeInimigoPokemon = document.querySelector('h2.nomeInimigoPokemon');
      nomeInimigoPokemon.textContent = NOME.toUpperCase();

      const hpInimigo = document.querySelector('.hpInimigo');
      hpInimigo.textContent = `${HP} / ${HP}`;

      const image = document.querySelector('img.inimigoPokemon');
      image.src = pokemonImage;

      const move1 = document.querySelector('#move1');
      const move2 = document.querySelector('#move2');
      const move3 = document.querySelector('#move3');
      const move4 = document.querySelector('#move4');
      move1.textContent = ataques1;
      move2.textContent = ataques2;
      move3.textContent = ataques3;
      move4.textContent = ataques4;

      document.querySelector('.init').style.display = 'none';

      const vs = document.querySelector('.messagem .Text');
      vs.textContent = `Pikachu Vs ${NOME}`;
    })
    .catch(error => {
      console.log('Ocorreu um erro:', error);
    });
}

function aplicarDano(dano) {
    hpInimigoAtual -= dano;
  
    let inimigoVida = document.querySelector('.inimigoVida');
    inimigoVida.style.width = `${hpInimigoAtual}%`;
  
    const hpInimigo = document.querySelector('.hpInimigo');
    hpInimigo.textContent = `${hpInimigoAtual} / ${hpInimigoAtual}`;
    if (hpInimigoAtual <= 40) {
      inimigoVida.classList.add("dano")
    }
  
    if (hpInimigoAtual <= 0) {
      hpInimigoAtual = 0;
      inimigoVida.style.width = '0%';
      hpInimigo.textContent = `${hpInimigoAtual} / ${hpInimigoAtual}`;
  
      disablePlayerMoves();
  
      const vs = document.querySelector('.messagem .Text');
      vs.style.color = '#0F0';
      vs.textContent = 'VOCÊ VENCEU!!';
      setTimeout(() => {
        location.reload();
      }, 2000);
    }
  }
function ataqueInimigo() {
  const ataqueAleatorioInimigo = Math.floor(Math.random() * 4);
  let move = '';

  if (ataqueAleatorioInimigo === 0) {
    move = atkInimigoMove1;
  } else if (ataqueAleatorioInimigo === 1) {
    move = atkInimigoMove2;
  } else if (ataqueAleatorioInimigo === 2) {
    move = atkInimigoMove3;
  } else {
    move = atkInimigoMove4;
  }

  fetch('https://pokeapi.co/api/v2/move/' + move)
    .then(response => response.json())
    .then(data => {
      let dano = data.power;
      console.log(move + ' : ' + dano);

      if (dano == null) {
        dano = 10;
      }
      if(move < 0){
        dano = 10
      }

      const vs = document.querySelector('.Text');
      vs.style.color = '#F00';
      vs.textContent = `INIMIGO ACERTOU! ${move} : -${dano}`;
      aplicarDanoPlayer(dano);
    });
}

function ataque(ATK) {
  let move = '';

  if (ATK === 'atk1') {
    move = ATKmove1;
  } else if (ATK === 'atk2') {
    move = ATKmove2;
  } else if (ATK === 'atk3') {
    move = ATKmove3;
  } else {
    move = ATKmove4;
  }

  fetch('https://pokeapi.co/api/v2/move/' + move)
    .then(response => response.json())
    .then(data => {
      const ataqueAleatorio = Math.floor(Math.random() * 21);

      if (ataqueAleatorio < 10) {
        ataqueInimigo();
      } else {
        let dano = data.power;
        if (dano == null) {
            dano = 45;
        }
        if(move < 0){
            dano = 20
        }
        const vs = document.querySelector('.Text');
        vs.style.color = '#00F';
        vs.textContent = `VOCÊ ACERTOU! ${move} DANO -${dano}`;
        aplicarDano(dano);
      }
    });
}

gerarInimigo();
