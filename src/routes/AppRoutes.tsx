import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from '../components/Layout/Layout';
import { Contato } from '../pages/Contato/Contato';
import { FAQ } from '../pages/FAQ/FAQ';
import { Home } from '../pages/Home/Home';
import { Integrantes } from '../pages/Integrantes/Integrantes';
import { BeneficiariosPage } from '../pages/Solucao/BeneficiariosPage';
import { DentistasPage } from '../pages/Solucao/DentistasPage';
import { DoacoesPage } from '../pages/Solucao/DoacoesPage';
import { DoadoresPage } from '../pages/Solucao/DoadoresPage';
import { EntityDetailPage } from '../pages/Solucao/EntityDetailPage';
import { SolucaoDetalhe } from '../pages/Solucao/SolucaoDetalhe';
import { Solucao } from '../pages/Solucao/Solucao';
import { TriagensPage } from '../pages/Solucao/TriagensPage';
import { VoluntariosPage } from '../pages/Solucao/VoluntariosPage';
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
        <Route path="/solucao/beneficiarios" element={<BeneficiariosPage />} />
        <Route path="/solucao/beneficiarios/:id" element={<EntityDetailPage entidade="beneficiário" />} />
        <Route path="/solucao/dentistas" element={<DentistasPage />} />
        <Route path="/solucao/dentistas/:id" element={<EntityDetailPage entidade="dentista" />} />
        <Route path="/solucao/doadores" element={<DoadoresPage />} />
        <Route path="/solucao/doadores/:id" element={<EntityDetailPage entidade="doador" />} />
        <Route path="/solucao/doacoes" element={<DoacoesPage />} />
        <Route path="/solucao/doacoes/:id" element={<EntityDetailPage entidade="doação" />} />
        <Route path="/solucao/voluntarios" element={<VoluntariosPage />} />
        <Route path="/solucao/voluntarios/:id" element={<EntityDetailPage entidade="voluntário" />} />
        <Route path="/solucao/triagens" element={<TriagensPage />} />
        <Route path="/solucao/triagens/:id" element={<EntityDetailPage entidade="triagem" />} />
        <Route path="/solucao/:id" element={<SolucaoDetalhe />} />
      </Routes>
    </Layout>
  );
}
