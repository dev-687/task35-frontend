import { useEffect, useState } from 'react'
import './App.css'
import CreateUser from './components/CreateUser'
import CreatePost from './components/CreatePost'
import ListPost from './components/ListPost'
import axios from 'axios'

function App() {
  const [authors, setAuthors] = useState([]);
  const baseUrl = "https://task35-backend.vercel.app";
  const api_version = "api/v1";
  useEffect(() => {
    axios.get(`${baseUrl}/${api_version}/users`)
        .then(response => setAuthors(response.data))
        .catch(error => console.error("Error fetching users:", error));
}, []);

const refreshUsers = async () => {
  const response = await axios.get(`${baseUrl}/${api_version}/users`);
  setAuthors(response.data);
};

  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      <div style={{ flex: '1' }}>
        <CreateUser refreshUsers={refreshUsers}  />
        <CreatePost authors={authors} />
      </div>
      <div style={{ flex: '3' }}>
        <ListPost />
      </div>
    </div>
  )
}

export default App
