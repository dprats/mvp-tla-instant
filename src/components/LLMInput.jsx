const placeholder = "What does the TLA+ spec contain? What should never happen in the model?";

export default function LLMInput({ onNewMessage }) {
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      console.log(`event.target.value: ${event.target.value}`);
      onNewMessage(event.target.value);
      event.target.value = '';
      event.preventDefault(); // Prevent form submission
    }
  };

  return (
    <div>
      <div className="mt-2">
        <input
          type="text"
          name="query"
          id="query"
          className="block w-full rounded-full border-0 px-20 py-7.5 text-2xl text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-2xl sm:leading-6"
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          autoComplete="off"
        />
      </div>
    </div>
  );
}
