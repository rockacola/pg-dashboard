/**
 * @param {{ size: number }}
 * @returns {JSX.Element}
 */
function Spinner({ size = 32 }) {
  const sizeClasses = `h-${size} w-${size}`

  return (
    <div
      className={`animate-spin rounded-full border-t-2 border-b-2 border-blue-400 ${sizeClasses}`}
    />
  )
}

export default Spinner
