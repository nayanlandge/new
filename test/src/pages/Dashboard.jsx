import { useEffect, useState } from 'react';
import { getAllStudents, deleteStudent, updateStudent, downloadReceipt } from '../api/studentApi';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import StudentCard from '../components/StudentCard';

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      setLoading(true);
      const { data } = await getAllStudents();
      setStudents(data);
    } catch (err) {
      setError('Error loading students. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (updatedStudent) => {
    try {
      await updateStudent(updatedStudent._id, updatedStudent);
      loadStudents();
    } catch (err) {
      setError('Error updating student. Please try again later.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteStudent(id);
      loadStudents();
    } catch (err) {
      setError('Error deleting student. Please try again later.');
    }
  };

  const handleReceipt = async (id) => {
    try {
      const res = await downloadReceipt(id);
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `receipt_${id}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      setError('Error downloading receipt. Please try again later.');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-8">
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-gray-800">Student Dashboard</h2>
            <p className="text-gray-500">Manage all students enrolled at Shiksha Engineering Academy</p>
          </div>
          {loading && (
            <div className="flex justify-center items-center min-h-[300px]">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          {error && <div className="text-red-500 text-center mb-4">{error}</div>}
          {!loading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {students.length === 0 ? (
                <div className="col-span-4 text-center text-gray-500">No students found.</div>
              ) : (
                students.map((student) => (
                  <StudentCard
                    key={student._id}
                    student={student}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onDownload={handleReceipt}
                  />
                ))
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
