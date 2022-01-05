import React from 'react';
import PropTypes from 'prop-types';
import '../Mobile.css';
import Client from './Client';
import ClientForm from './ClientForm';
import { mobileEvents } from './events';

class MobileCompany extends React.PureComponent {
  static propTypes = {
    clientss: PropTypes.arrayOf(PropTypes.object),
  };

  state = {
    clients: this.props.clients,
    editFormOpen: false,
    clientToEdit: {},
    addFormOpen: false,
    formMode: '',
    filter: 'all',
  };

  newClient = () => {
    this.setState({ addFormOpen: true, formMode: 'add' });
  };

  saveNewClient = (client) => {
    let changedClients = [...this.state.clients];
    let ids = changedClients.map((client) => client.id);
    let newClientId = Math.max(...ids) + 1;
    let newClient = { ...client, id: newClientId };
    changedClients = [...this.state.clients, newClient];
    this.setState({ clients: changedClients, addFormOpen: false, formMode: '' });
  };

  editClient = (id) => {
    const clients = [...this.state.clients];
    clients.forEach((client, i) => {
      if (client.id === id) {
        this.setState({ editFormOpen: true, clientToEdit: client, formMode: 'edit' });
      }
    });
  };

  saveChanges = (id, surname, balance) => {
    let changed = false;
    let changedClients = [...this.state.clients];
    changedClients.forEach((client, i) => {
      if (client.id === id && (client.balance !== balance || client.surname !== surname)) {
        let changedClient = { ...client };
        changedClient.balance = balance;
        changedClient.surname = surname;
        changedClients[i] = changedClient;
        changed = true;
      }
    });
    if (changed)
      this.setState({
        clients: changedClients,
        editFormOpen: false,
        clientToEdit: NaN,
        formMode: '',
      });
  };

  deleteClient = (id) => {
    let changedClients = [...this.state.clients];
    changedClients.forEach((client, i) => {
      if (client.id === id) {
        changedClients.splice(i, 1);
      }
    });
    this.setState({ clients: changedClients });
  };

  componentDidMount = () => {
    mobileEvents.addListener('SaveNewClient', this.saveNewClient);
    mobileEvents.addListener('EditClient', this.editClient);
    mobileEvents.addListener('SaveClient', this.saveChanges);
    mobileEvents.addListener('DeleteClient', this.deleteClient);
  };

  componentWillUnmount = () => {
    mobileEvents.removeListener('SaveNewClient', this.saveNewClient);
    mobileEvents.removeListener('EditClient', this.editClient);
    mobileEvents.removeListener('SaveClient', this.saveChanges);
    mobileEvents.removeListener('DeleteClient', this.deleteClient);
  };

  render() {
    console.log(`Mobile component rendered`);
    const headClients = (
      <tr>
        <th>Фамилия</th>
        <th>Имя</th>
        <th>Отчество</th>
        <th>Баланс</th>
        <th>Статус</th>
        <th>Редактировать</th>
        <th>Удалить</th>
      </tr>
    );
    let clientsToDisplay = [...this.state.clients];
    if (this.state.filter !== 'all') {
      clientsToDisplay = clientsToDisplay.filter((client) => client.status === this.state.filter);
    }
    const clients = clientsToDisplay.map((client) => (
      <Client key={client.id} id={client.id} client={client} />
    ));
    return (
      <div className="MobileComponent">
        <input type="button" value="Все" onClick={() => this.setState({ filter: 'all' })} />
        <input type="button" value="Активные" onClick={() => this.setState({ filter: 'active' })} />
        <input
          type="button"
          value="Заблокированные"
          onClick={() => this.setState({ filter: 'blocked' })}
        />
        <table>
          <thead>{headClients}</thead>
          <tbody className="Clients">{clients}</tbody>
        </table>
        <button className={this.state.displayAddButton} onClick={this.newClient}>
          Добавить клиента
        </button>
        {(this.state.addFormOpen || this.state.editFormOpen) && (
          <ClientForm
            key={this.state.clientToEdit.id}
            mode={this.state.formMode}
            client={this.state.clientToEdit}
          />
        )}
      </div>
    );
  }
}

export default MobileCompany;
