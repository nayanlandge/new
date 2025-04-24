import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addPaymentToStudent } from '../api/studentApi';
import { FaMoneyCheckAlt } from 'react-icons/fa';

const Payment = () => {
    const [paymentAmount, setPaymentAmount] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    const handlePaymentSubmit = async (e) => {
        e.preventDefault();

        if (isNaN(paymentAmount) || paymentAmount <= 0) {
            alert("Please enter a valid payment amount.");
            return;
        }

        try {
            const response = await addPaymentToStudent(id, { amountPaid: paymentAmount });
            if (response.status === 200) {
                navigate(`/students/${id}`);
            }
        } catch (err) {
            alert("An error occurred while adding the payment.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <div className="flex items-center gap-3 mb-6">
                    <FaMoneyCheckAlt className="text-green-600 text-2xl" />
                    <h2 className="text-2xl font-bold text-gray-800">Add Payment</h2>
                </div>

                <form onSubmit={handlePaymentSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="payment" className="block text-sm font-medium text-gray-700 mb-1">
                            Enter Amount
                        </label>
                        <input
                            type="number"
                            id="payment"
                            value={paymentAmount}
                            onChange={(e) => setPaymentAmount(e.target.value)}
                            placeholder="e.g. 500"
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-semibold text-sm transition-all duration-200"
                    >
                        Submit Payment
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Payment;
