import { useState } from "react"
import useOutsideClick from "../../hooks/useOutsideClick"

const statusArray = ["SHIPPED", "DELIVERED", "PENDING"]
const statusColor = { "SHIPPED": 'red', 'DELIVERED': 'green', 'PENDING': 'yellow' }

const getStatus = (status) => {
  if (status === statusArray[0]) {
    return "bg-red-100 text-red-500 border border-red-500 shadow"
  } else if (status === statusArray[1]) {
    return "bg-green-100 text-green-500 border border-green-500 shadow"
  } else if (status === statusArray[2]) {
    return "bg-yellow-100 text-yellow-500 border border-yellow-500 shadow"
  }
}

const OrderStatusButton = ({ orderStatus }) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false)
  const handleStatusClick = (e) => {
    e.stopPropagation()
    setIsDropDownOpen(!isDropDownOpen)
  }

  const handleUpdateStatus = (e, st) => {
    e.stopPropagation()

  }

  const ref = useOutsideClick(() => setIsDropDownOpen(false))

  return (
    <div className='relative w-max'>
      <p onClick={handleStatusClick} className={`flex px-2 py-1 text-xs ${getStatus(orderStatus)} ml-0 rounded-md w-max m-auto`}>
        {orderStatus}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 ml-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </p>
      {
        isDropDownOpen && (
          <div
            class="absolute z-10 mt-2 rounded-lg border border-gray-200 bg-white shadow-xl"
            role="menu"
            ref={ref}
          >
            <div class="p-2">
              {
                statusArray.filter(status => status !== orderStatus).map((status, idx) => {
                  return (
                    <p
                      onClick={(e) => handleUpdateStatus(e, status)}
                      class={`flex w-max items-center group rounded-lg px-2 py-1 text-xs text-center ${getStatus(status)} ${idx === 0 ? 'mb-2' : ''}`}
                    >
                      {status}
                      <span className='hidden group-hover:block ml-1'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                      </span>
                    </p>

                  )
                })
              }
            </div>
          </div>
        )
      }

    </div>
  )
}

export default OrderStatusButton