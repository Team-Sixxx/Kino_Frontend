import React, { useState, useEffect } from 'react';
import SeatSelector from './components/SeatSelector';
import './SeatSelectorPage.css'; 
import { useParams , NavLink } from 'react-router-dom';
import useAxios from 'axios-hooks'

const SeatSelectorPage = () => {
    const { id } = useParams(); 


    const { data, loading, error, get } = useAxios({
        url: `api/tickets/screening/${id}`,
        method: 'GET'
    });


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
    

    //not done
    const handleTickets = async (action) => {
        setShowPopup(false);
        try {
            const response = await useAxios({
                url: action === 'buy' ? 'api/tickets/buy' : 'api/tickets/reserve',
                method: 'POST',
                data: {
                    selectedSeats: selectedSeats
                }
            });
            console.log(`${action} tickets response:`, response.data);
        } catch (error) {
            console.error(`Error ${action === 'buy' ? 'buying' : 'reserving'} tickets:`, error);
        }
    };

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
                              {`(${intToAlphabet(seat.row-1)},${seat.seat}) - Price: ${seat.price} DKK`} 
                              <br />
                            </React.Fragment>
                          ))}
                        </p>
                        <div>
                            <button className="buy-button" onClick={() => handleTickets('buy')}>Buy Tickets</button>
                            <button className="buy-button" onClick={() => handleTickets('reserve')}>Reserve Tickets</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SeatSelectorPage;
