export default async function page() {
  const users = await fetch("/api/submitForm", {
    method: "GET",
  });
  console.log(users);
  return <div>page</div>;
}
