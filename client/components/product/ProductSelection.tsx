import React from "react";

interface ProductSelectionProps {
  selectedOption: string;
  setOption: (option: string) => void;
  allOptions: string[];
  label: string;
  isVisible: boolean;
}

const ProductSelection: React.FC<ProductSelectionProps> = ({
  selectedOption,
  setOption,
  allOptions,
  label,
  isVisible,
}) => {
  if (!isVisible || allOptions.length === 0) return null;

  return (
    <div>
      <h3>{label}</h3>
      <div className="flex gap-2">
        {allOptions.map((option) => (
          <button
            key={option}
            onClick={() => setOption(option)}
            className={`px-4 py-2 border rounded ${
              selectedOption === option
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductSelection;
