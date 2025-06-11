import { createContext, useEffect, useState } from "react";
import { auth, provider, db } from "../firebase/config";
import {
	signInWithPopup,
	signOut,
	onAuthStateChanged,
	User as FirebaseUser,
} from "firebase/auth";
import { doc, getDoc, setDoc, } from "firebase/firestore";

export interface ProfileSettings {
	occupation: string;
	organization: string;
	linkedin: string;
	github: string;
}

interface UserContextProps {
	user: FirebaseUser | null;
	profile: ProfileSettings;
	login: () => void;
	logout: () => void;
	saveProfile: (profile: ProfileSettings) => void;
	refreshProfile: () => void;
}

export const UserContext = createContext<UserContextProps>({
	user: null,
	profile: { occupation: "", organization: "", linkedin: "", github: "" },
	login: () => {},
	logout: () => {},
	saveProfile: () => {},
	refreshProfile: () => {}
});

export function UserProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<FirebaseUser | null>(null);
	const [profile, setProfile] = useState<ProfileSettings>({
		occupation: "",
		organization: "",
		linkedin: "",
		github: ""
	});

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			setUser(user);
			if (user) await fetchProfile(user.uid);
		});
		return unsubscribe;
	}, []);

	const login = async () => {
		const res = await signInWithPopup(auth, provider);
		setUser(res.user);
		await fetchProfile(res.user.uid);
	};

	const logout = async () => {
		await signOut(auth);
		setUser(null);
		setProfile({ occupation: "", organization: "", linkedin: "", github: "" });
	};

	const fetchProfile = async (uid: string) => {
		const ref = doc(db, "profiles", uid);
		const docSnap = await getDoc(ref);
		if (docSnap.exists()) {
			setProfile(docSnap.data() as ProfileSettings);
		}
	};

	const saveProfile = async (newProfile: ProfileSettings) => {
		if (!user) return;
		const ref = doc(db, "profiles", user.uid);
		await setDoc(ref, newProfile);
		setProfile(newProfile);
	};

	const refreshProfile = () => user && fetchProfile(user.uid);

	return (
		<UserContext.Provider value={{ user, profile, login, logout, saveProfile, refreshProfile }}>
		{children}
		</UserContext.Provider>
	);
}

