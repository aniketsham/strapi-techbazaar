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
}
const colors = [
  { name: "Red", hex: "#FF0000" },
  { name: "Blue", hex: "#0000FF" },
  { name: "Green", hex: "#008000" },
  { name: "Yellow", hex: "#FFFF00" },
  { name: "Black", hex: "#000000" },
  { name: "White", hex: "#FFFFFF" },
  { name: "Gray", hex: "#808080" },
  { name: "Purple", hex: "#800080" },
  { name: "Orange", hex: "#FFA500" },
  { name: "Brown", hex: "#A52A2A" },
];
const ProductColorSelection = ({
  color: selectedColor,
  setColor,
  allColors,
}: ProductColorSelectionProps) => {
  return (
    <div>
      <p className="text-lg  mb-1">Colors</p>
      <div className="space-x-2">
        <TooltipProvider delayDuration={0}>
          {allColors?.map((color) => {
            return (
              <Tooltip key={color}>
                <TooltipTrigger>
                  <span
                    onClick={() => setColor(color as string)}
                    className={cn(
                      "block w-8 h-8 rounded-full border border-spacing-4 opacity-80",
                      selectedColor === color ? "ring-4" : "ring-0"
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
