import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import './assets/css/tailwind.output.css'
import App from './App'
import 'react-toastify/dist/ReactToastify.css';
import { SidebarProvider } from './context/SidebarContext'
import ThemedSuspense from './components/ThemedSuspense'
import * as serviceWorker from './serviceWorker'
import { Provider } from 'react-redux';
import store from './store';
import './assets/css/index.css'
import './i18n';

ReactDOM.render(
  <Provider store={store}>
  <SidebarProvider>
    <Suspense fallback={<ThemedSuspense />}>
        <App />
    </Suspense>
  </SidebarProvider>
  </Provider>,
  document.getElementById('root')
)

serviceWorker.register()
