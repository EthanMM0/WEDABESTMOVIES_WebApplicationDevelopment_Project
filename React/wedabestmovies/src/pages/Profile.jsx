import React, { useContext } from 'react';
import { AuthContext } from '../App';
import '../components/Profile.css';

const Profile = () => {
  const { user, signOut } = useContext(AuthContext);

  return (
    <div>
      <h2>My Profile</h2>
      {user ? (
        <div>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Age:</strong> {user.age}</p>
          <p><strong>Username:</strong> {user.username}</p>
          <button onClick={signOut}>Sign Out</button>
        </div>
      ) : (
        <p>Please log in to view your profile.</p>
      )}
    </div>
  );
};

export default Profile;
