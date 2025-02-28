
import React from 'react';
import { StudentDetail } from '../../types';
import { HelpCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import ChurnTrendChart from './ChurnTrendChart';

interface StudentDetailsCardProps {
  details: StudentDetail;
}

const StudentDetailsCard: React.FC<StudentDetailsCardProps> = ({ details }) => {
  return (
    <div className="animate-fadeIn">
      <div className="mb-6">
        <div className="flex items-center">
          <h2 className="text-lg font-medium">Probabilidade de Abandono:</h2>
          <div className="ml-2 risk-indicator medium">
            <span className="mr-1 font-bold">—</span>
            {details.churnProbability.toFixed(2)}%
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Fatores Positivos */}
        <div className="dashboard-card">
          <div className="flex items-center mb-4">
            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-2">
              <span className="text-green-600 text-lg">+</span>
            </div>
            <h3 className="text-md font-medium">Fatores de Risco</h3>
            <p className="text-xs text-gray-500 ml-2">Aumentam probabilidade de abandono</p>
          </div>
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left pb-3 text-xs font-medium text-gray-500">Fator</th>
                <th className="text-right pb-3 text-xs font-medium text-gray-500 flex items-center justify-end">
                  Impacto
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" className="h-auto p-0 ml-1">
                          <HelpCircle size={14} className="text-gray-400" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">Impacto na probabilidade de abandono</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </th>
              </tr>
            </thead>
            <tbody>
              {details.positiveReasons.map((reason, index) => (
                <tr key={index} className="border-t border-gray-100">
                  <td className="py-3">
                    <div>
                      <div className="font-medium">{reason.feature}</div>
                      <div className="text-xs text-gray-500">{reason.description}</div>
                    </div>
                  </td>
                  <td className="py-3 text-right">
                    <span className="impact-badge positive">+{reason.impact.toFixed(2)}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Fatores Negativos */}
        <div className="dashboard-card">
          <div className="flex items-center mb-4">
            <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center mr-2">
              <span className="text-red-600 text-lg">-</span>
            </div>
            <h3 className="text-md font-medium">Fatores de Proteção</h3>
            <p className="text-xs text-gray-500 ml-2">Diminuem probabilidade de abandono</p>
          </div>
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left pb-3 text-xs font-medium text-gray-500">Fator</th>
                <th className="text-right pb-3 text-xs font-medium text-gray-500 flex items-center justify-end">
                  Impacto
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" className="h-auto p-0 ml-1">
                          <HelpCircle size={14} className="text-gray-400" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">Impacto na probabilidade de abandono</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </th>
              </tr>
            </thead>
            <tbody>
              {details.negativeReasons.map((reason, index) => (
                <tr key={index} className="border-t border-gray-100">
                  <td className="py-3">
                    <div>
                      <div className="font-medium">{reason.feature}</div>
                      <div className="text-xs text-gray-500">{reason.description}</div>
                    </div>
                  </td>
                  <td className="py-3 text-right">
                    <span className="impact-badge negative">{reason.impact.toFixed(2)}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Gráfico de tendências */}
      <ChurnTrendChart data={details.trends} />
    </div>
  );
};

export default StudentDetailsCard;
