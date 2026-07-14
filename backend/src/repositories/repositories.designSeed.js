// backend/src/repositories/repositories.designSeed.js

const { gameDataDb } = require('./repositories.databaseDomains');
const dbPool = gameDataDb;

const LEVELING_RULES = [
    {
        "level": 1,
        "playerExp": 170,
        "totalPlayerExp": 170,
        "skillExp": 165,
        "totalSkillExp": 165,
        "breakthroughTime": null,
        "notes": null
    },
    {
        "level": 2,
        "playerExp": 335,
        "totalPlayerExp": 505,
        "skillExp": 260,
        "totalSkillExp": 425,
        "breakthroughTime": null,
        "notes": null
    },
    {
        "level": 3,
        "playerExp": 548,
        "totalPlayerExp": 1053,
        "skillExp": 385,
        "totalSkillExp": 810,
        "breakthroughTime": null,
        "notes": null
    },
    {
        "level": 4,
        "playerExp": 814,
        "totalPlayerExp": 1867,
        "skillExp": 540,
        "totalSkillExp": 1350,
        "breakthroughTime": null,
        "notes": null
    },
    {
        "level": 5,
        "playerExp": 1137,
        "totalPlayerExp": 3004,
        "skillExp": 725,
        "totalSkillExp": 2075,
        "breakthroughTime": null,
        "notes": null
    },
    {
        "level": 6,
        "playerExp": 1521,
        "totalPlayerExp": 4525,
        "skillExp": 940,
        "totalSkillExp": 3015,
        "breakthroughTime": null,
        "notes": null
    },
    {
        "level": 7,
        "playerExp": 1970,
        "totalPlayerExp": 6495,
        "skillExp": 1185,
        "totalSkillExp": 4200,
        "breakthroughTime": null,
        "notes": null
    },
    {
        "level": 8,
        "playerExp": 2488,
        "totalPlayerExp": 8983,
        "skillExp": 1460,
        "totalSkillExp": 5660,
        "breakthroughTime": null,
        "notes": null
    },
    {
        "level": 9,
        "playerExp": 3080,
        "totalPlayerExp": 12063,
        "skillExp": 1765,
        "totalSkillExp": 7425,
        "breakthroughTime": null,
        "notes": null
    },
    {
        "level": 10,
        "playerExp": 3750,
        "totalPlayerExp": 15813,
        "skillExp": 2100,
        "totalSkillExp": 9525,
        "breakthroughTime": null,
        "notes": null
    },
    {
        "level": 11,
        "playerExp": 4501,
        "totalPlayerExp": 20314,
        "skillExp": 2465,
        "totalSkillExp": 11990,
        "breakthroughTime": null,
        "notes": null
    },
    {
        "level": 12,
        "playerExp": 5339,
        "totalPlayerExp": 25653,
        "skillExp": 2860,
        "totalSkillExp": 14850,
        "breakthroughTime": null,
        "notes": null
    },
    {
        "level": 13,
        "playerExp": 6267,
        "totalPlayerExp": 31920,
        "skillExp": 3285,
        "totalSkillExp": 18135,
        "breakthroughTime": null,
        "notes": null
    },
    {
        "level": 14,
        "playerExp": 7290,
        "totalPlayerExp": 39210,
        "skillExp": 3740,
        "totalSkillExp": 21875,
        "breakthroughTime": null,
        "notes": null
    },
    {
        "level": 15,
        "playerExp": 8412,
        "totalPlayerExp": 47622,
        "skillExp": 4225,
        "totalSkillExp": 26100,
        "breakthroughTime": null,
        "notes": null
    },
    {
        "level": 16,
        "playerExp": 9637,
        "totalPlayerExp": 57259,
        "skillExp": 4740,
        "totalSkillExp": 30840,
        "breakthroughTime": null,
        "notes": null
    },
    {
        "level": 17,
        "playerExp": 10969,
        "totalPlayerExp": 68228,
        "skillExp": 5285,
        "totalSkillExp": 36125,
        "breakthroughTime": null,
        "notes": null
    },
    {
        "level": 18,
        "playerExp": 12412,
        "totalPlayerExp": 80640,
        "skillExp": 5860,
        "totalSkillExp": 41985,
        "breakthroughTime": null,
        "notes": null
    },
    {
        "level": 19,
        "playerExp": 13971,
        "totalPlayerExp": 94611,
        "skillExp": 6465,
        "totalSkillExp": 48450,
        "breakthroughTime": null,
        "notes": null
    },
    {
        "level": 20,
        "playerExp": 15650,
        "totalPlayerExp": 110261,
        "skillExp": 7100,
        "totalSkillExp": 55550,
        "breakthroughTime": "1m",
        "notes": null
    },
    {
        "level": 21,
        "playerExp": 17452,
        "totalPlayerExp": 127713,
        "skillExp": 7765,
        "totalSkillExp": 63315,
        "breakthroughTime": null,
        "notes": null
    },
    {
        "level": 22,
        "playerExp": 19383,
        "totalPlayerExp": 147096,
        "skillExp": 8460,
        "totalSkillExp": 71775,
        "breakthroughTime": null,
        "notes": null
    },
    {
        "level": 23,
        "playerExp": 21446,
        "totalPlayerExp": 168542,
        "skillExp": 9185,
        "totalSkillExp": 80960,
        "breakthroughTime": null,
        "notes": null
    },
    {
        "level": 24,
        "playerExp": 23646,
        "totalPlayerExp": 192188,
        "skillExp": 9940,
        "totalSkillExp": 90900,
        "breakthroughTime": null,
        "notes": null
    },
    {
        "level": 25,
        "playerExp": 25987,
        "totalPlayerExp": 218175,
        "skillExp": 10725,
        "totalSkillExp": 101625,
        "breakthroughTime": "5m",
        "notes": null
    },
    {
        "level": 26,
        "playerExp": 28473,
        "totalPlayerExp": 246648,
        "skillExp": 11540,
        "totalSkillExp": 113165,
        "breakthroughTime": null,
        "notes": null
    },
    {
        "level": 27,
        "playerExp": 31108,
        "totalPlayerExp": 277756,
        "skillExp": 12385,
        "totalSkillExp": 125550,
        "breakthroughTime": null,
        "notes": null
    },
    {
        "level": 28,
        "playerExp": 33896,
        "totalPlayerExp": 311652,
        "skillExp": 13260,
        "totalSkillExp": 138810,
        "breakthroughTime": null,
        "notes": null
    },
    {
        "level": 29,
        "playerExp": 36842,
        "totalPlayerExp": 348494,
        "skillExp": 14165,
        "totalSkillExp": 152975,
        "breakthroughTime": null,
        "notes": null
    },
    {
        "level": 30,
        "playerExp": 39950,
        "totalPlayerExp": 388444,
        "skillExp": 15100,
        "totalSkillExp": 168075,
        "breakthroughTime": "10m",
        "notes": null
    },
    {
        "level": 31,
        "playerExp": 43223,
        "totalPlayerExp": 431667,
        "skillExp": 16065,
        "totalSkillExp": 184140,
        "breakthroughTime": null,
        "notes": null
    },
    {
        "level": 32,
        "playerExp": 46667,
        "totalPlayerExp": 478334,
        "skillExp": 17060,
        "totalSkillExp": 201200,
        "breakthroughTime": null,
        "notes": null
    },
    {
        "level": 33,
        "playerExp": 50285,
        "totalPlayerExp": 528619,
        "skillExp": 18085,
        "totalSkillExp": 219285,
        "breakthroughTime": null,
        "notes": null
    },
    {
        "level": 34,
        "playerExp": 54082,
        "totalPlayerExp": 582701,
        "skillExp": 19140,
        "totalSkillExp": 238425,
        "breakthroughTime": null,
        "notes": null
    },
    {
        "level": 35,
        "playerExp": 58062,
        "totalPlayerExp": 640763,
        "skillExp": 20225,
        "totalSkillExp": 258650,
        "breakthroughTime": "30m",
        "notes": null
    },
    {
        "level": 36,
        "playerExp": 62229,
        "totalPlayerExp": 702992,
        "skillExp": 21340,
        "totalSkillExp": 279990,
        "breakthroughTime": null,
        "notes": null
    },
    {
        "level": 37,
        "playerExp": 66587,
        "totalPlayerExp": 769579,
        "skillExp": 22485,
        "totalSkillExp": 302475,
        "breakthroughTime": null,
        "notes": null
    },
    {
        "level": 38,
        "playerExp": 71140,
        "totalPlayerExp": 840719,
        "skillExp": 23660,
        "totalSkillExp": 326135,
        "breakthroughTime": null,
        "notes": null
    },
    {
        "level": 39,
        "playerExp": 75893,
        "totalPlayerExp": 916612,
        "skillExp": 24865,
        "totalSkillExp": 351000,
        "breakthroughTime": null,
        "notes": null
    },
    {
        "level": 40,
        "playerExp": 80850,
        "totalPlayerExp": 997462,
        "skillExp": 26100,
        "totalSkillExp": 377100,
        "breakthroughTime": "1h",
        "notes": null
    }
];

const CUREL_ITEM_POWER_MATRIX = [
    {
        "itemLevel": 1,
        "baseItemPower": 1,
        "common": 1,
        "uncommon": 6,
        "rare": 11,
        "epic": 16,
        "legendary": 21
    },
    {
        "itemLevel": 6,
        "baseItemPower": 6,
        "common": 6,
        "uncommon": 11,
        "rare": 16,
        "epic": 21,
        "legendary": 26
    },
    {
        "itemLevel": 11,
        "baseItemPower": 11,
        "common": 11,
        "uncommon": 16,
        "rare": 21,
        "epic": 26,
        "legendary": 31
    },
    {
        "itemLevel": 16,
        "baseItemPower": 16,
        "common": 16,
        "uncommon": 21,
        "rare": 26,
        "epic": 31,
        "legendary": 36
    },
    {
        "itemLevel": 21,
        "baseItemPower": 21,
        "common": 21,
        "uncommon": 26,
        "rare": 31,
        "epic": 36,
        "legendary": 41
    },
    {
        "itemLevel": 26,
        "baseItemPower": 26,
        "common": 26,
        "uncommon": 31,
        "rare": 36,
        "epic": 41,
        "legendary": 46
    },
    {
        "itemLevel": 31,
        "baseItemPower": 31,
        "common": 31,
        "uncommon": 36,
        "rare": 41,
        "epic": 46,
        "legendary": 51
    },
    {
        "itemLevel": 36,
        "baseItemPower": 36,
        "common": 36,
        "uncommon": 41,
        "rare": 46,
        "epic": 51,
        "legendary": 56
    }
];

const CUREL_RARITY_WEIGHTS = [
    {
        "curelLevel": 0,
        "commonWeight": 200,
        "uncommonWeight": 40,
        "rareWeight": 10,
        "epicWeight": 5,
        "legendaryWeight": 1,
        "totalWeight": 256
    },
    {
        "curelLevel": 1,
        "commonWeight": 199,
        "uncommonWeight": 41,
        "rareWeight": 10,
        "epicWeight": 5,
        "legendaryWeight": 1,
        "totalWeight": 256
    },
    {
        "curelLevel": 2,
        "commonWeight": 198,
        "uncommonWeight": 41,
        "rareWeight": 11,
        "epicWeight": 5,
        "legendaryWeight": 1,
        "totalWeight": 256
    },
    {
        "curelLevel": 3,
        "commonWeight": 197,
        "uncommonWeight": 42,
        "rareWeight": 10,
        "epicWeight": 6,
        "legendaryWeight": 1,
        "totalWeight": 256
    },
    {
        "curelLevel": 4,
        "commonWeight": 196,
        "uncommonWeight": 42,
        "rareWeight": 11,
        "epicWeight": 6,
        "legendaryWeight": 1,
        "totalWeight": 256
    },
    {
        "curelLevel": 5,
        "commonWeight": 195,
        "uncommonWeight": 43,
        "rareWeight": 11,
        "epicWeight": 5,
        "legendaryWeight": 2,
        "totalWeight": 256
    },
    {
        "curelLevel": 6,
        "commonWeight": 194,
        "uncommonWeight": 43,
        "rareWeight": 11,
        "epicWeight": 6,
        "legendaryWeight": 2,
        "totalWeight": 256
    },
    {
        "curelLevel": 7,
        "commonWeight": 193,
        "uncommonWeight": 44,
        "rareWeight": 11,
        "epicWeight": 6,
        "legendaryWeight": 2,
        "totalWeight": 256
    },
    {
        "curelLevel": 8,
        "commonWeight": 192,
        "uncommonWeight": 44,
        "rareWeight": 12,
        "epicWeight": 6,
        "legendaryWeight": 2,
        "totalWeight": 256
    },
    {
        "curelLevel": 9,
        "commonWeight": 191,
        "uncommonWeight": 45,
        "rareWeight": 11,
        "epicWeight": 7,
        "legendaryWeight": 2,
        "totalWeight": 256
    },
    {
        "curelLevel": 10,
        "commonWeight": 190,
        "uncommonWeight": 45,
        "rareWeight": 12,
        "epicWeight": 6,
        "legendaryWeight": 3,
        "totalWeight": 256
    },
    {
        "curelLevel": 11,
        "commonWeight": 189,
        "uncommonWeight": 46,
        "rareWeight": 12,
        "epicWeight": 6,
        "legendaryWeight": 3,
        "totalWeight": 256
    },
    {
        "curelLevel": 12,
        "commonWeight": 188,
        "uncommonWeight": 46,
        "rareWeight": 12,
        "epicWeight": 7,
        "legendaryWeight": 3,
        "totalWeight": 256
    },
    {
        "curelLevel": 13,
        "commonWeight": 187,
        "uncommonWeight": 47,
        "rareWeight": 12,
        "epicWeight": 7,
        "legendaryWeight": 3,
        "totalWeight": 256
    },
    {
        "curelLevel": 14,
        "commonWeight": 186,
        "uncommonWeight": 47,
        "rareWeight": 13,
        "epicWeight": 7,
        "legendaryWeight": 3,
        "totalWeight": 256
    },
    {
        "curelLevel": 15,
        "commonWeight": 185,
        "uncommonWeight": 48,
        "rareWeight": 12,
        "epicWeight": 7,
        "legendaryWeight": 4,
        "totalWeight": 256
    },
    {
        "curelLevel": 16,
        "commonWeight": 184,
        "uncommonWeight": 48,
        "rareWeight": 13,
        "epicWeight": 7,
        "legendaryWeight": 4,
        "totalWeight": 256
    },
    {
        "curelLevel": 17,
        "commonWeight": 183,
        "uncommonWeight": 49,
        "rareWeight": 13,
        "epicWeight": 7,
        "legendaryWeight": 4,
        "totalWeight": 256
    },
    {
        "curelLevel": 18,
        "commonWeight": 182,
        "uncommonWeight": 49,
        "rareWeight": 13,
        "epicWeight": 8,
        "legendaryWeight": 4,
        "totalWeight": 256
    },
    {
        "curelLevel": 19,
        "commonWeight": 181,
        "uncommonWeight": 50,
        "rareWeight": 13,
        "epicWeight": 8,
        "legendaryWeight": 4,
        "totalWeight": 256
    },
    {
        "curelLevel": 20,
        "commonWeight": 180,
        "uncommonWeight": 50,
        "rareWeight": 14,
        "epicWeight": 7,
        "legendaryWeight": 5,
        "totalWeight": 256
    },
    {
        "curelLevel": 21,
        "commonWeight": 179,
        "uncommonWeight": 51,
        "rareWeight": 13,
        "epicWeight": 8,
        "legendaryWeight": 5,
        "totalWeight": 256
    },
    {
        "curelLevel": 22,
        "commonWeight": 178,
        "uncommonWeight": 51,
        "rareWeight": 14,
        "epicWeight": 8,
        "legendaryWeight": 5,
        "totalWeight": 256
    },
    {
        "curelLevel": 23,
        "commonWeight": 177,
        "uncommonWeight": 52,
        "rareWeight": 14,
        "epicWeight": 8,
        "legendaryWeight": 5,
        "totalWeight": 256
    },
    {
        "curelLevel": 24,
        "commonWeight": 176,
        "uncommonWeight": 52,
        "rareWeight": 14,
        "epicWeight": 9,
        "legendaryWeight": 5,
        "totalWeight": 256
    },
    {
        "curelLevel": 25,
        "commonWeight": 175,
        "uncommonWeight": 53,
        "rareWeight": 14,
        "epicWeight": 8,
        "legendaryWeight": 6,
        "totalWeight": 256
    },
    {
        "curelLevel": 26,
        "commonWeight": 174,
        "uncommonWeight": 53,
        "rareWeight": 15,
        "epicWeight": 8,
        "legendaryWeight": 6,
        "totalWeight": 256
    },
    {
        "curelLevel": 27,
        "commonWeight": 173,
        "uncommonWeight": 54,
        "rareWeight": 14,
        "epicWeight": 9,
        "legendaryWeight": 6,
        "totalWeight": 256
    },
    {
        "curelLevel": 28,
        "commonWeight": 172,
        "uncommonWeight": 54,
        "rareWeight": 15,
        "epicWeight": 9,
        "legendaryWeight": 6,
        "totalWeight": 256
    },
    {
        "curelLevel": 29,
        "commonWeight": 171,
        "uncommonWeight": 55,
        "rareWeight": 15,
        "epicWeight": 9,
        "legendaryWeight": 6,
        "totalWeight": 256
    },
    {
        "curelLevel": 30,
        "commonWeight": 170,
        "uncommonWeight": 55,
        "rareWeight": 15,
        "epicWeight": 9,
        "legendaryWeight": 7,
        "totalWeight": 256
    },
    {
        "curelLevel": 31,
        "commonWeight": 169,
        "uncommonWeight": 56,
        "rareWeight": 15,
        "epicWeight": 9,
        "legendaryWeight": 7,
        "totalWeight": 256
    },
    {
        "curelLevel": 32,
        "commonWeight": 168,
        "uncommonWeight": 56,
        "rareWeight": 16,
        "epicWeight": 9,
        "legendaryWeight": 7,
        "totalWeight": 256
    },
    {
        "curelLevel": 33,
        "commonWeight": 167,
        "uncommonWeight": 57,
        "rareWeight": 15,
        "epicWeight": 10,
        "legendaryWeight": 7,
        "totalWeight": 256
    },
    {
        "curelLevel": 34,
        "commonWeight": 166,
        "uncommonWeight": 57,
        "rareWeight": 16,
        "epicWeight": 10,
        "legendaryWeight": 7,
        "totalWeight": 256
    },
    {
        "curelLevel": 35,
        "commonWeight": 165,
        "uncommonWeight": 58,
        "rareWeight": 16,
        "epicWeight": 9,
        "legendaryWeight": 8,
        "totalWeight": 256
    },
    {
        "curelLevel": 36,
        "commonWeight": 164,
        "uncommonWeight": 58,
        "rareWeight": 16,
        "epicWeight": 10,
        "legendaryWeight": 8,
        "totalWeight": 256
    },
    {
        "curelLevel": 37,
        "commonWeight": 163,
        "uncommonWeight": 59,
        "rareWeight": 16,
        "epicWeight": 10,
        "legendaryWeight": 8,
        "totalWeight": 256
    },
    {
        "curelLevel": 38,
        "commonWeight": 162,
        "uncommonWeight": 59,
        "rareWeight": 17,
        "epicWeight": 10,
        "legendaryWeight": 8,
        "totalWeight": 256
    },
    {
        "curelLevel": 39,
        "commonWeight": 161,
        "uncommonWeight": 60,
        "rareWeight": 16,
        "epicWeight": 11,
        "legendaryWeight": 8,
        "totalWeight": 256
    },
    {
        "curelLevel": 40,
        "commonWeight": 160,
        "uncommonWeight": 60,
        "rareWeight": 17,
        "epicWeight": 10,
        "legendaryWeight": 9,
        "totalWeight": 256
    }
];

const ITEM_TYPE_RULES = [
    {
        "mainTag": "Material",
        "subTags": [
            "Metal",
            "Raw",
            "Processed",
            "Wood",
            "Stone",
            "Gemstone",
            "Synthetic",
            "Rubber",
            "Fabric",
            "Leather",
            "Cordage",
            "Plantable",
            "Seed",
            "Component",
            "Nail",
            "Charcoal",
            "Bone",
            "Handle",
            "Tool Head",
            "Bowstring",
            "Gun Barrel",
            "Gun Frame",
            "Padding",
            "Gunpowder"
        ],
        "itemCount": 31
    },
    {
        "mainTag": "Food",
        "subTags": [
            "Raw",
            "Processed",
            "Meat",
            "Vegetable",
            "Fruit",
            "Grain",
            "Flour",
            "Dried",
            "Smoked",
            "Spice",
            "Soup",
            "Stew",
            "Noodle",
            "Fried",
            "Bread",
            "Burger",
            "Sandwich",
            "Pizza",
            "Cake",
            "Canned",
            "Steamed",
            "Water",
            "Juice",
            "Smoothie",
            "Coffee",
            "Wine",
            "Moonshine"
        ],
        "itemCount": 80
    },
    {
        "mainTag": "Medicine",
        "subTags": [
            "Bandage",
            "First Aid Kit",
            "Antibiotic",
            "Painkiller",
            "Booster"
        ],
        "itemCount": 5
    },
    {
        "mainTag": "Building",
        "subTags": [
            "Furniture",
            "Storage",
            "Cooking Station",
            "Crafting Station",
            "Medical Station",
            "Smelting Station",
            "Architecture",
            "Wood",
            "Stone",
            "Fence"
        ],
        "itemCount": 12
    },
    {
        "mainTag": "Equipment",
        "subTags": [
            "Combating",
            "Cooking",
            "Scavenging",
            "Gathering",
            "Building",
            "Crafting",
            "Vest",
            "Head",
            "UpperBody",
            "LowerBody",
            "Hand",
            "Leg",
            "Jewelry",
            "Backpack"
        ],
        "itemCount": 39
    },
    {
        "mainTag": "Tool",
        "subTags": [
            "Axe",
            "Pickaxe",
            "Shovel",
            "Hoe",
            "Hammer",
            "Saw",
            "Crowbar",
            "Grill Rack",
            "Cooking Pot",
            "Ladle"
        ],
        "itemCount": 10
    },
    {
        "mainTag": "Weapon",
        "subTags": [
            "Melee",
            "Ranged",
            "Dagger",
            "Spear",
            "Machete",
            "Club",
            "Bow",
            "Crossbow",
            "Handgun",
            "Shotgun",
            "Rifle",
            "SMG"
        ],
        "itemCount": 10
    },
    {
        "mainTag": "Ammo",
        "subTags": [
            "Arrow",
            "Handgun Ammo",
            "Shotgun Ammo",
            "Rifle Ammo",
            "SMG Ammo"
        ],
        "itemCount": 5
    }
];

const STAT_DEFINITIONS = [
    {
        "statType": "PRIMARY",
        "code": "STR",
        "fullName": "Strength",
        "purpose": "Increases base physical damage and heavy carry capacity.",
        "notes": null
    },
    {
        "statType": "PRIMARY",
        "code": "AGI",
        "fullName": "Agility",
        "purpose": "Increases reflex speed, evasion, and base movement speed.",
        "notes": null
    },
    {
        "statType": "PRIMARY",
        "code": "DEX",
        "fullName": "Dexterity",
        "purpose": "Increases hand precision, accuracy, and critical chance.",
        "notes": null
    },
    {
        "statType": "PRIMARY",
        "code": "VIT",
        "fullName": "Vitality",
        "purpose": "Increases maximum health, resistance, defense, and physical stamina.",
        "notes": null
    },
    {
        "statType": "PRIMARY",
        "code": "INT",
        "fullName": "Intelligence",
        "purpose": "Increases logic, recipe learning, and advanced tool efficiency.",
        "notes": null
    },
    {
        "statType": "PRIMARY",
        "code": "CHR",
        "fullName": "Charm",
        "purpose": "Increases communication, bargaining, and follower or settlement management appeal.",
        "notes": null
    },
    {
        "statType": "COMBAT_SECONDARY",
        "code": "HP",
        "fullName": "Hitpoint",
        "purpose": "Character life value. At 0 HP, the character dies or is incapacitated.",
        "notes": "BASE + VIT*4 + STR*0,5 + Player level*10"
    },
    {
        "statType": "COMBAT_SECONDARY",
        "code": "ATK",
        "fullName": "Attack",
        "purpose": "Damage dealt to a target when attacking.",
        "notes": "CSVK + STR*1"
    },
    {
        "statType": "COMBAT_SECONDARY",
        "code": "DEF",
        "fullName": "Defend",
        "purpose": "Reduces incoming damage from hostile attacks.",
        "notes": "CSTB + VIT/5"
    },
    {
        "statType": "SECONDARY",
        "code": "CRAFTING_SPEED",
        "fullName": "Crafting speed",
        "purpose": "Speed for completing crafted items and tools.",
        "notes": "20 AGI + 10 INT = -1%"
    },
    {
        "statType": "SECONDARY",
        "code": "COOKING_SPEED",
        "fullName": "Cooking speed",
        "purpose": "Speed for preparing food and remedies at cooking stations.",
        "notes": "20 AGI + 10 CHR = -1%"
    },
    {
        "statType": "SECONDARY",
        "code": "BUILDING_SPEED",
        "fullName": "Building speed",
        "purpose": "Speed for building, repairing, or placing structures.",
        "notes": "20 AGI + 10 VIT = -1%"
    },
    {
        "statType": "SECONDARY",
        "code": "GATHERING_SPEED",
        "fullName": "Gathering speed",
        "purpose": "Speed for harvesting natural resources such as chopping wood, mining stone, and gathering.",
        "notes": "20 AGI + 10 DEX= -1%"
    },
    {
        "statType": "SECONDARY",
        "code": "SCAVERGING_SPEED",
        "fullName": "Scaverging speed",
        "purpose": "Speed for scavenging containers, ruins, and abandoned locations.",
        "notes": "20 AGI + 10 DEX = -1%"
    },
    {
        "statType": "SECONDARY",
        "code": "EXPLORING_SPEED",
        "fullName": "Exploring speed",
        "purpose": "Speed for revealing the map and discovering hidden locations or resource zones.",
        "notes": "10 AGI = -1%"
    },
    {
        "statType": "SECONDARY",
        "code": "ENERGY",
        "fullName": "Energy",
        "purpose": "Energy spent to perform actions such as foraging fruit, carrying firewood, and exploring.",
        "notes": "BASE + VIT*1 + STR*0,2"
    },
    {
        "statType": "SECONDARY",
        "code": "INFECTION_RATE",
        "fullName": "Infection rate",
        "purpose": "Rate or chance of infection from the environment or infected enemies.",
        "notes": null
    },
    {
        "statType": "SECONDARY",
        "code": "RADIATION_RATE",
        "fullName": "Radiation rate",
        "purpose": "Radiation buildup when entering dead zones or contaminated areas.",
        "notes": null
    },
    {
        "statType": "SECONDARY",
        "code": "EXP_MULTIPLIER",
        "fullName": "Exp multiplier",
        "purpose": "Multiplier for player experience gained from skill-related actions.",
        "notes": "20 INT = +1%"
    }
];

const CRAFTING_RECIPES = [
    {
        "recipeNumber": 1,
        "code": "METAL_INGOT",
        "outputItem": "Metal Ingot",
        "outputCategory": "Material",
        "requiredJobCode": "crafting",
        "workstationAccess": "Smelting Station",
        "requiredTool": "Ladle",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Metal Scrap/Ore",
                "quantity": 3
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Charcoal",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 1,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 1, Player Skill Level)",
        "craftTimeSeconds": 300,
        "workstationQueueSlot": "Smelting queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": "Alpha recipe gop Copper/Iron/Zinc/Aluminum Ingot thanh Metal Ingot.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Conductive, Insulate, Structural"
    },
    {
        "recipeNumber": 5,
        "code": "WOODEN_NAIL",
        "outputItem": "Wooden Nail",
        "outputCategory": "Material",
        "requiredJobCode": "crafting",
        "workstationAccess": "None (hand-craft, no workstation required)",
        "requiredTool": "Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Wood",
                "quantity": 2
            }
        ],
        "requiredSkillLevel": 1,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 1, Player Skill Level)",
        "craftTimeSeconds": 45,
        "workstationQueueSlot": "Instant craft",
        "curelRuleKey": "Material CUREL",
        "designNotes": "Alpha input dung Wood thay cho Branch/Log rieng le.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Structural"
    },
    {
        "recipeNumber": 6,
        "code": "METAL_NAIL",
        "outputItem": "Metal Nail",
        "outputCategory": "Material",
        "requiredJobCode": "crafting",
        "workstationAccess": "Crafting Station",
        "requiredTool": "Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Metal Ingot",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 10,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 10, Player Skill Level)",
        "craftTimeSeconds": 300,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": "Dung Metal Ingot da gop.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Structural"
    },
    {
        "recipeNumber": 7,
        "code": "CHARCOAL",
        "outputItem": "Charcoal",
        "outputCategory": "Material",
        "requiredJobCode": "crafting",
        "workstationAccess": "Cooking Station",
        "requiredTool": null,
        "toolDurabilityCost": null,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Wood",
                "quantity": 3
            }
        ],
        "requiredSkillLevel": 1,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 1, Player Skill Level)",
        "craftTimeSeconds": 300,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": "Alpha input dung Wood chung.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "None (fuel/chemical)"
    },
    {
        "recipeNumber": 9,
        "code": "RUBBER",
        "outputItem": "Rubber",
        "outputCategory": "Material",
        "requiredJobCode": "crafting",
        "workstationAccess": "Crafting Station",
        "requiredTool": "Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Synthetic Scrap",
                "quantity": 2
            }
        ],
        "requiredSkillLevel": 10,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 10, Player Skill Level)",
        "craftTimeSeconds": 45,
        "workstationQueueSlot": "Instant craft",
        "curelRuleKey": "Material CUREL",
        "designNotes": "Alpha input dung Synthetic Scrap thay cho Rubber rubbish cu.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Flexible, Cushion"
    },
    {
        "recipeNumber": 10,
        "code": "CORDAGE",
        "outputItem": "Cordage",
        "outputCategory": "Material",
        "requiredJobCode": "crafting",
        "workstationAccess": "Crafting Station",
        "requiredTool": null,
        "toolDurabilityCost": null,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Fabric or Synthetic Scrap",
                "quantity": 3
            }
        ],
        "requiredSkillLevel": 1,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 1, Player Skill Level)",
        "craftTimeSeconds": 45,
        "workstationQueueSlot": "Instant craft",
        "curelRuleKey": "Material CUREL",
        "designNotes": "Alpha input gop Plastic/Fabric cu thanh Fabric hoac Synthetic Scrap.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Flexible, Bind"
    },
    {
        "recipeNumber": 11,
        "code": "WOODEN_HANDLE",
        "outputItem": "Wooden Handle",
        "outputCategory": "Material",
        "requiredJobCode": "crafting",
        "workstationAccess": "None (hand-craft, no workstation required)",
        "requiredTool": null,
        "toolDurabilityCost": null,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Wood",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 1,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 1, Player Skill Level)",
        "craftTimeSeconds": 45,
        "workstationQueueSlot": "Instant craft",
        "curelRuleKey": "Material CUREL",
        "designNotes": "Alpha input dung Wood chung.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Structural, Flexible"
    },
    {
        "recipeNumber": 12,
        "code": "STONE_TOOL_HEAD",
        "outputItem": "Stone Tool Head",
        "outputCategory": "Material",
        "requiredJobCode": "crafting",
        "workstationAccess": "Crafting Station",
        "requiredTool": "Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Stone",
                "quantity": 2
            }
        ],
        "requiredSkillLevel": 1,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 1, Player Skill Level)",
        "craftTimeSeconds": 45,
        "workstationQueueSlot": "Instant craft",
        "curelRuleKey": "Material CUREL",
        "designNotes": "Alpha input dung Stone chung.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Edge, Impact"
    },
    {
        "recipeNumber": 13,
        "code": "METAL_TOOL_HEAD",
        "outputItem": "Metal Tool Head",
        "outputCategory": "Material",
        "requiredJobCode": "crafting",
        "workstationAccess": "Crafting Station",
        "requiredTool": "Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Metal Ingot",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 10,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 10, Player Skill Level)",
        "craftTimeSeconds": 300,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": "Alpha recipe gop Copper/Iron/Aluminum Tool Head thanh Metal Tool Head.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Edge, Impact"
    },
    {
        "recipeNumber": 16,
        "code": "BOWSTRING",
        "outputItem": "Bowstring",
        "outputCategory": "Material",
        "requiredJobCode": "crafting",
        "workstationAccess": "Crafting Station",
        "requiredTool": null,
        "toolDurabilityCost": null,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Cordage or Leather",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 1,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 1, Player Skill Level)",
        "craftTimeSeconds": 45,
        "workstationQueueSlot": "Instant craft",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Flexible, Bind"
    },
    {
        "recipeNumber": 17,
        "code": "METAL_GUN_BARREL",
        "outputItem": "Metal Gun Barrel",
        "outputCategory": "Material",
        "requiredJobCode": "crafting",
        "workstationAccess": "Crafting Station",
        "requiredTool": "Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Metal Ingot",
                "quantity": 2
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 300,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": "Alpha recipe gop Iron/Aluminum Gun Barrel thanh Metal Gun Barrel.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Structural, Insulate"
    },
    {
        "recipeNumber": 18,
        "code": "METAL_GUN_FRAME",
        "outputItem": "Metal Gun Frame",
        "outputCategory": "Material",
        "requiredJobCode": "crafting",
        "workstationAccess": "Crafting Station",
        "requiredTool": "Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Metal Ingot",
                "quantity": 2
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 300,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": "Alpha recipe gop Iron/Aluminum Gun Frame thanh Metal Gun Frame.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Structural, Impact"
    },
    {
        "recipeNumber": 21,
        "code": "FABRIC_PANEL",
        "outputItem": "Fabric Panel",
        "outputCategory": "Material",
        "requiredJobCode": "crafting",
        "workstationAccess": "Crafting Station",
        "requiredTool": "Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Fabric",
                "quantity": 2
            }
        ],
        "requiredSkillLevel": 15,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 15, Player Skill Level)",
        "craftTimeSeconds": 45,
        "workstationQueueSlot": "Instant craft",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Insulate, Cushion"
    },
    {
        "recipeNumber": 22,
        "code": "PADDING",
        "outputItem": "Padding",
        "outputCategory": "Material",
        "requiredJobCode": "crafting",
        "workstationAccess": "Crafting Station",
        "requiredTool": "Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Fabric",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Synthetic Scrap",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 15,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 15, Player Skill Level)",
        "craftTimeSeconds": 45,
        "workstationQueueSlot": "Instant craft",
        "curelRuleKey": "Material CUREL",
        "designNotes": "Alpha khong con Rubbish Non-recyclable rieng, dung Synthetic Scrap lam filler.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Cushion, Insulate"
    },
    {
        "recipeNumber": 23,
        "code": "GUNPOWDER",
        "outputItem": "Gunpowder",
        "outputCategory": "Material",
        "requiredJobCode": "crafting",
        "workstationAccess": "Crafting Station",
        "requiredTool": null,
        "toolDurabilityCost": null,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Gemstone",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Charcoal",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 10,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 10, Player Skill Level)",
        "craftTimeSeconds": 45,
        "workstationQueueSlot": "Instant craft",
        "curelRuleKey": "Material CUREL",
        "designNotes": "Alpha gop Sulfur/Saltpeter vao Gemstone/mineral resource chung.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "None (chemical)"
    },
    {
        "recipeNumber": 24,
        "code": "WILD_WHEAT_FLOUR",
        "outputItem": "Grain Flour",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Cooking Station",
        "requiredTool": null,
        "toolDurabilityCost": null,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, Grain",
                "quantity": 2
            }
        ],
        "requiredSkillLevel": 1,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 1, Player Skill Level)",
        "craftTimeSeconds": 45,
        "workstationQueueSlot": "Instant craft",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Food"
    },
    {
        "recipeNumber": 25,
        "code": "WILD_OAT_FLOUR",
        "outputItem": "Grain Flour",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Cooking Station",
        "requiredTool": null,
        "toolDurabilityCost": null,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, Grain",
                "quantity": 2
            }
        ],
        "requiredSkillLevel": 1,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 1, Player Skill Level)",
        "craftTimeSeconds": 45,
        "workstationQueueSlot": "Instant craft",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Food"
    },
    {
        "recipeNumber": 26,
        "code": "FERAL_CORN_FLOUR",
        "outputItem": "Grain Flour",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Cooking Station",
        "requiredTool": null,
        "toolDurabilityCost": null,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, Grain",
                "quantity": 2
            }
        ],
        "requiredSkillLevel": 1,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 1, Player Skill Level)",
        "craftTimeSeconds": 45,
        "workstationQueueSlot": "Instant craft",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Food"
    },
    {
        "recipeNumber": 27,
        "code": "DRIED_MEAT",
        "outputItem": "Cooked Meat",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Cooking Station",
        "requiredTool": null,
        "toolDurabilityCost": null,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, Raw Meat",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Food, Salt",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 10,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 10, Player Skill Level)",
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Food"
    },
    {
        "recipeNumber": 28,
        "code": "SMOKED_MEAT",
        "outputItem": "Cooked Meat",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Cooking Station",
        "requiredTool": null,
        "toolDurabilityCost": null,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, Raw Meat",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Charcoal",
                "quantity": 1
            },
            {
                "slotIndex": 3,
                "tagQuery": "Food, Salt",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 15,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 15, Player Skill Level)",
        "craftTimeSeconds": 180,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Food"
    },
    {
        "recipeNumber": 29,
        "code": "SALT",
        "outputItem": "Salt",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Cooking Station",
        "requiredTool": null,
        "toolDurabilityCost": null,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, Contaminated Water or Mineral Water",
                "quantity": 2
            }
        ],
        "requiredSkillLevel": 5,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 5, Player Skill Level)",
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Food"
    },
    {
        "recipeNumber": 30,
        "code": "SUGAR",
        "outputItem": "Sugar",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Cooking Station",
        "requiredTool": null,
        "toolDurabilityCost": null,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, Fruit",
                "quantity": 2
            }
        ],
        "requiredSkillLevel": 10,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 10, Player Skill Level)",
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Food"
    },
    {
        "recipeNumber": 31,
        "code": "VINEGAR",
        "outputItem": "Vinegar",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Cooking Station",
        "requiredTool": null,
        "toolDurabilityCost": null,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, Fruit or Grain",
                "quantity": 2
            }
        ],
        "requiredSkillLevel": 10,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 10, Player Skill Level)",
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Food"
    },
    {
        "recipeNumber": 32,
        "code": "SOYSAUCE",
        "outputItem": "Soysauce",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Cooking Station",
        "requiredTool": null,
        "toolDurabilityCost": null,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, Grain",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Food, Salt",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 180,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Food"
    },
    {
        "recipeNumber": 33,
        "code": "YEAST",
        "outputItem": "Yeast",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Cooking Station",
        "requiredTool": null,
        "toolDurabilityCost": null,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, Flour",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 10,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 10, Player Skill Level)",
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Food"
    },
    {
        "recipeNumber": 34,
        "code": "BUTTER",
        "outputItem": "Butter",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Cooking Station",
        "requiredTool": null,
        "toolDurabilityCost": null,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, Animal Fat or Animal Oil",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 10,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 10, Player Skill Level)",
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Food"
    },
    {
        "recipeNumber": 35,
        "code": "CHEESE",
        "outputItem": "Cheese",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Cooking Station",
        "requiredTool": null,
        "toolDurabilityCost": null,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, Butter",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Food, Salt",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 180,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Food"
    },
    {
        "recipeNumber": 36,
        "code": "ANIMAL_FAT",
        "outputItem": "Animal Fat",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Cooking Station",
        "requiredTool": null,
        "toolDurabilityCost": null,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, Raw Meat",
                "quantity": 2
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Food"
    },
    {
        "recipeNumber": 37,
        "code": "ANIMAL_OIL",
        "outputItem": "Animal Oil",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Cooking Station",
        "requiredTool": null,
        "toolDurabilityCost": null,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, Animal Fat",
                "quantity": 2
            }
        ],
        "requiredSkillLevel": 30,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 30, Player Skill Level)",
        "craftTimeSeconds": 180,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Food"
    },
    {
        "recipeNumber": 38,
        "code": "PUMPKIN_SEED_OIL",
        "outputItem": "Seed Oil",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Cooking Station",
        "requiredTool": null,
        "toolDurabilityCost": null,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Vegetable Seed",
                "quantity": 2
            }
        ],
        "requiredSkillLevel": 30,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 30, Player Skill Level)",
        "craftTimeSeconds": 180,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Food"
    },
    {
        "recipeNumber": 39,
        "code": "FERAL_CORN_OIL",
        "outputItem": "Seed Oil",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Cooking Station",
        "requiredTool": null,
        "toolDurabilityCost": null,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, Grain",
                "quantity": 2
            }
        ],
        "requiredSkillLevel": 30,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 30, Player Skill Level)",
        "craftTimeSeconds": 180,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Food"
    },
    {
        "recipeNumber": 40,
        "code": "SKEWERED_MEAT",
        "outputItem": "Cooked Meat",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Cooking Station",
        "requiredTool": null,
        "toolDurabilityCost": null,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, Raw Meat",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 1,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 1, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Food"
    },
    {
        "recipeNumber": 41,
        "code": "SEASONED_SKEWERED_MEAT",
        "outputItem": "Cooked Meat",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Cooking Station",
        "requiredTool": null,
        "toolDurabilityCost": null,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, Raw Meat",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Food, Salt or Soysauce",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 10,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 10, Player Skill Level)",
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Food"
    },
    {
        "recipeNumber": 42,
        "code": "STEAK",
        "outputItem": "Cooked Meat",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Cooking Station",
        "requiredTool": null,
        "toolDurabilityCost": null,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, Raw Meat",
                "quantity": 2
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Food"
    },
    {
        "recipeNumber": 43,
        "code": "SEASONED_STEAK",
        "outputItem": "Cooked Meat",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Cooking Station",
        "requiredTool": null,
        "toolDurabilityCost": null,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, Raw Meat",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Food, Salt or Soysauce",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 30,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 30, Player Skill Level)",
        "craftTimeSeconds": 180,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Food"
    },
    {
        "recipeNumber": 44,
        "code": "BOILED_MEAT",
        "outputItem": "Cooked Meat",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Cooking Station",
        "requiredTool": null,
        "toolDurabilityCost": null,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, Raw Meat",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Food, Water (Boiled/Filtered)",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 1,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 1, Player Skill Level)",
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Food"
    },
    {
        "recipeNumber": 45,
        "code": "BOILED_PUMPKIN",
        "outputItem": "Cooked Vegetable",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Cooking Station",
        "requiredTool": null,
        "toolDurabilityCost": null,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, Vegetable",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Food, Water (Boiled/Filtered)",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 1,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 1, Player Skill Level)",
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Food"
    },
    {
        "recipeNumber": 46,
        "code": "DANDELION_GREEN_SOUP",
        "outputItem": "Cooked Vegetable",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Cooking Station",
        "requiredTool": null,
        "toolDurabilityCost": null,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, Vegetable",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Food, Water (Boiled/Filtered)",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 10,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 10, Player Skill Level)",
        "craftTimeSeconds": 180,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Food"
    },
    {
        "recipeNumber": 47,
        "code": "CELLAR_MUSHROOM_SOUP",
        "outputItem": "Cooked Vegetable",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Cooking Station",
        "requiredTool": null,
        "toolDurabilityCost": null,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, Vegetable",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Food, Water (Boiled/Filtered)",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 10,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 10, Player Skill Level)",
        "craftTimeSeconds": 180,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Food"
    },
    {
        "recipeNumber": 48,
        "code": "MEAT_BONE_SOUP",
        "outputItem": "Cooked Meat",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Cooking Station",
        "requiredTool": null,
        "toolDurabilityCost": null,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Bone",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Food, Water (Boiled/Filtered)",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 10,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 10, Player Skill Level)",
        "craftTimeSeconds": 180,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Food"
    },
    {
        "recipeNumber": 49,
        "code": "MEAT_STEW",
        "outputItem": "Cooked Meat",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Cooking Station",
        "requiredTool": null,
        "toolDurabilityCost": null,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, Raw Meat",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Food, Water (Boiled/Filtered)",
                "quantity": 1
            },
            {
                "slotIndex": 3,
                "tagQuery": "Food, Salt or Soysauce",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 240,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Food"
    },
    {
        "recipeNumber": 50,
        "code": "PUMPKIN_STEW",
        "outputItem": "Cooked Vegetable",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Cooking Station",
        "requiredTool": null,
        "toolDurabilityCost": null,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, Vegetable",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Food, Water (Boiled/Filtered)",
                "quantity": 1
            },
            {
                "slotIndex": 3,
                "tagQuery": "Food, Salt",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 240,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Food"
    },
    {
        "recipeNumber": 51,
        "code": "MEAT_BONE_NOODLE_SOUP",
        "outputItem": "Cooked Meat",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Cooking Station",
        "requiredTool": null,
        "toolDurabilityCost": null,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, Flour",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Bone",
                "quantity": 1
            },
            {
                "slotIndex": 3,
                "tagQuery": "Food, Water (Boiled/Filtered)",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 10,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 10, Player Skill Level)",
        "craftTimeSeconds": 180,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Food"
    },
    {
        "recipeNumber": 52,
        "code": "CELLAR_MUSHROOM_NOODLE",
        "outputItem": "Cooked Vegetable",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Cooking Station",
        "requiredTool": null,
        "toolDurabilityCost": null,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, Flour",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Food, Vegetable",
                "quantity": 1
            },
            {
                "slotIndex": 3,
                "tagQuery": "Food, Water (Boiled/Filtered)",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 10,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 10, Player Skill Level)",
        "craftTimeSeconds": 180,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Food"
    },
    {
        "recipeNumber": 53,
        "code": "FERAL_TOMATO_NOODLE",
        "outputItem": "Cooked Vegetable",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Cooking Station",
        "requiredTool": null,
        "toolDurabilityCost": null,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, Flour",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Food, Vegetable",
                "quantity": 1
            },
            {
                "slotIndex": 3,
                "tagQuery": "Food, Water (Boiled/Filtered)",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 10,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 10, Player Skill Level)",
        "craftTimeSeconds": 180,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Food"
    },
    {
        "recipeNumber": 54,
        "code": "FRIED_MEAT",
        "outputItem": "Cooked Meat",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Cooking Station",
        "requiredTool": null,
        "toolDurabilityCost": null,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, Raw Meat",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Food, Oil",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Food"
    },
    {
        "recipeNumber": 55,
        "code": "SEASONED_FRIED_MEAT",
        "outputItem": "Cooked Meat",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Cooking Station",
        "requiredTool": null,
        "toolDurabilityCost": null,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, Raw Meat",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Food, Oil",
                "quantity": 1
            },
            {
                "slotIndex": 3,
                "tagQuery": "Food, Salt or Soysauce",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 30,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 30, Player Skill Level)",
        "craftTimeSeconds": 180,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Food"
    },
    {
        "recipeNumber": 56,
        "code": "DEEP_FRIED_MEAT",
        "outputItem": "Cooked Meat",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Cooking Station",
        "requiredTool": null,
        "toolDurabilityCost": null,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, Raw Meat",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Food, Oil",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 40,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 40, Player Skill Level)",
        "craftTimeSeconds": 180,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Food"
    },
    {
        "recipeNumber": 57,
        "code": "FRIED_PUMPKIN",
        "outputItem": "Cooked Vegetable",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Cooking Station",
        "requiredTool": null,
        "toolDurabilityCost": null,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, Vegetable",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Food, Oil",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Food"
    },
    {
        "recipeNumber": 58,
        "code": "DEEP_FRIED_MUSHROOM",
        "outputItem": "Cooked Vegetable",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Cooking Station",
        "requiredTool": null,
        "toolDurabilityCost": null,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, Vegetable",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Food, Oil",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 40,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 40, Player Skill Level)",
        "craftTimeSeconds": 180,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Food"
    },
    {
        "recipeNumber": 59,
        "code": "DEEP_FRIED_TOMATO",
        "outputItem": "Cooked Vegetable",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Cooking Station",
        "requiredTool": null,
        "toolDurabilityCost": null,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, Vegetable",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Food, Oil",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 40,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 40, Player Skill Level)",
        "craftTimeSeconds": 180,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Food"
    },
    {
        "recipeNumber": 60,
        "code": "BREAD",
        "outputItem": "Bread",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Cooking Station",
        "requiredTool": null,
        "toolDurabilityCost": null,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, Flour",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Food, Yeast",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 15,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 15, Player Skill Level)",
        "craftTimeSeconds": 180,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Food"
    },
    {
        "recipeNumber": 61,
        "code": "MEAT_BURGER",
        "outputItem": "Cooked Meat",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Cooking Station",
        "requiredTool": null,
        "toolDurabilityCost": null,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, Bread",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Food, Raw Meat",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 15,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 15, Player Skill Level)",
        "craftTimeSeconds": 180,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Food"
    },
    {
        "recipeNumber": 62,
        "code": "MEAT_SANDWICH",
        "outputItem": "Cooked Meat",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Cooking Station",
        "requiredTool": null,
        "toolDurabilityCost": null,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, Bread",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Food, Raw Meat",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 180,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Food"
    },
    {
        "recipeNumber": 63,
        "code": "TOMATO_SANDWICH",
        "outputItem": "Cooked Vegetable",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Cooking Station",
        "requiredTool": null,
        "toolDurabilityCost": null,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, Bread",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Food, Vegetable",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 180,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Food"
    },
    {
        "recipeNumber": 64,
        "code": "MUSHROOM_PIZZA",
        "outputItem": "Cooked Vegetable",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Cooking Station",
        "requiredTool": null,
        "toolDurabilityCost": null,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, Flour",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Food, Vegetable",
                "quantity": 1
            },
            {
                "slotIndex": 3,
                "tagQuery": "Food, Cheese",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 240,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Food"
    },
    {
        "recipeNumber": 65,
        "code": "TOMATO_PIZZA",
        "outputItem": "Cooked Vegetable",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Cooking Station",
        "requiredTool": null,
        "toolDurabilityCost": null,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, Flour",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Food, Vegetable",
                "quantity": 1
            },
            {
                "slotIndex": 3,
                "tagQuery": "Food, Cheese",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 240,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Food"
    },
    {
        "recipeNumber": 66,
        "code": "MEAT_PIZZA",
        "outputItem": "Cooked Meat",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Cooking Station",
        "requiredTool": null,
        "toolDurabilityCost": null,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, Flour",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Food, Raw Meat",
                "quantity": 1
            },
            {
                "slotIndex": 3,
                "tagQuery": "Food, Cheese",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 240,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Food"
    },
    {
        "recipeNumber": 67,
        "code": "APPLE_CAKE",
        "outputItem": "Fruit Dish",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Cooking Station",
        "requiredTool": null,
        "toolDurabilityCost": null,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, Flour",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Food, Sugar",
                "quantity": 1
            },
            {
                "slotIndex": 3,
                "tagQuery": "Food, Fruit",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 25,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 25, Player Skill Level)",
        "craftTimeSeconds": 240,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Food"
    },
    {
        "recipeNumber": 68,
        "code": "CHERRY_CAKE",
        "outputItem": "Fruit Dish",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Cooking Station",
        "requiredTool": null,
        "toolDurabilityCost": null,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, Flour",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Food, Sugar",
                "quantity": 1
            },
            {
                "slotIndex": 3,
                "tagQuery": "Food, Fruit",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 25,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 25, Player Skill Level)",
        "craftTimeSeconds": 240,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Food"
    },
    {
        "recipeNumber": 69,
        "code": "BERRY_CAKE",
        "outputItem": "Fruit Dish",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Cooking Station",
        "requiredTool": null,
        "toolDurabilityCost": null,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, Flour",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Food, Sugar",
                "quantity": 1
            },
            {
                "slotIndex": 3,
                "tagQuery": "Food, Fruit",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 25,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 25, Player Skill Level)",
        "craftTimeSeconds": 240,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Food"
    },
    {
        "recipeNumber": 70,
        "code": "CANNED_MEAT",
        "outputItem": "Canned Meat",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Cooking Station",
        "requiredTool": null,
        "toolDurabilityCost": null,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, Raw Meat",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Metal Scrap/Ore",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 240,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Food"
    },
    {
        "recipeNumber": 71,
        "code": "CANNED_TOMATO",
        "outputItem": "Cooked Vegetable",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Cooking Station",
        "requiredTool": null,
        "toolDurabilityCost": null,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, Vegetable",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Metal Scrap/Ore",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 240,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Food"
    },
    {
        "recipeNumber": 72,
        "code": "CANNED_PUMPKIN",
        "outputItem": "Cooked Vegetable",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Cooking Station",
        "requiredTool": null,
        "toolDurabilityCost": null,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, Vegetable",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Metal Scrap/Ore",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 240,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Food"
    },
    {
        "recipeNumber": 73,
        "code": "STEAMED_VEGETABLE_BASKET",
        "outputItem": "Steamed Vegetable Basket",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Cooking Station",
        "requiredTool": null,
        "toolDurabilityCost": null,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, Vegetable",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Food, Flour",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 180,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Food"
    },
    {
        "recipeNumber": 74,
        "code": "STEAMED_MEAT_BUNS",
        "outputItem": "Steamed Meat Buns",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Cooking Station",
        "requiredTool": null,
        "toolDurabilityCost": null,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, Raw Meat",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Food, Flour",
                "quantity": 2
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 180,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Food"
    },
    {
        "recipeNumber": 75,
        "code": "MEAT_BONE_RAMEN",
        "outputItem": "Meat Bone Ramen",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Cooking Station",
        "requiredTool": null,
        "toolDurabilityCost": null,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, Flour",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Bone",
                "quantity": 1
            },
            {
                "slotIndex": 3,
                "tagQuery": "Food, Water (Boiled/Filtered)",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 30,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 30, Player Skill Level)",
        "craftTimeSeconds": 240,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Food"
    },
    {
        "recipeNumber": 76,
        "code": "WATER_BOILED_FILTERED",
        "outputItem": "Water (Boiled/Filtered)",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Cooking Station",
        "requiredTool": null,
        "toolDurabilityCost": null,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, Contaminated Water",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 10,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 10, Player Skill Level)",
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Food"
    },
    {
        "recipeNumber": 77,
        "code": "MINERAL_WATER",
        "outputItem": "Mineral Water",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Cooking Station",
        "requiredTool": null,
        "toolDurabilityCost": null,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, Water (Boiled/Filtered)",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Gemstone",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Food"
    },
    {
        "recipeNumber": 78,
        "code": "APPLE_JUICE",
        "outputItem": "Fruit Dish",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Cooking Station",
        "requiredTool": null,
        "toolDurabilityCost": null,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, Fruit",
                "quantity": 2
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Food"
    },
    {
        "recipeNumber": 79,
        "code": "GRAPE_JUICE",
        "outputItem": "Fruit Dish",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Cooking Station",
        "requiredTool": null,
        "toolDurabilityCost": null,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, Fruit",
                "quantity": 2
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Food"
    },
    {
        "recipeNumber": 80,
        "code": "TOMATO_JUICE",
        "outputItem": "Vegetable Juice",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Cooking Station",
        "requiredTool": null,
        "toolDurabilityCost": null,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, Vegetable",
                "quantity": 2
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Food"
    },
    {
        "recipeNumber": 81,
        "code": "BERRY_SMOOTHIE",
        "outputItem": "Fruit Dish",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Cooking Station",
        "requiredTool": null,
        "toolDurabilityCost": null,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, Fruit",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Food, Water (Boiled/Filtered)",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 40,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 40, Player Skill Level)",
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Food"
    },
    {
        "recipeNumber": 82,
        "code": "FIG_SMOOTHIE",
        "outputItem": "Fruit Dish",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Cooking Station",
        "requiredTool": null,
        "toolDurabilityCost": null,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, Fruit",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Food, Water (Boiled/Filtered)",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 40,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 40, Player Skill Level)",
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Food"
    },
    {
        "recipeNumber": 83,
        "code": "CHERRY_SMOOTHIE",
        "outputItem": "Fruit Dish",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Cooking Station",
        "requiredTool": null,
        "toolDurabilityCost": null,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, Fruit",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Food, Water (Boiled/Filtered)",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 40,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 40, Player Skill Level)",
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Food"
    },
    {
        "recipeNumber": 84,
        "code": "COFFEE",
        "outputItem": "Coffee",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Cooking Station",
        "requiredTool": null,
        "toolDurabilityCost": null,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, Water (Boiled/Filtered)",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Seed",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 15,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 15, Player Skill Level)",
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Food"
    },
    {
        "recipeNumber": 85,
        "code": "GRAPE_WINE",
        "outputItem": "Fruit Dish",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Cooking Station",
        "requiredTool": null,
        "toolDurabilityCost": null,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, Fruit",
                "quantity": 3
            },
            {
                "slotIndex": 2,
                "tagQuery": "Food, Sugar",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 15,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 15, Player Skill Level)",
        "craftTimeSeconds": 240,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Food"
    },
    {
        "recipeNumber": 86,
        "code": "APPLE_WINE",
        "outputItem": "Fruit Dish",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Cooking Station",
        "requiredTool": null,
        "toolDurabilityCost": null,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, Fruit",
                "quantity": 3
            },
            {
                "slotIndex": 2,
                "tagQuery": "Food, Sugar",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 15,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 15, Player Skill Level)",
        "craftTimeSeconds": 240,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Food"
    },
    {
        "recipeNumber": 87,
        "code": "BERRY_WINE",
        "outputItem": "Fruit Dish",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Cooking Station",
        "requiredTool": null,
        "toolDurabilityCost": null,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, Fruit",
                "quantity": 3
            },
            {
                "slotIndex": 2,
                "tagQuery": "Food, Sugar",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 15,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 15, Player Skill Level)",
        "craftTimeSeconds": 240,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Food"
    },
    {
        "recipeNumber": 88,
        "code": "MOONSHINE",
        "outputItem": "Moonshine",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Cooking Station",
        "requiredTool": null,
        "toolDurabilityCost": null,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, Grain",
                "quantity": 3
            },
            {
                "slotIndex": 2,
                "tagQuery": "Food, Sugar",
                "quantity": 1
            },
            {
                "slotIndex": 3,
                "tagQuery": "Food, Yeast",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 40,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 40, Player Skill Level)",
        "craftTimeSeconds": 300,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Food"
    },
    {
        "recipeNumber": 89,
        "code": "BANDAGE",
        "outputItem": "Bandage",
        "outputCategory": "Medicine",
        "requiredJobCode": "cooking",
        "workstationAccess": "Medical Station",
        "requiredTool": null,
        "toolDurabilityCost": null,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Fabric",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 1,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 1, Player Skill Level)",
        "craftTimeSeconds": 180,
        "workstationQueueSlot": "Medical queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Medicine"
    },
    {
        "recipeNumber": 90,
        "code": "FIRST_AID_KIT",
        "outputItem": "First Aid Kit",
        "outputCategory": "Medicine",
        "requiredJobCode": "cooking",
        "workstationAccess": "Medical Station",
        "requiredTool": null,
        "toolDurabilityCost": null,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Medicine, Bandage",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Fabric",
                "quantity": 1
            },
            {
                "slotIndex": 3,
                "tagQuery": "Material, Rubber",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 10,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 10, Player Skill Level)",
        "craftTimeSeconds": 180,
        "workstationQueueSlot": "Medical queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Medicine"
    },
    {
        "recipeNumber": 91,
        "code": "ANTIBIOTIC",
        "outputItem": "Antibiotic",
        "outputCategory": "Medicine",
        "requiredJobCode": "cooking",
        "workstationAccess": "Medical Station",
        "requiredTool": null,
        "toolDurabilityCost": null,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, Vegetable",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Food, Water (Boiled/Filtered)",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 180,
        "workstationQueueSlot": "Medical queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Medicine"
    },
    {
        "recipeNumber": 92,
        "code": "PAINKILLER",
        "outputItem": "Painkiller",
        "outputCategory": "Medicine",
        "requiredJobCode": "cooking",
        "workstationAccess": "Medical Station",
        "requiredTool": null,
        "toolDurabilityCost": null,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Vegetable Seed or Vegetable Seed",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Food, Water (Boiled/Filtered)",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 180,
        "workstationQueueSlot": "Medical queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Medicine"
    },
    {
        "recipeNumber": 93,
        "code": "BOOSTER",
        "outputItem": "Booster",
        "outputCategory": "Medicine",
        "requiredJobCode": "cooking",
        "workstationAccess": "Medical Station",
        "requiredTool": null,
        "toolDurabilityCost": null,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Medicine, Antibiotic or Painkiller",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Food, Coffee",
                "quantity": 1
            },
            {
                "slotIndex": 3,
                "tagQuery": "Material, Rubber",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 30,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 30, Player Skill Level)",
        "craftTimeSeconds": 180,
        "workstationQueueSlot": "Medical queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Medicine"
    },
    {
        "recipeNumber": 94,
        "code": "AXE",
        "outputItem": "Axe",
        "outputCategory": "Tool",
        "requiredJobCode": "crafting",
        "workstationAccess": "Crafting Station",
        "requiredTool": "Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Wooden Handle",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Stone Tool Head or Metal Tool Head",
                "quantity": 1
            },
            {
                "slotIndex": 3,
                "tagQuery": "Material, Cordage",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 1,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 1, Player Skill Level)",
        "craftTimeSeconds": 300,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Gathering, Wood"
    },
    {
        "recipeNumber": 95,
        "code": "PICKAXE",
        "outputItem": "Pickaxe",
        "outputCategory": "Tool",
        "requiredJobCode": "crafting",
        "workstationAccess": "Crafting Station",
        "requiredTool": "Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Wooden Handle",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Stone Tool Head or Metal Tool Head",
                "quantity": 1
            },
            {
                "slotIndex": 3,
                "tagQuery": "Material, Cordage",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 1,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 1, Player Skill Level)",
        "craftTimeSeconds": 300,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Gathering, Ore, Stone"
    },
    {
        "recipeNumber": 96,
        "code": "SHOVEL",
        "outputItem": "Shovel",
        "outputCategory": "Tool",
        "requiredJobCode": "crafting",
        "workstationAccess": "Crafting Station",
        "requiredTool": "Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Wooden Handle",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Stone Tool Head or Metal Tool Head",
                "quantity": 1
            },
            {
                "slotIndex": 3,
                "tagQuery": "Material, Cordage",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 1,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 1, Player Skill Level)",
        "craftTimeSeconds": 300,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Gathering, Soil"
    },
    {
        "recipeNumber": 97,
        "code": "HOE",
        "outputItem": "Hoe",
        "outputCategory": "Tool",
        "requiredJobCode": "crafting",
        "workstationAccess": "Crafting Station",
        "requiredTool": "Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Wooden Handle",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Stone Tool Head or Metal Tool Head",
                "quantity": 1
            },
            {
                "slotIndex": 3,
                "tagQuery": "Material, Cordage",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 1,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 1, Player Skill Level)",
        "craftTimeSeconds": 300,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Gathering, Farm"
    },
    {
        "recipeNumber": 98,
        "code": "HAMMER",
        "outputItem": "Hammer",
        "outputCategory": "Tool",
        "requiredJobCode": "crafting",
        "workstationAccess": "Crafting Station",
        "requiredTool": "Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Wooden Handle",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Metal Tool Head",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 5,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 5, Player Skill Level)",
        "craftTimeSeconds": 300,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "CraftingTool"
    },
    {
        "recipeNumber": 99,
        "code": "SAW",
        "outputItem": "Saw",
        "outputCategory": "Tool",
        "requiredJobCode": "crafting",
        "workstationAccess": "Crafting Station",
        "requiredTool": "Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Wooden Handle",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Metal Ingot",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 10,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 10, Player Skill Level)",
        "craftTimeSeconds": 300,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "CraftingTool"
    },
    {
        "recipeNumber": 100,
        "code": "CROWBAR",
        "outputItem": "Crowbar",
        "outputCategory": "Tool",
        "requiredJobCode": "crafting",
        "workstationAccess": "Crafting Station",
        "requiredTool": "Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Metal Ingot",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Rubber",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 10,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 10, Player Skill Level)",
        "craftTimeSeconds": 300,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "CraftingTool"
    },
    {
        "recipeNumber": 101,
        "code": "GRILL_RACK",
        "outputItem": "Grill Rack",
        "outputCategory": "Tool",
        "requiredJobCode": "crafting",
        "workstationAccess": "Crafting Station",
        "requiredTool": "Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Metal Ingot",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Metal Nail",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 5,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 5, Player Skill Level)",
        "craftTimeSeconds": 300,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "CraftingTool, Cooking"
    },
    {
        "recipeNumber": 102,
        "code": "COOKING_POT",
        "outputItem": "Cooking Pot",
        "outputCategory": "Tool",
        "requiredJobCode": "crafting",
        "workstationAccess": "Crafting Station",
        "requiredTool": "Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Metal Ingot",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Rubber",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 10,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 10, Player Skill Level)",
        "craftTimeSeconds": 300,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "CraftingTool, Cooking"
    },
    {
        "recipeNumber": 103,
        "code": "LADLE",
        "outputItem": "Ladle",
        "outputCategory": "Tool",
        "requiredJobCode": "crafting",
        "workstationAccess": "Crafting Station",
        "requiredTool": "Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Metal Ingot",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Wooden Handle",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 5,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 5, Player Skill Level)",
        "craftTimeSeconds": 300,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "CraftingTool, Cooking"
    },
    {
        "recipeNumber": 104,
        "code": "DAGGER",
        "outputItem": "Dagger",
        "outputCategory": "Weapon",
        "requiredJobCode": "crafting",
        "workstationAccess": "Crafting Station",
        "requiredTool": "Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Stone Tool Head or Metal Tool Head",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Cordage",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 1,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 1, Player Skill Level)",
        "craftTimeSeconds": 360,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Melee"
    },
    {
        "recipeNumber": 105,
        "code": "SPEAR",
        "outputItem": "Spear",
        "outputCategory": "Weapon",
        "requiredJobCode": "crafting",
        "workstationAccess": "Crafting Station",
        "requiredTool": "Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Wooden Handle",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Stone Tool Head or Metal Tool Head",
                "quantity": 1
            },
            {
                "slotIndex": 3,
                "tagQuery": "Material, Cordage",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 1,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 1, Player Skill Level)",
        "craftTimeSeconds": 360,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Melee"
    },
    {
        "recipeNumber": 106,
        "code": "MACHETE",
        "outputItem": "Machete",
        "outputCategory": "Weapon",
        "requiredJobCode": "crafting",
        "workstationAccess": "Crafting Station",
        "requiredTool": "Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Metal Ingot",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Wooden Handle",
                "quantity": 1
            },
            {
                "slotIndex": 3,
                "tagQuery": "Material, Cordage",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 10,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 10, Player Skill Level)",
        "craftTimeSeconds": 360,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Melee"
    },
    {
        "recipeNumber": 107,
        "code": "CLUB",
        "outputItem": "Club",
        "outputCategory": "Weapon",
        "requiredJobCode": "crafting",
        "workstationAccess": "Crafting Station",
        "requiredTool": "Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Wood",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Metal Nail",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 1,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 1, Player Skill Level)",
        "craftTimeSeconds": 360,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Melee"
    },
    {
        "recipeNumber": 108,
        "code": "BOW",
        "outputItem": "Bow",
        "outputCategory": "Weapon",
        "requiredJobCode": "crafting",
        "workstationAccess": "Crafting Station",
        "requiredTool": "Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Wood",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Bowstring",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 1,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 1, Player Skill Level)",
        "craftTimeSeconds": 360,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Ranged"
    },
    {
        "recipeNumber": 109,
        "code": "CROSSBOW",
        "outputItem": "Crossbow",
        "outputCategory": "Weapon",
        "requiredJobCode": "crafting",
        "workstationAccess": "Crafting Station",
        "requiredTool": "Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Wood",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Bowstring",
                "quantity": 1
            },
            {
                "slotIndex": 3,
                "tagQuery": "Material, Metal Ingot",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 10,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 10, Player Skill Level)",
        "craftTimeSeconds": 360,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Ranged"
    },
    {
        "recipeNumber": 110,
        "code": "HANDGUN",
        "outputItem": "Handgun",
        "outputCategory": "Weapon",
        "requiredJobCode": "crafting",
        "workstationAccess": "Crafting Station",
        "requiredTool": "Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Metal Gun Barrel",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Metal Gun Frame",
                "quantity": 1
            },
            {
                "slotIndex": 3,
                "tagQuery": "Material, Rubber",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 360,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Ranged"
    },
    {
        "recipeNumber": 111,
        "code": "SHOTGUN",
        "outputItem": "Shotgun",
        "outputCategory": "Weapon",
        "requiredJobCode": "crafting",
        "workstationAccess": "Crafting Station",
        "requiredTool": "Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Metal Gun Barrel",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Wooden Handle",
                "quantity": 1
            },
            {
                "slotIndex": 3,
                "tagQuery": "Material, Metal Gun Frame",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 360,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Ranged"
    },
    {
        "recipeNumber": 112,
        "code": "RIFLE",
        "outputItem": "Rifle",
        "outputCategory": "Weapon",
        "requiredJobCode": "crafting",
        "workstationAccess": "Crafting Station",
        "requiredTool": "Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Metal Gun Barrel",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Metal Gun Frame",
                "quantity": 1
            },
            {
                "slotIndex": 3,
                "tagQuery": "Material, Wood",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 30,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 30, Player Skill Level)",
        "craftTimeSeconds": 360,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Ranged"
    },
    {
        "recipeNumber": 113,
        "code": "SMG",
        "outputItem": "SMG",
        "outputCategory": "Weapon",
        "requiredJobCode": "crafting",
        "workstationAccess": "Crafting Station",
        "requiredTool": "Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Metal Gun Barrel",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Metal Gun Frame",
                "quantity": 2
            },
            {
                "slotIndex": 3,
                "tagQuery": "Material, Rubber",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 30,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 30, Player Skill Level)",
        "craftTimeSeconds": 360,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Ranged"
    },
    {
        "recipeNumber": 114,
        "code": "ARROW",
        "outputItem": "Arrow",
        "outputCategory": "Ammo",
        "requiredJobCode": "crafting",
        "workstationAccess": "Crafting Station",
        "requiredTool": null,
        "toolDurabilityCost": null,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Wood",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Stone Tool Head or Metal Tool Head",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 1,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 1, Player Skill Level)",
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Instant craft",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Ammo"
    },
    {
        "recipeNumber": 115,
        "code": "HANDGUN_AMMO",
        "outputItem": "Handgun Ammo",
        "outputCategory": "Ammo",
        "requiredJobCode": "crafting",
        "workstationAccess": "Crafting Station",
        "requiredTool": null,
        "toolDurabilityCost": null,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Metal Ingot",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Gunpowder",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Instant craft",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Ammo"
    },
    {
        "recipeNumber": 116,
        "code": "SHOTGUN_AMMO",
        "outputItem": "Shotgun Ammo",
        "outputCategory": "Ammo",
        "requiredJobCode": "crafting",
        "workstationAccess": "Crafting Station",
        "requiredTool": null,
        "toolDurabilityCost": null,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Metal Ingot",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Gunpowder",
                "quantity": 2
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Instant craft",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Ammo"
    },
    {
        "recipeNumber": 117,
        "code": "RIFLE_AMMO",
        "outputItem": "Rifle Ammo",
        "outputCategory": "Ammo",
        "requiredJobCode": "crafting",
        "workstationAccess": "Crafting Station",
        "requiredTool": null,
        "toolDurabilityCost": null,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Metal Ingot",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Gunpowder",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 30,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 30, Player Skill Level)",
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Instant craft",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Ammo"
    },
    {
        "recipeNumber": 118,
        "code": "SMG_AMMO",
        "outputItem": "SMG Ammo",
        "outputCategory": "Ammo",
        "requiredJobCode": "crafting",
        "workstationAccess": "Crafting Station",
        "requiredTool": null,
        "toolDurabilityCost": null,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Metal Ingot",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Gunpowder",
                "quantity": 2
            }
        ],
        "requiredSkillLevel": 30,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 30, Player Skill Level)",
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Instant craft",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Ammo"
    },
    {
        "recipeNumber": 119,
        "code": "COMBATING_VEST",
        "outputItem": "Combating Vest",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Crafting Station",
        "requiredTool": "Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Leather",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Padding",
                "quantity": 1
            },
            {
                "slotIndex": 3,
                "tagQuery": "Material, Metal Ingot",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 10,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 10, Player Skill Level)",
        "craftTimeSeconds": 360,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Combating, Vest"
    },
    {
        "recipeNumber": 120,
        "code": "COMBATING_HEAD",
        "outputItem": "Combating Head",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Crafting Station",
        "requiredTool": "Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Leather",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Padding",
                "quantity": 1
            },
            {
                "slotIndex": 3,
                "tagQuery": "Material, Metal Ingot",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 10,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 10, Player Skill Level)",
        "craftTimeSeconds": 360,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Combating, Head"
    },
    {
        "recipeNumber": 121,
        "code": "COMBATING_UPPERBODY",
        "outputItem": "Combating UpperBody",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Crafting Station",
        "requiredTool": "Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Leather",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Padding",
                "quantity": 1
            },
            {
                "slotIndex": 3,
                "tagQuery": "Material, Metal Ingot",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 10,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 10, Player Skill Level)",
        "craftTimeSeconds": 360,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Combating, UpperBody"
    },
    {
        "recipeNumber": 122,
        "code": "COMBATING_LOWERBODY",
        "outputItem": "Combating LowerBody",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Crafting Station",
        "requiredTool": "Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Leather",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Padding",
                "quantity": 1
            },
            {
                "slotIndex": 3,
                "tagQuery": "Material, Metal Ingot",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 10,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 10, Player Skill Level)",
        "craftTimeSeconds": 360,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Combating, LowerBody"
    },
    {
        "recipeNumber": 123,
        "code": "COMBATING_HAND",
        "outputItem": "Combating Hand",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Crafting Station",
        "requiredTool": "Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Leather",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Padding",
                "quantity": 1
            },
            {
                "slotIndex": 3,
                "tagQuery": "Material, Metal Ingot",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 10,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 10, Player Skill Level)",
        "craftTimeSeconds": 360,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Combating, Hand"
    },
    {
        "recipeNumber": 124,
        "code": "COMBATING_LEG",
        "outputItem": "Combating Leg",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Crafting Station",
        "requiredTool": "Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Leather",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Padding",
                "quantity": 1
            },
            {
                "slotIndex": 3,
                "tagQuery": "Material, Metal Ingot",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 10,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 10, Player Skill Level)",
        "craftTimeSeconds": 360,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Combating, Leg"
    },
    {
        "recipeNumber": 125,
        "code": "COOKING_VEST",
        "outputItem": "Cooking Vest",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Crafting Station",
        "requiredTool": "Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Fabric Panel",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Padding",
                "quantity": 1
            },
            {
                "slotIndex": 3,
                "tagQuery": "Material, Cordage",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 5,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 5, Player Skill Level)",
        "craftTimeSeconds": 360,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Cooking, Vest"
    },
    {
        "recipeNumber": 126,
        "code": "COOKING_HEAD",
        "outputItem": "Cooking Head",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Crafting Station",
        "requiredTool": "Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Fabric Panel",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Padding",
                "quantity": 1
            },
            {
                "slotIndex": 3,
                "tagQuery": "Material, Cordage",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 5,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 5, Player Skill Level)",
        "craftTimeSeconds": 360,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Cooking, Head"
    },
    {
        "recipeNumber": 127,
        "code": "COOKING_UPPERBODY",
        "outputItem": "Cooking UpperBody",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Crafting Station",
        "requiredTool": "Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Fabric Panel",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Padding",
                "quantity": 1
            },
            {
                "slotIndex": 3,
                "tagQuery": "Material, Cordage",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 5,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 5, Player Skill Level)",
        "craftTimeSeconds": 360,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Cooking, UpperBody"
    },
    {
        "recipeNumber": 128,
        "code": "COOKING_LOWERBODY",
        "outputItem": "Cooking LowerBody",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Crafting Station",
        "requiredTool": "Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Fabric Panel",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Padding",
                "quantity": 1
            },
            {
                "slotIndex": 3,
                "tagQuery": "Material, Cordage",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 5,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 5, Player Skill Level)",
        "craftTimeSeconds": 360,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Cooking, LowerBody"
    },
    {
        "recipeNumber": 129,
        "code": "COOKING_HAND",
        "outputItem": "Cooking Hand",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Crafting Station",
        "requiredTool": "Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Fabric Panel",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Padding",
                "quantity": 1
            },
            {
                "slotIndex": 3,
                "tagQuery": "Material, Cordage",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 5,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 5, Player Skill Level)",
        "craftTimeSeconds": 360,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Cooking, Hand"
    },
    {
        "recipeNumber": 130,
        "code": "COOKING_LEG",
        "outputItem": "Cooking Leg",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Crafting Station",
        "requiredTool": "Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Fabric Panel",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Padding",
                "quantity": 1
            },
            {
                "slotIndex": 3,
                "tagQuery": "Material, Cordage",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 5,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 5, Player Skill Level)",
        "craftTimeSeconds": 360,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Cooking, Leg"
    },
    {
        "recipeNumber": 131,
        "code": "SCAVENGING_VEST",
        "outputItem": "Scavenging Vest",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Crafting Station",
        "requiredTool": "Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Leather",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Padding",
                "quantity": 1
            },
            {
                "slotIndex": 3,
                "tagQuery": "Material, Cordage",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 5,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 5, Player Skill Level)",
        "craftTimeSeconds": 360,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Scavenging, Vest"
    },
    {
        "recipeNumber": 132,
        "code": "SCAVENGING_HEAD",
        "outputItem": "Scavenging Head",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Crafting Station",
        "requiredTool": "Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Leather",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Padding",
                "quantity": 1
            },
            {
                "slotIndex": 3,
                "tagQuery": "Material, Cordage",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 5,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 5, Player Skill Level)",
        "craftTimeSeconds": 360,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Scavenging, Head"
    },
    {
        "recipeNumber": 133,
        "code": "SCAVENGING_UPPERBODY",
        "outputItem": "Scavenging UpperBody",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Crafting Station",
        "requiredTool": "Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Leather",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Padding",
                "quantity": 1
            },
            {
                "slotIndex": 3,
                "tagQuery": "Material, Cordage",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 5,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 5, Player Skill Level)",
        "craftTimeSeconds": 360,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Scavenging, UpperBody"
    },
    {
        "recipeNumber": 134,
        "code": "SCAVENGING_LOWERBODY",
        "outputItem": "Scavenging LowerBody",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Crafting Station",
        "requiredTool": "Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Leather",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Padding",
                "quantity": 1
            },
            {
                "slotIndex": 3,
                "tagQuery": "Material, Cordage",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 5,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 5, Player Skill Level)",
        "craftTimeSeconds": 360,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Scavenging, LowerBody"
    },
    {
        "recipeNumber": 135,
        "code": "SCAVENGING_HAND",
        "outputItem": "Scavenging Hand",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Crafting Station",
        "requiredTool": "Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Leather",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Padding",
                "quantity": 1
            },
            {
                "slotIndex": 3,
                "tagQuery": "Material, Cordage",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 5,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 5, Player Skill Level)",
        "craftTimeSeconds": 360,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Scavenging, Hand"
    },
    {
        "recipeNumber": 136,
        "code": "SCAVENGING_LEG",
        "outputItem": "Scavenging Leg",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Crafting Station",
        "requiredTool": "Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Leather",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Padding",
                "quantity": 1
            },
            {
                "slotIndex": 3,
                "tagQuery": "Material, Cordage",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 5,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 5, Player Skill Level)",
        "craftTimeSeconds": 360,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Scavenging, Leg"
    },
    {
        "recipeNumber": 137,
        "code": "GATHERING_VEST",
        "outputItem": "Gathering Vest",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Crafting Station",
        "requiredTool": "Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Fabric Panel",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Padding",
                "quantity": 1
            },
            {
                "slotIndex": 3,
                "tagQuery": "Material, Cordage",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 5,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 5, Player Skill Level)",
        "craftTimeSeconds": 360,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Gathering, Vest"
    },
    {
        "recipeNumber": 138,
        "code": "GATHERING_HEAD",
        "outputItem": "Gathering Head",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Crafting Station",
        "requiredTool": "Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Fabric Panel",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Padding",
                "quantity": 1
            },
            {
                "slotIndex": 3,
                "tagQuery": "Material, Cordage",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 5,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 5, Player Skill Level)",
        "craftTimeSeconds": 360,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Gathering, Head"
    },
    {
        "recipeNumber": 139,
        "code": "GATHERING_UPPERBODY",
        "outputItem": "Gathering UpperBody",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Crafting Station",
        "requiredTool": "Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Fabric Panel",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Padding",
                "quantity": 1
            },
            {
                "slotIndex": 3,
                "tagQuery": "Material, Cordage",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 5,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 5, Player Skill Level)",
        "craftTimeSeconds": 360,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Gathering, UpperBody"
    },
    {
        "recipeNumber": 140,
        "code": "GATHERING_LOWERBODY",
        "outputItem": "Gathering LowerBody",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Crafting Station",
        "requiredTool": "Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Fabric Panel",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Padding",
                "quantity": 1
            },
            {
                "slotIndex": 3,
                "tagQuery": "Material, Cordage",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 5,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 5, Player Skill Level)",
        "craftTimeSeconds": 360,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Gathering, LowerBody"
    },
    {
        "recipeNumber": 141,
        "code": "GATHERING_HAND",
        "outputItem": "Gathering Hand",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Crafting Station",
        "requiredTool": "Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Fabric Panel",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Padding",
                "quantity": 1
            },
            {
                "slotIndex": 3,
                "tagQuery": "Material, Cordage",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 5,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 5, Player Skill Level)",
        "craftTimeSeconds": 360,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Gathering, Hand"
    },
    {
        "recipeNumber": 142,
        "code": "GATHERING_LEG",
        "outputItem": "Gathering Leg",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Crafting Station",
        "requiredTool": "Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Fabric Panel",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Padding",
                "quantity": 1
            },
            {
                "slotIndex": 3,
                "tagQuery": "Material, Cordage",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 5,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 5, Player Skill Level)",
        "craftTimeSeconds": 360,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Gathering, Leg"
    },
    {
        "recipeNumber": 143,
        "code": "BUILDING_VEST",
        "outputItem": "Building Vest",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Crafting Station",
        "requiredTool": "Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Leather",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Padding",
                "quantity": 1
            },
            {
                "slotIndex": 3,
                "tagQuery": "Material, Cordage",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 10,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 10, Player Skill Level)",
        "craftTimeSeconds": 360,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Building, Vest"
    },
    {
        "recipeNumber": 144,
        "code": "BUILDING_HEAD",
        "outputItem": "Building Head",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Crafting Station",
        "requiredTool": "Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Leather",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Padding",
                "quantity": 1
            },
            {
                "slotIndex": 3,
                "tagQuery": "Material, Cordage",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 10,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 10, Player Skill Level)",
        "craftTimeSeconds": 360,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Building, Head"
    },
    {
        "recipeNumber": 145,
        "code": "BUILDING_UPPERBODY",
        "outputItem": "Building UpperBody",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Crafting Station",
        "requiredTool": "Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Leather",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Padding",
                "quantity": 1
            },
            {
                "slotIndex": 3,
                "tagQuery": "Material, Cordage",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 10,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 10, Player Skill Level)",
        "craftTimeSeconds": 360,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Building, UpperBody"
    },
    {
        "recipeNumber": 146,
        "code": "BUILDING_LOWERBODY",
        "outputItem": "Building LowerBody",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Crafting Station",
        "requiredTool": "Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Leather",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Padding",
                "quantity": 1
            },
            {
                "slotIndex": 3,
                "tagQuery": "Material, Cordage",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 10,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 10, Player Skill Level)",
        "craftTimeSeconds": 360,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Building, LowerBody"
    },
    {
        "recipeNumber": 147,
        "code": "BUILDING_HAND",
        "outputItem": "Building Hand",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Crafting Station",
        "requiredTool": "Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Leather",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Padding",
                "quantity": 1
            },
            {
                "slotIndex": 3,
                "tagQuery": "Material, Cordage",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 10,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 10, Player Skill Level)",
        "craftTimeSeconds": 360,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Building, Hand"
    },
    {
        "recipeNumber": 148,
        "code": "BUILDING_LEG",
        "outputItem": "Building Leg",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Crafting Station",
        "requiredTool": "Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Leather",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Padding",
                "quantity": 1
            },
            {
                "slotIndex": 3,
                "tagQuery": "Material, Cordage",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 10,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 10, Player Skill Level)",
        "craftTimeSeconds": 360,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Building, Leg"
    },
    {
        "recipeNumber": 149,
        "code": "CRAFTING_VEST",
        "outputItem": "Crafting Vest",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Crafting Station",
        "requiredTool": "Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Fabric Panel",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Padding",
                "quantity": 1
            },
            {
                "slotIndex": 3,
                "tagQuery": "Material, Cordage",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 10,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 10, Player Skill Level)",
        "craftTimeSeconds": 360,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Crafting, Vest"
    },
    {
        "recipeNumber": 150,
        "code": "CRAFTING_HEAD",
        "outputItem": "Crafting Head",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Crafting Station",
        "requiredTool": "Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Fabric Panel",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Padding",
                "quantity": 1
            },
            {
                "slotIndex": 3,
                "tagQuery": "Material, Cordage",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 10,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 10, Player Skill Level)",
        "craftTimeSeconds": 360,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Crafting, Head"
    },
    {
        "recipeNumber": 151,
        "code": "CRAFTING_UPPERBODY",
        "outputItem": "Crafting UpperBody",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Crafting Station",
        "requiredTool": "Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Fabric Panel",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Padding",
                "quantity": 1
            },
            {
                "slotIndex": 3,
                "tagQuery": "Material, Cordage",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 10,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 10, Player Skill Level)",
        "craftTimeSeconds": 360,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Crafting, UpperBody"
    },
    {
        "recipeNumber": 152,
        "code": "CRAFTING_LOWERBODY",
        "outputItem": "Crafting LowerBody",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Crafting Station",
        "requiredTool": "Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Fabric Panel",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Padding",
                "quantity": 1
            },
            {
                "slotIndex": 3,
                "tagQuery": "Material, Cordage",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 10,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 10, Player Skill Level)",
        "craftTimeSeconds": 360,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Crafting, LowerBody"
    },
    {
        "recipeNumber": 153,
        "code": "CRAFTING_HAND",
        "outputItem": "Crafting Hand",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Crafting Station",
        "requiredTool": "Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Fabric Panel",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Padding",
                "quantity": 1
            },
            {
                "slotIndex": 3,
                "tagQuery": "Material, Cordage",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 10,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 10, Player Skill Level)",
        "craftTimeSeconds": 360,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Crafting, Hand"
    },
    {
        "recipeNumber": 154,
        "code": "CRAFTING_LEG",
        "outputItem": "Crafting Leg",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Crafting Station",
        "requiredTool": "Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Fabric Panel",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Padding",
                "quantity": 1
            },
            {
                "slotIndex": 3,
                "tagQuery": "Material, Cordage",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 10,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 10, Player Skill Level)",
        "craftTimeSeconds": 360,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Crafting, Leg"
    },
    {
        "recipeNumber": 155,
        "code": "RING",
        "outputItem": "Ring",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Crafting Station",
        "requiredTool": "Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Metal Ingot",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Gemstone",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 15,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 15, Player Skill Level)",
        "craftTimeSeconds": 240,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Jewelry"
    },
    {
        "recipeNumber": 156,
        "code": "NECKLACE",
        "outputItem": "Necklace",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Crafting Station",
        "requiredTool": "Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Metal Ingot",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Gemstone",
                "quantity": 1
            },
            {
                "slotIndex": 3,
                "tagQuery": "Material, Cordage",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 15,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 15, Player Skill Level)",
        "craftTimeSeconds": 240,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Jewelry"
    },
    {
        "recipeNumber": 157,
        "code": "BACKPACK",
        "outputItem": "Backpack",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Crafting Station",
        "requiredTool": "Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Fabric Panel",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Cordage",
                "quantity": 2
            },
            {
                "slotIndex": 3,
                "tagQuery": "Material, Padding",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 10,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 10, Player Skill Level)",
        "craftTimeSeconds": 300,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Utility, Backpack"
    },
    {
        "recipeNumber": 158,
        "code": "TENT",
        "outputItem": "Tent",
        "outputCategory": "Building",
        "requiredJobCode": "building",
        "workstationAccess": "Building Station",
        "requiredTool": "Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Fabric Panel",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Wood",
                "quantity": 2
            },
            {
                "slotIndex": 3,
                "tagQuery": "Material, Cordage",
                "quantity": 2
            }
        ],
        "requiredSkillLevel": 1,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 1, Player Skill Level)",
        "craftTimeSeconds": 600,
        "workstationQueueSlot": "Building queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Structure"
    },
    {
        "recipeNumber": 159,
        "code": "BED",
        "outputItem": "Bed",
        "outputCategory": "Building",
        "requiredJobCode": "building",
        "workstationAccess": "Building Station",
        "requiredTool": "Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Wood",
                "quantity": 3
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Padding",
                "quantity": 2
            },
            {
                "slotIndex": 3,
                "tagQuery": "Material, Fabric Panel",
                "quantity": 2
            }
        ],
        "requiredSkillLevel": 5,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 5, Player Skill Level)",
        "craftTimeSeconds": 600,
        "workstationQueueSlot": "Building queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Structure"
    },
    {
        "recipeNumber": 160,
        "code": "FURNITURE_SET",
        "outputItem": "Furniture Set",
        "outputCategory": "Building",
        "requiredJobCode": "building",
        "workstationAccess": "Building Station",
        "requiredTool": "Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Wood",
                "quantity": 4
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Fabric Panel",
                "quantity": 2
            },
            {
                "slotIndex": 3,
                "tagQuery": "Material, Metal Nail",
                "quantity": 2
            }
        ],
        "requiredSkillLevel": 10,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 10, Player Skill Level)",
        "craftTimeSeconds": 600,
        "workstationQueueSlot": "Building queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Structure"
    },
    {
        "recipeNumber": 161,
        "code": "STORAGE_CONTAINER",
        "outputItem": "Storage Container",
        "outputCategory": "Building",
        "requiredJobCode": "building",
        "workstationAccess": "Building Station",
        "requiredTool": "Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Wood",
                "quantity": 3
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Metal Nail",
                "quantity": 2
            }
        ],
        "requiredSkillLevel": 5,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 5, Player Skill Level)",
        "craftTimeSeconds": 600,
        "workstationQueueSlot": "Building queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Structure"
    },
    {
        "recipeNumber": 162,
        "code": "COOKING_STATION",
        "outputItem": "Cooking Station",
        "outputCategory": "Building",
        "requiredJobCode": "building",
        "workstationAccess": "Building Station",
        "requiredTool": "Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Stone",
                "quantity": 3
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Metal Ingot",
                "quantity": 2
            },
            {
                "slotIndex": 3,
                "tagQuery": "Tool, Cooking Pot",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 5,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 5, Player Skill Level)",
        "craftTimeSeconds": 600,
        "workstationQueueSlot": "Building queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Structure"
    },
    {
        "recipeNumber": 163,
        "code": "CRAFTING_STATION",
        "outputItem": "Crafting Station",
        "outputCategory": "Building",
        "requiredJobCode": "building",
        "workstationAccess": "Building Station",
        "requiredTool": "Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Wood",
                "quantity": 3
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Metal Ingot",
                "quantity": 2
            },
            {
                "slotIndex": 3,
                "tagQuery": "Tool, Hammer",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 5,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 5, Player Skill Level)",
        "craftTimeSeconds": 600,
        "workstationQueueSlot": "Building queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Structure"
    },
    {
        "recipeNumber": 164,
        "code": "MEDICAL_STATION",
        "outputItem": "Medical Station",
        "outputCategory": "Building",
        "requiredJobCode": "building",
        "workstationAccess": "Building Station",
        "requiredTool": "Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Wood",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Fabric Panel",
                "quantity": 2
            },
            {
                "slotIndex": 3,
                "tagQuery": "Medicine, First Aid Kit",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 15,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 15, Player Skill Level)",
        "craftTimeSeconds": 600,
        "workstationQueueSlot": "Building queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Structure"
    },
    {
        "recipeNumber": 165,
        "code": "SMELTING_STATION",
        "outputItem": "Smelting Station",
        "outputCategory": "Building",
        "requiredJobCode": "building",
        "workstationAccess": "Building Station",
        "requiredTool": "Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Stone",
                "quantity": 4
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Metal Ingot",
                "quantity": 2
            },
            {
                "slotIndex": 3,
                "tagQuery": "Tool, Ladle",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 15,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 15, Player Skill Level)",
        "craftTimeSeconds": 600,
        "workstationQueueSlot": "Building queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Structure"
    },
    {
        "recipeNumber": 166,
        "code": "WOODEN_STRUCTURE",
        "outputItem": "Wooden Structure",
        "outputCategory": "Building",
        "requiredJobCode": "building",
        "workstationAccess": "Building Station",
        "requiredTool": "Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Wood",
                "quantity": 5
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Wooden Nail",
                "quantity": 3
            }
        ],
        "requiredSkillLevel": 1,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 1, Player Skill Level)",
        "craftTimeSeconds": 600,
        "workstationQueueSlot": "Building queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Structure"
    },
    {
        "recipeNumber": 167,
        "code": "WOODEN_FENCE",
        "outputItem": "Wooden Fence",
        "outputCategory": "Building",
        "requiredJobCode": "building",
        "workstationAccess": "Building Station",
        "requiredTool": "Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Wood",
                "quantity": 3
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Wooden Nail",
                "quantity": 2
            }
        ],
        "requiredSkillLevel": 1,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 1, Player Skill Level)",
        "craftTimeSeconds": 600,
        "workstationQueueSlot": "Building queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Structure"
    },
    {
        "recipeNumber": 168,
        "code": "STONE_STRUCTURE",
        "outputItem": "Stone Structure",
        "outputCategory": "Building",
        "requiredJobCode": "building",
        "workstationAccess": "Building Station",
        "requiredTool": "Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Stone",
                "quantity": 5
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Metal Nail",
                "quantity": 2
            }
        ],
        "requiredSkillLevel": 10,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 10, Player Skill Level)",
        "craftTimeSeconds": 600,
        "workstationQueueSlot": "Building queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Structure"
    },
    {
        "recipeNumber": 169,
        "code": "STONE_FENCE",
        "outputItem": "Stone Fence",
        "outputCategory": "Building",
        "requiredJobCode": "building",
        "workstationAccess": "Building Station",
        "requiredTool": "Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Stone",
                "quantity": 3
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Metal Nail",
                "quantity": 2
            }
        ],
        "requiredSkillLevel": 10,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 10, Player Skill Level)",
        "craftTimeSeconds": 600,
        "workstationQueueSlot": "Building queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Structure"
    }
];

async function seedLevelingRules() {
    const count = await dbPool.query('SELECT COUNT(*) FROM leveling_rules;');
    if (parseInt(count.rows[0].count) > 0) return;

    const insertQuery = `
        INSERT INTO leveling_rules
            (level, player_exp_required, total_player_exp, skill_exp_required,
             total_skill_exp, breakthrough_time, notes)
        VALUES ($1,$2,$3,$4,$5,$6,$7);
    `;
    for (const rule of LEVELING_RULES) {
        await dbPool.query(insertQuery, [
            rule.level,
            rule.playerExp,
            rule.totalPlayerExp,
            rule.skillExp,
            rule.totalSkillExp,
            rule.breakthroughTime || null,
            rule.notes || null,
        ]);
    }
}

async function seedCurelRules() {
    const powerCount = await dbPool.query('SELECT COUNT(*) FROM curel_item_power_matrix;');
    if (parseInt(powerCount.rows[0].count) === 0) {
        const powerQuery = `
            INSERT INTO curel_item_power_matrix
                (item_level, base_item_power, common_power, uncommon_power, rare_power, epic_power, legendary_power)
            VALUES ($1,$2,$3,$4,$5,$6,$7);
        `;
        for (const row of CUREL_ITEM_POWER_MATRIX) {
            await dbPool.query(powerQuery, [
                row.itemLevel,
                row.baseItemPower,
                row.common,
                row.uncommon,
                row.rare,
                row.epic,
                row.legendary,
            ]);
        }
    }

    const weightCount = await dbPool.query('SELECT COUNT(*) FROM curel_rarity_weights;');
    if (parseInt(weightCount.rows[0].count) === 0) {
        const weightQuery = `
            INSERT INTO curel_rarity_weights
                (curel_level, common_weight, uncommon_weight, rare_weight, epic_weight, legendary_weight, total_weight)
            VALUES ($1,$2,$3,$4,$5,$6,$7);
        `;
        for (const row of CUREL_RARITY_WEIGHTS) {
            await dbPool.query(weightQuery, [
                row.curelLevel,
                row.commonWeight,
                row.uncommonWeight,
                row.rareWeight,
                row.epicWeight,
                row.legendaryWeight,
                row.totalWeight,
            ]);
        }
    }
}

async function seedItemTypeRules() {
    const count = await dbPool.query('SELECT COUNT(*) FROM item_type_rules;');
    if (parseInt(count.rows[0].count) > 0) return;

    const insertQuery = `
        INSERT INTO item_type_rules (main_tag, sub_tags, item_count)
        VALUES ($1,$2,$3);
    `;
    for (const rule of ITEM_TYPE_RULES) {
        await dbPool.query(insertQuery, [rule.mainTag, rule.subTags, rule.itemCount]);
    }
}

async function seedStatDefinitions() {
    const count = await dbPool.query('SELECT COUNT(*) FROM stat_definitions;');
    if (parseInt(count.rows[0].count) > 0) return;

    const insertQuery = `
        INSERT INTO stat_definitions (stat_type, code, full_name, purpose, notes)
        VALUES ($1,$2,$3,$4,$5);
    `;
    for (const stat of STAT_DEFINITIONS) {
        await dbPool.query(insertQuery, [
            stat.statType,
            stat.code,
            stat.fullName,
            stat.purpose || null,
            stat.notes || null,
        ]);
    }
}

async function seedCraftingRecipes() {
    const count = await dbPool.query('SELECT COUNT(*) FROM recipes;');
    if (parseInt(count.rows[0].count) > 0) return;

    const recipeQuery = `
        INSERT INTO recipes
            (code, recipe_number, output_template_id, output_category, output_qty,
             required_job_id, required_job_level, base_craft_time_s, workstation_access,
             required_tool_name, tool_durability_cost, output_level_formula,
             workstation_queue_slot, curel_rule_key, design_notes, main_material_slots,
             curel_mechanic, required_use_case_tags, is_auto_unlock)
        VALUES ($1,$2,$3,$4,1,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,TRUE)
        RETURNING id;
    `;
    const inputQuery = `
        INSERT INTO recipe_tag_inputs (recipe_id, slot_index, tag_query, quantity)
        VALUES ($1,$2,$3,$4);
    `;

    for (const recipe of CRAFTING_RECIPES) {
        const templateResult = await dbPool.query(
            'SELECT id FROM item_templates WHERE display_name = $1;',
            [recipe.outputItem]
        );
        if (templateResult.rows.length === 0) {
            console.warn(`[WARN] Bo qua recipe vi khong tim thay output item: ${recipe.outputItem}`);
            continue;
        }

        const jobResult = await dbPool.query(
            'SELECT id FROM jobs_seed WHERE code = $1;',
            [recipe.requiredJobCode]
        );
        const requiredJobId = jobResult.rows[0]?.id || null;

        const insertedRecipe = await dbPool.query(recipeQuery, [
            recipe.code,
            recipe.recipeNumber,
            templateResult.rows[0].id,
            recipe.outputCategory,
            requiredJobId,
            recipe.requiredSkillLevel,
            recipe.craftTimeSeconds,
            recipe.workstationAccess || null,
            recipe.requiredTool || null,
            recipe.toolDurabilityCost,
            recipe.outputLevelFormula || null,
            recipe.workstationQueueSlot || null,
            recipe.curelRuleKey || null,
            recipe.designNotes || null,
            recipe.mainMaterialSlots || null,
            recipe.curelMechanic || null,
            recipe.requiredUseCaseTags || null,
        ]);

        for (const input of recipe.inputs) {
            await dbPool.query(inputQuery, [
                insertedRecipe.rows[0].id,
                input.slotIndex,
                input.tagQuery,
                input.quantity,
            ]);
        }
    }
}

async function seedDesignDatabase() {
    console.log('[INFO] Dang nap database thiet ke tu Zystem_ Data_design.xlsx...');
    try {
        await seedCurelRules();
        await seedItemTypeRules();
        await seedStatDefinitions();
        console.log('[SUCCESS] Da nap database thiet ke hoan chinh.');
        return true;
    } catch (error) {
        console.error('[ERROR] Loi khi nap database thiet ke:', error.message);
        return false;
    }
}

module.exports = {
    seedDesignDatabase,
    LEVELING_RULES,
    CUREL_ITEM_POWER_MATRIX,
    CUREL_RARITY_WEIGHTS,
    ITEM_TYPE_RULES,
    STAT_DEFINITIONS,
    CRAFTING_RECIPES,
};
