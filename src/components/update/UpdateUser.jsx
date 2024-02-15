import { React, useState, useEffect } from "react";
import "./UpdateUser.css";
import { CardHeader, CardContent, Card } from "semantic-ui-react";
import { FormField, Button, Form, FormSelect } from "semantic-ui-react";
import { Dropdown } from "semantic-ui-react";
import SemanticDatepicker from "react-semantic-ui-datepickers";
import "react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css";
import { registerUserData } from "../../service/UserService";
import { useNavigate, useParams } from "react-router-dom";
import { getUsersList, updateUserData } from "../../service/UserService";

function UpdateUser() {
  const navigate = useNavigate();
  var user = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phone: "",
    course: [],
    gender: "",
    courseStartDate: "",
  };
  const { userId } = useParams(); // Fetch userId from URL params
  var [users, setUserData] = useState(user);

  const options = [
    { key: "angular", text: "Angular", value: "Angular" },
    { key: "react", text: "React", value: "React" },
    { key: "vue", text: "Vue", value: "Vue" },
    { key: "java", text: "Java", value: "Java" },
  ];
  const gen = [
    { key: "m", text: "Male", value: "male" },
    { key: "f", text: "Female", value: "female" },
    { key: "o", text: "Other", value: "other" },
  ];

  useEffect(() => {
    getUsersList()
      .then((result) => {
        users = result.filter((user) => user.id === parseInt(userId));
        setUserData(users[0]);
        console.log(users);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, [userId]);

  const handleChange = (event, data) => {
    const { name, value } = data || event.target;

    // Capitalize the first letter of the value
    const capitalizedValue =
      name === "email" ||
      name === "password" ||
      name === "course" ||
      name === "gender" ||
      name === "courseStartDate"
        ? value
        : value.charAt(0).toUpperCase() + value.slice(1);

    setUserData({
      ...users,
      [name]: capitalizedValue,
    });
  };

  const updateUser = () => {
    console.log(users);
    updateUserData(userId, users)
      .then((result) => {
        navigate("/getUsers");
      })
      .catch((error) => {
        alert("error");
      });
  };

  return (
    <>
      <Card>
        <CardContent>
          <CardHeader className="heading">Update User</CardHeader>

          <Form className="form" onSubmit={updateUser}>
            <FormField className="ff">
              <label>First Name</label>
              <input
                placeholder="First Name"
                onChange={handleChange}
                name="firstname"
                value={users.firstname}
              />
            </FormField>
            <FormField className="ff">
              <label>Last Name</label>
              <input
                placeholder="Last Name"
                onChange={handleChange}
                name="lastname"
                value={users.lastname}
              />
            </FormField>
            <FormField className="ff">
              <label>Email</label>
              <input
                placeholder="Email"
                type="email"
                onChange={handleChange}
                name="email"
                value={users.email}
              />
            </FormField>
            <FormField className="ff">
              <label>Password</label>
              <input
                placeholder="Enter Password"
                type="password"
                onChange={handleChange}
                name="password"
                value={users.password}
              />
            </FormField>
            <FormField className="ff">
              <label>Phone</label>
              <input
                placeholder="Enter Phone"
                type="number"
                onChange={handleChange}
                name="phone"
                value={users.phone}
              />
            </FormField>
            <FormField className="ff">
              <label>Select Courses</label>
              <Dropdown
                placeholder="Skills"
                fluid
                multiple
                selection
                options={options}
                onChange={handleChange}
                name="course"
                value={users.course || []}
              />
            </FormField>
            <FormField className="ff">
              <FormSelect
                fluid
                label="Gender"
                options={gen}
                placeholder="Gender"
                onChange={handleChange}
                name="gender"
                value={users.gender}
              />
            </FormField>

            {/* <FormField className="ff">
              <label>Select Course Start Date</label>
              <SemanticDatepicker
                onChange={(event, data) =>
                  handleChange(event, {
                    name: "courseStartDate",
                    value: data.value,
                  })
                }
                // value={users.courseStartDate}
                name="courseStartDate"
              />
            </FormField> */}
            <Button primary className="btn grid-col-span-2" type="submit">
              Submit
            </Button>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}

export default UpdateUser;
