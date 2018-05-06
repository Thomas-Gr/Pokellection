import React from 'react';
import BaseSet from "./ImageConfig/BaseSet.js";
import ExpansionPack from "./ImageConfig/ExpansionPack.js";
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
