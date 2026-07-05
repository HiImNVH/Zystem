// backend/src/repositories/repositories.designSeed.js

const { dbPool } = require('./repositories.database');

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
        "mainTag": "Rubbish",
        "subTags": [
            "Recyclable",
            "Metal",
            "Zinc",
            "Copper",
            "Iron",
            "Aluminum",
            "Glass",
            "Plastic",
            "Wood",
            "NotRecyclable",
            "Rubber",
            "Fabric",
            "Infected"
        ],
        "itemCount": 24
    },
    {
        "mainTag": "Material",
        "subTags": [
            "Dirt",
            "Sand",
            "Glass",
            "Plastic",
            "Branch",
            "Oak",
            "Pine",
            "Maple",
            "Sycamore",
            "Willow",
            "Leaf",
            "Log",
            "Big",
            "Infected",
            "Stone",
            "Pebble",
            "Boulder",
            "Amethys",
            "Ore",
            "Copper",
            "Iron",
            "Zinc",
            "Aluminum",
            "Mineral",
            "Sulfur",
            "Saltpeter",
            "Metal",
            "Bone",
            "Rat",
            "Pigeon",
            "Stray Dog",
            "Feral Cat",
            "Deer",
            "Leather",
            "Processed",
            "Wood",
            "Charcoal",
            "Fabric",
            "Rubber",
            "Cordage",
            "Component",
            "Handle",
            "Tool Head",
            "Bowstring",
            "Gun Barrel",
            "Gun Frame",
            "Fabric Panel",
            "Padding",
            "Gunpowder"
        ],
        "itemCount": 69
    },
    {
        "mainTag": "Seed",
        "subTags": [
            "Plantable",
            "Dandelion",
            "Wild",
            "Feral",
            "Pumpkin",
            "Bramble",
            "Wheat",
            "Oat",
            "Corn"
        ],
        "itemCount": 8
    },
    {
        "mainTag": "Food",
        "subTags": [
            "Meat",
            "Rat",
            "Raw",
            "Pigeon",
            "Stray Dog",
            "Feral Cat",
            "Deer",
            "Vegetable",
            "Dandelion",
            "Wild",
            "Feral",
            "Cellar",
            "Overgrown",
            "Fruit",
            "Park",
            "Bramble",
            "Alley",
            "Grain",
            "Wheat",
            "Oat",
            "Corn",
            "Flour",
            "Processed",
            "Dried",
            "Smoked",
            "Spice",
            "Salt",
            "Sugar",
            "Vinegar",
            "Soysauce",
            "Yeast",
            "Butter",
            "Cheese",
            "Oil",
            "Pumpkin",
            "Grilling",
            "Boiling",
            "Mushroom",
            "Noodle",
            "Tomato",
            "Frying",
            "Bread",
            "Burger",
            "Sandwich",
            "Pizza",
            "Cake",
            "Apple",
            "Cherry",
            "Berry",
            "Canned",
            "Steaming",
            "Ramen"
        ],
        "itemCount": 96
    },
    {
        "mainTag": "Drink",
        "subTags": [
            "Infected",
            "Processed",
            "Juice",
            "Apple",
            "Grape",
            "Tomato",
            "Smoothie",
            "Berry",
            "Fig",
            "Cherry",
            "Coffee",
            "Alcohol"
        ],
        "itemCount": 14
    },
    {
        "mainTag": "Medicine",
        "subTags": [
            "Bandage",
            "FirstaidKit",
            "Antibiotic",
            "Painkiller",
            "Booster"
        ],
        "itemCount": 6
    },
    {
        "mainTag": "Tool",
        "subTags": [
            "Axe",
            "Pickaxe",
            "Shovel",
            "Hoe",
            "Griller",
            "CookPot",
            "Ladle",
            "Hammer",
            "Saw",
            "Crowbar"
        ],
        "itemCount": 22
    },
    {
        "mainTag": "Weapon",
        "subTags": [
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
        "itemCount": 16
    },
    {
        "mainTag": "Ammo",
        "subTags": [
            "Arrow",
            "Handgun",
            "Shotgun",
            "Rifle",
            "SMG"
        ],
        "itemCount": 9
    },
    {
        "mainTag": "Equipment",
        "subTags": [
            "Vest",
            "Head",
            "UpperBody",
            "LowerBody",
            "Hand",
            "Leg",
            "Jewelry",
            "Backpack"
        ],
        "itemCount": 98
    },
    {
        "mainTag": "Building",
        "subTags": [
            "Tent",
            "Bed",
            "Container",
            "Wood",
            "Leather",
            "Campfire",
            "Cooking",
            "Crafting",
            "Medicine",
            "Smelting",
            "Wooden Structure",
            "Stone Structure",
            "Wooden Fence",
            "Stone Fence"
        ],
        "itemCount": 29
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
        "code": "FATIGUE",
        "fullName": "Fatigue",
        "purpose": "Physical fatigue. High fatigue reduces work and combat efficiency.",
        "notes": "Maximum 400; 300 = tired, 350 = exhausted."
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
        "code": "COPPER_INGOT",
        "outputItem": "Copper Ingot",
        "outputCategory": "Material",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier I+: Makeshift Furnace / Industrial Blast Furnace",
        "requiredTool": "Scrap Metal Ladle",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Recyclable metal scrap or ore, Copper",
                "quantity": 3
            },
            {
                "slotIndex": 2,
                "tagQuery": "Processed material, Charcoal",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 1,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 1, Player Skill Level)",
        "craftTimeSeconds": 300,
        "workstationQueueSlot": "Smelting queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": "Smelted from Copper Ore or recyclable Copper",
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Conductive, Insulate, Structural"
    },
    {
        "recipeNumber": 2,
        "code": "IRON_INGOT",
        "outputItem": "Iron Ingot",
        "outputCategory": "Material",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier I+: Makeshift Furnace / Industrial Blast Furnace",
        "requiredTool": "Scrap Metal Ladle",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Recyclable metal scrap or ore, Iron",
                "quantity": 3
            },
            {
                "slotIndex": 2,
                "tagQuery": "Processed material, Charcoal",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 1,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 1, Player Skill Level)",
        "craftTimeSeconds": 300,
        "workstationQueueSlot": "Smelting queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Conductive, Insulate, Structural"
    },
    {
        "recipeNumber": 3,
        "code": "ZINC_INGOT",
        "outputItem": "Zinc Ingot",
        "outputCategory": "Material",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier I+: Makeshift Furnace / Industrial Blast Furnace",
        "requiredTool": "Scrap Metal Ladle",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Recyclable metal scrap or ore, Zinc",
                "quantity": 3
            },
            {
                "slotIndex": 2,
                "tagQuery": "Processed material, Charcoal",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 10,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 10, Player Skill Level)",
        "craftTimeSeconds": 300,
        "workstationQueueSlot": "Smelting queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Conductive, Insulate, Structural"
    },
    {
        "recipeNumber": 4,
        "code": "ALUMINUM_INGOT",
        "outputItem": "Aluminum Ingot",
        "outputCategory": "Material",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier II: Industrial Blast Furnace",
        "requiredTool": "Scrap Metal Ladle",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Recyclable metal scrap or ore, Aluminum",
                "quantity": 3
            },
            {
                "slotIndex": 2,
                "tagQuery": "Processed material, Charcoal",
                "quantity": 2
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 300,
        "workstationQueueSlot": "Smelting queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
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
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Branch",
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
        "requiredUseCaseTags": "Structural"
    },
    {
        "recipeNumber": 6,
        "code": "METAL_NAIL",
        "outputItem": "Metal Nail",
        "outputCategory": "Material",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier II+: Reinforced Metal Workstation / High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Metal (Ingot any)",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 10,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 10, Player Skill Level)",
        "craftTimeSeconds": 300,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
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
        "workstationAccess": "Tier I+: Campfire / Salvaged Wood Stove / Rewired Electric Stove",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Wood (Log/Branch)",
                "quantity": 3
            }
        ],
        "requiredSkillLevel": 1,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 1, Player Skill Level)",
        "craftTimeSeconds": 300,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "None (fuel/chemical)"
    },
    {
        "recipeNumber": 8,
        "code": "FABRIC",
        "outputItem": "Fabric",
        "outputCategory": "Material",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier II+: Reinforced Metal Workstation / High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Rubbish, Fabric (Shredded Fabric Scrap)",
                "quantity": 3
            }
        ],
        "requiredSkillLevel": 10,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 10, Player Skill Level)",
        "craftTimeSeconds": 45,
        "workstationQueueSlot": "Instant craft",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Insulate, Cushion"
    },
    {
        "recipeNumber": 9,
        "code": "RUBBER",
        "outputItem": "Rubber",
        "outputCategory": "Material",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier II+: Reinforced Metal Workstation / High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Rubbish, Rubber (Cracked Rubber Tire)",
                "quantity": 2
            }
        ],
        "requiredSkillLevel": 10,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 10, Player Skill Level)",
        "craftTimeSeconds": 45,
        "workstationQueueSlot": "Instant craft",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
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
        "workstationAccess": "Tier I+: Improvised Workbench / Reinforced Metal Workstation / High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Rubbish, Plastic or Fabric",
                "quantity": 3
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
        "recipeNumber": 11,
        "code": "WOODEN_HANDLE",
        "outputItem": "Wooden Handle",
        "outputCategory": "Material",
        "requiredJobCode": "crafting",
        "workstationAccess": "None (hand-craft, no workstation required)",
        "requiredTool": "None",
        "toolDurabilityCost": null,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Wood (Log)",
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
        "requiredUseCaseTags": "Structural, Flexible"
    },
    {
        "recipeNumber": 12,
        "code": "STONE_TOOL_HEAD",
        "outputItem": "Stone Tool Head",
        "outputCategory": "Material",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier I+: Improvised Workbench / Reinforced Metal Workstation / High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Stone (Pebble/Boulder)",
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
        "requiredUseCaseTags": "Edge, Impact"
    },
    {
        "recipeNumber": 13,
        "code": "COPPER_TOOL_HEAD",
        "outputItem": "Copper Tool Head",
        "outputCategory": "Material",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier II+: Reinforced Metal Workstation / High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Metal, Copper (Ingot)",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 10,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 10, Player Skill Level)",
        "craftTimeSeconds": 300,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Edge, Impact"
    },
    {
        "recipeNumber": 14,
        "code": "IRON_TOOL_HEAD",
        "outputItem": "Iron Tool Head",
        "outputCategory": "Material",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier II+: Reinforced Metal Workstation / High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Metal, Iron (Ingot)",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 300,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Edge, Impact"
    },
    {
        "recipeNumber": 15,
        "code": "ALUMINUM_TOOL_HEAD",
        "outputItem": "Aluminum Tool Head",
        "outputCategory": "Material",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Metal, Aluminum (Ingot)",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 40,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 40, Player Skill Level)",
        "craftTimeSeconds": 300,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
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
        "workstationAccess": "Tier I+: Improvised Workbench / Reinforced Metal Workstation / High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
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
        "code": "IRON_GUN_BARREL",
        "outputItem": "Iron Gun Barrel",
        "outputCategory": "Material",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier II+: Reinforced Metal Workstation / High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Metal, Iron (Ingot)",
                "quantity": 2
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 300,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Structural, Insulate"
    },
    {
        "recipeNumber": 18,
        "code": "IRON_GUN_FRAME",
        "outputItem": "Iron Gun Frame",
        "outputCategory": "Material",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier II+: Reinforced Metal Workstation / High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Metal, Iron (Ingot)",
                "quantity": 2
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 300,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Structural, Impact"
    },
    {
        "recipeNumber": 19,
        "code": "ALUMINUM_GUN_BARREL",
        "outputItem": "Aluminum Gun Barrel",
        "outputCategory": "Material",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Metal, Aluminum (Ingot)",
                "quantity": 2
            }
        ],
        "requiredSkillLevel": 30,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 30, Player Skill Level)",
        "craftTimeSeconds": 300,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "Structural, Insulate"
    },
    {
        "recipeNumber": 20,
        "code": "ALUMINUM_GUN_FRAME",
        "outputItem": "Aluminum Gun Frame",
        "outputCategory": "Material",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Metal, Aluminum (Ingot)",
                "quantity": 2
            }
        ],
        "requiredSkillLevel": 30,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 30, Player Skill Level)",
        "craftTimeSeconds": 300,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
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
        "workstationAccess": "Tier II+: Reinforced Metal Workstation / High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
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
        "workstationAccess": "Tier II+: Reinforced Metal Workstation / High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Fabric",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Rubbish, Non-recyclable",
                "quantity": 1
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
        "requiredUseCaseTags": "Cushion, Insulate"
    },
    {
        "recipeNumber": 23,
        "code": "GUNPOWDER",
        "outputItem": "Gunpowder",
        "outputCategory": "Material",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier II+: Reinforced Metal Workstation / High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Mineral, Sulfur",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Mineral, Saltpeter",
                "quantity": 1
            },
            {
                "slotIndex": 3,
                "tagQuery": "Processed material, Charcoal",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 10,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 10, Player Skill Level)",
        "craftTimeSeconds": 45,
        "workstationQueueSlot": "Instant craft",
        "curelRuleKey": "Material CUREL",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "Inherit (deterministic, from raw material rarity - no roll)",
        "requiredUseCaseTags": "None (chemical)"
    },
    {
        "recipeNumber": 24,
        "code": "WILD_WHEAT_FLOUR",
        "outputItem": "Wild Wheat Flour",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier I+: Campfire / Salvaged Wood Stove / Rewired Electric Stove",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, Grain (Wild Wheat)",
                "quantity": 2
            }
        ],
        "requiredSkillLevel": 1,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 1, Player Skill Level)",
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: cooking needs fuel, water, and queue time; unsafe ingredients should carry infection risk.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 25,
        "code": "WILD_OAT_FLOUR",
        "outputItem": "Wild Oat Flour",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier I+: Campfire / Salvaged Wood Stove / Rewired Electric Stove",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, Grain (Wild Oat)",
                "quantity": 2
            }
        ],
        "requiredSkillLevel": 1,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 1, Player Skill Level)",
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: cooking needs fuel, water, and queue time; unsafe ingredients should carry infection risk.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 26,
        "code": "FERAL_CORN_FLOUR",
        "outputItem": "Feral Corn Flour",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier I+: Campfire / Salvaged Wood Stove / Rewired Electric Stove",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, Grain (Feral Corn)",
                "quantity": 2
            }
        ],
        "requiredSkillLevel": 1,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 1, Player Skill Level)",
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: cooking needs fuel, water, and queue time; unsafe ingredients should carry infection risk.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 27,
        "code": "RAT_DRIED_MEAT",
        "outputItem": "Rat Dried Meat",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier I+: Campfire / Salvaged Wood Stove / Rewired Electric Stove",
        "requiredTool": "Makeshift Grill Rack",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, raw meat (Rat)",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Food, Spice, Salt",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 10,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 10, Player Skill Level)",
        "craftTimeSeconds": 600,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: cooking needs fuel, water, and queue time; unsafe ingredients should carry infection risk.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 28,
        "code": "FERAL_CAT_DRIED_MEAT",
        "outputItem": "Feral Cat Dried Meat",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier I+: Campfire / Salvaged Wood Stove / Rewired Electric Stove",
        "requiredTool": "Makeshift Grill Rack",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, raw meat (Feral Cat)",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Food, Spice, Salt",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 10,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 10, Player Skill Level)",
        "craftTimeSeconds": 600,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: cooking needs fuel, water, and queue time; unsafe ingredients should carry infection risk.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 29,
        "code": "DEER_DRIED_MEAT",
        "outputItem": "Deer Dried Meat",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier I+: Campfire / Salvaged Wood Stove / Rewired Electric Stove",
        "requiredTool": "Makeshift Grill Rack",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, raw meat (Deer)",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Food, Spice, Salt",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 10,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 10, Player Skill Level)",
        "craftTimeSeconds": 600,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: cooking needs fuel, water, and queue time; unsafe ingredients should carry infection risk.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 30,
        "code": "PIGEON_SMOKED_MEAT",
        "outputItem": "Pigeon Smoked Meat",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier II+: Salvaged Wood Stove / Rewired Electric Stove",
        "requiredTool": "Makeshift Grill Rack",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, raw meat (Pigeon)",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Processed material, Charcoal",
                "quantity": 1
            },
            {
                "slotIndex": 3,
                "tagQuery": "Food, Spice, Salt",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 15,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 15, Player Skill Level)",
        "craftTimeSeconds": 600,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: cooking needs fuel, water, and queue time; unsafe ingredients should carry infection risk.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 31,
        "code": "STRAY_DOG_SMOKED_MEAT",
        "outputItem": "Stray Dog Smoked Meat",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier II+: Salvaged Wood Stove / Rewired Electric Stove",
        "requiredTool": "Makeshift Grill Rack",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, raw meat (Stray Dog)",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Processed material, Charcoal",
                "quantity": 1
            },
            {
                "slotIndex": 3,
                "tagQuery": "Food, Spice, Salt",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 15,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 15, Player Skill Level)",
        "craftTimeSeconds": 600,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: cooking needs fuel, water, and queue time; unsafe ingredients should carry infection risk.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 32,
        "code": "DEER_SMOKED_MEAT",
        "outputItem": "Deer Smoked Meat",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier II+: Salvaged Wood Stove / Rewired Electric Stove",
        "requiredTool": "Makeshift Grill Rack",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, raw meat (Deer)",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Processed material, Charcoal",
                "quantity": 1
            },
            {
                "slotIndex": 3,
                "tagQuery": "Food, Spice, Salt",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 15,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 15, Player Skill Level)",
        "craftTimeSeconds": 600,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: cooking needs fuel, water, and queue time; unsafe ingredients should carry infection risk.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 33,
        "code": "SALT",
        "outputItem": "Salt",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier I+: Campfire / Salvaged Wood Stove / Rewired Electric Stove",
        "requiredTool": "Salvaged Cooking Pot",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Processed drink (water)",
                "quantity": 2
            }
        ],
        "requiredSkillLevel": 5,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 5, Player Skill Level)",
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: cooking needs fuel, water, and queue time; unsafe ingredients should carry infection risk.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 34,
        "code": "SUGAR",
        "outputItem": "Sugar",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier I+: Campfire / Salvaged Wood Stove / Rewired Electric Stove",
        "requiredTool": "Salvaged Cooking Pot",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, fruit",
                "quantity": 2
            }
        ],
        "requiredSkillLevel": 10,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 10, Player Skill Level)",
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: cooking needs fuel, water, and queue time; unsafe ingredients should carry infection risk.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 35,
        "code": "VINEGAR",
        "outputItem": "Vinegar",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier I+: Campfire / Salvaged Wood Stove / Rewired Electric Stove",
        "requiredTool": "Salvaged Cooking Pot",
        "toolDurabilityCost": 1,
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
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: cooking needs fuel, water, and queue time; unsafe ingredients should carry infection risk.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 36,
        "code": "SOYSAUCE",
        "outputItem": "Soysauce",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier II+: Salvaged Wood Stove / Rewired Electric Stove",
        "requiredTool": "Salvaged Cooking Pot",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, Grain",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Food, Spice, Salt",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: cooking needs fuel, water, and queue time; unsafe ingredients should carry infection risk.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 37,
        "code": "YEAST",
        "outputItem": "Yeast",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier I+: Campfire / Salvaged Wood Stove / Rewired Electric Stove",
        "requiredTool": "Salvaged Cooking Pot",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, flour",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 10,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 10, Player Skill Level)",
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: cooking needs fuel, water, and queue time; unsafe ingredients should carry infection risk.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 38,
        "code": "BUTTER",
        "outputItem": "Butter",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier I+: Campfire / Salvaged Wood Stove / Rewired Electric Stove",
        "requiredTool": "Salvaged Cooking Pot",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, Oil/Fat",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 10,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 10, Player Skill Level)",
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: cooking needs fuel, water, and queue time; unsafe ingredients should carry infection risk.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 39,
        "code": "CHEESE",
        "outputItem": "Cheese",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier II+: Salvaged Wood Stove / Rewired Electric Stove",
        "requiredTool": "Salvaged Cooking Pot",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, Butter",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 600,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: cooking needs fuel, water, and queue time; unsafe ingredients should carry infection risk.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 40,
        "code": "STRAY_DOG_FAT",
        "outputItem": "Stray Dog Fat",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier II+: Salvaged Wood Stove / Rewired Electric Stove",
        "requiredTool": "Salvaged Cooking Pot",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, raw meat (Stray Dog)",
                "quantity": 2
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: cooking needs fuel, water, and queue time; unsafe ingredients should carry infection risk.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 41,
        "code": "FERAL_CAT_FAT",
        "outputItem": "Feral Cat Fat",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier II+: Salvaged Wood Stove / Rewired Electric Stove",
        "requiredTool": "Salvaged Cooking Pot",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, raw meat (Feral Cat)",
                "quantity": 2
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: cooking needs fuel, water, and queue time; unsafe ingredients should carry infection risk.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 42,
        "code": "DEER_FAT",
        "outputItem": "Deer Fat",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier II+: Salvaged Wood Stove / Rewired Electric Stove",
        "requiredTool": "Salvaged Cooking Pot",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, raw meat (Deer)",
                "quantity": 2
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: cooking needs fuel, water, and queue time; unsafe ingredients should carry infection risk.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 43,
        "code": "DEER_OIL",
        "outputItem": "Deer Oil",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier III: Rewired Electric Stove",
        "requiredTool": "Salvaged Cooking Pot",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, Oil, Deer Fat",
                "quantity": 2
            }
        ],
        "requiredSkillLevel": 30,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 30, Player Skill Level)",
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: cooking needs fuel, water, and queue time; unsafe ingredients should carry infection risk.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 44,
        "code": "PUMPKIN_SEED_OIL",
        "outputItem": "Pumpkin Seed Oil",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier III: Rewired Electric Stove",
        "requiredTool": "Salvaged Cooking Pot",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Seed, Pumpkin",
                "quantity": 2
            }
        ],
        "requiredSkillLevel": 30,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 30, Player Skill Level)",
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: cooking needs fuel, water, and queue time; unsafe ingredients should carry infection risk.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 45,
        "code": "FERAL_CORN_OIL",
        "outputItem": "Feral Corn Oil",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier III: Rewired Electric Stove",
        "requiredTool": "Salvaged Cooking Pot",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, Grain, Corn",
                "quantity": 2
            }
        ],
        "requiredSkillLevel": 30,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 30, Player Skill Level)",
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: cooking needs fuel, water, and queue time; unsafe ingredients should carry infection risk.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 46,
        "code": "SKEWERED_RAT",
        "outputItem": "Skewered Rat",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier I+: Campfire / Salvaged Wood Stove / Rewired Electric Stove",
        "requiredTool": "Makeshift Grill Rack",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, raw meat (Rat)",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 1,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 1, Player Skill Level)",
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: cooking needs fuel, water, and queue time; unsafe ingredients should carry infection risk.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 47,
        "code": "SKEWERED_PIGEON",
        "outputItem": "Skewered Pigeon",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier I+: Campfire / Salvaged Wood Stove / Rewired Electric Stove",
        "requiredTool": "Makeshift Grill Rack",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, raw meat (Pigeon)",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 1,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 1, Player Skill Level)",
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: cooking needs fuel, water, and queue time; unsafe ingredients should carry infection risk.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 48,
        "code": "SKEWERED_DEER",
        "outputItem": "Skewered Deer",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier I+: Campfire / Salvaged Wood Stove / Rewired Electric Stove",
        "requiredTool": "Makeshift Grill Rack",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, raw meat (Deer)",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 1,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 1, Player Skill Level)",
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: cooking needs fuel, water, and queue time; unsafe ingredients should carry infection risk.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 49,
        "code": "SEASONED_SKEWERED_STRAY_DOG",
        "outputItem": "Seasoned Skewered Stray Dog",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier I+: Campfire / Salvaged Wood Stove / Rewired Electric Stove",
        "requiredTool": "Makeshift Grill Rack",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, raw meat (Stray Dog)",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Food, Spice",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 10,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 10, Player Skill Level)",
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: cooking needs fuel, water, and queue time; unsafe ingredients should carry infection risk.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 50,
        "code": "SEASONED_SKEWERED_FERAL_CAT",
        "outputItem": "Seasoned Skewered Feral Cat",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier I+: Campfire / Salvaged Wood Stove / Rewired Electric Stove",
        "requiredTool": "Makeshift Grill Rack",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, raw meat (Feral Cat)",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Food, Spice",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 10,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 10, Player Skill Level)",
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: cooking needs fuel, water, and queue time; unsafe ingredients should carry infection risk.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 51,
        "code": "SEASONED_SKEWERED_DEER",
        "outputItem": "Seasoned Skewered Deer",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier I+: Campfire / Salvaged Wood Stove / Rewired Electric Stove",
        "requiredTool": "Makeshift Grill Rack",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, raw meat (Deer)",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Food, Spice",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 10,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 10, Player Skill Level)",
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: cooking needs fuel, water, and queue time; unsafe ingredients should carry infection risk.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 52,
        "code": "STRAY_DOG_STEAK",
        "outputItem": "Stray Dog Steak",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier II+: Salvaged Wood Stove / Rewired Electric Stove",
        "requiredTool": "Makeshift Grill Rack",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, raw meat (Stray Dog)",
                "quantity": 2
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: cooking needs fuel, water, and queue time; unsafe ingredients should carry infection risk.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 53,
        "code": "FERAL_CAT_STEAK",
        "outputItem": "Feral Cat Steak",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier II+: Salvaged Wood Stove / Rewired Electric Stove",
        "requiredTool": "Makeshift Grill Rack",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, raw meat (Feral Cat)",
                "quantity": 2
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: cooking needs fuel, water, and queue time; unsafe ingredients should carry infection risk.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 54,
        "code": "DEER_STEAK",
        "outputItem": "Deer Steak",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier II+: Salvaged Wood Stove / Rewired Electric Stove",
        "requiredTool": "Makeshift Grill Rack",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, raw meat (Deer)",
                "quantity": 2
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: cooking needs fuel, water, and queue time; unsafe ingredients should carry infection risk.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 55,
        "code": "STRAY_DOG_SEASONED_STEAK",
        "outputItem": "Stray Dog Seasoned Steak",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier III: Rewired Electric Stove",
        "requiredTool": "Makeshift Grill Rack",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, raw meat (Stray Dog)",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Food, Spice",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 30,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 30, Player Skill Level)",
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: cooking needs fuel, water, and queue time; unsafe ingredients should carry infection risk.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 56,
        "code": "FERAL_CAT_SEASONED_STEAK",
        "outputItem": "Feral Cat Seasoned Steak",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier III: Rewired Electric Stove",
        "requiredTool": "Makeshift Grill Rack",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, raw meat (Feral Cat)",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Food, Spice",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 30,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 30, Player Skill Level)",
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: cooking needs fuel, water, and queue time; unsafe ingredients should carry infection risk.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 57,
        "code": "DEER_SEASONED_STEAK",
        "outputItem": "Deer Seasoned Steak",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier III: Rewired Electric Stove",
        "requiredTool": "Makeshift Grill Rack",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, raw meat (Deer)",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Food, Spice",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 30,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 30, Player Skill Level)",
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: cooking needs fuel, water, and queue time; unsafe ingredients should carry infection risk.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 58,
        "code": "BOILED_PIGEON",
        "outputItem": "Boiled Pigeon",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier I+: Campfire / Salvaged Wood Stove / Rewired Electric Stove",
        "requiredTool": "Salvaged Cooking Pot",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, raw meat, Pigeon",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Processed drink (water)",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 1,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 1, Player Skill Level)",
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: cooking needs fuel, water, and queue time; unsafe ingredients should carry infection risk.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 59,
        "code": "BOILED_RAT",
        "outputItem": "Boiled Rat",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier I+: Campfire / Salvaged Wood Stove / Rewired Electric Stove",
        "requiredTool": "Salvaged Cooking Pot",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, raw meat, Rat",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Processed drink (water)",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 1,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 1, Player Skill Level)",
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: cooking needs fuel, water, and queue time; unsafe ingredients should carry infection risk.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 60,
        "code": "BOILED_OVERGROWN_PUMPKIN",
        "outputItem": "Boiled Overgrown Pumpkin",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier I+: Campfire / Salvaged Wood Stove / Rewired Electric Stove",
        "requiredTool": "Salvaged Cooking Pot",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, vegetable, Overgrown Pumpkin",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Processed drink (water)",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 1,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 1, Player Skill Level)",
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: cooking needs fuel, water, and queue time; unsafe ingredients should carry infection risk.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 61,
        "code": "DANDELION_GREEN_SOUP",
        "outputItem": "Dandelion Green Soup",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier I+: Campfire / Salvaged Wood Stove / Rewired Electric Stove",
        "requiredTool": "Salvaged Cooking Pot",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, vegetable, Dandelion",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Processed drink (water)",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 10,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 10, Player Skill Level)",
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: cooking needs fuel, water, and queue time; unsafe ingredients should carry infection risk.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 62,
        "code": "CELLAR_MUSHROOM_SOUP",
        "outputItem": "Cellar Mushroom Soup",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier I+: Campfire / Salvaged Wood Stove / Rewired Electric Stove",
        "requiredTool": "Salvaged Cooking Pot",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, vegetable, Cellar Mushroom",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Processed drink (water)",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 10,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 10, Player Skill Level)",
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: cooking needs fuel, water, and queue time; unsafe ingredients should carry infection risk.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 63,
        "code": "DEER_BONE_SOUP",
        "outputItem": "Deer Bone Soup",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier I+: Campfire / Salvaged Wood Stove / Rewired Electric Stove",
        "requiredTool": "Salvaged Cooking Pot",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Bone, Deer",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Processed drink (water)",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 10,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 10, Player Skill Level)",
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: cooking needs fuel, water, and queue time; unsafe ingredients should carry infection risk.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 64,
        "code": "STRAY_DOG_STEW",
        "outputItem": "Stray Dog Stew",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier II+: Salvaged Wood Stove / Rewired Electric Stove",
        "requiredTool": "Salvaged Cooking Pot",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, raw meat, Stray Dog",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Processed drink (water)",
                "quantity": 1
            },
            {
                "slotIndex": 3,
                "tagQuery": "Food, Spice",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: cooking needs fuel, water, and queue time; unsafe ingredients should carry infection risk.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 65,
        "code": "FERAL_CAT_STEW",
        "outputItem": "Feral Cat Stew",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier II+: Salvaged Wood Stove / Rewired Electric Stove",
        "requiredTool": "Salvaged Cooking Pot",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, raw meat, Feral Cat",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Processed drink (water)",
                "quantity": 1
            },
            {
                "slotIndex": 3,
                "tagQuery": "Food, Spice",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: cooking needs fuel, water, and queue time; unsafe ingredients should carry infection risk.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 66,
        "code": "OVERGROWN_PUMPKIN_STEW",
        "outputItem": "Overgrown Pumpkin Stew",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier II+: Salvaged Wood Stove / Rewired Electric Stove",
        "requiredTool": "Salvaged Cooking Pot",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, vegetable, Overgrown Pumpkin",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Processed drink (water)",
                "quantity": 1
            },
            {
                "slotIndex": 3,
                "tagQuery": "Food, Spice",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: cooking needs fuel, water, and queue time; unsafe ingredients should carry infection risk.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 67,
        "code": "DEER_BONE_NOODLE_SOUP",
        "outputItem": "Deer Bone Noodle Soup",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier I+: Campfire / Salvaged Wood Stove / Rewired Electric Stove",
        "requiredTool": "Salvaged Cooking Pot",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, flour",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Bone, Deer",
                "quantity": 1
            },
            {
                "slotIndex": 3,
                "tagQuery": "Processed drink (water)",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 10,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 10, Player Skill Level)",
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: cooking needs fuel, water, and queue time; unsafe ingredients should carry infection risk.",
        "mainMaterialSlots": "1,2",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 68,
        "code": "CELLAR_MUSHROOM_NOODLE",
        "outputItem": "Cellar Mushroom Noodle",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier I+: Campfire / Salvaged Wood Stove / Rewired Electric Stove",
        "requiredTool": "Salvaged Cooking Pot",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, flour",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Food, vegetable, Cellar Mushroom",
                "quantity": 1
            },
            {
                "slotIndex": 3,
                "tagQuery": "Processed drink (water)",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 10,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 10, Player Skill Level)",
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: cooking needs fuel, water, and queue time; unsafe ingredients should carry infection risk.",
        "mainMaterialSlots": "1,2",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 69,
        "code": "FERAL_TOMATO_NOODLE",
        "outputItem": "Feral Tomato Noodle",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier I+: Campfire / Salvaged Wood Stove / Rewired Electric Stove",
        "requiredTool": "Salvaged Cooking Pot",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, flour",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Food, vegetable, Feral Tomato",
                "quantity": 1
            },
            {
                "slotIndex": 3,
                "tagQuery": "Processed drink (water)",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 10,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 10, Player Skill Level)",
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: cooking needs fuel, water, and queue time; unsafe ingredients should carry infection risk.",
        "mainMaterialSlots": "1,2",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 70,
        "code": "FRIED_RAT",
        "outputItem": "Fried Rat",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier II+: Salvaged Wood Stove / Rewired Electric Stove",
        "requiredTool": "Salvaged Cooking Pot",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, raw meat (Rat)",
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
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: cooking needs fuel, water, and queue time; unsafe ingredients should carry infection risk.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 71,
        "code": "FRIED_PIGEON",
        "outputItem": "Fried Pigeon",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier II+: Salvaged Wood Stove / Rewired Electric Stove",
        "requiredTool": "Salvaged Cooking Pot",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, raw meat (Pigeon)",
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
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: cooking needs fuel, water, and queue time; unsafe ingredients should carry infection risk.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 72,
        "code": "FRIED_OVERGROWN_PUMPKIN",
        "outputItem": "Fried Overgrown Pumpkin",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier II+: Salvaged Wood Stove / Rewired Electric Stove",
        "requiredTool": "Salvaged Cooking Pot",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, vegetable, Overgrown Pumpkin",
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
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: cooking needs fuel, water, and queue time; unsafe ingredients should carry infection risk.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 73,
        "code": "SEASONED_FRIED_STRAY_DOG",
        "outputItem": "Seasoned Fried Stray Dog",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier III: Rewired Electric Stove",
        "requiredTool": "Salvaged Cooking Pot",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, raw meat (Stray Dog)",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Food, Oil",
                "quantity": 1
            },
            {
                "slotIndex": 3,
                "tagQuery": "Food, Spice",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 30,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 30, Player Skill Level)",
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: cooking needs fuel, water, and queue time; unsafe ingredients should carry infection risk.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 74,
        "code": "SEASONED_FRIED_FERAL_CAT",
        "outputItem": "Seasoned Fried Feral Cat",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier III: Rewired Electric Stove",
        "requiredTool": "Salvaged Cooking Pot",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, raw meat (Feral Cat)",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Food, Oil",
                "quantity": 1
            },
            {
                "slotIndex": 3,
                "tagQuery": "Food, Spice",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 30,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 30, Player Skill Level)",
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: cooking needs fuel, water, and queue time; unsafe ingredients should carry infection risk.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 75,
        "code": "SEASONED_FRIED_DEER",
        "outputItem": "Seasoned Fried Deer",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier III: Rewired Electric Stove",
        "requiredTool": "Salvaged Cooking Pot",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, raw meat (Deer)",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Food, Oil",
                "quantity": 1
            },
            {
                "slotIndex": 3,
                "tagQuery": "Food, Spice",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 30,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 30, Player Skill Level)",
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: cooking needs fuel, water, and queue time; unsafe ingredients should carry infection risk.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 76,
        "code": "DEEP_FRIED_CELLAR_MUSHROOM",
        "outputItem": "Deep Fried Cellar Mushroom",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier III: Rewired Electric Stove",
        "requiredTool": "Salvaged Cooking Pot",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, vegetable, Cellar Mushroom",
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
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: cooking needs fuel, water, and queue time; unsafe ingredients should carry infection risk.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 77,
        "code": "DEEP_FRIED_FERAL_TOMATO",
        "outputItem": "Deep Fried Feral Tomato",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier III: Rewired Electric Stove",
        "requiredTool": "Salvaged Cooking Pot",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, vegetable, Feral Tomato",
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
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: cooking needs fuel, water, and queue time; unsafe ingredients should carry infection risk.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 78,
        "code": "DEEP_FRIED_DEER",
        "outputItem": "Deep Fried Deer",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier III: Rewired Electric Stove",
        "requiredTool": "Salvaged Cooking Pot",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, raw meat, Deer",
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
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: cooking needs fuel, water, and queue time; unsafe ingredients should carry infection risk.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 79,
        "code": "BREAD",
        "outputItem": "Bread",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier II+: Salvaged Wood Stove / Rewired Electric Stove",
        "requiredTool": "Salvaged Cooking Pot",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, flour",
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
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: cooking needs fuel, water, and queue time; unsafe ingredients should carry infection risk.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 80,
        "code": "RAT_BURGER",
        "outputItem": "Rat Burger",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier II+: Salvaged Wood Stove / Rewired Electric Stove",
        "requiredTool": "Makeshift Grill Rack",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, Bread",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Food, raw meat (Rat)",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 15,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 15, Player Skill Level)",
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: cooking needs fuel, water, and queue time; unsafe ingredients should carry infection risk.",
        "mainMaterialSlots": "2",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 81,
        "code": "STRAY_DOG_BURGER",
        "outputItem": "Stray Dog Burger",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier II+: Salvaged Wood Stove / Rewired Electric Stove",
        "requiredTool": "Makeshift Grill Rack",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, Bread",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Food, raw meat (Stray Dog)",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 15,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 15, Player Skill Level)",
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: cooking needs fuel, water, and queue time; unsafe ingredients should carry infection risk.",
        "mainMaterialSlots": "2",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 82,
        "code": "DEER_BURGER",
        "outputItem": "Deer Burger",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier II+: Salvaged Wood Stove / Rewired Electric Stove",
        "requiredTool": "Makeshift Grill Rack",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, Bread",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Food, raw meat (Deer)",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 15,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 15, Player Skill Level)",
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: cooking needs fuel, water, and queue time; unsafe ingredients should carry infection risk.",
        "mainMaterialSlots": "2",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 83,
        "code": "PIGEON_SANDWICH",
        "outputItem": "Pigeon Sandwich",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier II+: Salvaged Wood Stove / Rewired Electric Stove",
        "requiredTool": "Salvaged Cooking Pot",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, Bread",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Food, raw meat, Pigeon",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: cooking needs fuel, water, and queue time; unsafe ingredients should carry infection risk.",
        "mainMaterialSlots": "2",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 84,
        "code": "FERAL_TOMATO_SANDWICH",
        "outputItem": "Feral Tomato Sandwich",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier II+: Salvaged Wood Stove / Rewired Electric Stove",
        "requiredTool": "Salvaged Cooking Pot",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, Bread",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Food, vegetable, Feral Tomato",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: cooking needs fuel, water, and queue time; unsafe ingredients should carry infection risk.",
        "mainMaterialSlots": "2",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 85,
        "code": "DEER_SANDWICH",
        "outputItem": "Deer Sandwich",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier II+: Salvaged Wood Stove / Rewired Electric Stove",
        "requiredTool": "Salvaged Cooking Pot",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, Bread",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Food, raw meat, Deer",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: cooking needs fuel, water, and queue time; unsafe ingredients should carry infection risk.",
        "mainMaterialSlots": "2",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 86,
        "code": "WILD_MUSHROOM_PIZZA",
        "outputItem": "Wild Mushroom Pizza",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier II+: Salvaged Wood Stove / Rewired Electric Stove",
        "requiredTool": "Salvaged Cooking Pot",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, flour",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Food, vegetable, Cellar Mushroom",
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
        "craftTimeSeconds": 600,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: cooking needs fuel, water, and queue time; unsafe ingredients should carry infection risk.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 87,
        "code": "FERAL_TOMATO_PIZZA",
        "outputItem": "Feral Tomato Pizza",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier II+: Salvaged Wood Stove / Rewired Electric Stove",
        "requiredTool": "Salvaged Cooking Pot",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, flour",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Food, vegetable, Feral Tomato",
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
        "craftTimeSeconds": 600,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: cooking needs fuel, water, and queue time; unsafe ingredients should carry infection risk.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 88,
        "code": "DEER_MEAT_PIZZA",
        "outputItem": "Deer Meat Pizza",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier II+: Salvaged Wood Stove / Rewired Electric Stove",
        "requiredTool": "Salvaged Cooking Pot",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, flour",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Food, raw meat, Deer",
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
        "craftTimeSeconds": 600,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: cooking needs fuel, water, and queue time; unsafe ingredients should carry infection risk.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 89,
        "code": "WILD_APPLE_CAKE",
        "outputItem": "Wild Apple Cake",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier II+: Salvaged Wood Stove / Rewired Electric Stove",
        "requiredTool": "Salvaged Cooking Pot",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, flour",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Food, Sugar",
                "quantity": 1
            },
            {
                "slotIndex": 3,
                "tagQuery": "Food, fruit, Apple",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 25,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 25, Player Skill Level)",
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: cooking needs fuel, water, and queue time; unsafe ingredients should carry infection risk.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 90,
        "code": "PARK_CHERRY_CAKE",
        "outputItem": "Park Cherry Cake",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier II+: Salvaged Wood Stove / Rewired Electric Stove",
        "requiredTool": "Salvaged Cooking Pot",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, flour",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Food, Sugar",
                "quantity": 1
            },
            {
                "slotIndex": 3,
                "tagQuery": "Food, fruit, Cherry",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 25,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 25, Player Skill Level)",
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: cooking needs fuel, water, and queue time; unsafe ingredients should carry infection risk.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 91,
        "code": "BRAMBLE_BERRY_CAKE",
        "outputItem": "Bramble Berry Cake",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier II+: Salvaged Wood Stove / Rewired Electric Stove",
        "requiredTool": "Salvaged Cooking Pot",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, flour",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Food, Sugar",
                "quantity": 1
            },
            {
                "slotIndex": 3,
                "tagQuery": "Food, fruit, Berry",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 25,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 25, Player Skill Level)",
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: cooking needs fuel, water, and queue time; unsafe ingredients should carry infection risk.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 92,
        "code": "CANNED_DEER_MEAT",
        "outputItem": "Canned Deer Meat",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier II+: Salvaged Wood Stove / Rewired Electric Stove",
        "requiredTool": "Salvaged Cooking Pot",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, raw meat, Deer",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Rubbish, Metal (can shell)",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 600,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: cooking needs fuel, water, and queue time; unsafe ingredients should carry infection risk.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 93,
        "code": "CANNED_FERAL_TOMATO",
        "outputItem": "Canned Feral Tomato",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier II+: Salvaged Wood Stove / Rewired Electric Stove",
        "requiredTool": "Salvaged Cooking Pot",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, vegetable, Feral Tomato",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Rubbish, Metal (can shell)",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 600,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: cooking needs fuel, water, and queue time; unsafe ingredients should carry infection risk.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 94,
        "code": "CANNED_OVERGROWN_PUMPKIN",
        "outputItem": "Canned Overgrown Pumpkin",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier II+: Salvaged Wood Stove / Rewired Electric Stove",
        "requiredTool": "Salvaged Cooking Pot",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, vegetable, Overgrown Pumpkin",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Rubbish, Metal (can shell)",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 600,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: cooking needs fuel, water, and queue time; unsafe ingredients should carry infection risk.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 95,
        "code": "IMPROVED_CANNED_DEER_MEAT",
        "outputItem": "Improved Canned Deer Meat",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier III: Rewired Electric Stove",
        "requiredTool": "Salvaged Cooking Pot",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, raw meat, Deer",
                "quantity": 3
            },
            {
                "slotIndex": 2,
                "tagQuery": "Rubbish, Metal (can shell)",
                "quantity": 1
            },
            {
                "slotIndex": 3,
                "tagQuery": "Food, Spice",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 40,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 40, Player Skill Level)",
        "craftTimeSeconds": 600,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: cooking needs fuel, water, and queue time; unsafe ingredients should carry infection risk.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 96,
        "code": "IMPROVED_CANNED_FERAL_TOMATO",
        "outputItem": "Improved Canned Feral Tomato",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier III: Rewired Electric Stove",
        "requiredTool": "Salvaged Cooking Pot",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, vegetable, Feral Tomato",
                "quantity": 3
            },
            {
                "slotIndex": 2,
                "tagQuery": "Rubbish, Metal (can shell)",
                "quantity": 1
            },
            {
                "slotIndex": 3,
                "tagQuery": "Food, Spice",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 40,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 40, Player Skill Level)",
        "craftTimeSeconds": 600,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: cooking needs fuel, water, and queue time; unsafe ingredients should carry infection risk.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 97,
        "code": "IMPROVED_CANNED_OVERGROWN_PUMPKIN",
        "outputItem": "Improved Canned Overgrown Pumpkin",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier III: Rewired Electric Stove",
        "requiredTool": "Salvaged Cooking Pot",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, vegetable, Overgrown Pumpkin",
                "quantity": 3
            },
            {
                "slotIndex": 2,
                "tagQuery": "Rubbish, Metal (can shell)",
                "quantity": 1
            },
            {
                "slotIndex": 3,
                "tagQuery": "Food, Spice",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 40,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 40, Player Skill Level)",
        "craftTimeSeconds": 600,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: cooking needs fuel, water, and queue time; unsafe ingredients should carry infection risk.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 98,
        "code": "STEAMED_VEGETABLE_BASKET",
        "outputItem": "Steamed Vegetable Basket",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier II+: Salvaged Wood Stove / Rewired Electric Stove",
        "requiredTool": "Salvaged Cooking Pot",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, vegetable",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Food, flour",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: cooking needs fuel, water, and queue time; unsafe ingredients should carry infection risk.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 99,
        "code": "STEAMED_RAT_BUNS",
        "outputItem": "Steamed Rat Buns",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier II+: Salvaged Wood Stove / Rewired Electric Stove",
        "requiredTool": "Salvaged Cooking Pot",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, raw meat, Rat",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Food, flour",
                "quantity": 2
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: cooking needs fuel, water, and queue time; unsafe ingredients should carry infection risk.",
        "mainMaterialSlots": "2",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 100,
        "code": "STEAMED_DEER_DUMPLINGS",
        "outputItem": "Steamed Deer Dumplings",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier III: Rewired Electric Stove",
        "requiredTool": "Salvaged Cooking Pot",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, raw meat, Deer",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Food, flour",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 30,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 30, Player Skill Level)",
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: cooking needs fuel, water, and queue time; unsafe ingredients should carry infection risk.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 101,
        "code": "DEER_BONE_RAMEN",
        "outputItem": "Deer Bone Ramen",
        "outputCategory": "Food",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier III: Rewired Electric Stove",
        "requiredTool": "Salvaged Cooking Pot",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, flour",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Bone, Deer",
                "quantity": 1
            },
            {
                "slotIndex": 3,
                "tagQuery": "Processed drink (water)",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 30,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 30, Player Skill Level)",
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: cooking needs fuel, water, and queue time; unsafe ingredients should carry infection risk.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 102,
        "code": "WATER_BOILLED_FILTERED",
        "outputItem": "Water (Boilled/Filtered)",
        "outputCategory": "Drink",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier I+: Campfire / Salvaged Wood Stove / Rewired Electric Stove",
        "requiredTool": "Salvaged Cooking Pot",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Drink, Contaminated (Contaminated water)",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 10,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 10, Player Skill Level)",
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: cooking needs fuel, water, and queue time; unsafe ingredients should carry infection risk.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 103,
        "code": "MINERAL_WATER",
        "outputItem": "Mineral Water",
        "outputCategory": "Drink",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier II+: Salvaged Wood Stove / Rewired Electric Stove",
        "requiredTool": "Salvaged Cooking Pot",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Processed drink (water)",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Mineral",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: cooking needs fuel, water, and queue time; unsafe ingredients should carry infection risk.",
        "mainMaterialSlots": "2",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 104,
        "code": "WILD_APPLE_JUICE",
        "outputItem": "Wild Apple Juice",
        "outputCategory": "Drink",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier II+: Salvaged Wood Stove / Rewired Electric Stove",
        "requiredTool": "Salvaged Cooking Pot",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, fruit, Apple",
                "quantity": 2
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: cooking needs fuel, water, and queue time; unsafe ingredients should carry infection risk.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 105,
        "code": "OVERGROWN_GRAPE_JUICE",
        "outputItem": "Overgrown Grape Juice",
        "outputCategory": "Drink",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier II+: Salvaged Wood Stove / Rewired Electric Stove",
        "requiredTool": "Salvaged Cooking Pot",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, fruit, Grape",
                "quantity": 2
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: cooking needs fuel, water, and queue time; unsafe ingredients should carry infection risk.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 106,
        "code": "FERAL_TOMATO_JUICE",
        "outputItem": "Feral Tomato Juice",
        "outputCategory": "Drink",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier II+: Salvaged Wood Stove / Rewired Electric Stove",
        "requiredTool": "Salvaged Cooking Pot",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, fruit, Tomato",
                "quantity": 2
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: cooking needs fuel, water, and queue time; unsafe ingredients should carry infection risk.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 107,
        "code": "BRAMBLE_BERRY_SMOOTHIE",
        "outputItem": "Bramble Berry Smoothie",
        "outputCategory": "Drink",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier III: Rewired Electric Stove",
        "requiredTool": "Salvaged Cooking Pot",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, fruit, Berry",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Processed drink (water)",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 40,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 40, Player Skill Level)",
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: cooking needs fuel, water, and queue time; unsafe ingredients should carry infection risk.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 108,
        "code": "ALLEY_FIG_SMOOTHIE",
        "outputItem": "Alley Fig Smoothie",
        "outputCategory": "Drink",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier III: Rewired Electric Stove",
        "requiredTool": "Salvaged Cooking Pot",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, fruit, Fig",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Processed drink (water)",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 40,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 40, Player Skill Level)",
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: cooking needs fuel, water, and queue time; unsafe ingredients should carry infection risk.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 109,
        "code": "PARK_CHERRY_SMOOTHIE",
        "outputItem": "Park Cherry Smoothie",
        "outputCategory": "Drink",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier III: Rewired Electric Stove",
        "requiredTool": "Salvaged Cooking Pot",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, fruit, Cherry",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Processed drink (water)",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 40,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 40, Player Skill Level)",
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: cooking needs fuel, water, and queue time; unsafe ingredients should carry infection risk.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 110,
        "code": "COFFEE",
        "outputItem": "Coffee",
        "outputCategory": "Drink",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier II+: Salvaged Wood Stove / Rewired Electric Stove",
        "requiredTool": "Salvaged Cooking Pot",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Processed drink (water)",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Raw material (plant seeds or leaves)",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 15,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 15, Player Skill Level)",
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: cooking needs fuel, water, and queue time; unsafe ingredients should carry infection risk.",
        "mainMaterialSlots": "2",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 111,
        "code": "OVERGROWN_GRAPE_WINE",
        "outputItem": "Overgrown Grape Wine",
        "outputCategory": "Drink",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier II+: Salvaged Wood Stove / Rewired Electric Stove",
        "requiredTool": "Salvaged Cooking Pot",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, fruit, Grape",
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
        "craftTimeSeconds": 1800,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: cooking needs fuel, water, and queue time; unsafe ingredients should carry infection risk.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 112,
        "code": "WILD_APPLE_WINE",
        "outputItem": "Wild Apple Wine",
        "outputCategory": "Drink",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier II+: Salvaged Wood Stove / Rewired Electric Stove",
        "requiredTool": "Salvaged Cooking Pot",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, fruit, Apple",
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
        "craftTimeSeconds": 1800,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: cooking needs fuel, water, and queue time; unsafe ingredients should carry infection risk.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 113,
        "code": "BRAMBLE_BERRY_WINE",
        "outputItem": "Bramble Berry Wine",
        "outputCategory": "Drink",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier II+: Salvaged Wood Stove / Rewired Electric Stove",
        "requiredTool": "Salvaged Cooking Pot",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Food, fruit, Berry",
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
        "craftTimeSeconds": 1800,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: cooking needs fuel, water, and queue time; unsafe ingredients should carry infection risk.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 114,
        "code": "MOONSHINE",
        "outputItem": "Moonshine",
        "outputCategory": "Drink",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier III: Rewired Electric Stove",
        "requiredTool": "Salvaged Cooking Pot",
        "toolDurabilityCost": 1,
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
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Cooking queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: cooking needs fuel, water, and queue time; unsafe ingredients should carry infection risk.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 115,
        "code": "BANDAGE",
        "outputItem": "Bandage",
        "outputCategory": "Medicine",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier I+: Field Medical Station / Restored Medical Lab",
        "requiredTool": "Scrap Metal Ladle",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Fabric",
                "quantity": 2
            }
        ],
        "requiredSkillLevel": 10,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 10, Player Skill Level)",
        "craftTimeSeconds": 180,
        "workstationQueueSlot": "Medical queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: medical crafting should consume clean fabric, alcohol/chemical base, or medicinal plants.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 116,
        "code": "FIRST_AID_KIT",
        "outputItem": "First aid Kit",
        "outputCategory": "Medicine",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier II: Restored Medical Lab",
        "requiredTool": "Scrap Metal Ladle",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Medicine, Bandage",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Medicine, Antibiotic",
                "quantity": 1
            },
            {
                "slotIndex": 3,
                "tagQuery": "Medicine, Painkiller",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 40,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 40, Player Skill Level)",
        "craftTimeSeconds": 180,
        "workstationQueueSlot": "Medical queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: medical crafting should consume clean fabric, alcohol/chemical base, or medicinal plants.",
        "mainMaterialSlots": "1,2,3",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 117,
        "code": "ANTIBIOTIC",
        "outputItem": "Antibiotic",
        "outputCategory": "Medicine",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier II: Restored Medical Lab",
        "requiredTool": "Scrap Metal Ladle",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Raw material (medicinal plant or mineral)",
                "quantity": 2
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 180,
        "workstationQueueSlot": "Medical queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: medical crafting should consume clean fabric, alcohol/chemical base, or medicinal plants.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 118,
        "code": "PAINKILLER",
        "outputItem": "Painkiller",
        "outputCategory": "Medicine",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier II: Restored Medical Lab",
        "requiredTool": "Scrap Metal Ladle",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Raw material (medicinal plant or mineral)",
                "quantity": 2
            }
        ],
        "requiredSkillLevel": 40,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 40, Player Skill Level)",
        "craftTimeSeconds": 180,
        "workstationQueueSlot": "Medical queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: medical crafting should consume clean fabric, alcohol/chemical base, or medicinal plants.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 119,
        "code": "ANDERALINE_SHOT",
        "outputItem": "Anderaline shot",
        "outputCategory": "Medicine",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier II: Restored Medical Lab",
        "requiredTool": "Scrap Metal Ladle",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Raw material (meat or chemical)",
                "quantity": 2
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 180,
        "workstationQueueSlot": "Medical queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: medical crafting should consume clean fabric, alcohol/chemical base, or medicinal plants.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 120,
        "code": "SPEED_BOOSTER",
        "outputItem": "Speed booster",
        "outputCategory": "Medicine",
        "requiredJobCode": "cooking",
        "workstationAccess": "Tier II: Restored Medical Lab",
        "requiredTool": "Scrap Metal Ladle",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Raw material (meat or chemical)",
                "quantity": 3
            }
        ],
        "requiredSkillLevel": 40,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 40, Player Skill Level)",
        "craftTimeSeconds": 180,
        "workstationQueueSlot": "Medical queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Post-apocalypse logic: medical crafting should consume clean fabric, alcohol/chemical base, or medicinal plants.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 121,
        "code": "STONE_AXE",
        "outputItem": "Stone Axe",
        "outputCategory": "Tool",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier I+: Improvised Workbench / Reinforced Metal Workstation / High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Wooden Handle",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Stone Tool Head",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 1,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 1, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Reality check: handle, binding, and head/blade should be separate input slots so substitutions work by tag.",
        "mainMaterialSlots": "2",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Edge"
    },
    {
        "recipeNumber": 122,
        "code": "STONE_PICKAXE",
        "outputItem": "Stone Pickaxe",
        "outputCategory": "Tool",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier I+: Improvised Workbench / Reinforced Metal Workstation / High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Wooden Handle",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Stone Tool Head",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 1,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 1, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Reality check: handle, binding, and head/blade should be separate input slots so substitutions work by tag.",
        "mainMaterialSlots": "2",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Edge"
    },
    {
        "recipeNumber": 123,
        "code": "STONE_SHOVEL",
        "outputItem": "Stone Shovel",
        "outputCategory": "Tool",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier I+: Improvised Workbench / Reinforced Metal Workstation / High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Wooden Handle",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Stone Tool Head",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 1,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 1, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Reality check: handle, binding, and head/blade should be separate input slots so substitutions work by tag.",
        "mainMaterialSlots": "2",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Structural, Edge"
    },
    {
        "recipeNumber": 124,
        "code": "STONE_HOE",
        "outputItem": "Stone Hoe",
        "outputCategory": "Tool",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier I+: Improvised Workbench / Reinforced Metal Workstation / High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Wooden Handle",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Stone Tool Head",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 1,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 1, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Reality check: handle, binding, and head/blade should be separate input slots so substitutions work by tag.",
        "mainMaterialSlots": "2",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Structural, Edge"
    },
    {
        "recipeNumber": 125,
        "code": "COPPER_AXE",
        "outputItem": "Copper Axe",
        "outputCategory": "Tool",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier II+: Reinforced Metal Workstation / High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Wooden Handle",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Copper Tool Head",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 10,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 10, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Reality check: handle, binding, and head/blade should be separate input slots so substitutions work by tag.",
        "mainMaterialSlots": "2",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Edge"
    },
    {
        "recipeNumber": 126,
        "code": "COPPER_PICKAXE",
        "outputItem": "Copper Pickaxe",
        "outputCategory": "Tool",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier II+: Reinforced Metal Workstation / High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Wooden Handle",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Copper Tool Head",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 10,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 10, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Reality check: handle, binding, and head/blade should be separate input slots so substitutions work by tag.",
        "mainMaterialSlots": "2",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Edge"
    },
    {
        "recipeNumber": 127,
        "code": "COPPER_SHOVEL",
        "outputItem": "Copper Shovel",
        "outputCategory": "Tool",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier II+: Reinforced Metal Workstation / High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Wooden Handle",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Copper Tool Head",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 10,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 10, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Reality check: handle, binding, and head/blade should be separate input slots so substitutions work by tag.",
        "mainMaterialSlots": "2",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Structural, Edge"
    },
    {
        "recipeNumber": 128,
        "code": "COPPER_HOE",
        "outputItem": "Copper Hoe",
        "outputCategory": "Tool",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier II+: Reinforced Metal Workstation / High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Wooden Handle",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Copper Tool Head",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 10,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 10, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Reality check: handle, binding, and head/blade should be separate input slots so substitutions work by tag.",
        "mainMaterialSlots": "2",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Structural, Edge"
    },
    {
        "recipeNumber": 129,
        "code": "IRON_AXE",
        "outputItem": "Iron Axe",
        "outputCategory": "Tool",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier II+: Reinforced Metal Workstation / High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Wooden Handle",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Iron Tool Head",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Reality check: handle, binding, and head/blade should be separate input slots so substitutions work by tag.",
        "mainMaterialSlots": "2",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Edge"
    },
    {
        "recipeNumber": 130,
        "code": "IRON_PICKAXE",
        "outputItem": "Iron Pickaxe",
        "outputCategory": "Tool",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier II+: Reinforced Metal Workstation / High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Wooden Handle",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Iron Tool Head",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Reality check: handle, binding, and head/blade should be separate input slots so substitutions work by tag.",
        "mainMaterialSlots": "2",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Edge"
    },
    {
        "recipeNumber": 131,
        "code": "IRON_SHOVEL",
        "outputItem": "Iron Shovel",
        "outputCategory": "Tool",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier II+: Reinforced Metal Workstation / High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Wooden Handle",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Iron Tool Head",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Reality check: handle, binding, and head/blade should be separate input slots so substitutions work by tag.",
        "mainMaterialSlots": "2",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Structural, Edge"
    },
    {
        "recipeNumber": 132,
        "code": "IRON_HOE",
        "outputItem": "Iron Hoe",
        "outputCategory": "Tool",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier II+: Reinforced Metal Workstation / High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Wooden Handle",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Iron Tool Head",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Reality check: handle, binding, and head/blade should be separate input slots so substitutions work by tag.",
        "mainMaterialSlots": "2",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Structural, Edge"
    },
    {
        "recipeNumber": 133,
        "code": "ALUMINUM_AXE",
        "outputItem": "Aluminum Axe",
        "outputCategory": "Tool",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Wooden Handle",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Aluminum Tool Head",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 40,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 40, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Reality check: handle, binding, and head/blade should be separate input slots so substitutions work by tag.",
        "mainMaterialSlots": "2",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Edge"
    },
    {
        "recipeNumber": 134,
        "code": "ALUMINUM_PICKAXE",
        "outputItem": "Aluminum Pickaxe",
        "outputCategory": "Tool",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Wooden Handle",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Aluminum Tool Head",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 40,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 40, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Reality check: handle, binding, and head/blade should be separate input slots so substitutions work by tag.",
        "mainMaterialSlots": "2",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Edge"
    },
    {
        "recipeNumber": 135,
        "code": "ALUMINUM_SHOVEL",
        "outputItem": "Aluminum Shovel",
        "outputCategory": "Tool",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Wooden Handle",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Aluminum Tool Head",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 40,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 40, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Reality check: handle, binding, and head/blade should be separate input slots so substitutions work by tag.",
        "mainMaterialSlots": "2",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Structural, Edge"
    },
    {
        "recipeNumber": 136,
        "code": "ALUMINUM_HOE",
        "outputItem": "Aluminum Hoe",
        "outputCategory": "Tool",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Wooden Handle",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Aluminum Tool Head",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 40,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 40, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Reality check: handle, binding, and head/blade should be separate input slots so substitutions work by tag.",
        "mainMaterialSlots": "2",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Structural, Edge"
    },
    {
        "recipeNumber": 137,
        "code": "MAKESHIFT_GRILL_RACK",
        "outputItem": "Makeshift Grill Rack",
        "outputCategory": "Tool",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier II+: Reinforced Metal Workstation / High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Rubbish, Recyclable, Metal",
                "quantity": 2
            }
        ],
        "requiredSkillLevel": 10,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 10, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Reality check: handle, binding, and head/blade should be separate input slots so substitutions work by tag.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Insulate, Structural"
    },
    {
        "recipeNumber": 138,
        "code": "SALVAGED_COOKING_POT",
        "outputItem": "Salvaged Cooking Pot",
        "outputCategory": "Tool",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier I+: Improvised Workbench / Reinforced Metal Workstation / High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Rubbish, Recyclable, Metal",
                "quantity": 3
            }
        ],
        "requiredSkillLevel": 10,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 10, Player Skill Level)",
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Reality check: handle, binding, and head/blade should be separate input slots so substitutions work by tag.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Insulate, Structural"
    },
    {
        "recipeNumber": 139,
        "code": "SCRAP_METAL_LADLE",
        "outputItem": "Scrap Metal Ladle",
        "outputCategory": "Tool",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier II+: Reinforced Metal Workstation / High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Metal, Iron/Aluminum",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Reality check: handle, binding, and head/blade should be separate input slots so substitutions work by tag.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Insulate, Structural"
    },
    {
        "recipeNumber": 140,
        "code": "SALVAGED_HAMMER",
        "outputItem": "Salvaged Hammer",
        "outputCategory": "Tool",
        "requiredJobCode": "crafting",
        "workstationAccess": "None (hand-craft, no workstation required)",
        "requiredTool": "None",
        "toolDurabilityCost": null,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Rubbish, Recyclable, Metal",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Branch or Log",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 10,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 10, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Genesis tool: craftable by hand with zero prerequisites so the tool chain can bootstrap. Fixed 2026: previously required Reinforced Crowbar (circular) and a pre-made Wooden Handle (also circular through Rusty Hand Saw).",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Impact, Structural"
    },
    {
        "recipeNumber": 141,
        "code": "RUSTY_HAND_SAW",
        "outputItem": "Rusty Hand Saw",
        "outputCategory": "Tool",
        "requiredJobCode": "crafting",
        "workstationAccess": "None (hand-craft, no workstation required)",
        "requiredTool": "Reinforced Crowbar",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Metal, Iron",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Wooden Handle",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 10,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 10, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Reality check: handle, binding, and head/blade should be separate input slots so substitutions work by tag.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Edge"
    },
    {
        "recipeNumber": 142,
        "code": "REINFORCED_CROWBAR",
        "outputItem": "Reinforced Crowbar",
        "outputCategory": "Tool",
        "requiredJobCode": "crafting",
        "workstationAccess": "None (hand-craft, no workstation required)",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Metal, Iron",
                "quantity": 2
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Reality check: handle, binding, and head/blade should be separate input slots so substitutions work by tag.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Impact, Structural"
    },
    {
        "recipeNumber": 143,
        "code": "SHARPENED_STONE_SHIV",
        "outputItem": "Sharpened Stone Shiv",
        "outputCategory": "Weapon",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Stone Tool Head",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Wooden Handle",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 1,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 1, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Reality check: handle, binding, and head/blade should be separate input slots so substitutions work by tag.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Edge"
    },
    {
        "recipeNumber": 144,
        "code": "BONE_SPEAR",
        "outputItem": "Bone Spear",
        "outputCategory": "Weapon",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Bone (any)",
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
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Reality check: handle, binding, and head/blade should be separate input slots so substitutions work by tag.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Edge"
    },
    {
        "recipeNumber": 145,
        "code": "SCRAP_METAL_MACHETE",
        "outputItem": "Scrap Metal Machete",
        "outputCategory": "Weapon",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Metal, Iron (Ingot)",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Wooden Handle",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 40,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 40, Player Skill Level)",
        "craftTimeSeconds": 300,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Reality check: handle, binding, and head/blade should be separate input slots so substitutions work by tag.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Edge"
    },
    {
        "recipeNumber": 146,
        "code": "REBAR_SLEDGE",
        "outputItem": "Rebar Sledge",
        "outputCategory": "Weapon",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Rubbish, Metal, Iron",
                "quantity": 3
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Wooden Handle",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 40,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 40, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Reality check: handle, binding, and head/blade should be separate input slots so substitutions work by tag.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Impact, Structural"
    },
    {
        "recipeNumber": 147,
        "code": "MAKESHIFT_BOW",
        "outputItem": "Makeshift Bow",
        "outputCategory": "Weapon",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Wood (Log)",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Bowstring",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 1,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 1, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Reality check: handle, binding, and head/blade should be separate input slots so substitutions work by tag.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Flexible, Structural"
    },
    {
        "recipeNumber": 148,
        "code": "SALVAGED_CROSSBOW",
        "outputItem": "Salvaged Crossbow",
        "outputCategory": "Weapon",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Wood (Log)",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Bowstring",
                "quantity": 1
            },
            {
                "slotIndex": 3,
                "tagQuery": "Material, Metal, Iron",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Reality check: handle, binding, and head/blade should be separate input slots so substitutions work by tag.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Flexible, Structural"
    },
    {
        "recipeNumber": 149,
        "code": "REINFORCED_COMPOUND_BOW",
        "outputItem": "Reinforced Compound Bow",
        "outputCategory": "Weapon",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Wood (Log)",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Bowstring",
                "quantity": 2
            },
            {
                "slotIndex": 3,
                "tagQuery": "Material, Metal, Aluminum",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 40,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 40, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Reality check: handle, binding, and head/blade should be separate input slots so substitutions work by tag.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Flexible, Structural"
    },
    {
        "recipeNumber": 150,
        "code": "REINFORCED_TACTICAL_CROSSBOW",
        "outputItem": "Reinforced Tactical Crossbow",
        "outputCategory": "Weapon",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Wood (Log)",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Bowstring",
                "quantity": 2
            },
            {
                "slotIndex": 3,
                "tagQuery": "Material, Metal, Aluminum",
                "quantity": 2
            }
        ],
        "requiredSkillLevel": 40,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 40, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Reality check: handle, binding, and head/blade should be separate input slots so substitutions work by tag.",
        "mainMaterialSlots": "1,3",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Flexible, Structural"
    },
    {
        "recipeNumber": 151,
        "code": "ZIP_GUN",
        "outputItem": "Zip Gun",
        "outputCategory": "Weapon",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Iron Gun Barrel",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Iron Gun Frame",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Reality check: handle, binding, and head/blade should be separate input slots so substitutions work by tag.",
        "mainMaterialSlots": "1,2",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Structural, Insulate"
    },
    {
        "recipeNumber": 152,
        "code": "PIPE_SHOTGUN",
        "outputItem": "Pipe Shotgun",
        "outputCategory": "Weapon",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Iron Gun Barrel",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Iron Gun Frame",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 30,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 30, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Reality check: handle, binding, and head/blade should be separate input slots so substitutions work by tag.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Structural, Insulate"
    },
    {
        "recipeNumber": 153,
        "code": "SHARPENED_WOODEN_ARROW",
        "outputItem": "Sharpened Wooden Arrow",
        "outputCategory": "Ammo",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier I+: Improvised Workbench / Reinforced Metal Workstation / High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Branch",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 1,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 1, Player Skill Level)",
        "craftTimeSeconds": 45,
        "workstationQueueSlot": "Instant craft",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 154,
        "code": "SCRAP_METAL_ARROW",
        "outputItem": "Scrap Metal Arrow",
        "outputCategory": "Ammo",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier II+: Reinforced Metal Workstation / High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Branch",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Metal, Iron",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 45,
        "workstationQueueSlot": "Instant craft",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": null,
        "mainMaterialSlots": "1,2",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 155,
        "code": "BROADHEAD_HUNTING_ARROW",
        "outputItem": "Broadhead Hunting Arrow",
        "outputCategory": "Ammo",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Branch",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Metal, Aluminum",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 40,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 40, Player Skill Level)",
        "craftTimeSeconds": 45,
        "workstationQueueSlot": "Instant craft",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": null,
        "mainMaterialSlots": "1,2",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 156,
        "code": "HAND_LOADED_PISTOL_ROUNDS",
        "outputItem": "Hand-loaded Pistol Rounds",
        "outputCategory": "Ammo",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier II+: Reinforced Metal Workstation / High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Gunpowder",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Metal, Zinc",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 45,
        "workstationQueueSlot": "Instant craft",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": null,
        "mainMaterialSlots": "1,2",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 157,
        "code": "IMPROVISED_SHOTGUN_SHELLS",
        "outputItem": "Improvised Shotgun Shells",
        "outputCategory": "Ammo",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Gunpowder",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Metal, Zinc",
                "quantity": 1
            },
            {
                "slotIndex": 3,
                "tagQuery": "Material, Plastic",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 40,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 40, Player Skill Level)",
        "craftTimeSeconds": 45,
        "workstationQueueSlot": "Instant craft",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": null,
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 158,
        "code": "PADDED_PUFFER_VEST",
        "outputItem": "Padded Puffer Vest",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Rubbish, Fabric",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Padding",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 1,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 1, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Set Starter - slot Vest Reality check: fabric/leather/padding/metal frame should be separate slots when possible.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Insulate, Cushion"
    },
    {
        "recipeNumber": 159,
        "code": "SKATE_HELMET",
        "outputItem": "Skate Helmet",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Rubbish, Fabric",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Padding",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 1,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 1, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Set Starter - slot Head Reality check: fabric/leather/padding/metal frame should be separate slots when possible.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Impact, Structural"
    },
    {
        "recipeNumber": 160,
        "code": "COTTON_T_SHIRT",
        "outputItem": "Cotton T-Shirt",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Rubbish, Fabric",
                "quantity": 2
            }
        ],
        "requiredSkillLevel": 1,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 1, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Set Starter - slot UpperBody Reality check: fabric/leather/padding/metal frame should be separate slots when possible.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Insulate, Cushion"
    },
    {
        "recipeNumber": 161,
        "code": "DENIM_JEANS",
        "outputItem": "Denim Jeans",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Rubbish, Fabric",
                "quantity": 2
            }
        ],
        "requiredSkillLevel": 1,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 1, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Set Starter - slot LowerBody Reality check: fabric/leather/padding/metal frame should be separate slots when possible.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Flexible, Structural"
    },
    {
        "recipeNumber": 162,
        "code": "WOOL_GLOVES",
        "outputItem": "Wool Gloves",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Rubbish, Fabric",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 1,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 1, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Set Starter - slot Hand Reality check: fabric/leather/padding/metal frame should be separate slots when possible.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Flexible, Cushion"
    },
    {
        "recipeNumber": 163,
        "code": "CANVAS_SHOES",
        "outputItem": "Canvas Shoes",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Rubbish, Fabric",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Rubbish, Rubber",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 1,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 1, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Set Starter - slot Leg Reality check: fabric/leather/padding/metal frame should be separate slots when possible.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Structural, Edge"
    },
    {
        "recipeNumber": 164,
        "code": "MOTOCROSS_CHEST_PROTECTOR",
        "outputItem": "Motocross Chest Protector",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Leather",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Padding",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 10,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 10, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Set Biker - slot Vest Reality check: fabric/leather/padding/metal frame should be separate slots when possible.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Impact, Structural"
    },
    {
        "recipeNumber": 165,
        "code": "MOTORCYCLE_HELMET",
        "outputItem": "Motorcycle Helmet",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Leather",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Padding",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 10,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 10, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Set Biker - slot Head Reality check: fabric/leather/padding/metal frame should be separate slots when possible.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Impact, Structural"
    },
    {
        "recipeNumber": 166,
        "code": "HEAVY_LEATHER_JACKET",
        "outputItem": "Heavy Leather Jacket",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Leather",
                "quantity": 2
            }
        ],
        "requiredSkillLevel": 10,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 10, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Set Biker - slot UpperBody Reality check: fabric/leather/padding/metal frame should be separate slots when possible.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Insulate, Cushion"
    },
    {
        "recipeNumber": 167,
        "code": "RIDING_JEANS_WITH_KNEE_PADS",
        "outputItem": "Riding Jeans with Knee Pads",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Leather",
                "quantity": 2
            }
        ],
        "requiredSkillLevel": 10,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 10, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Set Biker - slot LowerBody Reality check: fabric/leather/padding/metal frame should be separate slots when possible.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Flexible, Structural"
    },
    {
        "recipeNumber": 168,
        "code": "PADDED_BIKER_GLOVES",
        "outputItem": "Padded Biker Gloves",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Leather",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 10,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 10, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Set Biker - slot Hand Reality check: fabric/leather/padding/metal frame should be separate slots when possible.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Flexible, Cushion"
    },
    {
        "recipeNumber": 169,
        "code": "HIGH_TOP_SKATE_SNEAKERS",
        "outputItem": "High-Top Skate Sneakers",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Leather",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Rubbish, Rubber",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 10,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 10, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Set Biker - slot Leg Reality check: fabric/leather/padding/metal frame should be separate slots when possible.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Cushion, Structural"
    },
    {
        "recipeNumber": 170,
        "code": "APRON",
        "outputItem": "Apron",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Fabric",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Padding",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Set Chef I - slot Vest Reality check: fabric/leather/padding/metal frame should be separate slots when possible.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Insulate, Cushion"
    },
    {
        "recipeNumber": 171,
        "code": "CHEF_S_TOQUE",
        "outputItem": "Chef's Toque",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Fabric",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Padding",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Set Chef I - slot Head Reality check: fabric/leather/padding/metal frame should be separate slots when possible.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Insulate, Cushion"
    },
    {
        "recipeNumber": 172,
        "code": "CHEF_S_COAT",
        "outputItem": "Chef's Coat",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Fabric",
                "quantity": 2
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Set Chef I - slot UpperBody Reality check: fabric/leather/padding/metal frame should be separate slots when possible.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Insulate, Cushion"
    },
    {
        "recipeNumber": 173,
        "code": "CHEF_S_JEANS",
        "outputItem": "Chef's Jeans",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Fabric",
                "quantity": 2
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Set Chef I - slot LowerBody Reality check: fabric/leather/padding/metal frame should be separate slots when possible.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Flexible, Structural"
    },
    {
        "recipeNumber": 174,
        "code": "CHEF_S_GLOVES",
        "outputItem": "Chef's Gloves",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Fabric",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Set Chef I - slot Hand Reality check: fabric/leather/padding/metal frame should be separate slots when possible.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Flexible, Cushion"
    },
    {
        "recipeNumber": 175,
        "code": "KITCHEN_SNEAKERS",
        "outputItem": "Kitchen Sneakers",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Fabric",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Rubbish, Rubber",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Set Chef I - slot Leg Reality check: fabric/leather/padding/metal frame should be separate slots when possible.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Cushion, Structural"
    },
    {
        "recipeNumber": 176,
        "code": "HEAT_RESISTANT_APRON",
        "outputItem": "Heat-Resistant Apron",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Fabric Panel",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Padding",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 40,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 40, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Set Chef II - slot Vest Reality check: fabric/leather/padding/metal frame should be separate slots when possible.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Insulate, Cushion"
    },
    {
        "recipeNumber": 177,
        "code": "INSULATED_CHEF_S_CAP",
        "outputItem": "Insulated Chef's Cap",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Fabric Panel",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Padding",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 40,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 40, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Set Chef II - slot Head Reality check: fabric/leather/padding/metal frame should be separate slots when possible.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Insulate, Cushion"
    },
    {
        "recipeNumber": 178,
        "code": "FIRE_RETARDANT_CHEF_S_COAT",
        "outputItem": "Fire-Retardant Chef's Coat",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Fabric Panel",
                "quantity": 2
            }
        ],
        "requiredSkillLevel": 40,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 40, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Set Chef II - slot UpperBody Reality check: fabric/leather/padding/metal frame should be separate slots when possible.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Insulate, Cushion"
    },
    {
        "recipeNumber": 179,
        "code": "GREASE_PROOF_CHEF_S_TROUSERS",
        "outputItem": "Grease-Proof Chef's Trousers",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Fabric Panel",
                "quantity": 2
            }
        ],
        "requiredSkillLevel": 40,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 40, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Set Chef II - slot LowerBody Reality check: fabric/leather/padding/metal frame should be separate slots when possible.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Flexible, Structural"
    },
    {
        "recipeNumber": 180,
        "code": "HEAT_RESISTANT_COOKING_GLOVES",
        "outputItem": "Heat-Resistant Cooking Gloves",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Fabric Panel",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 40,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 40, Player Skill Level)",
        "craftTimeSeconds": 120,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Set Chef II - slot Hand Reality check: fabric/leather/padding/metal frame should be separate slots when possible.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Flexible, Cushion"
    },
    {
        "recipeNumber": 181,
        "code": "NON_SLIP_KITCHEN_BOOTS",
        "outputItem": "Non-Slip Kitchen Boots",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Fabric Panel",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Rubbish, Rubber",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 40,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 40, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Set Chef II - slot Leg Reality check: fabric/leather/padding/metal frame should be separate slots when possible.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Cushion, Structural"
    },
    {
        "recipeNumber": 182,
        "code": "HI_VIS_CONSTRUCTION_VEST",
        "outputItem": "Hi-Vis Construction Vest",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Fabric Panel",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Padding",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Set Construction I - slot Vest Reality check: fabric/leather/padding/metal frame should be separate slots when possible.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Insulate, Cushion"
    },
    {
        "recipeNumber": 183,
        "code": "IMPACT_CONSTRUCTION_HELMET",
        "outputItem": "Impact Construction Helmet",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Fabric Panel",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Padding",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Set Construction I - slot Head Reality check: fabric/leather/padding/metal frame should be separate slots when possible.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Impact, Structural"
    },
    {
        "recipeNumber": 184,
        "code": "HEAVY_FLANNEL_CONSTRUCTION_SHIRT",
        "outputItem": "Heavy Flannel Construction Shirt",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Fabric Panel",
                "quantity": 2
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Set Construction I - slot UpperBody Reality check: fabric/leather/padding/metal frame should be separate slots when possible.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Insulate, Cushion"
    },
    {
        "recipeNumber": 185,
        "code": "DOUBLE_KNEE_WORK_PANTS",
        "outputItem": "Double-Knee Work Pants",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Fabric Panel",
                "quantity": 2
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Set Construction I - slot LowerBody Reality check: fabric/leather/padding/metal frame should be separate slots when possible.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Flexible, Structural"
    },
    {
        "recipeNumber": 186,
        "code": "IMPACT_RESISTANT_PROTECTIVE_GLOVES",
        "outputItem": "Impact-Resistant Protective Gloves",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Fabric Panel",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Set Construction I - slot Hand Reality check: fabric/leather/padding/metal frame should be separate slots when possible.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Flexible, Cushion"
    },
    {
        "recipeNumber": 187,
        "code": "STEEL_TOE_SAFETY_SHOES",
        "outputItem": "Steel-Toe Safety Shoes",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Fabric Panel",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Rubbish, Rubber",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Set Construction I - slot Leg Reality check: fabric/leather/padding/metal frame should be separate slots when possible.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Structural, Edge"
    },
    {
        "recipeNumber": 188,
        "code": "REINFORCED_HI_VIS_VEST",
        "outputItem": "Reinforced Hi-Vis Vest",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Metal, Iron",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Padding",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 40,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 40, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Set Construction II - slot Vest Reality check: fabric/leather/padding/metal frame should be separate slots when possible.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Insulate, Cushion"
    },
    {
        "recipeNumber": 189,
        "code": "FULL_FACE_CONSTRUCTION_HELMET",
        "outputItem": "Full-Face Construction Helmet",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Metal, Iron",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Padding",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 40,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 40, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Set Construction II - slot Head Reality check: fabric/leather/padding/metal frame should be separate slots when possible.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Impact, Structural"
    },
    {
        "recipeNumber": 190,
        "code": "KEVLAR_LINED_WORK_SHIRT",
        "outputItem": "Kevlar-Lined Work Shirt",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Metal, Iron",
                "quantity": 2
            }
        ],
        "requiredSkillLevel": 40,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 40, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Set Construction II - slot UpperBody Reality check: fabric/leather/padding/metal frame should be separate slots when possible.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Insulate, Cushion"
    },
    {
        "recipeNumber": 191,
        "code": "REINFORCED_WORK_OVERALLS",
        "outputItem": "Reinforced Work Overalls",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Metal, Iron",
                "quantity": 2
            }
        ],
        "requiredSkillLevel": 40,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 40, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Set Construction II - slot LowerBody Reality check: fabric/leather/padding/metal frame should be separate slots when possible.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Flexible, Structural"
    },
    {
        "recipeNumber": 192,
        "code": "ANTI_VIBRATION_WORK_GLOVES",
        "outputItem": "Anti-Vibration Work Gloves",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Metal, Iron",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 40,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 40, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Set Construction II - slot Hand Reality check: fabric/leather/padding/metal frame should be separate slots when possible.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Flexible, Cushion"
    },
    {
        "recipeNumber": 193,
        "code": "STEEL_PLATED_WORK_BOOTS",
        "outputItem": "Steel-Plated Work Boots",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Metal, Iron",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Rubbish, Rubber",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 40,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 40, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Set Construction II - slot Leg Reality check: fabric/leather/padding/metal frame should be separate slots when possible.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Cushion, Structural"
    },
    {
        "recipeNumber": 194,
        "code": "GATHERER_S_UTILITY_VEST",
        "outputItem": "Gatherer's Utility Vest",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Fabric Panel",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Padding",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Set Gathering I - slot Vest Reality check: fabric/leather/padding/metal frame should be separate slots when possible.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Insulate, Cushion"
    },
    {
        "recipeNumber": 195,
        "code": "PROSPECTOR_S_HARDHAT",
        "outputItem": "Prospector's Hardhat",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Fabric Panel",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Padding",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Set Gathering I - slot Head Reality check: fabric/leather/padding/metal frame should be separate slots when possible.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Impact, Structural"
    },
    {
        "recipeNumber": 196,
        "code": "REINFORCED_CANVAS_JACKET",
        "outputItem": "Reinforced Canvas Jacket",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Fabric Panel",
                "quantity": 2
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Set Gathering I - slot UpperBody Reality check: fabric/leather/padding/metal frame should be separate slots when possible.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Insulate, Cushion"
    },
    {
        "recipeNumber": 197,
        "code": "HEAVY_DUTY_CARGO_PANTS",
        "outputItem": "Heavy-Duty Cargo Pants",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Fabric Panel",
                "quantity": 2
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Set Gathering I - slot LowerBody Reality check: fabric/leather/padding/metal frame should be separate slots when possible.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Flexible, Structural"
    },
    {
        "recipeNumber": 198,
        "code": "GRIP_ENHANCING_WORK_GLOVES",
        "outputItem": "Grip-Enhancing Work Gloves",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Fabric Panel",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Set Gathering I - slot Hand Reality check: fabric/leather/padding/metal frame should be separate slots when possible.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Flexible, Cushion"
    },
    {
        "recipeNumber": 199,
        "code": "STEEL_TOE_FORAGING_BOOTS",
        "outputItem": "Steel-Toe Foraging Boots",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Fabric Panel",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Rubbish, Rubber",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Set Gathering I - slot Leg Reality check: fabric/leather/padding/metal frame should be separate slots when possible.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Cushion, Structural"
    },
    {
        "recipeNumber": 200,
        "code": "EXPEDITION_UTILITY_VEST",
        "outputItem": "Expedition Utility Vest",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Leather",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Padding",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 40,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 40, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Set Gathering II - slot Vest Reality check: fabric/leather/padding/metal frame should be separate slots when possible.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Insulate, Cushion"
    },
    {
        "recipeNumber": 201,
        "code": "REINFORCED_PROSPECTOR_S_HELMET",
        "outputItem": "Reinforced Prospector's Helmet",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Leather",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Padding",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 40,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 40, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Set Gathering II - slot Head Reality check: fabric/leather/padding/metal frame should be separate slots when possible.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Impact, Structural"
    },
    {
        "recipeNumber": 202,
        "code": "ALL_WEATHER_FIELD_JACKET",
        "outputItem": "All-Weather Field Jacket",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Leather",
                "quantity": 2
            }
        ],
        "requiredSkillLevel": 40,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 40, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Set Gathering II - slot UpperBody Reality check: fabric/leather/padding/metal frame should be separate slots when possible.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Insulate, Cushion"
    },
    {
        "recipeNumber": 203,
        "code": "RUGGED_TRAIL_TROUSERS",
        "outputItem": "Rugged Trail Trousers",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Leather",
                "quantity": 2
            }
        ],
        "requiredSkillLevel": 40,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 40, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Set Gathering II - slot LowerBody Reality check: fabric/leather/padding/metal frame should be separate slots when possible.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Flexible, Structural"
    },
    {
        "recipeNumber": 204,
        "code": "THORNPROOF_FORAGING_GLOVES",
        "outputItem": "Thornproof Foraging Gloves",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Leather",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 40,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 40, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Set Gathering II - slot Hand Reality check: fabric/leather/padding/metal frame should be separate slots when possible.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Flexible, Cushion"
    },
    {
        "recipeNumber": 205,
        "code": "TRAILBLAZER_HIKING_BOOTS",
        "outputItem": "Trailblazer Hiking Boots",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Leather",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Rubbish, Rubber",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 40,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 40, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Set Gathering II - slot Leg Reality check: fabric/leather/padding/metal frame should be separate slots when possible.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Cushion, Structural"
    },
    {
        "recipeNumber": 206,
        "code": "WELDER_S_LEATHER_APRON",
        "outputItem": "Welder's Leather Apron",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Leather",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Padding",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Set Crafting I - slot Vest Reality check: fabric/leather/padding/metal frame should be separate slots when possible.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Insulate, Cushion"
    },
    {
        "recipeNumber": 207,
        "code": "FLIP_UP_WELDING_MASK",
        "outputItem": "Flip-Up Welding Mask",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Leather",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Padding",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Set Crafting I - slot Head Reality check: fabric/leather/padding/metal frame should be separate slots when possible.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Impact, Structural"
    },
    {
        "recipeNumber": 208,
        "code": "OIL_STAINED_COVERALL_TOP",
        "outputItem": "Oil-Stained Coverall Top",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Leather",
                "quantity": 2
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Set Crafting I - slot UpperBody Reality check: fabric/leather/padding/metal frame should be separate slots when possible.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Insulate, Cushion"
    },
    {
        "recipeNumber": 209,
        "code": "DENIM_MECHANIC_TROUSERS",
        "outputItem": "Denim Mechanic Trousers",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Leather",
                "quantity": 2
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Set Crafting I - slot LowerBody Reality check: fabric/leather/padding/metal frame should be separate slots when possible.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Flexible, Structural"
    },
    {
        "recipeNumber": 210,
        "code": "THICK_LEATHER_WELDING_GLOVES",
        "outputItem": "Thick Leather Welding Gloves",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Leather",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Set Crafting I - slot Hand Reality check: fabric/leather/padding/metal frame should be separate slots when possible.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Flexible, Cushion"
    },
    {
        "recipeNumber": 211,
        "code": "OIL_RESISTANT_WORK_BOOTS",
        "outputItem": "Oil-Resistant Work Boots",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Leather",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Rubbish, Rubber",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Set Crafting I - slot Leg Reality check: fabric/leather/padding/metal frame should be separate slots when possible.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Cushion, Structural"
    },
    {
        "recipeNumber": 212,
        "code": "HEAVY_DUTY_WELDING_APRON",
        "outputItem": "Heavy-Duty Welding Apron",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Metal, Aluminum",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Padding",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 40,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 40, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Set Crafting II - slot Vest Reality check: fabric/leather/padding/metal frame should be separate slots when possible.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Insulate, Cushion"
    },
    {
        "recipeNumber": 213,
        "code": "FULL_FACE_WELDING_HELMET",
        "outputItem": "Full-Face Welding Helmet",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Metal, Aluminum",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Padding",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 40,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 40, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Set Crafting II - slot Head Reality check: fabric/leather/padding/metal frame should be separate slots when possible.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Impact, Structural"
    },
    {
        "recipeNumber": 214,
        "code": "FLAME_RESISTANT_COVERALLS",
        "outputItem": "Flame-Resistant Coveralls",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Metal, Aluminum",
                "quantity": 2
            }
        ],
        "requiredSkillLevel": 40,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 40, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Set Crafting II - slot UpperBody Reality check: fabric/leather/padding/metal frame should be separate slots when possible.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Insulate, Cushion"
    },
    {
        "recipeNumber": 215,
        "code": "REINFORCED_MECHANIC_TROUSERS",
        "outputItem": "Reinforced Mechanic Trousers",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Metal, Aluminum",
                "quantity": 2
            }
        ],
        "requiredSkillLevel": 40,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 40, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Set Crafting II - slot LowerBody Reality check: fabric/leather/padding/metal frame should be separate slots when possible.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Flexible, Structural"
    },
    {
        "recipeNumber": 216,
        "code": "INSULATED_WELDING_GAUNTLETS",
        "outputItem": "Insulated Welding Gauntlets",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Metal, Aluminum",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 40,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 40, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Set Crafting II - slot Hand Reality check: fabric/leather/padding/metal frame should be separate slots when possible.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Flexible, Cushion"
    },
    {
        "recipeNumber": 217,
        "code": "STEEL_TOE_MECHANIC_BOOTS",
        "outputItem": "Steel-Toe Mechanic Boots",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Metal, Aluminum",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Rubbish, Rubber",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 40,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 40, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Set Crafting II - slot Leg Reality check: fabric/leather/padding/metal frame should be separate slots when possible.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Cushion, Structural"
    },
    {
        "recipeNumber": 218,
        "code": "TACTICAL_SCAVENGER_HARNESS",
        "outputItem": "Tactical Scavenger Harness",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Fabric Panel",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Padding",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Set Scavenger I - slot Vest Reality check: fabric/leather/padding/metal frame should be separate slots when possible.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Structural, Bind"
    },
    {
        "recipeNumber": 219,
        "code": "SCAVENGER_S_RESPIRATOR_MASK",
        "outputItem": "Scavenger's Respirator Mask",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Fabric Panel",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Padding",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Set Scavenger I - slot Head Reality check: fabric/leather/padding/metal frame should be separate slots when possible.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Impact, Structural"
    },
    {
        "recipeNumber": 220,
        "code": "BITE_PROOF_PADDED_HOODIE",
        "outputItem": "Bite-Proof Padded Hoodie",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Fabric Panel",
                "quantity": 2
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Set Scavenger I - slot UpperBody Reality check: fabric/leather/padding/metal frame should be separate slots when possible.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Insulate, Cushion"
    },
    {
        "recipeNumber": 221,
        "code": "FLEXIBLE_ATHLETIC_JOGGERS",
        "outputItem": "Flexible Athletic Joggers",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Fabric Panel",
                "quantity": 2
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Set Scavenger I - slot LowerBody Reality check: fabric/leather/padding/metal frame should be separate slots when possible.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Flexible, Structural"
    },
    {
        "recipeNumber": 222,
        "code": "FINGERLESS_COMBAT_GLOVES",
        "outputItem": "Fingerless Combat Gloves",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Fabric Panel",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Set Scavenger I - slot Hand Reality check: fabric/leather/padding/metal frame should be separate slots when possible.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Flexible, Cushion"
    },
    {
        "recipeNumber": 223,
        "code": "SILENT_SOLE_RUNNING_SHOES",
        "outputItem": "Silent Sole Running Shoes",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Fabric Panel",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Rubbish, Rubber",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Set Scavenger I - slot Leg Reality check: fabric/leather/padding/metal frame should be separate slots when possible.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Structural, Edge"
    },
    {
        "recipeNumber": 224,
        "code": "REINFORCED_SCAVENGER_RIG",
        "outputItem": "Reinforced Scavenger Rig",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Leather",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Padding",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 40,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 40, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Set Scavenger II - slot Vest Reality check: fabric/leather/padding/metal frame should be separate slots when possible.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Structural, Bind"
    },
    {
        "recipeNumber": 225,
        "code": "FULL_SEAL_RESPIRATOR_MASK",
        "outputItem": "Full-Seal Respirator Mask",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Leather",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Padding",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 40,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 40, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Set Scavenger II - slot Head Reality check: fabric/leather/padding/metal frame should be separate slots when possible.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Impact, Structural"
    },
    {
        "recipeNumber": 226,
        "code": "PUNCTURE_RESISTANT_FIELD_JACKET",
        "outputItem": "Puncture-Resistant Field Jacket",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Leather",
                "quantity": 2
            }
        ],
        "requiredSkillLevel": 40,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 40, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Set Scavenger II - slot UpperBody Reality check: fabric/leather/padding/metal frame should be separate slots when possible.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Insulate, Cushion"
    },
    {
        "recipeNumber": 227,
        "code": "REINFORCED_CARGO_JOGGERS",
        "outputItem": "Reinforced Cargo Joggers",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Leather",
                "quantity": 2
            }
        ],
        "requiredSkillLevel": 40,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 40, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Set Scavenger II - slot LowerBody Reality check: fabric/leather/padding/metal frame should be separate slots when possible.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Flexible, Structural"
    },
    {
        "recipeNumber": 228,
        "code": "GRIP_LINED_TACTICAL_GLOVES",
        "outputItem": "Grip-Lined Tactical Gloves",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Leather",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 40,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 40, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Set Scavenger II - slot Hand Reality check: fabric/leather/padding/metal frame should be separate slots when possible.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Flexible, Cushion"
    },
    {
        "recipeNumber": 229,
        "code": "SILENT_URBAN_TREKKING_BOOTS",
        "outputItem": "Silent Urban Trekking Boots",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Leather",
                "quantity": 1
            },
            {
                "slotIndex": 2,
                "tagQuery": "Rubbish, Rubber",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 40,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 40, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "Set Scavenger II - slot Leg Reality check: fabric/leather/padding/metal frame should be separate slots when possible.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Cushion, Structural"
    },
    {
        "recipeNumber": 230,
        "code": "DUCT_TAPED_TOTE_SACK",
        "outputItem": "Duct-Taped Tote Sack",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Rubbish, Plastic or Fabric (recycled bag or sack)",
                "quantity": 3
            }
        ],
        "requiredSkillLevel": 1,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 1, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "[NEW] Backpack tier 0 - DIY tho so Reality check: fabric/leather/padding/metal frame should be separate slots when possible. Backpack progression added from a.xlsx.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Structural, Bind"
    },
    {
        "recipeNumber": 231,
        "code": "SEWN_FEED_SACK_PACK",
        "outputItem": "Sewn Feed Sack Pack",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Rubbish, Fabric (feed sack)",
                "quantity": 3
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Cordage",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 1,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 1, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "[NEW] Backpack tier 0 - DIY tho so Reality check: fabric/leather/padding/metal frame should be separate slots when possible. Backpack progression added from a.xlsx.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Structural, Bind"
    },
    {
        "recipeNumber": 232,
        "code": "SCHOOL_BACKPACK",
        "outputItem": "School Backpack",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Fabric",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Cordage",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 10,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 10, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "[NEW] Backpack I Reality check: fabric/leather/padding/metal frame should be separate slots when possible. Backpack progression added from a.xlsx.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Structural, Bind"
    },
    {
        "recipeNumber": 233,
        "code": "HIKING_DAYPACK",
        "outputItem": "Hiking Daypack",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Fabric",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Leather",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 10,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 10, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "[NEW] Backpack I Reality check: fabric/leather/padding/metal frame should be separate slots when possible. Backpack progression added from a.xlsx.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Structural, Bind"
    },
    {
        "recipeNumber": 234,
        "code": "TACTICAL_MESSENGER_BAG",
        "outputItem": "Tactical Messenger Bag",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Fabric Panel",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Metal, Iron (lock or frame)",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "[NEW] Backpack II Reality check: fabric/leather/padding/metal frame should be separate slots when possible. Backpack progression added from a.xlsx.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Structural, Bind"
    },
    {
        "recipeNumber": 235,
        "code": "HUNTING_RUCKSACK",
        "outputItem": "Hunting Rucksack",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Leather",
                "quantity": 2
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Fabric Panel",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "[NEW] Backpack II Reality check: fabric/leather/padding/metal frame should be separate slots when possible. Backpack progression added from a.xlsx.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Structural, Bind"
    },
    {
        "recipeNumber": 236,
        "code": "MILITARY_FIELD_RUCKSACK",
        "outputItem": "Military Field Rucksack",
        "outputCategory": "Equipment",
        "requiredJobCode": "crafting",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Fabric Panel",
                "quantity": 3
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Metal, Aluminum (frame)",
                "quantity": 1
            },
            {
                "slotIndex": 3,
                "tagQuery": "Material, Padding",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 30,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 30, Player Skill Level)",
        "craftTimeSeconds": 90,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "Gear CUREL",
        "designNotes": "[NEW] Backpack III Reality check: fabric/leather/padding/metal frame should be separate slots when possible. Backpack progression added from a.xlsx.",
        "mainMaterialSlots": "1",
        "curelMechanic": "Skill-based roll (Gear rarity from crafter Skill Level, independent of materials)",
        "requiredUseCaseTags": "Structural, Bind"
    },
    {
        "recipeNumber": 237,
        "code": "CAMPING_TENT",
        "outputItem": "Camping Tent",
        "outputCategory": "Building",
        "requiredJobCode": "building",
        "workstationAccess": "Placement: direct build at target location",
        "requiredTool": "Reinforced Crowbar",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Fabric",
                "quantity": 3
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Branch",
                "quantity": 4
            }
        ],
        "requiredSkillLevel": 1,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 1, Player Skill Level)",
        "craftTimeSeconds": 180,
        "workstationQueueSlot": "Build placement queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Placement craft: materials define quality; crowbar is a placement tool and is excluded from output level.",
        "mainMaterialSlots": "2",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 238,
        "code": "TARP_LEAN_TO_SHELTER",
        "outputItem": "Tarp Lean-to Shelter",
        "outputCategory": "Building",
        "requiredJobCode": "building",
        "workstationAccess": "Placement: direct build at target location",
        "requiredTool": "Reinforced Crowbar",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Rubbish, Plastic",
                "quantity": 3
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Branch",
                "quantity": 3
            }
        ],
        "requiredSkillLevel": 1,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 1, Player Skill Level)",
        "craftTimeSeconds": 180,
        "workstationQueueSlot": "Build placement queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Placement craft: materials define quality; crowbar is a placement tool and is excluded from output level.",
        "mainMaterialSlots": "2",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 239,
        "code": "SALVAGED_MATTRESS_BED",
        "outputItem": "Salvaged Mattress Bed",
        "outputCategory": "Building",
        "requiredJobCode": "building",
        "workstationAccess": "Placement: direct build at target location",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Rubbish, Fabric/NonRecyclable",
                "quantity": 3
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Wood (Log)",
                "quantity": 2
            }
        ],
        "requiredSkillLevel": 10,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 10, Player Skill Level)",
        "craftTimeSeconds": 180,
        "workstationQueueSlot": "Build placement queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Placement craft: materials define quality; crowbar is a placement tool and is excluded from output level.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 240,
        "code": "RESTORED_DOUBLE_BED",
        "outputItem": "Restored Double Bed",
        "outputCategory": "Building",
        "requiredJobCode": "building",
        "workstationAccess": "Placement: direct build at target location",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Fabric",
                "quantity": 3
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Wood (Log)",
                "quantity": 4
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 180,
        "workstationQueueSlot": "Build placement queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Placement craft: materials define quality; crowbar is a placement tool and is excluded from output level.",
        "mainMaterialSlots": "2",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 241,
        "code": "CARDBOARD_BOX_STACK",
        "outputItem": "Cardboard Box Stack",
        "outputCategory": "Building",
        "requiredJobCode": "building",
        "workstationAccess": "Placement: direct build at target location",
        "requiredTool": "Reinforced Crowbar",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Rubbish, Non-recyclable (Cardboard)",
                "quantity": 3
            }
        ],
        "requiredSkillLevel": 5,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 5, Player Skill Level)",
        "craftTimeSeconds": 180,
        "workstationQueueSlot": "Build placement queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Placement craft: materials define quality; crowbar is a placement tool and is excluded from output level.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 242,
        "code": "WOODEN_CRATE",
        "outputItem": "Wooden Crate",
        "outputCategory": "Building",
        "requiredJobCode": "building",
        "workstationAccess": "Tier II+: Reinforced Metal Workstation / High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Wood (Log)",
                "quantity": 3
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Wooden Nail",
                "quantity": 4
            }
        ],
        "requiredSkillLevel": 10,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 10, Player Skill Level)",
        "craftTimeSeconds": 180,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Placement craft: materials define quality; crowbar is a placement tool and is excluded from output level.",
        "mainMaterialSlots": "2",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 243,
        "code": "LARGE_WOODEN_CHEST",
        "outputItem": "Large Wooden Chest",
        "outputCategory": "Building",
        "requiredJobCode": "building",
        "workstationAccess": "Tier II+: Reinforced Metal Workstation / High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Wood (Log)",
                "quantity": 5
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Wooden Nail",
                "quantity": 6
            },
            {
                "slotIndex": 3,
                "tagQuery": "Material, Metal Nail",
                "quantity": 2
            }
        ],
        "requiredSkillLevel": 10,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 10, Player Skill Level)",
        "craftTimeSeconds": 180,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Placement craft: materials define quality; crowbar is a placement tool and is excluded from output level.",
        "mainMaterialSlots": "2",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 244,
        "code": "PLASTIC_STORAGE_BIN",
        "outputItem": "Plastic Storage Bin",
        "outputCategory": "Building",
        "requiredJobCode": "building",
        "workstationAccess": "Tier II+: Reinforced Metal Workstation / High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Plastic",
                "quantity": 4
            }
        ],
        "requiredSkillLevel": 15,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 15, Player Skill Level)",
        "craftTimeSeconds": 180,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Placement craft: materials define quality; crowbar is a placement tool and is excluded from output level.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 245,
        "code": "STEEL_LOCKER",
        "outputItem": "Steel Locker",
        "outputCategory": "Building",
        "requiredJobCode": "building",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Metal, Iron",
                "quantity": 5
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Metal Nail",
                "quantity": 4
            }
        ],
        "requiredSkillLevel": 30,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 30, Player Skill Level)",
        "craftTimeSeconds": 180,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Placement craft: materials define quality; crowbar is a placement tool and is excluded from output level.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 246,
        "code": "MILITARY_AMMO_CRATE",
        "outputItem": "Military Ammo Crate",
        "outputCategory": "Building",
        "requiredJobCode": "building",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Metal, Iron",
                "quantity": 4
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Wooden Handle",
                "quantity": 1
            }
        ],
        "requiredSkillLevel": 30,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 30, Player Skill Level)",
        "craftTimeSeconds": 180,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Placement craft: materials define quality; crowbar is a placement tool and is excluded from output level.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 247,
        "code": "REINFORCED_SHIPPING_CONTAINER",
        "outputItem": "Reinforced Shipping Container",
        "outputCategory": "Building",
        "requiredJobCode": "building",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Metal, Aluminum",
                "quantity": 6
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Metal Nail",
                "quantity": 6
            }
        ],
        "requiredSkillLevel": 40,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 40, Player Skill Level)",
        "craftTimeSeconds": 180,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Placement craft: materials define quality; crowbar is a placement tool and is excluded from output level.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 248,
        "code": "SCAVENGED_FURNITURE_SET",
        "outputItem": "Scavenged Furniture Set",
        "outputCategory": "Building",
        "requiredJobCode": "building",
        "workstationAccess": "Tier II+: Reinforced Metal Workstation / High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Wood (Log)",
                "quantity": 4
            },
            {
                "slotIndex": 2,
                "tagQuery": "Rubbish",
                "quantity": 4
            }
        ],
        "requiredSkillLevel": 10,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 10, Player Skill Level)",
        "craftTimeSeconds": 180,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Placement craft: materials define quality; crowbar is a placement tool and is excluded from output level.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 249,
        "code": "RESTORED_FURNITURE_SET",
        "outputItem": "Restored Furniture Set",
        "outputCategory": "Building",
        "requiredJobCode": "building",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Wood (Log)",
                "quantity": 4
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Fabric",
                "quantity": 3
            },
            {
                "slotIndex": 3,
                "tagQuery": "Material, Leather",
                "quantity": 2
            }
        ],
        "requiredSkillLevel": 30,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 30, Player Skill Level)",
        "craftTimeSeconds": 180,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Placement craft: materials define quality; crowbar is a placement tool and is excluded from output level.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 250,
        "code": "CAMPFIRE",
        "outputItem": "Campfire",
        "outputCategory": "Building",
        "requiredJobCode": "building",
        "workstationAccess": "Placement: direct build at target location",
        "requiredTool": "Reinforced Crowbar",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Stone (Pebble)",
                "quantity": 4
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Branch",
                "quantity": 3
            }
        ],
        "requiredSkillLevel": 1,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 1, Player Skill Level)",
        "craftTimeSeconds": 180,
        "workstationQueueSlot": "Build placement queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Placement craft: materials define quality; crowbar is a placement tool and is excluded from output level.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 251,
        "code": "SALVAGED_WOOD_STOVE",
        "outputItem": "Salvaged Wood Stove",
        "outputCategory": "Building",
        "requiredJobCode": "building",
        "workstationAccess": "Tier II+: Reinforced Metal Workstation / High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Metal, Iron",
                "quantity": 4
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Stone (Pebble)",
                "quantity": 3
            }
        ],
        "requiredSkillLevel": 15,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 15, Player Skill Level)",
        "craftTimeSeconds": 180,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Placement craft: materials define quality; crowbar is a placement tool and is excluded from output level.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 252,
        "code": "REWIRED_ELECTRIC_STOVE",
        "outputItem": "Rewired Electric Stove",
        "outputCategory": "Building",
        "requiredJobCode": "building",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Metal, Aluminum",
                "quantity": 3
            },
            {
                "slotIndex": 2,
                "tagQuery": "Rubbish, Metal, Copper (day dien)",
                "quantity": 3
            }
        ],
        "requiredSkillLevel": 35,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 35, Player Skill Level)",
        "craftTimeSeconds": 180,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Placement craft: materials define quality; crowbar is a placement tool and is excluded from output level.",
        "mainMaterialSlots": "1,2",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 253,
        "code": "IMPROVISED_WORKBENCH",
        "outputItem": "Improvised Workbench",
        "outputCategory": "Building",
        "requiredJobCode": "building",
        "workstationAccess": "Placement: direct build at target location",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Wood (Log)",
                "quantity": 4
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Wooden Nail",
                "quantity": 4
            }
        ],
        "requiredSkillLevel": 1,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 1, Player Skill Level)",
        "craftTimeSeconds": 180,
        "workstationQueueSlot": "Build placement queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Placement craft: materials define quality; crowbar is a placement tool and is excluded from output level.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 254,
        "code": "REINFORCED_METAL_WORKSTATION",
        "outputItem": "Reinforced Metal Workstation",
        "outputCategory": "Building",
        "requiredJobCode": "building",
        "workstationAccess": "Tier I+: Improvised Workbench / Reinforced Metal Workstation / High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Metal, Iron",
                "quantity": 5
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Wood (Log)",
                "quantity": 2
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 180,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Placement craft: materials define quality; crowbar is a placement tool and is excluded from output level.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 255,
        "code": "HIGH_END_SALVAGE_WORKSTATION",
        "outputItem": "High-End Salvage Workstation",
        "outputCategory": "Building",
        "requiredJobCode": "building",
        "workstationAccess": "Tier II+: Reinforced Metal Workstation / High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Metal, Aluminum",
                "quantity": 5
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Metal, Iron",
                "quantity": 3
            }
        ],
        "requiredSkillLevel": 40,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 40, Player Skill Level)",
        "craftTimeSeconds": 180,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Placement craft: materials define quality; crowbar is a placement tool and is excluded from output level.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 256,
        "code": "FIELD_MEDICAL_STATION",
        "outputItem": "Field Medical Station",
        "outputCategory": "Building",
        "requiredJobCode": "building",
        "workstationAccess": "Tier I+: Improvised Workbench / Reinforced Metal Workstation / High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Fabric",
                "quantity": 3
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Metal, Iron",
                "quantity": 2
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 180,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Placement craft: materials define quality; crowbar is a placement tool and is excluded from output level.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 257,
        "code": "RESTORED_MEDICAL_LAB",
        "outputItem": "Restored Medical Lab",
        "outputCategory": "Building",
        "requiredJobCode": "building",
        "workstationAccess": "Tier I+: Improvised Workbench / Reinforced Metal Workstation / High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Fabric",
                "quantity": 4
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Metal, Aluminum",
                "quantity": 3
            }
        ],
        "requiredSkillLevel": 40,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 40, Player Skill Level)",
        "craftTimeSeconds": 180,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Placement craft: materials define quality; crowbar is a placement tool and is excluded from output level.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 258,
        "code": "MAKESHIFT_FURNACE",
        "outputItem": "Makeshift Furnace",
        "outputCategory": "Building",
        "requiredJobCode": "building",
        "workstationAccess": "Placement: direct build at target location",
        "requiredTool": "Reinforced Crowbar",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Stone (Boulder)",
                "quantity": 4
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Stone (Pebble)",
                "quantity": 4
            }
        ],
        "requiredSkillLevel": 10,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 10, Player Skill Level)",
        "craftTimeSeconds": 180,
        "workstationQueueSlot": "Build placement queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Placement craft: materials define quality; crowbar is a placement tool and is excluded from output level.",
        "mainMaterialSlots": "1,2",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 259,
        "code": "INDUSTRIAL_BLAST_FURNACE",
        "outputItem": "Industrial Blast Furnace",
        "outputCategory": "Building",
        "requiredJobCode": "building",
        "workstationAccess": "Tier III: High-End Salvage Workstation",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Metal, Iron",
                "quantity": 6
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Stone (Boulder)",
                "quantity": 4
            }
        ],
        "requiredSkillLevel": 30,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 30, Player Skill Level)",
        "craftTimeSeconds": 180,
        "workstationQueueSlot": "Workbench queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Placement craft: materials define quality; crowbar is a placement tool and is excluded from output level.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 260,
        "code": "WOODEN_STRUCTURE",
        "outputItem": "Wooden Structure",
        "outputCategory": "Building",
        "requiredJobCode": "building",
        "workstationAccess": "Placement: direct build at target location",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Wood (Log)",
                "quantity": 6
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Wooden Nail",
                "quantity": 6
            }
        ],
        "requiredSkillLevel": 15,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 15, Player Skill Level)",
        "craftTimeSeconds": 180,
        "workstationQueueSlot": "Build placement queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Placement craft: materials define quality; crowbar is a placement tool and is excluded from output level.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 261,
        "code": "STONE_STRUCTURE",
        "outputItem": "Stone Structure",
        "outputCategory": "Building",
        "requiredJobCode": "building",
        "workstationAccess": "Placement: direct build at target location",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Stone (Boulder)",
                "quantity": 6
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Metal, Iron",
                "quantity": 2
            }
        ],
        "requiredSkillLevel": 30,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 30, Player Skill Level)",
        "craftTimeSeconds": 180,
        "workstationQueueSlot": "Build placement queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Placement craft: materials define quality; crowbar is a placement tool and is excluded from output level.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 262,
        "code": "WOODEN_FENCE",
        "outputItem": "Wooden Fence",
        "outputCategory": "Building",
        "requiredJobCode": "building",
        "workstationAccess": "Placement: direct build at target location",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Wood (Log)",
                "quantity": 4
            },
            {
                "slotIndex": 2,
                "tagQuery": "Material, Wooden Nail",
                "quantity": 3
            }
        ],
        "requiredSkillLevel": 20,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 20, Player Skill Level)",
        "craftTimeSeconds": 180,
        "workstationQueueSlot": "Build placement queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Placement craft: materials define quality; crowbar is a placement tool and is excluded from output level.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
    },
    {
        "recipeNumber": 263,
        "code": "STONE_FENCE",
        "outputItem": "Stone Fence",
        "outputCategory": "Building",
        "requiredJobCode": "building",
        "workstationAccess": "Placement: direct build at target location",
        "requiredTool": "Salvaged Hammer",
        "toolDurabilityCost": 1,
        "inputs": [
            {
                "slotIndex": 1,
                "tagQuery": "Material, Stone (Boulder)",
                "quantity": 5
            }
        ],
        "requiredSkillLevel": 40,
        "outputLevelFormula": "MIN(AVG(non-tool input levels), 40, Player Skill Level)",
        "craftTimeSeconds": 180,
        "workstationQueueSlot": "Build placement queue",
        "curelRuleKey": "None (no CUREL - not Gear/Material)",
        "designNotes": "Placement craft: materials define quality; crowbar is a placement tool and is excluded from output level.",
        "mainMaterialSlots": "1",
        "curelMechanic": "N/A",
        "requiredUseCaseTags": "N/A"
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
        await seedLevelingRules();
        await seedCurelRules();
        await seedItemTypeRules();
        await seedStatDefinitions();
        await seedCraftingRecipes();
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
