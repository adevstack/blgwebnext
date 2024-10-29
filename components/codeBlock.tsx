// components/CodeBlock.tsx
import { useState } from "react";
import { FiCopy, FiCheck } from "react-icons/fi";

interface CodeBlockProps {
  code: string;
}

export default function CodeBlock({ code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };

  return (
    <div className="relative bg-gray-900 text-white p-4 rounded-md">
      <pre className="whitespace-pre-wrap">{code}</pre>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-1 rounded bg-gray-700 hover:bg-gray-600"
        aria-label="Copy code"
      >
        {copied ? <FiCheck size={16} /> : <FiCopy size={16} />}
      </button>
    </div>
  );
}
