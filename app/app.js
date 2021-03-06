/**
 * app.js: Ponto de entrada do aplicativo
 *
 *     A execução do aplicativo começa com o carregamento deste componente, o
 *     qual por sua vez é responsável por criar a infra-estutura de
 *     gerenciamento de estado da arquitetura Flux e passar o controle para o
 *     próximo componente. Por isso, este componente cria um componente
 *     AppContainer dentro de um componente Provider conectado com o "store"
 *     Flux implementado pelo framework Redux.
 *
 *     (O Provider realiza a conexão da interface gráfica do aplicativo com a
 *     parte lógica (implementada pelas ações e redutores do Redux - ver as
 *     pastas app/actions/ e app/reducers/). Especificamente, o Provider torna
 *     o estado do aplicativo acessível ao seu componente-filho, mas não cria
 *     nenhuma ação que a interface gráfica possa iniciar - isso é realizado
 *     pelo AppContainer.
 *
 *     A execução do aplicativo continua no componente AppContainer, que está
 *     implementado em app/containers/appContainer.js.
 *
 * @flow
 * @providesModule saber-app
 *
 **/

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import {
  createStore,
  applyMiddleware,
  combineReducers,
  compose
} from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import reducers from 'reducers';
import AppContainer from 'app-container';

//criamos um logger Redux e especificamos que ele vai funcionar para todas
//as ações quando o app estiver em modo de desenvolvimento.
const loggerMiddleware = createLogger(
  { predicate: (getState, action) => __DEV__ }
);

//e criamos uma configurção para inicializar o estado do aplicativo
//e adicionar middlewares necessário a ele.
function configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    )
  );
  return createStore(reducers, initialState, enhancer);
}

//finalmente, geramos o objeto de estado.
const store = configureStore({});

//a classe App conecta o aplicativo com o backend Redux.
export default class App extends Component {
  render() {
    return(
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}
