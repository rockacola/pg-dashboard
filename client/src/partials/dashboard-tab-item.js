function DashboardTabItem({ label, isActive, onClick }) {
  let extraClasses = ''
  if (isActive) {
    extraClasses += 'text-green-500 border-green-500'
  }

  return (
    <div
      className={`mr-3 cursor-pointer py-2 block border-b-2 font-medium capitalize transition hover:text-green-700 hover:border-green-700 ${extraClasses}`}
      onClick={onClick}
    >
      {label}
    </div>
  )
}

export default DashboardTabItem
