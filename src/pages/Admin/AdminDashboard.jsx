import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminDashboard() {
    const [users, setUsers] = useState([]);
    const [factories, setFactories] = useState([]);

    // Fetch users from the backend
    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/user/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    // Fetch factories from the backend
    const fetchFactories = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/factory/factories');
            setFactories(response.data);
        } catch (error) {
            console.error('Error fetching factories:', error);
        }
    };

    // Delete user
    const deleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/user/users/${id}`);
            fetchUsers(); // Refresh the user list
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    // Delete factory
    const deleteFactory = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/factory/factories/${id}`);
            fetchFactories(); // Refresh the factory list
        } catch (error) {
            console.error('Error deleting factory:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
        fetchFactories();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="mx-auto max-w-6xl">
                {/* Users Section */}
                <div className="mb-16">
                    <h1 className="section-title">User Management</h1>
                    <p className="section-description mt-4">
                        Manage users in your system. View, update, or delete users as needed.
                    </p>
                    <div className="overflow-x-auto rounded-lg border border-[#222]/10 bg-white shadow-lg mt-6">
                        <table className="w-full table-auto">
                            <thead>
                                <tr className="bg-gray-200 text-left text-black/80">
                                    <th className="px-6 py-3 text-sm font-medium">Name</th>
                                    <th className="px-6 py-3 text-sm font-medium">Email</th>
                                    <th className="px-6 py-3 text-sm font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user._id} className="text-black/80 even:bg-gray-50">
                                        <td className="px-6 py-4 text-sm">{user.username}</td>
                                        <td className="px-6 py-4 text-sm">{user.email}</td>
                                        <td className="px-6 py-4 text-sm">
                                            <button
                                                className="btn btn-primary hover:bg-[#001e80]"
                                                onClick={() => deleteUser(user._id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {users.length === 0 && (
                            <p className="py-4 text-center text-sm text-gray-500">
                                No users found. Add new users to get started.
                            </p>
                        )}
                    </div>
                </div>

                {/* Factories Section */}
                <div>
                    <h1 className="section-title">Factory Management</h1>
                    <p className="section-description mt-4">
                        Manage factories in your system. View, update, or delete factories as needed.
                    </p>
                    <div className="overflow-x-auto rounded-lg border border-[#222]/10 bg-white shadow-lg mt-6">
                        <table className="w-full table-auto">
                            <thead>
                                <tr className="bg-gray-200 text-left text-black/80">
                                    <th className="px-6 py-3 text-sm font-medium">Factory Name</th>
                                    <th className="px-6 py-3 text-sm font-medium">Email</th>
                                    <th className="px-6 py-3 text-sm font-medium">Phone Number</th>
                                    <th className="px-6 py-3 text-sm font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {factories.map((factory) => (
                                    <tr key={factory._id} className="text-black/80 even:bg-gray-50">
                                        <td className="px-6 py-4 text-sm">{factory.factoryName}</td>
                                        <td className="px-6 py-4 text-sm">{factory.email}</td>
                                        <td className="px-6 py-4 text-sm">{factory.phone_number}</td>
                                        <td className="px-6 py-4 text-sm">
                                            <button
                                                className="btn btn-primary hover:bg-[#001e80]"
                                                onClick={() => deleteFactory(factory._id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {factories.length === 0 && (
                            <p className="py-4 text-center text-sm text-gray-500">
                                No factories found. Add new factories to get started.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
