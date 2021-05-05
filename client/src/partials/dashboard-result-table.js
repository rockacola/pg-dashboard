function DashboardResultTable({ data }) {
  // Validate
  if (!data || !data.rows) {
    return null
  }

  /** @param {string[]} */
  const fields = data.fields.map((field) => field.name)
  /** @param {object[]} */
  const dataRows = data.rows

  const renderHeadCell = (value, index) => (
    <th
      key={index}
      className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider"
    >
      {value}
    </th>
  )

  const renderBodyCell = (value, rIndex, cIndex) => {
    let strVal = value
    if (typeof value === 'boolean') {
      strVal = value.toString()
    }

    return (
      <td
        key={`${rIndex}_${cIndex}`}
        className="px-6 py-2 whitespace-no-wrap border-b text-blue-900 border-gray-100 text-sm leading-5"
      >
        {strVal}
      </td>
    )
  }

  return (
    <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
      <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-4 pt-1 rounded-bl-lg rounded-br-lg">
        <table className="min-w-full">
          <thead>
            <tr>
              {fields.map((field, index) => renderHeadCell(field, index))}
            </tr>
          </thead>
          <tbody className="bg-white">
            {dataRows.map((dataRow, rIndex) => (
              <tr key={rIndex} className="transition hover:bg-gray-50">
                {fields.map((field, cIndex) =>
                  renderBodyCell(dataRow[field], rIndex, cIndex)
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DashboardResultTable