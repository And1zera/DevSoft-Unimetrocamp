/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import closeImg from '../../assets/close.svg';
import { useAuthenticator } from '../../hooks/useAuthenticator';
import { User } from '../../interfaces';
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
  const { user } = useAuthenticator();

  const [dados, setDados] = useState<User[]>([]);

  useEffect(() => {
    api
      .get('Usuario/listall')
      .then(({ data }) => {
        setDados(data.result);
      })
      .catch(() => toast.error('Ocorreu um erro, por favor tente novamente!'));
  }, []);

  const onSubmit = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updatedData = dados.map((d: any) => ({
      ...d,
      fidelidade: isLoyalty,
    }));
    setDados(updatedData);
    api.put('Usuario', { id: user.userId, fidelidade: isLoyalty ? 1 : 0 });
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
          {dados.map(
            dt =>
              user.userId === dt.id && (
                <div key={dt.email}>
                  <div className="switch">
                    <input
                      id="switch-1"
                      type="checkbox"
                      className="switch-input"
                      onClick={() => setIsLoyalty(!dt.fidelidade)}
                      onChange={onSubmit}
                      checked={!!dt.fidelidade}
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
                          Sua pontuação: {dt.fidelidadePontuacao} pontos
                        </span>
                      </div>
                    </>
                  )}
                </div>
              )
          )}
        </form>
      </Container>
    </Modal>
  );
}
