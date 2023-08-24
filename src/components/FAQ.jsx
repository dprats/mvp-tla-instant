const faqs = [
    {
      id: 1,
      question: "What is TLA+?",
      answer: (
        <div>
          <p><a href="https://en.wikipedia.org/wiki/TLA%2B" style={{ color: 'blue', textDecoration: 'underline' }}>TLA+</a> is a formal specification language that is used to describe and reason about the behavior of complex systems. It is used by engineers at Amazon, Microsoft, Oracle, and many other companies to build and verify distributed systems and databases.</p>
        </div>
      ),
    },
    {
      id: 2,
      question: "What is it good for?",
      answer: (
        <div>
          <p>TLA+ is best used in finding critical design bugs in a system. Examples include:</p>
          <ul className="list-disc list-inside">
            <li>Verifying the correctness of core components in cloud services to prevent subtle, catastrophic failures</li>
            <li>Validating database/transaction systems: Ensuring properties like atomicity, consistency.</li>
          </ul>
        </div>
      ),
    },
  ]
  
  export default function FAQ() {
    return (
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">Frequently asked questions</h2>
            {/* <p className="mt-6 text-base leading-7 text-gray-600">
              What are we missing? Let us know so we can help you and improve. Reach out to us by{' '}
              <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                jumping on discord or zoom
              </a>{' '}
              and letting us know what you think.
            </p> */}
          </div>
          <div className="mt-20">
            <dl className="space-y-16 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-16 sm:space-y-0 lg:grid-cols-3 lg:gap-x-10">
              {faqs.map((faq) => (
                <div key={faq.id}>
                  <dt className="text-base font-semibold leading-7 text-gray-900">{faq.question}</dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    )
  }
  