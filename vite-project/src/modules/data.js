export const extractData = (pokemonData) => {
    const id = pokemonData.id;
    const name = pokemonData.name;
    const img = pokemonData.sprites.front_default;
    const types = pokemonData.types.map(t => t.type.name);
    const abilities = pokemonData.abilities.map(a => a.ability.name);
    const stats = {};
    pokemonData.stats.forEach(st => {
        stats[st.stat.name] = st.base_stat;
    });
    const moves = pokemonData.moves.map(a => a.move.name);
    return {id, name, img, types, abilities, stats, moves};
};


export const showData = (data) => {

    // 特性と技のドロップダウンを作成
    const abilitiesOptions = data.abilities
        .map(abilities => `<option value="${abilities}">${abilities}</option>`)
        .join("");
    const moveOptions = data.moves
        .map(move => `<option value="${move}">${move}</option>`)
        .join("");

    const htmlData = `<dl>
        <dd>ID: ${data.id}</dd>
        <dt>Name: ${data.name}</dt>
        <dd><img src="${data.img}" alt=""></dd>
        <dt>Types: ${data.types.join(", ")}</dd>
        <dd>
            Abilities:
            <select id="abilities-select">
                ${abilitiesOptions}
            </select>
        </dd>
        <dd>
            Stats:
            H: ${data.stats.hp},
            A: ${data.stats.attack},
            B: ${data.stats.defense},
            C: ${data.stats["special-attack"]},
            D: ${data.stats["special-defense"]},
            S: ${data.stats.speed}
        </dd>
        <dd>
            Moves:
            <select id="move-select">
                ${moveOptions}
            </select>
        </dd>
    </dl>`
    document.querySelector("#js-result").innerHTML = htmlData;
}