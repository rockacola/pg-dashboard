import { DatabaseIcon, LogoutIcon, TableIcon } from '@heroicons/react/outline'
import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router'
import { PgServerHandler } from '../handlers/pg-server-handler'
import DashboardButton from '../partials/dashboard-button'
import DashboardNavItem from '../partials/dashboard-nav-item'
import DashboardTabItem from '../partials/dashboard-tab-item'
import qs from 'query-string'
import { setTableNames } from '../reducers/connection-slice'

function Dashboard() {
  const history = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()
  const [query, setQuery] = useState('')
  const [resultObject, setResultObject] = useState(undefined)
  const allConnections = useSelector((state) => state.connection.connections)
  console.log('allConnections:', allConnections)
  const allTableNames = useSelector((state) => state.connection.tableNames)
  console.log('allTableNames:', allTableNames)

  const connectionHashKey = useMemo(() => {
    console.log('connectionHashKey useMember triggered.')
    const urlParams = qs.parse(location.search)
    return urlParams.connect
  }, [location])

  const targetDatabaseName = useMemo(() => {
    const targetConnection = allConnections[connectionHashKey]

    if (!targetConnection || !targetConnection.database) {
      return 'Database'
    }
    return targetConnection.database
  }, [allConnections, connectionHashKey])

  const targetTableNames = useMemo(() => {
    const tableTableNames = allTableNames[connectionHashKey]

    if (!tableTableNames) {
      return []
    }
    return tableTableNames
  }, [allTableNames, connectionHashKey])

  const updateTableNames = async () => {
    console.log('updateTableNames triggered.')
    const targetConnection = allConnections[connectionHashKey]
    if (!targetConnection) {
      return
    }

    const tableNames = await PgServerHandler.getTables(targetConnection)
    console.log('tableNames:', tableNames)
    dispatch(
      setTableNames({
        key: connectionHashKey,
        value: tableNames,
      })
    )
  }

  useEffect(() => {
    console.log('useEffect on mount')
    updateTableNames()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const performQuery = async () => {
    const targetConnection = allConnections[connectionHashKey]

    // TODO: show spinner
    const params = {
      ...targetConnection,
      query,
    }
    const res = await PgServerHandler.query(params)
    console.log('res:', res)

    setResultObject(res.data)
  }

  const onQueryChangeHandler = (e) => {
    // console.log('onQueryChange triggered. e:', e);
    setQuery(e.target.value)
  }

  const onResetClickHandler = (e) => {
    console.log('onResetClickHandler triggered. e:', e)
    setQuery('')
  }

  const onDisconnectClickHandler = () => {
    history.push(`/`)
  }

  const onSubmitHandler = (e) => {
    e.preventDefault()
    console.log('onSubmitHandler triggered. e:', e)
    performQuery()
  }

  const renderResult = () => {
    if (!resultObject) {
      return null
    }
    return (
      <div className="bg-gray-50 p-2 text-xs text-gray-600">
        <pre>
          <code>{JSON.stringify(resultObject, null, 2)}</code>
        </pre>
      </div>
    )
  }

  return (
    <div className="h-screen w-full flex overflow-hidden">
      <nav className="flex flex-col bg-gray-200 w-64 px-12 pt-4 pb-6">
        <div className="flex flex-row border-b items-center justify-between pb-2">
          <span className="text-lg font-semibold capitalize dark:text-gray-300">
            Dashboard
          </span>
        </div>
        <div className="mt-2 text-gray-600">
          <DashboardNavItem
            label={targetDatabaseName}
            icon={<DatabaseIcon />}
          />
          <div>
            {targetTableNames.map((tableName) => (
              <div
                key={tableName}
                className="flex items-center my-2 ml-2 text-gray-800 hover:text-gray-600 transition"
              >
                <div className="w-4 h-4">
                  <TableIcon />
                </div>
                <div className="ml-2">{tableName}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-auto flex items-center text-red-700">
          <DashboardNavItem
            label="Disconnect"
            icon={<LogoutIcon />}
            onClick={onDisconnectClickHandler}
          />
        </div>
      </nav>

      <main
        className="flex-1 flex flex-col bg-gray-100 dark:bg-gray-700 transition
      duration-500 ease-in-out overflow-y-auto"
      >
        <div className="max-w-4xl mx-10 my-2">
          <div>
            <div className="flex">
              <DashboardTabItem label="Query Editor" isActive={true} />
              <DashboardTabItem label="Query History" isActive={false} />
            </div>
            <form className="mt-2" onSubmit={onSubmitHandler}>
              <textarea
                className="container border rounded-lg h-40 p-4"
                onChange={onQueryChangeHandler}
                value={query}
              />
              <div className="text-blue-700 text-right -mx-2 mt-2">
                <DashboardButton
                  type="reset"
                  value="Reset"
                  onClick={onResetClickHandler}
                />
                <DashboardButton type="submit" value="Run" />
              </div>
            </form>
          </div>

          <div>
            <h2 className="my-4 text-4xl font-semibold dark:text-gray-400">
              Query Results
            </h2>
            <div className="flex">
              <DashboardTabItem label="Lorem" isActive={true} />
              <DashboardTabItem label="Ipsum" isActive={false} />
              <DashboardTabItem label="Dolor" isActive={false} />
            </div>
          </div>
          <div className="mt-4 pb-2 flex items-center justify-between text-gray-600">
            Lorem ipsum doloar sit atem.
          </div>
          {renderResult()}
        </div>
      </main>
    </div>
  )
}

export default Dashboard
