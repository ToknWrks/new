// SimulationModal.tsx
import React from "react";

interface SimulationModalProps {
  isOpen: boolean;
  onClose: () => void;
  simulationResult: any;
}

const SimulationModal: React.FC<SimulationModalProps> = ({ isOpen, onClose, simulationResult }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-6 rounded-lg shadow-lg z-10">
        <h2 className="text-xl font-bold mb-4">Simulation Results</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-auto max-h-96">
          {JSON.stringify(simulationResult, null, 2)}
        </pre>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SimulationModal;