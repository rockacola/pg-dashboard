import { LogoutIcon, TableIcon } from '@heroicons/react/outline'
import DashboardButton from '../partials/dashboard-button'
import DashboardNavItem from '../partials/dashboard-nav-item'
import DashboardTabItem from '../partials/dashboard-tab-item'

function Dashboard() {
  return (
    <div className="h-screen w-full flex overflow-hidden">
      <nav className="flex flex-col bg-gray-200 w-64 px-12 pt-4 pb-6">
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
        <div className="max-w-4xl mx-10 my-2">
          <div>
            <div className="flex">
              <DashboardTabItem label="Query Editor" isActive={true} />
              <DashboardTabItem label="Query History" isActive={false} />
            </div>
            <form className="mt-2">
              <textarea className="container border rounded-lg h-40 p-4">
                SELECT * FROM tblCusotmers WHERE tblCusotmers.id > 100 LIMIT 10;
              </textarea>
              <div className="text-blue-700 text-right -mx-2 mt-2">
                <DashboardButton type="reset" value="Reset" />
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
        </div>
      </main>
    </div>
  )
}

export default Dashboard
