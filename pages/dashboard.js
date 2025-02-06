import { useSession, signOut } from "next-auth/react";

export default function Dashboard() {
  const { data: session } = useSession();

  if (!session) {
    return <p>Access Denied. Please Sign In.</p>;
  }

  return (
    <div>
      <h1>Welcome, {session.user.name}</h1>
      <p>Email: {session.user.email}</p>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
}
