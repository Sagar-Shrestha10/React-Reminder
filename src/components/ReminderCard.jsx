import React from "react";
import { Link } from "react-router";
import useReminderStore from "../store/reminderStore";

const ReminderCard = ({
  id,
  isUpcoming = false,
  title,
  date,
  time,
  status = "PENDING",
  description,
  onDeleteReminder,
  
}) => {
  const cardColor =
    status === "COMPLETED"
      ? "bg-green-100"
      : status === "CANCELLED"
        ? "bg-red-100"
        : "bg-orange-100";


          const { markCompleted } = useReminderStore()


  return (
    <div
      className={`shadow rounded-2xl p-6 mx-3 hover:-translate-y-1 transition-all duration-200 text-xs ${cardColor}`}
    >
      <div className="flex justify-between items-start mb-2 gap-x-3">
        <h1 className="sm:text-3xl text-xl  font-medium">{title}</h1>
        <div className="flex gap-3 ">
          <Link
            to={`/edit/${id}`}
            className=" bg-blue-200 hover:bg-blue-100 py-1 px-2 rounded-md"
            text-sm
          >
            ✏️
          </Link>
          <button
          onClick={onDeleteReminder}
            className=" bg-red-200  hover:bg-red-100 py-1 px-2 rounded-md"
            text-sm
          >
            🗑️
          </button>
        </div>
      </div>
      <div className="flex gap-2 text-orange-500 pt-1 pb-2  text-xs">
        <span>📅{date}</span>
        <span>⏲{time}</span>
      </div>
      <p className="mb-4 mt-4">{description}</p>
      {!isUpcoming && status == "PENDING" && (
        <button onClick={() => markCompleted(id)} className="bg-orange-500 text-white rounded-lg px-4 py-1.5">
          Mark as Completed
        </button>
      )}
    </div>
  );
};

export default ReminderCard;
