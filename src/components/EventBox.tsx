import React, { useState } from "react";
import { Edit2, Trash2 } from "lucide-react";

interface EventBoxProps {
  title: string;
  type: "personal" | "work" | "casual";
  startTimestamp: string;
  endTimestamp: string;
  description: string;
  date: string;
  setEvents?: React.Dispatch<React.SetStateAction<EventBoxProps[]>>;
}

const EventBox: React.FC<EventBoxProps> = ({
  title,
  type,
  startTimestamp,
  endTimestamp,
  description,
  date,
  setEvents,
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

    const storedEvents = JSON.parse(localStorage.getItem("events") || "[]");
    const updatedEvents = storedEvents.filter(
      (e: EventBoxProps) =>
        e.startTimestamp !== startTimestamp || e.endTimestamp !== endTimestamp
    );

    localStorage.setItem("events", JSON.stringify(updatedEvents));

    const updatedFilteredEvents = updatedEvents.filter((e: EventBoxProps) => {
      const eventDate = new Date(e.date).toISOString().split("T")[0];
      const targetDate = new Date(date).toLocaleDateString("en-CA");
      return eventDate === targetDate;
    });

    setEvents && setEvents(updatedFilteredEvents);
  };

  // Determine classes based on the type
  const typeClasses = {
    personal: "bg-blue-500 shadow-blue-800",
    casual: "bg-green-500 shadow-green-800",
    work: "bg-red-500 shadow-red-800",
  };

  const currentTypeClass = typeClasses[type];

  return (
    <div
      className={`w-full ${currentTypeClass} rounded-lg cursor-pointer mb-4 shadow-md overflow-hidden transition-all ${
        isExpanded ? "h-auto" : "h-20"
      }`}
      onClick={handleToggle}>
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
              onClick={handleEdit}>
              <Edit2 size={18} />
            </button>
            <button
              className="text-white hover:text-red-500"
              onClick={handleDelete}>
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventBox;
