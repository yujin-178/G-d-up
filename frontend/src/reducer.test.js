import reducer from "./reducer.js";
import {
  changeEmailField,
  changePasswordField,
} from './actions.js';

describe('reducer', () => {
  describe('changeEmailField', () => {
    it('changes Email field', () => {

      const { email } = reducer({
        email: '',
        password: '',
      }, changeEmailField('test@example.com'));
  
      expect(email).toBe('test@example.com');
    });
  });

  describe('changePasswordField', () => {
    it('changes Password field', () => {

      const { password } = reducer({
        email: '',
        password: '',
      }, changePasswordField('passwordExample'));
  
      expect(password).toBe('passwordExample');
    });
  });
});
