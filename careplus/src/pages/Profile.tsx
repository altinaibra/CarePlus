import React, { useState, ChangeEvent, FormEvent } from "react";

interface ProfileData {
  firstName: string;
  lastName: string;
  age: string;
  email: string;
  contact: string;
}

const Profile: React.FC = () => {
  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: "",
    lastName: "",
    age: "",
    email: "",
    contact: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Profile saved:", profileData);
    alert("Profile saved successfully!");
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white dark:[background-color:oklch(25%_0_0)] rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        Profile
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-200">
            First Name:
          </label>
          <input
            type="text"
            name="firstName"
            value={profileData.firstName}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] rounded-md bg-white dark:[background-color:oklch(20.5%_0_0)] text-gray-900 dark:text-gray-100"
          />
        </div>


        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-200">
            Last Name:
          </label>
          <input
            type="text"
            name="lastName"
            value={profileData.lastName}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] rounded-md bg-white dark:[background-color:oklch(20.5%_0_0)] text-gray-900 dark:text-gray-100"
          />
        </div>


        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-200">
            Age:
          </label>
          <input
            type="number"
            name="age"
            value={profileData.age}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] rounded-md bg-white dark:[background-color:oklch(20.5%_0_0)] text-gray-900 dark:text-gray-100"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-200">
            Email:
          </label>
          <input
            type="email"
            name="email"
            value={profileData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] rounded-md bg-white dark:[background-color:oklch(20.5%_0_0)] text-gray-900 dark:text-gray-100"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-200">
            Contact:
          </label>
          <input
            type="text"
            name="contact"
            value={profileData.contact}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] rounded-md bg-white dark:[background-color:oklch(20.5%_0_0)] text-gray-900 dark:text-gray-100"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 mt-4 rounded-md font-bold text-white bg-slate-700 dark:[background-color:oklch(47.6%_0.114_61.907)] hover:bg-slate-800 transition"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
