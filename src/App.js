import React, { useState, useEffect } from "react";
import axios from "axios";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import SearchField from "react-search-field";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

function App() {
  axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
  axios.defaults.xsrfCookieName = "csrftoken";

  const [value, setValue] = useState("Select Branch");
  const [bankData, setBankData] = useState([]);
  const [limit, setLimit] = useState(1);

  console.log(limit);

  const [text, setText] = useState("");
  const handleSelect = (e) => {
    console.log(e);
    setValue(e);
  };

  const onChange = (e) => {
    setText(e);
  };

  const getBankData = async () => {
    const res = await axios.get(
      `https://banker-api-nilesh.herokuapp.com/api/branches/?q=${value}&limit=${limit}`
    );

    if (res.data.branches.length == 0) {
      setBankData([]);
    } else {
      setBankData(res.data.branches);
    }
  };
  useEffect(() => {
    getBankData();
  }, [value, limit]);

  const renderHeader = () => {
    let headerElement = [
      "ifsc",
      "bank id",
      "address",
      "city",
      "branch",
      "state",
      "bank name",
    ];

    return headerElement.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  };

  const renderBody = () => {
    return bankData
      .reverse()
      .map(
        ({
          ifsc,
          bank_id,
          branch,
          address,
          city,
          district,
          state,
          bank_name,
        }) => {
          return (
            <tr key={bankData.id}>
              <td>{ifsc}</td>
              <td>{bank_id}</td>
              <td>{address.toLowerCase()}</td>
              <td>{city}</td>
              <td>{branch.toLowerCase()}</td>
              <td>{state}</td>
              <td>{bank_name}</td>
            </tr>
          );
        }
      );
  };

  return (
    <div className="App">
      <h1>Banker Application</h1>
      <div className="app_top">
        <div>
          <DropdownButton
            alignRight
            title={value}
            id="dropdown-menu"
            onSelect={handleSelect}
          >
            <Dropdown.Item eventKey="Bangalore">Banglore</Dropdown.Item>
            <Dropdown.Item eventKey="Mumbai">Mumbai</Dropdown.Item>
            <Dropdown.Item eventKey="Delhi">Delhi</Dropdown.Item>
            <Dropdown.Item eventKey="Nagpur">Nagpur</Dropdown.Item>
            <Dropdown.Item eventKey="Bhopal">Bhopal</Dropdown.Item>
          </DropdownButton>
        </div>
        <div>
          <input
            placeholder="Number of Result"
            onChange={(event) => setLimit(event.target.value)}
          />
        </div>
        <div>
          <SearchField
            placeholder="Search..."
            onChange={onChange}
            searchText=""
            classNames="test-class"
          />
        </div>
      </div>
      <div className="tracking-table">
        <table id="employee">
          <thead>
            <tr>{renderHeader()}</tr>
          </thead>
          <tbody>{renderBody()}</tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
