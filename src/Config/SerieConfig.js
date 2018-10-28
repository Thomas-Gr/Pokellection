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
import Vending1 from "./ImageConfig/Vending_1.js";
import Vending2 from "./ImageConfig/Vending_2.js";
import Vending3 from "./ImageConfig/Vending_3.js";
import NiviCityGym from "./ImageConfig/NiviCityGym.js";
import HanadaCityGym from "./ImageConfig/HanadaCityGym.js";
import KuchibaCityGym from "./ImageConfig/KuchibaCityGym.js";
import TamamushiCityGym from "./ImageConfig/TamamushiCityGym.js";
import YamabukiCityGym from "./ImageConfig/YamabukiCityGym.js";
import GurenTownGym from "./ImageConfig/GurenTownGym.js";
import GreenDeck from "./ImageConfig/GreenDeck.js";
import RedDeck from "./ImageConfig/RedDeck.js";
import BulbasaurDeck from "./ImageConfig/BulbasaurDeck.js";
import SquirtleDeck from "./ImageConfig/SquirtleDeck.js";
import RainbowIsland from "./ImageConfig/RainbowIsland.js";
import TropicalIsland from "./ImageConfig/TropicalIsland.js";
import SouthernIslands from "./ImageConfig/SouthernIslands.js";
import HowIBecameAPokemonCard from "./ImageConfig/HowIBecameAPokemonCard.js";
import TradePlease from "./ImageConfig/TradePlease.js";
import Gym from "./ImageConfig/Gym.js";
import LuckyStadium from "./ImageConfig/LuckyStadium.js";
import GameBoy from "./ImageConfig/GameBoy.js";
import CoroCoroBestPhotoContest from "./ImageConfig/CoroCoroBestPhotoContest.js";
import VendingMachine from "./ImageConfig/VendingMachine.js";
import EvolutionCommunicationCampaign from "./ImageConfig/EvolutionCommunicationCampaign.js";
import TropicalPhoneCards from "./ImageConfig/TropicalMegaBattlePhoneCards.js";
import PokemonSongBestCollection from "./ImageConfig/PokemonSongBestCollection.js";
import PokemonFanClub from "./ImageConfig/PokemonFanClub.js";
import Jumbo from "./ImageConfig/Jumbo.js";
import Year1996 from "./ImageConfig/1996.js";
import Year1997 from "./ImageConfig/1997.js";
import Year1998 from "./ImageConfig/1998.js";
import Year1999 from "./ImageConfig/1999.js";
import Year2000 from "./ImageConfig/2000.js";
import Year20012005 from "./ImageConfig/2001-2005.js";
import AnaJR from "./ImageConfig/ANA-JR.js";
import Championship from "./ImageConfig/Championship.js";
import PikachuIllustrator from "./ImageConfig/PikachuIllustrator.js";
import TheTownonnoMap from "./ImageConfig/TheTownonNoMap.js";
import BaseExpansionPack from "./ImageConfig/BaseExpansionPack.js";
import WindfromtheSea from "./ImageConfig/WindfromtheSea.js";
import SplitEarth from "./ImageConfig/SplitEarth.js";
import MysteriousMountains from "./ImageConfig/MysteriousMountains.js";
import PokemonWeb from "./ImageConfig/PokemonWeb.js";
import PokemonVS from "./ImageConfig/PokemonVS.js";
import PPromotionalCards from "./ImageConfig/PPromotionalCards.js";
import TPromotionalCards from "./ImageConfig/TPromotionalCards.js";
import JPromotionalCards from "./ImageConfig/JPromotionalCards.js";
import McDonaldsOriginalMinimumPack from "./ImageConfig/McDonaldsOriginalMinimumPack.js";
import PokemonEStarterDeck from "./ImageConfig/PokemonEStarterDeck.js";
import TyranitarHalfDeck from "./ImageConfig/TyranitarHalfDeck.js";
import TheaterLimitedVSPack from "./ImageConfig/TheaterLimitedVSPack.js";
import CrossingtheRuins from "./ImageConfig/CrossingtheRuins.js";
import AwakeningLegends from "./ImageConfig/AwakeningLegends.js";
import DarknessandtoLight from "./ImageConfig/DarknessandtoLight.js";
import GoldSilvertoaNewWorld from "./ImageConfig/GoldSilvertoaNewWorld.js";

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
    },
    'Series 1 (Blue)' : {
      definition: require('../../resources/series/Series 1 (Blue).json'),
      pictures: Vending1
    },
    'Series 2 (Red)' : {
      definition: require('../../resources/series/Series 2 (Red).json'),
      pictures: Vending2
    },
    'Series 3 (Green)' : {
      definition: require('../../resources/series/Series 3 (Green).json'),
      pictures: Vending3
    },
    'Nivi City Gym' : {
      definition: require('../../resources/series/Nivi City Gym.json'),
      pictures: NiviCityGym
    },
    'Hanada City Gym' : {
      definition: require('../../resources/series/Hanada City Gym.json'),
      pictures: HanadaCityGym
    },
    'Kuchiba City Gym' : {
      definition: require('../../resources/series/Kuchiba City Gym.json'),
      pictures: KuchibaCityGym
    },
    'Tamamushi City Gym' : {
      definition: require('../../resources/series/Tamamushi City Gym.json'),
      pictures: TamamushiCityGym
    },
    'Yamabuki City Gym' : {
      definition: require('../../resources/series/Yamabuki City Gym.json'),
      pictures: YamabukiCityGym
    },
    'Guren Town Gym' : {
      definition: require('../../resources/series/Guren Town Gym.json'),
      pictures: GurenTownGym
    },
    'Green Deck' : {
      definition: require('../../resources/series/Green Deck.json'),
      pictures: GreenDeck
    },
    'Red Deck' : {
      definition: require('../../resources/series/Red Deck.json'),
      pictures: RedDeck
    },
    'Bulbasaur Deck' : {
      definition: require('../../resources/series/Bulbasaur Deck.json'),
      pictures: BulbasaurDeck
    },
    'Squirtle Deck' : {
      definition: require('../../resources/series/Squirtle Deck.json'),
      pictures: SquirtleDeck
    },
    'Tropical Island' : {
      definition: require('../../resources/series/Tropical Island.json'),
      pictures: TropicalIsland
    },
    'Rainbow Island' : {
      definition: require('../../resources/series/Rainbow Island.json'),
      pictures: RainbowIsland
    },
    'Southern Islands' : {
      definition: require('../../resources/series/Southern Islands.json'),
      pictures: SouthernIslands
    },
    'How I Became a Pokémon Card' : {
      definition: require('../../resources/series/How I Became a Pokemon Card.json'),
      pictures: HowIBecameAPokemonCard
    },
    'Trade Please' : {
      definition: require('../../resources/series/Trade Please.json'),
      pictures: TradePlease
    },
    'Gym' : {
      definition: require('../../resources/series/Gym.json'),
      pictures: Gym
    },
    'Lucky Stadium' : {
      definition: require('../../resources/series/Lucky Stadium.json'),
      pictures: LuckyStadium
    },
    'Game Boy' : {
      definition: require('../../resources/series/Game Boy.json'),
      pictures: GameBoy
    },
    'CoroCoro Best Photo Contest' : {
      definition: require('../../resources/series/CoroCoro Best Photo Contest.json'),
      pictures: CoroCoroBestPhotoContest
    },
    'Vending Machine' : {
      definition: require('../../resources/series/Vending Machine.json'),
      pictures: VendingMachine
    },
    'Evolution Communication Campaign' : {
      definition: require('../../resources/series/Evolution Communication Campaign.json'),
      pictures: EvolutionCommunicationCampaign
    },
    'Tropical Mega Battle Phone Cards' : {
      definition: require('../../resources/series/Tropical Mega Battle Phone Cards.json'),
      pictures: TropicalPhoneCards
    },
    'Pokémon Song Best Collection' : {
      definition: require('../../resources/series/Pokemon Song Best Collection.json'),
      pictures: PokemonSongBestCollection
    },
    'Pokemon Fan Club' : {
      definition: require('../../resources/series/Pokemon Fan Club.json'),
      pictures: PokemonFanClub
    },
    'Jumbo' : {
      definition: require('../../resources/series/Jumbo.json'),
      pictures: Jumbo
    },
    'Championship' : {
      definition: require('../../resources/series/Championship.json'),
      pictures: Championship
    },
    '1996' : {
      definition: require('../../resources/series/1996.json'),
      pictures: Year1996
    },
    '1997' : {
      definition: require('../../resources/series/1997.json'),
      pictures: Year1997
    },
    '1998' : {
      definition: require('../../resources/series/1998.json'),
      pictures: Year1998
    },
    '1999' : {
      definition: require('../../resources/series/1999.json'),
      pictures: Year1999
    },
    '2000' : {
      definition: require('../../resources/series/2000.json'),
      pictures: Year2000
    },
    '2001-2005' : {
      definition: require('../../resources/series/2001-2005.json'),
      pictures: Year20012005
    },
    'ANA-JR' : {
      definition: require('../../resources/series/ANA-JR.json'),
      pictures: AnaJR
    },
    'Championship' : {
      definition: require('../../resources/series/Championship.json'),
      pictures: Championship
    },
    'Pikachu Illustrator' : {
      definition: require('../../resources/series/Pikachu Illustrator.json'),
      pictures: PikachuIllustrator
    },
    'Base Expansion Pack' : {
      definition: require('../../resources/series/Base Expansion Pack.json'),
      pictures: BaseExpansionPack
    },
    'The Town on no Map' : {
      definition: require('../../resources/series/The Town on No Map.json'),
      pictures: TheTownonnoMap
    },
    'Wind from the Sea' : {
      definition: require('../../resources/series/Wind from the Sea.json'),
      pictures: WindfromtheSea
    },
    'Split Earth' : {
      definition: require('../../resources/series/Split Earth.json'),
      pictures: SplitEarth
    },
    'Mysterious Mountains' : {
      definition: require('../../resources/series/Mysterious Mountains.json'),
      pictures: MysteriousMountains
    },
    'Pokémon VS' : {
      definition: require('../../resources/series/Pokemon VS.json'),
      pictures: PokemonVS
    },
    'Pokémon Web' : {
      definition: require('../../resources/series/Pokemon Web.json'),
      pictures: PokemonWeb
    },
    'P Promotional cards' : {
      definition: require('../../resources/series/P Promotional cards.json'),
      pictures: PPromotionalCards
    },
    'T Promotional cards' : {
      definition: require('../../resources/series/T Promotional cards.json'),
      pictures: TPromotionalCards
    },
    'J Promotional cards' : {
      definition: require('../../resources/series/J Promotional cards.json'),
      pictures: JPromotionalCards
    },
    'McDonald\'s Original Minimum Pack' : {
      definition: require('../../resources/series/McDonald\'s Original Minimum Pack.json'),
      pictures: McDonaldsOriginalMinimumPack
    },
    'Pokémon-e Starter Deck' : {
      definition: require('../../resources/series/Pokemon-e Starter Deck.json'),
      pictures: PokemonEStarterDeck
    },
    'Tyranitar Half Deck' : {
      definition: require('../../resources/series/Tyranitar Half Deck.json'),
      pictures: TyranitarHalfDeck
    },
    'Theater Limited VS Pack' : {
      definition: require('../../resources/series/Theater Limited VS Pack.json'),
      pictures: TheaterLimitedVSPack
    },
    'Crossing the Ruins...' : {
      definition: require('../../resources/series/Crossing the Ruins.json'),
      pictures: CrossingtheRuins
    },
    'Awakening Legends' : {
      definition: require('../../resources/series/Awakening Legends.json'),
      pictures: AwakeningLegends
    },
    'Darkness, and to Light...' : {
      definition: require('../../resources/series/Darkness, and to Light.json'),
      pictures: DarknessandtoLight
    },
    'Gold, Silver, to a New World...' : {
      definition: require('../../resources/series/Gold, Silver, to a New World.json'),
      pictures: GoldSilvertoaNewWorld
    }
  };

export default SerieConfig
