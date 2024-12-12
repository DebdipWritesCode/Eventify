import React from "react";

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
  return (
    <div className="w-full h-20 bg-blue-500 py-4 rounded-lg cursor-pointer mb-4 flex gap-6 items-center px-4 shadow-md shadow-blue-800">
      <div className="text-white text-center">
        <p className="text-sm font-semibold">{date}</p>
        <p className="mt-2 text-lg font-bold">
          {startTimestamp} - {endTimestamp}
        </p>
      </div>
      <div className="text-white border-l-2 h-full flex items-center pl-3">
        <p className=" font-semibold ">{title}</p>
      </div>
    </div>
  );
};

export default EventBox;
