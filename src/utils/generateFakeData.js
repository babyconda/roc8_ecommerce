import { faker } from "@faker-js/faker";

const generateFakeListOfSong = () => {
  return {
    // song: faker.music.genre(),
    song: faker.music.songName(),
  };
};

export const generateFakeSongs = (length) => {
  const songs = [];
  Array.from({ length: length }).forEach(() => {
    songs.push(generateFakeListOfSong());
  });
  return songs;
};
