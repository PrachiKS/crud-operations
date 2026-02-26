import { useContext } from "react"
import { UserContext } from "../Context/UserContextProvider"

const Form = () => {
    const {user, handleSubmit, handlechange} = useContext(UserContext)
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