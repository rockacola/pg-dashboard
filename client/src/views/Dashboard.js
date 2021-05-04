import { LogoutIcon, TableIcon } from '@heroicons/react/outline'
import DashboardNavItem from '../partials/dashboard-nav-item'

function Dashboard() {
  return (
    <div className="h-screen w-full flex overflow-hidden">
      <nav className="flex flex-col bg-gray-200 dark:bg-gray-900 w-64 px-12 pt-4 pb-6">
        <div className="flex flex-row border-b items-center justify-between pb-2">
          <span className="text-lg font-semibold capitalize dark:text-gray-300">
            Dashboard
          </span>
        </div>
        <div className="mt-2 text-gray-600">
          <DashboardNavItem label="Tables" icon={<TableIcon />} />
        </div>
        <div className="mt-auto flex items-center text-red-700 dark:text-red-400">
          <DashboardNavItem label="Disconnect" icon={<LogoutIcon />} />
        </div>
      </nav>

      <main
        className="flex-1 flex flex-col bg-gray-100 dark:bg-gray-700 transition
      duration-500 ease-in-out overflow-y-auto"
      >
        <div className="mx-10 my-2">
          <nav
            className="flex flex-row justify-between border-b
          dark:border-gray-600 dark:text-gray-400 transition duration-500
          ease-in-out"
          >
            <div className="flex">
              <a
                href="users-dashboard/"
                className="py-2 block text-green-500 border-green-500
              dark:text-green-200 dark:border-green-200
              focus:outline-none border-b-2 font-medium capitalize
              transition duration-500 ease-in-out"
              >
                Lorem
              </a>
              <button
                className="ml-6 py-2 block border-b-2 border-transparent
              focus:outline-none font-medium capitalize text-center
              focus:text-green-500 focus:border-green-500
              dark-focus:text-green-200 dark-focus:border-green-200
              transition duration-500 ease-in-out"
              >
                Ipsum
              </button>
              <button
                className="ml-6 py-2 block border-b-2 border-transparent
              focus:outline-none font-medium capitalize text-center
              focus:text-green-500 focus:border-green-500
              dark-focus:text-green-200 dark-focus:border-green-200
              transition duration-500 ease-in-out"
              >
                Dolor
              </button>
            </div>
          </nav>
          <h2 className="my-4 text-4xl font-semibold dark:text-gray-400">
            Subheading
          </h2>
          <div
            className="pb-2 flex items-center justify-between text-gray-600
          dark:text-gray-400 border-b dark:border-gray-600"
          >
            Lorem ipsum doloar sit atem.
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
