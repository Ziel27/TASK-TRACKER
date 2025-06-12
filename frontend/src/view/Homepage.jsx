import React from "react";
import Card from "../components/Card";
import { useState, useEffect } from "react";
import { createTask, getAllTasks } from "../api/task";
import "cally";
import toast from "react-hot-toast";

const Homepage = () => {
  const [value, setValue] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "",
    dueDate: "",
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await getAllTasks();
      setData(response.data);
      console.log("Fetched tasks:", response.data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));

    if (name === "status") {
      setValue(value);
    }
  };

  const handleSubmit = async () => {

    if (!form.title || !form.status || !form.dueDate) {
    toast.error("Please fill in all required fields.");
    return;
    }

    try {
      await createTask(form);
      setForm({
        title: "",
        description: "",
        status: "",
        dueDate: "",
      });
      toast.success("Task created successfully");
      document.getElementById("my_modal_1").close();
    } catch (error) {
      console.error("Task creation failed:", error);
      toast.error(error?.message || "Task creation failed");
    }
  }

  let btnColor = "";
  if (value === "pending") {
    btnColor = " btn-warning";
  } else if (value === "in-progress") {
    btnColor = " btn-info";
  } else if (value === "completed") {
    btnColor = " btn-success";
  }

  if (loading) {
    <span className="loading loading-dots loading-xl"></span>
  }

  return (
    <main className="flex flex-col min-h-screen bg-base-200 px-4 mt-20">
      <div>
        <div role="tablist" className="tabs tabs-border mb-6 mt-4">
          <a role="tab" className="tab">
            All
          </a>
          <a role="tab" className="tab">
            <div aria-label="info" className="status status-info mr-1"></div>
            In-Progress
          </a>
          <a role="tab" className="tab tab-active">
            <div
              aria-label="warning"
              className="status status-warning mr-1"
            ></div>
            Pending
          </a>
          <a role="tab" className="tab">
            <div
              aria-label="success"
              className="status status-success mr-1"
            ></div>
            Completed
          </a>
        </div>
        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <button
          className="btn btn-primary mb-6"
          onClick={() => document.getElementById("my_modal_1").showModal()}
        >
          Create Task
        </button>
        <dialog id="my_modal_1" className="modal">
          <form className="modal-box py-10" onSubmit={handleSubmit}>
            <input type="text" placeholder="Title" name="title" value={form.title}  onChange={handleChange} className="input w-full mb-4" />
            <textarea
              className="textarea w-full h-40 text-base mb-4"
              placeholder="Description"
              name="description"
              value={form.description}
              onChange={handleChange}
            ></textarea>
            <div className="flex flex-col lg:flex-row gap-4">
            <details className="dropdown w-full lg:w-1/2">
              <summary className={`btn ${btnColor}`}>
                {value ? value : "Status"}
              </summary>
              <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 shadow-sm">
                {["pending", "in-progress", "completed"].map((status) => (
                  <li key={status}>
                    <label className="btn btn-sm btn-block btn-ghost justify-start">
                      <input
                        type="radio"
                        name="status"
                        value={status}
                        checked={form.status === status}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </label>
                  </li>
                ))}
              </ul>
            </details>
            <button
              type="button"
              onClick={() => {
                const popover = document.getElementById("cally-popover1");
                if (popover?.showPopover) popover.showPopover();
              }}
              className="input input-border w-full lg:w-1/2"
              id="cally1"
              style={{ anchorName: "--cally1" }}
            >
              Pick a date
            </button>
            <div
              popover="manual"
              id="cally-popover1"
              className="dropdown bg-base-100 rounded-box shadow-lg"
              style={{ positionAnchor: "--cally1" }}
            >
              <input type="hidden" name="dueDate" value={selectedDate} />

              <calendar-date
                class="cally"
                onchange={(e) => {
                  const value = e.target?.value;
                  setSelectedDate(value);
                  setForm((prev) => ({ ...prev, dueDate: value }));

                  document.getElementById("cally1").innerText =
                    value ?? "Pick a date";

                  const popover = document.getElementById("cally-popover1");
                  if (popover?.hidePopover) popover.hidePopover();
                }}
              >
                <svg
                  aria-label="Previous"
                  className="fill-current size-4"
                  slot="previous"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M15.75 19.5 8.25 12l7.5-7.5"></path>
                </svg>
                <svg
                  aria-label="Next"
                  className="fill-current size-4"
                  slot="next"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="m8.25 4.5 7.5 7.5-7.5 7.5"></path>
                </svg>
                <calendar-month></calendar-month>
              </calendar-date>
            </div>
            </div>

            <div className="modal-action">
              <div method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button type="submit" className="btn btn-primary mr-2">Create</button>
                <button type="button" className="btn" onClick={() => {
                    document.getElementById("my_modal_1").close();;
                }}>Close</button>
              </div>
            </div>
          </form>
        </dialog>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.map((task) => (
        <Card
          key={task._id}
          title={task.title}
          description={task.description}
          status={task.status}
          dueDate={new Date(task.dueDate).toLocaleDateString()}
        />
      ))}
      </div>
    </main>
  );
};

export default Homepage;
