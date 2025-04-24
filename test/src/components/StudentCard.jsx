import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaMoneyBillWave, FaEdit, FaTrash, FaReceipt, FaSave, FaTimes } from 'react-icons/fa';

const StudentCard = ({ student, onEdit, onDelete, onDownload }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedStudent, setEditedStudent] = useState({ ...student });
  const navigate = useNavigate(); // Used for redirecting

  useEffect(() => {
    // Check if the user is logged in when the component mounts
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      // Redirect to login if not logged in
      navigate("/"); 
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditedStudent({
      ...editedStudent,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSave = () => {
    onEdit(editedStudent);
    setIsEditing(false);
  };

  const totalPaid = student.paymentHistory?.reduce((sum, p) => sum + p.amountPaid, 0) || 0;
  const remainingBalance = student.fees - totalPaid;

  return (
    <div className="bg-white shadow-md rounded-lg p-6 flex flex-col justify-between h-full transition-transform hover:scale-[1.02] duration-200">
      {isEditing ? (
        <div className="space-y-4">
          <input
            name="name"
            value={editedStudent.name}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
            placeholder="Name"
          />
          <input
            name="stream"
            value={editedStudent.stream}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
            placeholder="Stream"
          />
          <input
            name="year"
            value={editedStudent.year}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
            placeholder="Year"
          />
          <input
            name="phone"
            value={editedStudent.phone}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
            placeholder="Phone"
          />
          <input
            name="fees"
            value={editedStudent.fees}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
            placeholder="Total Fees"
          />
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="feesPaid"
              checked={editedStudent.feesPaid}
              onChange={handleChange}
              className="border rounded p-2"
            />
            Fees Paid
          </label>
        </div>
      ) : (
        <div>
          <h3 className="text-xl font-bold text-blue-800">{student.name}</h3>
          <p className="text-sm text-gray-500 mb-2">{student.stream}</p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li><strong>Year:</strong> {student.year}</li>
            <li><strong>Phone:</strong> {student.phone}</li>
            <li><strong>Total Fees:</strong> ₹{student.fees}</li>
            <li><strong>Paid:</strong> ₹{totalPaid}</li>
            <li><strong>Remaining:</strong> ₹{remainingBalance}</li>
          </ul>
        </div>
      )}

      <div className="flex flex-wrap gap-2 mt-4">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2"
            >
              <FaSave /> Save
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setEditedStudent(student);
              }}
              className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2"
            >
              <FaTimes /> Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2"
            >
              <FaEdit /> Edit
            </button>
            <button
              onClick={() => onDelete(student._id)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2"
            >
              <FaTrash /> Delete
            </button>
            <button
              onClick={() => onDownload(student._id)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2"
            >
              <FaReceipt /> Receipt
            </button>

            <Link
              to={`/students/${student._id}`}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2"
            >
              <FaEye /> View Details
            </Link>
            <Link
              to={`/students/${student._id}/payment`}
              className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2"
            >
              <FaMoneyBillWave /> Add Payment
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default StudentCard;
