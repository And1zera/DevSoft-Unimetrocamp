/* eslint-disable consistent-return */
import React, { useState } from 'react';
import { MdAddCircle } from 'react-icons/md';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import closeImg from '../../assets/close.svg';
import { useCart } from '../../hooks/useCart';
import { api } from '../../services/api';
import { Container, Content } from './styles';

interface ParticipantsProps {
  onCloseModal: () => void;
  isOpen: boolean;
  id: number;
}

interface RG {
  rg: string;
}

export function Participants({
  onCloseModal,
  isOpen,
  id,
}: ParticipantsProps): JSX.Element {
  const [rgs, setRgs] = useState<RG[]>([{ rg: '' }]);
  const [isDisabled, setIsDesabled] = useState(false);
  const { cart } = useCart();

  const handleChangeRg = async (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    rgs[index].rg = e.target.value;
    setRgs([...rgs]);
  };

  const handleCloseModal = () => {
    setRgs([{ rg: '' }]);
    setIsDesabled(false);
    onCloseModal();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    cart.map(async product => {
      if (product.id === id) {
        await api.put(`/shoppingCart/${id}`, {
          ...product,
          rgs,
        });
      }
    });
    setRgs([{ rg: '' }]);
    onCloseModal();
  };

  const handleAddRg = () => {
    cart.map(product => {
      let rgsLength = rgs.length + 1;
      if (product.id === id && rgsLength <= product.qtd) {
        for (rgsLength; rgsLength <= product.qtd; rgsLength += 1) {
          setRgs([...rgs, { rg: '' }]);
        }
        return;
      }
      if (product.id === id && rgsLength >= product.qtd) {
        toast.warning(
          `Quantidade selecionada no carrinho atingida. ${product.qtd} unidades`
        );
        setIsDesabled(true);
      }
      // eslint-disable-next-line no-useless-return
      return;
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleCloseModal}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        className="react-modal-close"
        onClick={handleCloseModal}
      >
        <img src={closeImg} alt="Fechar modal" />
      </button>
      <Container>
        <Content>
          <h2>INFORMAR PARTICIPANTES</h2>
          <div>
            <button
              type="button"
              onClick={handleAddRg}
              className="bnt-add-rg"
              disabled={isDisabled}
            >
              <MdAddCircle size={26} /> Novo RG
            </button>
          </div>
          {rgs.map((rg, index: number) => (
            <input
              key={Number(index)}
              type="text"
              placeholder={`${index + 1}º RG do bilhete `}
              value={rg.rg}
              onChange={e => handleChangeRg(e, index)}
            />
          ))}
          <button type="submit" onClick={handleSubmit}>
            Salvar
          </button>
        </Content>
      </Container>
    </Modal>
  );
}
