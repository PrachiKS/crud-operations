import { createContext , useState} from "react";

export const UserContext = createContext()

const UserContextProvider = ({ children }) => {
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
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(user);

        if (user.id) {
            const updatedUsers = users.map((item) =>
                item.id === user.id ? { ...user } : item
            )
            setUsersList(updatedUsers)
        } else {
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
    };

    const handleDelete = (id) => {
        const updatedUsers = users.filter((item) => {
            return id !== item.id
        });
        setUsersList(updatedUsers);
    };

    return (
        <UserContext.Provider value={{ user, users, handlechange, handleSubmit, handleEdit, handleDelete }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider