//   Random number generator //
const getRandomIndex = length => {
    const randomNumber = Math.floor(Math.random() * length);
    return randomNumber;
}

module.exports = getRandomIndex;