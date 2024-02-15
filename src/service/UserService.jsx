import axios from "axios";

const baseUrl = "http://localhost:1000/users/";

var getUsersList = async () => {
  var res = await axios.get(baseUrl);
  //   console.log(res.data);
  return res.data;
};

var registerUserData = (data) => {
  return axios
    .post(baseUrl, data)
    .then((res) => {
      alert("User Registered Successfully");
    })
    .catch((err) => {
      alert("Error Registering User");
    });
};

var deleteUserData = (id) => {
  return axios
    .delete(baseUrl + id)
    .then((res) => {
      alert("User Deleted Successfully");
    })
    .catch((err) => {
      alert("Error Deleting User");
    });
};

var updateUserData = (id, data) => {
  return axios
    .put(baseUrl + id, data)
    .then((res) => {
      alert("User Updated Successfully");
    })
    .catch((err) => {
      alert("Error Updating User");
    });
};

export { getUsersList, registerUserData, deleteUserData, updateUserData };
