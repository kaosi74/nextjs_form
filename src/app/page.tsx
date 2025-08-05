"use client";

export default function Page() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      username: (
        e.currentTarget.elements.namedItem("username") as HTMLInputElement
      ).value,
      email: (e.currentTarget.elements.namedItem("email") as HTMLInputElement)
        .value,
      password: (
        e.currentTarget.elements.namedItem("password") as HTMLTextAreaElement
      ).value,
    };
    await fetch("/api/submitForm", {
      method: "POST",
      body: JSON.stringify(formData),
    });
    e.currentTarget.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" placeholder="User Name" required />
      <input name="email" type="email" placeholder="Email" required />
      <input name="password" placeholder="Password" required />
      <button type="submit">Submit</button>
    </form>
  );
}
