import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft } from "lucide-react";
import AddEvent from "./AddEvent";
import EventBox from "./EventBox";

const Calendar = () => {
  return (
    <div className=" bg-slate-700 px-6 py-4 border-8 border-black rounded-xl shadow-2xl shadow-black flex gap-8 min-w-[90vmin] aspect-[3/2]">
      <div className="">
        <h1 className=" text-5xl font-bold text-white font-mono">EVENTIFY</h1>
        <div className=" mt-3">
          <div className="flex justify-between items-center">
            <div className=" flex text-gray-300 text-2xl font-semibold items-center h-full">
              <h2>December, </h2>
              <h2>2024</h2>
            </div>
            <div className="flex gap-2 items-center ">
              <Button size="sm" className=" rounded-full bg-slate-900">
                <ChevronLeft color="#f9c13e" />
              </Button>
              <Button size="sm" className=" rounded-full bg-slate-900">
                <ChevronRight color="#f9c13e" />
              </Button>
            </div>
          </div>
          <div className="days flex w-full my-6 text-slate-500">
            <span className="day">Sun</span>
            <span className="day">Mon</span>
            <span className="day">Tue</span>
            <span className="day">Wed</span>
            <span className="day">Thu</span>
            <span className="day">Fri</span>
            <span className="day">Sat</span>
          </div>
          <div className="month-days flex flex-wrap text-slate-100">
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
            <span>6</span>
            <span className="current-day">7</span>
            <span>8</span>
            <span>9</span>
            <span>10</span>
            <span>11</span>
            <span>12</span>
            <span>13</span>
            <span>14</span>
            <span>15</span>
            <span>16</span>
            <span>17</span>
            <span>18</span>
            <span>19</span>
            <span>20</span>
            <span>21</span>
            <span>22</span>
            <span>23</span>
            <span>24</span>
            <span>25</span>
            <span>26</span>
            <span>27</span>
            <span>28</span>
            <span>29</span>
            <span>30</span>
            <span>31</span>
          </div>
        </div>
      </div>
      <div className=" w-[60%] h-full py-12">
        <EventBox
          title="Potato"
          description="fjhw"
          startTimestamp="05:45"
          endTimestamp="08:63"
          date="24 Oct 2024"
        />
        <EventBox
          title="Potato"
          description="fjhw"
          startTimestamp="05:45"
          endTimestamp="08:63"
          date="24 Oct 2024"
        />
      </div>
    </div>
  );
};

export default Calendar;
