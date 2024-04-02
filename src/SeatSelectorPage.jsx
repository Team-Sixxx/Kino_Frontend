import React, { useState, useEffect } from "react";
import SeatSelector from "./components/SeatSelector";
import "./SeatSelectorPage.css";
import { useParams, NavLink } from "react-router-dom";
import useAxios from "axios-hooks";
import { API_URL } from "./settings";

const SeatSelectorPage = () => {
  const { id } = useParams();

  const [{ data, loading, error, get }, execute] = useAxios();
  useEffect(() => {
    execute(`${API_URL}/api/tickets/screening/${id}`);
  }, []);

  // Find hvad data der er rigtigt til at vide row og sæder
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const handleSeatSelect = (seats) => {
    setSelectedSeats(seats);
  };

  function intToAlphabet(num) {
    if (num < 0 || num > 25) {
      return "A" + String.fromCharCode(65 + (num - 26));
    }
    return String.fromCharCode(65 + num);
  }

  useEffect(() => {
    if (selectedSeats.length > 0) {
      setShowPopup(true);
    }
  }, [selectedSeats]);

  const closePopup = () => {
    setShowPopup(false);
  };
  const handleTickets = async (action) => {
    setShowPopup(false);
    try {
      const [{ data: postdata }, executePost] = useAxios({
        url: action === "buy" ? `${API_URL}api/tickets/buy` : `${API_URL}api/tickets/reserve`,
        method: "POST",
        data: {
          selectedSeats: selectedSeats,
          id,
        },
      });
      console.log(`${postdata} tickets response:`);
    } catch (error) {
      console.error(`Error ${action === "buy" ? "buying" : "reserving"} tickets:`, error);
    }
  };
  if (data !== undefined) {
    console.log(data[0], "data");
  return (
    <div>
      <SeatSelector numRows={data[0].screening.theater.numberOfRows} numSeatsPerRow={data[0].screening.theater.seatsPerRow} seatsStatus={data} onSeatSelect={handleSeatSelect} />
      {showPopup && (
        <div className="popup slideout-right">
          <div className="popup-content">
            <button className="close" onClick={closePopup}>
              &times;
            </button>
            <h2>Selected Seats</h2>
            <hr color="black" size="5" width="80%"></hr>
            <p>
              {selectedSeats.map((seat) => (
                <React.Fragment key={`${seat.seat}-${seat.row}`}>
                  {`(${intToAlphabet(seat.row - 1)},${seat.seat}) - Price: 100 DKK`}
                  <br />
                </React.Fragment>
              ))}
            </p>
            <div>
              <button className="buy-button" onClick={() => handleTickets("buy")}>
                Buy Tickets
              </button>
              <button className="buy-button" onClick={() => handleTickets("reserve")}>
                Reserve Tickets
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
  }
};

export default SeatSelectorPage;
