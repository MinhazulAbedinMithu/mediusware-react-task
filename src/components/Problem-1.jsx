import React, { useState } from "react";

const Problem1 = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    status: "",
  });
  const [show, setShow] = useState("all");
  const [todos, setTodos] = useState([]);

  const handleClick = (val) => {
    setShow(val);
  };

  //set input value in specific key in formValues.
  const handleChangeFormValue = (name, value) => {
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (!formValues.name || !formValues.status) {
      return alert("Please fill up the form");
    }
    setTodos([...todos, { name: formValues.name, status: formValues.status }]);
    setFormValues({
      name: "",
      status: "",
    });
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-1</h4>
        <div className="col-6 ">
          <form
            className="row gy-2 gx-3 align-items-center mb-4"
            onSubmit={handleSubmitForm}
          >
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Name"
                value={formValues.name}
                onChange={(e) =>
                  handleChangeFormValue(e.target.name, e.target.value)
                }
              />
            </div>
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                name="status"
                placeholder="Status"
                value={formValues.status}
                onChange={(e) =>
                  handleChangeFormValue(e.target.name, e.target.value)
                }
              />
            </div>
            <div className="col-auto">
              <button
                type="submit"
                className="btn btn-primary"
                // onSubmit={handleSubmitForm}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="col-8">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item">
              <button
                className={`nav-link ${show === "all" && "active"}`}
                type="button"
                onClick={() => handleClick("all")}
              >
                All
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "active" && "active"}`}
                type="button"
                onClick={() => handleClick("active")}
              >
                Active
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "completed" && "active"}`}
                type="button"
                onClick={() => handleClick("completed")}
              >
                Completed
              </button>
            </li>
          </ul>
          <div className="tab-content"></div>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {todos
                .sort((a, b) => {
                  if (a.status === "completed" && b.status !== "completed") {
                    return -1;
                  } else if (
                    a.status !== "completed" &&
                    b.status === "completed"
                  ) {
                    return 1;
                  } else {
                    return 0;
                  }
                })
                .filter((item) => {
                  if (show === "active") {
                    return item.status === "active";
                  } else if (show === "completed") {
                    return item.status === "completed";
                  } else {
                    return item;
                  }
                })
                .map((todo, index) => (
                  <tr key={index}>
                    <td scope="col">{todo.name}</td>
                    <td scope="col">{todo.status}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Problem1;
