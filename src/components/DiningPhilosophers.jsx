import { CheckCircleIcon, InformationCircleIcon } from '@heroicons/react/20/solid'

const examples = [
    {   
        id: 1,
        name: 'Database Locks', 
        description:`A database system where multiple transactions 
        want to access different data items. Just like philosophers want to pick up forks simultaneously, transactions may want to lock 
        multiple data items for read/write operations.`,
        url: '/database-locks-template'
    },
    {   
      id: 2,

        name: 'Multithreaded File Operations', 
        url: '/multithreaded-file-operations-template',
        description:`Scenario where multiple threads want to read and write to shared files. The files are the shared resources (similar to forks).`
    },
    {   
      id: 3,

      name: 'Resource Allocation in Operating Systems<', 
        url: '/resource-allocation-in-operating-systems-template',
        description:`Processes in an operating 
    system often require multiple resources to execute. These resources can be memory, I/O devices, CPU, etc. `
    },
    {   
      id: 4,

      name: 'Web servers', 
        url: '/web-servers-template',
        description:`Imagine a cloud infrastructure where multiple web servers 
    (akin to philosophers) handle incoming web requests. Each web server occasionally needs access to two shared databases 
    (akin to left and right forks) to fully process a request.`
    },
];

export default function DiningPhilosophers() {
  return (
    <div className="bg-white px-6 py-32 lg:px-8">
      <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
        <p className="text-base font-semibold leading-7 text-indigo-600">Problem #1</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Dining Philosophers</h1>
        <p className="mt-6 text-xl leading-8">
        You can use and tweak the existing TLA+ specifications, to check if your system is free of concurrency issues derived from  multiple threads/servers/processes (philosophers) needing exclusive access to multiple resources (forks) to execute a task (eat)
        </p>
        <ul className="mt-6">
            <li>1. Does my system have any unforeseen deadlocks?</li>
            <li>2. Is it possible for any parts of my system to be starved or ignored forever?</li>
        </ul>
        <div className="mt-10 max-w-2xl">

        <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">High-Level description</h2>
          <p>
          Multiple philosophers are sitting at a round table, each with a fork between them and their neighbor. 
          Philosophers think and occasionally stop to eat. To eat, a philosopher needs both forks. 
          The challenge is to ensure all philosophers get a chance to eat without deadlock.
          </p>
          <a href="/dining-philosophers-basic" className="text-blue-500 hover:underline">Explore how you can use this</a>

          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">Concrete Examples</h2>
          <ul role="list" className="mt-8 max-w-xl space-y-8 text-gray-600">
            {examples.map((example, index) => (
                    <li key={index} className="flex gap-x-3">
                        <CheckCircleIcon className="mt-1 h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                        <span>
                            <strong className="font-semibold text-gray-900">{example.name}</strong> {example.description}
                            <a href={example.url} className="text-blue-500 hover:underline"> Explore how you can use this</a>
                        </span>
                    </li>        
                ))}
            </ul>

          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">Get started</h2>
          <ol className="mt-6">
            <li>1. Find the example closest to your problem.</li>
            <li>2. Play around with the default spec and common design conventions.</li>
            <li>3. Tweak the spec to match your design.</li>
        </ol>
        </div>
      </div>
    </div>
  )
}
