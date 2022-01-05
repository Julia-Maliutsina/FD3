import React from 'react';
import PropTypes from 'prop-types';

import { mobileEvents } from './events';

class Client extends React.PureComponent {
  static propTypes = {
    client: PropTypes.object.isRequired,
    id: PropTypes.number.isRequired,
  };

  editClientOpen = () => {
    mobileEvents.emit('EditClient', this.props.id);
  };
  deleteClientOpen = () => {
    mobileEvents.emit('DeleteClient', this.props.id);
  };

  render() {
    console.log(`Client ${this.props.id} rendered`);
    return (
      <tr className="ClientInTable">
        <td className="NameInTable">{this.props.client.surname}</td>
        <td className="NameInTable">{this.props.client.name}</td>
        <td className="NameInTable">{this.props.client.fatherName}</td>
        <td className="BalanceInTable">{this.props.client.balance}</td>
        <td className={this.props.client.status === 'active' ? 'StatusActive' : 'StatusBlocked'}>
          {this.props.client.status}
        </td>
        <td className="ClientEditInTable">
          <input type="button" value="Редактировать" onClick={this.editClientOpen} />
        </td>
        <td className="ClientDeleteInTable">
          <input type="button" value="Удалить" onClick={this.deleteClientOpen} />
        </td>
      </tr>
    );
  }
}

export default Client;
