// hoc_example.tsx

// =============================================================================
// React Componentes Avançados - Exemplo de Higher-Order Component (HOC)
// =============================================================================

import React, { ComponentType, useState, useEffect } from 'react';

// -----------------------------------------------------------------------------
// 1. HOC Simples: `withLogger`
//    - Adiciona um console.log no `componentDidMount` (para classes) ou `useEffect` (para funcionais).
// -----------------------------------------------------------------------------

interface WithLoggerProps {
  componentName: string;
}

function withLogger<P extends object>(WrappedComponent: ComponentType<P>) {
  const name = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  const ComponentWithLogger: React.FC<P & WithLoggerProps> = (props) => {
    useEffect(() => {
      console.log(`${props.componentName || name}: montado.`);
      return () => {
        console.log(`${props.componentName || name}: desmontado.`);
      };
    }, [props.componentName]);

    return <WrappedComponent {...(props as P)} />;
  };

  ComponentWithLogger.displayName = `WithLogger(${name})`;
  return ComponentWithLogger;
}

// Componentes que serão "enriquecidos" pelo HOC
const MyComponent: React.FC = () => (
  <div style={{ border: '1px dashed blue', padding: '10px', margin: '5px 0' }}>
    <p>Este é MyComponent.</p>
  </div>
);

const AnotherComponent: React.FC<{ data: string }> = ({ data }) => (
  <div style={{ border: '1px dashed green', padding: '10px', margin: '5px 0' }}>
    <p>Este é AnotherComponent com dados: {data}</p>
  </div>
);

// Criando componentes aprimorados com o HOC
const MyComponentWithLogger = withLogger(MyComponent);
const AnotherComponentWithLogger = withLogger(AnotherComponent);

// -----------------------------------------------------------------------------
// 2. HOC para Carregamento de Dados (Conceitual: `withDataFetcher`)
//    - Um HOC mais complexo que simula o carregamento de dados.
// -----------------------------------------------------------------------------

interface WithDataProps {
  data: string[] | null;
  isLoading: boolean;
  error: string | null;
}

interface DataFetcherConfig {
  fetchFunction: () => Promise<string[]>;
  dataKey: string;
}

function withDataFetcher<P extends WithDataProps>(config: DataFetcherConfig) {
  return function <T extends object>(WrappedComponent: ComponentType<P & T>) {
    const name = WrappedComponent.displayName || WrappedComponent.name || 'Component';

    const ComponentWithData: React.FC<T> = (props) => {
      const [data, setData] = useState<string[] | null>(null);
      const [isLoading, setIsLoading] = useState<boolean>(true);
      const [error, setError] = useState<string | null>(null);

      useEffect(() => {
        const fetchData = async () => {
          setIsLoading(true);
          setError(null);
          try {
            const fetchedData = await config.fetchFunction();
            setData(fetchedData);
          } catch (err: any) {
            setError(err.message || "Erro ao carregar dados");
          } finally {
            setIsLoading(false);
          }
        };
        fetchData();
      }, []);

      return (
        <WrappedComponent 
          {...props as T}
          data={data}
          isLoading={isLoading}
          error={error}
        />
      );
    };

    ComponentWithData.displayName = `WithDataFetcher(${name})`;
    return ComponentWithData;
  };
}

// Simulação de uma função de API para buscar usuários
const fetchUsers = (): Promise<string[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(["Alice", "Bob", "Charlie"]);
    }, 1500);
  });
};

// Componente que exibirá a lista de usuários
interface UserListProps extends WithDataProps {}

const UserList: React.FC<UserListProps> = ({ data, isLoading, error }) => {
  if (isLoading) return <p>Carregando usuários...</p>;
  if (error) return <p style={{ color: 'red' }}>Erro: {error}</p>;
  return (
    <div>
      <h3>Lista de Usuários</h3>
      <ul>
        {data?.map((user, index) => <li key={index}>{user}</li>)}
      </ul>
    </div>
  );
};

// Criando um UserList aprimorado com o HOC de carregamento de dados
const UserListWithData = withDataFetcher<UserListProps>({
  fetchFunction: fetchUsers,
  dataKey: "users",
})(UserList);

// -----------------------------------------------------------------------------
// Componente Principal para Demonstrar os HOCs
// -----------------------------------------------------------------------------

const HocExamples: React.FC = () => {
  const [showComponents, setShowComponents] = useState(true);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Exemplos de Higher-Order Components (HOCs)</h1>
      
      <button 
        onClick={() => setShowComponents(!showComponents)}
        style={{ padding: '10px 15px', fontSize: '1em', cursor: 'pointer', marginBottom: '20px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '5px' }}
      >
        {showComponents ? 'Esconder Componentes com Logger' : 'Mostrar Componentes com Logger'}
      </button>

      {showComponents && (
        <div>
          <h3>1. Exemplo de `withLogger` (ver console)</h3>
          <MyComponentWithLogger componentName="MeuComponenteInicial" />
          <AnotherComponentWithLogger componentName="OutroComponenteComDados" data="dados_iniciais" />
        </div>
      )}

      <h3 style={{ marginTop: '30px' }}>2. Exemplo de `withDataFetcher`</h3>
      <div style={{ border: '1px solid #17a2b8', padding: '15px', borderRadius: '5px', backgroundColor: '#e0f7fa' }}>
        <UserListWithData />
      </div>

      <p style={{ marginTop: '20px', fontSize: '0.9em', color: '#666' }}>
        Abra o console do navegador para ver os logs do `withLogger`.
      </p>
    </div>
  );
};

export default HocExamples;

/*
Para usar este componente em uma aplicação React:

1.  Crie um arquivo `.tsx` (ex: `App.tsx` ou `HocExamples.tsx`).
2.  Cole o código.
3.  Importe e renderize em seu componente principal:
    ```tsx
    import React from 'react';
    import HocExamples from './HocExamples'; // Ajuste o caminho

    function App() {
      return (
        <div className="App">
          <HocExamples />
        </div>
      );
    }

    export default App;
    ```

Abra o console do navegador para ver os logs dos HOCs.
*/
