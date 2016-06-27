import Form from 'mobx-ajv-form';
import registerSchema from '~/src/shared/schemas/auth.register';
import { dispatch } from '~/src/shared/state/dispatcher';

class AuthRegisterForm extends Form {

  handleOnSubmit = (e) => {
    e.preventDefault();
    if (!this.validate()) return;

    dispatch('auth.register', this.values())
      .then(() => dispatch('ui.authModal.toggleSection', 'signin'))
      .then(() => dispatch('ui.snackBar.open', 'Register Successful.'))
      .then(() => this.clear())
      .catch(() => this.invalidate('The user already exist.'));
  }
}

export default
  new AuthRegisterForm({
    username: {
      label: 'Username',
    },
    email: {
      label: 'Email',
    },
    password: {
      label: 'Password',
    },
  },
  registerSchema);