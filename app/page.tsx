"use client"

import AuthButton from "../components/AuthButton";

export default function Index() {
  return (
    <div>
      <nav>
        <div className="text-3xl hover:text-2xl font-bold underline">
          <AuthButton />
        </div>
      </nav>
    </div>
  );
}
