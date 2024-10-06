const fs = require('fs');
const path = require('path');
const client = require('./utils/clientOpensearch');

const datasetPath = path.join(__dirname, 'full_format_recipes.json');
const BATCH_SIZE = 100; // Adjust this value as needed

async function indexRecipes() {
  try {
    console.log('Reading dataset...');
    const data = fs.readFileSync(datasetPath, 'utf-8');
    const recipes = JSON.parse(data);
    // const minRecipes = recipes.slice(0,10);
    let bulkOperations = [];

    console.log(`Preparing to index ${recipes.length} recipes...`);

    for (let i = 0; i < recipes.length; i++) {
      bulkOperations.push({ index: { _index: 'epirecipes' } });
      bulkOperations.push(recipes[i]);

      // If we've reached the batch size, send the bulk request
      if ((i + 1) % BATCH_SIZE === 0 || recipes.length - 1) {
        const { body: bulkResponse } = await client.bulk({ body: bulkOperations });
        if (bulkResponse.errors) {
          console.error('Errors occurred during bulk indexing:', bulkResponse.errors);
        } else {
          console.log(`Indexed ${bulkOperations.length / 2} recipes successfully!`);
        }
        bulkOperations = []; // Reset operations for the next batch
      }
    }

    console.log('Indexing completed!');
  } catch (error) {
    console.error('Error indexing recipes:', error);
  }
}

indexRecipes();
