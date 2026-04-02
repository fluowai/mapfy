import React from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { Prospecting } from './components/Prospecting';
import { ProfileAnalysis } from './components/ProfileAnalysis';
import { Reviews } from './components/Reviews';
import { Clients } from './components/Clients';
import { Locations } from './components/Locations';
import { Proposals } from './components/Proposals';
import { Settings } from './components/Settings';
import { Competitors } from './components/Competitors';
import { Posts } from './components/Posts';
import { Tasks } from './components/Tasks';
import { Reports } from './components/Reports';
import Alerts from './components/Alerts';
import { Toaster } from 'sonner';

function App() {
  const [activeTab, setActiveTab] = React.useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'prospecting':
        return <Prospecting />;
      case 'profile_analysis':
        return <ProfileAnalysis />;
      case 'competitors':
        return <Competitors />;
      case 'reviews':
        return <Reviews />;
      case 'clients':
        return <Clients />;
      case 'locations':
        return <Locations />;
      case 'posts':
        return <Posts />;
      case 'tasks':
        return <Tasks />;
      case 'reports':
        return <Reports />;
      case 'alerts':
        return <Alerts />;
      case 'proposals':
        return <Proposals />;
      case 'settings':
        return <Settings />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <p className="text-xl font-medium">Módulo em desenvolvimento</p>
            <p className="text-sm">Estamos trabalhando para trazer esta funcionalidade em breve.</p>
          </div>
        );
    }
  };

  return (
    <>
      <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
        {renderContent()}
      </Layout>
      <Toaster position="top-right" />
    </>
  );
}

export default App;
