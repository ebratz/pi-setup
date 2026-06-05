// class_component_example.tsx

// =============================================================================
// React Componentes Avançados - Exemplo de Componente de Classe
// =============================================================================

import React, { Component } from 'react';

// -----------------------------------------------------------------------------
// 1. Componente de Classe Básico com Estado e Ciclo de Vida
// -----------------------------------------------------------------------------

interface TimerProps {
  intervalMs: number;
}

interface TimerState {
  seconds: number;
}

class Timer extends Component<TimerProps, TimerState> {
  private timerId: NodeJS.Timeout | undefined;

  constructor(props: TimerProps) {
    super(props);
    this.state = {
      seconds: 0,
    };
    this.tick = this.tick.bind(this); // Importante para garantir o 'this' correto em callbacks
  }

  // Método de ciclo de vida: Chamado após o componente ser montado no DOM.
  // Ideal para setup inicial, como subscriptions ou fetching de dados.
  componentDidMount() {
    console.log("Timer: ComponentDidMount - Iniciando timer.");
    this.timerId = setInterval(this.tick, this.props.intervalMs);
  }

  // Método de ciclo de vida: Chamado quando o componente é atualizado (props ou state mudam).
  // Pode ser usado para sincronizar o DOM com o estado atual ou fazer novas requisições.
  componentDidUpdate(prevProps: TimerProps, prevState: TimerState) {
    if (this.props.intervalMs !== prevProps.intervalMs) {
      console.log("Timer: ComponentDidUpdate - Intervalo mudou, reiniciando timer.");
      if (this.timerId) {
        clearInterval(this.timerId);
      }
      this.timerId = setInterval(this.tick, this.props.intervalMs);
    }
    if (this.state.seconds === 10 && prevState.seconds !== 10) {
        console.log("Timer: ComponentDidUpdate - Contador atingiu 10!");
    }
  }

  // Método de ciclo de vida: Chamado antes do componente ser removido do DOM.
  // Ideal para limpeza, como clearTimeout, cancelar subscriptions, etc.
  componentWillUnmount() {
    console.log("Timer: ComponentWillUnmount - Limpando timer.");
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }

  tick() {
    this.setState(prevState => ({
      seconds: prevState.seconds + 1,
    }));
  }

  render() {
    return (
      <div style={{ padding: '15px', border: '1px solid #007bff', borderRadius: '5px', backgroundColor: '#e7f3ff', textAlign: 'center' }}>
        <h4>Contador de Tempo (Componente de Classe)</h4>
        <p style={{ fontSize: '2.5em', margin: '10px 0' }}>{this.state.seconds}s</p>
        <p>Intervalo de atualização: {this.props.intervalMs}ms</p>
      </div>
    );
  }
}

// -----------------------------------------------------------------------------
// Componente Principal para Demonstrar o Timer de Classe
// -----------------------------------------------------------------------------

interface AppState {
    showTimer: boolean;
}

class ClassComponentApp extends Component<{}, AppState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            showTimer: true
        };
        this.toggleTimer = this.toggleTimer.bind(this);
    }

    toggleTimer() {
        this.setState(prevState => ({ showTimer: !prevState.showTimer }));
    }

    render() {
        return (
            <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
                <h1>Exemplo de Componente de Classe</h1>
                <button 
                    onClick={this.toggleTimer}
                    style={{ padding: '10px 15px', fontSize: '1em', cursor: 'pointer', marginBottom: '20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px' }}
                >
                    {this.state.showTimer ? 'Esconder Timer' : 'Mostrar Timer'}
                </button>
                {this.state.showTimer && <Timer intervalMs={1000} />}
                {!this.state.showTimer && <p>Timer escondido. Observe o `componentWillUnmount` no console.</p>}
            </div>
        );
    }
}

export default ClassComponentApp;

/*
Para usar este componente em uma aplicação React:

1.  Crie um arquivo `.tsx` (ex: `App.tsx` ou `ClassComponentApp.tsx`).
2.  Cole o código.
3.  Importe e renderize em seu componente principal:
    ```tsx
    import React from 'react';
    import ClassComponentApp from './ClassComponentApp'; // Ajuste o caminho

    function App() {
      return (
        <div className="App">
          <ClassComponentApp />
        </div>
      );
    }

    export default App;
    ```

Abra o console do navegador para ver os logs do ciclo de vida do componente Timer.
*/
