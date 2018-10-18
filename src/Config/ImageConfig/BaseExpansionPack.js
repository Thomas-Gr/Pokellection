import React from 'react';
const BaseExpansionPack =
  {'DragonairExpedition75.jpg' : require('../../../resources/images/cards/DragonairExpedition75.jpg'),
'PoliwrathExpedition24.jpg' : require('../../../resources/images/cards/PoliwrathExpedition24.jpg'),
'MagbyExpedition17.jpg' : require('../../../resources/images/cards/MagbyExpedition17.jpg'),
'DiglettExpedition106.jpg' : require('../../../resources/images/cards/DiglettExpedition106.jpg'),
'DualBallExpedition139.jpg' : require('../../../resources/images/cards/DualBallExpedition139.jpg'),
'KinglerExpedition15.jpg' : require('../../../resources/images/cards/KinglerExpedition15.jpg'),
'MeganiumExpedition18.jpg' : require('../../../resources/images/cards/MeganiumExpedition18.jpg'),
'RapidashExpedition26.jpg' : require('../../../resources/images/cards/RapidashExpedition26.jpg'),
'BS92EnergyRemoval.jpg' : require('../../../resources/images/cards/BS92EnergyRemoval.jpg'),
'QwilfishExpedition127.jpg' : require('../../../resources/images/cards/QwilfishExpedition127.jpg'),
'GastlyExpedition109.jpg' : require('../../../resources/images/cards/GastlyExpedition109.jpg'),
'DratiniExpedition107.jpg' : require('../../../resources/images/cards/DratiniExpedition107.jpg'),
'WeezingExpedition32.jpg' : require('../../../resources/images/cards/WeezingExpedition32.jpg'),
'MetapodExpedition87.jpg' : require('../../../resources/images/cards/MetapodExpedition87.jpg'),
'MasterBallGymChallenge116.jpg' : require('../../../resources/images/cards/MasterBallGymChallenge116.jpg'),
'TaurosExpedition133.jpg' : require('../../../resources/images/cards/TaurosExpedition133.jpg'),
'BlastoiseExpedition4.jpg' : require('../../../resources/images/cards/BlastoiseExpedition4.jpg'),
'ProfessorOakResearchExpedition149.jpg' : require('../../../resources/images/cards/ProfessorOakResearchExpedition149.jpg'),
'ArbokExpedition3.jpg' : require('../../../resources/images/cards/ArbokExpedition3.jpg'),
'GloomExpedition78.jpg' : require('../../../resources/images/cards/GloomExpedition78.jpg'),
'FlaaffyExpedition77.jpg' : require('../../../resources/images/cards/FlaaffyExpedition77.jpg'),
'SkarmoryExpedition27.jpg' : require('../../../resources/images/cards/SkarmoryExpedition27.jpg'),
'EnergyRestoreMajesticDawn81.jpg' : require('../../../resources/images/cards/EnergyRestoreMajesticDawn81.jpg'),
'ShellderExpedition129.jpg' : require('../../../resources/images/cards/ShellderExpedition129.jpg'),
'OddishExpedition122.jpg' : require('../../../resources/images/cards/OddishExpedition122.jpg'),
'PokemonNurseExpedition145.jpg' : require('../../../resources/images/cards/PokemonNurseExpedition145.jpg'),
'CaterpieExpedition96.jpg' : require('../../../resources/images/cards/CaterpieExpedition96.jpg'),
'DugtrioExpedition10.jpg' : require('../../../resources/images/cards/DugtrioExpedition10.jpg'),
'KrabbyExpedition115.jpg' : require('../../../resources/images/cards/KrabbyExpedition115.jpg'),
'GolemExpedition14.jpg' : require('../../../resources/images/cards/GolemExpedition14.jpg'),
'FeraligatrExpedition12.jpg' : require('../../../resources/images/cards/FeraligatrExpedition12.jpg'),
'WarpPointEXUnseenForces93.jpg' : require('../../../resources/images/cards/WarpPointEXUnseenForces93.jpg'),
'CharizardExpedition6.jpg' : require('../../../resources/images/cards/CharizardExpedition6.jpg'),
'GoldeenExpedition111.jpg' : require('../../../resources/images/cards/GoldeenExpedition111.jpg'),
'AlakazamExpedition1.jpg' : require('../../../resources/images/cards/AlakazamExpedition1.jpg'),
'PikachuExpedition124.jpg' : require('../../../resources/images/cards/PikachuExpedition124.jpg'),
'VulpixExpedition136.jpg' : require('../../../resources/images/cards/VulpixExpedition136.jpg'),
'MareepExpedition119.jpg' : require('../../../resources/images/cards/MareepExpedition119.jpg'),
'RaichuExpedition25.jpg' : require('../../../resources/images/cards/RaichuExpedition25.jpg'),
'ClefableExpedition7.jpg' : require('../../../resources/images/cards/ClefableExpedition7.jpg'),
'GravelerExpedition79.jpg' : require('../../../resources/images/cards/GravelerExpedition79.jpg'),
'PoliwhirlExpedition89.jpg' : require('../../../resources/images/cards/PoliwhirlExpedition89.jpg'),
'MewExpedition19.jpg' : require('../../../resources/images/cards/MewExpedition19.jpg'),
'PichuExpedition22.jpg' : require('../../../resources/images/cards/PichuExpedition22.jpg'),
'PidgeottoExpedition88.jpg' : require('../../../resources/images/cards/PidgeottoExpedition88.jpg'),
'RattataExpedition128.jpg' : require('../../../resources/images/cards/RattataExpedition128.jpg'),
'HaunterExpedition80.jpg' : require('../../../resources/images/cards/HaunterExpedition80.jpg'),
'ButterfreeExpedition5.jpg' : require('../../../resources/images/cards/ButterfreeExpedition5.jpg'),
'CuboneExpedition103.jpg' : require('../../../resources/images/cards/CuboneExpedition103.jpg'),
'MachokeExpedition85.jpg' : require('../../../resources/images/cards/MachokeExpedition85.jpg'),
'VenusaurExpedition30.jpg' : require('../../../resources/images/cards/VenusaurExpedition30.jpg'),
'AmpharosExpedition2.jpg' : require('../../../resources/images/cards/AmpharosExpedition2.jpg'),
'MachampExpedition16.jpg' : require('../../../resources/images/cards/MachampExpedition16.jpg'),
'TyranitarExpedition29.jpg' : require('../../../resources/images/cards/TyranitarExpedition29.jpg'),
'MeowthExpedition121.jpg' : require('../../../resources/images/cards/MeowthExpedition121.jpg'),
'SuperScoopUpNeoGenesis98.jpg' : require('../../../resources/images/cards/SuperScoopUpNeoGenesis98.jpg'),
'PidgeyExpedition123.jpg' : require('../../../resources/images/cards/PidgeyExpedition123.jpg'),
'MagmarExpedition86.jpg' : require('../../../resources/images/cards/MagmarExpedition86.jpg'),
'TyphlosionExpedition28.jpg' : require('../../../resources/images/cards/TyphlosionExpedition28.jpg'),
'VileplumeExpedition31.jpg' : require('../../../resources/images/cards/VileplumeExpedition31.jpg'),
'MagikarpExpedition118.jpg' : require('../../../resources/images/cards/MagikarpExpedition118.jpg'),
'CloysterExpedition8.jpg' : require('../../../resources/images/cards/CloysterExpedition8.jpg'),
'SpearowExpedition130.jpg' : require('../../../resources/images/cards/SpearowExpedition130.jpg'),
'DragoniteExpedition9.jpg' : require('../../../resources/images/cards/DragoniteExpedition9.jpg'),
'MachopExpedition117.jpg' : require('../../../resources/images/cards/MachopExpedition117.jpg'),
'PokemonReversalExpedition146.jpg' : require('../../../resources/images/cards/PokemonReversalExpedition146.jpg'),
'NinetalesExpedition21.jpg' : require('../../../resources/images/cards/NinetalesExpedition21.jpg'),
'LarvitarExpedition116.jpg' : require('../../../resources/images/cards/LarvitarExpedition116.jpg'),
'EkansExpedition108.jpg' : require('../../../resources/images/cards/EkansExpedition108.jpg'),
'HoundourExpedition113.jpg' : require('../../../resources/images/cards/HoundourExpedition113.jpg'),
'PupitarEXDragonFrontiers58.jpg' : require('../../../resources/images/cards/PupitarEXDragonFrontiers58.jpg'),
'FearowExpedition11.jpg' : require('../../../resources/images/cards/FearowExpedition11.jpg'),
'PidgeotExpedition23.jpg' : require('../../../resources/images/cards/PidgeotExpedition23.jpg'),
'KoffingExpedition114.jpg' : require('../../../resources/images/cards/KoffingExpedition114.jpg'),
'CorsolaExpedition102.jpg' : require('../../../resources/images/cards/CorsolaExpedition102.jpg'),
'ProfessorElmTrainingMethodExpedition148.jpg' : require('../../../resources/images/cards/ProfessorElmTrainingMethodExpedition148.jpg'),
'MaryImpulseExpedition142.jpg' : require('../../../resources/images/cards/MaryImpulseExpedition142.jpg'),
'PonytaExpedition126.jpg' : require('../../../resources/images/cards/PonytaExpedition126.jpg'),
'ElectabuzzExpedition76.jpg' : require('../../../resources/images/cards/ElectabuzzExpedition76.jpg'),
'ChanseyExpedition72.jpg' : require('../../../resources/images/cards/ChanseyExpedition72.jpg'),
'PoliwagExpedition125.jpg' : require('../../../resources/images/cards/PoliwagExpedition125.jpg'),
'EnergyChargeNeoGenesis85.jpg' : require('../../../resources/images/cards/EnergyChargeNeoGenesis85.jpg'),
'HoppipExpedition112.jpg' : require('../../../resources/images/cards/HoppipExpedition112.jpg'),
'HitmonleeExpedition81.jpg' : require('../../../resources/images/cards/HitmonleeExpedition81.jpg'),
'BillMaintenanceExpedition137.jpg' : require('../../../resources/images/cards/BillMaintenanceExpedition137.jpg'),
'AbraExpedition93.jpg' : require('../../../resources/images/cards/AbraExpedition93.jpg'),
'ClefairyExpedition101.jpg' : require('../../../resources/images/cards/ClefairyExpedition101.jpg'),
'KadabraExpedition84.jpg' : require('../../../resources/images/cards/KadabraExpedition84.jpg'),
'MewtwoExpedition20.jpg' : require('../../../resources/images/cards/MewtwoExpedition20.jpg'),
'GeodudeExpedition110.jpg' : require('../../../resources/images/cards/GeodudeExpedition110.jpg'),
'GengarExpedition13.jpg' : require('../../../resources/images/cards/GengarExpedition13.jpg'),
'MarillExpedition120.jpg' : require('../../../resources/images/cards/MarillExpedition120.jpg'),
'MultiTechnicalMachine01Expedition144.jpg' : require('../../../resources/images/cards/MultiTechnicalMachine01Expedition144.jpg'),
'JynxExpedition83.jpg' : require('../../../resources/images/cards/JynxExpedition83.jpg'),
'CopycatEXTeamRocketReturns83.jpg' : require('../../../resources/images/cards/CopycatEXTeamRocketReturns83.jpg'),
'StrengthCharmExpedition150.jpg' : require('../../../resources/images/cards/StrengthCharmExpedition150.jpg')};
export default BaseExpansionPack