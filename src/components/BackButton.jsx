import { Link } from "react-router-dom"
import { BsArrowLeftSquareFill } from "react-icons/bs";

const BackButton = ({ destination ='/' }) => {
  return (
    <div className="flex">
        <Link to={destination} className='bg-sky-800 text-white px-6 py-2 hover:bg-sky-700'>  <BsArrowLeftSquareFill/> </Link>
    </div>
  )
}

export default BackButton
