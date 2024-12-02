import React from 'react';

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function TextInput({ value, onChange, placeholder }: TextInputProps) {
  return (
    <div className="w-full">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-32 p-4 border border-gray-300 rounded-lg transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none hover:border-blue-400 transform hover:translate-y-[-2px]"
      />
    </div>
  );
}