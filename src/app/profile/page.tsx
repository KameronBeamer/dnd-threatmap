'use client'

import { ResultProvider } from "@/context/apiContext"
import WeaponSearch from "@/components/weaponField";
import SpellSearch from "@/components/spellField";
import { UserProvider } from "@/context/userContext";
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

