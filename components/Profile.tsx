"use client";
import { useState } from "react";
import Image from "next/image";
import { redirect } from "next/navigation";

export default function Profile({ user }: any) {  
  const { profile, name, avatarUrl, userSkills } = user;
  const [newApiKey, setNewApiKey] = useState<string>("");

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
              <div className="p-4 bg-slate-800 rounded-lg flex justify-center items-center text-center hover:bg-slate-600">
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
          onClick={() => alert("API KEY SET")}
        >
          Set
        </button>
      </div>
    </div>
  );
}
