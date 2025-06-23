import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { Edit, Trash2,Plus } from 'lucide-react';
import { format } from 'date-fns';
import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import EditUserModal from './EditUserModal';
import AddUserModal from './AddUserModal';
import Swal from 'sweetalert2';
import '../../css/Admin.css';
import Export from './Export';


export const AdminInner = () => {
  const queryClient = useQueryClient();

  const [filterText, setFilterText] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');

  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [designation, setDesignation] = useState('');

const apiUrl = import.meta.env.VITE_API_URL;



  // ✅ Fetch all users
  const { data: users = [], isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: () =>
      axios.get(`${apiUrl}/userDetails`).then((res) => res.data),
  });

  // ✅ Add user mutation
  const addUserMutation = useMutation({
    mutationFn: (newUser) =>
      axios.post(`${apiUrl}/userDetails`, newUser),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setShowAddModal(false);
      setNewName('');
      setNewEmail('');
      setNewPassword('');
      setDesignation('');
      Swal.fire('Success', 'User added successfully!', 'success');
    },
    onError: () => {
      Swal.fire('Error', 'Failed to add user', 'error');
    },
  });

  // ✅ Update user mutation
  const updateUserMutation = useMutation({
    mutationFn: ({ id, updatedData }) =>
      axios.put(`${apiUrl}/userDetails/${id}`, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setShowModal(false);
      Swal.fire('Success', 'User updated successfully!', 'success');
    },
    onError: () => {
      Swal.fire('Error', 'Failed to update user', 'error');
    },
  });

  // ✅ Delete user mutation
  const deleteUserMutation = useMutation({
    mutationFn: (id) =>
      axios.delete(`${apiUrl}/userDetails/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      Swal.fire('Deleted!', 'User has been removed.', 'success');
    },
    onError: () => {
      Swal.fire('Error', 'Failed to delete user', 'error');
    },
  });

  const handleEdit = (item) => {
    setCurrentUser(item);
    setEditName(item.name);
    setEditEmail(item.email);
    setShowModal(true);
  };

  const handleDelete = (item) => {
    Swal.fire({
      title: `Delete ${item.name}?`,
      text: 'This action is irreversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUserMutation.mutate(item._id);
      }
    });
  };

  const handleSave = () => {
    const updatedUser = { ...currentUser, name: editName, email: editEmail };
    updateUserMutation.mutate({ id: currentUser._id, updatedData: updatedUser });
  };

  const handleAddUser = () => {
    const newUser = {
      name: newName,
      email: newEmail,
      password: newPassword,
      role: designation.toLowerCase(),
    };
    addUserMutation.mutate(newUser);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? 'Invalid Date' : format(date, 'dd/MM/yyyy hh:mm a');
  };

const filteredUsers = users
  .filter(user =>
    user.role !== 'admin' && 
    (user.name?.toLowerCase().includes(filterText.toLowerCase()) ||
     user.email?.toLowerCase().includes(filterText.toLowerCase()))
  )
  .sort((a, b) => a.name.localeCompare(b.name));

  const columns = [
    { name: 'Name', selector: (row) => row.name, sortable: true },
    { name: 'Email', selector: (row) => row.email, sortable: true },
    { name: 'Designation', selector: (row) => row.role, sortable: true },
    { name: 'Last Login', selector: (row) => formatDate(row.lastLogin) },
    { name: 'Last Logout', selector: (row) => formatDate(row.lastLogout) },
    {
      name: 'Actions',
      cell: (row) => (
        <>
          <Edit
           color='blue'
            size={18}
            onClick={() => handleEdit(row)}
            style={{ cursor: 'pointer', marginRight: 10 }}
          />
          <Trash2
          color='red'
            size={18}
            onClick={() => handleDelete(row)}
            style={{ cursor: 'pointer' }}
          />
        </>
      ),
    },
  ];

  const customStyles = {
    rows: {
      style: { backgroundColor: 'white', color: '#000' },
    },
    headCells: {
      style: { backgroundColor: '#fc9f00', color: 'white', fontWeight: 'bold' },
    },
  };

  return (
    <div className="container-fluid mt-4">
      <div className="row">
        <div className="col-md-12 mb-3">
          <div className="row">
            <div className="col-md-3 col-3 mb-3">
              <input
                type="text"
                placeholder="Search by name or email"
                className="form-control"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
              />
            </div>
            <div className="col-md-1 col-2 mb-3">
              <button
                className="btn btn-primary addBtn"
                onClick={() => setShowAddModal(true)}
              >
                Add User <span><Plus size={15} /></span>
              </button>
            </div>
              <div className=" col-2 mb-3">
              {/* <button
                className="btn btn-primary"   
              >
                Export Users
              </button> */}
              <Export users={filteredUsers} />
            </div>
          </div>

          <div className="table-responsive responsiveTable">
            <DataTable
              columns={columns}
              data={filteredUsers}
              pagination
              highlightOnHover
              persistTableHead
              customStyles={customStyles}
              progressPending={isLoading}
            />
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <EditUserModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSave}
        name={editName}
        email={editEmail}
        setName={setEditName}
        setEmail={setEditEmail}
      />

      {/* Add Modal */}
      <AddUserModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddUser}
        name={newName}
        email={newEmail}
        password={newPassword}
        setName={setNewName}
        setEmail={setNewEmail}
        setPassword={setNewPassword}
        setDesignation={setDesignation}
      />
    </div>
  );
};
