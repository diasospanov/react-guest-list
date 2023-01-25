import { useState } from 'react';

function addGuest(props) {
  return (
    <label>
      (props.fname) (props.lname)
      <input type="radio" aria-checked="false" />
      not attending
    </label>
  );
}

function App() {
  const [addNewGuest, setAddNewGuest] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
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
          onKeyDown={() => {
            /* Add new guest to the array of current guests */
          }}
        />
      </label>
      <button>Remove</button>
      <div data-test-id="guest">
        Guest List
        <div>
          Dias Ospanov
          <label>
            <input type="radio" />
            Attending
          </label>
        </div>
      </div>
    </>
  );
}

export default App;
