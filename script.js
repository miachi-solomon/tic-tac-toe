const Gameboard = {
    gameboard: []
}

// create a factory function that returns a player object with a method and property.
function player (name) {
    let symbol;
    return {
        name,
        symbol,
        setSymbol: function (sym) {
            symbol = sym;
        }
    }
}