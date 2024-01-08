"use client";

import { useState } from "react";
import { toast } from "react-toastify"; 
import Image from "next/image";

const refetchUserData = async (newApiKey: string) => {
  const response = await fetch('/api/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ apiKey: newApiKey })
  });

  const { userData } = await response.json();

  return userData;
}

export default function Profile({ user }: any) {
  const [userData, setUserData] = useState<any>(user || {});
  const { profile = {}, name, avatarUrl, userSkills = [] } = userData;
  const [newApiKey, setNewApiKey] = useState<string>("");

  const handleSetNewApiKey = () => {
    try {
      localStorage.setItem('FLEXHIRE-API-KEY', newApiKey);
      toast.success("API KEY set successfully! Refreshing...", {
        onClose: async () => {
          try {
            const newUserData = await refetchUserData(newApiKey);

            setUserData(newUserData);
          } catch (e: any) {
            throw new Error(e);
          }
        }
      });
    } catch (e) {
      toast.error("Error setting API KEY");
    }
  };

  return (
    <div className="p-8 lg:p-32 flex flex-col gap-2 w-full bg-slate-700 relative">
      <div className="flex flex-col gap-6">
        <Image
          src={avatarUrl}
          width={200}
          height={200}
          alt="User profile image"
        />
        <h2 className="text-2xl bold">{name}</h2>
      </div>
      <span>
        {profile.fullAddress} - {profile.totalExperience}y of experience
      </span>
      <div className="flex flex-col gap-4 py-6">
        <h2 className="text-2xl font-bold">Intro</h2>
        <p>{profile.textIntroduction}</p>
      </div>
      <div>
        <h2 className="text-2xl font-bold">Skills</h2>
        <div className="flex w-full justify-center mt-8">
          <div className="flex flex-col lg:grid lg:grid-cols-5 gap-4">
            {userSkills.map(({ skill }: any) => (
              <div key={skill.name} className="p-4 bg-slate-800 rounded-lg flex justify-center items-center text-center hover:bg-slate-600">
                <span className="text-white">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="hidden lg:flex absolute right-32 top-16 flex-row gap-4">
        <input
          type="text"
          name="apiKey"
          placeholder="Set New API KEY"
          className="py-2 px-4 rounded-lg min-w-[300px] text-neutral-800"
          value={newApiKey}
          onChange={({ target: { value } }) => setNewApiKey(value)}
        />
        <button
          disabled={newApiKey.length < 5}
          className={`cursor-pointer ${
            newApiKey.length < 5
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500"
          } rounded-lg py-2 px-4 text-white`}
          onClick={handleSetNewApiKey}
        >
          Set
        </button>
      </div>
    </div>
  );
}
