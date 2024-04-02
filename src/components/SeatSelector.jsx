import React, { useState, useEffect } from "react";
import "../SeatSelector.css";

const SeatSelector = ({
  numRows,
  numSeatsPerRow,
  seatsStatus,
  onSeatSelect,
}) => {
  // Dont need numRows and numSeatsPerRow if seatsStatus has coords

  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    onSeatSelect(selectedSeats);
  }, [selectedSeats, onSeatSelect]);

  const handleSeatClick = (rowIndex, seatIndex) => {
    if (
      selectedSeats.some(
        (seat) => seat.row === seatIndex && seat.seat === rowIndex
      )
    ) {
      setSelectedSeats(
        selectedSeats.filter(
          (seat) => !(seat.row === seatIndex && seat.seat === rowIndex)
        )
      );
    } else {
      setSelectedSeats([...selectedSeats, { row: seatIndex, seat: rowIndex }]);
    }
  };

  const renderSeats = () => {
    const role = localStorage.getItem("role");
    const seats = [];
    let counter = 0;
    for (let row = 1; row < numSeatsPerRow + 1; row++) {
      const rowSeats = [];
      for (let seat = 1; seat < numRows + 1; seat++) {
        const key = `${row},${seat}`;
        if (role === "admin") {
          rowSeats.push(
            <div
              key={key}
              className={`seat ${
                selectedSeats.some(
                  (selectedSeat) =>
                    selectedSeat.seat === row && selectedSeat.row === seat
                )
                  ? "selected"
                  : ""
              }`}
              onClick={() => handleSeatClick(row, seat, 100)}
            >
              {row}
            </div>
          );
        } else if (
          seatsStatus[counter].status === "Sold" ||
          seatsStatus[counter].status === "Reserved"
        ) {
          rowSeats.push(
            <div key={key} className={"seat taken"}>
              {row}
            </div>
          );
        } else if (seatsStatus[counter].status === "Unavailable") {
          rowSeats.push(
            <div key={key} className={"seat una"}>
              {row}
            </div>
          );
        } else {
          rowSeats.push(
            <div
              key={key}
              className={`seat ${
                selectedSeats.some(
                  (selectedSeat) =>
                    selectedSeat.seat === row && selectedSeat.row === seat
                )
                  ? "selected"
                  : ""
              }`}
              onClick={() => handleSeatClick(row, seat, 100)}
            >
              {row}
            </div>
          );
        }
        counter = counter + 1;
      }
      seats.push(
        <div key={row} className="seat-row">
          {rowSeats}
        </div>
      );
    }
    return seats;
  };

  return (
    <div className="seat-selector">
      <h2 style={{ color: "white" }}>Seat Selector</h2>
      <br></br>
      <div style={{ textAlign: "center" }}>
        <hr
          style={{
            display: "block",
            margin: "auto",
            width: "30%",
            height: "0.3em",
            backgroundColor: "black",
          }}
        />
      </div>

      <p style={{ color: "grey" }}>Screen</p>
      <div className="seat-grid">{renderSeats()}</div>
    </div>
  );
};

export default SeatSelector;
