import React from 'react';

const typeOrder = {
  "GRASS": 1,
  "FIRE": 2,
  "WATER": 3,
  "LIGHTNING": 4,
  "PSYCHIC": 5,
  "FIGHTING": 6,
  "COLORLESS": 7,
  "METAL": 8,
  "DARKNESS": 9,
  "TRAINER": 10,
  "EXTRA_RULE": 11,
  "PASS_CARD": 12,
  "ARTWORK": 13,
  "DECK_LIST": 14,
  "ENERGY": 15
};

const rarityOrder = {
  "COMMON": 1,
  "UNCOMMON": 2,
  "RARE": 3,
  "RARE_HOLO": 4,
  "SUPER_RARE": 5,
  "SUPER_RARE_HOLO": 6,
  "ULTRA_RARE_UNCOMMON": 7,
  "NONE": 8
};

const rarityOrder2 = {
  "COMMON": 4,
  "UNCOMMON": 3,
  "RARE": 2,
  "RARE_HOLO": 1,
  "SUPER_RARE": 5,
  "SUPER_RARE_HOLO": 6,
  "ULTRA_RARE_UNCOMMON": 7,
  "NONE": 8
};

export const refreshCardList = (cards, collection, selection) => {
  return Object.values(cards)
    .sort((a, b) => USLikeSorting(a, b))
    .map(a => ({id: a.id, owned: collection[a.id] != null}))
    .filter(a => {
      if (selection == 'got') return a.owned;
      else if (selection == 'miss') return !a.owned;
      else return true;
    });
}

function bulbapediaSorting(a, b) {
    const cardNumberDiff = parseInt(a.number) - parseInt(b.number);
    if (cardNumberDiff != 0) return cardNumberDiff;

    const typeDiff = typeOrder[a.type] - typeOrder[b.type];
    if (typeDiff != 0) return typeDiff;

    const rarityDiff = rarityOrder[a.rarity] - rarityOrder[b.rarity];
    if (rarityDiff != 0) return rarityDiff;

    const pokemonNumberDiff = parseInt(a.pokemonNumber) - parseInt(b.pokemonNumber);
    if (pokemonNumberDiff != 0) return pokemonNumberDiff;
}

function USLikeSorting(a, b) {
    if (parseInt(a.number) < 0 && parseInt(b.number) > 0) {
      return 1;
    } else if (parseInt(a.number) > 0 && parseInt(b.number) < 0) {
      return -1;
    }

    const cardNumberDiff = parseInt(a.number) - parseInt(b.number);
    if (cardNumberDiff != 0) return cardNumberDiff;

    if (rarityOrder2[a.rarity] >= 5 && rarityOrder2[b.rarity] < 5) {
      return 1;
    } else if (rarityOrder2[b.rarity] >= 5 && rarityOrder2[a.rarity] < 5) {
      return -1;
    }

    if (typeOrder[a.type] >= 10 && a.rarity != "RARE_HOLO" && typeOrder[b.type] < 10) {
      return 1;
    } else if (typeOrder[b.type] >= 10 && b.rarity != "RARE_HOLO" && typeOrder[a.type] < 10) {
      return -1;
    }

    const rarityDiff = rarityOrder2[a.rarity] - rarityOrder2[b.rarity];
    if (rarityDiff != 0) return rarityDiff;

    const typeDiff = typeOrder[a.type] - typeOrder[b.type];
    if (typeDiff != 0) return typeDiff;

    const pokemonNumberDiff = parseInt(a.pokemonNumber) - parseInt(b.pokemonNumber);
    if (pokemonNumberDiff != 0) return pokemonNumberDiff;

    if (a.explanation != null && b.explanation != null) {
      const explanationDiff = a.explanation.localeCompare(b.explanation);
      return explanationDiff;
    }

    return 1;
}

export default refreshCardList
