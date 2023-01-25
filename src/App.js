import PropTypes from 'prop-types';
import { useState } from 'react';

const guestList = [
  { firstName: 'Kevin', lastName: 'Spacey' },
  { firstName: 'Brad', lastName: 'Pitt' },
  { firstName: 'Sandra', lastName: 'Bullock' },
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
            <input
              checked={isChecked}
              type="checkbox"
              aria-checked="false"
              onChange={(event) => setIsChecked(event.currentTarget.checked)}
            />
            {isChecked ? '' : 'not'} attending
          </label>
        </div>
      </div>
    </>
  );
}

export default App;
