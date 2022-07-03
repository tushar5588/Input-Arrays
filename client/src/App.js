import { useState } from "react";
import "./App.css";
import Form from "./pages/Form";
import Table from "./pages/Table";

function App() {
  const [showTable, setShowTable] = useState(false);
  const setShow = (value) => {
    setShowTable(value);
  };
  return (
    <>
      <Form setShow={setShow} />
      {showTable ? <Table /> : ""}
    </>
  );
}

export default App;
