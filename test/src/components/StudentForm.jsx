import { useState, useEffect } from 'react';

const StudentForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    name: '',
    stream: '',
    year: '',
    phone: '',
    fees: '',
    feesPaid: false,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        stream: initialData.stream || '',
        year: initialData.year || '',
        phone: initialData.phone || '',
        fees: initialData.fees || '',
        feesPaid: initialData.feesPaid || false,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.stream && formData.year && formData.phone && formData.fees) {
      onSubmit(formData);
    } else {
      alert('Please fill in all the fields');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-auto"
    >
      <h2 className="text-2xl font-semibold text-center mb-4">Student Details</h2>
      <div className="grid grid-cols-1 gap-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          name="stream"
          value={formData.stream}
          onChange={handleChange}
          placeholder="Stream"
          className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="number"
          name="year"
          value={formData.year}
          onChange={handleChange}
          placeholder="Year (e.g. 2025)"
          className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="number"
          name="fees"
          value={formData.fees}
          onChange={handleChange}
          placeholder="Total Fees"
          className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <label className="flex items-center gap-2 text-gray-700">
          <input
            type="checkbox"
            name="feesPaid"
            checked={formData.feesPaid}
            onChange={handleChange}
            className="accent-blue-600"
          />
          Fees Paid
        </label>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg mt-4 hover:bg-blue-700 transition-all"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default StudentForm;
