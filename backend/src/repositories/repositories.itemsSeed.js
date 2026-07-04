// backend/src/repositories/repositories.itemsSeed.js

const { dbPool } = require('./repositories.database');

const DEFAULT_DROP_WEIGHTS = {
    common: 200,
    uncommon: 40,
    rare: 10,
    epic: 5,
    legendary: 1,
};

const STACKABLE_EXCLUDED_CATEGORIES = ['WEAPON', 'EQUIPMENT', 'TOOL', 'BUILDING'];
const SUPPORTED_CATEGORIES = [
    'RUBBISH',
    'MATERIAL',
    'SEED',
    'FOOD',
    'DRINK',
    'MEDICINE',
    'TOOL',
    'WEAPON',
    'AMMO',
    'EQUIPMENT',
    'BUILDING',
];

const ITEM_TEMPLATES = [
    {
        "name": "Empty plastic bottle",
        "tags": [
            "Rubbish",
            "Recyclable"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Empty tin canned",
        "tags": [
            "Rubbish",
            "Recyclable",
            "Metal",
            "Zinc"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Corroded Copper Wire",
        "tags": [
            "Rubbish",
            "Recyclable",
            "Metal",
            "Copper"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Old Copper Pipe",
        "tags": [
            "Rubbish",
            "Recyclable",
            "Metal",
            "Copper"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Rusty Iron Scrap",
        "tags": [
            "Rubbish",
            "Recyclable",
            "Metal",
            "Iron"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Bent Iron Rebar",
        "tags": [
            "Rubbish",
            "Recyclable",
            "Metal",
            "Iron"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Crushed Bottle Cap",
        "tags": [
            "Rubbish",
            "Recyclable",
            "Metal",
            "Zinc"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Crushed Soda Can",
        "tags": [
            "Rubbish",
            "Recyclable",
            "Metal",
            "Aluminum"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Torn Aluminum Foil",
        "tags": [
            "Rubbish",
            "Recyclable",
            "Metal",
            "Aluminum"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Broken Glass Bottle",
        "tags": [
            "Rubbish",
            "Recyclable",
            "Glass"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Empty Glass Jar",
        "tags": [
            "Rubbish",
            "Recyclable",
            "Glass"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Cracked Plastic Bucket",
        "tags": [
            "Rubbish",
            "Recyclable",
            "Plastic"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Torn Plastic Bag",
        "tags": [
            "Rubbish",
            "Recyclable",
            "Plastic"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Splintered Wood Pallet",
        "tags": [
            "Rubbish",
            "Recyclable",
            "Wood"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Moldy Cardboard Box",
        "tags": [
            "Rubbish",
            "NotRecyclable"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Soggy Newspaper",
        "tags": [
            "Rubbish",
            "NotRecyclable"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Broken Ceramic Shard",
        "tags": [
            "Rubbish",
            "NotRecyclable"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Cracked Rubber Tire",
        "tags": [
            "Rubbish",
            "Recyclable",
            "Rubber"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Shredded Fabric Scrap",
        "tags": [
            "Rubbish",
            "Recyclable",
            "Fabric"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Rotten Food Waste",
        "tags": [
            "Rubbish",
            "NotRecyclable",
            "Infected"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "note": "Contaminated, may raise Infection rate",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Broken Styrofoam Chunk",
        "tags": [
            "Rubbish",
            "NotRecyclable"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Rusted Broken Toy",
        "tags": [
            "Rubbish",
            "NotRecyclable"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Discarded Battery",
        "tags": [
            "Rubbish",
            "NotRecyclable",
            "Infected"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "note": "Contaminated, may raise Radiation rate",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Old Broken Umbrella",
        "tags": [
            "Rubbish",
            "NotRecyclable"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Dirt",
        "tags": [
            "Material",
            "Dirt"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Sand",
        "tags": [
            "Material",
            "Sand"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Glass",
        "tags": [
            "Material",
            "Glass"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Plastic",
        "tags": [
            "Material",
            "Plastic"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Oak Branch",
        "tags": [
            "Material",
            "Branch",
            "Oak"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Pine Branch",
        "tags": [
            "Material",
            "Branch",
            "Pine"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Maple Branch",
        "tags": [
            "Material",
            "Branch",
            "Maple"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Sycamore Branch",
        "tags": [
            "Material",
            "Branch",
            "Sycamore"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Willow Branch",
        "tags": [
            "Material",
            "Branch",
            "Willow"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Oak Leaf",
        "tags": [
            "Material",
            "Leaf",
            "Oak"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Pine Leaf",
        "tags": [
            "Material",
            "Leaf",
            "Pine"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Maple Leaf",
        "tags": [
            "Material",
            "Leaf",
            "Maple"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Sycamore Leaf",
        "tags": [
            "Material",
            "Leaf",
            "Sycamore"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Willow Leaf",
        "tags": [
            "Material",
            "Leaf",
            "Willow"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Oak Log",
        "tags": [
            "Material",
            "Log",
            "Oak"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Pine Log",
        "tags": [
            "Material",
            "Log",
            "Pine"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Maple Log",
        "tags": [
            "Material",
            "Log",
            "Maple"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Sycamore Log",
        "tags": [
            "Material",
            "Log",
            "Sycamore"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Willow Log",
        "tags": [
            "Material",
            "Log",
            "Willow"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Big Oak Log",
        "tags": [
            "Material",
            "Log",
            "Oak",
            "Big"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Big Pine Log",
        "tags": [
            "Material",
            "Log",
            "Pine",
            "Big"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Big Maple Log",
        "tags": [
            "Material",
            "Log",
            "Maple",
            "Big"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Big Sycamore Log",
        "tags": [
            "Material",
            "Log",
            "Sycamore",
            "Big"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Big Willow Log",
        "tags": [
            "Material",
            "Log",
            "Willow",
            "Big"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Infected Oak Log",
        "tags": [
            "Material",
            "Log",
            "Oak",
            "Infected"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "note": "Contaminated wood from pollution; must be processed before use",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Infected Pine Log",
        "tags": [
            "Material",
            "Log",
            "Pine",
            "Infected"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "note": "Contaminated wood from pollution; must be processed before use",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Infected Maple Log",
        "tags": [
            "Material",
            "Log",
            "Maple",
            "Infected"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "note": "Contaminated wood from pollution; must be processed before use",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Infected Sycamore Log",
        "tags": [
            "Material",
            "Log",
            "Sycamore",
            "Infected"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "note": "Contaminated wood from pollution; must be processed before use",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Infected Willow Log",
        "tags": [
            "Material",
            "Log",
            "Willow",
            "Infected"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "note": "Contaminated wood from pollution; must be processed before use",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Pebble",
        "tags": [
            "Material",
            "Stone",
            "Pebble"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Boulder",
        "tags": [
            "Material",
            "Stone",
            "Boulder"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Amethys",
        "tags": [
            "Material",
            "Amethys"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Copper Ore",
        "tags": [
            "Material",
            "Ore",
            "Copper"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Iron Ore",
        "tags": [
            "Material",
            "Ore",
            "Iron"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Zinc Ore",
        "tags": [
            "Material",
            "Ore",
            "Zinc"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Bauxite Ore",
        "tags": [
            "Material",
            "Ore",
            "Aluminum"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Sulfur",
        "tags": [
            "Material",
            "Mineral",
            "Sulfur"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Saltpeter",
        "tags": [
            "Material",
            "Mineral",
            "Saltpeter"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Copper Ingot",
        "tags": [
            "Material",
            "Metal",
            "Copper"
        ],
        "origin": "Craftable",
        "levelGap": "11-40",
        "lifecycleModel": "None",
        "note": "Smelted from Copper Ore or recyclable copper rubbish",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Iron Ingot",
        "tags": [
            "Material",
            "Metal",
            "Iron"
        ],
        "origin": "Craftable",
        "levelGap": "11-40",
        "lifecycleModel": "None",
        "note": "Smelted from Iron Ore or recyclable iron rubbish",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Zinc Ingot",
        "tags": [
            "Material",
            "Metal",
            "Zinc"
        ],
        "origin": "Craftable",
        "levelGap": "1-20",
        "lifecycleModel": "None",
        "note": "Smelted from Zinc Ore or recyclable zinc rubbish",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Aluminum Ingot",
        "tags": [
            "Material",
            "Metal",
            "Aluminum"
        ],
        "origin": "Craftable",
        "levelGap": "21-40+",
        "lifecycleModel": "None",
        "note": "Smelted from Bauxite Ore or recyclable aluminum rubbish",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Rat Bone",
        "tags": [
            "Material",
            "Bone",
            "Rat"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Pigeon Bone",
        "tags": [
            "Material",
            "Bone",
            "Pigeon"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Stray Dog Bone",
        "tags": [
            "Material",
            "Bone",
            "Stray Dog"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Feral Cat Bone",
        "tags": [
            "Material",
            "Bone",
            "Feral Cat"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Deer Bone",
        "tags": [
            "Material",
            "Bone",
            "Deer"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Stray Dog Leather",
        "tags": [
            "Material",
            "Leather",
            "Stray Dog"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Feral Cat Leather",
        "tags": [
            "Material",
            "Leather",
            "Feral Cat"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Deer Leather",
        "tags": [
            "Material",
            "Leather",
            "Deer"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Wooden Nail",
        "tags": [
            "Material",
            "Processed",
            "Wood"
        ],
        "origin": "Craftable",
        "levelGap": "1-40",
        "lifecycleModel": "None",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Metal Nail",
        "tags": [
            "Material",
            "Metal",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "11-40",
        "lifecycleModel": "None",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Charcoal",
        "tags": [
            "Material",
            "Processed",
            "Charcoal"
        ],
        "origin": "Craftable",
        "levelGap": "1-40",
        "lifecycleModel": "None",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Fabric",
        "tags": [
            "Material",
            "Fabric"
        ],
        "origin": "Craftable",
        "levelGap": "1-30",
        "lifecycleModel": "None",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Rubber",
        "tags": [
            "Material",
            "Rubber"
        ],
        "origin": "Craftable",
        "levelGap": "1-40",
        "lifecycleModel": "None",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Cordage",
        "tags": [
            "Material",
            "Cordage"
        ],
        "origin": "Craftable",
        "levelGap": "1-40",
        "lifecycleModel": "None",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Wooden Handle",
        "tags": [
            "Material",
            "Component",
            "Handle"
        ],
        "origin": "Craftable",
        "levelGap": "1-40",
        "lifecycleModel": "None",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Stone Tool Head",
        "tags": [
            "Material",
            "Component",
            "Tool Head",
            "Stone"
        ],
        "origin": "Craftable",
        "levelGap": "1-20",
        "lifecycleModel": "None",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Copper Tool Head",
        "tags": [
            "Material",
            "Component",
            "Tool Head",
            "Copper"
        ],
        "origin": "Craftable",
        "levelGap": "11-30",
        "lifecycleModel": "None",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Iron Tool Head",
        "tags": [
            "Material",
            "Component",
            "Tool Head",
            "Iron"
        ],
        "origin": "Craftable",
        "levelGap": "21-40",
        "lifecycleModel": "None",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Aluminum Tool Head",
        "tags": [
            "Material",
            "Component",
            "Tool Head",
            "Aluminum"
        ],
        "origin": "Craftable",
        "levelGap": "31-40+",
        "lifecycleModel": "None",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Bowstring",
        "tags": [
            "Material",
            "Component",
            "Bowstring"
        ],
        "origin": "Craftable",
        "levelGap": "1-40",
        "lifecycleModel": "None",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Iron Gun Barrel",
        "tags": [
            "Material",
            "Component",
            "Gun Barrel",
            "Iron"
        ],
        "origin": "Craftable",
        "levelGap": "11-30",
        "lifecycleModel": "None",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Iron Gun Frame",
        "tags": [
            "Material",
            "Component",
            "Gun Frame",
            "Iron"
        ],
        "origin": "Craftable",
        "levelGap": "11-30",
        "lifecycleModel": "None",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Aluminum Gun Barrel",
        "tags": [
            "Material",
            "Component",
            "Gun Barrel",
            "Aluminum"
        ],
        "origin": "Craftable",
        "levelGap": "21-40",
        "lifecycleModel": "None",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Aluminum Gun Frame",
        "tags": [
            "Material",
            "Component",
            "Gun Frame",
            "Aluminum"
        ],
        "origin": "Craftable",
        "levelGap": "21-40",
        "lifecycleModel": "None",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Fabric Panel",
        "tags": [
            "Material",
            "Component",
            "Fabric Panel"
        ],
        "origin": "Craftable",
        "levelGap": "1-30",
        "lifecycleModel": "None",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Padding",
        "tags": [
            "Material",
            "Component",
            "Padding"
        ],
        "origin": "Craftable",
        "levelGap": "1-40",
        "lifecycleModel": "None",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Gunpowder",
        "tags": [
            "Material",
            "Component",
            "Gunpowder"
        ],
        "origin": "Craftable",
        "levelGap": "1-40",
        "lifecycleModel": "None",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Dandelion Seed",
        "tags": [
            "Seed",
            "Plantable",
            "Dandelion"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Wild Lettuce Seed",
        "tags": [
            "Seed",
            "Plantable",
            "Wild"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Feral Tomato Seed",
        "tags": [
            "Seed",
            "Plantable",
            "Feral"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Pumpkin Seed",
        "tags": [
            "Seed",
            "Plantable",
            "Pumpkin"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Bramble Berry Seed",
        "tags": [
            "Seed",
            "Plantable",
            "Bramble"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Wild Wheat Seed",
        "tags": [
            "Seed",
            "Plantable",
            "Wheat"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Wild Oat Seed",
        "tags": [
            "Seed",
            "Plantable",
            "Oat"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Feral Corn Seed",
        "tags": [
            "Seed",
            "Plantable",
            "Corn"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "None",
        "lifecycleNote": "Materials, seeds, and rubbish do not need durability or duration by default."
    },
    {
        "name": "Rat Raw Meat",
        "tags": [
            "Food",
            "Meat",
            "Rat",
            "Raw"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Duration",
        "baseDurationHours": 72,
        "lifecycleNote": "Fresh raw or cooked food spoils to reinforce cooking and storage loops."
    },
    {
        "name": "Pigeon Raw Meat",
        "tags": [
            "Food",
            "Meat",
            "Pigeon",
            "Raw"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Duration",
        "baseDurationHours": 72,
        "lifecycleNote": "Fresh raw or cooked food spoils to reinforce cooking and storage loops."
    },
    {
        "name": "Stray Dog Raw Meat",
        "tags": [
            "Food",
            "Meat",
            "Stray Dog",
            "Raw"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Duration",
        "baseDurationHours": 72,
        "lifecycleNote": "Fresh raw or cooked food spoils to reinforce cooking and storage loops."
    },
    {
        "name": "Feral Cat Raw Meat",
        "tags": [
            "Food",
            "Meat",
            "Feral Cat",
            "Raw"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Duration",
        "baseDurationHours": 72,
        "lifecycleNote": "Fresh raw or cooked food spoils to reinforce cooking and storage loops."
    },
    {
        "name": "Deer Raw Meat",
        "tags": [
            "Food",
            "Meat",
            "Deer",
            "Raw"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Duration",
        "baseDurationHours": 72,
        "lifecycleNote": "Fresh raw or cooked food spoils to reinforce cooking and storage loops."
    },
    {
        "name": "Dandelion Greens",
        "tags": [
            "Food",
            "Vegetable",
            "Dandelion"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Duration",
        "baseDurationHours": 72,
        "lifecycleNote": "Fresh raw or cooked food spoils to reinforce cooking and storage loops."
    },
    {
        "name": "Wild Lettuce",
        "tags": [
            "Food",
            "Vegetable",
            "Wild"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Duration",
        "baseDurationHours": 72,
        "lifecycleNote": "Fresh raw or cooked food spoils to reinforce cooking and storage loops."
    },
    {
        "name": "Feral Tomato",
        "tags": [
            "Food",
            "Vegetable",
            "Feral"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Duration",
        "baseDurationHours": 72,
        "lifecycleNote": "Fresh raw or cooked food spoils to reinforce cooking and storage loops."
    },
    {
        "name": "Cellar Mushroom",
        "tags": [
            "Food",
            "Vegetable",
            "Cellar"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Duration",
        "baseDurationHours": 72,
        "lifecycleNote": "Fresh raw or cooked food spoils to reinforce cooking and storage loops."
    },
    {
        "name": "Overgrown Pumpkin",
        "tags": [
            "Food",
            "Vegetable",
            "Overgrown"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Duration",
        "baseDurationHours": 72,
        "lifecycleNote": "Fresh raw or cooked food spoils to reinforce cooking and storage loops."
    },
    {
        "name": "Wild Apple",
        "tags": [
            "Food",
            "Fruit",
            "Wild"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Duration",
        "baseDurationHours": 72,
        "lifecycleNote": "Fresh raw or cooked food spoils to reinforce cooking and storage loops."
    },
    {
        "name": "Park Cherry",
        "tags": [
            "Food",
            "Fruit",
            "Park"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Duration",
        "baseDurationHours": 72,
        "lifecycleNote": "Fresh raw or cooked food spoils to reinforce cooking and storage loops."
    },
    {
        "name": "Overgrown Grape",
        "tags": [
            "Food",
            "Fruit",
            "Overgrown"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Duration",
        "baseDurationHours": 72,
        "lifecycleNote": "Fresh raw or cooked food spoils to reinforce cooking and storage loops."
    },
    {
        "name": "Bramble Berry",
        "tags": [
            "Food",
            "Fruit",
            "Bramble"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Duration",
        "baseDurationHours": 72,
        "lifecycleNote": "Fresh raw or cooked food spoils to reinforce cooking and storage loops."
    },
    {
        "name": "Alley Fig",
        "tags": [
            "Food",
            "Fruit",
            "Alley"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Duration",
        "baseDurationHours": 72,
        "lifecycleNote": "Fresh raw or cooked food spoils to reinforce cooking and storage loops."
    },
    {
        "name": "Wild Wheat",
        "tags": [
            "Food",
            "Grain",
            "Wheat"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Duration",
        "baseDurationHours": 72,
        "lifecycleNote": "Fresh raw or cooked food spoils to reinforce cooking and storage loops."
    },
    {
        "name": "Wild Oat",
        "tags": [
            "Food",
            "Grain",
            "Oat"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Duration",
        "baseDurationHours": 72,
        "lifecycleNote": "Fresh raw or cooked food spoils to reinforce cooking and storage loops."
    },
    {
        "name": "Feral Corn",
        "tags": [
            "Food",
            "Grain",
            "Corn"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Duration",
        "baseDurationHours": 72,
        "lifecycleNote": "Fresh raw or cooked food spoils to reinforce cooking and storage loops."
    },
    {
        "name": "Wild Wheat Flour",
        "tags": [
            "Food",
            "Flour",
            "Wheat"
        ],
        "origin": "Craftable",
        "levelGap": "1-20",
        "lifecycleModel": "None",
        "lifecycleNote": "Shelf-stable food does not need a spoil timer in the current system."
    },
    {
        "name": "Wild Oat Flour",
        "tags": [
            "Food",
            "Flour",
            "Oat"
        ],
        "origin": "Craftable",
        "levelGap": "1-20",
        "lifecycleModel": "None",
        "lifecycleNote": "Shelf-stable food does not need a spoil timer in the current system."
    },
    {
        "name": "Feral Corn Flour",
        "tags": [
            "Food",
            "Flour",
            "Corn"
        ],
        "origin": "Craftable",
        "levelGap": "1-20",
        "lifecycleModel": "None",
        "lifecycleNote": "Shelf-stable food does not need a spoil timer in the current system."
    },
    {
        "name": "Rat Dried Meat",
        "tags": [
            "Food",
            "Meat",
            "Rat",
            "Processed",
            "Dried"
        ],
        "origin": "Craftable",
        "levelGap": "1-20",
        "lifecycleModel": "None",
        "lifecycleNote": "Shelf-stable food does not need a spoil timer in the current system."
    },
    {
        "name": "Feral Cat Dried Meat",
        "tags": [
            "Food",
            "Meat",
            "Feral Cat",
            "Processed",
            "Dried"
        ],
        "origin": "Craftable",
        "levelGap": "1-20",
        "lifecycleModel": "None",
        "lifecycleNote": "Shelf-stable food does not need a spoil timer in the current system."
    },
    {
        "name": "Deer Dried Meat",
        "tags": [
            "Food",
            "Meat",
            "Deer",
            "Processed",
            "Dried"
        ],
        "origin": "Craftable",
        "levelGap": "1-20",
        "lifecycleModel": "None",
        "lifecycleNote": "Shelf-stable food does not need a spoil timer in the current system."
    },
    {
        "name": "Pigeon Smoked Meat",
        "tags": [
            "Food",
            "Meat",
            "Pigeon",
            "Processed",
            "Smoked"
        ],
        "origin": "Craftable",
        "levelGap": "11-30",
        "lifecycleModel": "None",
        "lifecycleNote": "Shelf-stable food does not need a spoil timer in the current system."
    },
    {
        "name": "Stray Dog Smoked Meat",
        "tags": [
            "Food",
            "Meat",
            "Stray Dog",
            "Processed",
            "Smoked"
        ],
        "origin": "Craftable",
        "levelGap": "11-30",
        "lifecycleModel": "None",
        "lifecycleNote": "Shelf-stable food does not need a spoil timer in the current system."
    },
    {
        "name": "Deer Smoked Meat",
        "tags": [
            "Food",
            "Meat",
            "Deer",
            "Processed",
            "Smoked"
        ],
        "origin": "Craftable",
        "levelGap": "11-30",
        "lifecycleModel": "None",
        "lifecycleNote": "Shelf-stable food does not need a spoil timer in the current system."
    },
    {
        "name": "Salt",
        "tags": [
            "Food",
            "Spice",
            "Salt"
        ],
        "origin": "Craftable",
        "levelGap": "1-20",
        "lifecycleModel": "None",
        "lifecycleNote": "Shelf-stable food does not need a spoil timer in the current system."
    },
    {
        "name": "Sugar",
        "tags": [
            "Food",
            "Spice",
            "Sugar"
        ],
        "origin": "Craftable",
        "levelGap": "11-30",
        "lifecycleModel": "None",
        "lifecycleNote": "Shelf-stable food does not need a spoil timer in the current system."
    },
    {
        "name": "Vinegar",
        "tags": [
            "Food",
            "Spice",
            "Vinegar"
        ],
        "origin": "Craftable",
        "levelGap": "11-30",
        "lifecycleModel": "None",
        "lifecycleNote": "Shelf-stable food does not need a spoil timer in the current system."
    },
    {
        "name": "Soysauce",
        "tags": [
            "Food",
            "Spice",
            "Soysauce"
        ],
        "origin": "Craftable",
        "levelGap": "11-30",
        "lifecycleModel": "None",
        "lifecycleNote": "Shelf-stable food does not need a spoil timer in the current system."
    },
    {
        "name": "Yeast",
        "tags": [
            "Food",
            "Processed",
            "Yeast"
        ],
        "origin": "Craftable",
        "levelGap": "11-30",
        "lifecycleModel": "None",
        "lifecycleNote": "Shelf-stable food does not need a spoil timer in the current system."
    },
    {
        "name": "Butter",
        "tags": [
            "Food",
            "Butter",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "11-30",
        "lifecycleModel": "Duration",
        "baseDurationHours": 72,
        "lifecycleNote": "Fresh raw or cooked food spoils to reinforce cooking and storage loops."
    },
    {
        "name": "Cheese",
        "tags": [
            "Food",
            "Cheese",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "11-30",
        "lifecycleModel": "Duration",
        "baseDurationHours": 72,
        "lifecycleNote": "Fresh raw or cooked food spoils to reinforce cooking and storage loops."
    },
    {
        "name": "Stray Dog Fat",
        "tags": [
            "Food",
            "Oil",
            "Stray Dog"
        ],
        "origin": "Craftable",
        "levelGap": "1-20",
        "lifecycleModel": "Duration",
        "baseDurationHours": 72,
        "lifecycleNote": "Fresh raw or cooked food spoils to reinforce cooking and storage loops."
    },
    {
        "name": "Feral Cat Fat",
        "tags": [
            "Food",
            "Oil",
            "Feral Cat"
        ],
        "origin": "Craftable",
        "levelGap": "1-20",
        "lifecycleModel": "Duration",
        "baseDurationHours": 72,
        "lifecycleNote": "Fresh raw or cooked food spoils to reinforce cooking and storage loops."
    },
    {
        "name": "Deer Fat",
        "tags": [
            "Food",
            "Oil",
            "Deer"
        ],
        "origin": "Craftable",
        "levelGap": "1-20",
        "lifecycleModel": "Duration",
        "baseDurationHours": 72,
        "lifecycleNote": "Fresh raw or cooked food spoils to reinforce cooking and storage loops."
    },
    {
        "name": "Deer Oil",
        "tags": [
            "Food",
            "Oil",
            "Deer",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "11-30",
        "lifecycleModel": "None",
        "lifecycleNote": "Shelf-stable food does not need a spoil timer in the current system."
    },
    {
        "name": "Pumpkin Seed Oil",
        "tags": [
            "Food",
            "Oil",
            "Pumpkin",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "11-30",
        "lifecycleModel": "None",
        "lifecycleNote": "Shelf-stable food does not need a spoil timer in the current system."
    },
    {
        "name": "Feral Corn Oil",
        "tags": [
            "Food",
            "Oil",
            "Corn",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "11-30",
        "lifecycleModel": "None",
        "lifecycleNote": "Shelf-stable food does not need a spoil timer in the current system."
    },
    {
        "name": "Skewered Rat",
        "tags": [
            "Food",
            "Grilling",
            "Rat",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "1-20",
        "lifecycleModel": "Duration",
        "baseDurationHours": 72,
        "lifecycleNote": "Fresh raw or cooked food spoils to reinforce cooking and storage loops."
    },
    {
        "name": "Skewered Pigeon",
        "tags": [
            "Food",
            "Grilling",
            "Pigeon",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "1-20",
        "lifecycleModel": "Duration",
        "baseDurationHours": 72,
        "lifecycleNote": "Fresh raw or cooked food spoils to reinforce cooking and storage loops."
    },
    {
        "name": "Skewered Deer",
        "tags": [
            "Food",
            "Grilling",
            "Deer",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "1-20",
        "lifecycleModel": "Duration",
        "baseDurationHours": 72,
        "lifecycleNote": "Fresh raw or cooked food spoils to reinforce cooking and storage loops."
    },
    {
        "name": "Seasoned Skewered Stray Dog",
        "tags": [
            "Food",
            "Grilling",
            "Stray Dog",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "11-30",
        "lifecycleModel": "Duration",
        "baseDurationHours": 72,
        "lifecycleNote": "Fresh raw or cooked food spoils to reinforce cooking and storage loops."
    },
    {
        "name": "Seasoned Skewered Feral Cat",
        "tags": [
            "Food",
            "Grilling",
            "Feral Cat",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "11-30",
        "lifecycleModel": "Duration",
        "baseDurationHours": 72,
        "lifecycleNote": "Fresh raw or cooked food spoils to reinforce cooking and storage loops."
    },
    {
        "name": "Seasoned Skewered Deer",
        "tags": [
            "Food",
            "Grilling",
            "Deer",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "11-30",
        "lifecycleModel": "Duration",
        "baseDurationHours": 72,
        "lifecycleNote": "Fresh raw or cooked food spoils to reinforce cooking and storage loops."
    },
    {
        "name": "Stray Dog Steak",
        "tags": [
            "Food",
            "Grilling",
            "Meat",
            "Stray Dog",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "21-40",
        "lifecycleModel": "Duration",
        "baseDurationHours": 72,
        "lifecycleNote": "Fresh raw or cooked food spoils to reinforce cooking and storage loops."
    },
    {
        "name": "Feral Cat Steak",
        "tags": [
            "Food",
            "Grilling",
            "Meat",
            "Feral Cat",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "21-40",
        "lifecycleModel": "Duration",
        "baseDurationHours": 72,
        "lifecycleNote": "Fresh raw or cooked food spoils to reinforce cooking and storage loops."
    },
    {
        "name": "Deer Steak",
        "tags": [
            "Food",
            "Grilling",
            "Meat",
            "Deer",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "21-40",
        "lifecycleModel": "Duration",
        "baseDurationHours": 72,
        "lifecycleNote": "Fresh raw or cooked food spoils to reinforce cooking and storage loops."
    },
    {
        "name": "Stray Dog Seasoned Steak",
        "tags": [
            "Food",
            "Grilling",
            "Meat",
            "Stray Dog",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "31-40+",
        "lifecycleModel": "Duration",
        "baseDurationHours": 72,
        "lifecycleNote": "Fresh raw or cooked food spoils to reinforce cooking and storage loops."
    },
    {
        "name": "Feral Cat Seasoned Steak",
        "tags": [
            "Food",
            "Grilling",
            "Meat",
            "Feral Cat",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "31-40+",
        "lifecycleModel": "Duration",
        "baseDurationHours": 72,
        "lifecycleNote": "Fresh raw or cooked food spoils to reinforce cooking and storage loops."
    },
    {
        "name": "Deer Seasoned Steak",
        "tags": [
            "Food",
            "Grilling",
            "Meat",
            "Deer",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "31-40+",
        "lifecycleModel": "Duration",
        "baseDurationHours": 72,
        "lifecycleNote": "Fresh raw or cooked food spoils to reinforce cooking and storage loops."
    },
    {
        "name": "Boiled Pigeon",
        "tags": [
            "Food",
            "Boiling",
            "Pigeon",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "1-20",
        "lifecycleModel": "None",
        "lifecycleNote": "Shelf-stable food does not need a spoil timer in the current system."
    },
    {
        "name": "Boiled Rat",
        "tags": [
            "Food",
            "Boiling",
            "Rat",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "1-20",
        "lifecycleModel": "None",
        "lifecycleNote": "Shelf-stable food does not need a spoil timer in the current system."
    },
    {
        "name": "Boiled Overgrown Pumpkin",
        "tags": [
            "Food",
            "Boiling",
            "Pumpkin",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "1-20",
        "lifecycleModel": "None",
        "lifecycleNote": "Shelf-stable food does not need a spoil timer in the current system."
    },
    {
        "name": "Dandelion Green Soup",
        "tags": [
            "Food",
            "Boiling",
            "Dandelion",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "11-30",
        "lifecycleModel": "Duration",
        "baseDurationHours": 72,
        "lifecycleNote": "Fresh raw or cooked food spoils to reinforce cooking and storage loops."
    },
    {
        "name": "Cellar Mushroom Soup",
        "tags": [
            "Food",
            "Boiling",
            "Mushroom",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "11-30",
        "lifecycleModel": "Duration",
        "baseDurationHours": 72,
        "lifecycleNote": "Fresh raw or cooked food spoils to reinforce cooking and storage loops."
    },
    {
        "name": "Deer Bone Soup",
        "tags": [
            "Food",
            "Boiling",
            "Deer",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "11-30",
        "lifecycleModel": "Duration",
        "baseDurationHours": 72,
        "lifecycleNote": "Fresh raw or cooked food spoils to reinforce cooking and storage loops."
    },
    {
        "name": "Stray Dog Stew",
        "tags": [
            "Food",
            "Boiling",
            "Stray Dog",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "21-40",
        "lifecycleModel": "Duration",
        "baseDurationHours": 72,
        "lifecycleNote": "Fresh raw or cooked food spoils to reinforce cooking and storage loops."
    },
    {
        "name": "Feral Cat Stew",
        "tags": [
            "Food",
            "Boiling",
            "Feral Cat",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "21-40",
        "lifecycleModel": "Duration",
        "baseDurationHours": 72,
        "lifecycleNote": "Fresh raw or cooked food spoils to reinforce cooking and storage loops."
    },
    {
        "name": "Overgrown Pumpkin Stew",
        "tags": [
            "Food",
            "Boiling",
            "Pumpkin",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "21-40",
        "lifecycleModel": "Duration",
        "baseDurationHours": 72,
        "lifecycleNote": "Fresh raw or cooked food spoils to reinforce cooking and storage loops."
    },
    {
        "name": "Deer Bone Noodle Soup",
        "tags": [
            "Food",
            "Noodle",
            "Deer",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "11-30",
        "lifecycleModel": "Duration",
        "baseDurationHours": 72,
        "lifecycleNote": "Fresh raw or cooked food spoils to reinforce cooking and storage loops."
    },
    {
        "name": "Cellar Mushroom Noodle",
        "tags": [
            "Food",
            "Noodle",
            "Mushroom",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "11-30",
        "lifecycleModel": "Duration",
        "baseDurationHours": 72,
        "lifecycleNote": "Fresh raw or cooked food spoils to reinforce cooking and storage loops."
    },
    {
        "name": "Feral Tomato Noodle",
        "tags": [
            "Food",
            "Noodle",
            "Tomato",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "11-30",
        "lifecycleModel": "Duration",
        "baseDurationHours": 72,
        "lifecycleNote": "Fresh raw or cooked food spoils to reinforce cooking and storage loops."
    },
    {
        "name": "Fried Rat",
        "tags": [
            "Food",
            "Frying",
            "Rat",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "1-20",
        "lifecycleModel": "Duration",
        "baseDurationHours": 72,
        "lifecycleNote": "Fresh raw or cooked food spoils to reinforce cooking and storage loops."
    },
    {
        "name": "Fried Pigeon",
        "tags": [
            "Food",
            "Frying",
            "Pigeon",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "1-20",
        "lifecycleModel": "Duration",
        "baseDurationHours": 72,
        "lifecycleNote": "Fresh raw or cooked food spoils to reinforce cooking and storage loops."
    },
    {
        "name": "Fried Overgrown Pumpkin",
        "tags": [
            "Food",
            "Frying",
            "Pumpkin",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "1-20",
        "lifecycleModel": "Duration",
        "baseDurationHours": 72,
        "lifecycleNote": "Fresh raw or cooked food spoils to reinforce cooking and storage loops."
    },
    {
        "name": "Seasoned Fried Stray Dog",
        "tags": [
            "Food",
            "Frying",
            "Stray Dog",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "11-30",
        "lifecycleModel": "Duration",
        "baseDurationHours": 72,
        "lifecycleNote": "Fresh raw or cooked food spoils to reinforce cooking and storage loops."
    },
    {
        "name": "Seasoned Fried Feral Cat",
        "tags": [
            "Food",
            "Frying",
            "Feral Cat",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "11-30",
        "lifecycleModel": "Duration",
        "baseDurationHours": 72,
        "lifecycleNote": "Fresh raw or cooked food spoils to reinforce cooking and storage loops."
    },
    {
        "name": "Seasoned Fried Deer",
        "tags": [
            "Food",
            "Frying",
            "Deer",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "11-30",
        "lifecycleModel": "Duration",
        "baseDurationHours": 72,
        "lifecycleNote": "Fresh raw or cooked food spoils to reinforce cooking and storage loops."
    },
    {
        "name": "Deep Fried Cellar Mushroom",
        "tags": [
            "Food",
            "Frying",
            "Mushroom",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "21-40",
        "lifecycleModel": "Duration",
        "baseDurationHours": 72,
        "lifecycleNote": "Fresh raw or cooked food spoils to reinforce cooking and storage loops."
    },
    {
        "name": "Deep Fried Feral Tomato",
        "tags": [
            "Food",
            "Frying",
            "Tomato",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "21-40",
        "lifecycleModel": "Duration",
        "baseDurationHours": 72,
        "lifecycleNote": "Fresh raw or cooked food spoils to reinforce cooking and storage loops."
    },
    {
        "name": "Deep Fried Deer",
        "tags": [
            "Food",
            "Frying",
            "Deer",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "21-40",
        "lifecycleModel": "Duration",
        "baseDurationHours": 72,
        "lifecycleNote": "Fresh raw or cooked food spoils to reinforce cooking and storage loops."
    },
    {
        "name": "Bread",
        "tags": [
            "Food",
            "Bread",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "11-30",
        "lifecycleModel": "Duration",
        "baseDurationHours": 72,
        "lifecycleNote": "Fresh raw or cooked food spoils to reinforce cooking and storage loops."
    },
    {
        "name": "Rat Burger",
        "tags": [
            "Food",
            "Meat",
            "Burger",
            "Rat",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "11-30",
        "lifecycleModel": "Duration",
        "baseDurationHours": 72,
        "lifecycleNote": "Fresh raw or cooked food spoils to reinforce cooking and storage loops."
    },
    {
        "name": "Stray Dog Burger",
        "tags": [
            "Food",
            "Meat",
            "Burger",
            "Stray Dog",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "11-30",
        "lifecycleModel": "Duration",
        "baseDurationHours": 72,
        "lifecycleNote": "Fresh raw or cooked food spoils to reinforce cooking and storage loops."
    },
    {
        "name": "Deer Burger",
        "tags": [
            "Food",
            "Meat",
            "Burger",
            "Deer",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "11-30",
        "lifecycleModel": "Duration",
        "baseDurationHours": 72,
        "lifecycleNote": "Fresh raw or cooked food spoils to reinforce cooking and storage loops."
    },
    {
        "name": "Pigeon Sandwich",
        "tags": [
            "Food",
            "Sandwich",
            "Pigeon",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "21-40",
        "lifecycleModel": "Duration",
        "baseDurationHours": 72,
        "lifecycleNote": "Fresh raw or cooked food spoils to reinforce cooking and storage loops."
    },
    {
        "name": "Feral Tomato Sandwich",
        "tags": [
            "Food",
            "Sandwich",
            "Tomato",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "21-40",
        "lifecycleModel": "Duration",
        "baseDurationHours": 72,
        "lifecycleNote": "Fresh raw or cooked food spoils to reinforce cooking and storage loops."
    },
    {
        "name": "Deer Sandwich",
        "tags": [
            "Food",
            "Sandwich",
            "Deer",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "21-40",
        "lifecycleModel": "Duration",
        "baseDurationHours": 72,
        "lifecycleNote": "Fresh raw or cooked food spoils to reinforce cooking and storage loops."
    },
    {
        "name": "Wild Mushroom Pizza",
        "tags": [
            "Food",
            "Pizza",
            "Mushroom",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "21-40",
        "lifecycleModel": "Duration",
        "baseDurationHours": 72,
        "lifecycleNote": "Fresh raw or cooked food spoils to reinforce cooking and storage loops."
    },
    {
        "name": "Feral Tomato Pizza",
        "tags": [
            "Food",
            "Pizza",
            "Tomato",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "21-40",
        "lifecycleModel": "Duration",
        "baseDurationHours": 72,
        "lifecycleNote": "Fresh raw or cooked food spoils to reinforce cooking and storage loops."
    },
    {
        "name": "Deer Meat Pizza",
        "tags": [
            "Food",
            "Pizza",
            "Deer",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "21-40",
        "lifecycleModel": "Duration",
        "baseDurationHours": 72,
        "lifecycleNote": "Fresh raw or cooked food spoils to reinforce cooking and storage loops."
    },
    {
        "name": "Wild Apple Cake",
        "tags": [
            "Food",
            "Cake",
            "Apple",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "21-40",
        "lifecycleModel": "Duration",
        "baseDurationHours": 72,
        "lifecycleNote": "Fresh raw or cooked food spoils to reinforce cooking and storage loops."
    },
    {
        "name": "Park Cherry Cake",
        "tags": [
            "Food",
            "Cake",
            "Cherry",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "21-40",
        "lifecycleModel": "Duration",
        "baseDurationHours": 72,
        "lifecycleNote": "Fresh raw or cooked food spoils to reinforce cooking and storage loops."
    },
    {
        "name": "Bramble Berry Cake",
        "tags": [
            "Food",
            "Cake",
            "Berry",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "21-40",
        "lifecycleModel": "Duration",
        "baseDurationHours": 72,
        "lifecycleNote": "Fresh raw or cooked food spoils to reinforce cooking and storage loops."
    },
    {
        "name": "Canned Deer Meat",
        "tags": [
            "Food",
            "Canned",
            "Deer",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "1-20",
        "lifecycleModel": "None",
        "lifecycleNote": "Shelf-stable food does not need a spoil timer in the current system."
    },
    {
        "name": "Canned Feral Tomato",
        "tags": [
            "Food",
            "Canned",
            "Tomato",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "1-20",
        "lifecycleModel": "None",
        "lifecycleNote": "Shelf-stable food does not need a spoil timer in the current system."
    },
    {
        "name": "Canned Overgrown Pumpkin",
        "tags": [
            "Food",
            "Canned",
            "Pumpkin",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "1-20",
        "lifecycleModel": "None",
        "lifecycleNote": "Shelf-stable food does not need a spoil timer in the current system."
    },
    {
        "name": "Improved Canned Deer Meat",
        "tags": [
            "Food",
            "Canned",
            "Deer",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "11-30",
        "lifecycleModel": "None",
        "lifecycleNote": "Shelf-stable food does not need a spoil timer in the current system."
    },
    {
        "name": "Improved Canned Feral Tomato",
        "tags": [
            "Food",
            "Canned",
            "Tomato",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "11-30",
        "lifecycleModel": "None",
        "lifecycleNote": "Shelf-stable food does not need a spoil timer in the current system."
    },
    {
        "name": "Improved Canned Overgrown Pumpkin",
        "tags": [
            "Food",
            "Canned",
            "Pumpkin",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "11-30",
        "lifecycleModel": "None",
        "lifecycleNote": "Shelf-stable food does not need a spoil timer in the current system."
    },
    {
        "name": "Steamed Vegetable Basket",
        "tags": [
            "Food",
            "Steaming",
            "Pumpkin",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "21-40",
        "lifecycleModel": "Duration",
        "baseDurationHours": 72,
        "lifecycleNote": "Fresh raw or cooked food spoils to reinforce cooking and storage loops."
    },
    {
        "name": "Steamed Rat Buns",
        "tags": [
            "Food",
            "Steaming",
            "Rat",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "21-40",
        "lifecycleModel": "Duration",
        "baseDurationHours": 72,
        "lifecycleNote": "Fresh raw or cooked food spoils to reinforce cooking and storage loops."
    },
    {
        "name": "Steamed Deer Dumplings",
        "tags": [
            "Food",
            "Steaming",
            "Deer",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "21-40",
        "lifecycleModel": "Duration",
        "baseDurationHours": 72,
        "lifecycleNote": "Fresh raw or cooked food spoils to reinforce cooking and storage loops."
    },
    {
        "name": "Deer Bone Ramen",
        "tags": [
            "Food",
            "Ramen",
            "Deer",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "31-40+",
        "lifecycleModel": "Duration",
        "baseDurationHours": 72,
        "lifecycleNote": "Fresh raw or cooked food spoils to reinforce cooking and storage loops."
    },
    {
        "name": "Contaminated water",
        "tags": [
            "Drink",
            "Infected"
        ],
        "origin": "Gatherable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Duration",
        "baseDurationHours": 168,
        "lifecycleNote": "Drinks use shelf duration unless later storage systems override it."
    },
    {
        "name": "Water (Boilled/Filtered)",
        "tags": [
            "Drink",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "1-20",
        "lifecycleModel": "Duration",
        "baseDurationHours": 168,
        "lifecycleNote": "Drinks use shelf duration unless later storage systems override it."
    },
    {
        "name": "Mineral Water",
        "tags": [
            "Drink",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "11-30",
        "lifecycleModel": "Duration",
        "baseDurationHours": 168,
        "lifecycleNote": "Drinks use shelf duration unless later storage systems override it."
    },
    {
        "name": "Wild Apple Juice",
        "tags": [
            "Drink",
            "Juice",
            "Apple",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "11-30",
        "lifecycleModel": "Duration",
        "baseDurationHours": 168,
        "lifecycleNote": "Drinks use shelf duration unless later storage systems override it."
    },
    {
        "name": "Overgrown Grape Juice",
        "tags": [
            "Drink",
            "Juice",
            "Grape",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "11-30",
        "lifecycleModel": "Duration",
        "baseDurationHours": 168,
        "lifecycleNote": "Drinks use shelf duration unless later storage systems override it."
    },
    {
        "name": "Feral Tomato Juice",
        "tags": [
            "Drink",
            "Juice",
            "Tomato",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "11-30",
        "lifecycleModel": "Duration",
        "baseDurationHours": 168,
        "lifecycleNote": "Drinks use shelf duration unless later storage systems override it."
    },
    {
        "name": "Bramble Berry Smoothie",
        "tags": [
            "Drink",
            "Smoothie",
            "Berry",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "21-40",
        "lifecycleModel": "Duration",
        "baseDurationHours": 168,
        "lifecycleNote": "Drinks use shelf duration unless later storage systems override it."
    },
    {
        "name": "Alley Fig Smoothie",
        "tags": [
            "Drink",
            "Smoothie",
            "Fig",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "21-40",
        "lifecycleModel": "Duration",
        "baseDurationHours": 168,
        "lifecycleNote": "Drinks use shelf duration unless later storage systems override it."
    },
    {
        "name": "Park Cherry Smoothie",
        "tags": [
            "Drink",
            "Smoothie",
            "Cherry",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "21-40",
        "lifecycleModel": "Duration",
        "baseDurationHours": 168,
        "lifecycleNote": "Drinks use shelf duration unless later storage systems override it."
    },
    {
        "name": "Coffee",
        "tags": [
            "Drink",
            "Processed",
            "Coffee"
        ],
        "origin": "Craftable",
        "levelGap": "1-20",
        "lifecycleModel": "Duration",
        "baseDurationHours": 720,
        "lifecycleNote": "Drinks use shelf duration unless later storage systems override it."
    },
    {
        "name": "Overgrown Grape Wine",
        "tags": [
            "Drink",
            "Alcohol",
            "Grape",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "1-20",
        "lifecycleModel": "Duration",
        "baseDurationHours": 720,
        "lifecycleNote": "Drinks use shelf duration unless later storage systems override it."
    },
    {
        "name": "Wild Apple Wine",
        "tags": [
            "Drink",
            "Alcohol",
            "Apple",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "1-20",
        "lifecycleModel": "Duration",
        "baseDurationHours": 720,
        "lifecycleNote": "Drinks use shelf duration unless later storage systems override it."
    },
    {
        "name": "Bramble Berry Wine",
        "tags": [
            "Drink",
            "Alcohol",
            "Berry",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "1-20",
        "lifecycleModel": "Duration",
        "baseDurationHours": 720,
        "lifecycleNote": "Drinks use shelf duration unless later storage systems override it."
    },
    {
        "name": "Moonshine",
        "tags": [
            "Drink",
            "Alcohol",
            "Processed"
        ],
        "origin": "Craftable",
        "levelGap": "21-40",
        "lifecycleModel": "Duration",
        "baseDurationHours": 168,
        "lifecycleNote": "Drinks use shelf duration unless later storage systems override it."
    },
    {
        "name": "Bandage",
        "tags": [
            "Medicine",
            "Bandage"
        ],
        "origin": "Craftable",
        "levelGap": "1-20",
        "lifecycleModel": "Duration",
        "baseDurationHours": 336,
        "lifecycleNote": "Medicine has shelf life because sterility and chemicals degrade over time."
    },
    {
        "name": "First aid Kit",
        "tags": [
            "Medicine",
            "FirstaidKit"
        ],
        "origin": "Craftable",
        "levelGap": "21-40",
        "lifecycleModel": "Duration",
        "baseDurationHours": 720,
        "lifecycleNote": "Medicine has shelf life because sterility and chemicals degrade over time."
    },
    {
        "name": "Antibiotic",
        "tags": [
            "Medicine",
            "Antibiotic"
        ],
        "origin": "Craftable",
        "levelGap": "11-30",
        "lifecycleModel": "Duration",
        "baseDurationHours": 336,
        "lifecycleNote": "Medicine has shelf life because sterility and chemicals degrade over time."
    },
    {
        "name": "Painkiller",
        "tags": [
            "Medicine",
            "Painkiller"
        ],
        "origin": "Craftable",
        "levelGap": "1-20",
        "lifecycleModel": "Duration",
        "baseDurationHours": 336,
        "lifecycleNote": "Medicine has shelf life because sterility and chemicals degrade over time."
    },
    {
        "name": "Anderaline shot",
        "tags": [
            "Medicine",
            "Booster"
        ],
        "origin": "Craftable",
        "levelGap": "11-30",
        "lifecycleModel": "Duration",
        "baseDurationHours": 336,
        "lifecycleNote": "Medicine has shelf life because sterility and chemicals degrade over time."
    },
    {
        "name": "Speed booster",
        "tags": [
            "Medicine",
            "Booster"
        ],
        "origin": "Craftable",
        "levelGap": "1-20",
        "lifecycleModel": "Duration",
        "baseDurationHours": 336,
        "lifecycleNote": "Medicine has shelf life because sterility and chemicals degrade over time."
    },
    {
        "name": "Stone Axe",
        "tags": [
            "Tool",
            "Axe"
        ],
        "origin": "Craftable",
        "levelGap": "1-20",
        "lifecycleModel": "Durability",
        "baseDurability": 84,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Stone Pickaxe",
        "tags": [
            "Tool",
            "Pickaxe"
        ],
        "origin": "Craftable",
        "levelGap": "1-20",
        "lifecycleModel": "Durability",
        "baseDurability": 84,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Stone Shovel",
        "tags": [
            "Tool",
            "Shovel"
        ],
        "origin": "Craftable",
        "levelGap": "1-20",
        "lifecycleModel": "Durability",
        "baseDurability": 84,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Stone Hoe",
        "tags": [
            "Tool",
            "Hoe"
        ],
        "origin": "Craftable",
        "levelGap": "1-20",
        "lifecycleModel": "Durability",
        "baseDurability": 84,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Copper Axe",
        "tags": [
            "Tool",
            "Axe"
        ],
        "origin": "Craftable",
        "levelGap": "11-30",
        "lifecycleModel": "Durability",
        "baseDurability": 124,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Copper Pickaxe",
        "tags": [
            "Tool",
            "Pickaxe"
        ],
        "origin": "Craftable",
        "levelGap": "11-30",
        "lifecycleModel": "Durability",
        "baseDurability": 124,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Copper Shovel",
        "tags": [
            "Tool",
            "Shovel"
        ],
        "origin": "Craftable",
        "levelGap": "11-30",
        "lifecycleModel": "Durability",
        "baseDurability": 124,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Copper Hoe",
        "tags": [
            "Tool",
            "Hoe"
        ],
        "origin": "Craftable",
        "levelGap": "11-30",
        "lifecycleModel": "Durability",
        "baseDurability": 124,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Iron Axe",
        "tags": [
            "Tool",
            "Axe"
        ],
        "origin": "Craftable",
        "levelGap": "21-40",
        "lifecycleModel": "Durability",
        "baseDurability": 164,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Iron Pickaxe",
        "tags": [
            "Tool",
            "Pickaxe"
        ],
        "origin": "Craftable",
        "levelGap": "21-40",
        "lifecycleModel": "Durability",
        "baseDurability": 164,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Iron Shovel",
        "tags": [
            "Tool",
            "Shovel"
        ],
        "origin": "Craftable",
        "levelGap": "21-40",
        "lifecycleModel": "Durability",
        "baseDurability": 164,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Iron Hoe",
        "tags": [
            "Tool",
            "Hoe"
        ],
        "origin": "Craftable",
        "levelGap": "21-40",
        "lifecycleModel": "Durability",
        "baseDurability": 164,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Aluminum Axe",
        "tags": [
            "Tool",
            "Axe"
        ],
        "origin": "Craftable",
        "levelGap": "31-40+",
        "lifecycleModel": "Durability",
        "baseDurability": 204,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Aluminum Pickaxe",
        "tags": [
            "Tool",
            "Pickaxe"
        ],
        "origin": "Craftable",
        "levelGap": "31-40+",
        "lifecycleModel": "Durability",
        "baseDurability": 204,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Aluminum Shovel",
        "tags": [
            "Tool",
            "Shovel"
        ],
        "origin": "Craftable",
        "levelGap": "31-40+",
        "lifecycleModel": "Durability",
        "baseDurability": 204,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Aluminum Hoe",
        "tags": [
            "Tool",
            "Hoe"
        ],
        "origin": "Craftable",
        "levelGap": "31-40+",
        "lifecycleModel": "Durability",
        "baseDurability": 204,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Makeshift Grill Rack",
        "tags": [
            "Tool",
            "Griller"
        ],
        "origin": "Craftable",
        "levelGap": "1-20",
        "lifecycleModel": "Durability",
        "baseDurability": 84,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Salvaged Cooking Pot",
        "tags": [
            "Tool",
            "CookPot"
        ],
        "origin": "Craftable",
        "levelGap": "11-30",
        "lifecycleModel": "Durability",
        "baseDurability": 124,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Scrap Metal Ladle",
        "tags": [
            "Tool",
            "Ladle"
        ],
        "origin": "Craftable",
        "levelGap": "21-40",
        "lifecycleModel": "Durability",
        "baseDurability": 164,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Salvaged Hammer",
        "tags": [
            "Tool",
            "Hammer"
        ],
        "origin": "Craftable",
        "levelGap": "1-20",
        "lifecycleModel": "Durability",
        "baseDurability": 84,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Rusty Hand Saw",
        "tags": [
            "Tool",
            "Saw"
        ],
        "origin": "Craftable",
        "levelGap": "11-30",
        "lifecycleModel": "Durability",
        "baseDurability": 124,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Reinforced Crowbar",
        "tags": [
            "Tool",
            "Crowbar"
        ],
        "origin": "Craftable",
        "levelGap": "21-40",
        "lifecycleModel": "Durability",
        "baseDurability": 164,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Sharpened Stone Shiv",
        "tags": [
            "Weapon",
            "Dagger"
        ],
        "origin": "Craftable",
        "levelGap": "1-20",
        "lifecycleModel": "Durability",
        "baseDurability": 84,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Bone Spear",
        "tags": [
            "Weapon",
            "Spear"
        ],
        "origin": "Craftable",
        "levelGap": "11-30",
        "lifecycleModel": "Durability",
        "baseDurability": 124,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Scrap Metal Machete",
        "tags": [
            "Weapon",
            "Machete"
        ],
        "origin": "Craftable",
        "levelGap": "21-40",
        "lifecycleModel": "Durability",
        "baseDurability": 164,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Rebar Sledge",
        "tags": [
            "Weapon",
            "Club"
        ],
        "origin": "Craftable",
        "levelGap": "21-40",
        "lifecycleModel": "Durability",
        "baseDurability": 164,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Makeshift Bow",
        "tags": [
            "Weapon",
            "Bow"
        ],
        "origin": "Craftable",
        "levelGap": "1-20",
        "lifecycleModel": "Durability",
        "baseDurability": 84,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Salvaged Crossbow",
        "tags": [
            "Weapon",
            "Crossbow"
        ],
        "origin": "Craftable",
        "levelGap": "11-30",
        "lifecycleModel": "Durability",
        "baseDurability": 124,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Reinforced Compound Bow",
        "tags": [
            "Weapon",
            "Bow"
        ],
        "origin": "Craftable",
        "levelGap": "21-40",
        "lifecycleModel": "Durability",
        "baseDurability": 164,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Reinforced Tactical Crossbow",
        "tags": [
            "Weapon",
            "Crossbow"
        ],
        "origin": "Craftable",
        "levelGap": "31-40+",
        "lifecycleModel": "Durability",
        "baseDurability": 204,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Zip Gun",
        "tags": [
            "Weapon",
            "Handgun"
        ],
        "origin": "Craftable",
        "levelGap": "1-20",
        "lifecycleModel": "Durability",
        "baseDurability": 84,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Pipe Shotgun",
        "tags": [
            "Weapon",
            "Shotgun"
        ],
        "origin": "Craftable",
        "levelGap": "1-20",
        "lifecycleModel": "Durability",
        "baseDurability": 84,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Police Sidearm",
        "tags": [
            "Weapon",
            "Handgun"
        ],
        "origin": "Loot-only",
        "levelGap": "11-30",
        "lifecycleModel": "Durability",
        "baseDurability": 124,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Sawed-off Shotgun",
        "tags": [
            "Weapon",
            "Shotgun"
        ],
        "origin": "Loot-only",
        "levelGap": "11-30",
        "lifecycleModel": "Durability",
        "baseDurability": 124,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Bolt-Action Hunting Rifle",
        "tags": [
            "Weapon",
            "Rifle"
        ],
        "origin": "Loot-only",
        "levelGap": "11-30",
        "lifecycleModel": "Durability",
        "baseDurability": 124,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Submachine Gun",
        "tags": [
            "Weapon",
            "SMG"
        ],
        "origin": "Loot-only",
        "levelGap": "21-40",
        "lifecycleModel": "Durability",
        "baseDurability": 164,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Marksman Rifle",
        "tags": [
            "Weapon",
            "Rifle"
        ],
        "origin": "Loot-only",
        "levelGap": "21-40",
        "lifecycleModel": "Durability",
        "baseDurability": 164,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Assault Rifle",
        "tags": [
            "Weapon",
            "Rifle"
        ],
        "origin": "Loot-only",
        "levelGap": "21-40",
        "lifecycleModel": "Durability",
        "baseDurability": 164,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Sharpened Wooden Arrow",
        "tags": [
            "Ammo",
            "Arrow"
        ],
        "origin": "Craftable",
        "levelGap": "1-20",
        "lifecycleModel": "Durability",
        "baseDurability": 1,
        "lifecycleNote": "Ammo is consumed on use; durability is represented as a single use."
    },
    {
        "name": "Scrap Metal Arrow",
        "tags": [
            "Ammo",
            "Arrow"
        ],
        "origin": "Craftable",
        "levelGap": "11-30",
        "lifecycleModel": "Durability",
        "baseDurability": 1,
        "lifecycleNote": "Ammo is consumed on use; durability is represented as a single use."
    },
    {
        "name": "Broadhead Hunting Arrow",
        "tags": [
            "Ammo",
            "Arrow"
        ],
        "origin": "Craftable",
        "levelGap": "21-40",
        "lifecycleModel": "Durability",
        "baseDurability": 1,
        "lifecycleNote": "Ammo is consumed on use; durability is represented as a single use."
    },
    {
        "name": "Hand-loaded Pistol Rounds",
        "tags": [
            "Ammo",
            "Handgun"
        ],
        "origin": "Craftable",
        "levelGap": "1-20",
        "lifecycleModel": "Durability",
        "baseDurability": 1,
        "lifecycleNote": "Ammo is consumed on use; durability is represented as a single use."
    },
    {
        "name": "Improvised Shotgun Shells",
        "tags": [
            "Ammo",
            "Shotgun"
        ],
        "origin": "Craftable",
        "levelGap": "1-20",
        "lifecycleModel": "Durability",
        "baseDurability": 1,
        "lifecycleNote": "Ammo is consumed on use; durability is represented as a single use."
    },
    {
        "name": "Factory Pistol Rounds",
        "tags": [
            "Ammo",
            "Handgun"
        ],
        "origin": "Loot-only",
        "levelGap": "11-30",
        "lifecycleModel": "Durability",
        "baseDurability": 1,
        "lifecycleNote": "Ammo is consumed on use; durability is represented as a single use."
    },
    {
        "name": "Factory Shotgun Shells",
        "tags": [
            "Ammo",
            "Shotgun"
        ],
        "origin": "Loot-only",
        "levelGap": "11-30",
        "lifecycleModel": "Durability",
        "baseDurability": 1,
        "lifecycleNote": "Ammo is consumed on use; durability is represented as a single use."
    },
    {
        "name": "Full Metal Jacket Rifle Rounds",
        "tags": [
            "Ammo",
            "Rifle"
        ],
        "origin": "Loot-only",
        "levelGap": "11-40",
        "lifecycleModel": "Durability",
        "baseDurability": 1,
        "lifecycleNote": "Ammo is consumed on use; durability is represented as a single use."
    },
    {
        "name": "SMG Rounds",
        "tags": [
            "Ammo",
            "SMG"
        ],
        "origin": "Loot-only",
        "levelGap": "21-40",
        "lifecycleModel": "Durability",
        "baseDurability": 1,
        "lifecycleNote": "Ammo is consumed on use; durability is represented as a single use."
    },
    {
        "name": "Padded Puffer Vest",
        "tags": [
            "Equipment",
            "Vest"
        ],
        "origin": "Craftable",
        "levelGap": "1-20",
        "lifecycleModel": "Durability",
        "note": "Tier I - Max 20",
        "baseDurability": 84,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Skate Helmet",
        "tags": [
            "Equipment",
            "Head"
        ],
        "origin": "Craftable",
        "levelGap": "1-20",
        "lifecycleModel": "Durability",
        "baseDurability": 84,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Cotton T-Shirt",
        "tags": [
            "Equipment",
            "UpperBody"
        ],
        "origin": "Craftable",
        "levelGap": "1-20",
        "lifecycleModel": "Durability",
        "baseDurability": 84,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Denim Jeans",
        "tags": [
            "Equipment",
            "LowerBody"
        ],
        "origin": "Craftable",
        "levelGap": "1-20",
        "lifecycleModel": "Durability",
        "baseDurability": 84,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Wool Gloves",
        "tags": [
            "Equipment",
            "Hand"
        ],
        "origin": "Craftable",
        "levelGap": "1-20",
        "lifecycleModel": "Durability",
        "baseDurability": 84,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Canvas Shoes",
        "tags": [
            "Equipment",
            "Leg"
        ],
        "origin": "Craftable",
        "levelGap": "1-20",
        "lifecycleModel": "Durability",
        "baseDurability": 84,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Motocross Chest Protector",
        "tags": [
            "Equipment",
            "Vest"
        ],
        "origin": "Craftable",
        "levelGap": "11-30",
        "lifecycleModel": "Durability",
        "note": "Tier II - Max 30",
        "baseDurability": 124,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Motorcycle Helmet",
        "tags": [
            "Equipment",
            "Head"
        ],
        "origin": "Craftable",
        "levelGap": "11-30",
        "lifecycleModel": "Durability",
        "baseDurability": 124,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Heavy Leather Jacket",
        "tags": [
            "Equipment",
            "UpperBody"
        ],
        "origin": "Craftable",
        "levelGap": "11-30",
        "lifecycleModel": "Durability",
        "baseDurability": 124,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Riding Jeans with Knee Pads",
        "tags": [
            "Equipment",
            "LowerBody"
        ],
        "origin": "Craftable",
        "levelGap": "11-30",
        "lifecycleModel": "Durability",
        "baseDurability": 124,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Padded Biker Gloves",
        "tags": [
            "Equipment",
            "Hand"
        ],
        "origin": "Craftable",
        "levelGap": "11-30",
        "lifecycleModel": "Durability",
        "baseDurability": 124,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "High-Top Skate Sneakers",
        "tags": [
            "Equipment",
            "Leg"
        ],
        "origin": "Craftable",
        "levelGap": "11-30",
        "lifecycleModel": "Durability",
        "baseDurability": 124,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Kevlar Vest",
        "tags": [
            "Equipment",
            "Vest"
        ],
        "origin": "Loot-only",
        "levelGap": "21-40",
        "lifecycleModel": "Durability",
        "note": "Tier III- Max 40",
        "baseDurability": 164,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Riot Control Helmet",
        "tags": [
            "Equipment",
            "Head"
        ],
        "origin": "Loot-only",
        "levelGap": "21-40",
        "lifecycleModel": "Durability",
        "baseDurability": 164,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Tactical Quarter-Zip Shirt",
        "tags": [
            "Equipment",
            "UpperBody"
        ],
        "origin": "Loot-only",
        "levelGap": "21-40",
        "lifecycleModel": "Durability",
        "baseDurability": 164,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Shred-Proof Tactical Pants",
        "tags": [
            "Equipment",
            "LowerBody"
        ],
        "origin": "Loot-only",
        "levelGap": "21-40",
        "lifecycleModel": "Durability",
        "baseDurability": 164,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Reinforced Police Gloves",
        "tags": [
            "Equipment",
            "Hand"
        ],
        "origin": "Loot-only",
        "levelGap": "21-40",
        "lifecycleModel": "Durability",
        "baseDurability": 164,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Mountaineering Boots",
        "tags": [
            "Equipment",
            "Leg"
        ],
        "origin": "Loot-only",
        "levelGap": "21-40",
        "lifecycleModel": "Durability",
        "baseDurability": 164,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Tactical Assault Kevlar Vest",
        "tags": [
            "Equipment",
            "Vest"
        ],
        "origin": "Loot-only",
        "levelGap": "31-40+",
        "lifecycleModel": "Durability",
        "note": "Tier IV - Max level 40 (may increase later)",
        "baseDurability": 204,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Ballistic Fast Helmet",
        "tags": [
            "Equipment",
            "Head"
        ],
        "origin": "Loot-only",
        "levelGap": "31-40+",
        "lifecycleModel": "Durability",
        "baseDurability": 204,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Combat Jacket",
        "tags": [
            "Equipment",
            "UpperBody"
        ],
        "origin": "Loot-only",
        "levelGap": "31-40+",
        "lifecycleModel": "Durability",
        "baseDurability": 204,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Crye Precision Trousers",
        "tags": [
            "Equipment",
            "LowerBody"
        ],
        "origin": "Loot-only",
        "levelGap": "31-40+",
        "lifecycleModel": "Durability",
        "baseDurability": 204,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Hard-Knuckle Gloves",
        "tags": [
            "Equipment",
            "Hand"
        ],
        "origin": "Loot-only",
        "levelGap": "31-40+",
        "lifecycleModel": "Durability",
        "baseDurability": 204,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Tactical Assault Boots",
        "tags": [
            "Equipment",
            "Leg"
        ],
        "origin": "Loot-only",
        "levelGap": "31-40+",
        "lifecycleModel": "Durability",
        "baseDurability": 204,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Apron",
        "tags": [
            "Equipment",
            "Vest"
        ],
        "origin": "Craftable",
        "levelGap": "1-20",
        "lifecycleModel": "Durability",
        "note": "Cooking gear",
        "baseDurability": 84,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Chef's Toque",
        "tags": [
            "Equipment",
            "Head"
        ],
        "origin": "Craftable",
        "levelGap": "1-20",
        "lifecycleModel": "Durability",
        "baseDurability": 84,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Chef's Coat",
        "tags": [
            "Equipment",
            "UpperBody"
        ],
        "origin": "Craftable",
        "levelGap": "1-20",
        "lifecycleModel": "Durability",
        "baseDurability": 84,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Chef's Jeans",
        "tags": [
            "Equipment",
            "LowerBody"
        ],
        "origin": "Craftable",
        "levelGap": "1-20",
        "lifecycleModel": "Durability",
        "baseDurability": 84,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Chef's Gloves",
        "tags": [
            "Equipment",
            "Hand"
        ],
        "origin": "Craftable",
        "levelGap": "1-20",
        "lifecycleModel": "Durability",
        "baseDurability": 84,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Kitchen Sneakers",
        "tags": [
            "Equipment",
            "Leg"
        ],
        "origin": "Craftable",
        "levelGap": "1-20",
        "lifecycleModel": "Durability",
        "baseDurability": 84,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Heat-Resistant Apron",
        "tags": [
            "Equipment",
            "Vest"
        ],
        "origin": "Craftable",
        "levelGap": "11-30",
        "lifecycleModel": "Durability",
        "baseDurability": 124,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Insulated Chef's Cap",
        "tags": [
            "Equipment",
            "Head"
        ],
        "origin": "Craftable",
        "levelGap": "11-30",
        "lifecycleModel": "Durability",
        "baseDurability": 124,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Fire-Retardant Chef's Coat",
        "tags": [
            "Equipment",
            "UpperBody"
        ],
        "origin": "Craftable",
        "levelGap": "11-30",
        "lifecycleModel": "Durability",
        "baseDurability": 124,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Grease-Proof Chef's Trousers",
        "tags": [
            "Equipment",
            "LowerBody"
        ],
        "origin": "Craftable",
        "levelGap": "11-30",
        "lifecycleModel": "Durability",
        "baseDurability": 124,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Heat-Resistant Cooking Gloves",
        "tags": [
            "Equipment",
            "Hand"
        ],
        "origin": "Craftable",
        "levelGap": "11-30",
        "lifecycleModel": "Durability",
        "baseDurability": 124,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Non-Slip Kitchen Boots",
        "tags": [
            "Equipment",
            "Leg"
        ],
        "origin": "Craftable",
        "levelGap": "11-30",
        "lifecycleModel": "Durability",
        "baseDurability": 124,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Hi-Vis Construction Vest",
        "tags": [
            "Equipment",
            "Vest"
        ],
        "origin": "Craftable",
        "levelGap": "1-20",
        "lifecycleModel": "Durability",
        "note": "Building gear",
        "baseDurability": 84,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Impact Construction Helmet",
        "tags": [
            "Equipment",
            "Head"
        ],
        "origin": "Craftable",
        "levelGap": "1-20",
        "lifecycleModel": "Durability",
        "baseDurability": 84,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Heavy Flannel Construction Shirt",
        "tags": [
            "Equipment",
            "UpperBody"
        ],
        "origin": "Craftable",
        "levelGap": "1-20",
        "lifecycleModel": "Durability",
        "baseDurability": 84,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Double-Knee Work Pants",
        "tags": [
            "Equipment",
            "LowerBody"
        ],
        "origin": "Craftable",
        "levelGap": "1-20",
        "lifecycleModel": "Durability",
        "baseDurability": 84,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Impact-Resistant Protective Gloves",
        "tags": [
            "Equipment",
            "Hand"
        ],
        "origin": "Craftable",
        "levelGap": "1-20",
        "lifecycleModel": "Durability",
        "baseDurability": 84,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Steel-Toe Safety Shoes",
        "tags": [
            "Equipment",
            "Leg"
        ],
        "origin": "Craftable",
        "levelGap": "1-20",
        "lifecycleModel": "Durability",
        "baseDurability": 84,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Reinforced Hi-Vis Vest",
        "tags": [
            "Equipment",
            "Vest"
        ],
        "origin": "Craftable",
        "levelGap": "11-30",
        "lifecycleModel": "Durability",
        "baseDurability": 124,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Full-Face Construction Helmet",
        "tags": [
            "Equipment",
            "Head"
        ],
        "origin": "Craftable",
        "levelGap": "11-30",
        "lifecycleModel": "Durability",
        "baseDurability": 124,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Kevlar-Lined Work Shirt",
        "tags": [
            "Equipment",
            "UpperBody"
        ],
        "origin": "Craftable",
        "levelGap": "11-30",
        "lifecycleModel": "Durability",
        "baseDurability": 124,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Reinforced Work Overalls",
        "tags": [
            "Equipment",
            "LowerBody"
        ],
        "origin": "Craftable",
        "levelGap": "11-30",
        "lifecycleModel": "Durability",
        "baseDurability": 124,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Anti-Vibration Work Gloves",
        "tags": [
            "Equipment",
            "Hand"
        ],
        "origin": "Craftable",
        "levelGap": "11-30",
        "lifecycleModel": "Durability",
        "baseDurability": 124,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Steel-Plated Work Boots",
        "tags": [
            "Equipment",
            "Leg"
        ],
        "origin": "Craftable",
        "levelGap": "11-30",
        "lifecycleModel": "Durability",
        "baseDurability": 124,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Gatherer's Utility Vest",
        "tags": [
            "Equipment",
            "Vest"
        ],
        "origin": "Craftable",
        "levelGap": "1-20",
        "lifecycleModel": "Durability",
        "note": "Gathering gears",
        "baseDurability": 84,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Prospector's Hardhat",
        "tags": [
            "Equipment",
            "Head"
        ],
        "origin": "Craftable",
        "levelGap": "1-20",
        "lifecycleModel": "Durability",
        "baseDurability": 84,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Reinforced Canvas Jacket",
        "tags": [
            "Equipment",
            "UpperBody"
        ],
        "origin": "Craftable",
        "levelGap": "1-20",
        "lifecycleModel": "Durability",
        "baseDurability": 84,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Heavy-Duty Cargo Pants",
        "tags": [
            "Equipment",
            "LowerBody"
        ],
        "origin": "Craftable",
        "levelGap": "1-20",
        "lifecycleModel": "Durability",
        "baseDurability": 84,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Grip-Enhancing Work Gloves",
        "tags": [
            "Equipment",
            "Hand"
        ],
        "origin": "Craftable",
        "levelGap": "1-20",
        "lifecycleModel": "Durability",
        "baseDurability": 84,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Steel-Toe Foraging Boots",
        "tags": [
            "Equipment",
            "Leg"
        ],
        "origin": "Craftable",
        "levelGap": "1-20",
        "lifecycleModel": "Durability",
        "baseDurability": 84,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Expedition Utility Vest",
        "tags": [
            "Equipment",
            "Vest"
        ],
        "origin": "Craftable",
        "levelGap": "11-30",
        "lifecycleModel": "Durability",
        "baseDurability": 124,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Reinforced Prospector's Helmet",
        "tags": [
            "Equipment",
            "Head"
        ],
        "origin": "Craftable",
        "levelGap": "11-30",
        "lifecycleModel": "Durability",
        "baseDurability": 124,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "All-Weather Field Jacket",
        "tags": [
            "Equipment",
            "UpperBody"
        ],
        "origin": "Craftable",
        "levelGap": "11-30",
        "lifecycleModel": "Durability",
        "baseDurability": 124,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Rugged Trail Trousers",
        "tags": [
            "Equipment",
            "LowerBody"
        ],
        "origin": "Craftable",
        "levelGap": "11-30",
        "lifecycleModel": "Durability",
        "baseDurability": 124,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Thornproof Foraging Gloves",
        "tags": [
            "Equipment",
            "Hand"
        ],
        "origin": "Craftable",
        "levelGap": "11-30",
        "lifecycleModel": "Durability",
        "baseDurability": 124,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Trailblazer Hiking Boots",
        "tags": [
            "Equipment",
            "Leg"
        ],
        "origin": "Craftable",
        "levelGap": "11-30",
        "lifecycleModel": "Durability",
        "baseDurability": 124,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Welder's Leather Apron",
        "tags": [
            "Equipment",
            "Vest"
        ],
        "origin": "Craftable",
        "levelGap": "1-20",
        "lifecycleModel": "Durability",
        "note": "Crafting gears",
        "baseDurability": 84,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Flip-Up Welding Mask",
        "tags": [
            "Equipment",
            "Head"
        ],
        "origin": "Craftable",
        "levelGap": "1-20",
        "lifecycleModel": "Durability",
        "baseDurability": 84,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Oil-Stained Coverall Top",
        "tags": [
            "Equipment",
            "UpperBody"
        ],
        "origin": "Craftable",
        "levelGap": "1-20",
        "lifecycleModel": "Durability",
        "baseDurability": 84,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Denim Mechanic Trousers",
        "tags": [
            "Equipment",
            "LowerBody"
        ],
        "origin": "Craftable",
        "levelGap": "1-20",
        "lifecycleModel": "Durability",
        "baseDurability": 84,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Thick Leather Welding Gloves",
        "tags": [
            "Equipment",
            "Hand"
        ],
        "origin": "Craftable",
        "levelGap": "1-20",
        "lifecycleModel": "Durability",
        "baseDurability": 84,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Oil-Resistant Work Boots",
        "tags": [
            "Equipment",
            "Leg"
        ],
        "origin": "Craftable",
        "levelGap": "1-20",
        "lifecycleModel": "Durability",
        "baseDurability": 84,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Heavy-Duty Welding Apron",
        "tags": [
            "Equipment",
            "Vest"
        ],
        "origin": "Craftable",
        "levelGap": "11-30",
        "lifecycleModel": "Durability",
        "baseDurability": 124,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Full-Face Welding Helmet",
        "tags": [
            "Equipment",
            "Head"
        ],
        "origin": "Craftable",
        "levelGap": "11-30",
        "lifecycleModel": "Durability",
        "baseDurability": 124,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Flame-Resistant Coveralls",
        "tags": [
            "Equipment",
            "UpperBody"
        ],
        "origin": "Craftable",
        "levelGap": "11-30",
        "lifecycleModel": "Durability",
        "baseDurability": 124,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Reinforced Mechanic Trousers",
        "tags": [
            "Equipment",
            "LowerBody"
        ],
        "origin": "Craftable",
        "levelGap": "11-30",
        "lifecycleModel": "Durability",
        "baseDurability": 124,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Insulated Welding Gauntlets",
        "tags": [
            "Equipment",
            "Hand"
        ],
        "origin": "Craftable",
        "levelGap": "11-30",
        "lifecycleModel": "Durability",
        "baseDurability": 124,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Steel-Toe Mechanic Boots",
        "tags": [
            "Equipment",
            "Leg"
        ],
        "origin": "Craftable",
        "levelGap": "11-30",
        "lifecycleModel": "Durability",
        "baseDurability": 124,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Tactical Scavenger Harness",
        "tags": [
            "Equipment",
            "Vest"
        ],
        "origin": "Craftable",
        "levelGap": "1-20",
        "lifecycleModel": "Durability",
        "note": "Scavenging gears",
        "baseDurability": 84,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Scavenger's Respirator Mask",
        "tags": [
            "Equipment",
            "Head"
        ],
        "origin": "Craftable",
        "levelGap": "1-20",
        "lifecycleModel": "Durability",
        "baseDurability": 84,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Bite-Proof Padded Hoodie",
        "tags": [
            "Equipment",
            "UpperBody"
        ],
        "origin": "Craftable",
        "levelGap": "1-20",
        "lifecycleModel": "Durability",
        "baseDurability": 84,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Flexible Athletic Joggers",
        "tags": [
            "Equipment",
            "LowerBody"
        ],
        "origin": "Craftable",
        "levelGap": "1-20",
        "lifecycleModel": "Durability",
        "baseDurability": 84,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Fingerless Combat Gloves",
        "tags": [
            "Equipment",
            "Hand"
        ],
        "origin": "Craftable",
        "levelGap": "1-20",
        "lifecycleModel": "Durability",
        "baseDurability": 84,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Silent Sole Running Shoes",
        "tags": [
            "Equipment",
            "Leg"
        ],
        "origin": "Craftable",
        "levelGap": "1-20",
        "lifecycleModel": "Durability",
        "baseDurability": 84,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Reinforced Scavenger Rig",
        "tags": [
            "Equipment",
            "Vest"
        ],
        "origin": "Craftable",
        "levelGap": "11-30",
        "lifecycleModel": "Durability",
        "baseDurability": 124,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Full-Seal Respirator Mask",
        "tags": [
            "Equipment",
            "Head"
        ],
        "origin": "Craftable",
        "levelGap": "11-30",
        "lifecycleModel": "Durability",
        "baseDurability": 124,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Puncture-Resistant Field Jacket",
        "tags": [
            "Equipment",
            "UpperBody"
        ],
        "origin": "Craftable",
        "levelGap": "11-30",
        "lifecycleModel": "Durability",
        "baseDurability": 124,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Reinforced Cargo Joggers",
        "tags": [
            "Equipment",
            "LowerBody"
        ],
        "origin": "Craftable",
        "levelGap": "11-30",
        "lifecycleModel": "Durability",
        "baseDurability": 124,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Grip-Lined Tactical Gloves",
        "tags": [
            "Equipment",
            "Hand"
        ],
        "origin": "Craftable",
        "levelGap": "11-30",
        "lifecycleModel": "Durability",
        "baseDurability": 124,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Silent Urban Trekking Boots",
        "tags": [
            "Equipment",
            "Leg"
        ],
        "origin": "Craftable",
        "levelGap": "11-30",
        "lifecycleModel": "Durability",
        "baseDurability": 124,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Rusted Wedding Ring",
        "tags": [
            "Equipment",
            "Jewelry"
        ],
        "origin": "Loot-only",
        "levelGap": "1-40",
        "lifecycleModel": "Durability",
        "baseDurability": 84,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Cracked Pocket Watch",
        "tags": [
            "Equipment",
            "Jewelry"
        ],
        "origin": "Loot-only",
        "levelGap": "1-40",
        "lifecycleModel": "Durability",
        "baseDurability": 84,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Tarnished Silver Necklace",
        "tags": [
            "Equipment",
            "Jewelry"
        ],
        "origin": "Loot-only",
        "levelGap": "1-40",
        "lifecycleModel": "Durability",
        "baseDurability": 84,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Salvaged Dog Tags",
        "tags": [
            "Equipment",
            "Jewelry"
        ],
        "origin": "Loot-only",
        "levelGap": "1-40",
        "lifecycleModel": "Durability",
        "baseDurability": 84,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Lucky Rabbit's Foot Charm",
        "tags": [
            "Equipment",
            "Jewelry"
        ],
        "origin": "Loot-only",
        "levelGap": "1-40",
        "lifecycleModel": "Durability",
        "baseDurability": 84,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Corroded Copper Bracelet",
        "tags": [
            "Equipment",
            "Jewelry"
        ],
        "origin": "Loot-only",
        "levelGap": "1-40",
        "lifecycleModel": "Durability",
        "baseDurability": 84,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Duct-Taped Tote Sack",
        "tags": [
            "Equipment",
            "Backpack"
        ],
        "origin": "Craftable",
        "levelGap": "1-20",
        "lifecycleModel": "Durability",
        "baseDurability": 84,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Sewn Feed Sack Pack",
        "tags": [
            "Equipment",
            "Backpack"
        ],
        "origin": "Craftable",
        "levelGap": "1-20",
        "lifecycleModel": "Durability",
        "baseDurability": 84,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "School Backpack",
        "tags": [
            "Equipment",
            "Backpack"
        ],
        "origin": "Craftable",
        "levelGap": "11-30",
        "lifecycleModel": "Durability",
        "baseDurability": 124,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Hiking Daypack",
        "tags": [
            "Equipment",
            "Backpack"
        ],
        "origin": "Craftable",
        "levelGap": "11-30",
        "lifecycleModel": "Durability",
        "baseDurability": 124,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Tactical Messenger Bag",
        "tags": [
            "Equipment",
            "Backpack"
        ],
        "origin": "Craftable",
        "levelGap": "21-40",
        "lifecycleModel": "Durability",
        "baseDurability": 164,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Hunting Rucksack",
        "tags": [
            "Equipment",
            "Backpack"
        ],
        "origin": "Craftable",
        "levelGap": "21-40",
        "lifecycleModel": "Durability",
        "baseDurability": 164,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Military Field Rucksack",
        "tags": [
            "Equipment",
            "Backpack"
        ],
        "origin": "Craftable",
        "levelGap": "31-40+",
        "lifecycleModel": "Durability",
        "baseDurability": 204,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Special Forces Bergen Pack",
        "tags": [
            "Equipment",
            "Backpack"
        ],
        "origin": "Loot-only",
        "levelGap": "31-40+",
        "lifecycleModel": "Durability",
        "baseDurability": 204,
        "lifecycleNote": "Usable gear loses durability through action use, combat, or deployment."
    },
    {
        "name": "Camping Tent",
        "tags": [
            "Building",
            "Tent"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Duration",
        "baseDurationHours": 192,
        "lifecycleNote": "Buildings decay over time and become broken before repair or replacement."
    },
    {
        "name": "Tarp Lean-to Shelter",
        "tags": [
            "Building",
            "Tent"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Duration",
        "baseDurationHours": 192,
        "lifecycleNote": "Buildings decay over time and become broken before repair or replacement."
    },
    {
        "name": "Abandoned Car Shelter",
        "tags": [
            "Building",
            "Tent"
        ],
        "origin": "Loot-only",
        "levelGap": "Free by zone",
        "lifecycleModel": "Duration",
        "baseDurationHours": 192,
        "lifecycleNote": "Buildings decay over time and become broken before repair or replacement."
    },
    {
        "name": "Salvaged Mattress Bed",
        "tags": [
            "Building",
            "Bed"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Duration",
        "baseDurationHours": 192,
        "lifecycleNote": "Buildings decay over time and become broken before repair or replacement."
    },
    {
        "name": "Restored Double Bed",
        "tags": [
            "Building",
            "Bed"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Duration",
        "baseDurationHours": 192,
        "lifecycleNote": "Buildings decay over time and become broken before repair or replacement."
    },
    {
        "name": "Cardboard Box Stack",
        "tags": [
            "Building",
            "Container"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Duration",
        "baseDurationHours": 192,
        "lifecycleNote": "Buildings decay over time and become broken before repair or replacement."
    },
    {
        "name": "Wooden Crate",
        "tags": [
            "Building",
            "Container"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Duration",
        "baseDurationHours": 192,
        "lifecycleNote": "Buildings decay over time and become broken before repair or replacement."
    },
    {
        "name": "Large Wooden Chest",
        "tags": [
            "Building",
            "Container"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Duration",
        "baseDurationHours": 192,
        "lifecycleNote": "Buildings decay over time and become broken before repair or replacement."
    },
    {
        "name": "Plastic Storage Bin",
        "tags": [
            "Building",
            "Container"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Duration",
        "baseDurationHours": 192,
        "lifecycleNote": "Buildings decay over time and become broken before repair or replacement."
    },
    {
        "name": "Steel Locker",
        "tags": [
            "Building",
            "Container"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Duration",
        "baseDurationHours": 192,
        "lifecycleNote": "Buildings decay over time and become broken before repair or replacement."
    },
    {
        "name": "Military Ammo Crate",
        "tags": [
            "Building",
            "Container"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Duration",
        "baseDurationHours": 192,
        "lifecycleNote": "Buildings decay over time and become broken before repair or replacement."
    },
    {
        "name": "Reinforced Shipping Container",
        "tags": [
            "Building",
            "Container"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Duration",
        "baseDurationHours": 192,
        "lifecycleNote": "Buildings decay over time and become broken before repair or replacement."
    },
    {
        "name": "Repurposed Bank Vault",
        "tags": [
            "Building",
            "Container"
        ],
        "origin": "Loot-only",
        "levelGap": "Free by zone",
        "lifecycleModel": "Duration",
        "baseDurationHours": 192,
        "lifecycleNote": "Buildings decay over time and become broken before repair or replacement."
    },
    {
        "name": "Scavenged Furniture Set",
        "tags": [
            "Building",
            "Wood"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Duration",
        "baseDurationHours": 192,
        "lifecycleNote": "Buildings decay over time and become broken before repair or replacement."
    },
    {
        "name": "Restored Furniture Set",
        "tags": [
            "Building",
            "Leather"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Duration",
        "baseDurationHours": 192,
        "lifecycleNote": "Buildings decay over time and become broken before repair or replacement."
    },
    {
        "name": "Campfire",
        "tags": [
            "Building",
            "Campfire",
            "Cooking"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Duration",
        "baseDurationHours": 192,
        "lifecycleNote": "Buildings decay over time and become broken before repair or replacement."
    },
    {
        "name": "Salvaged Wood Stove",
        "tags": [
            "Building",
            "Cooking"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Duration",
        "baseDurationHours": 192,
        "lifecycleNote": "Buildings decay over time and become broken before repair or replacement."
    },
    {
        "name": "Rewired Electric Stove",
        "tags": [
            "Building",
            "Cooking"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Duration",
        "baseDurationHours": 192,
        "lifecycleNote": "Buildings decay over time and become broken before repair or replacement."
    },
    {
        "name": "Improvised Workbench",
        "tags": [
            "Building",
            "Crafting"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Duration",
        "baseDurationHours": 192,
        "lifecycleNote": "Buildings decay over time and become broken before repair or replacement."
    },
    {
        "name": "Reinforced Metal Workstation",
        "tags": [
            "Building",
            "Crafting"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Duration",
        "baseDurationHours": 192,
        "lifecycleNote": "Buildings decay over time and become broken before repair or replacement."
    },
    {
        "name": "High-End Salvage Workstation",
        "tags": [
            "Building",
            "Crafting"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Duration",
        "baseDurationHours": 192,
        "lifecycleNote": "Buildings decay over time and become broken before repair or replacement."
    },
    {
        "name": "Field Medical Station",
        "tags": [
            "Building",
            "Medicine"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Duration",
        "baseDurationHours": 192,
        "lifecycleNote": "Buildings decay over time and become broken before repair or replacement."
    },
    {
        "name": "Restored Medical Lab",
        "tags": [
            "Building",
            "Medicine"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Duration",
        "baseDurationHours": 192,
        "lifecycleNote": "Buildings decay over time and become broken before repair or replacement."
    },
    {
        "name": "Makeshift Furnace",
        "tags": [
            "Building",
            "Smelting"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Duration",
        "baseDurationHours": 192,
        "lifecycleNote": "Buildings decay over time and become broken before repair or replacement."
    },
    {
        "name": "Industrial Blast Furnace",
        "tags": [
            "Building",
            "Smelting"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Duration",
        "baseDurationHours": 192,
        "lifecycleNote": "Buildings decay over time and become broken before repair or replacement."
    },
    {
        "name": "Wooden Structure",
        "tags": [
            "Building",
            "Wooden Structure"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Duration",
        "baseDurationHours": 192,
        "lifecycleNote": "Buildings decay over time and become broken before repair or replacement."
    },
    {
        "name": "Stone Structure",
        "tags": [
            "Building",
            "Stone Structure"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Duration",
        "baseDurationHours": 192,
        "lifecycleNote": "Buildings decay over time and become broken before repair or replacement."
    },
    {
        "name": "Wooden Fence",
        "tags": [
            "Building",
            "Wooden Fence"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Duration",
        "baseDurationHours": 192,
        "lifecycleNote": "Buildings decay over time and become broken before repair or replacement."
    },
    {
        "name": "Stone Fence",
        "tags": [
            "Building",
            "Stone Fence"
        ],
        "origin": "Craftable",
        "levelGap": "Free by zone",
        "lifecycleModel": "Duration",
        "baseDurationHours": 192,
        "lifecycleNote": "Buildings decay over time and become broken before repair or replacement."
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
    const primaryTag = tags[0]?.toUpperCase();
    if (SUPPORTED_CATEGORIES.includes(primaryTag)) return primaryTag;
    return 'MATERIAL';
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

async function seedItemTemplatesAndRecipes() {
    console.log('[INFO] Dang kiem tra du lieu he thong vat pham...');

    try {
        const checkTemplates = await dbPool.query('SELECT COUNT(*) FROM item_templates;');
        const templateCount = parseInt(checkTemplates.rows[0].count);

        if (templateCount > 0) {
            console.log(`[INFO] Bang item_templates da co san ${templateCount} ban ghi. Bo qua seeding vat pham.`);
            return true;
        }

        const insertQuery = `
            INSERT INTO item_templates
                (code, display_name, category, tags, description, note, origin, item_level,
                 lifecycle_model, base_durability, base_duration_hours, lifecycle_note,
                 drop_weight_common, drop_weight_uncommon, drop_weight_rare, drop_weight_epic,
                 drop_weight_legendary, is_stackable, max_stack)
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19);
        `;

        for (const template of ITEM_TEMPLATES) {
            const category = getCategory(template.tags);
            const isStackable = !STACKABLE_EXCLUDED_CATEGORIES.includes(category);

            await dbPool.query(insertQuery, [
                createItemCode(template.name),
                template.name,
                category,
                template.tags,
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
            ]);
        }

        console.log(`[SUCCESS] Da nap ${ITEM_TEMPLATES.length} item templates theo Data Design.`);
        console.log('[INFO] Chua nap recipes vi he thong che tao chua duoc kich hoat.');
        return true;
    } catch (error) {
        console.error('[ERROR] That bai khi nap du lieu seed vat pham:', error.message);
        return false;
    }
}

module.exports = {
    seedItemTemplatesAndRecipes,
    ITEM_TEMPLATES,
};
