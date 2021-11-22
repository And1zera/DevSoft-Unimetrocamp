import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { MdMenu } from 'react-icons/md';
import { useAuthenticator } from '../../hooks/useAuthenticator';
import { useModal } from '../../hooks/useModal';
import { Container } from './styles';
import { Fidelidade } from '../Fidelidade';

interface HeaderProps {
  isColorActive: boolean;
  children?: React.ReactNode;
}

export function Header({ isColorActive, children }: HeaderProps): JSX.Element {
  const { handleOpenModal } = useModal();
  const { user, loadData } = useAuthenticator();
  const [visible, setVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();

  const handleLogout = (e: React.FormEvent) => {
    e.preventDefault();
    loadData('', '', '', 0, 0);
    history.push('/');
  };

  return (
    <Container isColorActive={isColorActive}>
      <Link to="/" className="bilhet">
        BILHET
      </Link>
      <nav>
        {children}
        {user.email && user.password ? (
          <>
            <button className="login" type="button" onClick={handleLogout}>
              Sair
            </button>
            <button
              type="button"
              className="menu"
              onClick={() => setVisible(!visible)}
            >
              <MdMenu size={33} color="#F6F6F6" />
              {visible && (
                <div className="content">
                  <ul>
                    <li>
                      <button onClick={() => setIsOpen(true)} type="button">
                        Cliente fidelidade
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </button>
          </>
        ) : (
          <button className="login" type="button" onClick={handleOpenModal}>
            Entrar
          </button>
        )}
      </nav>
      <Fidelidade isOpen={isOpen} setIsOpen={setIsOpen} />
    </Container>
  );
}
