import LoginTextInput from '../partials/login-input-field'
import {
  DatabaseIcon,
  InboxIcon,
  LocationMarkerIcon,
  UserIcon,
} from '@heroicons/react/outline'

function Login() {
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
            <form action="#">
              <LoginTextInput
                inputFor="host"
                label="Host"
                inputPlaceholder="127.0.0.1"
                icon={<LocationMarkerIcon />}
              />
              <LoginTextInput
                inputFor="port"
                label="Port"
                inputPlaceholder="5432"
                icon={<InboxIcon />}
              />
              <LoginTextInput
                inputFor="user"
                label="User"
                inputPlaceholder="root"
                icon={<UserIcon />}
              />
              <LoginTextInput
                inputFor="password"
                inputType="password"
                label="Password"
              />
              <LoginTextInput
                inputFor="database"
                label="Database"
                inputPlaceholder="default"
                icon={<DatabaseIcon />}
              />

              <div className="flex w-full mt-8">
                <button
                  type="submit"
                  className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in"
                >
                  <span className="mr-2 uppercase">Test Connect</span>
                  <span>
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
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
