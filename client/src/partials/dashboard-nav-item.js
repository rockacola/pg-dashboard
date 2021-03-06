import { BeakerIcon } from '@heroicons/react/solid'

/**
 * @param {{ label: string, icon: JSX.Element, onClick: function():void }}
 * @returns {JSX.Element}
 */
function DashboardNavItem({ label, icon = <BeakerIcon />, onClick }) {
  const pointerClass = !!onClick ? 'cursor-pointer' : ''

  return (
    <div
      className={`my-2 -mx-4 rounded-lg px-4 py-2 transition hover:shadow hover:bg-white ${pointerClass}`}
      onClick={onClick}
    >
      <div className="flex items-center">
        <div className="w-4 h-4">{icon}</div>
        <div className="pl-2">{label}</div>
      </div>
    </div>
  )
}

export default DashboardNavItem
