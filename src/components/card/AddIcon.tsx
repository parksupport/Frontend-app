import { AiOutlinePlus } from 'react-icons/ai';

function AddCard() {
  return (
    <div className="max-w-[396px] h-[200px] w-full lg:max-w-[680px] bg-[#FFFFFF] rounded-[20px] py-[20px] px-4">
      <div className="flex justify-center items-center">
        <button className="flex justify-center items-center text-gray-500 hover:text-gray-700 text-4xl">
          <AiOutlinePlus size={50} />

        </button>
      </div>
    </div>
  );
}

export default AddCard;
