const { Client } = require("@opensearch-project/opensearch");
require("dotenv").config();

const client = new Client({
  node: process.env.OPENSEARCH_NODE,
  requestTimeout: 300 * 1000, // Set timeout to 120 seconds (120000 ms)
});

module.exports = client;
