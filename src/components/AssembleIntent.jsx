import React, { useState } from 'react';

export default function AssembleIntent() {
  const [environment, setEnvironment] = useState('');
  const [intent, setIntent] = useState('');

  const intents = {
    smart_contracts: ['Ethereum', 'ICP', 'Kadena', 'Bitcoin'],
    consensus_protocol: ['Raft', 'Paxos'],
  };

  const handleIntentChange = (e) => {
    // console.log('Intent changed: ' + e.target.value);
    setIntent(e.target.value);
  };

  const handleEnvironmentChange = (e) => {
    // console.log('Environment changed: ' + e.target.value);
    setEnvironment(e.target.value);
  };

  return (
    <div>
      <select value={intent} onChange={handleIntentChange}>
        <option value="">What are you modeling?</option>
        <option value="smart_contracts">smart contract(s)</option>
        <option value="web-app">web app</option>
        <option value="os">kernel or operating system</option>
        <option value="consensus_protocol">consensus protocol</option>
      </select>

      {intent && intents[intent] && (
        <select value={environment} onChange={handleEnvironmentChange}>
          <option value="">What environment is it in?</option>
          {intents[intent].map((environment) => (
            <option key={environment} value={environment}>
              {environment.charAt(0).toUpperCase() + environment.slice(1)}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
