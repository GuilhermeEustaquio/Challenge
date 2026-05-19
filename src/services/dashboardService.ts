import { mockDashboardResumo } from '../mocks/mockData'; import type { DashboardResumo } from '../types'; import { apiGet, isApiEnabled } from './api';
export const dashboardService={resumo:async():Promise<DashboardResumo>=>isApiEnabled()?apiGet('/dashboard/resumo'):mockDashboardResumo};
