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
  const [searchValue, setSearchValue] = useState("");
  const [detailsModal, setDetailsModal] = useState(null);
  useEffect(() => {
    axios("https://contact.mediusware.com/api/contacts/")
      .then((res) => {
        setContacts(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Modal
      show
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{ position: "relative !important" }}
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
            <div
              key={index}
              onClick={() => setDetailsModal(true)}
              style={{
                position: "relative",
                cursor: "pointer",
                border: "1px solid black",
                padding: "5px",
                margin: "6px 0",
              }}
            >
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
      {detailsModal && (
        <Modal
          show

          //   style={{
          //     position: "absolute",
          //     top: "5%",
          //     left: "50%",
          //     transform: "translateX(-50%)",
          //     width: "60%",
          //     height: "250px",
          //     zIndex: "9999",
          //     backgroundColor: "red",
          //   }}
        >
          <div className="p-2">
            <h4>Details</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Accusantium soluta, tempora aut, atque perferendis iusto nemo
              ducimus excepturi nisi optio animi. Incidunt corporis iusto
              facilis animi debitis sint eveniet dolorum nisi totam, architecto,
              nemo reiciendis voluptatibus quia molestias non molestiae error
              obcaecati quas. A, necessitatibus. Consequuntur incidunt in beatae
              voluptas?
            </p>
          </div>
          <Modal.Footer>
            <Button variant="danger" onClick={() => setDetailsModal(null)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Modal>
  );
}

export default MainModal;
