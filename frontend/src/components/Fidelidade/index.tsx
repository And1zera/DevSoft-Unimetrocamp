/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import closeImg from '../../assets/close.svg';
import { api } from '../../services/api';
import { Container } from './styles';

interface FidelidadeProps {
  setIsOpen: (value: boolean) => void;
  isOpen: boolean;
}

export function Fidelidade({
  setIsOpen,
  isOpen,
}: FidelidadeProps): JSX.Element {
  const [isLoyalty, setIsLoyalty] = useState(false);
  const [dados, setDados] = useState<any>([]);

  useEffect(() => {
    api
      .get('http://localhost:3001/login')
      .then(({ data }) => {
        setDados(data);
      })
      .catch(() => toast.error('Ocorreu um erro, por favor tente novamente!'));
  }, []);

  const onSubmit = () => {
    const updatedData = dados.map((d: any) => ({
      ...d,
      fidelidade: isLoyalty,
    }));
    setDados(updatedData);
    api.put(`http://localhost:3001/login/${1}`, ...updatedData);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        className="react-modal-close"
        onClick={() => setIsOpen(false)}
      >
        <img src={closeImg} alt="Fechar modal" />
      </button>
      <Container>
        <h2> FIDELIZAÇÃO </h2>
        <p>
          Com a fidelização você obtêm pontuações que podem ser utilizadas para
          descontos nas suas compras.
        </p>
        <p>Habilite para se tornar cliente fidelidade</p>
        <form>
          {dados.map((dt: any) => (
            <>
              <div className="switch">
                <input
                  id="switch-1"
                  type="checkbox"
                  className="switch-input"
                  onClick={() => setIsLoyalty(!dt.fidelidade)}
                  onChange={onSubmit}
                  checked={dt.fidelidade}
                />
                <label htmlFor="switch-1" className="switch-label">
                  Switch
                </label>
              </div>
              {dt.fidelidade && (
                <>
                  <div className="divider" />
                  <div>
                    <span className="point">
                      Sua pontuação: {dt.point} pontos
                    </span>
                  </div>
                </>
              )}
            </>
          ))}
        </form>
      </Container>
    </Modal>
  );
}
