import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

import { useForm, useField, splitFormProps } from "react-form";

async function sendToFakeServer(values) {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return values;
}

function validateAddressStreet(value) {
  if (!value) {
    return "A street is required";
  }
  return false;
}

async function fakeCheckValidName(name, instance) {
  if (!name) {
    return "A name is required";
  }

  return instance.debounce(async () => {
    console.log("checking name");
    await new Promise(resolve => setTimeout(resolve, 1000));
    // All names are valid, so return a false error
    return false;
  }, 500);
}

const InputField = React.forwardRef((props, ref) => {
  // Let's use splitFormProps to get form-specific props
  const [field, fieldOptions, rest] = splitFormProps(props);

  // Use the useField hook with a field and field options
  // to access field state
  const {
    meta: { error, isTouched, isValidating },
    getInputProps
  } = useField(field, fieldOptions);

  // Build the field
  return (
    <>
      <input {...getInputProps({ ref, ...rest })} />{" "}
      {isValidating ? (
        <em>Validating...</em>
      ) : isTouched && error ? (
        <em>{error}</em>
      ) : null}
    </>
  );
});

function MyForm() {
  // Use the useForm hook to create a form instance
  const {
    Form,
    meta: { isSubmitting, canSubmit }
  } = useForm({
    onSubmit: async (values, instance) => {
      // onSubmit (and everything else in React Form)
      // has async support out-of-the-box
      await sendToFakeServer(values);
      console.log("Huzzah!");
    },
    debugForm: true
  });

  return (
    <Form>
      <div>
        <label>
          Name: <InputField field="name" validate={fakeCheckValidName} />
        </label>
      </div>
      <div>
        <label>
          Address Street:{" "}
          <InputField field="address.street" validate={validateAddressStreet} />
        </label>
      </div>

      <div>
        <button type="submit" disabled={!canSubmit}>
          Submit
        </button>
      </div>

      <div>
        <em>{isSubmitting ? "Submitting..." : null}</em>
      </div>
    </Form>
  );
}

function App() {
  return <MyForm />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
