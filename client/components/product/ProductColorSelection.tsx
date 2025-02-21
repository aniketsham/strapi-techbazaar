import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

import { cn } from "@/lib/utils";

interface ProductColorSelectionProps {
  color: string;
  setColor: (value: string) => void;
  allColors: string[];
  disabledColors: string[]; // Added the disabledColors prop
}

const ProductColorSelection = ({
  color: selectedColor,
  setColor,
  allColors,
  disabledColors, // Destructure the disabledColors prop
}: ProductColorSelectionProps) => {
  return (
    <div>
      <p className="text-lg mb-1">Colors</p>
      <div className="space-x-2">
        <TooltipProvider delayDuration={0}>
          {allColors?.map((color) => {
            const isDisabled = disabledColors.includes(color); // Check if the color is disabled

            return (
              <Tooltip key={color}>
                <TooltipTrigger>
                  <span
                    onClick={() => !isDisabled && setColor(color)} // Prevent change if color is disabled
                    className={cn(
                      "block w-8 h-8 rounded-full border border-spacing-4 opacity-80",
                      selectedColor === color ? "ring-4" : "ring-0",
                      isDisabled
                        ? "cursor-not-allowed opacity-50" // Dim the color and disable pointer events for disabled colors
                        : "cursor-pointer"
                    )}
                    style={{ backgroundColor: color }}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{color}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </TooltipProvider>
      </div>
    </div>
  );
};

export default ProductColorSelection;
