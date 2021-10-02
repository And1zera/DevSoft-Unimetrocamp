import React, { useState } from 'react';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import closeImg from '../../assets/close.svg';
import { Loading } from '../../components/Loading';
import { Products } from '../../interfaces';
import { api } from '../../services/api';
import { Container } from './styles';

interface ExchangeProps {
  onCloseModal: () => void;
  isOpen: boolean;
  id: string;
  onProducts: (product: Products[]) => void;
  senha: string;
  password: string;
  rg: string;
  setRg: (value: string) => void;
  setPassword: (value: string) => void;
}

export function Exchange({
  onCloseModal,
  isOpen,
  id,
  onProducts,
  senha,
  password,
  rg,
  setRg,
  setPassword,
}: ExchangeProps): JSX.Element {
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      if (!rg && !password) {
        toast.error('Campos RG e Senha são obrigatório');
        return;
      }
      if (!rg) {
        toast.error('Campo RG é obrigatório');
        return;
      }

      if (!password) {
        toast.error('Campo senha é obrigatório');
        return;
      }
      setLoading(true);
      await api.put('/Bilhete/trocar', { id, Rg: rg, Senha: senha });
      const { data } = await api.get('/Bilhete/listall');
      onProducts(data.result);
      toast.success('Alterado com sucesso');
      onCloseModal();
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast.error('Erro ao tentar alterar');
    }
  };

  return (
    <>
      <Loading loading={loading} />
      <Modal
        isOpen={isOpen}
        onRequestClose={onCloseModal}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
      >
        <button
          type="button"
          className="react-modal-close"
          onClick={onCloseModal}
        >
          <img src={closeImg} alt="Fechar modal" />
        </button>
        <Container>
          <h2>TROCAR PARTICIPANTE</h2>
          <input
            type="password"
            placeholder="Senha do bilhete"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <input
            type="text"
            placeholder="Novo RG"
            value={rg}
            onChange={e => setRg(e.target.value)}
          />
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={!rg || !password}
          >
            Enviar
          </button>
        </Container>
      </Modal>
    </>
  );
}
