import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MobileCompany from '../components/MobileCompany';

import { CLIENTS } from '../constants';

describe('компонент MobileCompany', () => {
  it('рендерит таблицу клиентов', () => {
    render(<MobileCompany clients={CLIENTS} />);
    expect(screen.getByRole('table')).toBeInTheDocument();
  });
  it('фильтрация работает', () => {
    render(<MobileCompany clients={CLIENTS} />);
    userEvent.click(screen.getByTestId('all'));
    let active = screen.queryAllByText('active');
    expect(active.length).toBe(3);
    let blocked = screen.queryAllByText('blocked');
    expect(blocked.length).toBe(1);
    userEvent.click(screen.getByTestId('active'));
    let noBlocked = screen.queryAllByText('blocked');
    expect(noBlocked.length).toBe(0);
    userEvent.click(screen.getByTestId('blocked'));
    let noActive = screen.queryAllByText('active');
    expect(noActive.length).toBe(0);
  });
  it('удаление работает', () => {
    render(<MobileCompany clients={CLIENTS} />);
    userEvent.click(screen.queryAllByText('Удалить')[2]);
    let deleted = screen.queryAllByText('Сидоров');
    expect(deleted.length).toBe(0);
  });
  it('снэпшот добавления', () => {
    const component = render(<MobileCompany clients={CLIENTS} />);
    expect(component).toMatchSnapshot();

    userEvent.click(screen.getByText('Добавить клиента'));
    expect(component).toMatchSnapshot();
  });
  it('снэпшот редактирования', () => {
    const component = render(<MobileCompany clients={CLIENTS} />);
    expect(component).toMatchSnapshot();

    userEvent.click(screen.queryAllByText('Редактировать')[1]);
    expect(component).toMatchSnapshot();
  });
});
