import React, { createContext, useContext, useState } from 'react';

// Localization strings
const langMap = {
  en: {
    lang: 'English',
    turn: 'Your Turn',
    win: 'You win!',
    lose: 'You lose!',
    draw: 'Draw!',
    thinking: 'Computer is thinking...',
    restart: 'Restart',
  },
  'zh-cn': {
    lang: '简体中文',
    turn: '你的回合',
    win: '你赢了！',
    lose: '你输了！',
    draw: '平局！',
    thinking: '电脑思考中...',
    restart: '重新开始',
  },
  'zh-tw': {
    lang: '繁體中文',
    turn: '你的回合',
    win: '你贏了！',
    lose: '你輸了！',
    draw: '平局！',
    thinking: '電腦思考中...',
    restart: '重新開始',
  },
};

// Create a Context for managing the language
const LocaleContext = createContext();

// LocaleProvider component to manage language and provide translations
export const LocaleProvider = ({ children }) => {
  const [lang, setLang] = useState('en');
  
  const value = {
    lang,
    setLang,
    t: (key) => langMap[lang]?.[key],
  };
  
  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  );
};

// Custom hook to access localization context
export const useLocale = () => useContext(LocaleContext);
