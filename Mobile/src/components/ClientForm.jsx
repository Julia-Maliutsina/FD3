import React from 'react';
import PropTypes from 'prop-types';

import { mobileEvents } from './events';

class ClientForm extends React.PureComponent {
  static propTypes = {
    client: PropTypes.object,
    mode: PropTypes.string.isRequired,
  };

  state = {
    question: this.props.question,
  };

  newSurnameRef = null;
  newNameRef = null;
  newFatherNameRef = null;
  newBalanceRef = null;
  newStatusRef = null;
  setNewSurnameRef = (ref) => {
    this.newSurnameRef = ref;
  };
  setNewNameRef = (ref) => {
    this.newNameRef = ref;
  };
  setNewFatherNameRef = (ref) => {
    this.newFatherNameRef = ref;
  };
  setNewBalanceRef = (ref) => {
    this.newBalanceRef = ref;
  };
  setNewStatusRef = (ref) => {
    this.newStatusRef = ref;
  };

  saveChanges = () => {
    if (this.newSurnameRef || this.newBalanceRef) {
      mobileEvents.emit(
        'SaveClient',
        this.props.client.id,
        this.newSurnameRef.value || this.props.client.surname,
        this.newBalanceRef.value || this.props.client.balance,
      );
    }
  };
  saveNew = () => {
    if (this.newSurnameRef && this.newBalanceRef) {
      const newClient = {
        surname: this.newSurnameRef.value,
        name: this.newNameRef.value,
        fatherName: this.newFatherNameRef.value,
        balance: this.newBalanceRef.value,
        status: this.newStatusRef.value,
      };
      mobileEvents.emit('SaveNewClient', newClient);
    }
  };

  render() {
    console.log(`Form rendered`);
    return (
      <div>
        {this.props.mode === 'edit' && (
          <form>
            <label>
              <span>Фамилия</span>
              <input defaultValue={this.props.client.surname} ref={this.setNewSurnameRef} />
            </label>
            <label>
              <span>Баланс</span>
              <input defaultValue={this.props.client.balance} ref={this.setNewBalanceRef} />
            </label>
            <input type="button" value="Сохранить" onClick={this.saveChanges} />
          </form>
        )}
        {this.props.mode === 'add' && (
          <form>
            <label>
              <span>Фамилия</span>
              <input ref={this.setNewSurnameRef} />
            </label>
            <label>
              <span>Имя</span>
              <input ref={this.setNewNameRef} />
            </label>
            <label>
              <span>Отчество</span>
              <input ref={this.setNewFatherNameRef} />
            </label>
            <label>
              <span>Баланс</span>
              <input ref={this.setNewBalanceRef} />
            </label>
            <label>
              <span>Статус</span>
              <select ref={this.setNewStatusRef}>
                <option>active</option>
                <option>blocked</option>
              </select>
            </label>
            <input type="button" value="Сохранить" onClick={this.saveNew} />
          </form>
        )}
      </div>
    );
  }
}

export default ClientForm;
