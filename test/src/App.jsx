import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import StudentList from './pages/StudentList';
import AddStudent from './pages/AddStudent';
import StudentDetails from './pages/StudentDetails';
import Payment from './pages/Payment';
const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Router>
      <nav className="bg-blue-600 text-white p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Shiksha Academy</h1>
          <div className="lg:flex hidden space-x-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? 'text-yellow-400 font-semibold' : 'hover:text-yellow-300'
              }
            >
              Student List
            </NavLink>
            <NavLink
              to="/add"
              className={({ isActive }) =>
                isActive ? 'text-yellow-400 font-semibold' : 'hover:text-yellow-300'
              }
            >
              Add Student
            </NavLink>
          </div>
          <button
            className="lg:hidden text-white"
            onClick={toggleMenu}
          >
            ☰
          </button>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden flex flex-col space-y-4 bg-blue-700 p-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? 'text-yellow-400 font-semibold' : 'hover:text-yellow-300'
              }
            >
              Student List
            </NavLink>
            <NavLink
              to="/add"
              className={({ isActive }) =>
                isActive ? 'text-yellow-400 font-semibold' : 'hover:text-yellow-300'
              }
            >
              Add Student
            </NavLink>
          </div>
        )}
      </nav>


      <Routes>
        <Route path="/" element={<StudentList />} />
        <Route path="/add" element={<AddStudent />} />
        <Route path="/students/:id" element={<StudentDetails />} />
        <Route path="/students/:id/payment" element={<Payment />} />
      </Routes>
    </Router>
  );
};

export default App;
