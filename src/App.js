import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const guestList = [
  { id: 1, fName: 'Brad', lName: 'Pitt', attending: false },
  { id: 2, fName: 'Kevin', lName: 'Spacey', attending: true },
  { id: 3, fName: 'Sandra', lName: 'Bullock', attending: false },
];

guestList.propTypes = {
  guest: PropTypes.shape({
    fName: PropTypes.string.isRequired,
    lName: PropTypes.string.isRequired,
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

export default function App() {
  /* useEffect(() => {
    async function fetchUsers() {
      const baseUrl = 'http://localhost:4000';
      const response = await fetch(`${baseUrl}/guests`);
      const allGuests = await response.json();
      console.log(allGuests);
    }
    fetchUsers().catch((error) => console.log(error));
  }, []); */

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [currentGuestList, setCurrentGuestList] = useState(guestList);
  // const [isChecked, setIsChecked] = useState(false);

  /* async function addGuest() {
    const baseUrl = 'http://localhost:4000';
    const response = await fetch(`${baseUrl}/guests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: currentGuestList.length + 1,
        fName: firstName,
        lName: lastName,
      }),
    });
    const createdGuest = await response.json();
  } */

  return (
    <>
      <h1>Guest List</h1>
      <div>
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

              if (event.key === 'Enter') {
                const newGuest = {
                  id: currentGuestList.length + 1,
                  fName: firstName,
                  lName: lastName,
                  attending: false,
                };
                const newGuestList = [...currentGuestList, newGuest];
                setCurrentGuestList(newGuestList);
              }
            }}
          />
          Press 'Enter' to Add
        </label>
        <button
          onClick={() => {
            // const shrinkedGuestList = [...currentGuestList];
            setCurrentGuestList(
              currentGuestList.filter(
                (guest) =>
                  guest.fName !== firstName && guest.lName !== lastName,
              ),
            );
          }}
        >
          Remove
        </button>
      </div>
      <div>
        <h2>Current List</h2>
        <div>
          {currentGuestList.map((guest) => {
            return (
              <div data-test-id="guest" key={`guest-data-${guest.id}`}>
                <h3>
                  {guest.fName} {guest.lName}
                </h3>
                <label>
                  <input
                    checked={guest.attending}
                    type="checkbox"
                    aria-label="guest"
                    onChange={() => {
                      const listToCheck = [...currentGuestList];
                      const guestIndex = listToCheck.findIndex(
                        (guestToCheck) => guestToCheck.id === guest.id,
                      );
                      listToCheck[guestIndex].attending = !guest.attending;
                      setCurrentGuestList(listToCheck);

                      /* const attendingGuest =  listToCheck.filter(
                        (guestToCheck) => guestToCheck.id !== guest.id,
                      ); */

                      // guest.attending = !attendingGuest.attending;
                      // setCurrentGuestList(currentGuestList);
                    }}
                  />
                  {guest.attending ? '' : 'not'} attending
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
