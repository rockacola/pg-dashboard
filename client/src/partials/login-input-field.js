function LoginTextInput({
  inputFor,
  inputType = 'text',
  label,
  inputPlaceholder = '',
}) {
  return (
    <div className="flex flex-col mb-3">
      <label
        for={inputFor}
        className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
      >
        {label}
      </label>
      <div className="relative">
        <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
          <svg
            className="h-6 w-6"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
          </svg>
        </div>

        <input
          id={inputFor}
          type={inputType}
          name={inputFor}
          className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
          placeholder={inputPlaceholder}
        />
      </div>
    </div>
  )
}

export default LoginTextInput
