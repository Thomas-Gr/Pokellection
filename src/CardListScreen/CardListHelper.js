import React from 'react';

const typeOrder = {
  "GRASS": 1,
  "FIRE": 2,
  "WATER": 3,
  "LIGHTNING": 4,
  "PSYCHIC": 5,
  "FIGHTING": 6,
  "COLORLESS": 7,
  "TRAINER": 8,
  "EXTRA_RULE": 9,
  "PASS_CARD": 10,
  "ARTWORK": 11,
  "DECK_LIST": 12,
  "ENERGY": 13
};

const rarityOrder = {
  "COMMON": 1,
  "UNCOMMON": 2,
  "RARE": 3,
  "RARE_HOLO": 3,
  "SUPER_RARE": 5,
  "SUPER_RARE_HOLO": 6,
  "ULTRA_RARE_UNCOMMON": 7,
  "NONE": 8
};

export const refreshCardList = (cards, collection, selection) => {
  return Object.values(cards)
    .sort((a, b) => {
      const cardNumberDiff = parseInt(a.number) - parseInt(b.number);
      if (cardNumberDiff != 0) return cardNumberDiff;

      const typeDiff = typeOrder[a.type] - typeOrder[b.type];
      if (typeDiff != 0) return typeDiff;

      const rarityDiff = rarityOrder[a.rarity] - rarityOrder[b.rarity];
      if (rarityDiff != 0) return rarityDiff;

      const pokemonNumberDiff = parseInt(a.pokemonNumber) - parseInt(b.pokemonNumber);
      if (pokemonNumberDiff != 0) return pokemonNumberDiff;
    })
    .map(a => ({id: a.id, owned: collection[a.id] != null}))
    .filter(a => {
      if (selection == 'got') return a.owned;
      else if (selection == 'miss') return !a.owned;
      else return true;
    });
}

export default refreshCardList
