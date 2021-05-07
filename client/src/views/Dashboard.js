import {
  DatabaseIcon,
  EmojiSadIcon,
  LogoutIcon,
  TableIcon,
} from '@heroicons/react/outline'
import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router'
import { PgServerHandler } from '../handlers/pg-server-handler'
import DashboardNavItem from '../partials/dashboard-nav-item'
import DashboardTabItem from '../partials/dashboard-tab-item'
import qs from 'query-string'
import {
  setTableNames,
  setQuery,
  removeQuery,
} from '../reducers/connection-slice'
import DashboardResultTable from '../partials/dashboard-result-table'
import ErrorMessage from '../partials/login-error-message'
import DashboardQueryItem from '../partials/dashboard-query-item'
import { HashHelper } from '../helpers/hash-helper'

/**
 * @param {string} query
 * @returns {boolean}
 */
const isValidQuery = (query) => {
  return !!query.trim()
}

function Dashboard() {
  const history = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()
  const [queryText, setQueryText] = useState('')
  const [resultObject, setResultObject] = useState(undefined)
  const allConnections = useSelector((state) => state.connection.connections)
  const allTableNames = useSelector((state) => state.connection.tableNames)
  const allQueries = useSelector((state) => state.connection.queries)
  const [queryResultActiveTab, setQueryResultActiveTab] = useState('table')
  const [queryEditorActiveTab, setQueryEditorActiveTab] = useState('editor')
  const [errorMessage, setErrorMessage] = useState('')

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

  const relevantHistoricQueries = useMemo(() => {
    return Object.values(allQueries).filter(
      (item) => item.connectionHashKey === connectionHashKey
    )
  }, [allQueries, connectionHashKey])

  const updateTableNames = async () => {
    console.log('updateTableNames triggered.')
    const targetConnection = allConnections[connectionHashKey]
    if (!targetConnection) {
      return
    }

    const tableNames = await PgServerHandler.getTables(targetConnection)
    dispatch(
      setTableNames({
        key: connectionHashKey,
        value: tableNames,
      })
    )
  }

  useEffect(() => {
    console.log('useEffect on mount')

    // Check if targetted valid connection data is available
    console.log('connectionHashKey:', connectionHashKey)
    const targetConnection = allConnections[connectionHashKey]
    if (!targetConnection) {
      history.push(`/`)
    }

    updateTableNames()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const performQuery = async () => {
    const targetConnection = allConnections[connectionHashKey]
    const cleanQuery = queryText.trim()

    const params = {
      ...targetConnection,
      query: cleanQuery,
    }
    const res = await PgServerHandler.query(params)
    console.log('res:', res)

    setResultObject(res.data)

    // Store as historical query
    const queryHashKey = HashHelper.getHashByString(cleanQuery)
    const queryObj = {
      connectionHashKey,
      queryHashKey,
      text: cleanQuery,
    }
    console.log('queryHashKey:', queryHashKey)
    dispatch(
      setQuery({
        key: queryHashKey,
        value: queryObj,
      })
    )
  }

  const onQueryChangeHandler = (e) => {
    // console.log('onQueryChange triggered. e:', e);
    setQueryText(e.target.value)
  }

  const onResetClickHandler = (e) => {
    console.log('onResetClickHandler triggered. e:', e)
    setQueryText('')
    setErrorMessage('')
    setResultObject(undefined)
  }

  const onDisconnectClickHandler = () => {
    history.push(`/`)
  }

  const onEditorTabClickHandler = (tabKey) => {
    console.log('onEditorTabClickHandler triggered. tabKey:', tabKey)
    setQueryEditorActiveTab(tabKey)
  }

  const onResultTabClickHandler = (tabKey) => {
    console.log('onResultTabClickHandler triggered. tabKey:', tabKey)
    setQueryResultActiveTab(tabKey)
  }

  const onSubmitHandler = (e) => {
    e.preventDefault()
    console.log('onSubmitHandler triggered. e:', e)
    setErrorMessage('')

    if (!isValidQuery(queryText)) {
      setErrorMessage('Invalid input query.')
      return
    }

    performQuery()
  }

  const onQuerySelectHandler = (key) => {
    console.log('onQuerySelectHandler triggered. key:', key)
    const queryItem = allQueries[key]

    setQueryEditorActiveTab('editor')
    setQueryText(queryItem.text)
    setErrorMessage('')
    setResultObject(undefined)
  }

  const onQueryDeleteHandler = (key) => {
    console.log('onQueryDeleteHandler triggered. key:', key)
    dispatch(removeQuery({ key }))
  }

  const renderQueryResult = () => {
    return (
      <div className="mb-12">
        <div>
          <h2 className="my-4 text-2xl font-semibold">Query Results</h2>
          <div className="flex my-2">
            <DashboardTabItem
              label="Table"
              onClick={() => onResultTabClickHandler('table')}
              isActive={queryResultActiveTab === 'table'}
            />
            <DashboardTabItem
              label="JSON"
              onClick={() => onResultTabClickHandler('json')}
              isActive={queryResultActiveTab === 'json'}
            />
          </div>
        </div>
        {queryResultActiveTab === 'table' && renderTableResult()}
        {queryResultActiveTab === 'json' && renderJsonResult()}
      </div>
    )
  }

  const renderTableResult = () => {
    if (!resultObject) {
      return null
    }

    return <DashboardResultTable data={resultObject} />
  }

  const renderJsonResult = () => {
    if (!resultObject) {
      return null
    }
    return (
      <div className="bg-gray-50 rounded p-4 text-xs text-gray-600">
        <pre>
          <code>{JSON.stringify(resultObject, null, 2)}</code>
        </pre>
      </div>
    )
  }

  const renderQueryEditor = () => (
    <form onSubmit={onSubmitHandler}>
      <textarea
        className="container border rounded-lg h-40 p-4"
        onChange={onQueryChangeHandler}
        value={queryText}
        placeholder="Type your SQL here..."
      />

      {!!errorMessage && <ErrorMessage message={errorMessage} />}

      <div className="text-blue-700 text-right -mx-2 mt-2">
        <input
          className="mx-2 py-2 px-4 box-border border border-blue-600 bg-white rounded transition cursor-pointer text-blue-600 hover:bg-opacity-60"
          type="reset"
          value="Reset"
          onClick={onResetClickHandler}
        />
        <input
          className="mx-2 py-2 px-4 box-border border border-blue-600 bg-blue-600 hover:bg-blue-500 rounded transition cursor-pointer text-white"
          type="submit"
          value="Run"
        />
      </div>
    </form>
  )

  const renderQueryHistory = () => {
    // console.log('renderQueryHistory triggered.')
    // console.log('relevantHistoricQueries:', relevantHistoricQueries)

    if (relevantHistoricQueries.length === 0) {
      return (
        <div className="px-2 py-4 mb-12 flex items-center text-gray-600">
          <div>No saved query available.</div>
          <div className="w-6 h-6 ml-1">
            <EmojiSadIcon />
          </div>
        </div>
      )
    }

    return (
      <div>
        {relevantHistoricQueries.map((queryItem, index) => (
          <DashboardQueryItem
            key={queryItem.queryHashKey}
            query={queryItem}
            onSelect={() => onQuerySelectHandler(queryItem.queryHashKey)}
            onDelete={() => onQueryDeleteHandler(queryItem.queryHashKey)}
          />
        ))}
      </div>
    )
  }

  return (
    <div
      className="min-h-screen md:h-screen md:w-full flex flex-col md:flex-row md:overflow-hidden bg-no-repeat bg-cover"
      style={{ backgroundImage: 'url(/images/bg-sample-mountain.jpg)' }}
    >
      <nav className="flex flex-col bg-gray-300 bg-opacity-60 md:w-64 px-12 pt-4 pb-6">
        <div className="text-lg text-gray-800 font-semibold mt-1">
          Dashboard
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
                className="flex items-center my-2 ml-6 text-gray-800 hover:text-gray-600 transition"
              >
                <div className="w-4 h-4">
                  <TableIcon />
                </div>
                <div className="ml-2">{tableName}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-auto text-red-500">
          <DashboardNavItem
            label="Disconnect"
            icon={<LogoutIcon />}
            onClick={onDisconnectClickHandler}
          />
        </div>
      </nav>

      <main className="flex-1 flex flex-col bg-gray-100 bg-opacity-80 transition duration-500 ease-in-out md:overflow-y-auto">
        <div className="max-w-4xl mx-10 my-2">
          <div>
            <div className="flex">
              <DashboardTabItem
                label="Query Editor"
                onClick={() => onEditorTabClickHandler('editor')}
                isActive={queryEditorActiveTab === 'editor'}
              />
              <DashboardTabItem
                label="Query History"
                onClick={() => onEditorTabClickHandler('history')}
                isActive={queryEditorActiveTab === 'history'}
              />
            </div>

            <div className="mt-4">
              {queryEditorActiveTab === 'editor' && renderQueryEditor()}
              {queryEditorActiveTab === 'history' && renderQueryHistory()}
            </div>
          </div>

          {!!resultObject && renderQueryResult()}
        </div>
      </main>
    </div>
  )
}

export default Dashboard
