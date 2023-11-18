import { GRID_VIEW, TABLE_VIEW } from "src/pages/orders/constants";

const ButtonGroup = ({ icon1, icon2, onClick }) => {
  return (
    <span className="isolate inline-flex rounded-md shadow-sm">
      <button
        type="button"
        onClick={() => onClick(TABLE_VIEW.id)}
        className="relative inline-flex items-center rounded-l-md bg-white px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
      >
        <span className="sr-only">Previous</span>
        {icon2}
      </button>
      <button
        type="button"
        onClick={() => onClick(GRID_VIEW.id)}
        className="relative -ml-px inline-flex items-center rounded-r-md bg-white px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
      >
        <span className="sr-only">Next</span>
        {icon1}
      </button>
    </span>
  );
};

export default ButtonGroup;
