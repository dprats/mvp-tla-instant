import { CheckCircleIcon,XCircleIcon } from '@heroicons/react/24/outline'

export default function SpecProperties() {
  const properties = [
    { name: 'No Negative Balances', status: 'check' },
    { name: 'NoNegativeTransfers', status: 'check' },
    { name: 'NoOverspending', status: 'cross' },
    { name: 'ConstantTotalTokens', status: 'cross' },
    { name: 'RecipientSeesTokens', status: 'cross' },
    { name: 'NoOverspending', status: 'cross' },
  ];

  const nextSteps = [
    { name: 'LockUpFunds', status: 'check' },
    { name: 'ObserveLockup', status: 'check' },
    { name: 'ObserveNewBalance', status: 'cross' },
    { name: 'MirrorFunds', status: 'cross' },
    { name: 'ObserveWithdrawals', status: 'cross' },
    { name: 'SubmitRollup', status: 'cross' },
    { name: 'ObserveUnlockedFunds', status: 'cross' },
  ];


  const behaviors = [
    { name: 'Deadlock', status: 'check' },
  ];

  return (
    <div className="flex flex-col space-y-2 border-2 border-gray-300 p-4 rounded-md">
      <strong>Agents of the system and their states (hard coded)</strong>
      {properties.map((property, index) => (
        <div key={index} className="flex items-center space-x-2">
          {property.status === 'check' ? (
            <CheckCircleIcon className="h-5 w-5 text-green-500" />
          ) : (
            <XCircleIcon className="h-5 w-5 text-red-500" />
          )}
          <span>{property.name}</span>
        </div>
      ))}
      <br />
      <strong>Possible next steps of the system reached in all cases (hard coded)</strong>
      {nextSteps.map((step, index) => (
        <div key={index} className="flex items-center space-x-2">
          {step.status === 'check' ? (
            <CheckCircleIcon className="h-5 w-5 text-green-500" />
          ) : (
            <XCircleIcon className="h-5 w-5 text-red-500" />
          )}
          <span>{step.name}</span>
        </div>
      ))}
    </div>
  );
}
