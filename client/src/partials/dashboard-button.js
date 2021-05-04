function DashboardButton({ label, type }) {
  return (
    <input
      className="mx-2 py-2 px-4 bg-red-100 hover:bg-red-200 rounded-lg transition cursor-pointer"
      type={type}
      value={label}
    />
  )
}

export default DashboardButton