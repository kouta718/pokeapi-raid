import './style.css'

import { getPokemonInfo } from './modules/api.js';


async function showPokemon(pokeName) {
    const info = await getPokemonInfo(pokeName);

    if (info) {
        console.log("名前:", info.name);
        console.log("タイプ:", info.types.join(", "));
        console.log("特性:", info.abilities.join(", "));
        console.log("技（最初の5件）:", info.moves.slice(0, 5).join(", "));
        console.log("種族値:");
        info.stats.forEach(s => {
            console.log(` - ${s.name}: ${s.base}`);
        });
    } else {
    console.log("ポケモンが見つかりませんでした");
    }
}

showPokemon("pikachu");