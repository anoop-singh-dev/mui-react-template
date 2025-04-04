import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header component', () => {
  it('renders a button', () => {
    const mockToggle = jest.fn();
    render(<Header sidebarOpen={true} toggleSidebar={mockToggle} />);
    expect(screen.getAllByRole('button').length).toBeGreaterThan(0);
  });
});