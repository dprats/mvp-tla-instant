const problems = [
    {
      id: 1,
      name: 'Dining Philosophers Problem',
      href: '/dining-philosophers',
      description: 'Perfect for checking concurrency issues (e.g. deadlocks and others) in systems where many threads or processes vie for a shared resource.',
      color: '#3B82F6',
      imageSrc: 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Socrate_du_Louvre.jpg',
    },
    {
      id: 2,
      name: 'Producer-Consumer Problem',
      href: '/producer-consumers',
      description: 'Synchronizing to prevent consumers from empty buffers and producers from overfilling, avoiding data loss or overflows.',
      color: '#D077E5',
      imageSrc: 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Aristotle_Altemps_Inv8575.jpg',
    },
    {
        id: 3,
        name: 'Readers-Writers Problem',
        href: '/reader-writers',
        description: 'A shared resource can be accessed by multiple readers or a single writer, but not simultaneously. The challenge is ensuring both read and write access without conflict.',
        color: '#FF77B8',
        imageSrc: 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Aristotle_Altemps_Inv8575.jpg',
      },
      {
        id:4,
        name: 'Sleeping Barber Problem',
        href: '/producer-consumers',
        description: 'Thread pooling where threads (barbers) are asleep when not in use. Incoming tasks (customers) wake up a thread or wait if all threads are busy.',
        color: '#FF9685',
        imageSrc: 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Aristotle_Altemps_Inv8575.jpg',
      },
      {
        id: 5,
        name: 'Bridge Crossing Problem',
        href: '/producer-consumers',
        description: 'A narrow bridge can be crossed by one entity at a time, either from the left or right. Entities coming from opposite directions must coordinate to prevent a collision.',
        color: '#FFC864',
        imageSrc: 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Aristotle_Altemps_Inv8575.jpg',
      },
    //   {
    //     id: 6,
    //     name: 'Producer-Consumer Problem',
    //     href: '/producer-consumers',
    //     description: 'Synchronizing to prevent consumers from empty buffers and producers from overfilling, avoiding data loss or overflows.',
    //     color: '#FFC864',
    //     imageSrc: 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Aristotle_Altemps_Inv8575.jpg',
    //   },
    //   {
    //     id: 7,
    //     name: 'Producer-Consumer Problem',
    //     href: '/producer-consumers',
    //     description: 'Synchronizing to prevent consumers from empty buffers and producers from overfilling, avoiding data loss or overflows.',
    //     color: '#F9F871',
    //     imageSrc: 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Aristotle_Altemps_Inv8575.jpg',
    //   },
  ]
  
  export default function ProblemList() {
    return (
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Common designs patterns and problems</h1>
          <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
          {problems.map((problem) => (
            <div key={problem.id}>
                <div className="max-w-sm rounded overflow-hidden shadow-lg">
                <a href="/dining-philosophers">
                    <div style={{backgroundColor: problem.color, width: '100%', height: '16rem'}}></div>
                </a>
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{problem.name}</div>
                    <p className="text-gray-700 text-base">
                    {problem.description}
                    </p>
                </div>
                </div>
            </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
  
  