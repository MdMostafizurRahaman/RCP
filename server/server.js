const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 4000;

app.use(bodyParser.json());
app.use(cors());

// Define the server-side methods
const methods = {
  factorial: (n) => {
    if (n < 0) return 'Invalid input';
    let result = 1;
    for (let i = 1; i <= n; i++) {
      result *= i;
    }
    return result;
  },
};

// RPC endpoint
app.post('/rpc', (req, res) => {
  const { method, params } = req.body;

  if (methods[method]) {
    const result = methods[method](...params);
    res.json({ result });
  } else {
    res.status(400).json({ error: 'Method not found' });
  }
});

app.listen(PORT, () => {
  console.log(`RPC Server running on http://localhost:${PORT}`);
});
