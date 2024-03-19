import React, { useState, useEffect } from 'react';
import SeatSelector from './components/SeatSelector';
import './SeatSelectorPage.css'; 
import { useParams } from 'react-router-dom';

const SeatSelectorPage = () => {
    const { id } = useParams(); 

    //useAxios Fetch tickets with id as id
    var numRows = 20;
    var numSeatsPerRow = 12;
    var seatsStatus = "none";


    const [selectedSeats, setSelectedSeats] = useState([]);
    const [showPopup, setShowPopup] = useState(false);

    const handleSeatSelect = seats => {
        setSelectedSeats(seats);
    };

    useEffect(() => {
        if (selectedSeats.length > 0) {
            setShowPopup(true); 
        }
    }, [selectedSeats]);

    const closePopup = () => {
        setShowPopup(false);
    };

    return (
        <div>
            <h1>Select Seats</h1>
            <SeatSelector numRows={numRows} numSeatsPerRow={numSeatsPerRow} seatsStatus={seatsStatus} onSeatSelect={handleSeatSelect} />
            
            {showPopup && (
                <div className="popup slideout-right">
                    <div className="popup-content">
                        <button className="close" onClick={closePopup}>&times;</button>
                        <h2>Selected Seats</h2>
                        <p>{selectedSeats.map(seat => `(${seat.row}, ${seat.seat})`).join(', ')}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SeatSelectorPage;
