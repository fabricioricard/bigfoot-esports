import { createContext, useContext, useState } from 'react';

const NewsContext = createContext();

export const NewsProvider = ({ children }) => {
  const [selectedNews, setSelectedNews] = useState(null);
  const [showAdModal, setShowAdModal] = useState(false);
  const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);

  return (
    <NewsContext.Provider
      value={{
        selectedNews,
        setSelectedNews,
        showAdModal,
        setShowAdModal,
        showWithdrawalModal,
        setShowWithdrawalModal,
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};

export const useNewsContext = () => useContext(NewsContext);