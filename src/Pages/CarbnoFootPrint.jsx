// src/CarbonFootprintCalculator.js

import React, { useState } from 'react';
import axios from 'axios';

const CarbonFootprintCalculator = () => {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleCalculate = async () => {
    const apiKey = '3MR2Y1AYTD12DBWWP13SP25SHW'; // Replace with your actual API key
    const activityId = 'apparel_clothing_material_cotton'; // Example activity ID
    const mass = 1; // Mass in kg

    try {
      const response = await axios.post(
        'https://beta3.api.climatiq.io/estimate',
        {
          activity_id: activityId,
          parameters: {
            mass: mass,
            mass_unit: 'kg',
          },
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setResult(response.data); // Set the response data
      setError(null); // Clear any previous errors
    } catch (err) {
      setError(err.message); // Set the error message
      setResult(null); // Clear any previous results
    }
  };

  return (
    <div>
      <h1>Calculate Carbon Footprint</h1>
      <button onClick={handleCalculate}>Calculate</button>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {result && (
        <div>
          <h2>Result:</h2>
          <pre>{JSON.stringify(result, null, 2)}</pre>
          {/* You can also format this to display specific information, for example: */}
          <p>
            Carbon Footprint: {result?.carbon_footprint?.value} {result?.carbon_footprint?.unit}
          </p>
        </div>
      )}
    </div>
  );
};

export default CarbonFootprintCalculator;
