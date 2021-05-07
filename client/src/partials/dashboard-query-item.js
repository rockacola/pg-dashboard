import { ClipboardIcon, TrashIcon } from '@heroicons/react/outline'

function DashboardQueryItem({ queryHashKey, query, onSelect, onDelete }) {
  return (
    <div
      className={`flex my-2 text-gray-600 bg-green-50 rounded transition hover:bg-green-100 cursor-pointer`}
    >
      <div className="flex-grow" onClick={onSelect}>
        <div className="py-2 px-4 flex items-center">
          <div className="flex-grow-0 w-6 h-6">
            <ClipboardIcon />
          </div>
          <div className="flex-grow pl-4">
            <pre>
              <code>{query.text}</code>
            </pre>
          </div>
        </div>
      </div>
      <div
        className="py-2 px-4 flex-grow-0 text-red-200 transition hover:text-red-500"
        onClick={onDelete}
      >
        <div className="flex items-center w-6 h-full">
          <TrashIcon />
        </div>
      </div>
    </div>
  )
}

export default DashboardQueryItem
