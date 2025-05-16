import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';

export function UserProfile() {
  const { user } = useContext(UserContext);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <p>Name: {user?.name}</p>
        <p>Email: {user?.email}</p>
        <p>Role: {user?.role}</p>
      </div>
    </div>
  );
}