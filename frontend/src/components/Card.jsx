import React from "react";

const Card = (props) => {

    const badgeColor = props.status === "completed" ? "badge badge-success" :
        props.status === "in-progress" ? "badge badge-warning" :
        props.status === "pending" ? "badge badge-info" :
        "badge badge-secondary";
  return (
    <div>
      <div
        className="card bg-base-100 w-96 shadow-sm"
        onClick={() => document.getElementById("my_modal_card").showModal()}
      >
        <dialog id="my_modal_card" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">{props.title}</h3>
            <p className="py-4">
              Press ESC key or click the button below to close
            </p>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
        <div className="card-body">
          <div className="card-title flex justify-between items-center">
            <h2 className="card-title">{props.title}</h2>
            <span className="text-sm">{props.dueDate}</span>
          </div>
          <p>
            {props.description}
          </p>
          <div className="card-actions flex justify-between items-center mt-4">
            <div className={badgeColor}><span>{props.status}</span></div>
            <button className="btn btn-primary">Update Task</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
