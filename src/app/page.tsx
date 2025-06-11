'use client'

import { ResultProvider } from "@/context/apiContext"
import Navbar from "../components/navbar";
import WeaponSearch from "@/components/weaponField";
import SpellSearch from "@/components/spellField";
import { UserProvider, UserContext } from "@/context/userContext";
import { useContext } from "react";

export default function HomePage() {
  return (
    <UserProvider>
      <ResultProvider>
        <Navbar />
        <Main />
        <WeaponSearch />
        <SpellSearch />
      </ResultProvider>
    </UserProvider>
  )
}

function Main() {
  const { user } = useContext(UserContext);
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">
        {user ? `Welcome, ${user.displayName}` : "Hey, log in."}
      </h1>
    </div>
  );
}
