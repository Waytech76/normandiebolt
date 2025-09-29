import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Error boundary to catch any initialization errors
const ErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  try {
    return <>{children}</>;
  } catch (error) {
    console.error('Application error:', error);
    return (
      <div style={{ padding: '20px', fontFamily: 'Arial', color: 'red' }}>
        <h1>Erreur de chargement</h1>
        <p>Une erreur s'est produite lors du chargement de l'application.</p>
        <details>
          <summary>Détails de l'erreur</summary>
          <pre>{String(error)}</pre>
        </details>
      </div>
    );
  }
};

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

try {
  createRoot(rootElement).render(
    <StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StrictMode>
  );
} catch (error) {
  console.error('Failed to render app:', error);
  rootElement.innerHTML = `
    <div style="padding: 20px; font-family: Arial;">
      <h1>⚠️ Erreur de chargement</h1>
      <p>L'application n'a pas pu se charger correctement.</p>
      <p><strong>Détails:</strong> ${error}</p>
    </div>
  `;
}