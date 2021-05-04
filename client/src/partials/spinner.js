function Spinner({ size = 32 }) {
  const sizeClasses = `h-${size} w-${size}`

  return (
    <div
      class={`animate-spin rounded-full border-t-2 border-b-2 border-blue-700 ${sizeClasses}`}
    />
  )
}

export default Spinner
