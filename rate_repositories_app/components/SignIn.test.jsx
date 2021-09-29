import React from 'react';
import { SignInFormik } from './SignIn';
import { render, fireEvent, waitFor } from '@testing-library/react-native';

describe('SignIn form', () => {

  describe('SignInContainer', () => {
    it('calls the onSubmit function with correct arguments',
      async () => {
        // we didn't import `describe` either
        // i suppose `jest.fn` will work as well.
        const mockSubmit = jest.fn();
        const { getByTestId } = render(<SignInFormik onSubmit={mockSubmit} />);
        fireEvent.changeText(getByTestId('usernameField'), 'tester');
        fireEvent.changeText(getByTestId('passwordField'), 'testpassword');

        await waitFor(
          ()=>{
            fireEvent.press(getByTestId('submitButton'));

            expect(mockSubmit).toHaveBeenCalledTimes(1);
            expect(mockSubmit.mock.calls[0][0]).toEqual({
              username: "tester",
              password: "testpassword"
            });
          }
        )
        
      }
    );
  });
});