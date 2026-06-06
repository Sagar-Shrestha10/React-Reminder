import { format } from "date-fns";
import { useForm } from "react-hook-form";
import useReminderStore from "../store/reminderStore";

const Form = ({ isEditing = false, reminder }) => {
  const addReminder = useReminderStore((state) => state.addReminder);
  const updateReminder = useReminderStore((state) => state.updateReminder);

  const { register, handleSubmit, reset } = useForm({
    values: reminder,
  });

  const submitForm = (data) => {
    if (isEditing) {
      updateReminder(reminder.id, data);
      alert("Update Reminder Successfully.");
    } else {
      addReminder({
        id: Date.now(),
        ...data,
      });
      reset();

      alert("Reminder Added Successfully.");
    }
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <div className="grid  gap-4 sm:gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Title
          </label>
          <input
            id="name"
            type="text"
            placeholder="Add reminder title"
            required
            {...register("title")}
            className="block w-full rounded-md bg-black/10 px-3 py-1.5 text-base shadow "
          />
        </div>
        <div>
          <label
            htmlFor="date"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Date & Time
          </label>
          <input
            type="datetime-local"
            id="date"
            required
            {...register("datetime")}
            className="block w-full rounded-md bg-black/10 px-3 py-1.5 text-base shadow "
          />
        </div>
        <div>
          <label
            htmlFor="status"
            defaultValue="Pending"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Status
          </label>
          <select
            id="status"
            defaultValue="PENDING"
            disabled = {!isEditing}
            required
            {...register("status")}
            className="block w-full rounded-md bg-black/10 px-3 py-1.5 text-base disabled:text-gray-500 shadow "
          >
            <option value="PENDING">Pending</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
         
        </div>

        <div className="sm:col-span-2 mb-10">
          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Description
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Your Reminder Here."
            required
            rows={4}
            {...register("description")}
            className="block w-full min-h-30 rounded-md bg-black/10  px-4.5 py-2 text-base  placeholder:text-gray-500  focus:outline-indigo-500"
          ></textarea>
        </div>
      </div>
      <div>
        <button
          type="submit"
          className="rounded-md text-white bg-orange-500 px-3.5 py-2.5 text-center text-sm font-semibold shadow-xs cursor-pointer hover:opacity-90  focus-visible:outline-orange-500"
        >
          {isEditing ? "Update Reminder": "Add Reminder"}
        </button>
      </div>
    </form>
  );
};

export default Form;
