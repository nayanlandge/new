import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getStudent } from '../api/studentApi';

const StudentDetails = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await getStudent(id);
        setStudent(response.data);
      } catch (error) {
        console.error("Error fetching student details:", error);
      }
    };

    fetchStudent();
  }, [id]);

  if (!student) {
    return <div className="text-center mt-10 text-gray-500">Loading student details...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-3xl font-bold text-blue-700 mb-4">{student.name}</h2>

      <div className="grid grid-cols-2 gap-4 text-gray-700 mb-6">
        <div><strong>Stream:</strong> {student.stream}</div>
        <div><strong>Year:</strong> {student.year}</div>
        <div><strong>Phone:</strong> {student.phone}</div>
        <div><strong>Total Fees:</strong> ₹{student.fees}</div>
        <div>
          <strong>Fees Paid:</strong>{" "}
          <span className={student.feesPaid ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
            {student.feesPaid ? "Yes" : "No"}
          </span>
        </div>
      </div>

      <h3 className="text-xl font-semibold text-gray-800 mb-4">💸 Payment History</h3>
      {student.paymentHistory && student.paymentHistory.length > 0 ? (
        <div className="space-y-4">
          {student.paymentHistory.map((payment, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded border border-gray-200">
              <p className="text-sm text-gray-500">📅 {new Date(payment.date).toLocaleDateString()}</p>
              <p><strong>Amount Paid:</strong> ₹{payment.amountPaid}</p>
              <p><strong>Remaining Balance:</strong> ₹{payment.remainingBalance}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500">No payment history available.</p>
      )}
    </div>
  );
};

export default StudentDetails;
