import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { MDBIcon } from 'mdb-react-ui-kit';
import {Container, Row, Col, Card, Table, Alert, Button, Form} from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import {
  Label,
  Input,
  Collapse
} from "reactstrap";

const Homepage = ({ state }) => {
  
  //const myWeb3  = new Web3(Web3.givenProvider);
  const {account} = state;

  const [addAddressIsOpen, setAddAddressIsOpen] = useState(false);
  const [newAddress, setNewAddress] = useState("");
  const addAddressToggle = () => setAddAddressIsOpen(!addAddressIsOpen);
  const [addAddressError, setAddAddressError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [scholarshipWarning, setScholarshipWarning] = useState("");

  

  const addAddressToContract =async(e)=>{
    const {contract}=state;
    try{
        await contract.methods.addAddress(newAddress).send({from:account});
        setSuccessMessage("Address addition successfull");
        setNewAddress("");
    }
    catch(e){
        if(e.message.includes("invalid address"))
            setAddAddressError("Address is Invalid, Please enter Valid metamask address");
        else if(e.message.includes("User denied transaction"))
        setAddAddressError("You are not allowed to perform this Action (OR) Address may be already exists in the list. Please check the list.");
        else
            setAddAddressError("You are not allowed to perform this Action");
        setNewAddress("");
        console.log(e.message);
        }
    }
// --------------------------------------------------------------------------------------------------------------------
    const [getAddressIsOpen, setGetAddressIsOpen] = useState(false);
    const getAddressToggle = async() => setGetAddressIsOpen(!getAddressIsOpen);
    const [allAddresses, setAllAddresses] = useState([]);
    const getAllowedAddresses =async(e)=>{
        const {contract}=state;
        try{
            const addresses= await contract.methods.getAddresses().call({from:account});
            setAllAddresses(addresses);
        }
        catch(e){
            setAddAddressError("You are not allowed to perform this Action");
            console.log(e);
            }
        }
// --------------------------------------------------------------------------------------------------------------------
const [delAddressIsOpen, setDelAddressIsOpen] = useState(false);
const [delAddress, setDelAddress] = useState("");
const delAddressToggle = () => setDelAddressIsOpen(!delAddressIsOpen);

const delAddressFromContract =async()=>{
  const {contract}=state;
  try{
      await contract.methods.deleteAddress(delAddress).send({from:account});
      setSuccessMessage("Address deletion successfull");
      setDelAddress("");
  }
  catch(e){
      if(e.message.includes("invalid address"))
          setAddAddressError("Address is Invalid, Please enter Valid metamask address");
      else if(e.message.includes("User denied transaction"))
            setAddAddressError("Address may be not found in the list. Please check the list.");
      else
          setAddAddressError("You are not allowed to perform this Action");
      setDelAddress("");
      console.log(e.message);
      }
  }
// --------------------------------------------------------------------------------------------------------------------    
    const [newScholarshipIsOpen, setNewScholarshipIsOpen] = useState(false);
    const setScholarsipToggle = async() => setNewScholarshipIsOpen(!newScholarshipIsOpen);
    const [newScholarshipval, setNewScholarshipval] = useState(0);
    const getScholarship =async()=>{
        const {contract}=state;
        try{
            const existingScholarship= await contract.methods.scholarship().call({from:account});
            setNewScholarshipval(existingScholarship);
        }
        catch(e){
            setAddAddressError("You are not allowed to perform this Action");
            console.log(e);
            }
        }
    const setNewScholarship =async()=>{
        const {contract}=state;
        try{
            await contract.methods.setScholarship(newScholarshipval).send({from:account});
            setSuccessMessage("Scholarship Modification Successfull");

        }
        catch(e){
            setAddAddressError("You are not allowed to perform this Action or scholarship amount is incorrect");
            console.log(e);
            }
        }
 // --------------------------------------------------------------------------------------------------------------------

 const [addStudentIsOpen, setAddStudentIsOpen] = useState(false);
const [studentId, setStudentId] = useState("");
const [firstName,setFirstName] = useState("");
const [lastName,setLastName] = useState("");
const [role,setRole] = useState("");
const [gpa,setGpa] = useState(0);
const [attendence,setAttendence] = useState(0);
const addStudentToggle = () => setAddStudentIsOpen(!addStudentIsOpen);

const addStudent =async(event)=>{
    event.preventDefault();
  const {contract}=state;
  try{
      const checkDuplicates= await contract.methods.getRecord(studentId).call({from:account});
      if(checkDuplicates[0]==="")
      {
            await contract.methods.createRecord(studentId, firstName, lastName, role, gpa*100, attendence).send({from:account});
            setSuccessMessage("Created Student Record successfully");
            setStudentId("");
            setFirstName("");
            setLastName("");
            setRole("");
            setGpa("");
            setAttendence("");
      }
      else
      {
        setAddAddressError("A record with this student ID already exists.");
      }
  }
  catch(e){
      if(e.message.includes("invalid address"))
          setAddAddressError("Address is Invalid, Please enter Valid metamask address");
      else if(e.message.includes("User denied transaction"))
            setAddAddressError("Address may be not found in the list. Please check the list.");
      else
          setAddAddressError("You are not allowed to perform this Action");
    setStudentId("");
    setFirstName("");
    setLastName("");
    setRole("");
    setGpa("");
    setAttendence("");
      console.log(e.message);
      }
  }

  const handleCGPAChange = (e) => {
    const regex = /^[0-9]+(\.[0-9]{1,2})?$/;
    const { value } = e.target;
    if (regex.test(value) || value === "") { // check if value matches the regular expression or is empty
      setGpa(value);
    }
    else{
        setAddAddressError("Please enter Grade Point Average(GPA) in the format of X.XX");
        setGpa(0);
    }
  };

  const handleAttendence = (e) => {
    const regex = /^\d+$/;
    const { value } = e.target;
    if (regex.test(value) || value === "") {
      setAttendence(value);
    }
    else{
        setAddAddressError("Please round up the value of attendence percentage");
        setAttendence(0);
    }
  };
 // -------------------------------------------------------------------------------------------------------------------- 
 const [updStudentIsOpen, setUpdStudentIsOpen] = useState(false);
 const [studentRecords, setStudentRecords] = useState([]);
const [updstudentId, setUpdStudentId] = useState("");
const [updFirstName,setUpdFirstName] = useState("");
const [updLastName,setUpdLastName] = useState("");
const [updRole,updSetRole] = useState("");
const [updGpa,setUpdGpa] = useState(0);
const [updAttendence,setUpdAttendence] = useState(0);
const updStudentToggle = () => setUpdStudentIsOpen(!updStudentIsOpen);
const [showUpdateModel, setShowUpdateModel] = useState(false);
const getStudentRecords =async(e)=>{
    const {contract}=state;
    try{
        const studentRecords= await contract.methods.getAllRecords().call({from:account});
        console.log(studentRecords);
        setStudentRecords(studentRecords);
    }
    catch(e){
        console.log(e);
        }
}

const updStudent =async(event)=>{
    event.preventDefault();
  const {contract}=state;
  try{
     
        await contract.methods.updateRecord(updstudentId, updFirstName, updLastName, updRole, updGpa*100, updAttendence).send({from:account});
        setSuccessMessage("Updated successfully");
        await getStudentRecords(event);
        setUpdStudentId("");
        setUpdFirstName("");
        setUpdLastName("");
        updSetRole("");
        setUpdGpa("");
        setUpdAttendence("");
  }
  catch(e){
      if(e.message.includes("invalid address"))
          setAddAddressError("Address is Invalid, Please enter Valid metamask address");
      else if(e.message.includes("User denied transaction"))
            setAddAddressError("Address may be not found in the list. Please check the list.");
      else
          setAddAddressError("You are not allowed to perform this Action");
        setUpdStudentId("");
        setUpdFirstName("");
        setUpdLastName("");
        updSetRole("");
        setUpdGpa("");
        setUpdAttendence("");
        console.log(e.message);
      }
  }

  const updHandleCGPAChange = (e) => {
    const regex = /^[0-9]+(\.[0-9]{1,2})?$/;
    const { value } = e.target;
    if (regex.test(value) || value === "") { // check if value matches the regular expression or is empty
        setUpdGpa(value);
    }
    else{
        setAddAddressError("Please enter Grade Point Average(GPA) in the format of X.XX");
        setUpdGpa(0);
    }
  };

  const updHandleAttendence = (e) => {
    const regex = /^\d+$/;
    const { value } = e.target;
    if (regex.test(value) || value === "") {
        setUpdAttendence(value);
    }
    else{
        setAddAddressError("Please round up the value of attendence percentage");
        setUpdAttendence(0);
    }
  };
  const handleCloseUpdate = (e) => {
        setShowUpdateModel(false);
  };
  // --------------------------------------------------------------------------------------------------------------------
  return (
    <div>
      <Modal
        show={addAddressError !== ""}
        onHide={() => {
          setAddAddressError("");
        }}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>ERROR</Modal.Title>
          <button
            type="button"
            className="btn-close"
            onClick={(e) => {
              setAddAddressError("");
            }}
            aria-label="Close"
          ></button>
        </Modal.Header>
        <Modal.Body>
          <h6>
            <Alert variant="danger">{addAddressError}</Alert>
          </h6>
        </Modal.Body>
      </Modal>
      <Modal
        show={successMessage !== ""}
        onHide={() => {
          setSuccessMessage("");
        }}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>SUCCESS</Modal.Title>
          <button
            type="button"
            className="btn-close"
            onClick={(e) => {
              setSuccessMessage("");
            }}
            aria-label="Close"
          ></button>
        </Modal.Header>
        <Modal.Body>
          <h6>
            <Alert variant="success">{successMessage}</Alert>
          </h6>
        </Modal.Body>
      </Modal>
      <Modal
        show={scholarshipWarning !== ""}
        onHide={() => {
          setScholarshipWarning("");
          setUpdStudentId("");
          setUpdFirstName("");
          setUpdLastName("");
          updSetRole("");
          setUpdGpa("");
          setUpdAttendence("");
        }}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Alert</Modal.Title>
          <button
            type="button"
            className="btn-close"
            onClick={(e) => {
              setScholarshipWarning("");
              setUpdStudentId("");
              setUpdFirstName("");
              setUpdLastName("");
              updSetRole("");
              setUpdGpa("");
              setUpdAttendence("");
            }}
            aria-label="Close"
          ></button>
        </Modal.Header>
        <Modal.Body>
          <h6>
            <Alert variant="warning">{scholarshipWarning}</Alert>
          </h6>
          <Row>
            <Col xs={2}>
              <Button
                variant="danger"
                onClick={(e) => {
                  setScholarshipWarning("");
                  setUpdStudentId("");
                  setUpdFirstName("");
                  setUpdLastName("");
                  updSetRole("");
                  setUpdGpa("");
                  setUpdAttendence("");
                }}
              >
                Close
              </Button>
            </Col>
            <Col></Col>
            <Col></Col>
            <Col>
              <Button
                variant="success"
                onClick={(e) => {
                  setScholarshipWarning("");
                  updStudent(e);
                }}
              >
                Proceed
              </Button>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
      <Modal show={showUpdateModel} onHide={(e) => handleCloseUpdate(e)}>
        <Modal.Header closeButton>
          <Modal.Title>Update</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                handleCloseUpdate(e);
                setScholarshipWarning(
                  " Scholarship will be awarded based on GPA and attendence. Please make sure you have entered corrcet information"
                );
              }}
            >
              <Form.Group as={Row} mt="4">
                <Row>
                  <Col md="4">
                    <Form.Label>Student ID:</Form.Label>
                  </Col>
                  <Col md="8">
                    <Form.Control readOnly type="text" value={updstudentId} />
                  </Col>
                </Row>
                <Form.Control.Feedback type="invalid">
                  First name should not be empty
                </Form.Control.Feedback>
              </Form.Group>
              <br></br>
              <Form.Group as={Row} mt="4">
                <Row>
                  <Col md="4">
                    <Form.Label>First Name:</Form.Label>
                  </Col>
                  <Col md="8">
                    <Form.Control
                      required
                      type="text"
                      placeholder=""
                      value={updFirstName}
                      onChange={(e) => {
                        setUpdFirstName(e.target.value);
                      }}
                    />
                  </Col>
                </Row>
                <Form.Control.Feedback type="invalid">
                  First name should not be empty
                </Form.Control.Feedback>
              </Form.Group>
              <br></br>
              <Form.Group as={Row} mt="4">
                <Row>
                  <Col md="4">
                    <Form.Label>Last Name:</Form.Label>
                  </Col>
                  <Col md="8">
                    <Form.Control
                      required
                      type="text"
                      placeholder=""
                      value={updLastName}
                      onChange={(e) => {
                        setUpdLastName(e.target.value);
                      }}
                    />
                  </Col>
                </Row>
                <Form.Control.Feedback type="invalid">
                  Last name should not be empty
                </Form.Control.Feedback>
              </Form.Group>
              <br></br>
              <Form.Group as={Row} mt="4">
                <Row>
                  <Col md="4">
                    <Form.Label>Role:</Form.Label>
                  </Col>
                  <Col md="8">
                    <Form.Control
                      required
                      type="text"
                      placeholder=""
                      value={updRole}
                      onChange={(e) => {
                        updSetRole(e.target.value);
                      }}
                    />
                  </Col>
                </Row>
                <Form.Control.Feedback type="invalid">
                  Role should not be empty
                </Form.Control.Feedback>
              </Form.Group>
              <br></br>
              <Form.Group as={Row} mt="4">
                <Row>
                  <Col md="4">
                    <Form.Label>GPA:</Form.Label>
                  </Col>
                  <Col md="8">
                    <Form.Control
                      type="number"
                      placeholder="X.XX"
                      min="0.00"
                      max="4.00"
                      step="0.01"
                      value={updGpa === 0 ? "" : updGpa}
                      onChange={(e) => {
                        updHandleCGPAChange(e);
                      }}
                    />
                  </Col>
                </Row>
              </Form.Group>
              <br></br>
              <Form.Group as={Row} mt="4">
                <Row>
                  <Col md="4">
                    <Form.Label>Attendence:</Form.Label>
                  </Col>
                  <Col md="8">
                    <Form.Control
                      type="number"
                      min="0"
                      placeholder="XXX"
                      max="100"
                      step="1"
                      value={updAttendence === 0 ? "" : updAttendence}
                      onChange={(e) => {
                        updHandleAttendence(e);
                      }}
                    />
                  </Col>
                </Row>
              </Form.Group>
              <br></br>
              <Form.Group as={Row} mt="4">
                <Col>
                  <Button
                    variant="danger"
                    onClick={(e) => {
                      handleCloseUpdate(e);
                    }}
                  >
                    Close
                  </Button>
                </Col>
                <Col></Col>
                <Col></Col>
                <Col>
                  <Button variant="success" type="submit">
                    Update
                  </Button>
                </Col>
              </Form.Group>
            </Form>
          </Container>
        </Modal.Body>
      </Modal>
      <Container>
        <br></br>
        {account && (
          <Container fluid>
            <Row>
              <Col sm={3}>
                <Row>
                  <Col sm={1}>
                    <a href="#">
                      {addAddressIsOpen ? (
                        <MDBIcon
                          icon="angle-down"
                          size="2x"
                          style={{ marginBottom: "1rem", marginRight: "5px" }}
                        />
                      ) : (
                        <MDBIcon
                          icon="angle-right"
                          size="2x"
                          style={{ marginBottom: "1rem", marginRight: "5px" }}
                        />
                      )}
                    </a>
                  </Col>
                  <Col sm={6}>
                    <Button
                      color="primary"
                      onClick={addAddressToggle}
                      style={{ marginBottom: "1rem" }}
                    >
                      Add Address
                    </Button>
                  </Col>
                </Row>
              </Col>
              <Row>
                <Col md={1}></Col>
                <Col>
                  <Collapse isOpen={addAddressIsOpen}>
                    <Card border="dark">
                      <Card.Body>
                        <Col md={10}>
                          <Form>
                            <Form.Group>
                              <Row>
                                <Col md={2}>
                                  <Label>Address:</Label>
                                </Col>

                                <Col md={6}>
                                  <Input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    placeholder="Enter Metamask Address"
                                    value={newAddress}
                                    onChange={(e) =>
                                      setNewAddress(e.target.value)
                                    }
                                  />
                                </Col>
                                <Col md={1}>
                                  <Button
                                    color="primary"
                                    disabled={!(newAddress !== "")}
                                    onClick={(e)=> {addAddressToContract(e); getAllowedAddresses(e) }}
                                  >
                                    Add
                                  </Button>
                                </Col>
                              </Row>
                            </Form.Group>
                          </Form>
                        </Col>
                      </Card.Body>
                    </Card>
                  </Collapse>
                </Col>
              </Row>
            </Row>
            <Row>
              <Col sm={3}>
                <Row>
                  <Col sm={1}>
                    <a href="#">
                      {getAddressIsOpen ? (
                        <MDBIcon
                          icon="angle-down"
                          size="2x"
                          style={{ marginBottom: "1rem", marginRight: "2px" }}
                        />
                      ) : (
                        <MDBIcon
                          icon="angle-right"
                          size="2x"
                          style={{ marginBottom: "1rem", marginRight: "2px" }}
                        />
                      )}
                    </a>
                  </Col>
                  <Col sm={9}>
                    <Button
                      color="primary"
                      onClick={(e) => {
                        getAddressToggle();
                        !getAddressIsOpen && getAllowedAddresses(e);
                      }}
                      style={{ marginBottom: "1rem" }}
                    >
                      Get Allowed Addresses
                    </Button>
                  </Col>
                </Row>
              </Col>
              <Row>
                <Col md={1}></Col>
                <Col>
                  <Collapse isOpen={getAddressIsOpen}>
                    <Card border="dark">
                      <Card.Body>
                        <Col md={10}>
                          <Form>
                            <Form.Group row>
                              <Col xs={5}>
                                <Container fluid>
                                  <Row>
                                    <div className="container-fluid table-bordered">
                                      <Table striped>
                                        <thead>
                                          <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Account</th>
                                            <th scope="col"></th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {allAddresses &&
                                            allAddresses.map((item, index) => (
                                              <tr key={index}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{item}</td>

                                                <td>
                                                  {
                                                    // <button className="btn btn-info" onClick={async (e) => {
                                                    //     }}>Delete</button>
                                                  }
                                                </td>
                                              </tr>
                                            ))}
                                        </tbody>
                                      </Table>
                                    </div>
                                  </Row>
                                </Container>
                              </Col>
                            </Form.Group>
                          </Form>
                        </Col>
                      </Card.Body>
                    </Card>
                  </Collapse>
                </Col>
              </Row>
            </Row>
            <Row>
              <Col sm={3}>
                <Row>
                  <Col sm={1}>
                    <a href="#">
                      {delAddressIsOpen ? (
                        <MDBIcon
                          icon="angle-down"
                          size="2x"
                          style={{ marginBottom: "1rem", marginRight: "5px" }}
                        />
                      ) : (
                        <MDBIcon
                          icon="angle-right"
                          size="2x"
                          style={{ marginBottom: "1rem", marginRight: "5px" }}
                        />
                      )}
                    </a>
                  </Col>
                  <Col sm={7}>
                    <Button
                      color="primary"
                      onClick={delAddressToggle}
                      style={{ marginBottom: "1rem" }}
                    >
                      Delete Address
                    </Button>
                  </Col>
                </Row>
              </Col>
              <Row>
                <Col md={1}></Col>
                <Col>
                  <Collapse isOpen={delAddressIsOpen}>
                    <Card border="dark">
                      <Card.Body>
                        <Col md={10}>
                          <Form>
                            <Form.Group>
                              <Row>
                                <Col md={2}>
                                  {" "}
                                  <Label>Address:</Label>{" "}
                                </Col>
                                <Col md={5}>
                                  <Input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    placeholder="Enter Metamask Address"
                                    value={delAddress}
                                    onChange={(e) =>
                                      setDelAddress(e.target.value)
                                    }
                                  />
                                </Col>
                                <Col md={1}>
                                  <Button
                                    color="primary"
                                    disabled={!(delAddress !== "")}
                                    onClick={delAddressFromContract}
                                  >
                                    {" "}
                                    DELETE{" "}
                                  </Button>
                                </Col>
                              </Row>
                            </Form.Group>
                          </Form>
                        </Col>
                      </Card.Body>
                    </Card>
                  </Collapse>
                </Col>
              </Row>
            </Row>
            <Row>
              <Col sm={3}>
                <Row>
                  <Col sm={1}>
                    <a href="#">
                      {newScholarshipIsOpen ? (
                        <MDBIcon
                          icon="angle-down"
                          size="2x"
                          style={{ marginBottom: "1rem", marginRight: "5px" }}
                        />
                      ) : (
                        <MDBIcon
                          icon="angle-right"
                          size="2x"
                          style={{ marginBottom: "1rem", marginRight: "5px" }}
                        />
                      )}
                    </a>
                  </Col>
                  <Col sm={8}>
                    <Button
                      color="primary"
                      onClick={(e) => {
                        setScholarsipToggle();
                        getScholarship();
                      }}
                      style={{ marginBottom: "1rem" }}
                    >
                      Set New Scholarship
                    </Button>
                  </Col>
                </Row>
              </Col>
              <Row>
                <Col md={1}></Col>
                <Col>
                  <Collapse isOpen={newScholarshipIsOpen}>
                    <Card border="dark">
                      <Card.Body>
                        <Col md={10}>
                          <Form>
                            <Form.Group as={Row} mt="4">
                              <Row>
                                <Col md="2">
                                  <Form.Label>New Scholarship:</Form.Label>
                                </Col>
                                <Col md="4">
                                  <Form.Control
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    placeholder="Enter New Scholarship"
                                    value={newScholarshipval}
                                    onChange={(e) =>
                                      setNewScholarshipval(e.target.value)
                                    }
                                  />
                                </Col>
                                <Col md={4}>
                                  <Button
                                    color="primary"
                                    onClick={setNewScholarship}
                                  >
                                    Update
                                  </Button>
                                </Col>
                              </Row>
                            </Form.Group>
                          </Form>
                        </Col>
                      </Card.Body>
                    </Card>
                  </Collapse>
                </Col>
              </Row>
            </Row>
            <Row>
              <Col sm={3}>
                <Row>
                  <Col sm={1}>
                    <a href="#">
                      {addStudentIsOpen ? (
                        <MDBIcon
                          icon="angle-down"
                          size="2x"
                          style={{
                            marginBottom: "1rem",
                            marginRight: "5px",
                            color: "#FFA500",
                          }}
                        />
                      ) : (
                        <MDBIcon
                          icon="angle-right"
                          size="2x"
                          style={{
                            marginBottom: "1rem",
                            marginRight: "5px",
                            color: "#FFA500",
                          }}
                        />
                      )}
                    </a>
                  </Col>
                  <Col sm={7}>
                    <Button
                      variant="warning"
                      size="lg"
                      onClick={addStudentToggle}
                      style={{ marginBottom: "1rem" }}
                    >
                      ADD STUDENT
                    </Button>
                  </Col>
                </Row>
              </Col>
              <Row>
                <Col md={1}></Col>
                <Col md={8}>
                  <Collapse isOpen={addStudentIsOpen}>
                    <Card border="dark">
                      <Card.Body>
                        <Col md={10}>
                          <Form onSubmit={addStudent}>
                            <Form.Group>
                              <Row>
                                  <Label htmlFor="studentid" md={2}>
                                    {" "}
                                    Student ID:{" "}
                                  </Label>
                                <Col xs={4}>
                                  <Input
                                    type="text"
                                    id="studentid"
                                    name="studentid"
                                    required
                                    placeholder=""
                                    value={studentId}
                                    onChange={(e) =>
                                      setStudentId(e.target.value)
                                    }
                                  />
                                </Col>
                                <Col></Col>
                              </Row>
                            </Form.Group>
                            <br></br>
                            <Row>
                              <Col>
                                <Form.Group>
                                  <Row>
                                    <Label htmlFor="fname" md={4}>
                                      First Name:
                                    </Label>
                                    <Col xs={8}>
                                      <Input
                                        type="text"
                                        id="fname"
                                        name="fname"
                                        required
                                        placeholder=""
                                        value={firstName}
                                        onChange={(e) =>
                                          setFirstName(e.target.value)
                                        }
                                      />
                                    </Col>
                                  </Row>
                                </Form.Group>
                              </Col>
                              <Col>
                                <Form.Group>
                                    <Row>
                                  <Label htmlFor="lname" md={4}>
                                    Last Name:
                                  </Label>
                                  <Col xs={8}>
                                    <Input
                                      type="text"
                                      id="lname"
                                      name="lname"
                                      required
                                      placeholder=""
                                      value={lastName}
                                      onChange={(e) =>
                                        setLastName(e.target.value)
                                      }
                                    />
                                  </Col>
                                  </Row>
                                </Form.Group>
                              </Col>
                            </Row>
                            <br></br>
                            <Form.Group>
                                <Row>
                              <Label htmlFor="role" md={2}>
                                Role:
                              </Label>
                              <Col xs={4}>
                                <Input
                                  type="text"
                                  id="role"
                                  name="role"
                                  required
                                  placeholder=""
                                  value={role}
                                  onChange={(e) => setRole(e.target.value)}
                                />
                              </Col>
                              </Row>
                            </Form.Group>
                            <br></br>
                            <Row>
                              <Col>
                                <Form.Group>
                                    <Row>
                                  <Label htmlFor="cgpa" md={4}>
                                    GPA:
                                  </Label>
                                  <Col xs={8}>
                                    <Input
                                      type="number"
                                      id="cgpa"
                                      name="cgpa"
                                      placeholder="X.XX"
                                      min="0.00"
                                      max="4.00"
                                      step="0.01"
                                      value={gpa === 0 ? "" : gpa}
                                      onChange={handleCGPAChange}
                                    />
                                  </Col>
                                  </Row>
                                </Form.Group>
                              </Col>
                              <Col>
                                <Form.Group>
                                    <Row>
                                  <Label htmlFor="attendence" md={4}>
                                    Attendence:
                                  </Label>
                                  <Col xs={8}>
                                    <Input
                                      type="number"
                                      id="attendence"
                                      name="attendence"
                                      min="0"
                                      placeholder="XXX"
                                      max="100"
                                      step="1"
                                      value={attendence === 0 ? "" : attendence}
                                      onChange={handleAttendence}
                                    />
                                  </Col>
                                  </Row>
                                </Form.Group>
                              </Col>
                            </Row>
                            <br></br>
                            <Form.Group>
                                <Row>
                              <Col>
                                <Button variant="success" type="submit">
                                  {" "}
                                  CREATE{" "}
                                </Button>
                              </Col>
                              </Row>
                            </Form.Group>
                          </Form>
                        </Col>
                      </Card.Body>
                    </Card>
                  </Collapse>
                </Col>
              </Row>
            </Row>
            <Row>
              <Col sm={3}>
                <Row>
                  <Col sm={1}>
                    <a href="#">
                      {updStudentIsOpen ? (
                        <MDBIcon
                          icon="angle-down"
                          size="2x"
                          style={{
                            marginBottom: "1rem",
                            marginRight: "5px",
                            color: "#FFA500",
                          }}
                        />
                      ) : (
                        <MDBIcon
                          icon="angle-right"
                          size="2x"
                          style={{
                            marginBottom: "1rem",
                            marginRight: "5px",
                            color: "#FFA500",
                          }}
                        />
                      )}
                    </a>
                  </Col>
                  <Col sm={11}>
                    <Button
                      variant="warning"
                      size="lg"
                      onClick={(e) => {
                        updStudentToggle();
                        getStudentRecords();
                      }}
                      style={{ marginBottom: "1rem" }}
                    >
                      LIST STUDENT RECORDS AND UPDATE
                    </Button>
                  </Col>
                </Row>
              </Col>
              <Col md={1}></Col>
              <Row>
                <Collapse isOpen={updStudentIsOpen}>
                  <Card border="dark">
                    <Card.Body>
                      <Col md={12}>
                        <Table striped>
                          <thead>
                            <tr>
                              <th scope="col">#</th>
                              <th scope="col">ID</th>
                              <th scope="col">First Name</th>
                              <th scope="col">Last Name</th>
                              <th scope="col">Role</th>
                              <th scope="col">GPA</th>
                              <th scope="col">Attendence</th>
                              <th scope="col">Scholarship</th>
                              <th scope="col"></th>
                            </tr>
                          </thead>
                          <tbody>
                            {studentRecords &&
                              studentRecords.map((item, index) => (
                                <tr key={index}>
                                  <th>{index + 1}</th>
                                  <td>{item[0]}</td> {/* studentid */}
                                  <td>{item[1]}</td> {/* first name */}
                                  <td>{item[2]}</td> {/* last Name */}
                                  <td>{item[3]}</td> {/* role */}
                                  <td>{item[4] / 100}</td> {/* gpa */}
                                  <td>{item[5]}</td> {/* attendence */}
                                  <td>{item[6]}</td> {/* scholarship */}
                                  <td>
                                    {
                                      <Button
                                        variant="info"
                                        onClick={async (e) => {
                                          await setUpdStudentId(item[0]);
                                          await setUpdFirstName(item[1]);
                                          await setUpdLastName(item[2]);
                                          await updSetRole(item[3]);
                                          await setUpdGpa(item[4] / 100);
                                          await setUpdAttendence(item[5]);
                                          await setShowUpdateModel(true);
                                        }}
                                      >
                                        update
                                      </Button>
                                    }
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </Table>
                      </Col>
                    </Card.Body>
                  </Card>
                </Collapse>
              </Row>
            </Row>
          </Container>
        )}
      </Container>
    </div>
  );
};

export default Homepage;
