import React, { useState } from "react";
import { Edit2, Trash2 } from "lucide-react";

interface EventBoxProps {
  title: string;
  startTimestamp: string;
  endTimestamp: string;
  description: string;
  date: string;
}

const EventBox: React.FC<EventBoxProps> = ({
  title,
  startTimestamp,
  endTimestamp,
  description,
  date,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleEdit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    console.log("Edit clicked");
  };

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    console.log("Delete clicked");
  };

  return (
    <div
      className={`w-full bg-blue-500 rounded-lg cursor-pointer mb-4 shadow-md shadow-blue-800 overflow-hidden transition-all ${
        isExpanded ? "h-auto" : "h-20"
      }`}
      onClick={handleToggle}
    >
      <div className="py-4 flex gap-6 items-center px-4">
        <div className="text-white text-center">
          <p className="text-sm font-semibold">{date}</p>
          <p className="mt-2 text-lg font-bold">
            {startTimestamp} - {endTimestamp}
          </p>
        </div>
        <div className="text-white border-l-2 h-full flex items-center pl-3">
          <p className="font-semibold">{title}</p>
        </div>
      </div>

      {isExpanded && (
        <div className="px-4 pb-4 pt-2 text-white flex justify-between items-center">
          <p className="text-sm">{description}</p>
          <div className="flex gap-2">
            <button
              className="text-white hover:text-yellow-300"
              onClick={handleEdit}
            >
              <Edit2 size={18} />
            </button>
            <button
              className="text-white hover:text-red-500"
              onClick={handleDelete}
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventBox;
