import './style.css'


// 共通処理
async function fetchPokemonData(slot) {
    const input = document.querySelector(`#${slot}-species`);
    const abilitySelect = document.querySelector(`#${slot}-ability`);

    const name = input.value.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
    const res = await fetch(url);
    const data = await res.json();

    // 特性セット
    abilitySelect.innerHTML = "";
    data.abilities.forEach(ability => {
    const opt = document.createElement("option");
    opt.value = ability.ability.name;
    opt.textContent = ability.ability.name;
    abilitySelect.appendChild(opt);
    });
}

// まとめてイベント登録
document.querySelectorAll(".searchBtn").forEach(btn => {
    btn.addEventListener("click", (e) => {
    const slot = e.target.closest(".pokemon-slot").dataset.slot;
    fetchPokemonData(slot);
    });
});