import React, { useState, useEffect } from 'react';
import '../SeatSelector.css';

const SeatSelector = ({ numRows, numSeatsPerRow, seatsStatus, onSeatSelect }) => {
    const [selectedSeats, setSelectedSeats] = useState([]);

    useEffect(() => {
        onSeatSelect(selectedSeats);
    }, [selectedSeats, onSeatSelect]);

    const handleSeatClick = (rowIndex, seatIndex) => {
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

                if (seatsStatus[key] !== "available") { // all seats are taken until data (use == "available" for testing)
                    rowSeats.push(
                        <div
                            key={key}
                            className={"seat taken"}
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
