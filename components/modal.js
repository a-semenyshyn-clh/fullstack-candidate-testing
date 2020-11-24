export function Modal({ children, onClose, title }) {
  return (
    <div className="fixed top-0 bottom-0 right-0 left-0 mt-0 bg-black bg-opacity-10 flex justify-center items-center">
      <div className="shadow rounded-md bg-white w-3/4">
        <div className="border-b border-gray-300 flex justify-between">
          <h2 className="text-2xl p-4">{title}</h2>
          <button className="p-4 mx-2 font-bold" onClick={() => onClose && onClose()}>X</button>
        </div>
        <div className="max-h-80 lg:max-h-full overflow-x-auto">
          {children}
        </div>
      </div>
    </div>
  )
}