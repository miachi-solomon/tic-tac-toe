const Gameboard = {
    gameboard: []
};

// create a factory function that returns a player object with a method and property.
const player = (name) => {
    let symbol = [];
    return {
        name,
        symbol,
        setSymbol: function (sym) {
            symbol.push(sym);
        }
    }
};

