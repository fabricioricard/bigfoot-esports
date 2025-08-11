import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { auth } from '../firebase/firebaseConfig';

function Header({ user, setModalOpen }) {
  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      alert('Erro ao fazer logout: ' + error.message);
    }
  };

  return (
    <header>
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            <img
              src="https://raw.githubusercontent.com/fabricioricard/BIGFOOT-Esports-Site/main/images/logo.jpg"
              alt="Logo BIGFOOT Esports"
              className="logo-jpg"
            />
            <span>BIGFOOT Esports</span>
          </Link>
        </div>
        <nav>
  <ul className="nav-menu">
    <li><NavLink to="/noticias-lol">📰 Notícias LoL</NavLink></li>
    <li><NavLink to="/loja">🛒 Loja</NavLink></li>
    <li><NavLink to="/lan-house">🖥️ Lan House</NavLink></li>
    <li><NavLink to="/doacao">💰 Doação</NavLink></li>
    <li><NavLink to="/equipe-lol">👥 Equipe LoL</NavLink></li>
  </ul>
</nav>
        <div className="user-section" id="user-section">
          {!user ? (
            <button className="btn btn-primary login-btn" onClick={() => setModalOpen(true)}>
              🔐 Login
            </button>
          ) : (
            <div className="user-info logged-in">
              <img
                id="userAvatar"
                className="user-avatar"
                src={user.photoURL || 'https://raw.githubusercontent.com/fabricioricard/BIGFOOT-Esports-Site/main/images/default-avatar.png'}
                alt="Avatar"
              />
              <div className="user-details">
                <span id="userName" className="user-name gradient text-truncate">
                  {user.email ? user.email.split('@')[0] : user.displayName || 'Usuário'}
                </span>
              </div>
              <button className="btn btn-secondary" onClick={handleLogout}>Sair</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;