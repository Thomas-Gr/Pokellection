import React from 'react';
import BaseSet from "./ImageConfig/BaseSet.js";
import ExpansionPack from "./ImageConfig/ExpansionPack.js";
import Jungle from "./ImageConfig/Jungle.js";
import PokemonJungle from "./ImageConfig/PokemonJungle.js";
import Fossil from "./ImageConfig/Fossil.js";
import MysteryOfTheFossils from "./ImageConfig/MysteryOfTheFossils.js";
import RocketGang from "./ImageConfig/RocketGang.js";
import TeamRocket from "./ImageConfig/TeamRocket.js";
import GymHeroes from "./ImageConfig/GymHeroes.js";
import LeadersStadium from "./ImageConfig/LeadersStadium.js";
import GymChallenge from "./ImageConfig/GymChallenge.js";
import ChallengeFromTheDarkness from "./ImageConfig/ChallengeFromTheDarkness.js";

const SerieConfig =
  {
    'Expansion Pack' : {
      definition: require('../../resources/series/Expansion Pack.json'),
      pictures: ExpansionPack
    },
    'Base Set' : {
      definition: require('../../resources/series/Base Set.json'),
      pictures: BaseSet
    },
    'Pokémon Jungle' : {
      definition: require('../../resources/series/Pokemon Jungle.json'),
      pictures: PokemonJungle
    },
    'Jungle' : {
      definition: require('../../resources/series/Jungle.json'),
      pictures: Jungle
    },
    'Fossil' : {
      definition: require('../../resources/series/Fossil.json'),
      pictures: Fossil
    },
    'Mystery of the Fossils' : {
      definition: require('../../resources/series/Mystery of the Fossils.json'),
      pictures: MysteryOfTheFossils
    },
    'Team Rocket' : {
      definition: require('../../resources/series/Team Rocket.json'),
      pictures: TeamRocket
    },
    'Rocket Gang' : {
      definition: require('../../resources/series/Rocket Gang.json'),
      pictures: RocketGang
    },
    'Gym Heroes' : {
      definition: require('../../resources/series/Gym Heroes.json'),
      pictures: GymHeroes
    },
    'Leaders\' Stadium' : {
      definition: require('../../resources/series/Leaders\' Stadium.json'),
      pictures: LeadersStadium
    },
    'Gym Challenge' : {
      definition: require('../../resources/series/Gym Challenge.json'),
      pictures: GymChallenge
    },
    'Challenge from the Darkness' : {
      definition: require('../../resources/series/Challenge from the Darkness.json'),
      pictures: ChallengeFromTheDarkness
    }
  };

export default SerieConfig
