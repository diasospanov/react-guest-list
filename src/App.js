import PropTypes from 'prop-types';
import { useState } from 'react';

const guestList = [
  { id: '1', fName: 'Brad', lName: 'Pitt' },
  { id: '2', fName: 'Kevin', lName: 'Spacey' },
  { id: '3', fName: 'Sandra', lName: 'Bullock' },
];

guestList.propTypes = {
  guest: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
  }),
};

/* function addGuest(props) {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <label>
      (props.fname) (props.lname)
      <input
        checked={isChecked}
        type="checkbox"
        aria-checked="false"
        onChange={(event) => setIsChecked(event.currentTarget.checked)}
      />
      {isChecked ? '' : 'not'} attending
    </label>
  );
} */

function App() {
  const [addNewGuest, setAddNewGuest] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [isChecked, setIsChecked] = useState(false);
  const [currentGuestList, setCurrentGuestList] = useState(guestList);
  return (
    <>
      <h1>Guest List</h1>
      <label>
        First name
        <input
          value={firstName}
          onChange={(event) => {
            const enteredFirstName = event.currentTarget.value;
            setFirstName(enteredFirstName);
          }}
        />
      </label>
      <label>
        Last name
        <input
          value={lastName}
          onChange={(event) => {
            const enteredLastName = event.currentTarget.value;
            setLastName(enteredLastName);
          }}
          onKeyDown={(event) => {
            /* Add new guest to the array of current guests */
            const newGuest = {
              id: currentGuestList.length + 1,
              fName: firstName,
              lName: lastName,
            };
            const newGuestList = [...currentGuestList, newGuest];
            if (event.key === 'Enter') {
              setCurrentGuestList(newGuestList);
            }
          }}
        />
        Press 'Enter' to Add
      </label>
      <button
        onClick={() => {
          const shrinkedGuestList = [...currentGuestList];
        }}
      >
        Remove
      </button>
      <div>
        <h2>Current List</h2>
        <div>
          {currentGuestList.map((guest) => {
            return (
              <div data-test-id="guest" key={`guest-data-${guest.id.value}`}>
                <h3>
                  {guest.fName} {guest.lName}
                </h3>
                <label>
                  <input
                    checked={isChecked}
                    type="checkbox"
                    aria-label="guest"
                    onChange={(event) =>
                      setIsChecked(event.currentTarget.checked)
                    }
                  />
                  {isChecked ? '' : 'not'} attending
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
