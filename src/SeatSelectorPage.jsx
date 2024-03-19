import React from 'react';
import SeatSelector from './components/SeatSelector';

const SeatSelectorPage = () => {
    return (
        <div>
            <h1>Select Seats</h1>
            <SeatSelector numRows={20} numSeatsPerRow={12}  seatsStatus={"none"}/>
        </div>
    );
};

export default SeatSelectorPage;