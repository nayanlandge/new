import { useState } from 'react';
import { createStudent } from '../api/studentApi';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

const AddStudent = () => {
  const [formData, setFormData] = useState({
    name: '',
    stream: '',
    year: '',
    phone: '',
    fees: '',
    feesPaid: false,
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Form Data:', formData);


      if (isNaN(formData.year) || formData.year < 1900 || formData.year > new Date().getFullYear()) {
        setError('Please enter a valid year.');
        return;
      }


      if (isNaN(formData.fees) || formData.fees <= 0) {
        setError('Please enter a valid fee amount.');
        return;
      }


      if (formData.phone.trim().length === 0) {
        setError('Please enter a valid phone number.');
        return;
      }


      const updatedFormData = {
        ...formData,
        phone: formData.phone.toString(),
        fees: parseFloat(formData.fees),
      };


      const response = await createStudent(updatedFormData);
      if (response.status === 201) {
        navigate('/');
      } else {
        setError('Failed to add student. Please try again.');
      }
    } catch (err) {
      console.error('Error occurred while adding student:', err);
      setError('An error occurred while adding the student.');
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <div className="flex-1">
        <Header />
        <main className="p-8">
          <h2 className="text-3xl font-bold mb-6 text-center">Add New Student</h2>
          {error && <div className="text-red-500 text-center mb-4">{error}</div>}
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-6 bg-white shadow-lg rounded-lg p-6 max-w-screen-sm mx-auto"
          >
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="border p-4 rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
              required
            />
            <input
              name="stream"
              value={formData.stream}
              onChange={handleChange}
              placeholder="Stream"
              className="border p-4 rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
              required
            />
            <input
              name="year"
              value={formData.year}
              onChange={handleChange}
              placeholder="Year (YYYY)"
              className="border p-4 rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
              required
            />
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="border p-4 rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
              required
            />
            <input
              name="fees"
              value={formData.fees}
              onChange={handleChange}
              placeholder="Total Fees"
              className="border p-4 rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
              required
            />
            <label className="flex items-center gap-2 text-lg">
              <input
                type="checkbox"
                name="feesPaid"
                checked={formData.feesPaid}
                onChange={handleChange}
                className="accent-blue-600"
              />
              Fees Paid
            </label>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-all w-full md:w-auto"
              >
                Submit
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default AddStudent;
