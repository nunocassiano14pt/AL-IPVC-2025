
import React from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Users, TrendingDown, Award, Calendar } from 'lucide-react';
import Layout from '../components/layout/Layout';
import PageTitle from '../components/common/PageTitle';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import KpiCard from '../components/dashboard/KpiCard';
import ChurnByTypeChart from '../components/dashboard/ChurnByTypeChart';
import ChurnByAgeChart from '../components/dashboard/ChurnByAgeChart';
import ChurnByModalityChart from '../components/dashboard/ChurnByModalityChart';
import ModalityKpi from '../components/dashboard/ModalityKpi';
import { churnMetrics, modalidadeMetrics } from '../data/dashboardMockData';

const Index = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <PageTitle 
          title="Previsão de Desistências" 
          subtitle="Monitorize e previna a desistência de subscritores."
        />
        
        <div className="dashboard-card mb-6">
          <div className="p-6 flex justify-between items-center">
            <h2 className="text-lg font-medium">Gerir Previsões</h2>
            <Link to="/predictions">
              <Button variant="default">
                <PlusCircle className="mr-2 h-4 w-4" />
                Ver Previsões
              </Button>
            </Link>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <KpiCard
              title="Total de Subscritores"
              value={churnMetrics.total_subscritores.toLocaleString()}
              icon={Users}
            />
            <KpiCard
              title="Probabilidade Média"
              value={`${churnMetrics.probabilidade_media.toFixed(1)}%`}
              icon={TrendingDown}
            />
            <KpiCard
              title="Melhor Retenção"
              value={churnMetrics.melhor_retencao}
              subtitle="Tipo de subscrição"
              icon={Award}
            />
            <KpiCard
              title="Churn no Último Mês"
              value={`${churnMetrics.churn_ultimo_mes}%`}
              trend={{ value: 1.2, isPositive: false }}
              icon={Calendar}
            />
          </div>
          
          <Tabs defaultValue="tipos" className="mb-6">
            <TabsList className="custom-tabs-list">
              <TabsTrigger value="tipos" className="custom-tab-trigger">Por Período</TabsTrigger>
              <TabsTrigger value="modalidades" className="custom-tab-trigger">Por Modalidade</TabsTrigger>
            </TabsList>
            <TabsContent value="tipos" className="space-y-6 mt-4">
              <ChurnByTypeChart data={churnMetrics.por_tipo} />
            </TabsContent>
            <TabsContent value="modalidades" className="space-y-6 mt-4">
              <ModalityKpi data={modalidadeMetrics.por_modalidade} />
              <ChurnByModalityChart data={modalidadeMetrics.por_modalidade} />
            </TabsContent>
          </Tabs>

          <div className="mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">Probabilidade por Faixa Etária</CardTitle>
              </CardHeader>
              <CardContent>
                <ChurnByAgeChart data={churnMetrics.por_idade} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
