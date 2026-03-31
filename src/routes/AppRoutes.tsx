import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from '../components/Layout/Layout';
import { Contato } from '../pages/Contato/Contato';
import { FAQ } from '../pages/FAQ/FAQ';
import { Home } from '../pages/Home/Home';
import { Integrantes } from '../pages/Integrantes/Integrantes';
import { SolucaoDetalhe } from '../pages/Solucao/SolucaoDetalhe';
import { Solucao } from '../pages/Solucao/Solucao';
import { Sobre } from '../pages/Sobre/Sobre';

export function AppRoutes() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/integrantes" element={<Integrantes />} />
        <Route path="/solucao" element={<Solucao />} />
        <Route path="/solucao/:id" element={<SolucaoDetalhe />} />
      </Routes>
    </Layout>
  );
}