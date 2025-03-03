
import React from 'react';
import CourseUnitsTable from './CourseUnitsTable';
import RiskDetailGraphs from './RiskDetailGraphs';
import StudentsTable from '../results/StudentsTable';
import { CourseUnit, RiskDistribution, FactorFrequency, Student } from '../../types';

interface CourseUnitViewProps {
  units: CourseUnit[];
  selectedUnit: string | null;
  riskDistributionData: RiskDistribution[];
  positiveFactorsData: FactorFrequency[];
  negativeFactorsData: FactorFrequency[];
  students: Student[];
  onUnitClick: (unitId: string) => void;
  onExportCSV: () => void;
  onBack: () => void;
  courseName?: string;
}

const CourseUnitView: React.FC<CourseUnitViewProps> = ({
  units,
  selectedUnit,
  riskDistributionData,
  positiveFactorsData,
  negativeFactorsData,
  students,
  onUnitClick,
  onExportCSV,
  onBack,
  courseName
}) => {
  const selectedUnitData = units.find(unit => unit.id === selectedUnit);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        {courseName ? `Estatísticas do Curso: ${courseName}` : "Estatísticas por Unidade Curricular"}
      </h2>
      
      {selectedUnit ? (
        <div>
          <div className="mb-4 flex items-center">
            <button 
              onClick={onBack}
              className="text-blue-600 hover:text-blue-800 mr-2 text-sm"
            >
              &larr; Voltar às Unidades Curriculares
            </button>
            <h3 className="text-lg font-medium">
              Alunos da Unidade Curricular: {selectedUnitData?.name || selectedUnit}
              {courseName && ` (${courseName})`}
            </h3>
          </div>
          
          <div className="mb-6">
            <StudentsTable 
              students={students}
              onExportCSV={onExportCSV} 
            />
          </div>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <CourseUnitsTable 
              units={units}
              onUnitClick={onUnitClick}
            />
          </div>
          
          <RiskDetailGraphs 
            riskDistributionData={riskDistributionData}
            positiveFactorsData={positiveFactorsData}
            negativeFactorsData={negativeFactorsData}
          />
        </>
      )}
    </div>
  );
};

export default CourseUnitView;
