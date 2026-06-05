// functional_component_example.tsx

// =============================================================================
// React Fundamentos - Exemplo de Componente Funcional
// =============================================================================

import React from 'react';

// -----------------------------------------------------------------------------
// 1. Componente Funcional Básico (sem props ou estado)
// -----------------------------------------------------------------------------

const WelcomeMessage: React.FC = () => {
  return (
    <div style={{ padding: '10px', border: '1px dashed lightblue', marginBottom: '10px' }}>
      <h3>Bem-vindo(a) à Aplicação React!</h3>
      <p>Este é um componente funcional simples.</p>
    </div>
  );
};

// -----------------------------------------------------------------------------
// 2. Componente Funcional com Props (Typed com TypeScript)
//    - Props são argumentos passados de um componente pai para um filho.
//    - Read-only e imutáveis.
// -----------------------------------------------------------------------------

interface GreetingProps {
  name: string;       // Propriedade obrigatória
  message?: string;   // Propriedade opcional
}

const Greeting: React.FC<GreetingProps> = ({ name, message }) => {
  return (
    <div style={{ padding: '10px', border: '1px dashed lightgreen', marginBottom: '10px' }}>
      <h3>Olá, {name}!</h3>
      {message && <p>{message}</p>}
    </div>
  );
};

// -----------------------------------------------------------------------------
// 3. Componente Funcional que recebe children como prop
//    - Para composição de componentes.
// -----------------------------------------------------------------------------

interface CardProps {
  title: string;
  children: React.ReactNode; // Tipo para conteúdos passados entre as tags do componente
}

const Card: React.FC<CardProps> = ({ title, children }) => {
  return (
    <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '15px', margin: '10px 0', backgroundColor: '#f9f9f9' }}>
      <h4 style={{ color: '#333', marginBottom: '10px' }}>{title}</h4>
      <div>{children}</div>
    </div>
  );
};

// -----------------------------------------------------------------------------
// Componente Principal para Demonstrar os Exemplos
// -----------------------------------------------------------------------------

const FunctionalComponentExamples: React.FC = () => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Exemplos de Componentes Funcionais React</h1>

      <WelcomeMessage />

      <Greeting name="Maria" />
      <Greeting name="Pedro" message="Tenha um ótimo dia!" />

      <Card title="Meu Primeiro Card">
        <p>Este é o conteúdo dentro do card. É passado como <strong>children</strong>.</p>
        <button style={{ padding: '8px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Saiba Mais</button>
      </Card>

      <Card title="Outro Card">
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
        </ul>
      </Card>
    </div>
  );
};

export default FunctionalComponentExamples;

/*
Para usar este componente em uma aplicação React:

1.  Crie um arquivo `.tsx` (ex: `App.tsx` ou `FunctionalComponentExamples.tsx`).
2.  Cole o código.
3.  Importe e renderize em seu componente principal:
    ```tsx
    import React from 'react';
    import FunctionalComponentExamples from './FunctionalComponentExamples'; // Ajuste o caminho

    function App() {
      return (
        <div className="App">
          <h1>Demonstrações de Componentes Funcionais</h1>
          <FunctionalComponentExamples />
        </div>
      );
    }

    export default App;
    ```
*/
