import LoginTextInput from '../partials/login-input-field'
import {
  ArrowCircleRightIcon,
  DatabaseIcon,
  InboxIcon,
  LocationMarkerIcon,
  UserIcon,
} from '@heroicons/react/outline'
import { useState } from 'react'
import { PgServerHandler } from '../handlers/pg-server-handler'

function Login() {
  const [host, setHost] = useState('')
  const [port, setPort] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [database, setDatabase] = useState('')

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

  const checkConnection = async () => {
    console.log('checkConnection triggered.')

    const res = await PgServerHandler.checkConnection(
      host,
      port,
      username,
      password,
      database
    )
    console.log('res:', res)
  }

  const onSubmitHandler = (e) => {
    e.preventDefault()
    console.log('onSubmitHandler triggered. e:', e)
    checkConnection()
  }

  return (
    <div className="view--login bg-red-300">
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-300">
        <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
          <div className="font-medium self-center text-xl sm:text-2xl uppercase text-gray-800">
            Connect to PostgreSQL
          </div>
          <div className="relative mt-10 h-px bg-gray-300">
            <div className="absolute left-0 top-0 flex justify-center w-full -mt-2">
              <span className="bg-white px-4 text-xs text-gray-500 uppercase">
                Credentials
              </span>
            </div>
          </div>
          <div className="mt-10">
            <form onSubmit={onSubmitHandler}>
              <LoginTextInput
                inputFor="host"
                label="Host"
                value={host}
                onChange={onInputChangeHandler}
                inputPlaceholder="127.0.0.1"
                icon={<LocationMarkerIcon />}
              />
              <LoginTextInput
                inputFor="port"
                label="Port"
                value={port}
                onChange={onInputChangeHandler}
                inputPlaceholder="5432"
                icon={<InboxIcon />}
              />
              <LoginTextInput
                inputFor="user"
                label="User"
                value={username}
                onChange={onInputChangeHandler}
                inputPlaceholder="root"
                icon={<UserIcon />}
              />
              <LoginTextInput
                inputFor="password"
                inputType="password"
                label="Password"
                value={password}
                onChange={onInputChangeHandler}
              />
              <LoginTextInput
                inputFor="database"
                label="Database"
                value={database}
                onChange={onInputChangeHandler}
                inputPlaceholder="default"
                icon={<DatabaseIcon />}
              />

              <div className="flex w-full mt-8">
                <button
                  type="submit"
                  className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in"
                >
                  <span className="mr-2 uppercase">Test Connect</span>
                  <span className="w-4 h-4">{<ArrowCircleRightIcon />}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
