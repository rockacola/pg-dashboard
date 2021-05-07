import LoginTextInput from '../partials/login-input-field'
import {
  ArrowCircleRightIcon,
  DatabaseIcon,
  EmojiSadIcon,
  InboxIcon,
  LocationMarkerIcon,
  UserIcon,
} from '@heroicons/react/outline'
import { useEffect, useState } from 'react'
import { PgServerHandler } from '../handlers/pg-server-handler'
import qs from 'query-string'
import { useDispatch, useSelector } from 'react-redux'
import { setConnectionInfo } from '../reducers/connection-slice'
import { HashHelper } from '../helpers/hash-helper'
import { useHistory, useLocation } from 'react-router-dom'
import Spinner from '../partials/spinner'
import ErrorMessage from '../partials/login-error-message'
import LoginTabItem from '../partials/login-tab-item'
import LoginConnectionItem from '../partials/login-connection-item'

function Login() {
  console.log('process.env:', process.env)

  const history = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()
  const [host, setHost] = useState('')
  const [port, setPort] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [database, setDatabase] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [loginActiveTab, setLoginActiveTab] = useState('new')
  const allConnections = useSelector((state) => state.connection.connections)

  const onInputChangeHandler = (e) => {
    // console.log('onInputChangeHandler triggered. e:', e)

    switch (e.target.name) {
      case 'host':
        setHost(e.target.value)
        break
      case 'port':
        setPort(e.target.value)
        break
      case 'user':
        setUsername(e.target.value)
        break
      case 'password':
        setPassword(e.target.value)
        break
      case 'database':
        setDatabase(e.target.value)
        break

      default:
        break
    }
  }

  const performCheckConnection = async () => {
    console.log('performCheckConnection triggered.')

    setIsLoading(true)
    const connectionObj = { host, port, username, password, database }

    try {
      await PgServerHandler.checkConnection(connectionObj)

      const hashKey = HashHelper.getHashByObject(connectionObj)
      console.log('hashKey:', hashKey)
      dispatch(
        setConnectionInfo({
          key: hashKey,
          value: connectionObj,
        })
      )

      // Redirect user to 'dashboard' along with current connection
      history.push(`/dashboard?connect=${hashKey}`)
    } catch (err) {
      setErrorMessage(err.message)
      setIsLoading(false)
    }
  }

  const onSubmitHandler = (e) => {
    e.preventDefault()
    console.log('onSubmitHandler triggered. e:', e)
    performCheckConnection()
  }

  useEffect(() => {
    const urlParams = qs.parse(location.search)
    // console.log('urlParams:', urlParams)

    if (urlParams.host) {
      setHost(urlParams.host)
    }
    if (urlParams.port) {
      setPort(urlParams.port)
    }
    if (urlParams.user) {
      setUsername(urlParams.user)
    }
    if (urlParams.pass) {
      setPassword(urlParams.pass)
    }
    if (urlParams.db) {
      setDatabase(urlParams.db)
    }
  }, [location])

  const onTabClickHandler = (tabKey) => {
    console.log('onTabClickHandler triggered. tabKey:', tabKey)
    setLoginActiveTab(tabKey)
  }

  const onSavedConnectionClickHandler = (connectionKey) => {
    console.log(
      'onSavedConnectionClickHandler triggered. connectionKey:',
      connectionKey
    )
    history.push(`/dashboard?connect=${connectionKey}`)
  }

  const renderNewConnection = () => (
    <div>
      {isLoading && renderLoading()}
      {!isLoading && renderForm()}
    </div>
  )

  const renderSavedConnection = () => {
    const connectionHashKeys = Object.keys(allConnections)
    if (connectionHashKeys.length === 0) {
      return (
        <div className="px-2 py-4 flex items-center text-gray-600">
          <div>No saved connections available.</div>
          <div className="w-6 h-6 ml-1">
            <EmojiSadIcon />
          </div>
        </div>
      )
    }
    return (
      <div>
        {connectionHashKeys.map((connectionHashKey) => (
          <LoginConnectionItem
            key={connectionHashKey}
            connectionHashKey={connectionHashKey}
            connection={allConnections[connectionHashKey]}
            onClick={() => onSavedConnectionClickHandler(connectionHashKey)}
          />
        ))}
      </div>
    )
  }
  const renderLoading = () => (
    <div className="flex justify-center my-16">
      <Spinner size={16} />
    </div>
  )

  const renderForm = () => (
    <div className="mt-4">
      <form onSubmit={onSubmitHandler}>
        <LoginTextInput
          inputFor="host"
          value={host}
          onChange={onInputChangeHandler}
          inputPlaceholder="Host"
          icon={<LocationMarkerIcon />}
        />
        <LoginTextInput
          inputFor="port"
          value={port}
          onChange={onInputChangeHandler}
          inputPlaceholder="Port"
          icon={<InboxIcon />}
        />
        <LoginTextInput
          inputFor="user"
          value={username}
          onChange={onInputChangeHandler}
          inputPlaceholder="User"
          icon={<UserIcon />}
        />
        <LoginTextInput
          inputFor="password"
          inputType="password"
          value={password}
          onChange={onInputChangeHandler}
          inputPlaceholder="Password"
        />
        <LoginTextInput
          inputFor="database"
          value={database}
          onChange={onInputChangeHandler}
          inputPlaceholder="Database"
          icon={<DatabaseIcon />}
        />

        {!!errorMessage && <ErrorMessage message={errorMessage} />}

        <div className="flex justify-center w-full mt-8">
          <button
            type="submit"
            className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 pl-4 pr-3 transition duration-150 ease-in"
          >
            <span className="mr-2">Connect</span>
            <span className="w-4 h-4">{<ArrowCircleRightIcon />}</span>
          </button>
        </div>
      </form>
    </div>
  )

  return (
    <div
      className="bg-no-repeat bg-cover"
      style={{ backgroundImage: 'url(/images/bg-sample-mountain.jpg)' }}
    >
      <div className="min-h-screen flex flex-col items-center px-2 md:px-0 py-8">
        <div className="flex flex-col bg-white px-4 sm:px-6 md:px-8 lg:px-10 py-8 w-full max-w-md border-2 border-gray-200">
          <div className="font-medium self-center text-xl sm:text-lg text-gray-600">
            Connect to PostgreSQL
          </div>

          <div className="flex my-2 mt-6">
            <LoginTabItem
              label="New"
              onClick={() => onTabClickHandler('new')}
              isActive={loginActiveTab === 'new'}
            />
            <LoginTabItem
              label="Saved"
              onClick={() => onTabClickHandler('saved')}
              isActive={loginActiveTab === 'saved'}
            />
          </div>

          {loginActiveTab === 'new' && renderNewConnection()}
          {loginActiveTab === 'saved' && renderSavedConnection()}
        </div>
      </div>
    </div>
  )
}

export default Login
