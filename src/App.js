import { useEffect, useState } from 'react';

export default function App() {
  const baseUrl = 'http://localhost:4000';

  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');

  const [loading, setLoading] = useState(true);
  const [disabled, setDisabled] = useState(true);

  const [currentGuestList, setCurrentGuestList] = useState([]);
  async function fetchUsers() {
    const response = await fetch(`${baseUrl}/guests`);
    const allGuests = await response.json();
    setCurrentGuestList(allGuests);
    setLoading(false);
    setDisabled(false);
    console.log(allGuests);
  }
  useEffect(() => {
    fetchUsers().catch((error) => console.log(error));
  }, []);

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
    setFName('');
    setLName('');
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
  async function updateGuestStatus(id, value) {
    const response = await fetch(`${baseUrl}/guests/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ attending: !value }),
    });
    const updatedGuest = await response.json();
    const listToCheck = [...currentGuestList];
    const guestIndex = listToCheck.findIndex(
      (guestToCheck) => guestToCheck.id === updatedGuest.id,
    );
    listToCheck[guestIndex].attending = updatedGuest.attending;
    setCurrentGuestList(listToCheck);
    fetchUsers().catch((error) => console.log(error));
  }
  return loading ? (
    <>
      <h2>Loading...</h2>
      <form disabled={disabled} />
    </>
  ) : (
    <>
      <div>
        <h1>Guest List</h1>
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
              if (event.key === 'Enter') {
                addGuest().catch((error) => console.log(error));
              }
            }}
          />
          Press 'Enter' to Add
        </label>
      </div>
      <div>
        <h2>Current List</h2>
        <div>
          {currentGuestList.map((guest) => {
            return (
              <div data-test-id="guest" key={`guest-data-${guest.id}`}>
                <button
                  aria-label={`Remove ${guest.firstName} ${guest.lastName}`}
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
                    aria-label={`${guest.firstName} ${guest.lastName} attending status`}
                    onChange={() => {
                      updateGuestStatus(guest.id, guest.attending).catch(
                        (error) => console.log(error),
                      );
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
