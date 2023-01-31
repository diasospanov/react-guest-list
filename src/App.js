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

export default function App() {
  const baseUrl = 'http://localhost:4000';

  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');

  const [currentGuestList, setCurrentGuestList] = useState([]);
  async function fetchUsers() {
    const response = await fetch(`${baseUrl}/guests`);
    const allGuests = await response.json();
    setCurrentGuestList(allGuests);
    console.log(allGuests);
  }
  useEffect(() => {
    fetchUsers().catch((error) => console.log(error));
  }, []);
  // const [isChecked, setIsChecked] = useState(false);

  async function addGuest() {
    const response = await fetch(`${baseUrl}/guests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: fName,
        lastName: lName,
      }),
    });
    const createdGuest = await response.json();
    const newGuestList = [...currentGuestList, createdGuest];
    setCurrentGuestList(newGuestList);
    fetchUsers().catch((error) => console.log(error));
  }

  async function removeGuest(id) {
    const response = await fetch(`${baseUrl}/guests/${id}`, {
      method: 'DELETE',
    });
    const deletedGuest = await response.json();
    const listToDeleteGuest = [...currentGuestList];
    listToDeleteGuest.filter((guest) => guest.id !== deletedGuest.id);
    setCurrentGuestList(listToDeleteGuest);
    fetchUsers().catch((error) => console.log(error));
  }

  return (
    <>
      <h1>Guest List</h1>
      <div>
        <label>
          First name
          <input
            value={fName}
            onChange={(event) => {
              const enteredFirstName = event.currentTarget.value;
              setFName(enteredFirstName);
            }}
          />
        </label>
        <label>
          Last name
          <input
            value={lName}
            onChange={(event) => {
              const enteredLastName = event.currentTarget.value;
              setLName(enteredLastName);
            }}
            onKeyDown={(event) => {
              /* Add new guest to the array of current guests */

              if (event.key === 'Enter') {
                addGuest().catch((error) => console.log(error));
                /* const newGuest = {
                  id: currentGuestList.length + 1,
                  fName: firstName,
                  lName: lastName,
                  attending: false,
                };
                const newGuestList = [...currentGuestList, newGuest];
                setCurrentGuestList(newGuestList); */
              }
            }}
          />
          Press 'Enter' to Add
        </label>
        <button
          onClick={() => {
            removeGuest().catch((error) => console.log(error));
            /* setCurrentGuestList(
              currentGuestList.filter(
                (guest) =>
                  guest.firstName !== firstName && guest.lastName !== lastName,
              ),
            ); */
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
                <button
                  onClick={() => {
                    removeGuest(guest.id).catch((error) => console.log(error));
                  }}
                >
                  Remove
                </button>
                <h3>
                  {guest.firstName} {guest.lastName}
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
