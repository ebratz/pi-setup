// jsx_example.tsx

// =============================================================================
// React Fundamentos - Exemplo de JSX
// =============================================================================

import React from 'react';

// -----------------------------------------------------------------------------
// 1. JSX Básico
//    - Misturando HTML-like syntax com JavaScript.
// -----------------------------------------------------------------------------

const name = "Mundo";
const element = <h1>Olá, {name}!</h1>; // Usando variável JavaScript dentro de JSX

const JsxExampleBasic: React.FC = () => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', border: '1px solid #eee', borderRadius: '8px' }}>
      <h2>Exemplo de JSX Básico</h2>
      {element}
      <p>Você pode incorporar expressões JavaScript dentro de chaves `{}`.</p>
      <p>2 + 2 = {2 + 2}</p>
      <p>Isso é JSX.</p>
    </div>
  );
};

// -----------------------------------------------------------------------------
// 2. JSX com Condicionais (Renderização Condicional)
//    - Usando operadores ternários ou '&&' para renderizar condicionalmente.
// -----------------------------------------------------------------------------

interface UserProfileProps {
  isLoggedIn: boolean;
  username?: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ isLoggedIn, username }) => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', border: '1px solid #eee', borderRadius: '8px', marginTop: '20px' }}>
      <h2>Renderização Condicional com JSX</h2>
      {isLoggedIn ? (
        <p>Bem-vindo(a), <strong>{username}!</strong></p>
      ) : (
        <p>Por favor, faça login.</p>
      )}

      {isLoggedIn && <button>Sair</button>}
      {!isLoggedIn && <button>Entrar</button>}
    </div>
  );
};

// -----------------------------------------------------------------------------
// 3. JSX com Listas (Renderização de Listas)
//    - Usando `map()` para renderizar uma lista de elementos.
// -----------------------------------------------------------------------------

interface Item {
  id: number;
  text: string;
}

const items: Item[] = [
  { id: 1, text: 'Maçã' },
  { id: 2, text: 'Banana' },
  { id: 3, text: 'Cereja' },
];

const ShoppingList: React.FC = () => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', border: '1px solid #eee', borderRadius: '8px', marginTop: '20px' }}>
      <h2>Renderização de Listas com JSX</h2>
      <ul>
        {items.map(item => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    </div>
  );
};

// Componente principal para renderizar todos os exemplos de JSX
const JsxExamples: React.FC = () => {
  return (
    <div>
      <JsxExampleBasic />
      <UserProfile isLoggedIn={true} username="developer123" />
      <UserProfile isLoggedIn={false} />
      <ShoppingList />
    </div>
  );
};

export default JsxExamples;

/*
Para usar este componente em uma aplicação React:

1.  Crie um arquivo `.tsx` (ex: `App.tsx` ou `JsxExamples.tsx`).
2.  Cole o código.
3.  Importe e renderize em seu componente principal:
    ```tsx
    import React from 'react';
    import JsxExamples from './JsxExamples'; // Ajuste o caminho conforme necessário

    function App() {
      return (
        <div className="App">
          <h1>Demonstrações de JSX</h1>
          <JsxExamples />
        </div>
      );
    }

    export default App;
    ```
*/
