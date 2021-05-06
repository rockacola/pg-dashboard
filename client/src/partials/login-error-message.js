import { ExclamationIcon } from '@heroicons/react/outline'

function LoginErrorMessage({ caption = 'Error', message }) {
  return (
    <div className="bg-red-200 p-4 rounded flex items-start text-yellow-600 my-4 shadow-lg">
      <div className="w-4 h-4 mt-1">
        <ExclamationIcon />
      </div>
      <div className=" px-3">
        <h3 className="text-red-800 font-semibold tracking-wider">{caption}</h3>
        <p className="pt-2 text-red-700">{message}</p>
      </div>
    </div>
  )
}

export default LoginErrorMessage
