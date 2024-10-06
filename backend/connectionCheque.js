const client = require('./utils/clientOpensearch');

async function checkConnection() {
  try {
    const response = await client.cluster.health();
    console.log('OpenSearch connection status:', response.body);
  } catch (error) {
    console.error('Error connecting to OpenSearch:', error);
  }
}

checkConnection();
