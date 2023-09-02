import { useSelector } from 'react-redux'

import * as S from './styles'

import cesta from '../../assets/cesta.png'
import { paraReal } from '../Produto'

import { RootState } from '../../store'

const Header = () => {
  const itnes = useSelector((state: RootState) => state.carrinho.itens)

  const valorTotal = itnes.reduce((acc, item) => {
    acc += item.preco
    return acc
  }, 0)

  return (
    <S.Header>
      <h1 data-testid="svg-element">EBAC Games</h1>
      <div>
        <img src={cesta} />
        <div>
          <span data-testid="qtd-carrinho">{itnes.length} itens</span>, valor
          total: {paraReal(valorTotal)}
        </div>
      </div>
    </S.Header>
  )
}

export default Header
