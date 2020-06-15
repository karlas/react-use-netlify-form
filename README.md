React hook to submit data to [Netlify forms](https://www.netlify.com/products/forms/) asynchronously, without writing any form or redirecting to any success page. Tested with NextJS

## Usage

Parameters:

 - fields: Array with the data fields
 - formName: Name of the Netlify form

Returns:

 - hiddenForm: Resulting form. It has to be placed on the render method of any of your app´s components in order to be seen by Netlify forms magic process.
 - submit: Function which returns a promise. Its param is an object containing keys named as the form fields, with its values to be submitted.

## Example

```
import useNetlifyForm from 'react-use-netlify-form'
import React, { useReducer } from 'react'

const FORM_NAME = 'My contact form'

const initialState = {
  name : '',
  email : '',
  msg : ''
}

const reducer = (state, action) => ({
  ...state,
  [ action.name ] : action.value
})

export default () => {
  const { hiddenForm, submit } = useNetlifyForm([ 'name', 'email', 'msg' ], FORM_NAME)
  const [ state, dispatch ] = useReducer(reducer, initialState)
  const { name, email, msg } = state
  const handleChange = event => {
    const { name, value } = event.target
    dispatch({ name, value })
  }
  const handleSubmit = async () => {
    try{
      const success = await submit(state)
      success && alert('Sent!')
    }
    catch{
      alert('Failure :(')
    }
  }
  return (
    <div>
      { hiddenForm }
      <p>
        <label>
          Your Name: <input type='text' name='name' value={ name } onChange={ handleChange } />
        </label>
      </p>
      <p>
        <label>
          Your Email: <input type='email' name='email' value={ email } onChange={ handleChange } />
        </label>
      </p>
      <p>
        <label>
          Your msg: <input type='text' name='msg' value={ msg } onChange={ handleChange } />
        </label>
      </p>
      <p>
        <button onClick={ handleSubmit }>Send</button>
      </p>
    </div>
  )
}
```