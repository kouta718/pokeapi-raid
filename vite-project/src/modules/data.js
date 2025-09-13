export const getPokemonInfo = async (pokeName) => {
    try {
        const response = await instance.get(pokeName.toLowerCase().trim());
        const data = response.data;

        return {
            name: data.name,
            types: data.types.map(t => t.type.name),
            abilities: data.abilities.map(a => a.ability.name),
            moves: data.moves.map(m => m.move.name),
            stats: data.stats.map(s => ({
                name: s.stat.name,
                base: s.base_stat
            }))
        };
    } catch (error) {
        console.error(error);
        return null;
    }
};