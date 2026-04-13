const AllPage = () => {
  return <div>All Page</div>;
  };

  export default AllPage;

  export async function loader(params: { request: Request }) {
    const response = await fetch("/api/workouts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  