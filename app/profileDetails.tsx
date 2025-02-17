"use client";
import { useState } from "react";

export default function ProfileDetails() {
  const [profile, setProfile] = useState({
    name: "Your Name",
    license: "ABC12345",
    bio: "12345678",
    profilePicture: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log("Profile saved:", profile);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, profilePicture: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
      <div className="text-center mb-6">
        <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-gray-300 mb-4">
          <img
            src={profile.profilePicture}
            alt="Profile Picture"
            className="w-full h-full object-cover"
          />
        </div>

        {isEditing && (
          <div>
            <label className="block text-sm font-medium mb-2">Upload new picture</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="p-2 border rounded-md"
            />
          </div>
        )}
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">License</label>
          <input
            type="license"
            name="license"
            value={profile.license}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">ID</label>
          <textarea
            name="ID"
            value={profile.bio}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full p-2 border rounded-md"
          />
        </div>
      </div>

      <div className="mt-6 flex justify-between">
        {isEditing ? (
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
}
