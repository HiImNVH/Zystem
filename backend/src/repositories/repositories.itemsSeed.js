// backend/src/repositories/repositories.itemsSeed.js

const { gameDataDb } = require('./repositories.databaseDomains');
const itemTaxonomyService = require('../services/services.itemTaxonomy');
const dbPool = gameDataDb;

const DEFAULT_DROP_WEIGHTS = {
    common: 200,
    uncommon: 40,
    rare: 10,
    epic: 5,
    legendary: 1,
};

const STACKABLE_EXCLUDED_CATEGORIES = ['EQUIPMENT', 'SPECIAL'];
const SUPPORTED_CATEGORIES = itemTaxonomyService.MAIN_ITEM_CATEGORIES;

const REDUNDANT_TAGS = new Set([
    'materials',
    'consumables',
    'tools',
    'weapons',
    'structures',
]);

const TAG_NAME_ALIASES = {
    ammo: 'Ammo',
    armor: 'Armor',
    building: 'Building',
    equipment: 'Equipment',
    food: 'Food',
    material: 'Material',
    medicine: 'Medicine',
    tool: 'Tool',
    weapon: 'Weapon',
    smg: 'SMG',
};

const ITEM_TEMPLATES = [
    {
        "name": "Metal Scrap/Ore",
        "tags": [
            "MATERIAL",
            "MATERIALS",
            "Metal (Raw)",
            "Metal",
            "Raw",
            "Scrap",
            "Ore",
            "Recyclable"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Metal Ingot",
        "tags": [
            "MATERIAL",
            "MATERIALS",
            "Metal (Processed)",
            "Metal",
            "Processed",
            "Ingot"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Wood",
        "tags": [
            "MATERIAL",
            "MATERIALS",
            "Wood (Raw)",
            "Wood",
            "Raw"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Stone",
        "tags": [
            "MATERIAL",
            "MATERIALS",
            "Stone (Raw)",
            "Stone",
            "Raw"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Gemstone",
        "tags": [
            "MATERIAL",
            "MATERIALS",
            "Stone (Special)",
            "Stone",
            "Special",
            "Gemstone"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Synthetic Scrap",
        "tags": [
            "MATERIAL",
            "MATERIALS",
            "Synthetic (Raw)",
            "Synthetic",
            "Raw",
            "Scrap",
            "Recyclable"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Rubber",
        "tags": [
            "MATERIAL",
            "MATERIALS",
            "Synthetic (Processed)",
            "Synthetic",
            "Processed",
            "Rubber"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Fabric",
        "tags": [
            "MATERIAL",
            "MATERIALS",
            "Fabric (Raw)",
            "Fabric",
            "Raw"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Leather",
        "tags": [
            "MATERIAL",
            "MATERIALS",
            "Fabric (Processed)",
            "Fabric",
            "Processed",
            "Leather"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Cordage",
        "tags": [
            "MATERIAL",
            "MATERIALS",
            "Fabric (Processed)",
            "Fabric",
            "Processed",
            "Cordage"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Dandelion Seed",
        "tags": [
            "MATERIAL",
            "MATERIALS",
            "Plantable",
            "Dandelion",
            "Seed"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Wild Lettuce Seed",
        "tags": [
            "MATERIAL",
            "MATERIALS",
            "Plantable",
            "Wild",
            "Lettuce",
            "Seed"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Feral Tomato Seed",
        "tags": [
            "MATERIAL",
            "MATERIALS",
            "Plantable",
            "Feral",
            "Tomato",
            "Seed"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Pumpkin Seed",
        "tags": [
            "MATERIAL",
            "MATERIALS",
            "Plantable",
            "Pumpkin",
            "Seed"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Bramble Berry Seed",
        "tags": [
            "MATERIAL",
            "MATERIALS",
            "Plantable",
            "Bramble",
            "Berry",
            "Seed"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Wild Wheat Seed",
        "tags": [
            "MATERIAL",
            "MATERIALS",
            "Plantable",
            "Wild",
            "Wheat",
            "Seed"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Wild Oat Seed",
        "tags": [
            "MATERIAL",
            "MATERIALS",
            "Plantable",
            "Wild",
            "Oat",
            "Seed"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Feral Corn Seed",
        "tags": [
            "MATERIAL",
            "MATERIALS",
            "Plantable",
            "Feral",
            "Corn",
            "Seed"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Wooden Nail",
        "tags": [
            "MATERIAL",
            "MATERIALS",
            "Component (Processed)",
            "Component",
            "Processed",
            "Wooden",
            "Nail"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Metal Nail",
        "tags": [
            "MATERIAL",
            "MATERIALS",
            "Component (Processed)",
            "Component",
            "Processed",
            "Metal",
            "Nail"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Charcoal",
        "tags": [
            "MATERIAL",
            "MATERIALS",
            "Component (Processed)",
            "Component",
            "Processed",
            "Charcoal"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Bone",
        "tags": [
            "MATERIAL",
            "MATERIALS",
            "Component (Processed)",
            "Component",
            "Processed",
            "Bone"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Infected Tissue",
        "tags": [
            "MATERIAL",
            "MATERIALS",
            "Monster Part",
            "Monster",
            "Zombie",
            "Organic",
            "Rotten",
            "Trophy"
        ],
        "origin": "Loot-only",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Cracked Bone",
        "tags": [
            "MATERIAL",
            "MATERIALS",
            "Monster Part",
            "Animal",
            "Bone",
            "Organic",
            "Trophy"
        ],
        "origin": "Loot-only",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Torn Hide",
        "tags": [
            "MATERIAL",
            "MATERIALS",
            "Monster Part",
            "Animal",
            "Hide",
            "Organic",
            "Trophy"
        ],
        "origin": "Loot-only",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Mutated Claw",
        "tags": [
            "MATERIAL",
            "MATERIALS",
            "Monster Part",
            "Monster",
            "Claw",
            "Organic",
            "Trophy"
        ],
        "origin": "Loot-only",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Wooden Handle",
        "tags": [
            "MATERIAL",
            "MATERIALS",
            "Component (Processed)",
            "Component",
            "Processed",
            "Wooden",
            "Handle"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Stone Tool Head",
        "tags": [
            "MATERIAL",
            "MATERIALS",
            "Component (Processed)",
            "Component",
            "Processed",
            "Stone",
            "Tool",
            "Head"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Metal Tool Head",
        "tags": [
            "MATERIAL",
            "MATERIALS",
            "Component (Processed)",
            "Component",
            "Processed",
            "Metal",
            "Tool",
            "Head"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Bowstring",
        "tags": [
            "MATERIAL",
            "MATERIALS",
            "Component (Processed)",
            "Component",
            "Processed",
            "Bowstring"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Metal Gun Barrel",
        "tags": [
            "MATERIAL",
            "MATERIALS",
            "Component (Processed)",
            "Component",
            "Processed",
            "Metal",
            "Gun",
            "Barrel"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Metal Gun Frame",
        "tags": [
            "MATERIAL",
            "MATERIALS",
            "Component (Processed)",
            "Component",
            "Processed",
            "Metal",
            "Gun",
            "Frame"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Fabric Panel",
        "tags": [
            "MATERIAL",
            "MATERIALS",
            "Component (Processed)",
            "Component",
            "Processed",
            "Fabric",
            "Panel"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Padding",
        "tags": [
            "MATERIAL",
            "MATERIALS",
            "Component (Processed)",
            "Component",
            "Processed",
            "Padding"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Gunpowder",
        "tags": [
            "MATERIAL",
            "MATERIALS",
            "Component (Processed)",
            "Component",
            "Processed",
            "Gunpowder"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Raw Meat",
        "tags": [
            "FOOD",
            "CONSUMABLES",
            "FoodRaw (Meat)",
            "FoodRaw",
            "Meat",
            "Raw",
            "Food"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Dandelion Greens",
        "tags": [
            "FOOD",
            "CONSUMABLES",
            "FoodRaw (Vegetable)",
            "FoodRaw",
            "Vegetable",
            "Dandelion",
            "Greens",
            "Food",
            "Raw"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Wild Lettuce",
        "tags": [
            "FOOD",
            "CONSUMABLES",
            "FoodRaw (Vegetable)",
            "FoodRaw",
            "Vegetable",
            "Wild",
            "Lettuce",
            "Food",
            "Raw"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Feral Tomato",
        "tags": [
            "FOOD",
            "CONSUMABLES",
            "FoodRaw (Vegetable)",
            "FoodRaw",
            "Vegetable",
            "Feral",
            "Tomato",
            "Food",
            "Raw"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Cellar Mushroom",
        "tags": [
            "FOOD",
            "CONSUMABLES",
            "FoodRaw (Vegetable)",
            "FoodRaw",
            "Vegetable",
            "Cellar",
            "Mushroom",
            "Food",
            "Raw"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Overgrown Pumpkin",
        "tags": [
            "FOOD",
            "CONSUMABLES",
            "FoodRaw (Vegetable)",
            "FoodRaw",
            "Vegetable",
            "Overgrown",
            "Pumpkin",
            "Food",
            "Raw"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Wild Apple",
        "tags": [
            "FOOD",
            "CONSUMABLES",
            "FoodRaw (Fruit)",
            "FoodRaw",
            "Fruit",
            "Wild",
            "Apple",
            "Food",
            "Raw"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Park Cherry",
        "tags": [
            "FOOD",
            "CONSUMABLES",
            "FoodRaw (Fruit)",
            "FoodRaw",
            "Fruit",
            "Park",
            "Cherry",
            "Food",
            "Raw"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Overgrown Grape",
        "tags": [
            "FOOD",
            "CONSUMABLES",
            "FoodRaw (Fruit)",
            "FoodRaw",
            "Fruit",
            "Overgrown",
            "Grape",
            "Food",
            "Raw"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Bramble Berry",
        "tags": [
            "FOOD",
            "CONSUMABLES",
            "FoodRaw (Fruit)",
            "FoodRaw",
            "Fruit",
            "Bramble",
            "Berry",
            "Food",
            "Raw"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Alley Fig",
        "tags": [
            "FOOD",
            "CONSUMABLES",
            "FoodRaw (Fruit)",
            "FoodRaw",
            "Fruit",
            "Alley",
            "Fig",
            "Food",
            "Raw"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Wild Wheat",
        "tags": [
            "FOOD",
            "CONSUMABLES",
            "FoodRaw (Grain)",
            "FoodRaw",
            "Grain",
            "Wild",
            "Wheat",
            "Food",
            "Raw"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Wild Oat",
        "tags": [
            "FOOD",
            "CONSUMABLES",
            "FoodRaw (Grain)",
            "FoodRaw",
            "Grain",
            "Wild",
            "Oat",
            "Food",
            "Raw"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Feral Corn",
        "tags": [
            "FOOD",
            "CONSUMABLES",
            "FoodRaw (Grain)",
            "FoodRaw",
            "Grain",
            "Feral",
            "Corn",
            "Food",
            "Raw"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Wild Wheat Flour",
        "tags": [
            "FOOD",
            "CONSUMABLES",
            "FoodRaw (Flour)",
            "FoodRaw",
            "Flour",
            "Wild",
            "Wheat",
            "Food",
            "Raw",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Wild Oat Flour",
        "tags": [
            "FOOD",
            "CONSUMABLES",
            "FoodRaw (Flour)",
            "FoodRaw",
            "Flour",
            "Wild",
            "Oat",
            "Food",
            "Raw",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Feral Corn Flour",
        "tags": [
            "FOOD",
            "CONSUMABLES",
            "FoodRaw (Flour)",
            "FoodRaw",
            "Flour",
            "Feral",
            "Corn",
            "Food",
            "Raw",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Dried Meat",
        "tags": [
            "FOOD",
            "CONSUMABLES",
            "FoodProcessed",
            "Dried",
            "Meat",
            "Food",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Smoked Meat",
        "tags": [
            "FOOD",
            "CONSUMABLES",
            "FoodProcessed",
            "Smoked",
            "Meat",
            "Food",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Salt",
        "tags": [
            "FOOD",
            "CONSUMABLES",
            "FoodProcessed",
            "Salt",
            "Food",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Sugar",
        "tags": [
            "FOOD",
            "CONSUMABLES",
            "FoodProcessed",
            "Sugar",
            "Food",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Vinegar",
        "tags": [
            "FOOD",
            "CONSUMABLES",
            "FoodProcessed",
            "Vinegar",
            "Food",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Soysauce",
        "tags": [
            "FOOD",
            "CONSUMABLES",
            "FoodProcessed",
            "Soysauce",
            "Food",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Yeast",
        "tags": [
            "FOOD",
            "CONSUMABLES",
            "FoodProcessed",
            "Yeast",
            "Food",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Butter",
        "tags": [
            "FOOD",
            "CONSUMABLES",
            "FoodProcessed",
            "Butter",
            "Food",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Cheese",
        "tags": [
            "FOOD",
            "CONSUMABLES",
            "FoodProcessed",
            "Cheese",
            "Food",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Animal Fat",
        "tags": [
            "FOOD",
            "CONSUMABLES",
            "FoodProcessed",
            "Animal",
            "Fat",
            "Food",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Animal Oil",
        "tags": [
            "FOOD",
            "CONSUMABLES",
            "FoodProcessed",
            "Animal",
            "Oil",
            "Food",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Pumpkin Seed Oil",
        "tags": [
            "FOOD",
            "CONSUMABLES",
            "FoodProcessed",
            "Pumpkin",
            "Seed",
            "Oil",
            "Food",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Feral Corn Oil",
        "tags": [
            "FOOD",
            "CONSUMABLES",
            "FoodProcessed",
            "Feral",
            "Corn",
            "Oil",
            "Food",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Skewered Meat",
        "tags": [
            "FOOD",
            "CONSUMABLES",
            "FoodProcessed",
            "Skewered",
            "Meat",
            "Food",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Seasoned Skewered Meat",
        "tags": [
            "FOOD",
            "CONSUMABLES",
            "FoodProcessed",
            "Seasoned",
            "Skewered",
            "Meat",
            "Food",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Steak",
        "tags": [
            "FOOD",
            "CONSUMABLES",
            "FoodProcessed",
            "Steak",
            "Food",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Seasoned Steak",
        "tags": [
            "FOOD",
            "CONSUMABLES",
            "FoodProcessed",
            "Seasoned",
            "Steak",
            "Food",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Boiled Meat",
        "tags": [
            "FOOD",
            "CONSUMABLES",
            "FoodProcessed",
            "Boiled",
            "Meat",
            "Food",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Boiled Pumpkin",
        "tags": [
            "FOOD",
            "CONSUMABLES",
            "FoodProcessed",
            "Boiled",
            "Pumpkin",
            "Food",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Dandelion Green Soup",
        "tags": [
            "FOOD",
            "CONSUMABLES",
            "FoodProcessed",
            "Dandelion",
            "Green",
            "Soup",
            "Food",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Cellar Mushroom Soup",
        "tags": [
            "FOOD",
            "CONSUMABLES",
            "FoodProcessed",
            "Cellar",
            "Mushroom",
            "Soup",
            "Food",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Meat Bone Soup",
        "tags": [
            "FOOD",
            "CONSUMABLES",
            "FoodProcessed",
            "Meat",
            "Bone",
            "Soup",
            "Food",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Meat Stew",
        "tags": [
            "FOOD",
            "CONSUMABLES",
            "FoodProcessed",
            "Meat",
            "Stew",
            "Food",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Pumpkin Stew",
        "tags": [
            "FOOD",
            "CONSUMABLES",
            "FoodProcessed",
            "Pumpkin",
            "Stew",
            "Food",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Meat Bone Noodle Soup",
        "tags": [
            "FOOD",
            "CONSUMABLES",
            "FoodProcessed",
            "Meat",
            "Bone",
            "Noodle",
            "Soup",
            "Food",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Cellar Mushroom Noodle",
        "tags": [
            "FOOD",
            "CONSUMABLES",
            "FoodProcessed",
            "Cellar",
            "Mushroom",
            "Noodle",
            "Food",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Feral Tomato Noodle",
        "tags": [
            "FOOD",
            "CONSUMABLES",
            "FoodProcessed",
            "Feral",
            "Tomato",
            "Noodle",
            "Food",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Fried Meat",
        "tags": [
            "FOOD",
            "CONSUMABLES",
            "FoodProcessed",
            "Fried",
            "Meat",
            "Food",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Seasoned Fried Meat",
        "tags": [
            "FOOD",
            "CONSUMABLES",
            "FoodProcessed",
            "Seasoned",
            "Fried",
            "Meat",
            "Food",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Deep Fried Meat",
        "tags": [
            "FOOD",
            "CONSUMABLES",
            "FoodProcessed",
            "Deep",
            "Fried",
            "Meat",
            "Food",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Fried Pumpkin",
        "tags": [
            "FOOD",
            "CONSUMABLES",
            "FoodProcessed",
            "Fried",
            "Pumpkin",
            "Food",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Deep Fried Mushroom",
        "tags": [
            "FOOD",
            "CONSUMABLES",
            "FoodProcessed",
            "Deep",
            "Fried",
            "Mushroom",
            "Food",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Deep Fried Tomato",
        "tags": [
            "FOOD",
            "CONSUMABLES",
            "FoodProcessed",
            "Deep",
            "Fried",
            "Tomato",
            "Food",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Bread",
        "tags": [
            "FOOD",
            "CONSUMABLES",
            "FoodProcessed",
            "Bread",
            "Food",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Meat Burger",
        "tags": [
            "FOOD",
            "CONSUMABLES",
            "FoodProcessed",
            "Meat",
            "Burger",
            "Food",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Meat Sandwich",
        "tags": [
            "FOOD",
            "CONSUMABLES",
            "FoodProcessed",
            "Meat",
            "Sandwich",
            "Food",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Tomato Sandwich",
        "tags": [
            "FOOD",
            "CONSUMABLES",
            "FoodProcessed",
            "Tomato",
            "Sandwich",
            "Food",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Mushroom Pizza",
        "tags": [
            "FOOD",
            "CONSUMABLES",
            "FoodProcessed",
            "Mushroom",
            "Pizza",
            "Food",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Tomato Pizza",
        "tags": [
            "FOOD",
            "CONSUMABLES",
            "FoodProcessed",
            "Tomato",
            "Pizza",
            "Food",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Meat Pizza",
        "tags": [
            "FOOD",
            "CONSUMABLES",
            "FoodProcessed",
            "Meat",
            "Pizza",
            "Food",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Apple Cake",
        "tags": [
            "FOOD",
            "CONSUMABLES",
            "FoodProcessed",
            "Apple",
            "Cake",
            "Food",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Cherry Cake",
        "tags": [
            "FOOD",
            "CONSUMABLES",
            "FoodProcessed",
            "Cherry",
            "Cake",
            "Food",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Berry Cake",
        "tags": [
            "FOOD",
            "CONSUMABLES",
            "FoodProcessed",
            "Berry",
            "Cake",
            "Food",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Canned Meat",
        "tags": [
            "FOOD",
            "CONSUMABLES",
            "FoodProcessed",
            "Canned",
            "Meat",
            "Food",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Canned Tomato",
        "tags": [
            "FOOD",
            "CONSUMABLES",
            "FoodProcessed",
            "Canned",
            "Tomato",
            "Food",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Canned Pumpkin",
        "tags": [
            "FOOD",
            "CONSUMABLES",
            "FoodProcessed",
            "Canned",
            "Pumpkin",
            "Food",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Steamed Vegetable Basket",
        "tags": [
            "FOOD",
            "CONSUMABLES",
            "FoodProcessed",
            "Steamed",
            "Vegetable",
            "Basket",
            "Food",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Steamed Meat Buns",
        "tags": [
            "FOOD",
            "CONSUMABLES",
            "FoodProcessed",
            "Steamed",
            "Meat",
            "Buns",
            "Food",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Meat Bone Ramen",
        "tags": [
            "FOOD",
            "CONSUMABLES",
            "FoodProcessed",
            "Meat",
            "Bone",
            "Ramen",
            "Food",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Contaminated Water",
        "tags": [
            "FOOD",
            "CONSUMABLES",
            "FoodProcessed",
            "Contaminated",
            "Water",
            "Food",
            "Processed",
            "Drink"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Water (Boiled/Filtered)",
        "tags": [
            "FOOD",
            "CONSUMABLES",
            "FoodProcessed",
            "Water",
            "Boiled",
            "Filtered",
            "Food",
            "Processed",
            "Drink"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Mineral Water",
        "tags": [
            "FOOD",
            "CONSUMABLES",
            "FoodProcessed",
            "Mineral",
            "Water",
            "Food",
            "Processed",
            "Drink"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Apple Juice",
        "tags": [
            "FOOD",
            "CONSUMABLES",
            "FoodProcessed",
            "Apple",
            "Juice",
            "Food",
            "Processed",
            "Drink"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Grape Juice",
        "tags": [
            "FOOD",
            "CONSUMABLES",
            "FoodProcessed",
            "Grape",
            "Juice",
            "Food",
            "Processed",
            "Drink"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Tomato Juice",
        "tags": [
            "FOOD",
            "CONSUMABLES",
            "FoodProcessed",
            "Tomato",
            "Juice",
            "Food",
            "Processed",
            "Drink"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Berry Smoothie",
        "tags": [
            "FOOD",
            "CONSUMABLES",
            "FoodProcessed",
            "Berry",
            "Smoothie",
            "Food",
            "Processed",
            "Drink"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Fig Smoothie",
        "tags": [
            "FOOD",
            "CONSUMABLES",
            "FoodProcessed",
            "Fig",
            "Smoothie",
            "Food",
            "Processed",
            "Drink"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Cherry Smoothie",
        "tags": [
            "FOOD",
            "CONSUMABLES",
            "FoodProcessed",
            "Cherry",
            "Smoothie",
            "Food",
            "Processed",
            "Drink"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Coffee",
        "tags": [
            "FOOD",
            "CONSUMABLES",
            "FoodProcessed",
            "Coffee",
            "Food",
            "Processed",
            "Drink"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Grape Wine",
        "tags": [
            "FOOD",
            "CONSUMABLES",
            "FoodProcessed",
            "Grape",
            "Wine",
            "Food",
            "Processed",
            "Drink"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Apple Wine",
        "tags": [
            "FOOD",
            "CONSUMABLES",
            "FoodProcessed",
            "Apple",
            "Wine",
            "Food",
            "Processed",
            "Drink"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Berry Wine",
        "tags": [
            "FOOD",
            "CONSUMABLES",
            "FoodProcessed",
            "Berry",
            "Wine",
            "Food",
            "Processed",
            "Drink"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Moonshine",
        "tags": [
            "FOOD",
            "CONSUMABLES",
            "FoodProcessed",
            "Moonshine",
            "Food",
            "Processed",
            "Drink"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Bandage",
        "tags": [
            "MEDICINE",
            "CONSUMABLES",
            "Medical",
            "Bandage"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "First Aid Kit",
        "tags": [
            "MEDICINE",
            "CONSUMABLES",
            "Medical",
            "First",
            "Aid",
            "Kit"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Antibiotic",
        "tags": [
            "MEDICINE",
            "CONSUMABLES",
            "Medical",
            "Antibiotic"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Painkiller",
        "tags": [
            "MEDICINE",
            "CONSUMABLES",
            "Medical",
            "Painkiller"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Booster",
        "tags": [
            "MEDICINE",
            "CONSUMABLES",
            "Medical",
            "Booster"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Tent",
        "tags": [
            "BUILDING",
            "STRUCTURES",
            "Furniture",
            "Tent"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Duration",
        "baseDurability": 0,
        "baseDurationHours": 192,
        "lifecycleNote": "Structures use duration so shelters and stations can decay later."
    },
    {
        "name": "Bed",
        "tags": [
            "BUILDING",
            "STRUCTURES",
            "Furniture",
            "Bed"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Duration",
        "baseDurability": 0,
        "baseDurationHours": 192,
        "lifecycleNote": "Structures use duration so shelters and stations can decay later."
    },
    {
        "name": "Storage Container",
        "tags": [
            "BUILDING",
            "STRUCTURES",
            "Furniture (Storage)",
            "Furniture",
            "Storage",
            "Container"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Duration",
        "baseDurability": 0,
        "baseDurationHours": 192,
        "lifecycleNote": "Structures use duration so shelters and stations can decay later."
    },
    {
        "name": "Furniture Set",
        "tags": [
            "BUILDING",
            "STRUCTURES",
            "Furniture",
            "Set"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Duration",
        "baseDurability": 0,
        "baseDurationHours": 192,
        "lifecycleNote": "Structures use duration so shelters and stations can decay later."
    },
    {
        "name": "Cooking Station",
        "tags": [
            "BUILDING",
            "STRUCTURES",
            "Station (Cooking)",
            "Station",
            "Cooking"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Duration",
        "baseDurability": 0,
        "baseDurationHours": 192,
        "lifecycleNote": "Structures use duration so shelters and stations can decay later."
    },
    {
        "name": "Crafting Station",
        "tags": [
            "BUILDING",
            "STRUCTURES",
            "Station (Crafting)",
            "Station",
            "Crafting"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Duration",
        "baseDurability": 0,
        "baseDurationHours": 192,
        "lifecycleNote": "Structures use duration so shelters and stations can decay later."
    },
    {
        "name": "Medical Station",
        "tags": [
            "BUILDING",
            "STRUCTURES",
            "Station (Medical)",
            "Station",
            "Medical"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Duration",
        "baseDurability": 0,
        "baseDurationHours": 192,
        "lifecycleNote": "Structures use duration so shelters and stations can decay later."
    },
    {
        "name": "Smelting Station",
        "tags": [
            "BUILDING",
            "STRUCTURES",
            "Station (Smelting)",
            "Station",
            "Smelting"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Duration",
        "baseDurability": 0,
        "baseDurationHours": 192,
        "lifecycleNote": "Structures use duration so shelters and stations can decay later."
    },
    {
        "name": "Wooden Structure",
        "tags": [
            "BUILDING",
            "STRUCTURES",
            "Architecture (Wood)",
            "Architecture",
            "Wood",
            "Wooden",
            "Structure"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Duration",
        "baseDurability": 0,
        "baseDurationHours": 192,
        "lifecycleNote": "Structures use duration so shelters and stations can decay later."
    },
    {
        "name": "Stone Structure",
        "tags": [
            "BUILDING",
            "STRUCTURES",
            "Architecture (Stone)",
            "Architecture",
            "Stone",
            "Structure"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Duration",
        "baseDurability": 0,
        "baseDurationHours": 192,
        "lifecycleNote": "Structures use duration so shelters and stations can decay later."
    },
    {
        "name": "Wooden Fence",
        "tags": [
            "BUILDING",
            "STRUCTURES",
            "Architecture (Wood)",
            "Architecture",
            "Wood",
            "Wooden",
            "Fence"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Duration",
        "baseDurability": 0,
        "baseDurationHours": 192,
        "lifecycleNote": "Structures use duration so shelters and stations can decay later."
    },
    {
        "name": "Stone Fence",
        "tags": [
            "BUILDING",
            "STRUCTURES",
            "Architecture (Stone)",
            "Architecture",
            "Stone",
            "Fence"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Duration",
        "baseDurability": 0,
        "baseDurationHours": 192,
        "lifecycleNote": "Structures use duration so shelters and stations can decay later."
    },
    {
        "name": "Combating Vest",
        "tags": [
            "EQUIPMENT",
            "EQUIPMENT",
            "Armor (COMBATING)",
            "Armor",
            "COMBATING",
            "Combating",
            "Vest",
            "Combat",
            "combating"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Durability",
        "baseDurability": 100,
        "baseDurationHours": 0,
        "lifecycleNote": "Gear uses durability so alpha equipment can wear down predictably."
    },
    {
        "name": "Combating Head",
        "tags": [
            "EQUIPMENT",
            "EQUIPMENT",
            "Armor (COMBATING)",
            "Armor",
            "COMBATING",
            "Combating",
            "Head",
            "Combat",
            "combating"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Durability",
        "baseDurability": 100,
        "baseDurationHours": 0,
        "lifecycleNote": "Gear uses durability so alpha equipment can wear down predictably."
    },
    {
        "name": "Combating UpperBody",
        "tags": [
            "EQUIPMENT",
            "EQUIPMENT",
            "Armor (COMBATING)",
            "Armor",
            "COMBATING",
            "Combating",
            "UpperBody",
            "Combat",
            "combating"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Durability",
        "baseDurability": 100,
        "baseDurationHours": 0,
        "lifecycleNote": "Gear uses durability so alpha equipment can wear down predictably."
    },
    {
        "name": "Combating LowerBody",
        "tags": [
            "EQUIPMENT",
            "EQUIPMENT",
            "Armor (COMBATING)",
            "Armor",
            "COMBATING",
            "Combating",
            "LowerBody",
            "Combat",
            "combating"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Durability",
        "baseDurability": 100,
        "baseDurationHours": 0,
        "lifecycleNote": "Gear uses durability so alpha equipment can wear down predictably."
    },
    {
        "name": "Combating Hand",
        "tags": [
            "EQUIPMENT",
            "EQUIPMENT",
            "Armor (COMBATING)",
            "Armor",
            "COMBATING",
            "Combating",
            "Hand",
            "Combat",
            "combating"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Durability",
        "baseDurability": 100,
        "baseDurationHours": 0,
        "lifecycleNote": "Gear uses durability so alpha equipment can wear down predictably."
    },
    {
        "name": "Combating Leg",
        "tags": [
            "EQUIPMENT",
            "EQUIPMENT",
            "Armor (COMBATING)",
            "Armor",
            "COMBATING",
            "Combating",
            "Leg",
            "Combat",
            "combating"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Durability",
        "baseDurability": 100,
        "baseDurationHours": 0,
        "lifecycleNote": "Gear uses durability so alpha equipment can wear down predictably."
    },
    {
        "name": "Cooking Vest",
        "tags": [
            "EQUIPMENT",
            "EQUIPMENT",
            "Armor (COOKING)",
            "Armor",
            "COOKING",
            "Cooking",
            "Vest",
            "cooking"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Durability",
        "baseDurability": 100,
        "baseDurationHours": 0,
        "lifecycleNote": "Gear uses durability so alpha equipment can wear down predictably."
    },
    {
        "name": "Cooking Head",
        "tags": [
            "EQUIPMENT",
            "EQUIPMENT",
            "Armor (COOKING)",
            "Armor",
            "COOKING",
            "Cooking",
            "Head",
            "cooking"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Durability",
        "baseDurability": 100,
        "baseDurationHours": 0,
        "lifecycleNote": "Gear uses durability so alpha equipment can wear down predictably."
    },
    {
        "name": "Cooking UpperBody",
        "tags": [
            "EQUIPMENT",
            "EQUIPMENT",
            "Armor (COOKING)",
            "Armor",
            "COOKING",
            "Cooking",
            "UpperBody",
            "cooking"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Durability",
        "baseDurability": 100,
        "baseDurationHours": 0,
        "lifecycleNote": "Gear uses durability so alpha equipment can wear down predictably."
    },
    {
        "name": "Cooking LowerBody",
        "tags": [
            "EQUIPMENT",
            "EQUIPMENT",
            "Armor (COOKING)",
            "Armor",
            "COOKING",
            "Cooking",
            "LowerBody",
            "cooking"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Durability",
        "baseDurability": 100,
        "baseDurationHours": 0,
        "lifecycleNote": "Gear uses durability so alpha equipment can wear down predictably."
    },
    {
        "name": "Cooking Hand",
        "tags": [
            "EQUIPMENT",
            "EQUIPMENT",
            "Armor (COOKING)",
            "Armor",
            "COOKING",
            "Cooking",
            "Hand",
            "cooking"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Durability",
        "baseDurability": 100,
        "baseDurationHours": 0,
        "lifecycleNote": "Gear uses durability so alpha equipment can wear down predictably."
    },
    {
        "name": "Cooking Leg",
        "tags": [
            "EQUIPMENT",
            "EQUIPMENT",
            "Armor (COOKING)",
            "Armor",
            "COOKING",
            "Cooking",
            "Leg",
            "cooking"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Durability",
        "baseDurability": 100,
        "baseDurationHours": 0,
        "lifecycleNote": "Gear uses durability so alpha equipment can wear down predictably."
    },
    {
        "name": "Scavenging Vest",
        "tags": [
            "EQUIPMENT",
            "EQUIPMENT",
            "Armor (SCAVENGING)",
            "Armor",
            "SCAVENGING",
            "Scavenging",
            "Vest",
            "scavenging"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Durability",
        "baseDurability": 100,
        "baseDurationHours": 0,
        "lifecycleNote": "Gear uses durability so alpha equipment can wear down predictably."
    },
    {
        "name": "Scavenging Head",
        "tags": [
            "EQUIPMENT",
            "EQUIPMENT",
            "Armor (SCAVENGING)",
            "Armor",
            "SCAVENGING",
            "Scavenging",
            "Head",
            "scavenging"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Durability",
        "baseDurability": 100,
        "baseDurationHours": 0,
        "lifecycleNote": "Gear uses durability so alpha equipment can wear down predictably."
    },
    {
        "name": "Scavenging UpperBody",
        "tags": [
            "EQUIPMENT",
            "EQUIPMENT",
            "Armor (SCAVENGING)",
            "Armor",
            "SCAVENGING",
            "Scavenging",
            "UpperBody",
            "scavenging"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Durability",
        "baseDurability": 100,
        "baseDurationHours": 0,
        "lifecycleNote": "Gear uses durability so alpha equipment can wear down predictably."
    },
    {
        "name": "Scavenging LowerBody",
        "tags": [
            "EQUIPMENT",
            "EQUIPMENT",
            "Armor (SCAVENGING)",
            "Armor",
            "SCAVENGING",
            "Scavenging",
            "LowerBody",
            "scavenging"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Durability",
        "baseDurability": 100,
        "baseDurationHours": 0,
        "lifecycleNote": "Gear uses durability so alpha equipment can wear down predictably."
    },
    {
        "name": "Scavenging Hand",
        "tags": [
            "EQUIPMENT",
            "EQUIPMENT",
            "Armor (SCAVENGING)",
            "Armor",
            "SCAVENGING",
            "Scavenging",
            "Hand",
            "scavenging"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Durability",
        "baseDurability": 100,
        "baseDurationHours": 0,
        "lifecycleNote": "Gear uses durability so alpha equipment can wear down predictably."
    },
    {
        "name": "Scavenging Leg",
        "tags": [
            "EQUIPMENT",
            "EQUIPMENT",
            "Armor (SCAVENGING)",
            "Armor",
            "SCAVENGING",
            "Scavenging",
            "Leg",
            "scavenging"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Durability",
        "baseDurability": 100,
        "baseDurationHours": 0,
        "lifecycleNote": "Gear uses durability so alpha equipment can wear down predictably."
    },
    {
        "name": "Gathering Vest",
        "tags": [
            "EQUIPMENT",
            "EQUIPMENT",
            "Armor (GATHERING)",
            "Armor",
            "GATHERING",
            "Gathering",
            "Vest",
            "gathering"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Durability",
        "baseDurability": 100,
        "baseDurationHours": 0,
        "lifecycleNote": "Gear uses durability so alpha equipment can wear down predictably."
    },
    {
        "name": "Gathering Head",
        "tags": [
            "EQUIPMENT",
            "EQUIPMENT",
            "Armor (GATHERING)",
            "Armor",
            "GATHERING",
            "Gathering",
            "Head",
            "gathering"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Durability",
        "baseDurability": 100,
        "baseDurationHours": 0,
        "lifecycleNote": "Gear uses durability so alpha equipment can wear down predictably."
    },
    {
        "name": "Gathering UpperBody",
        "tags": [
            "EQUIPMENT",
            "EQUIPMENT",
            "Armor (GATHERING)",
            "Armor",
            "GATHERING",
            "Gathering",
            "UpperBody",
            "gathering"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Durability",
        "baseDurability": 100,
        "baseDurationHours": 0,
        "lifecycleNote": "Gear uses durability so alpha equipment can wear down predictably."
    },
    {
        "name": "Gathering LowerBody",
        "tags": [
            "EQUIPMENT",
            "EQUIPMENT",
            "Armor (GATHERING)",
            "Armor",
            "GATHERING",
            "Gathering",
            "LowerBody",
            "gathering"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Durability",
        "baseDurability": 100,
        "baseDurationHours": 0,
        "lifecycleNote": "Gear uses durability so alpha equipment can wear down predictably."
    },
    {
        "name": "Gathering Hand",
        "tags": [
            "EQUIPMENT",
            "EQUIPMENT",
            "Armor (GATHERING)",
            "Armor",
            "GATHERING",
            "Gathering",
            "Hand",
            "gathering"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Durability",
        "baseDurability": 100,
        "baseDurationHours": 0,
        "lifecycleNote": "Gear uses durability so alpha equipment can wear down predictably."
    },
    {
        "name": "Gathering Leg",
        "tags": [
            "EQUIPMENT",
            "EQUIPMENT",
            "Armor (GATHERING)",
            "Armor",
            "GATHERING",
            "Gathering",
            "Leg",
            "gathering"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Durability",
        "baseDurability": 100,
        "baseDurationHours": 0,
        "lifecycleNote": "Gear uses durability so alpha equipment can wear down predictably."
    },
    {
        "name": "Building Vest",
        "tags": [
            "EQUIPMENT",
            "EQUIPMENT",
            "Armor (BUILDING)",
            "Armor",
            "BUILDING",
            "Building",
            "Vest",
            "building"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Durability",
        "baseDurability": 100,
        "baseDurationHours": 0,
        "lifecycleNote": "Gear uses durability so alpha equipment can wear down predictably."
    },
    {
        "name": "Building Head",
        "tags": [
            "EQUIPMENT",
            "EQUIPMENT",
            "Armor (BUILDING)",
            "Armor",
            "BUILDING",
            "Building",
            "Head",
            "building"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Durability",
        "baseDurability": 100,
        "baseDurationHours": 0,
        "lifecycleNote": "Gear uses durability so alpha equipment can wear down predictably."
    },
    {
        "name": "Building UpperBody",
        "tags": [
            "EQUIPMENT",
            "EQUIPMENT",
            "Armor (BUILDING)",
            "Armor",
            "BUILDING",
            "Building",
            "UpperBody",
            "building"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Durability",
        "baseDurability": 100,
        "baseDurationHours": 0,
        "lifecycleNote": "Gear uses durability so alpha equipment can wear down predictably."
    },
    {
        "name": "Building LowerBody",
        "tags": [
            "EQUIPMENT",
            "EQUIPMENT",
            "Armor (BUILDING)",
            "Armor",
            "BUILDING",
            "Building",
            "LowerBody",
            "building"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Durability",
        "baseDurability": 100,
        "baseDurationHours": 0,
        "lifecycleNote": "Gear uses durability so alpha equipment can wear down predictably."
    },
    {
        "name": "Building Hand",
        "tags": [
            "EQUIPMENT",
            "EQUIPMENT",
            "Armor (BUILDING)",
            "Armor",
            "BUILDING",
            "Building",
            "Hand",
            "building"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Durability",
        "baseDurability": 100,
        "baseDurationHours": 0,
        "lifecycleNote": "Gear uses durability so alpha equipment can wear down predictably."
    },
    {
        "name": "Building Leg",
        "tags": [
            "EQUIPMENT",
            "EQUIPMENT",
            "Armor (BUILDING)",
            "Armor",
            "BUILDING",
            "Building",
            "Leg",
            "building"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Durability",
        "baseDurability": 100,
        "baseDurationHours": 0,
        "lifecycleNote": "Gear uses durability so alpha equipment can wear down predictably."
    },
    {
        "name": "Crafting Vest",
        "tags": [
            "EQUIPMENT",
            "EQUIPMENT",
            "Armor (CRAFTING)",
            "Armor",
            "CRAFTING",
            "Crafting",
            "Vest",
            "crafting"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Durability",
        "baseDurability": 100,
        "baseDurationHours": 0,
        "lifecycleNote": "Gear uses durability so alpha equipment can wear down predictably."
    },
    {
        "name": "Crafting Head",
        "tags": [
            "EQUIPMENT",
            "EQUIPMENT",
            "Armor (CRAFTING)",
            "Armor",
            "CRAFTING",
            "Crafting",
            "Head",
            "crafting"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Durability",
        "baseDurability": 100,
        "baseDurationHours": 0,
        "lifecycleNote": "Gear uses durability so alpha equipment can wear down predictably."
    },
    {
        "name": "Crafting UpperBody",
        "tags": [
            "EQUIPMENT",
            "EQUIPMENT",
            "Armor (CRAFTING)",
            "Armor",
            "CRAFTING",
            "Crafting",
            "UpperBody",
            "crafting"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Durability",
        "baseDurability": 100,
        "baseDurationHours": 0,
        "lifecycleNote": "Gear uses durability so alpha equipment can wear down predictably."
    },
    {
        "name": "Crafting LowerBody",
        "tags": [
            "EQUIPMENT",
            "EQUIPMENT",
            "Armor (CRAFTING)",
            "Armor",
            "CRAFTING",
            "Crafting",
            "LowerBody",
            "crafting"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Durability",
        "baseDurability": 100,
        "baseDurationHours": 0,
        "lifecycleNote": "Gear uses durability so alpha equipment can wear down predictably."
    },
    {
        "name": "Crafting Hand",
        "tags": [
            "EQUIPMENT",
            "EQUIPMENT",
            "Armor (CRAFTING)",
            "Armor",
            "CRAFTING",
            "Crafting",
            "Hand",
            "crafting"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Durability",
        "baseDurability": 100,
        "baseDurationHours": 0,
        "lifecycleNote": "Gear uses durability so alpha equipment can wear down predictably."
    },
    {
        "name": "Crafting Leg",
        "tags": [
            "EQUIPMENT",
            "EQUIPMENT",
            "Armor (CRAFTING)",
            "Armor",
            "CRAFTING",
            "Crafting",
            "Leg",
            "crafting"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Durability",
        "baseDurability": 100,
        "baseDurationHours": 0,
        "lifecycleNote": "Gear uses durability so alpha equipment can wear down predictably."
    },
    {
        "name": "Ring",
        "tags": [
            "EQUIPMENT",
            "EQUIPMENT",
            "Jewelry (General)",
            "Jewelry",
            "General",
            "Ring",
            "Accessory"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Durability",
        "baseDurability": 100,
        "baseDurationHours": 0,
        "lifecycleNote": "Gear uses durability so alpha equipment can wear down predictably."
    },
    {
        "name": "Necklace",
        "tags": [
            "EQUIPMENT",
            "EQUIPMENT",
            "Jewelry (General)",
            "Jewelry",
            "General",
            "Necklace",
            "Accessory"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Durability",
        "baseDurability": 100,
        "baseDurationHours": 0,
        "lifecycleNote": "Gear uses durability so alpha equipment can wear down predictably."
    },
    {
        "name": "Backpack",
        "tags": [
            "EQUIPMENT",
            "EQUIPMENT",
            "Utility (General)",
            "Utility",
            "General",
            "Backpack",
            "Accessory"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Durability",
        "baseDurability": 100,
        "baseDurationHours": 0,
        "lifecycleNote": "Gear uses durability so alpha equipment can wear down predictably."
    },
    {
        "name": "Axe",
        "tags": [
            "TOOL",
            "TOOLS",
            "Gathering",
            "Axe",
            "Tool",
            "GatheringTool"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Durability",
        "baseDurability": 100,
        "baseDurationHours": 0,
        "lifecycleNote": "Gear uses durability so alpha equipment can wear down predictably."
    },
    {
        "name": "Pickaxe",
        "tags": [
            "TOOL",
            "TOOLS",
            "Gathering",
            "Pickaxe",
            "Tool",
            "GatheringTool"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Durability",
        "baseDurability": 100,
        "baseDurationHours": 0,
        "lifecycleNote": "Gear uses durability so alpha equipment can wear down predictably."
    },
    {
        "name": "Shovel",
        "tags": [
            "TOOL",
            "TOOLS",
            "Gathering",
            "Shovel",
            "Tool",
            "GatheringTool"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Durability",
        "baseDurability": 100,
        "baseDurationHours": 0,
        "lifecycleNote": "Gear uses durability so alpha equipment can wear down predictably."
    },
    {
        "name": "Hoe",
        "tags": [
            "TOOL",
            "TOOLS",
            "Gathering",
            "Hoe",
            "Tool",
            "GatheringTool"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Durability",
        "baseDurability": 100,
        "baseDurationHours": 0,
        "lifecycleNote": "Gear uses durability so alpha equipment can wear down predictably."
    },
    {
        "name": "Hammer",
        "tags": [
            "TOOL",
            "TOOLS",
            "CraftingTool",
            "Hammer",
            "Tool"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Durability",
        "baseDurability": 100,
        "baseDurationHours": 0,
        "lifecycleNote": "Gear uses durability so alpha equipment can wear down predictably."
    },
    {
        "name": "Saw",
        "tags": [
            "TOOL",
            "TOOLS",
            "CraftingTool",
            "Saw",
            "Tool"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Durability",
        "baseDurability": 100,
        "baseDurationHours": 0,
        "lifecycleNote": "Gear uses durability so alpha equipment can wear down predictably."
    },
    {
        "name": "Crowbar",
        "tags": [
            "TOOL",
            "TOOLS",
            "CraftingTool",
            "Crowbar",
            "Tool"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Durability",
        "baseDurability": 100,
        "baseDurationHours": 0,
        "lifecycleNote": "Gear uses durability so alpha equipment can wear down predictably."
    },
    {
        "name": "Grill Rack",
        "tags": [
            "TOOL",
            "TOOLS",
            "CraftingTool",
            "Grill",
            "Rack",
            "Tool"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Durability",
        "baseDurability": 100,
        "baseDurationHours": 0,
        "lifecycleNote": "Gear uses durability so alpha equipment can wear down predictably."
    },
    {
        "name": "Cooking Pot",
        "tags": [
            "TOOL",
            "TOOLS",
            "CraftingTool",
            "Cooking",
            "Pot",
            "Tool"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Durability",
        "baseDurability": 100,
        "baseDurationHours": 0,
        "lifecycleNote": "Gear uses durability so alpha equipment can wear down predictably."
    },
    {
        "name": "Ladle",
        "tags": [
            "TOOL",
            "TOOLS",
            "CraftingTool",
            "Ladle",
            "Tool"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Durability",
        "baseDurability": 100,
        "baseDurationHours": 0,
        "lifecycleNote": "Gear uses durability so alpha equipment can wear down predictably."
    },
    {
        "name": "Dagger",
        "tags": [
            "WEAPON",
            "WEAPONS",
            "Melee",
            "Dagger",
            "Weapon"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Durability",
        "baseDurability": 100,
        "baseDurationHours": 0,
        "lifecycleNote": "Gear uses durability so alpha equipment can wear down predictably."
    },
    {
        "name": "Spear",
        "tags": [
            "WEAPON",
            "WEAPONS",
            "Melee",
            "Spear",
            "Weapon"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Durability",
        "baseDurability": 100,
        "baseDurationHours": 0,
        "lifecycleNote": "Gear uses durability so alpha equipment can wear down predictably."
    },
    {
        "name": "Machete",
        "tags": [
            "WEAPON",
            "WEAPONS",
            "Melee",
            "Machete",
            "Weapon"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Durability",
        "baseDurability": 100,
        "baseDurationHours": 0,
        "lifecycleNote": "Gear uses durability so alpha equipment can wear down predictably."
    },
    {
        "name": "Club",
        "tags": [
            "WEAPON",
            "WEAPONS",
            "Melee",
            "Club",
            "Weapon"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Durability",
        "baseDurability": 100,
        "baseDurationHours": 0,
        "lifecycleNote": "Gear uses durability so alpha equipment can wear down predictably."
    },
    {
        "name": "Bow",
        "tags": [
            "WEAPON",
            "WEAPONS",
            "Ranged",
            "Bow",
            "Weapon"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Durability",
        "baseDurability": 100,
        "baseDurationHours": 0,
        "lifecycleNote": "Gear uses durability so alpha equipment can wear down predictably."
    },
    {
        "name": "Crossbow",
        "tags": [
            "WEAPON",
            "WEAPONS",
            "Ranged",
            "Crossbow",
            "Weapon"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Durability",
        "baseDurability": 100,
        "baseDurationHours": 0,
        "lifecycleNote": "Gear uses durability so alpha equipment can wear down predictably."
    },
    {
        "name": "Handgun",
        "tags": [
            "WEAPON",
            "WEAPONS",
            "Ranged",
            "Handgun",
            "Weapon"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Durability",
        "baseDurability": 100,
        "baseDurationHours": 0,
        "lifecycleNote": "Gear uses durability so alpha equipment can wear down predictably."
    },
    {
        "name": "Shotgun",
        "tags": [
            "WEAPON",
            "WEAPONS",
            "Ranged",
            "Shotgun",
            "Weapon"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Durability",
        "baseDurability": 100,
        "baseDurationHours": 0,
        "lifecycleNote": "Gear uses durability so alpha equipment can wear down predictably."
    },
    {
        "name": "Rifle",
        "tags": [
            "WEAPON",
            "WEAPONS",
            "Ranged",
            "Rifle",
            "Weapon"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Durability",
        "baseDurability": 100,
        "baseDurationHours": 0,
        "lifecycleNote": "Gear uses durability so alpha equipment can wear down predictably."
    },
    {
        "name": "SMG",
        "tags": [
            "WEAPON",
            "WEAPONS",
            "Ranged",
            "SMG",
            "Weapon"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Durability",
        "baseDurability": 100,
        "baseDurationHours": 0,
        "lifecycleNote": "Gear uses durability so alpha equipment can wear down predictably."
    },
    {
        "name": "Arrow",
        "tags": [
            "AMMO",
            "WEAPONS",
            "Ammo",
            "Arrow"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Handgun Ammo",
        "tags": [
            "AMMO",
            "WEAPONS",
            "Ammo",
            "Handgun"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Shotgun Ammo",
        "tags": [
            "AMMO",
            "WEAPONS",
            "Ammo",
            "Shotgun"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "Rifle Ammo",
        "tags": [
            "AMMO",
            "WEAPONS",
            "Ammo",
            "Rifle"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    },
    {
        "name": "SMG Ammo",
        "tags": [
            "AMMO",
            "WEAPONS",
            "Ammo",
            "SMG"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "baseDurability": 0,
        "baseDurationHours": 0,
        "lifecycleNote": null
    }
];

function createItemCode(itemName) {
    return itemName
        .toUpperCase()
        .replace(/[^A-Z0-9]+/g, '_')
        .replace(/^_+|_+$/g, '')
        .slice(0, 50);
}

function getCategory(tags) {
    const mainCategory = itemTaxonomyService.resolveMainItemCategory({ tags });
    if (SUPPORTED_CATEGORIES.includes(mainCategory)) return mainCategory;
    return 'MISC';
}

function toTitleTag(value) {
    const normalizedValue = String(value || '').trim();
    if (!normalizedValue) return null;

    const lowerValue = normalizedValue.toLowerCase();
    if (REDUNDANT_TAGS.has(lowerValue)) return null;
    if (TAG_NAME_ALIASES[lowerValue]) return TAG_NAME_ALIASES[lowerValue];

    return lowerValue.charAt(0).toUpperCase() + lowerValue.slice(1);
}

function splitTagParts(tag) {
    return String(tag || '')
        .replace(/[()]/g, ' ')
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .split(/[^A-Za-z0-9]+/)
        .map(part => part.trim())
        .filter(Boolean);
}

function mergeBodySlotTags(tags) {
    const mergedTags = [];

    for (let index = 0; index < tags.length; index++) {
        const currentTag = tags[index];
        const nextTag = tags[index + 1];

        if (currentTag === 'Lower' && nextTag === 'Body') {
            mergedTags.push('LowerBody');
            index++;
            continue;
        }

        if (currentTag === 'Upper' && nextTag === 'Body') {
            mergedTags.push('UpperBody');
            index++;
            continue;
        }

        mergedTags.push(currentTag);
    }

    return mergedTags;
}

function normalizeItemTags(tags, category) {
    const primaryCategory = toTitleTag(category || getCategory(tags));
    const normalizedTags = [];

    if (primaryCategory) normalizedTags.push(primaryCategory);

    for (const tag of tags || []) {
        const tagParts = splitTagParts(tag)
            .map(toTitleTag)
            .filter(Boolean);

        normalizedTags.push(...mergeBodySlotTags(tagParts));
    }

    return [...new Set(normalizedTags)];
}

function getItemLevel(template) {
    const levelGap = template.levelGap || '';
    const levelMatch = levelGap.match(/\d+/);
    if (levelMatch) return parseInt(levelMatch[0], 10);
    return 1;
}

function getBaseDurability(template) {
    if (template.lifecycleModel !== 'Durability') return 0;
    return template.baseDurability || 0;
}

function getBaseDurationHours(template) {
    if (template.lifecycleModel !== 'Duration') return 0;
    return template.baseDurationHours || 0;
}

function buildTemplateRow(template) {
    const category = itemTaxonomyService.resolveMainItemCategory({
        tags: template.tags,
        origin: template.origin,
        name: template.name,
    });
    const normalizedTags = normalizeItemTags(template.tags, category);
    const isStackable = !STACKABLE_EXCLUDED_CATEGORIES.includes(category);

    return [
        createItemCode(template.name),
        template.name,
        category,
        normalizedTags,
        template.description || null,
        template.note || null,
        template.origin,
        getItemLevel(template),
        template.lifecycleModel || 'None',
        getBaseDurability(template),
        getBaseDurationHours(template),
        template.lifecycleNote || null,
        DEFAULT_DROP_WEIGHTS.common,
        DEFAULT_DROP_WEIGHTS.uncommon,
        DEFAULT_DROP_WEIGHTS.rare,
        DEFAULT_DROP_WEIGHTS.epic,
        DEFAULT_DROP_WEIGHTS.legendary,
        isStackable,
        isStackable ? 99 : 1,
    ];
}

async function removeStaleTemplates(templateCodes) {
    const result = await dbPool.query(`
        DELETE FROM item_templates old_template
        WHERE old_template.code <> ALL($1::TEXT[])
          AND NOT EXISTS (SELECT 1 FROM items item WHERE item.template_id = old_template.id)
          AND NOT EXISTS (SELECT 1 FROM recipes recipe WHERE recipe.output_template_id = old_template.id)
          AND NOT EXISTS (SELECT 1 FROM recipe_ingredients ingredient WHERE ingredient.material_template_id = old_template.id);
    `, [templateCodes]);

    return result.rowCount || 0;
}

async function seedItemTemplatesAndRecipes() {
    console.log('[INFO] Dang cap nhat du lieu vat pham alpha...');

    try {
        const templateCodes = ITEM_TEMPLATES.map(template => createItemCode(template.name));
        const insertQuery = `
            INSERT INTO item_templates
                (code, display_name, category, tags, description, note, origin, item_level,
                 lifecycle_model, base_durability, base_duration_hours, lifecycle_note,
                 drop_weight_common, drop_weight_uncommon, drop_weight_rare, drop_weight_epic,
                 drop_weight_legendary, is_stackable, max_stack)
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19)
            ON CONFLICT (code) DO UPDATE SET
                display_name = EXCLUDED.display_name,
                category = EXCLUDED.category,
                tags = EXCLUDED.tags,
                description = EXCLUDED.description,
                note = EXCLUDED.note,
                origin = EXCLUDED.origin,
                item_level = EXCLUDED.item_level,
                lifecycle_model = EXCLUDED.lifecycle_model,
                base_durability = EXCLUDED.base_durability,
                base_duration_hours = EXCLUDED.base_duration_hours,
                lifecycle_note = EXCLUDED.lifecycle_note,
                drop_weight_common = EXCLUDED.drop_weight_common,
                drop_weight_uncommon = EXCLUDED.drop_weight_uncommon,
                drop_weight_rare = EXCLUDED.drop_weight_rare,
                drop_weight_epic = EXCLUDED.drop_weight_epic,
                drop_weight_legendary = EXCLUDED.drop_weight_legendary,
                is_stackable = EXCLUDED.is_stackable,
                max_stack = EXCLUDED.max_stack;
        `;

        for (const template of ITEM_TEMPLATES) {
            await dbPool.query(insertQuery, buildTemplateRow(template));
        }

        const removedCount = await removeStaleTemplates(templateCodes);
        console.log(`[SUCCESS] Da dong bo ${ITEM_TEMPLATES.length} item templates alpha. Xoa ${removedCount} template cu khong con tham chieu.`);
        console.log('[INFO] Recipes duoc nap boi design seed rieng.');
        return true;
    } catch (error) {
        console.error('[ERROR] That bai khi cap nhat du lieu seed vat pham:', error.message);
        return false;
    }
}

module.exports = {
    seedItemTemplatesAndRecipes,
    ITEM_TEMPLATES,
    normalizeItemTags,
};
