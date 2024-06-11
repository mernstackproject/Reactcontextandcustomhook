import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./PageNotFound.css"; // Import your CSS file for styling if needed

const InputField = React.memo(({ setSearchQuery }) => {
  return (
    <input
      type="text"
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  );
});
const bookingPaymentData = [
  {
    _id: 1,
    payment: 100,
    paymentType: "Cash",
    bookingId: 4
  },
  {
    _id: 2,
    payment: 200,
    paymentType: "Cash",
    bookingId: 4
  },
  {
    _id: 2,
    payment: 200,
    paymentType: "Cash",
    bookingId: 2
  }
];
const bookingData = [
    {
      id:4,
      amount:100
    },
    {
      id:2,
      amount:120
    }
]

const renderCards = (id, amount) => {
  const filteredPayments = bookingPaymentData.filter(payment => payment.bookingId === parseInt(id));
  
  const totalPayment = filteredPayments.reduce((total, payment) => total + payment.payment, 0);

  return (
    <>
      {filteredPayments.map(payment => (
        <div key={payment._id}>
          <p>{payment.payment}</p>
          <p>{payment.paymentType}</p>
          
        </div>
      ))}
      <p>Remaining Amount: {totalPayment-amount}</p>
    </>
  );
};

const renderAllCards = (id, amount) => {
  return (
    <>
      {renderCards(id, amount)}
    </>
  );
};
const PageNotFound = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [notFound, setNoteFound] = useState("");
  const [filterData, setFilterData] = useState(null);
  const data = [
    {
      id: 1,
      name: "harry",
    },
    {
      id: 2,
      name: "jon",
    },
    {
      id: 3,
      name: "doe",
    },
    {
      id: 4,
      name: "john",
    },
  ];

  useEffect(() => {
    const filteredData = data.filter((item) => {
      return (
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toString().includes(searchQuery)
      );
    });
    setFilterData(filteredData);
    setNoteFound(filteredData.length === 0 && "Not found");
  }, [searchQuery  ]);

  return (
    <>
    <div style={{height:"10vh"}}>
    <InputField setSearchQuery={setSearchQuery} />
    <p style={{ color: "red" }}>{notFound}</p>
    {
      filterData?.map((item) => (
        <div key={item.id}>
          <p>{item.id}</p>
          <p>{item.name}</p>
        </div>
      ))
    }
    <div className="page-not-found-container">
      <div className="page-not-found-content">
        <h1>Oops!</h1>
        <p>The page you are looking for could not be found.</p>
        <p>
          It seems that the page you were trying to reach does not exist or
          has been moved.
        </p>
        <Link to="/image" className="back-to-home-link">
          Go back to home
        </Link>
      </div>
    </div>
    </div>
   <div style={{marginTop:"330px"}}>
   {bookingData.map(data => renderAllCards(data.id, data.amount))}
   </div>
    </>
  );
};

export default PageNotFound;
