'use client'

import { ResultProvider } from "@/context/apiContext"
import WeaponSearch from "@/components/weaponField";
import SpellSearch from "@/components/spellField";
import { useContext, useState } from "react";
import { UserContext, UserProvider } from "@/context/userContext";
import Navbar from "@/components/navbar";

export default function ProfilePage() {
  return (
	<UserProvider>
	  <ResultProvider>
		<Navbar />
		<WeaponSearch />
		<SpellSearch />
	  </ResultProvider>
	</UserProvider>
  )
}

function ProfileContent() {
	const { user, profile, saveProfile, refreshProfile } = useContext(UserContext);
	const [edit, setEdit] = useState(false);
	const [temp, setTemp] = useState(profile);

	if (!user) return <p className="p-4">Please log in to view your profile.</p>;

	const handleSave = () => {
		saveProfile(temp);
		setEdit(false);
	};

	const handleCancel = () => {
		setTemp(profile);
		setEdit(false);
	};

	return (
		<div className="p-6 space-y-4">
		<img src={user.photoURL || ""} className="w-20 h-20 rounded-full" />
		<h2>{user.displayName}</h2>
		<p>{user.email}</p>

		{edit ? (
			<div className="space-y-2">
			<input value={temp.occupation} onChange={(e) => setTemp({ ...temp, occupation: e.target.value })} placeholder="Occupation" />
			<input value={temp.organization} onChange={(e) => setTemp({ ...temp, organization: e.target.value })} placeholder="Organization" />
			<input value={temp.linkedin} onChange={(e) => setTemp({ ...temp, linkedin: e.target.value })} placeholder="LinkedIn URL" />
			<input value={temp.github} onChange={(e) => setTemp({ ...temp, github: e.target.value })} placeholder="GitHub URL" />
			<button onClick={handleSave}>Save</button>
			<button onClick={handleCancel}>Cancel</button>
			</div>
		) : (
		<div>
		<p>Occupation: {profile.occupation}</p>
		<p>Organization: {profile.organization}</p>
		<p>
		LinkedIn: <a href={profile.linkedin} target="_blank">{profile.linkedin}</a>
		</p>
		<p>
		GitHub: <a href={profile.github} target="_blank">{profile.github}</a>
		</p>
		<button onClick={() => setEdit(true)}>Edit</button>
		</div>
		)}
		</div>
	);
}
