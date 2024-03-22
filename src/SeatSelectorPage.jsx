import React, { useState, useEffect } from 'react';
import SeatSelector from './components/SeatSelector';
import './SeatSelectorPage.css'; 
import { useParams } from 'react-router-dom';

const SeatSelectorPage = () => {
    const { id } = useParams(); 

    //useAxios Fetch tickets with idS
    var numRows = 10;
    var numSeatsPerRow = 12;
    var seatsStatus = "none";


    const [selectedSeats, setSelectedSeats] = useState([]);
    const [showPopup, setShowPopup] = useState(false);

    const handleSeatSelect = seats => {
        setSelectedSeats(seats);
    };

    function intToAlphabet(num) {
        if (num < 0 || num > 25) {
            return "A"+String.fromCharCode(65 + (num-26));
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
    
    const buyTickets = () => {
        setShowPopup(false);
        //link to temp buy page
    };

    const reserveTickets = () => {
        setShowPopup(false);
        //link to temp reserve page or combi buy/reserve page
    };

    //change seat.price
    return (
        <div>
            <SeatSelector numRows={numRows} numSeatsPerRow={numSeatsPerRow} seatsStatus={seatsStatus} onSeatSelect={handleSeatSelect} />            
            {showPopup && (
                <div className="popup slideout-right">
                    <div className="popup-content">
                        <button className="close" onClick={closePopup}>&times;</button>
                        <h2>Selected Seats</h2>
                        <hr color="black" size="5" width="80%"></hr>
                        <p>
                          {selectedSeats.map(seat => (
                            <React.Fragment key={`${seat.seat}-${seat.row}`}>
                              {`(${intToAlphabet(seat.seat)},${seat.row}) - Price: ${seat.price}`} 
                              <br />
                            </React.Fragment>
                          ))}
                        </p>
                        <button className="buy-button" onClick={buyTickets}>Buy Tickets</button>
                        <button className="buy-button" onClick={reserveTickets}>Reserve Tickets</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SeatSelectorPage;
