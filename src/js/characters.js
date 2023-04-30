const imagesArray = [
  "arya-stark.jpg",
  "cersei-lannister.jpg",
  "danaerys-targaeryan.jpg",
  "jaime-lannister.jpg",
  "jon-snow.jpg",
  "ned-stark.jpg",
  "sansa-stark.jpg",
  "tyrion-lannister.jpg",
  "arya-stark.jpg",
  "cersei-lannister.jpg",
  "danaerys-targaeryan.jpg",
  "jaime-lannister.jpg",
  "jon-snow.jpg",
  "ned-stark.jpg",
  "sansa-stark.jpg",
  "tyrion-lannister.jpg"
];

const getCharacterNames = () => imagesArray.map(image => image);

const getRandomCharacters = () => {
  let randomCharacters = [];
  let characters = getCharacterNames();

  while (characters.length) {
    let index = Math.floor(Math.random(characters.length) * characters.length);
    randomCharacters.push(characters[index]);
    characters.splice(index, 1);
  }
  return randomCharacters;
};

module.exports = {
  getCharacterNames,
  getRandomCharacters,
}