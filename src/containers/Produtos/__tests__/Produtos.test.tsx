import { rest } from 'msw'
import { setupServer } from 'msw/node'

import Produtos from '..'
import { renderizaComProvider } from '../../../utils/tests'
import { screen, waitFor } from '@testing-library/react'

const mocks = [
  {
    id: 1,
    categoria: 'RPG',
    imagem: '',
    plataformas: ['Windows'],
    preco: 150.9,
    precoAntigo: 199.9,
    titulo: 'Elden Ring'
  },
  {
    id: 2,
    categoria: 'RPG',
    imagem: '',
    plataformas: ['Windows', 'ps5', 'Xbox Series S/X'],
    preco: 199.9,
    precoAntigo: 299.9,
    titulo: 'Hagwarts Lagacy'
  },
  {
    id: 3,
    categoria: 'Acão',
    imagem: '',
    plataformas: ['Windows', 'PS5', 'Xbox Series s/x'],
    preco: 199.9,
    precoAntigo: 200,
    titulo: 'Gotham Knihgts'
  },
  {
    id: 4,
    categoria: 'Avntura',
    imagem: '',
    plataformas: ['Nintendo Swith'],
    preco: 189.9,
    precoAntigo: 299.9,
    titulo: 'Donkey kong'
  }
]

const server = setupServer(
  rest.get(
    'http://localhost:4000/produtos',
    (requisicao, resposta, contexto) => {
      return resposta(contexto.json(mocks))
    }
  )
)

describe('Testes para o container produtos', () => {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  test('Deve renderizar corretamente', () => {
    renderizaComProvider(<Produtos />)
    expect(screen.getByTestId('carreg...').innerHTML).toContain('Carregando...')
  })

  test('Deve renderizar corretamente com a lista de jogos', async () => {
    renderizaComProvider(<Produtos />)
    await waitFor(() => {
      expect(screen.getByText('Donkey kong')).toBeInTheDocument()
    })
  })
})
