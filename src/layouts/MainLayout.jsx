import { Outlet } from "react-router";
import Header from "../components/Header";

const MainLayout = () => {
  return (
    <>
      <main className="max-w-3xl mx-auto">
        <Header />
        <section className="container mx-auto py-24" px-6>
          <Outlet />
        </section>
      </main>
    </>
  );
};

export default MainLayout;
