const Sidebar = () => (
  <div className="w-64 min-h-screen bg-blue-950 text-white flex flex-col shadow-lg">
    <div className="p-6 flex items-center justify-center border-b border-blue-800">
      <span className="text-2xl font-extrabold tracking-wide">Shiksha Academy</span>
    </div>
    <nav className="flex-1">
      <ul className="py-4 space-y-4">
        <li>
          <a
            href="/"
            className="block px-6 py-3 hover:bg-blue-800 hover:pl-7 transition-all duration-200 ease-in-out rounded-lg"
          >
            Dashboard
          </a>
        </li>
        <li>
          <a
            href="/add"
            className="block px-6 py-3 hover:bg-blue-800 hover:pl-7 transition-all duration-200 ease-in-out rounded-lg"
          >
            Add Student
          </a>
        </li>
      </ul>
    </nav>
  </div>
);

export default Sidebar;
