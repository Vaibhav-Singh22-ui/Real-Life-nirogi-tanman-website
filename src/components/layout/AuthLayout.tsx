import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <main className="container flex min-h-screen items-center justify-center py-10">
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
