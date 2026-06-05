// usereducer_example.tsx

// =============================================================================
// React Gerenciamento de Estado - Exemplo de useReducer
// =============================================================================

import React, { useReducer } from 'react';

// -----------------------------------------------------------------------------
// 1. Definição do Estado e Ações
//    - O estado é um objeto para o contador e um texto de mensagem.
//    - As ações são tipos string para descrever as operações.
// -----------------------------------------------------------------------------

interface CounterState {
  count: number;
  message: string;
}

type CounterAction =
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'RESET'; payload: number }
  | { type: 'SET_MESSAGE'; payload: string };

// -----------------------------------------------------------------------------
// 2. Função Reducer
//    - Lógica pura que define como o estado muda em resposta às ações.
// -----------------------------------------------------------------------------

const counterReducer = (state: CounterState, action: CounterAction): CounterState => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1, message: "Incrementado!" };
    case 'DECREMENT':
      return { ...state, count: state.count - 1, message: "Decrementado!" };
    case 'RESET':
      return { ...state, count: action.payload, message: "Resetado!" };
    case 'SET_MESSAGE':
        return { ...state, message: action.payload };
    default:
      return state;
  }
};

// -----------------------------------------------------------------------------
// 3. Componente que usa `useReducer`
// -----------------------------------------------------------------------------

interface ComplexCounterProps {
  initialCount?: number;
}

const ComplexCounter: React.FC<ComplexCounterProps> = ({ initialCount = 0 }) => {
  const [state, dispatch] = useReducer(counterReducer, { count: initialCount, message: "Iniciado" });

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center', padding: '20px', border: '1px solid #4CAF50', borderRadius: '8px', maxWidth: '400px', margin: '20px auto', backgroundColor: '#e8f5e9' }}>
      <h2>Contador com useReducer</h2>
      <p style={{ fontSize: '3em', margin: '10px 0', color: '#2e7d32' }}>{state.count}</p>
      <p style={{ fontSize: '1em', color: '#555' }}>{state.message}</p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '15px' }}>
        <button 
          onClick={() => dispatch({ type: 'DECREMENT' })}
          style={{ padding: '10px 20px', fontSize: '1em', cursor: 'pointer', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '5px' }}
        >
          Decrementar
        </button>
        <button 
          onClick={() => dispatch({ type: 'RESET', payload: 0 })}
          style={{ padding: '10px 20px', fontSize: '1em', cursor: 'pointer', backgroundColor: '#ff9800', color: 'white', border: 'none', borderRadius: '5px' }}
        >
          Resetar
        </button>
        <button 
          onClick={() => dispatch({ type: 'INCREMENT' })}
          style={{ padding: '10px 20px', fontSize: '1em', cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px' }}
        >
          Incrementar
        </button>
      </div>
      <div style={{ marginTop: '20px' }}>
        <input 
            type="text" 
            value={state.message}
            onChange={(e) => dispatch({ type: 'SET_MESSAGE', payload: e.target.value })}
            placeholder="Mudar Mensagem"
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', width: '80%' }}
        />
      </div>
    </div>
  );
};

export default ComplexCounter;

/*
Para usar este componente em uma aplicação React:

1.  Crie um arquivo .tsx (ex: App.tsx).
2.  Importe o componente: `import ComplexCounter from './ComplexCounter';`
3.  Renderize-o: `<ComplexCounter initialCount={10} />`
*/
