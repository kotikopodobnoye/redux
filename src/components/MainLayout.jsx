import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <main className="min-h-screen w-full px-4 sm:px-8 md:px-12">
      <Outlet />
      <footer className="top-full p-2 sticky border-t flex justify-between items-center">
        <p>Created by: Mariya Motuz</p>
        <p>BSU 2023</p>
      </footer>
    </main>
  );
}
