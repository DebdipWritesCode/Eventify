import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useState, useEffect } from "react";
import AddEvent from "./AddEvent";
import EventBox from "./EventBox";

const Calendar = () => {
  const currentDate = new Date();

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Janurary",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  interface Event {
    title: string;
    type: "personal" | "work" | "casual";
    description: string;
    startTimestamp: string;
    endTimestamp: string;
    date: string;
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [events, setEvents] = useState<Event[]>([]);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const previousMonth = () => {
    setCurrentMonth((prev) => {
      const newMonth = prev === 0 ? 11 : prev - 1;
      setCurrentYear((year) => (newMonth === 11 ? year - 1 : year));
      return newMonth;
    });
  };

  const nextMonth = () => {
    setCurrentMonth((prev) => {
      const newMonth = prev === 11 ? 0 : prev + 1;
      setCurrentYear((year) => (newMonth === 0 ? year + 1 : year));
      return newMonth;
    });
  };

  const handleDayClick = (day: number) => {
    const newDate = new Date(currentYear, currentMonth, day, 12);
    setSelectedDate(newDate);
  };

  const isAddEventValid = () => {
    const today = new Date();
    const selected = new Date(
      currentYear,
      currentMonth,
      selectedDate.getDate()
    );

    today.setHours(0, 0, 0, 0);
    selected.setHours(0, 0, 0, 0);

    if (selected >= today) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events") || "[]");

    const filteredEvents = storedEvents.filter((event: any) => {
      const eventDate = new Date(event.date).toISOString().split("T")[0];
      const selectedDateStr = selectedDate.toISOString().split("T")[0];

      return eventDate === selectedDateStr;
    });

    setEvents(filteredEvents);
  }, [selectedDate]);

  return (
    <div className=" bg-slate-700 px-6 py-4 border-8 border-black rounded-xl shadow-2xl shadow-black flex gap-8 min-w-[90vmin] aspect-[3/2] relative">
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="modal-content w-[400px] bg-white p-6 rounded-lg shadow-lg animate-slideIn relative">
            <button
              onClick={handleModalToggle}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800">
              ✖
            </button>
            <AddEvent
              selectedDate={selectedDate}
              setIsModalOpen={setIsModalOpen}
            />
          </div>
        </div>
      )}

      <div className="w-[500px]">
        <h1 className=" text-5xl font-bold text-white font-mono">EVENTIFY</h1>
        <div className=" mt-8">
          <div className="flex justify-between items-center">
            <div className=" flex text-gray-300 text-2xl font-semibold items-center h-full">
              <h2>{months[currentMonth]},&nbsp;</h2>
              <h2>{currentYear}</h2>
            </div>
            <div className="flex gap-2 items-center ">
              <Button
                size="sm"
                className=" rounded-full bg-slate-900"
                onClick={previousMonth}>
                <ChevronLeft color="#f9c13e" />
              </Button>
              <Button
                size="sm"
                className=" rounded-full bg-slate-900"
                onClick={nextMonth}>
                <ChevronRight color="#f9c13e" />
              </Button>
            </div>
          </div>
          <div className="days flex w-full my-6 text-slate-500">
            {weekdays.map((day) => (
              <span
                key={day}
                className={`day ${day === "Sun" ? "text-red-500" : ""}`}>
                {day}
              </span>
            ))}
          </div>
          <div className="month-days flex flex-wrap text-slate-100">
            {Array.from({ length: firstDayOfMonth + daysInMonth }).map(
              (_, index) => {
                if (index < firstDayOfMonth) {
                  return <span key={index} className="day"></span>;
                }
                const day = index - firstDayOfMonth + 1;
                const isCurrentDay =
                  currentDate.getDate() === day &&
                  currentDate.getMonth() === currentMonth &&
                  currentDate.getFullYear() === currentYear;

                const isSelectedDay =
                  selectedDate.getDate() === day &&
                  selectedDate.getMonth() === currentMonth &&
                  selectedDate.getFullYear() === currentYear;

                return (
                  <span
                    key={index}
                    className={`day ${isCurrentDay ? "current-day" : ""} ${
                      isSelectedDay ? "selected-day" : ""
                    } ${index % 7 === 0 ? "text-red-400" : ""}`}
                    onClick={() => handleDayClick(day)}>
                    {day}
                  </span>
                );
              }
            )}
          </div>
        </div>
      </div>
      <div className="w-[400px] flex flex-col gap-3">
        <div className="h-full py-12 pr-8 overflow-y-auto">
          {events.length > 0 ? (
            events.map((event, index) => (
              <EventBox
                key={index}
                title={event.title}
                type={event.type}
                description={event.description}
                startTimestamp={event.startTimestamp}
                endTimestamp={event.endTimestamp}
                date={new Date(event.date).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              />
            ))
          ) : (
            <p className="text-gray-400 text-[27.5px] text-center w-full">No events to show</p>
          )}
        </div>
        <div className="flex justify-end mr-10 mb-3">
          {isAddEventValid() && (
            <Button onClick={handleModalToggle}>Add Event</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
