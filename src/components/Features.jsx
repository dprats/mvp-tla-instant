const features = [
    {
      name: 'Focus on your design intent, not syntax',
      description:
        'Getting started with a TLA+ spec can be tricky. You do not have to be a TLA+ expert to start designing. For example, you can use prose or sequence diagrams to describe your system. Make sure all is as you want.',
      imageSrc: '/images/llm3.png',
      // imageAlt: 'White canvas laptop sleeve with gray felt interior, silver zipper, and tan leather zipper pull.',
    },
    {
      name: 'TLA+ with a team-first mentality',
      description:
        'Once you have a TLA specification, how do you and your team know it does what you think it does? We give you tools to validate: state machine diagrams, sequence diagrams, and more to explore a TLA+ spec without your team needing to be TLA+ experts.',
      imageSrc: '/images/sequence3.png',
      // imageAlt: 'Detail of zipper pull with tan leather and silver rivet.',
    },
  ]
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  
  export default function Example() {
    return (
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Focus on your design</h2>
            <p className="mt-4 text-gray-500">
              Our goal is simple: empower people to leverage TLA+ to make sure their design is rock solid.
            </p>
          </div>
  
          <div className="mt-16 space-y-16">
            {features.map((feature, featureIdx) => (
              <div
                key={feature.name}
                className="flex flex-col-reverse lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-8"
              >
                <div
                  className={classNames(
                    featureIdx % 2 === 0 ? 'lg:col-start-1' : 'lg:col-start-8 xl:col-start-9',
                    'mt-6 lg:col-span-5 lg:row-start-1 lg:mt-0 xl:col-span-4'
                    )}
                >
                  <h3 className="text-lg font-medium text-gray-900">{feature.name}</h3>
                  <p className="mt-2 text-sm text-gray-500">{feature.description}</p>
                </div>
                <div
                  className={classNames(
                    featureIdx % 2 === 0 ? 'lg:col-start-6 xl:col-start-5' : 'lg:col-start-1',
                    'flex-auto lg:col-span-7 lg:row-start-1 xl:col-span-8'
                    )}
                >
                  <div className="overflow-hidden rounded-lg bg-gray-100">
                    <img src={feature.imageSrc} alt={feature.imageAlt} className="object-cover object-center" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
  