import { BeakerIcon } from '@heroicons/react/solid'

function DashboardNavItem({ label, icon = <BeakerIcon /> }) {
  return (
    <div className="my-2 -mx-4 rounded-lg px-4 py-2 transition hover:shadow hover:bg-white">
      <div className="flex items-center">
        <div className="w-4 h-4">{icon}</div>
        <div className="pl-2">{label}</div>
      </div>
    </div>
  )
}

export default DashboardNavItem
