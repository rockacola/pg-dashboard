import moment from 'moment'

/**
 * @param {{ value: string }}
 * @returns {JSX.Element}
 */
function DateNugget({ value }) {
  const m = moment(value)

  return (
    <div
      className="inline-block py-1 px-2 text-xs bg-yellow-100 bg-opacity-60 text-gray-700 rounded-lg"
      title={value}
    >
      {m.fromNow()}
    </div>
  )
}

export default DateNugget
