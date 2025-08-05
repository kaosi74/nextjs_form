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

    const submitPost = await fetch("/api/submitForm", {
      method: "POST",
      body: JSON.stringify(formData),
    });
    
    if (submitPost) {
      console.log("Form Submitted");
    }
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
