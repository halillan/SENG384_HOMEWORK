import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

function RegistrationForm() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Basic email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      await axios.post(`${API_URL}/people`, {
        full_name: fullName,
        email: email
      });
      setSuccess('Registration successful!');
      setFullName('');
      setEmail('');
      setTimeout(() => navigate('/people'), 1500);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError('Error submitting form.');
      }
    }
  };

  return (
    <div className="container">
      <div className="card form-card">
        <h2>Register Person</h2>
        {error && <div className="alert error">{error}</div>}
        {success && <div className="alert success">{success}</div>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Full Name</label>
            <input 
              type="text" 
              value={fullName} 
              onChange={(e) => setFullName(e.target.value)} 
              required 
              placeholder="e.g. John Doe"
            />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              placeholder="e.g. john@example.com"
            />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        <div className="link-container">
          <Link to="/people" className="btn btn-secondary">View People List</Link>
        </div>
      </div>
    </div>
  );
}

function PeopleList() {
  const [people, setPeople] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [editForm, setEditForm] = useState({ full_name: '', email: '' });

  const fetchPeople = async () => {
    try {
      const response = await axios.get(`${API_URL}/people`);
      setPeople(response.data);
    } catch (err) {
      console.error('Error fetching people', err);
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/people/${id}`);
      setDeletingId(null);
      fetchPeople();
    } catch (err) {
      console.error('Error deleting person', err);
    }
  };

  const startEdit = (person) => {
    setEditingId(person.id);
    setEditForm({ full_name: person.full_name, email: person.email });
  };

  const handleEditSubmit = async (id) => {
    try {
      await axios.put(`${API_URL}/people/${id}`, editForm);
      setEditingId(null);
      fetchPeople();
    } catch (err) {
      console.error('Error updating person', err);
      alert('Error updating person. Maybe email already exists.');
    }
  };

  return (
    <div className="container">
      <div className="card list-card">
        <h2>People List</h2>
        <div className="link-container-top">
           <Link to="/" className="btn btn-secondary">← Back to Registration</Link>
        </div>
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {people.map((person) => (
                <tr key={person.id}>
                  <td>{person.id}</td>
                  <td>
                    {editingId === person.id ? (
                      <input 
                        type="text" 
                        value={editForm.full_name} 
                        onChange={(e) => setEditForm({...editForm, full_name: e.target.value})} 
                      />
                    ) : (
                      person.full_name
                    )}
                  </td>
                  <td>
                    {editingId === person.id ? (
                      <input 
                        type="email" 
                        value={editForm.email} 
                        onChange={(e) => setEditForm({...editForm, email: e.target.value})} 
                      />
                    ) : (
                      person.email
                    )}
                  </td>
                  <td>
                    {editingId === person.id ? (
                      <div className="action-buttons">
                        <button onClick={() => handleEditSubmit(person.id)} className="btn btn-success">Save</button>
                        <button onClick={() => setEditingId(null)} className="btn btn-warning">Cancel</button>
                      </div>
                    ) : deletingId === person.id ? (
                      <div className="action-buttons">
                        <span style={{marginRight: '8px', fontSize: '0.9em', color: '#d9534f', fontWeight: '500'}}>Sure?</span>
                        <button onClick={() => handleDelete(person.id)} className="btn btn-delete">Yes</button>
                        <button onClick={() => setDeletingId(null)} className="btn btn-secondary">No</button>
                      </div>
                    ) : (
                      <div className="action-buttons">
                        <button onClick={() => startEdit(person)} className="btn btn-edit">Edit</button>
                        <button onClick={() => setDeletingId(person.id)} className="btn btn-delete">Delete</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              {people.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center">No people found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<RegistrationForm />} />
      <Route path="/people" element={<PeopleList />} />
    </Routes>
  );
}

export default App;
