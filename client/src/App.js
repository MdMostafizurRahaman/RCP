import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [method, setMethod] = useState('factorial');
  const [param, setParam] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/rpc', {
        method,
        params: [Number(param)],
      });
      setResult(response.data.result);
    } catch (error) {
      console.error(error);
      setResult('Error occurred');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>RPC Client</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Method:
          <input
            type="text"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            readOnly
          />
        </label>
        <br />
        <label>
          Parameter:
          <input
            type="number"
            value={param}
            onChange={(e) => setParam(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Invoke</button>
      </form>
      {result !== null && (
        <div>
          <h3>Result: {result}</h3>
        </div>
      )}
    </div>
  );
}

export default App;
