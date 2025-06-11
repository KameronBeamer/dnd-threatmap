import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import Image from 'next/image';

export default function Navbar() {
	const { user, login, logout } = useContext(UserContext);

	return (
		<nav className="flex justify-between items-center px-6 py-4 bg-blue-600 text-white">
			<Link href="/">Home</Link>
			<div className="flex items-center gap-4">
				{!user ? (
					<button onClick={login}>Login</button>
				) : (
					<>
						{user.photoURL && (
							<img
								src={user.photoURL}
								alt="User"
								className="h-8 w-8 rounded-full"
							/>
						)}
						<Link href="/profile">Profile</Link>
						<button onClick={logout}>Logout</button>
					</>
				)}
			</div>
		</nav>
	);
}
