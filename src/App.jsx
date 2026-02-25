import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: ""
  });

  const [users, setUsersList] = useState([])

  const handlechange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(user);

    if(user.id){
      const updatedUsers = users.map((item)=>
       item.id === user.id ? {...user} : item
      )
      setUsersList(updatedUsers)
    }else{
       setUsersList([...users, { ...user, id: crypto.randomUUID() }])
    }
    
    setUser({
      name: "",
      email: "",
      phone: "",
      password: ""
    })
  };

  const handleEdit = (item) => {
    setUser(item);
    console.log(item)
  }
  const handleDelete = (id) => {
    const updatedUsers = users.filter((item)=>{
      return id !== item.id
    });
    setUsersList(updatedUsers);
  }



  return (
    <div className="container">
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

      <div className="table">
        <h2>Records</h2>
        <table>
          <thead>
            <tr>
              <td>S.no</td>
              <td>Name</td>
              <td>Email</td>
              <td>Phone</td>
              <td>Password</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>{users.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
              <td>{item.password}</td>
              <td
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "5px"
                }}
              >
                <button onClick={() => handleEdit(item)}>Edit</button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App
