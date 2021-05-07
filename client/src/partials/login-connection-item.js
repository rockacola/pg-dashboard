import { LightningBoltIcon } from '@heroicons/react/outline'

function LoginConnectionItem({ connectionHashKey, connection, onClick }) {
  const renderKeyValue = (key, value) => (
    <div>
      <span className="text-gray-400 inline-block pr-1">{key}</span>
      <span>{value}</span>
    </div>
  )

  return (
    <div
      className={`my-2 p-4 text-gray-600 bg-green-50 rounded transition hover:bg-green-100 cursor-pointer`}
      onClick={onClick}
    >
      <div className="flex items-center">
        <div className="flex-grow-0 w-6 h-6">
          <LightningBoltIcon />
        </div>
        <div className="flex-grow pl-4">
          <div>
            {connection.host}:{connection.port}
          </div>
          {renderKeyValue('U:', connection.username)}
          {renderKeyValue('D:', connection.database)}
        </div>
      </div>
    </div>
  )
}

export default LoginConnectionItem
