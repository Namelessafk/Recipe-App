import { screen, waitFor } from '@testing-library/dom';
import App from '../../App';
import renderWithRouter from '../../renderWithRouter';

const clipedText = 'Link copied!';

describe('Testa o comportamento do botão responsável por compartilhar a receita', () => {
  test('Verifica o comportamento do botão na rota de progresso', async () => {
    const { user } = renderWithRouter(<App />, { route: '/meals/53065/in-progress' });

    const shareBtn = screen.getByTestId('share-btn');
    expect(shareBtn).toHaveAttribute('src', '/src/images/shareIcon.svg');
    await user.click(shareBtn);

    expect(screen.queryByText(clipedText)).toBeInTheDocument();

    await waitFor(() => expect(screen.queryByText(clipedText)).not.toBeInTheDocument(), { timeout: 3500 });
  });
  test('Verifica o comportamento do botão na rota de progresso', async () => {
    const { user } = renderWithRouter(<App />, { route: '/meals/53065' });

    const shareBtn = screen.getByTestId('share-btn');
    expect(shareBtn).toHaveAttribute('src', '/src/images/shareIcon.svg');
    await user.click(shareBtn);

    expect(screen.queryByText(clipedText)).toBeInTheDocument();

    await waitFor(() => expect(screen.queryByText(clipedText)).not.toBeInTheDocument(), { timeout: 3500 });
  });
});
