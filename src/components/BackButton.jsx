import { useNavigate } from "react-router-dom";
import { BsArrowLeftSquareFill } from "react-icons/bs";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <div className="flex w-fit" onClick={() => navigate(-1)}>
      <span className="bg-sky-800 text-white px-6 py-2 hover:bg-sky-700">
        <BsArrowLeftSquareFill />
      </span>
    </div>
  );
};

export default BackButton;
