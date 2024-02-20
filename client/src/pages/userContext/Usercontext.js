import axios from "axios";
import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../services/helper";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const authToken = "webdyubdybboxsbjoB643";
    const [username, setLoggedInUsername] = useState(null);
    const [id, setId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${BACKEND_URL}/profile`, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
            withCredentials: true,
        }).then(response => {
            if (response.data) {
                setId(response.data.userData.id);
                setLoggedInUsername(response.data.userData.email);
            } else {
                navigate('/');
            }
        }).catch(error => {
            navigate('/');
        });
    }, []);

    return (
        <UserContext.Provider value={{ username, setLoggedInUsername, id, setId }}>
            {children}
        </UserContext.Provider>
    );
}

UserContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};