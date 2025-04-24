import { useEffect, useState, useMemo } from 'react';
import { getAllStudents, deleteStudent, downloadReceipt, updateStudent } from '../api/studentApi';
import StudentForm from '../components/StudentForm';
import StudentCard from '../components/StudentCard';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [editStudent, setEditStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await getAllStudents();
      setStudents(data);
    } catch (err) {
      setError('Error loading students, please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteStudent(id);
      loadStudents();
    } catch (err) {
      setError('Error deleting student, please try again.');
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
      setError('Error downloading receipt, please try again.');
    }
  };

  const handleEdit = (student) => {
    setEditStudent(student);
  };

  const handleUpdate = async (data) => {
    try {
      await updateStudent(editStudent._id, data);
      setEditStudent(null);
      loadStudents();
    } catch (err) {
      setError('Error updating student, please try again.');
    }
  };

  const filtered = useMemo(
    () => students.filter((s) => s.name.toLowerCase().includes(search.toLowerCase())),
    [students, search]
  );

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 md:px-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-10">Student Management</h1>


        <div className="flex justify-center mb-8">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search students by name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            )}
          </div>
        </div>


        {loading && (
          <div className="flex justify-center items-center min-h-[300px]">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}


        {error && <div className="text-red-500 text-center mb-4">{error}</div>}


        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((student) =>
            editStudent && editStudent._id === student._id ? (
              <div key={student._id} className="bg-white rounded-lg p-4 shadow-lg">
                <StudentForm onSubmit={handleUpdate} initialData={editStudent} />
              </div>
            ) : (
              <StudentCard
                key={student._id}
                student={student}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onDownload={handleReceipt}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentList;
