"use client";
import { ReactNode } from "react";

interface LoaderProps {
  renderDescription: () => ReactNode;
  active: boolean;
}

export default function Loader ({ renderDescription, active }: LoaderProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-md z-50 transition-opacity">
      <div className="flex flex-col items-center justify-center w-80 h-40 bg-white rounded-lg shadow-2xl gap-6 p-6">
        <span className="text-gray-900 text-lg font-medium">{renderDescription()}</span>
        {active&&<div className="w-12 h-12 border-4 border-transparent border-t-violet-500 border-l-orange-500 rounded-full animate-spin"></div>}
      </div>
    </div>
  );
};
