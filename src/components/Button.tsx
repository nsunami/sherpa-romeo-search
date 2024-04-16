export function Button({ props, className, children }) {
  return (
    <>
      <button className={`${className} rounded-md bg-green-100 px-2`}>
        {children}
      </button>
      <button className="">▼</button>
    </>
  )
}
