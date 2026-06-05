// context_api_example.tsx

// =============================================================================
// React Gerenciamento de Estado - Exemplo de Context API
// =============================================================================

import React, { createContext, useState, useContext, ReactNode } from 'react';

// -----------------------------------------------------------------------------
// 1. Criando o Contexto
//    - Define a forma do estado global e as ações para modificá-lo.
// -----------------------------------------------------------------------------

interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

// Valor padrão do contexto (será sobrescrito pelo Provider)
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// -----------------------------------------------------------------------------
// 2. Criando um Provedor de Contexto (Context Provider)
//    - Componente que encapsula a lógica do estado e o distribui para os filhos.
// -----------------------------------------------------------------------------

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// -----------------------------------------------------------------------------
// 3. Criando um Hook Customizado para Consumir o Contexto (Opcional, mas recomendado)
//    - Simplifica o acesso ao contexto e adiciona verificação de erro.
// -----------------------------------------------------------------------------

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// -----------------------------------------------------------------------------
// 4. Componentes Consumidores
//    - Componentes que acessam o estado e as funções fornecidas pelo contexto.
// -----------------------------------------------------------------------------

const ThemeToggleButton: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  const buttonStyle: React.CSSProperties = {
    padding: '10px 20px',
    fontSize: '1em',
    cursor: 'pointer',
    backgroundColor: theme === 'light' ? '#333' : '#eee',
    color: theme === 'light' ? 'white' : 'black',
    border: 'none',
    borderRadius: '5px',
    marginTop: '20px'
  };

  return (
    <button onClick={toggleTheme} style={buttonStyle}>
      Alternar para Tema {theme === 'light' ? 'Escuro' : 'Claro'}
    </button>
  );
};

const ThemedContent: React.FC = () => {
  const { theme } = useTheme();

  const contentStyle: React.CSSProperties = {
    backgroundColor: theme === 'light' ? '#fff' : '#333',
    color: theme === 'light' ? '#333' : '#fff',
    padding: '30px',
    borderRadius: '10px',
    border: `1px solid ${theme === 'light' ? '#ddd' : '#555'}`,
    marginTop: '20px'
  };

  return (
    <div style={contentStyle}>
      <h3>Conteúdo Temático</h3>
      <p>Este conteúdo se adapta ao tema atual: <strong>{theme}</strong></p>
    </div>
  );
};

// -----------------------------------------------------------------------------
// Componente Principal que Monta a Aplicação com o Provedor
// -----------------------------------------------------------------------------

const ContextApiExample: React.FC = () => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center', padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h1>Exemplo de Context API</h1>
      <p>Demonstração de como compartilhar estado global (tema) entre componentes sem prop drilling.</p>
      <ThemeProvider>
        <ThemeToggleButton />
        <ThemedContent />
      </ThemeProvider>
      <p style={{ marginTop: '30px', fontSize: '0.9em', color: '#666' }}>
        O `ThemeProvider` envolve os componentes que precisam acessar o tema. 
        Qualquer componente dentro do `ThemeProvider` pode usar o `useTheme` hook para acessar o tema e a função `toggleTheme`.
      </p>
    </div>
  );
};

export default ContextApiExample;

/*
Para usar este componente em uma aplicação React:

1.  Crie um arquivo .tsx (ex: App.tsx).
2.  Importe o componente: `import ContextApiExample from './ContextApiExample';`
3.  Renderize-o: `<ContextApiExample />`
*/
