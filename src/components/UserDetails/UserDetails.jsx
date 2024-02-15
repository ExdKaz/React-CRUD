import React from "react";
import "./UserDetails.css";
import { useEffect } from "react";
import { getUsersList } from "../../service/UserService";
import {
  TableRow,
  TableHeaderCell,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "semantic-ui-react";
import { useState } from "react";
import { Button } from "semantic-ui-react";
import { deleteUserData } from "../../service/UserService";
import { Link } from "react-router-dom"; // Import Link from React Router

function formatDate(dateString) {
  const options = { day: "numeric", month: "short", year: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

function UserDetails() {
  const [users, setUsers] = useState([]);
  const deleteUser = (id) => {
    deleteUserData(id)
      .then(() => {
        console.log("User Deleted Successfully");
        getUsersList().then((result) => {
          console.log("Updated User List:", result);
          setUsers(result);
        });
      })
      .catch((err) => {
        console.error("Error Deleting User:", err);
      });
  };

  useEffect(() => {
    getUsersList()
      .then((result) => {
        setUsers(result);
      })
      .catch((error) => {});
  }, []);

  return (
    <>
      <Table singleLine>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Email ID</TableHeaderCell>
            <TableHeaderCell>Phone</TableHeaderCell>
            <TableHeaderCell>Course</TableHeaderCell>
            <TableHeaderCell>Gender</TableHeaderCell>
            <TableHeaderCell>Course Start Date</TableHeaderCell>
            <TableHeaderCell>Edit</TableHeaderCell>
            <TableHeaderCell>Delete</TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                {user.firstname}&nbsp;
                {user.lastname}
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{user.course.join(", ")}</TableCell>
              <TableCell>{user.gender}</TableCell>
              <TableCell>{formatDate(user.courseStartDate)}</TableCell>
              <TableCell>
                {/* Use Link from React Router to navigate to edit page with user ID */}
                <Link to={`/edit/${user.id}`}>
                  <Button color="violet">Edit</Button>
                </Link>
              </TableCell>
              <TableCell>
                <Button color="red" onClick={() => deleteUser(user.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default UserDetails;
