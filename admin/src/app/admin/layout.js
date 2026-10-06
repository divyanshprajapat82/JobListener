import Header from "./common/Header";
import SideBar from "./common/SideBar";
import AdminAuth from "./controller/AdminAuth";

export default function AdminLayout({ children }) {
  return (
    <AdminAuth>
      <div className="flex h-screen overflow-hidden">
        <aside className="shrink-0 h-screen border-r border-gray-200  overflow-hidden">
          <SideBar />
        </aside>

        <div className="flex flex-1 flex-col h-screen overflow-hidden">
          <div className="shrink-0 border-b border-gray-200 bg-white">
            <Header />
          </div>

          <main className="flex-1 overflow-y-auto scrollbar-hide">
            {children}
          </main>
        </div>
      </div>
    </AdminAuth>
  );
}
