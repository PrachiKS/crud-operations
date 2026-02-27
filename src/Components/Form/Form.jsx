import { useContext } from "react";

//Context
import { UserContext } from "../../Context/UserContextProvider"

//Redux
import {useDispatch, useSelector } from "react-redux";
import { setUser, setUsersList} from "../../Redux/Slice/State/userSlice";

const Form = () => {
    // const {user, handleSubmit, handlechange} = useContext(UserContext)
   
    const dispatch = useDispatch();
    const{user} = useSelector((state) => state.user);

    const handlechange = (e) => {
      const {name, value} = e.target;
      dispatch(setUser({[name]:value}))
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(setUsersList({...user, id:crypto.randomUUID()}))
      dispatch(setUser({
        name: "",
        email: "",
        phone: "",
        password: ""
      }))
    }

    return (
    <div className="form">
        <h2>Create Record</h2>
        <form onSubmit={handleSubmit}>

          <input type="text" placeholder='Name' name="name" value={user.name} onChange={handlechange} />
          <br /><br />
          <input type="email" placeholder='Email' name="email" value={user.email} onChange={handlechange} />
          <br /><br />
          <input type="number" placeholder='Phone' name="phone" value={user.phone} onChange={handlechange} />
          <br /><br />
          <input type="password" placeholder='Password' name="password" value={user.password} onChange={handlechange} />
          <br /><br />
          <button>{user.id ? "update" : "Save"}</button>
        </form>
      </div>

  )
}

export default Form