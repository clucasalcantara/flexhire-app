import Image from "next/image";

export default async function Profile({ user }: any) {
  const { profile, name, avatarUrl } = user;

  return (
    <div className="p-32 flex flex-col gap-8">
        <Image src={avatarUrl} width={200} height={200} alt="User profile image" />
      <h2 className="text-xl bold">{name}</h2>
      <span>
        {profile.fullAddress} - {profile.totalExperience}y of experience
      </span>
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">Intro</h2>
        <p>{profile.textIntroduction}</p>
      </div>
    </div>
  );
}
