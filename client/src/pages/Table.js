import axios from "axios";
import { useEffect, useState } from "react";

const Table = () => {
  const [users, setUsers] = useState([]);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    setLoader(true);
    axios.get("http://localhost:3001/getUser").then((res) => {
      setUsers(res?.data?.data);
      setLoader(false);
    });
  }, []);
  return (
    <div class="table_responsive">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Username</th>
          </tr>
        </thead>

        <tbody>
          {loader ? (
            <div class="spinner-border spinner-border-sm" role="status"></div>
          ) : (
            users?.map((obj, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{obj?.name ? obj?.name : "Not available"}</td>
                  <td>{obj?.email ? obj?.email : "Not available"}</td>
                  <td>{obj?.username ? obj?.username : "Not available"}</td>
                </tr>
              );
            })
          )}
        </tbody>
        <a href="/admin" class="float">
          <i class="fas fa-arrow-circle-left my-float"></i>
        </a>
      </table>
    </div>
  );
};
export default Table;
