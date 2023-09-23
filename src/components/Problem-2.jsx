import React, { useState } from "react";
import MainModal from "../../MainModal";
import { Link } from "react-router-dom";

const Problem2 = () => {
  const [activeModal, setActiveModal] = useState("");

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

        <div className="d-flex justify-content-center gap-3">
          <Link
            to={`/problem-2/all`}
            className="btn btn-lg btn-outline-primary"
            onClick={() => setActiveModal("all")}
            // data-toggle="modal"
            // data-target="#ModalCenter"
          >
            All Contacts
          </Link>
          <Link
            to={`/problem-2/us`}
            className="btn btn-lg btn-outline-warning"
            onClick={() => setActiveModal("us")}
          >
            US Contacts
          </Link>
        </div>
      </div>

      {activeModal && (
        <MainModal activeModal={activeModal} setActiveModal={setActiveModal} />
      )}
    </div>
  );
};

export default Problem2;
