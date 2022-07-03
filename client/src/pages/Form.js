import axios from "axios";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import validator from "validator"

const Form = (props) => {
  const [formValues, setFormValues] = useState([
    { name: "", email: "", username: "" },
  ]);
  const [showModal, setShowModal] = useState(true);
  const [loader, setLoader] = useState(false);
  const [emailInvalid, setEmailInvalid] = useState([]);
  const [nameInvalid, setNameInvalid] = useState([]);
  const notify = (status, message) =>
    toast(message, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      type: status == 1 ? "success" : "error",
    });

  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  };

  let addFormFields = () => {
    setFormValues([...formValues, { name: "", email: "", username: "" }]);
  };

  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };

  let handleSubmit = async (event) => {
    event?.preventDefault();
    let emailArr = [];
    let nameArr = [];
    formValues.filter((ele, index) => {
      if (!validator.isEmail(ele.email)) {
        emailArr.push(index);
        setEmailInvalid(emailArr);

      }
      if (ele.username.length < 4) {
        nameArr.push(index);
        setNameInvalid(nameArr);
      }
    })
    if (!emailArr.length && !nameArr.length) {
      setLoader(true);
      await axios
        .post("/addUser", formValues)
        .then((res) => {
          if (res?.status === 200) {
            setLoader(false);
            notify(1, "Date submitted successfully");
            props?.setShow(true);
            setShowModal(false);
          } else {
            setLoader(false);
            notify(0, "Something went wrong!");
          }
        });
    }
  };
  return (
    <>
      <ToastContainer />
      <div className="w-100">
        <Modal
          show={showModal}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <Modal.Title>Add-User</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {formValues.map((element, index) => {
              return (
                <>
                  <div key={index}>
                    <form class="form-inline mb-5">
                      <h5 className="text-muted" style={{ marginLeft: "15px" }}>
                        User-{index + 1}
                      </h5>
                      <div class="d-flex flex-row mb-3">
                        <div class="form-group mx-sm-3">
                          <label for="inputPassword2" class="sr-only">
                            Name
                          </label>
                          <input
                            disabled={loader}
                            type="text"
                            class="form-control"
                            name="name"
                            value={element.name || ""}
                            onChange={(e) => handleChange(index, e)}
                          />
                        </div>
                        <div class="form-group mx-sm-3">
                          <label for="inputPassword2" class="sr-only">
                            Email
                          </label>
                          <input
                            disabled={loader}
                            type="text"
                            class="form-control"
                            name="email"
                            value={element.email || ""}
                            onChange={(e) => handleChange(index, e)}
                          />
                          {emailInvalid.includes(index) && <p className="text-danger">Inavlid email!</p>}
                        </div>{" "}
                        <div class="form-group mx-sm-3">
                          <label for="inputPassword2" class="sr-only">
                            Username
                          </label>
                          <input
                            disabled={loader}
                            type="text"
                            class="form-control"
                            name="username"
                            value={element.username || ""}
                            onChange={(e) => handleChange(index, e)}
                          />
                          {nameInvalid.includes(index) && <p className="text-danger">Minimun 4 characters!</p>}
                        </div>{" "}
                      </div>
                      {index ? (
                        <div style={{ marginRight: "15px", float: "right" }}>
                          <div
                            className="text-danger"
                            onClick={() => removeFormFields(index)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              fill="currentColor"
                              class="bi bi-trash-fill"
                              viewBox="0 0 16 16"
                            >
                              <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                            </svg>
                            <br />
                          </div>
                        </div>
                      ) : null}
                    </form>
                  </div>
                </>
              );
            })}
          </Modal.Body>

          <Modal.Footer>
            <Button
              onClick={() => addFormFields()}
              style={{ width: "80px" }}
              variant="primary"
            >
              Add
            </Button>
            <Button
              variant="success"
              style={{ width: "80px" }}
              onClick={() => handleSubmit()}
            >
              {loader ? (
                <div
                  class="spinner-border spinner-border-sm"
                  role="status"
                ></div>
              ) : (
                "Submit"
              )}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default Form;
