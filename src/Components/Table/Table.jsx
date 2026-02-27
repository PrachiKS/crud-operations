import { useContext } from "react"

//Context
import { UserContext } from "../../Context/UserContextProvider"

//Redux
import {useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../../Redux/Slice/State/userSlice";


const Table = () => {
    // const {users, handleDelete, handleEdit} = useContext(UserContext)

    const dispatch = useDispatch();
    const{users} = useSelector((state) => state.user);

    const handleDelete = (id) =>{
      const updatedUsers = users.filter((item) => {
        return id !== item.id;
      });
      dispatch(deleteUser(updatedUsers));
    }

  return (
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
  )
}

export default Table