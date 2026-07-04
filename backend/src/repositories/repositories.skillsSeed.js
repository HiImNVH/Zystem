// backend/src/repositories/repositories.skillsSeed.js

const { dbPool } = require('./repositories.database');

const ALL_SKILLS = [
    {
        "job": "fighting",
        "branch": "melee",
        "code": "fighting_melee_brawler_i_lv10",
        "name": "Brawler I",
        "lv": 10,
        "sp": 1,
        "tier": 2,
        "desc": "Unlock Brawler I."
    },
    {
        "job": "fighting",
        "branch": "melee",
        "code": "fighting_melee_brawler_ii_lv20",
        "name": "Brawler II",
        "lv": 20,
        "sp": 2,
        "tier": 4,
        "desc": "Unlock Brawler II."
    },
    {
        "job": "fighting",
        "branch": "melee",
        "code": "fighting_melee_brawler_iii_lv30",
        "name": "Brawler III",
        "lv": 30,
        "sp": 3,
        "tier": 6,
        "desc": "Unlock Brawler III."
    },
    {
        "job": "fighting",
        "branch": "melee",
        "code": "fighting_melee_brawler_iv_lv40",
        "name": "Brawler IV",
        "lv": 40,
        "sp": 4,
        "tier": 8,
        "desc": "Unlock Brawler IV."
    },
    {
        "job": "fighting",
        "branch": "melee",
        "code": "fighting_melee_one_handed_i_lv10",
        "name": "One-handed I",
        "lv": 10,
        "sp": 1,
        "tier": 2,
        "desc": "Unlock One-handed I."
    },
    {
        "job": "fighting",
        "branch": "melee",
        "code": "fighting_melee_one_handed_ii_lv20",
        "name": "One-handed II",
        "lv": 20,
        "sp": 2,
        "tier": 4,
        "desc": "Unlock One-handed II."
    },
    {
        "job": "fighting",
        "branch": "melee",
        "code": "fighting_melee_one_handed_iii_lv30",
        "name": "One-handed III",
        "lv": 30,
        "sp": 3,
        "tier": 6,
        "desc": "Unlock One-handed III."
    },
    {
        "job": "fighting",
        "branch": "melee",
        "code": "fighting_melee_one_handed_iv_lv40",
        "name": "One-handed IV",
        "lv": 40,
        "sp": 4,
        "tier": 8,
        "desc": "Unlock One-handed IV."
    },
    {
        "job": "fighting",
        "branch": "melee",
        "code": "fighting_melee_two_handed_i_lv10",
        "name": "Two-handed I",
        "lv": 10,
        "sp": 1,
        "tier": 2,
        "desc": "Unlock Two-handed I."
    },
    {
        "job": "fighting",
        "branch": "melee",
        "code": "fighting_melee_two_handed_ii_lv20",
        "name": "Two-handed II",
        "lv": 20,
        "sp": 2,
        "tier": 4,
        "desc": "Unlock Two-handed II."
    },
    {
        "job": "fighting",
        "branch": "melee",
        "code": "fighting_melee_two_handed_iii_lv30",
        "name": "Two-handed III",
        "lv": 30,
        "sp": 3,
        "tier": 6,
        "desc": "Unlock Two-handed III."
    },
    {
        "job": "fighting",
        "branch": "melee",
        "code": "fighting_melee_two_handed_iv_lv40",
        "name": "Two-handed IV",
        "lv": 40,
        "sp": 4,
        "tier": 8,
        "desc": "Unlock Two-handed IV."
    },
    {
        "job": "fighting",
        "branch": "melee",
        "code": "fighting_melee_stab_lv5",
        "name": "Stab",
        "lv": 5,
        "sp": 0,
        "tier": 1,
        "desc": "Unlock Stab."
    },
    {
        "job": "fighting",
        "branch": "melee",
        "code": "fighting_melee_stab_damage_i_lv10",
        "name": "Stab: Damage I",
        "lv": 10,
        "sp": 1,
        "tier": 2,
        "desc": "Unlock Stab: Damage I."
    },
    {
        "job": "fighting",
        "branch": "melee",
        "code": "fighting_melee_stab_damage_ii_lv20",
        "name": "Stab: Damage II",
        "lv": 20,
        "sp": 2,
        "tier": 4,
        "desc": "Unlock Stab: Damage II."
    },
    {
        "job": "fighting",
        "branch": "melee",
        "code": "fighting_melee_stab_damage_iii_lv30",
        "name": "Stab: Damage III",
        "lv": 30,
        "sp": 3,
        "tier": 6,
        "desc": "Unlock Stab: Damage III."
    },
    {
        "job": "fighting",
        "branch": "melee",
        "code": "fighting_melee_stab_damage_iv_lv40",
        "name": "Stab: Damage IV",
        "lv": 40,
        "sp": 4,
        "tier": 8,
        "desc": "Unlock Stab: Damage IV."
    },
    {
        "job": "fighting",
        "branch": "melee",
        "code": "fighting_melee_swing_lv5",
        "name": "Swing",
        "lv": 5,
        "sp": 0,
        "tier": 1,
        "desc": "Unlock Swing."
    },
    {
        "job": "fighting",
        "branch": "melee",
        "code": "fighting_melee_swing_damage_i_lv10",
        "name": "Swing: Damage I",
        "lv": 10,
        "sp": 1,
        "tier": 2,
        "desc": "Unlock Swing: Damage I."
    },
    {
        "job": "fighting",
        "branch": "melee",
        "code": "fighting_melee_swing_damage_ii_lv20",
        "name": "Swing: Damage II",
        "lv": 20,
        "sp": 2,
        "tier": 4,
        "desc": "Unlock Swing: Damage II."
    },
    {
        "job": "fighting",
        "branch": "melee",
        "code": "fighting_melee_swing_damage_iii_lv30",
        "name": "Swing: Damage III",
        "lv": 30,
        "sp": 3,
        "tier": 6,
        "desc": "Unlock Swing: Damage III."
    },
    {
        "job": "fighting",
        "branch": "melee",
        "code": "fighting_melee_swing_damage_iv_lv40",
        "name": "Swing: Damage IV",
        "lv": 40,
        "sp": 4,
        "tier": 8,
        "desc": "Unlock Swing: Damage IV."
    },
    {
        "job": "fighting",
        "branch": "melee",
        "code": "fighting_melee_slash_lv5",
        "name": "Slash",
        "lv": 5,
        "sp": 0,
        "tier": 1,
        "desc": "Unlock Slash."
    },
    {
        "job": "fighting",
        "branch": "melee",
        "code": "fighting_melee_slash_damage_i_lv10",
        "name": "Slash: Damage I",
        "lv": 10,
        "sp": 1,
        "tier": 2,
        "desc": "Unlock Slash: Damage I."
    },
    {
        "job": "fighting",
        "branch": "melee",
        "code": "fighting_melee_slash_damage_ii_lv20",
        "name": "Slash: Damage II",
        "lv": 20,
        "sp": 2,
        "tier": 4,
        "desc": "Unlock Slash: Damage II."
    },
    {
        "job": "fighting",
        "branch": "melee",
        "code": "fighting_melee_slash_damage_iii_lv30",
        "name": "Slash: Damage III",
        "lv": 30,
        "sp": 3,
        "tier": 6,
        "desc": "Unlock Slash: Damage III."
    },
    {
        "job": "fighting",
        "branch": "melee",
        "code": "fighting_melee_slash_damage_iv_lv40",
        "name": "Slash: Damage IV",
        "lv": 40,
        "sp": 4,
        "tier": 8,
        "desc": "Unlock Slash: Damage IV."
    },
    {
        "job": "fighting",
        "branch": "ranged",
        "code": "fighting_ranged_shooter_i_lv10",
        "name": "Shooter I",
        "lv": 10,
        "sp": 1,
        "tier": 2,
        "desc": "Unlock Shooter I."
    },
    {
        "job": "fighting",
        "branch": "ranged",
        "code": "fighting_ranged_shooter_ii_lv20",
        "name": "Shooter II",
        "lv": 20,
        "sp": 2,
        "tier": 4,
        "desc": "Unlock Shooter II."
    },
    {
        "job": "fighting",
        "branch": "ranged",
        "code": "fighting_ranged_shooter_iii_lv30",
        "name": "Shooter III",
        "lv": 30,
        "sp": 3,
        "tier": 6,
        "desc": "Unlock Shooter III."
    },
    {
        "job": "fighting",
        "branch": "ranged",
        "code": "fighting_ranged_shooter_iv_lv40",
        "name": "Shooter IV",
        "lv": 40,
        "sp": 4,
        "tier": 8,
        "desc": "Unlock Shooter IV."
    },
    {
        "job": "fighting",
        "branch": "ranged",
        "code": "fighting_ranged_bow_and_crossbow_i_lv10",
        "name": "Bow and Crossbow I",
        "lv": 10,
        "sp": 1,
        "tier": 2,
        "desc": "Unlock Bow and Crossbow I."
    },
    {
        "job": "fighting",
        "branch": "ranged",
        "code": "fighting_ranged_bow_and_crossbow_ii_lv20",
        "name": "Bow and Crossbow II",
        "lv": 20,
        "sp": 2,
        "tier": 4,
        "desc": "Unlock Bow and Crossbow II."
    },
    {
        "job": "fighting",
        "branch": "ranged",
        "code": "fighting_ranged_bow_and_crossbow_iii_lv30",
        "name": "Bow and Crossbow III",
        "lv": 30,
        "sp": 3,
        "tier": 6,
        "desc": "Unlock Bow and Crossbow III."
    },
    {
        "job": "fighting",
        "branch": "ranged",
        "code": "fighting_ranged_bow_and_crossbow_iv_lv40",
        "name": "Bow and Crossbow IV",
        "lv": 40,
        "sp": 4,
        "tier": 8,
        "desc": "Unlock Bow and Crossbow IV."
    },
    {
        "job": "fighting",
        "branch": "ranged",
        "code": "fighting_ranged_gun_i_lv10",
        "name": "Gun I",
        "lv": 10,
        "sp": 1,
        "tier": 2,
        "desc": "Unlock Gun I."
    },
    {
        "job": "fighting",
        "branch": "ranged",
        "code": "fighting_ranged_gun_ii_lv20",
        "name": "Gun II",
        "lv": 20,
        "sp": 2,
        "tier": 4,
        "desc": "Unlock Gun II."
    },
    {
        "job": "fighting",
        "branch": "ranged",
        "code": "fighting_ranged_gun_iii_lv30",
        "name": "Gun III",
        "lv": 30,
        "sp": 3,
        "tier": 6,
        "desc": "Unlock Gun III."
    },
    {
        "job": "fighting",
        "branch": "ranged",
        "code": "fighting_ranged_gun_iv_lv40",
        "name": "Gun IV",
        "lv": 40,
        "sp": 4,
        "tier": 8,
        "desc": "Unlock Gun IV."
    },
    {
        "job": "fighting",
        "branch": "ranged",
        "code": "fighting_ranged_bullseye_lv5",
        "name": "Bullseye",
        "lv": 5,
        "sp": 0,
        "tier": 1,
        "desc": "Unlock Bullseye."
    },
    {
        "job": "fighting",
        "branch": "ranged",
        "code": "fighting_ranged_bullseye_damage_i_lv10",
        "name": "Bullseye: Damage I",
        "lv": 10,
        "sp": 1,
        "tier": 2,
        "desc": "Unlock Bullseye: Damage I."
    },
    {
        "job": "fighting",
        "branch": "ranged",
        "code": "fighting_ranged_bullseye_damage_ii_lv20",
        "name": "Bullseye: Damage II",
        "lv": 20,
        "sp": 2,
        "tier": 4,
        "desc": "Unlock Bullseye: Damage II."
    },
    {
        "job": "fighting",
        "branch": "ranged",
        "code": "fighting_ranged_bullseye_damage_iii_lv30",
        "name": "Bullseye: Damage III",
        "lv": 30,
        "sp": 3,
        "tier": 6,
        "desc": "Unlock Bullseye: Damage III."
    },
    {
        "job": "fighting",
        "branch": "ranged",
        "code": "fighting_ranged_bullseye_damage_iv_lv40",
        "name": "Bullseye: Damage IV",
        "lv": 40,
        "sp": 4,
        "tier": 8,
        "desc": "Unlock Bullseye: Damage IV."
    },
    {
        "job": "scavenging",
        "branch": "looter",
        "code": "scavenging_looter_carrier_i_lv10",
        "name": "Carrier I",
        "lv": 10,
        "sp": 1,
        "tier": 2,
        "desc": "Unlock Carrier I."
    },
    {
        "job": "scavenging",
        "branch": "looter",
        "code": "scavenging_looter_carrier_ii_lv20",
        "name": "Carrier II",
        "lv": 20,
        "sp": 2,
        "tier": 4,
        "desc": "Unlock Carrier II."
    },
    {
        "job": "scavenging",
        "branch": "looter",
        "code": "scavenging_looter_carrier_iii_lv30",
        "name": "Carrier III",
        "lv": 30,
        "sp": 3,
        "tier": 6,
        "desc": "Unlock Carrier III."
    },
    {
        "job": "scavenging",
        "branch": "looter",
        "code": "scavenging_looter_carrier_iv_lv40",
        "name": "Carrier IV",
        "lv": 40,
        "sp": 4,
        "tier": 8,
        "desc": "Unlock Carrier IV."
    },
    {
        "job": "scavenging",
        "branch": "looter",
        "code": "scavenging_looter_treasure_hunter_i_lv10",
        "name": "Treasure-hunter I",
        "lv": 10,
        "sp": 1,
        "tier": 2,
        "desc": "Unlock Treasure-hunter I."
    },
    {
        "job": "scavenging",
        "branch": "looter",
        "code": "scavenging_looter_treasure_hunter_ii_lv20",
        "name": "Treasure-hunter II",
        "lv": 20,
        "sp": 2,
        "tier": 4,
        "desc": "Unlock Treasure-hunter II."
    },
    {
        "job": "scavenging",
        "branch": "looter",
        "code": "scavenging_looter_treasure_hunter_iii_lv30",
        "name": "Treasure-hunter III",
        "lv": 30,
        "sp": 3,
        "tier": 6,
        "desc": "Unlock Treasure-hunter III."
    },
    {
        "job": "scavenging",
        "branch": "looter",
        "code": "scavenging_looter_treasure_hunter_iv_lv40",
        "name": "Treasure-hunter IV",
        "lv": 40,
        "sp": 4,
        "tier": 8,
        "desc": "Unlock Treasure-hunter IV."
    },
    {
        "job": "scavenging",
        "branch": "looter",
        "code": "scavenging_looter_quick_hand_i_lv10",
        "name": "Quick hand I",
        "lv": 10,
        "sp": 1,
        "tier": 2,
        "desc": "Unlock Quick hand I."
    },
    {
        "job": "scavenging",
        "branch": "looter",
        "code": "scavenging_looter_quick_hand_ii_lv30",
        "name": "Quick hand II",
        "lv": 30,
        "sp": 3,
        "tier": 6,
        "desc": "Unlock Quick hand II."
    },
    {
        "job": "cooking",
        "branch": "processing",
        "code": "cooking_processing_grinding_lv5",
        "name": "Grinding",
        "lv": 5,
        "sp": 1,
        "tier": 1,
        "desc": "Unlock Grinding."
    },
    {
        "job": "cooking",
        "branch": "processing",
        "code": "cooking_processing_drying_lv10",
        "name": "Drying",
        "lv": 10,
        "sp": 1,
        "tier": 2,
        "desc": "Unlock Drying."
    },
    {
        "job": "cooking",
        "branch": "processing",
        "code": "cooking_processing_charring_lv15",
        "name": "Charring",
        "lv": 15,
        "sp": 2,
        "tier": 3,
        "desc": "Unlock Charring."
    },
    {
        "job": "cooking",
        "branch": "processing",
        "code": "cooking_processing_smoking_lv20",
        "name": "Smoking",
        "lv": 20,
        "sp": 2,
        "tier": 4,
        "desc": "Unlock Smoking."
    },
    {
        "job": "cooking",
        "branch": "foods",
        "code": "cooking_foods_grilling_i_lv1",
        "name": "Grilling I",
        "lv": 1,
        "sp": 0,
        "tier": 1,
        "desc": "Unlock Grilling I."
    },
    {
        "job": "cooking",
        "branch": "foods",
        "code": "cooking_foods_grilling_ii_lv10",
        "name": "Grilling II",
        "lv": 10,
        "sp": 1,
        "tier": 2,
        "desc": "Unlock Grilling II."
    },
    {
        "job": "cooking",
        "branch": "foods",
        "code": "cooking_foods_grilling_iii_lv20",
        "name": "Grilling III",
        "lv": 20,
        "sp": 2,
        "tier": 4,
        "desc": "Unlock Grilling III."
    },
    {
        "job": "cooking",
        "branch": "foods",
        "code": "cooking_foods_grilling_iv_lv30",
        "name": "Grilling IV",
        "lv": 30,
        "sp": 3,
        "tier": 6,
        "desc": "Unlock Grilling IV."
    },
    {
        "job": "cooking",
        "branch": "foods",
        "code": "cooking_foods_frying_i_lv20",
        "name": "Frying I",
        "lv": 20,
        "sp": 3,
        "tier": 4,
        "desc": "Unlock Frying I."
    },
    {
        "job": "cooking",
        "branch": "foods",
        "code": "cooking_foods_frying_ii_lv30",
        "name": "Frying II",
        "lv": 30,
        "sp": 4,
        "tier": 6,
        "desc": "Unlock Frying II."
    },
    {
        "job": "cooking",
        "branch": "foods",
        "code": "cooking_foods_frying_iii_lv40",
        "name": "Frying III",
        "lv": 40,
        "sp": 5,
        "tier": 8,
        "desc": "Unlock Frying III."
    },
    {
        "job": "cooking",
        "branch": "foods",
        "code": "cooking_foods_boiling_i_lv1",
        "name": "Boiling I",
        "lv": 1,
        "sp": 0,
        "tier": 1,
        "desc": "Unlock Boiling I."
    },
    {
        "job": "cooking",
        "branch": "foods",
        "code": "cooking_foods_boiling_ii_lv10",
        "name": "Boiling II",
        "lv": 10,
        "sp": 1,
        "tier": 2,
        "desc": "Unlock Boiling II."
    },
    {
        "job": "cooking",
        "branch": "foods",
        "code": "cooking_foods_boiling_iii_lv20",
        "name": "Boiling III",
        "lv": 20,
        "sp": 2,
        "tier": 4,
        "desc": "Unlock Boiling III."
    },
    {
        "job": "cooking",
        "branch": "foods",
        "code": "cooking_foods_steaming_i_lv20",
        "name": "Steaming I",
        "lv": 20,
        "sp": 3,
        "tier": 4,
        "desc": "Unlock Steaming I."
    },
    {
        "job": "cooking",
        "branch": "foods",
        "code": "cooking_foods_steaming_ii_lv30",
        "name": "Steaming II",
        "lv": 30,
        "sp": 4,
        "tier": 6,
        "desc": "Unlock Steaming II."
    },
    {
        "job": "cooking",
        "branch": "foods",
        "code": "cooking_foods_steaming_iii_lv40",
        "name": "Steaming III",
        "lv": 40,
        "sp": 5,
        "tier": 8,
        "desc": "Unlock Steaming III."
    },
    {
        "job": "cooking",
        "branch": "foods",
        "code": "cooking_foods_noodle_lv10",
        "name": "Noodle",
        "lv": 10,
        "sp": 2,
        "tier": 2,
        "desc": "Unlock Noodle."
    },
    {
        "job": "cooking",
        "branch": "foods",
        "code": "cooking_foods_bread_lv15",
        "name": "Bread",
        "lv": 15,
        "sp": 3,
        "tier": 3,
        "desc": "Unlock Bread."
    },
    {
        "job": "cooking",
        "branch": "foods",
        "code": "cooking_foods_burger_lv20",
        "name": "Burger",
        "lv": 20,
        "sp": 3,
        "tier": 4,
        "desc": "Unlock Burger."
    },
    {
        "job": "cooking",
        "branch": "foods",
        "code": "cooking_foods_sandwich_lv25",
        "name": "Sandwich",
        "lv": 25,
        "sp": 4,
        "tier": 5,
        "desc": "Unlock Sandwich."
    },
    {
        "job": "cooking",
        "branch": "foods",
        "code": "cooking_foods_pizza_lv30",
        "name": "Pizza",
        "lv": 30,
        "sp": 4,
        "tier": 6,
        "desc": "Unlock Pizza."
    },
    {
        "job": "cooking",
        "branch": "foods",
        "code": "cooking_foods_cake_lv35",
        "name": "Cake",
        "lv": 35,
        "sp": 4,
        "tier": 7,
        "desc": "Unlock Cake."
    },
    {
        "job": "cooking",
        "branch": "foods",
        "code": "cooking_foods_ramen_lv40",
        "name": "Ramen",
        "lv": 40,
        "sp": 5,
        "tier": 8,
        "desc": "Unlock Ramen."
    },
    {
        "job": "cooking",
        "branch": "foods",
        "code": "cooking_foods_canned_food_i_lv20",
        "name": "Canned food I",
        "lv": 20,
        "sp": 2,
        "tier": 4,
        "desc": "Unlock Canned food I."
    },
    {
        "job": "cooking",
        "branch": "foods",
        "code": "cooking_foods_canned_food_ii_lv40",
        "name": "Canned food II",
        "lv": 40,
        "sp": 4,
        "tier": 8,
        "desc": "Unlock Canned food II."
    },
    {
        "job": "cooking",
        "branch": "drinks",
        "code": "cooking_drinks_contaminated_water_lv1",
        "name": "Contaminated water",
        "lv": 1,
        "sp": 0,
        "tier": 1,
        "desc": "Unlock Contaminated water."
    },
    {
        "job": "cooking",
        "branch": "drinks",
        "code": "cooking_drinks_warter_lv10",
        "name": "Warter",
        "lv": 10,
        "sp": 2,
        "tier": 2,
        "desc": "Unlock Warter."
    },
    {
        "job": "cooking",
        "branch": "drinks",
        "code": "cooking_drinks_mineral_water_lv20",
        "name": "Mineral water",
        "lv": 20,
        "sp": 3,
        "tier": 4,
        "desc": "Unlock Mineral water."
    },
    {
        "job": "cooking",
        "branch": "drinks",
        "code": "cooking_drinks_juice_lv20",
        "name": "Juice",
        "lv": 20,
        "sp": 2,
        "tier": 4,
        "desc": "Unlock Juice."
    },
    {
        "job": "cooking",
        "branch": "drinks",
        "code": "cooking_drinks_smoothie_lv40",
        "name": "Smoothie",
        "lv": 40,
        "sp": 4,
        "tier": 8,
        "desc": "Unlock Smoothie."
    },
    {
        "job": "cooking",
        "branch": "drinks",
        "code": "cooking_drinks_coffe_lv15",
        "name": "Coffe",
        "lv": 15,
        "sp": 1,
        "tier": 3,
        "desc": "Unlock Coffe."
    },
    {
        "job": "cooking",
        "branch": "drinks",
        "code": "cooking_drinks_alcohol_i_lv15",
        "name": "Alcohol I",
        "lv": 15,
        "sp": 1,
        "tier": 3,
        "desc": "Unlock Alcohol I."
    },
    {
        "job": "cooking",
        "branch": "drinks",
        "code": "cooking_drinks_alcohol_ii_lv40",
        "name": "Alcohol II",
        "lv": 40,
        "sp": 4,
        "tier": 8,
        "desc": "Unlock Alcohol II."
    },
    {
        "job": "cooking",
        "branch": "spices",
        "code": "cooking_spices_salt_lv5",
        "name": "Salt",
        "lv": 5,
        "sp": 1,
        "tier": 1,
        "desc": "Unlock Salt."
    },
    {
        "job": "cooking",
        "branch": "spices",
        "code": "cooking_spices_sugar_lv10",
        "name": "Sugar",
        "lv": 10,
        "sp": 2,
        "tier": 2,
        "desc": "Unlock Sugar."
    },
    {
        "job": "cooking",
        "branch": "spices",
        "code": "cooking_spices_vinegar_lv15",
        "name": "Vinegar",
        "lv": 15,
        "sp": 2,
        "tier": 3,
        "desc": "Unlock Vinegar."
    },
    {
        "job": "cooking",
        "branch": "spices",
        "code": "cooking_spices_soysauce_lv20",
        "name": "Soysauce",
        "lv": 20,
        "sp": 3,
        "tier": 4,
        "desc": "Unlock Soysauce."
    },
    {
        "job": "cooking",
        "branch": "spices",
        "code": "cooking_spices_yeast_lv10",
        "name": "Yeast",
        "lv": 10,
        "sp": 2,
        "tier": 2,
        "desc": "Unlock Yeast."
    },
    {
        "job": "cooking",
        "branch": "spices",
        "code": "cooking_spices_butter_lv15",
        "name": "Butter",
        "lv": 15,
        "sp": 2,
        "tier": 3,
        "desc": "Unlock Butter."
    },
    {
        "job": "cooking",
        "branch": "spices",
        "code": "cooking_spices_cheese_lv20",
        "name": "Cheese",
        "lv": 20,
        "sp": 3,
        "tier": 4,
        "desc": "Unlock Cheese."
    },
    {
        "job": "cooking",
        "branch": "spices",
        "code": "cooking_spices_fat_lv20",
        "name": "Fat",
        "lv": 20,
        "sp": 1,
        "tier": 4,
        "desc": "Unlock Fat."
    },
    {
        "job": "cooking",
        "branch": "spices",
        "code": "cooking_spices_veg_oil_lv30",
        "name": "Veg. Oil",
        "lv": 30,
        "sp": 2,
        "tier": 6,
        "desc": "Unlock Veg. Oil."
    },
    {
        "job": "cooking",
        "branch": "medicines",
        "code": "cooking_medicines_medicine_i_lv20",
        "name": "Medicine I",
        "lv": 20,
        "sp": 2,
        "tier": 4,
        "desc": "Unlock Medicine I."
    },
    {
        "job": "cooking",
        "branch": "medicines",
        "code": "cooking_medicines_medicine_ii_lv40",
        "name": "Medicine II",
        "lv": 40,
        "sp": 4,
        "tier": 8,
        "desc": "Unlock Medicine II."
    },
    {
        "job": "cooking",
        "branch": "medicines",
        "code": "cooking_medicines_booster_i_lv20",
        "name": "Booster I",
        "lv": 20,
        "sp": 2,
        "tier": 4,
        "desc": "Unlock Booster I."
    },
    {
        "job": "cooking",
        "branch": "medicines",
        "code": "cooking_medicines_booster_ii_lv40",
        "name": "Booster II",
        "lv": 40,
        "sp": 4,
        "tier": 8,
        "desc": "Unlock Booster II."
    },
    {
        "job": "cooking",
        "branch": "medicines",
        "code": "cooking_medicines_bandage_lv10",
        "name": "Bandage",
        "lv": 10,
        "sp": 1,
        "tier": 2,
        "desc": "Unlock Bandage."
    },
    {
        "job": "cooking",
        "branch": "medicines",
        "code": "cooking_medicines_first_aid_kit_lv40",
        "name": "First aid Kit",
        "lv": 40,
        "sp": 4,
        "tier": 8,
        "desc": "Unlock First aid Kit."
    },
    {
        "job": "gathering",
        "branch": "foraging",
        "code": "gathering_foraging_seed_i_lv10",
        "name": "Seed I",
        "lv": 10,
        "sp": 1,
        "tier": 2,
        "desc": "Unlock Seed I."
    },
    {
        "job": "gathering",
        "branch": "foraging",
        "code": "gathering_foraging_seed_ii_lv20",
        "name": "Seed II",
        "lv": 20,
        "sp": 2,
        "tier": 4,
        "desc": "Unlock Seed II."
    },
    {
        "job": "gathering",
        "branch": "foraging",
        "code": "gathering_foraging_seed_iii_lv30",
        "name": "Seed III",
        "lv": 30,
        "sp": 3,
        "tier": 6,
        "desc": "Unlock Seed III."
    },
    {
        "job": "gathering",
        "branch": "foraging",
        "code": "gathering_foraging_seed_iv_lv40",
        "name": "Seed IV",
        "lv": 40,
        "sp": 4,
        "tier": 8,
        "desc": "Unlock Seed IV."
    },
    {
        "job": "gathering",
        "branch": "foraging",
        "code": "gathering_foraging_foraging_i_lv1",
        "name": "Foraging I",
        "lv": 1,
        "sp": 0,
        "tier": 1,
        "desc": "Unlock Foraging I."
    },
    {
        "job": "gathering",
        "branch": "foraging",
        "code": "gathering_foraging_foraging_ii_lv20",
        "name": "Foraging II",
        "lv": 20,
        "sp": 2,
        "tier": 4,
        "desc": "Unlock Foraging II."
    },
    {
        "job": "gathering",
        "branch": "foraging",
        "code": "gathering_foraging_foraging_iii_lv30",
        "name": "Foraging III",
        "lv": 30,
        "sp": 3,
        "tier": 6,
        "desc": "Unlock Foraging III."
    },
    {
        "job": "gathering",
        "branch": "woods",
        "code": "gathering_woods_wood_i_lv1",
        "name": "Wood I",
        "lv": 1,
        "sp": 0,
        "tier": 1,
        "desc": "Unlock Wood I."
    },
    {
        "job": "gathering",
        "branch": "woods",
        "code": "gathering_woods_wood_ii_lv20",
        "name": "Wood II",
        "lv": 20,
        "sp": 2,
        "tier": 4,
        "desc": "Unlock Wood II."
    },
    {
        "job": "gathering",
        "branch": "woods",
        "code": "gathering_woods_wood_iii_lv40",
        "name": "Wood III",
        "lv": 40,
        "sp": 4,
        "tier": 8,
        "desc": "Unlock Wood III."
    },
    {
        "job": "gathering",
        "branch": "minerals",
        "code": "gathering_minerals_rock_i_lv1",
        "name": "Rock I",
        "lv": 1,
        "sp": 0,
        "tier": 1,
        "desc": "Unlock Rock I."
    },
    {
        "job": "gathering",
        "branch": "minerals",
        "code": "gathering_minerals_rock_ii_lv20",
        "name": "Rock II",
        "lv": 20,
        "sp": 2,
        "tier": 4,
        "desc": "Unlock Rock II."
    },
    {
        "job": "gathering",
        "branch": "minerals",
        "code": "gathering_minerals_amethys_lv40",
        "name": "Amethys",
        "lv": 40,
        "sp": 5,
        "tier": 8,
        "desc": "Unlock Amethys."
    },
    {
        "job": "gathering",
        "branch": "minerals",
        "code": "gathering_minerals_ore_i_lv10",
        "name": "Ore I",
        "lv": 10,
        "sp": 2,
        "tier": 2,
        "desc": "Unlock Ore I."
    },
    {
        "job": "gathering",
        "branch": "minerals",
        "code": "gathering_minerals_ore_ii_lv20",
        "name": "Ore II",
        "lv": 20,
        "sp": 3,
        "tier": 4,
        "desc": "Unlock Ore II."
    },
    {
        "job": "gathering",
        "branch": "minerals",
        "code": "gathering_minerals_ore_iii_lv30",
        "name": "Ore III",
        "lv": 30,
        "sp": 4,
        "tier": 6,
        "desc": "Unlock Ore III."
    },
    {
        "job": "gathering",
        "branch": "minerals",
        "code": "gathering_minerals_ore_iv_lv40",
        "name": "Ore IV",
        "lv": 40,
        "sp": 5,
        "tier": 8,
        "desc": "Unlock Ore IV."
    },
    {
        "job": "gathering",
        "branch": "minerals",
        "code": "gathering_minerals_chemical_minerals_lv25",
        "name": "Chemical Minerals",
        "lv": 25,
        "sp": 3,
        "tier": 5,
        "desc": "Unlock Chemical Minerals."
    },
    {
        "job": "gathering",
        "branch": "hunting",
        "code": "gathering_hunting_meat_lv1",
        "name": "Meat",
        "lv": 1,
        "sp": 0,
        "tier": 1,
        "desc": "Unlock Meat."
    },
    {
        "job": "gathering",
        "branch": "hunting",
        "code": "gathering_hunting_bone_i_lv5",
        "name": "Bone I",
        "lv": 5,
        "sp": 1,
        "tier": 1,
        "desc": "Unlock Bone I."
    },
    {
        "job": "gathering",
        "branch": "hunting",
        "code": "gathering_hunting_bone_ii_lv15",
        "name": "Bone II",
        "lv": 15,
        "sp": 2,
        "tier": 3,
        "desc": "Unlock Bone II."
    },
    {
        "job": "gathering",
        "branch": "hunting",
        "code": "gathering_hunting_leather_i_lv10",
        "name": "Leather I",
        "lv": 10,
        "sp": 1,
        "tier": 2,
        "desc": "Unlock Leather I."
    },
    {
        "job": "gathering",
        "branch": "hunting",
        "code": "gathering_hunting_leather_ii_lv20",
        "name": "Leather II",
        "lv": 20,
        "sp": 2,
        "tier": 4,
        "desc": "Unlock Leather II."
    },
    {
        "job": "crafting",
        "branch": "refining",
        "code": "crafting_refining_smelting_i_lv1",
        "name": "Smelting I",
        "lv": 1,
        "sp": 1,
        "tier": 1,
        "desc": "Unlock Smelting I."
    },
    {
        "job": "crafting",
        "branch": "refining",
        "code": "crafting_refining_salvage_processing_lv15",
        "name": "Salvage Processing",
        "lv": 15,
        "sp": 1,
        "tier": 3,
        "desc": "Unlock Salvage Processing."
    },
    {
        "job": "crafting",
        "branch": "refining",
        "code": "crafting_refining_smelting_ii_lv25",
        "name": "Smelting II",
        "lv": 25,
        "sp": 3,
        "tier": 5,
        "desc": "Unlock Smelting II."
    },
    {
        "job": "crafting",
        "branch": "tool",
        "code": "crafting_tool_tool_i_lv1",
        "name": "Tool I",
        "lv": 1,
        "sp": 0,
        "tier": 1,
        "desc": "Unlock Tool I."
    },
    {
        "job": "crafting",
        "branch": "tool",
        "code": "crafting_tool_tool_ii_lv10",
        "name": "Tool II",
        "lv": 10,
        "sp": 1,
        "tier": 2,
        "desc": "Unlock Tool II."
    },
    {
        "job": "crafting",
        "branch": "tool",
        "code": "crafting_tool_tool_iii_lv20",
        "name": "Tool III",
        "lv": 20,
        "sp": 2,
        "tier": 4,
        "desc": "Unlock Tool III."
    },
    {
        "job": "crafting",
        "branch": "tool",
        "code": "crafting_tool_tool_iv_lv40",
        "name": "Tool IV",
        "lv": 40,
        "sp": 3,
        "tier": 8,
        "desc": "Unlock Tool IV."
    },
    {
        "job": "crafting",
        "branch": "tool",
        "code": "crafting_tool_cooking_tool_i_lv10",
        "name": "Cooking tool I",
        "lv": 10,
        "sp": 1,
        "tier": 2,
        "desc": "Unlock Cooking tool I."
    },
    {
        "job": "crafting",
        "branch": "tool",
        "code": "crafting_tool_cooking_tool_ii_lv20",
        "name": "Cooking tool II",
        "lv": 20,
        "sp": 2,
        "tier": 4,
        "desc": "Unlock Cooking tool II."
    },
    {
        "job": "crafting",
        "branch": "tool",
        "code": "crafting_tool_cooking_tool_iii_lv40",
        "name": "Cooking tool III",
        "lv": 40,
        "sp": 4,
        "tier": 8,
        "desc": "Unlock Cooking tool III."
    },
    {
        "job": "crafting",
        "branch": "tool",
        "code": "crafting_tool_building_tool_i_lv10",
        "name": "Building tool I",
        "lv": 10,
        "sp": 1,
        "tier": 2,
        "desc": "Unlock Building tool I."
    },
    {
        "job": "crafting",
        "branch": "tool",
        "code": "crafting_tool_building_tool_ii_lv20",
        "name": "Building tool II",
        "lv": 20,
        "sp": 2,
        "tier": 4,
        "desc": "Unlock Building tool II."
    },
    {
        "job": "crafting",
        "branch": "tool",
        "code": "crafting_tool_building_tool_iii_lv40",
        "name": "Building tool III",
        "lv": 40,
        "sp": 4,
        "tier": 8,
        "desc": "Unlock Building tool III."
    },
    {
        "job": "crafting",
        "branch": "weapon",
        "code": "crafting_weapon_stone_weapon_lv1",
        "name": "Stone weapon",
        "lv": 1,
        "sp": 0,
        "tier": 1,
        "desc": "Unlock Stone weapon."
    },
    {
        "job": "crafting",
        "branch": "weapon",
        "code": "crafting_weapon_bone_weapon_lv20",
        "name": "Bone weapon",
        "lv": 20,
        "sp": 2,
        "tier": 4,
        "desc": "Unlock Bone weapon."
    },
    {
        "job": "crafting",
        "branch": "weapon",
        "code": "crafting_weapon_metal_weapon_lv40",
        "name": "Metal weapon",
        "lv": 40,
        "sp": 5,
        "tier": 8,
        "desc": "Unlock Metal weapon."
    },
    {
        "job": "crafting",
        "branch": "weapon",
        "code": "crafting_weapon_bow_lv1",
        "name": "Bow",
        "lv": 1,
        "sp": 0,
        "tier": 1,
        "desc": "Unlock Bow."
    },
    {
        "job": "crafting",
        "branch": "weapon",
        "code": "crafting_weapon_crossbow_lv20",
        "name": "Crossbow",
        "lv": 20,
        "sp": 2,
        "tier": 4,
        "desc": "Unlock Crossbow."
    },
    {
        "job": "crafting",
        "branch": "weapon",
        "code": "crafting_weapon_inproved_bow_lv30",
        "name": "Inproved bow",
        "lv": 30,
        "sp": 4,
        "tier": 6,
        "desc": "Unlock Inproved bow."
    },
    {
        "job": "crafting",
        "branch": "weapon",
        "code": "crafting_weapon_improved_crossbow_lv40",
        "name": "Improved crossbow",
        "lv": 40,
        "sp": 5,
        "tier": 8,
        "desc": "Unlock Improved crossbow."
    },
    {
        "job": "crafting",
        "branch": "weapon",
        "code": "crafting_weapon_gun_i_lv20",
        "name": "Gun I",
        "lv": 20,
        "sp": 3,
        "tier": 4,
        "desc": "Unlock Gun I."
    },
    {
        "job": "crafting",
        "branch": "weapon",
        "code": "crafting_weapon_gun_ii_lv30",
        "name": "Gun II",
        "lv": 30,
        "sp": 4,
        "tier": 6,
        "desc": "Unlock Gun II."
    },
    {
        "job": "crafting",
        "branch": "weapon",
        "code": "crafting_weapon_gun_iii_lv40",
        "name": "Gun III",
        "lv": 40,
        "sp": 5,
        "tier": 8,
        "desc": "Unlock Gun III."
    },
    {
        "job": "crafting",
        "branch": "ammo",
        "code": "crafting_ammo_arrow_i_lv1",
        "name": "Arrow I",
        "lv": 1,
        "sp": 0,
        "tier": 1,
        "desc": "Unlock Arrow I."
    },
    {
        "job": "crafting",
        "branch": "ammo",
        "code": "crafting_ammo_arrow_ii_lv20",
        "name": "Arrow II",
        "lv": 20,
        "sp": 2,
        "tier": 4,
        "desc": "Unlock Arrow II."
    },
    {
        "job": "crafting",
        "branch": "ammo",
        "code": "crafting_ammo_arrow_iii_lv40",
        "name": "Arrow III",
        "lv": 40,
        "sp": 3,
        "tier": 8,
        "desc": "Unlock Arrow III."
    },
    {
        "job": "crafting",
        "branch": "ammo",
        "code": "crafting_ammo_gunpowder_lv10",
        "name": "Gunpowder",
        "lv": 10,
        "sp": 1,
        "tier": 2,
        "desc": "Unlock Gunpowder."
    },
    {
        "job": "crafting",
        "branch": "ammo",
        "code": "crafting_ammo_ammo_i_lv20",
        "name": "Ammo I",
        "lv": 20,
        "sp": 2,
        "tier": 4,
        "desc": "Unlock Ammo I."
    },
    {
        "job": "crafting",
        "branch": "ammo",
        "code": "crafting_ammo_ammo_ii_lv40",
        "name": "Ammo II",
        "lv": 40,
        "sp": 4,
        "tier": 8,
        "desc": "Unlock Ammo II."
    },
    {
        "job": "crafting",
        "branch": "armor_and_clothes",
        "code": "crafting_armor_and_clothes_armor_i_lv1",
        "name": "Armor I",
        "lv": 1,
        "sp": 0,
        "tier": 1,
        "desc": "Unlock Armor I."
    },
    {
        "job": "crafting",
        "branch": "armor_and_clothes",
        "code": "crafting_armor_and_clothes_armor_ii_lv10",
        "name": "Armor II",
        "lv": 10,
        "sp": 1,
        "tier": 2,
        "desc": "Unlock Armor II."
    },
    {
        "job": "crafting",
        "branch": "armor_and_clothes",
        "code": "crafting_armor_and_clothes_armor_iii_lv20",
        "name": "Armor III",
        "lv": 20,
        "sp": 2,
        "tier": 4,
        "desc": "Unlock Armor III."
    },
    {
        "job": "crafting",
        "branch": "armor_and_clothes",
        "code": "crafting_armor_and_clothes_armor_iv_lv40",
        "name": "Armor IV",
        "lv": 40,
        "sp": 4,
        "tier": 8,
        "desc": "Unlock Armor IV."
    },
    {
        "job": "crafting",
        "branch": "armor_and_clothes",
        "code": "crafting_armor_and_clothes_cooking_clothes_i_lv20",
        "name": "Cooking clothes I",
        "lv": 20,
        "sp": 2,
        "tier": 4,
        "desc": "Unlock Cooking clothes I."
    },
    {
        "job": "crafting",
        "branch": "armor_and_clothes",
        "code": "crafting_armor_and_clothes_cooking_clothes_ii_lv40",
        "name": "Cooking clothes II",
        "lv": 40,
        "sp": 4,
        "tier": 8,
        "desc": "Unlock Cooking clothes II."
    },
    {
        "job": "crafting",
        "branch": "armor_and_clothes",
        "code": "crafting_armor_and_clothes_building_clothes_i_lv20",
        "name": "Building clothes I",
        "lv": 20,
        "sp": 2,
        "tier": 4,
        "desc": "Unlock Building clothes I."
    },
    {
        "job": "crafting",
        "branch": "armor_and_clothes",
        "code": "crafting_armor_and_clothes_building_clothes_ii_lv4",
        "name": "Building clothes II",
        "lv": 40,
        "sp": 4,
        "tier": 8,
        "desc": "Unlock Building clothes II."
    },
    {
        "job": "crafting",
        "branch": "armor_and_clothes",
        "code": "crafting_armor_and_clothes_gathering_clothes_i_lv2",
        "name": "Gathering clothes I",
        "lv": 20,
        "sp": 2,
        "tier": 4,
        "desc": "Unlock Gathering clothes I."
    },
    {
        "job": "crafting",
        "branch": "armor_and_clothes",
        "code": "crafting_armor_and_clothes_gathering_clothes_ii_lv",
        "name": "Gathering clothes II",
        "lv": 40,
        "sp": 4,
        "tier": 8,
        "desc": "Unlock Gathering clothes II."
    },
    {
        "job": "crafting",
        "branch": "armor_and_clothes",
        "code": "crafting_armor_and_clothes_scaving_clothes_i_lv20",
        "name": "Scaving clothes I",
        "lv": 20,
        "sp": 2,
        "tier": 4,
        "desc": "Unlock Scaving clothes I."
    },
    {
        "job": "crafting",
        "branch": "armor_and_clothes",
        "code": "crafting_armor_and_clothes_scaving_clothes_ii_lv40",
        "name": "Scaving clothes II",
        "lv": 40,
        "sp": 4,
        "tier": 8,
        "desc": "Unlock Scaving clothes II."
    },
    {
        "job": "crafting",
        "branch": "armor_and_clothes",
        "code": "crafting_armor_and_clothes_crafting_clothes_i_lv20",
        "name": "Crafting clothes I",
        "lv": 20,
        "sp": 2,
        "tier": 4,
        "desc": "Unlock Crafting clothes I."
    },
    {
        "job": "crafting",
        "branch": "armor_and_clothes",
        "code": "crafting_armor_and_clothes_crafting_clothes_ii_lv4",
        "name": "Crafting clothes II",
        "lv": 40,
        "sp": 4,
        "tier": 8,
        "desc": "Unlock Crafting clothes II."
    },
    {
        "job": "crafting",
        "branch": "armor_and_clothes",
        "code": "crafting_armor_and_clothes_backpack_i_lv10",
        "name": "Backpack I",
        "lv": 10,
        "sp": 2,
        "tier": 2,
        "desc": "Unlock Backpack I."
    },
    {
        "job": "crafting",
        "branch": "armor_and_clothes",
        "code": "crafting_armor_and_clothes_backpack_ii_lv20",
        "name": "Backpack II",
        "lv": 20,
        "sp": 3,
        "tier": 4,
        "desc": "Unlock Backpack II."
    },
    {
        "job": "crafting",
        "branch": "armor_and_clothes",
        "code": "crafting_armor_and_clothes_backpack_iii_lv30",
        "name": "Backpack III",
        "lv": 30,
        "sp": 4,
        "tier": 6,
        "desc": "Unlock Backpack III."
    },
    {
        "job": "crafting",
        "branch": "armor_and_clothes",
        "code": "crafting_armor_and_clothes_backpack_iv_lv40",
        "name": "Backpack IV",
        "lv": 40,
        "sp": 5,
        "tier": 8,
        "desc": "Unlock Backpack IV."
    },
    {
        "job": "building",
        "branch": "funiture",
        "code": "building_funiture_tent_lv1",
        "name": "Tent",
        "lv": 1,
        "sp": 0,
        "tier": 1,
        "desc": "Unlock Tent."
    },
    {
        "job": "building",
        "branch": "funiture",
        "code": "building_funiture_bed_i_lv10",
        "name": "Bed I",
        "lv": 10,
        "sp": 1,
        "tier": 2,
        "desc": "Unlock Bed I."
    },
    {
        "job": "building",
        "branch": "funiture",
        "code": "building_funiture_bed_ii_lv30",
        "name": "Bed II",
        "lv": 30,
        "sp": 2,
        "tier": 6,
        "desc": "Unlock Bed II."
    },
    {
        "job": "building",
        "branch": "funiture",
        "code": "building_funiture_container_i_lv5",
        "name": "Container I",
        "lv": 5,
        "sp": 0,
        "tier": 1,
        "desc": "Unlock Container I."
    },
    {
        "job": "building",
        "branch": "funiture",
        "code": "building_funiture_container_ii_lv10",
        "name": "Container II",
        "lv": 10,
        "sp": 1,
        "tier": 2,
        "desc": "Unlock Container II."
    },
    {
        "job": "building",
        "branch": "funiture",
        "code": "building_funiture_container_iii_lv30",
        "name": "Container III",
        "lv": 30,
        "sp": 2,
        "tier": 6,
        "desc": "Unlock Container III."
    },
    {
        "job": "building",
        "branch": "funiture",
        "code": "building_funiture_container_iv_lv40",
        "name": "Container IV",
        "lv": 40,
        "sp": 3,
        "tier": 8,
        "desc": "Unlock Container IV."
    },
    {
        "job": "building",
        "branch": "funiture",
        "code": "building_funiture_funiture_set_i_lv10",
        "name": "Funiture set I",
        "lv": 10,
        "sp": 2,
        "tier": 2,
        "desc": "Unlock Funiture set I."
    },
    {
        "job": "building",
        "branch": "funiture",
        "code": "building_funiture_funiture_set_ii_lv30",
        "name": "Funiture set II",
        "lv": 30,
        "sp": 4,
        "tier": 6,
        "desc": "Unlock Funiture set II."
    },
    {
        "job": "building",
        "branch": "workbench",
        "code": "building_workbench_campfire_lv1",
        "name": "Campfire",
        "lv": 1,
        "sp": 0,
        "tier": 1,
        "desc": "Unlock Campfire."
    },
    {
        "job": "building",
        "branch": "workbench",
        "code": "building_workbench_kitchen_i_lv10",
        "name": "Kitchen I",
        "lv": 10,
        "sp": 2,
        "tier": 2,
        "desc": "Unlock Kitchen I."
    },
    {
        "job": "building",
        "branch": "workbench",
        "code": "building_workbench_kitchen_ii_lv30",
        "name": "Kitchen II",
        "lv": 30,
        "sp": 4,
        "tier": 6,
        "desc": "Unlock Kitchen II."
    },
    {
        "job": "building",
        "branch": "workbench",
        "code": "building_workbench_workstation_i_lv5",
        "name": "Workstation I",
        "lv": 5,
        "sp": 0,
        "tier": 1,
        "desc": "Unlock Workstation I."
    },
    {
        "job": "building",
        "branch": "workbench",
        "code": "building_workbench_workstation_ii_lv20",
        "name": "Workstation II",
        "lv": 20,
        "sp": 2,
        "tier": 4,
        "desc": "Unlock Workstation II."
    },
    {
        "job": "building",
        "branch": "workbench",
        "code": "building_workbench_workstation_iii_lv40",
        "name": "Workstation III",
        "lv": 40,
        "sp": 4,
        "tier": 8,
        "desc": "Unlock Workstation III."
    },
    {
        "job": "building",
        "branch": "workbench",
        "code": "building_workbench_medical_lab_i_lv20",
        "name": "Medical lab I",
        "lv": 20,
        "sp": 2,
        "tier": 4,
        "desc": "Unlock Medical lab I."
    },
    {
        "job": "building",
        "branch": "workbench",
        "code": "building_workbench_medical_lab_ii_lv40",
        "name": "Medical lab II",
        "lv": 40,
        "sp": 4,
        "tier": 8,
        "desc": "Unlock Medical lab II."
    },
    {
        "job": "building",
        "branch": "workbench",
        "code": "building_workbench_smelter_i_lv5",
        "name": "Smelter I",
        "lv": 5,
        "sp": 1,
        "tier": 1,
        "desc": "Unlock Smelter I."
    },
    {
        "job": "building",
        "branch": "workbench",
        "code": "building_workbench_smelter_ii_lv25",
        "name": "Smelter II",
        "lv": 25,
        "sp": 5,
        "tier": 5,
        "desc": "Unlock Smelter II."
    },
    {
        "job": "building",
        "branch": "housing",
        "code": "building_housing_wooden_structure_lv10",
        "name": "Wooden structure",
        "lv": 10,
        "sp": 1,
        "tier": 2,
        "desc": "Unlock Wooden structure."
    },
    {
        "job": "building",
        "branch": "housing",
        "code": "building_housing_stone_structure_lv30",
        "name": "Stone structure",
        "lv": 30,
        "sp": 3,
        "tier": 6,
        "desc": "Unlock Stone structure."
    },
    {
        "job": "building",
        "branch": "housing",
        "code": "building_housing_wooden_fence_lv20",
        "name": "Wooden fence",
        "lv": 20,
        "sp": 2,
        "tier": 4,
        "desc": "Unlock Wooden fence."
    },
    {
        "job": "building",
        "branch": "housing",
        "code": "building_housing_stone_fence_lv40",
        "name": "Stone fence",
        "lv": 40,
        "sp": 4,
        "tier": 8,
        "desc": "Unlock Stone fence."
    }
];

const MAX_REFUNDS_PER_DAY = 3;

async function seedSkillTree() {
    try {
        const count = await dbPool.query('SELECT COUNT(*) FROM job_skills;');
        if (parseInt(count.rows[0].count) > 0) {
            console.log('[INFO] Bang job_skills da co du lieu. Bo qua seeding.');
            return;
        }

        console.log(`[INFO] Dang nap ${ALL_SKILLS.length} ky nang theo Data Design...`);

        for (const skill of ALL_SKILLS) {
            await dbPool.query(`
                INSERT INTO job_skills
                    (job_code, branch, skill_code, skill_name, lv_required, sp_cost, tier,
                     effect_type, effect_val, description, prerequisite_skill_code)
                VALUES ($1,$2,$3,$4,$5,$6,$7,'passive',0,$8,$9)
                ON CONFLICT (skill_code) DO NOTHING;
            `, [
                skill.job, skill.branch, skill.code, skill.name,
                skill.lv, skill.sp, skill.tier, skill.desc, skill.pre || null
            ]);
        }

        const players = await dbPool.query('SELECT id FROM players;');
        const freeSkills = await dbPool.query(`SELECT id, job_code FROM job_skills WHERE sp_cost = 0;`);

        for (const player of players.rows) {
            for (const skill of freeSkills.rows) {
                const hasJob = await dbPool.query(
                    `SELECT 1 FROM player_jobs pj
                     JOIN jobs_seed js ON pj.job_id = js.id
                     WHERE pj.player_id = $1 AND js.code = $2;`,
                    [player.id, skill.job_code]
                );
                if (hasJob.rows.length > 0) {
                    await dbPool.query(`
                        INSERT INTO player_skills (player_id, skill_id, is_unlocked, unlocked_at)
                        VALUES ($1, $2, TRUE, NOW())
                        ON CONFLICT (player_id, skill_id) DO NOTHING;
                    `, [player.id, skill.id]);
                }
            }
        }

        console.log(`[SUCCESS] Da nap ${ALL_SKILLS.length} ky nang theo Data Design!`);
    } catch (error) {
        console.error('[ERROR] Loi khi seed skill tree:', error.message);
    }
}

async function getRefundCountToday(playerId) {
    const result = await dbPool.query(`
        SELECT COUNT(*) FROM skill_refund_log
        WHERE player_id = $1
          AND refunded_at >= CURRENT_DATE
          AND refunded_at < CURRENT_DATE + INTERVAL '1 day';
    `, [playerId]);
    return parseInt(result.rows[0].count);
}

module.exports = {
    seedSkillTree,
    getRefundCountToday,
    MAX_REFUNDS_PER_DAY,
    ALL_SKILLS,
};
