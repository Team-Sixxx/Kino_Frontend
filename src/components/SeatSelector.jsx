import React, { useState } from 'react';
import '../SeatSelector.css';

const SeatSelector = ({ numRows, numSeatsPerRow, seatsStatus }) => {
    const [selectedSeats, setSelectedSeats] = useState([]);

    const handleSeatClick = (rowIndex, seatIndex) => {
        const seatNumber = seatIndex + 1;
        if (selectedSeats.some(seat => seat.row === rowIndex && seat.seat === seatIndex)) {
            setSelectedSeats(selectedSeats.filter(seat => !(seat.row === rowIndex && seat.seat === seatIndex)));
        } else {
            setSelectedSeats([...selectedSeats, { row: rowIndex, seat: seatIndex }]);
        }
    };

    const renderSeats = () => {
        const seats = [];
        for (let row = 0; row < numSeatsPerRow; row++) {
            const rowSeats = [];
            for (let seat = 0; seat < numRows; seat++) {
                const key = `${row}-${seat}`;

                if (seatsStatus[key] != "available") {
                    rowSeats.push(
                        <div
                            key={key}
                            className={"seat taken"} //All seats are taken until better data in SeatSelectorPage
                        >
                            {row}
                        </div>
                    );
                } else {
                    rowSeats.push(
                        <div
                            key={key}
                            className={`seat ${selectedSeats.some(selectedSeat => selectedSeat.seat === seat && selectedSeat.row === row) ? 'selected' : ''}`}
                            onClick={() => handleSeatClick(row, seat)}
                        >
                            {row}
                        </div>
                    );
                }
            }
            seats.push(<div key={row} className="seat-row">{rowSeats}</div>);
        }
        return seats;
    };

    return (
        <div className="seat-selector">
            <h2>Seat Selector</h2>
            <div className="seat-grid">
                {renderSeats()}
            </div>
        </div>
    );
};

export default SeatSelector;
