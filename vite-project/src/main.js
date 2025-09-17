import './style.css'

import { getPokemonData } from './modules/api.js';
import { extractData, showData } from './modules/data.js';

const select = document.getElementById("atk-ivs-mode");
const inputDiv = document.querySelector(".atk-ivs-manual");

select.addEventListener("change", () => {
    if (select.value === "manual") {
        inputDiv.style.display = "block";  // 手入力のとき表示
    } else {
        inputDiv.style.display = "none";   // 自動最大のとき非表示
    }
});



const getInputName = (form, slot) => {
    if(slot === 'attacker') return form.querySelector('[name="atkName"]').value.trim().toLowerCase();
    if(slot === 'defender') return form.querySelector('[name="defName"]').value.trim().toLowerCase();
};

// slot に応じて表示先を分ける
const submitHandler = async (e, slot) => {
    e.preventDefault();
    const form = e.target;
    const name = getInputName(form, slot);
    if(!name) return alert("ポケモン名を入力してください");

    const data = await getPokemonData(name);
    if(!data) return;

    const extracted = extractData(data);

    // slotごとに表示先を変更
    const resultDiv = slot === 'attacker' ? document.querySelector('#atk-result') : document.querySelector('#def-result');
    showData(extracted, resultDiv);
};

// 攻撃側フォーム
document.querySelector('#atk-form').addEventListener('submit', (e) => submitHandler(e, 'attacker'));

// 防御側フォーム
document.querySelector('#def-form').addEventListener('submit', (e) => submitHandler(e, 'defender'));

// const getInputName = (e) => {
//     const form = new FormData(e.target);
//     const pokeName = form.get("pokeName").toLowerCase();
//     return pokeName;
// }

// const submitHandler = async (e) => {
//     e.preventDefault();
//     const form = e.target;
//     const inputName = getInputName(e);
//     const pokemonData = await getPokemonData(inputName);
//     const extractedData = extractData(pokemonData)
//     showData(extractedData);
// }

document.querySelector("#js-form").addEventListener("submit", (e) => submitHandler(e));