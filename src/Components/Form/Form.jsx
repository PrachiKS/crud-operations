import * as Yup from "yup"

import { useContext, useState } from "react";

//Context
import { UserContext } from "../../Context/UserContextProvider"

//Redux
import { useDispatch, useSelector } from "react-redux";
import { setUser, setUsersList, editUser } from "../../Redux/Slice/State/userSlice";

const Form = () => {
  // const {user, handleSubmit, handlechange} = useContext(UserContext)

  const dispatch = useDispatch();
  const { user, users } = useSelector((state) => state.user);

  const [errors, setErrors] = useState({})

  const handlechange = (e) => {
    const { name, value } = e.target;
    dispatch(setUser({ [name]: value }))
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalide Email Format").required("Email is required"),
    phone: Yup.string().matches(/^[6-9]\d{9}$/, "Invalide Phone Number").required("Phone is required"),
    password: Yup.string().matches(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&@? "])[a-zA-Z0-9!#$%&@?]{8,20}$/, "Enter The Strong Password").required("Password is required")
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate(user, {abortEarly:false})
      if (user.id) {
        const updatedUsers = users.map((item) =>
          item.id === user.id ? { ...user } : item
        );
        dispatch(editUser(updatedUsers));
      } else {
        dispatch(setUsersList({ ...user, id: crypto.randomUUID() }));
      }

      dispatch(setUser({
        name: "",
        email: "",
        phone: "",
        password: ""
      }));
      setErrors({})
    } catch (error) {
        const validationErrors = {};
        if (error.inner){
          error.inner.forEach((err) =>{
            validationErrors[err.path] = err.message
          })
        }
        setErrors(validationErrors)
    }
  };
  console.log(errors)

  return (
    <div className="form">
      <h2>Create Record</h2>
      <form onSubmit={handleSubmit}>

        <input type="text" placeholder='Name' name="name" value={user.name} onChange={handlechange} />
        <br />
        {errors && errors.name && (
          <>
          <span>{errors.name}</span><br />
          </>
        )}
        <br />
        <input type="email" placeholder='Email' name="email" value={user.email} onChange={handlechange} />
        <br />
        {errors && errors.email && (
          <>
          <span>{errors.email}</span><br />
          </>
        )}
        <br />
        <input type="number" placeholder='Phone' name="phone" value={user.phone} onChange={handlechange} />
        <br />
        {errors && errors.phone && (
          <>
          <span>{errors.phone}</span><br />
          </>
        )}
        <br />
        <input type="password" placeholder='Password' name="password" value={user.password} onChange={handlechange} />
        <br />
        {errors && errors.password && (
          <>
          <span>{errors.password}</span><br />
          </>
        )}
        <br />
        <button>{user.id ? "update" : "Save"}</button>
      </form>
    </div>

  )
}

export default Form