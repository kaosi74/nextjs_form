import connectMongo from "../../../lib/mongodb";
import Form from "../../../models/Form";

interface User {
  _id: number;
  username: string;
  email: string;
  password: string;
}

export default async function UsersPage() {
  await connectMongo();
  const users: User[] = await Form.find({});

  return (
    <main>
      <h1>🧾 Submitted Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            <strong>{user.username}</strong> – {user.email}
          </li>
        ))}
      </ul>
    </main>
  );
}
