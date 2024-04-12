import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Payment = () => {
  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/stripe/create-checkout-session',
        {},
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
            'X-CSRFToken': localStorage.getItem('jwt'),
          },
        },
      );
      // Redirect to the checkout session URL
      window.location.href = response.data.redirect_to;
    } catch (error) {
      console.error('Error:', error);
      // Handle error
    }
  };
  return (
    <section>
      <div className="product">
        <img
          src="https://i.imgur.com/EHyR2nP.png"
          alt="The cover of Stubborn Attachments"
        />
        <div className="description">
          <h3>Stubborn Attachments</h3>
          <h5>$20.00</h5>
        </div>
      </div>
      <form>
        <button
          onClick={handleSubmit}
          type="submit"
          className="text-white transition duration-500 ease-in-out text-[#32001a] hover:text-[white] bg-[#9a5b65] text-[] hover:bg-[#866b79] focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
        >
          Checkout
        </button>
      </form>
    </section>
  );
};

export default Payment;

// const Message = ({ message }) => (
//   <section>
//     <p>{message}</p>
//   </section>
// );

// export default function App() {
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     // Check to see if this is a redirect back from Checkout
//     const query = new URLSearchParams(window.location.search);

//     if (query.get('success')) {
//       setMessage('Order placed! You will receive an email confirmation.');
//     }

//     if (query.get('canceled')) {
//       setMessage(
//         "Order canceled -- continue to shop around and checkout when you're ready.",
//       );
//     }
//   }, []);

//   return message ? <Message message={message} /> : <ProductDisplay />;
// }
