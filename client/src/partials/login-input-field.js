import { BeakerIcon } from '@heroicons/react/solid'

function LoginTextInput({
  inputFor,
  inputType = 'text',
  label,
  value,
  inputPlaceholder = '',
  icon = <BeakerIcon />,
  onChange,
}) {
  return (
    <div className="flex flex-col mb-3">
      <label
        htmlFor={inputFor}
        className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
      >
        {label}
      </label>
      <div className="relative">
        <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
          <div className={`w-4 h-4`}>{icon}</div>
        </div>

        <input
          id={inputFor}
          type={inputType}
          name={inputFor}
          className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
          placeholder={inputPlaceholder}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  )
}

export default LoginTextInput
