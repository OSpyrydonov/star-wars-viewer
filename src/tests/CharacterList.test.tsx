import { render, screen } from '@testing-library/react';
import CharacterList from '../components/CharacterList';

test('renders loading text while fetching data', () => {
  render(<CharacterList />);
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
});
