import { ExclamationIcon } from '@heroicons/react/outline'

function ErrorMessage({ caption = 'Error', message }) {
  return (
    <div className="bg-red-100 text-red-500 p-4 rounded flex items-start my-4">
      <div className="w-6 h-6">
        <ExclamationIcon />
      </div>
      <div className="px-3">
        <h3 className="font-semibold tracking-wider">{caption}</h3>
        <p className="pt-1">{message}</p>
      </div>
    </div>
  )
}

export default ErrorMessage
