// backend/src/services/services.itemAlphaSimplification.js

const NAME_SIMPLIFICATION_MAP = {
    'Dandelion Seed': 'Vegetable Seed',
    'Wild Lettuce Seed': 'Vegetable Seed',
    'Feral Tomato Seed': 'Vegetable Seed',
    'Pumpkin Seed': 'Vegetable Seed',
    'Bramble Berry Seed': 'Fruit Seed',
    'Wild Wheat Seed': 'Grain Seed',
    'Wild Oat Seed': 'Grain Seed',
    'Feral Corn Seed': 'Grain Seed',
    'Dandelion Greens': 'Vegetable',
    'Wild Lettuce': 'Vegetable',
    'Feral Tomato': 'Vegetable',
    'Cellar Mushroom': 'Vegetable',
    'Overgrown Pumpkin': 'Vegetable',
    'Wild Apple': 'Fruit',
    'Park Cherry': 'Fruit',
    'Overgrown Grape': 'Fruit',
    'Bramble Berry': 'Fruit',
    'Alley Fig': 'Fruit',
    'Wild Wheat': 'Grain',
    'Wild Oat': 'Grain',
    'Feral Corn': 'Grain',
    'Wild Wheat Flour': 'Grain Flour',
    'Wild Oat Flour': 'Grain Flour',
    'Feral Corn Flour': 'Grain Flour',
    'Pumpkin Seed Oil': 'Seed Oil',
    'Feral Corn Oil': 'Seed Oil',
};

const TAG_QUERY_REPLACEMENTS = [
    { pattern: /\bDandelion Greens\b|\bWild Lettuce\b|\bFeral Tomato\b|\bCellar Mushroom\b|\bOvergrown Pumpkin\b/gi, value: 'Vegetable' },
    { pattern: /\bWild Apple\b|\bPark Cherry\b|\bOvergrown Grape\b|\bBramble Berry\b|\bAlley Fig\b/gi, value: 'Fruit' },
    { pattern: /\bWild Wheat\b|\bWild Oat\b|\bFeral Corn\b/gi, value: 'Grain' },
    { pattern: /\bDandelion Seed\b|\bWild Lettuce Seed\b|\bFeral Tomato Seed\b|\bPumpkin Seed\b/gi, value: 'Vegetable Seed' },
    { pattern: /\bBramble Berry Seed\b/gi, value: 'Fruit Seed' },
    { pattern: /\bWild Wheat Seed\b|\bWild Oat Seed\b|\bFeral Corn Seed\b/gi, value: 'Grain Seed' },
    { pattern: /\bSeed or Plantable\b/gi, value: 'Seed' },
];

const VEGETABLE_FOOD_OUTPUTS = new Set([
    'Boiled Pumpkin',
    'Dandelion Green Soup',
    'Cellar Mushroom Soup',
    'Pumpkin Stew',
    'Cellar Mushroom Noodle',
    'Feral Tomato Noodle',
    'Fried Pumpkin',
    'Deep Fried Mushroom',
    'Deep Fried Tomato',
    'Tomato Sandwich',
    'Mushroom Pizza',
    'Tomato Pizza',
    'Canned Tomato',
    'Canned Pumpkin',
]);

const FRUIT_FOOD_OUTPUTS = new Set([
    'Apple Cake',
    'Cherry Cake',
    'Berry Cake',
    'Apple Juice',
    'Grape Juice',
    'Berry Smoothie',
    'Fig Smoothie',
    'Cherry Smoothie',
    'Grape Wine',
    'Apple Wine',
    'Berry Wine',
]);

const MEAT_FOOD_OUTPUTS = new Set([
    'Dried Meat',
    'Smoked Meat',
    'Skewered Meat',
    'Seasoned Skewered Meat',
    'Steak',
    'Seasoned Steak',
    'Boiled Meat',
    'Meat Bone Soup',
    'Meat Stew',
    'Meat Bone Noodle Soup',
    'Fried Meat',
    'Seasoned Fried Meat',
    'Deep Fried Meat',
    'Meat Burger',
    'Meat Sandwich',
    'Meat Pizza',
]);

function getSimplifiedItemName(name) {
    if (NAME_SIMPLIFICATION_MAP[name]) return NAME_SIMPLIFICATION_MAP[name];
    if (VEGETABLE_FOOD_OUTPUTS.has(name)) return 'Cooked Vegetable';
    if (FRUIT_FOOD_OUTPUTS.has(name)) return 'Fruit Dish';
    if (MEAT_FOOD_OUTPUTS.has(name)) return 'Cooked Meat';
    if (name === 'Tomato Juice') return 'Vegetable Juice';
    return name;
}

function getBaseTagsForSimplifiedName(name) {
    const tagMap = {
        'Vegetable Seed': ['MATERIAL', 'MATERIALS', 'Plantable', 'Seed', 'Vegetable'],
        'Fruit Seed': ['MATERIAL', 'MATERIALS', 'Plantable', 'Seed', 'Fruit', 'Tree'],
        'Grain Seed': ['MATERIAL', 'MATERIALS', 'Plantable', 'Seed', 'Grain'],
        Vegetable: ['FOOD', 'CONSUMABLES', 'FoodRaw (Vegetable)', 'FoodRaw', 'Food', 'Raw', 'Vegetable'],
        Fruit: ['FOOD', 'CONSUMABLES', 'FoodRaw (Fruit)', 'FoodRaw', 'Food', 'Raw', 'Fruit', 'Tree'],
        Grain: ['FOOD', 'CONSUMABLES', 'FoodRaw (Grain)', 'FoodRaw', 'Food', 'Raw', 'Grain'],
        'Grain Flour': ['FOOD', 'CONSUMABLES', 'FoodRaw (Flour)', 'FoodRaw', 'Food', 'Raw', 'Processed', 'Grain', 'Flour'],
        'Seed Oil': ['FOOD', 'CONSUMABLES', 'FoodProcessed', 'Food', 'Processed', 'Seed', 'Oil'],
        'Cooked Vegetable': ['FOOD', 'CONSUMABLES', 'FoodProcessed', 'Food', 'Processed', 'Vegetable'],
        'Fruit Dish': ['FOOD', 'CONSUMABLES', 'FoodProcessed', 'Food', 'Processed', 'Fruit'],
        'Cooked Meat': ['FOOD', 'CONSUMABLES', 'FoodProcessed', 'Food', 'Processed', 'Meat'],
        'Vegetable Juice': ['FOOD', 'CONSUMABLES', 'Drink', 'Food', 'Processed', 'Vegetable'],
    };

    return tagMap[name] || null;
}

function mergeTags(currentTags, nextTags) {
    return [...new Set([...(currentTags || []), ...(nextTags || [])])];
}

function simplifyTemplate(template) {
    const name = getSimplifiedItemName(template.name);
    const baseTags = getBaseTagsForSimplifiedName(name);

    return {
        ...template,
        name,
        tags: baseTags || template.tags,
    };
}

function simplifyItemTemplates(templates) {
    const templateMap = new Map();

    for (const template of templates) {
        const simplifiedTemplate = simplifyTemplate(template);
        const currentTemplate = templateMap.get(simplifiedTemplate.name);

        if (!currentTemplate) {
            templateMap.set(simplifiedTemplate.name, simplifiedTemplate);
            continue;
        }

        templateMap.set(simplifiedTemplate.name, {
            ...currentTemplate,
            tags: mergeTags(currentTemplate.tags, simplifiedTemplate.tags),
        });
    }

    return [...templateMap.values()];
}

function simplifyTagQuery(tagQuery) {
    if (!tagQuery) return tagQuery;

    return TAG_QUERY_REPLACEMENTS.reduce(
        (currentQuery, replacement) => currentQuery.replace(replacement.pattern, replacement.value),
        tagQuery
    );
}

function simplifyRecipe(recipe) {
    return {
        ...recipe,
        outputItem: getSimplifiedItemName(recipe.outputItem),
        inputs: recipe.inputs.map(input => ({
            ...input,
            tagQuery: simplifyTagQuery(input.tagQuery),
        })),
    };
}

function simplifyCraftingRecipes(recipes) {
    return recipes.map(recipe => simplifyRecipe(recipe));
}

module.exports = {
    getSimplifiedItemName,
    simplifyCraftingRecipes,
    simplifyItemTemplates,
    simplifyTagQuery,
};
