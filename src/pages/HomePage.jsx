import { format, isAfter } from "date-fns";
import ReminderCard from "../components/ReminderCard";
import useReminderStore from "../store/reminderStore";

const HomePage = () => {
  const reminders = useReminderStore((state) => state.getAllReminder());

  const { deleteReminder } = useReminderStore()

  if (reminders.length == 0) {
    return <h1 className="text-center text-2xl font-medium">No Reminders</h1>;
  }

  return (
    <>
      <div className="grid grid-cols-1  gap-5">
        {reminders
  .filter((reminder) => typeof reminder === "object")
  .map((reminder) => (
    <ReminderCard
      key={reminder.id}
      id={reminder.id}
      title={reminder.title}
      description={reminder.description}
      date={format(new Date(reminder.datetime), "MMM dd, yyyy")}
      time={format(new Date(reminder.datetime), "hh:mm a")}
      status = {reminder.status}
      isUpcoming = {isAfter(reminder.datetime, new Date())}
      onDeleteReminder={() =>{
        if(window.confirm("Are you sure?")){
          deleteReminder(reminder.id)
        }
      }}
    />
))}
      </div>
    </>
  );
};

export default HomePage;
