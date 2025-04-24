import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addPaymentToStudent } from '../api/studentApi';

const AddPayment = () => {
    const [paymentAmount, setPaymentAmount] = useState('');
    const [error, setError] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();


    const handlePaymentSubmit = async (e) => {
        e.preventDefault();


        if (paymentAmount === '' || isNaN(paymentAmount) || paymentAmount <= 0) {
            setError("Please enter a valid payment amount.");
            return;
        }


        try {
            const response = await addPaymentToStudent(id, { amountPaid: parseFloat(paymentAmount) });


            if (response.status === 200) {
                setError('');
                navigate(`/students/${id}`);
            }
        } catch (err) {
            console.error('Error adding payment:', err);
            setError("An error occurred while adding the payment.");
        }
    };

    return (
        <div className="container">
            <h2>Add Payment</h2>


            {error && <div className="error">{error}</div>}

            <form onSubmit={handlePaymentSubmit}>
                <div>
                    <label htmlFor="paymentAmount">Amount Paid: </label>
                    <input
                        type="number"
                        id="paymentAmount"
                        value={paymentAmount}
                        onChange={(e) => setPaymentAmount(e.target.value)}
                        placeholder="Enter payment amount"
                        required
                        min="0"
                    />
                </div>

                <button type="submit">Submit Payment</button>
            </form>
        </div>
    );
};

export default AddPayment;
