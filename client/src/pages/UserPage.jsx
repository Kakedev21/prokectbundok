import UserHeader from "../components/UserHeader";
import Nav from "../components/Nav";

const UserPage = () => {
  return (
    <>
      <Nav />
      <div className="bg-white container mx-auto h-screen">
        <UserHeader />
        <div>UserPage</div>
      </div>
    </>
  );
};

export default UserPage;
