import axios from "axios";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FormCheckInput from "react-bootstrap/esm/FormCheckInput";
import { Link } from "react-router-dom";

function MainModal({ activeModal, setActiveModal }) {
  const [contacts, setContacts] = useState([]);
  const [showEven, setShowEven] = useState(false);
  useEffect(() => {
    axios("https://contact.mediusware.com/api/contacts/")
      .then((res) => {
        setContacts(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(showEven);
  return (
    <Modal
      show
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="flex">
        <Modal.Title id="contained-modal-title-vcenter" className="">
          {activeModal === "us" ? "US Contact" : "All Contact"}
        </Modal.Title>
      </Modal.Header>
      <div className="w-full d-flex gap-3 py-2 align-items-center justify-content-center">
        <Link
          to={`/problem-2/all`}
          style={{
            backgroundColor: "#46139f",
          }}
          className="btn text-info"
          onClick={() => setActiveModal("all")}
        >
          All Contacts
        </Link>
        <Link
          to={`/problem-2/us`}
          className="btn text-dark"
          style={{
            backgroundColor: "#ff7f50",
          }}
          onClick={() => setActiveModal("us")}
        >
          US Contacts
        </Link>
        <Link
          to={`/problem-2`}
          className="btn text-info"
          style={{
            backgroundColor: "#46139f",
          }}
          onClick={() => setActiveModal("")}
        >
          Close
        </Link>
      </div>
      <Modal.Body>
        {contacts
          .filter((item) => {
            if (activeModal === "us") {
              if (item.country.name === "United States") {
                return item;
              }
            } else {
              return item;
            }
          })
          .filter((item) => (showEven ? item.id % 2 == 0 && item : item))
          .map((contact, index) => (
            <div key={index} onClick={contact}>
              <small>{contact.id}</small>
              <h3>{contact.country.name}</h3>
              <p>Phone: {contact.phone}</p>
            </div>
          ))}
      </Modal.Body>
      <Modal.Footer>
        <Form.Check
          type="checkbox"
          id="even"
          label="Only even"
          value={showEven}
          onChange={() => setShowEven(!showEven)}
        />
      </Modal.Footer>
    </Modal>
  );
}

export default MainModal;
