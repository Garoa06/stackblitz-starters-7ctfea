'use client';
import { useState } from 'react';
import { FaChevronDown, FaChevronRight, FaClipboard } from 'react-icons/fa';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCode, setSelectedCode] = useState('');
  const [copied, setCopied] = useState(false);

  const categories = {
    'Movement Codes': ['Top-down movement', 'Platform movement'],
    'Collision Codes': ['Basic Collision', 'Advanced Collision'],
    'Camera Codes': ['Static Camera', 'Dynamic Camera'],
  };

  const codeSnippets = {
    'Top-down movement': `// Code for top-down movement\nfunction topDownMovement() {\n  // logic here\n}`,
    'Platform movement': `// Code for platform movement\nfunction platformMovement() {\n  // logic here\n}`,
    'Basic Collision': `// Code for basic collision\nfunction basicCollision() {\n  // logic here\n}`,
    'Advanced Collision': `// Code for advanced collision\nfunction advancedCollision() {\n  // logic here\n}`,
    'Static Camera': `// Code for static camera\nfunction staticCamera() {\n  // logic here\n}`,
    'Dynamic Camera': `// Code for dynamic camera\nfunction dynamicCamera() {\n  // logic here\n}`,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippets[selectedCode]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="flex min-h-screen bg-gradient-to-br from-[#030c05] to-[#084615] text-white font-poppins">
      {/* Left side: Sidebar */}
      <aside className="w-1/3 p-6 bg-[#084615] text-white border-r border-opacity-10 border-gray-200">
        <h1 className="text-3xl font-bold mb-6">Code Categories</h1>
        <ul className="space-y-4">
          {Object.keys(categories).map((category) => (
            <li key={category}>
              <button
                className="flex justify-between items-center w-full py-2 px-4 bg-[#199f36] hover:bg-opacity-90 transition rounded-md"
                onClick={() =>
                  setSelectedCategory(
                    selectedCategory === category ? null : category
                  )
                }
              >
                {category}
                {selectedCategory === category ? (
                  <FaChevronDown />
                ) : (
                  <FaChevronRight />
                )}
              </button>
              {selectedCategory === category && (
                <ul className="pl-6 mt-2 space-y-2">
                  {categories[category].map((subItem) => (
                    <li key={subItem}>
                      <button
                        className={`flex justify-between items-center w-full py-2 px-3 hover:bg-[#199f36] transition rounded-md ${
                          selectedCode === subItem ? 'bg-[#199f36]' : ''
                        }`}
                        onClick={() => setSelectedCode(subItem)}
                      >
                        {subItem}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </aside>

      {/* Right side: Code display */}
      <section className="w-2/3 p-6 relative">
        {/* Background Overlay */}
        <div
          className="absolute inset-0 opacity-10 bg-cover bg-no-repeat"
          style={{
            backgroundImage: 'url("/path-to-your-background-image.png")',
          }}
        ></div>

        {/* Content */}
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-4">Code Preview</h2>
          <div className="relative p-6 bg-[#084615] rounded-lg shadow-md">
            {selectedCode ? (
              <>
                <pre className="whitespace-pre-wrap">
                  {codeSnippets[selectedCode]}
                </pre>
                <button
                  className="absolute top-4 right-4 p-2 bg-[#199f36] hover:bg-[#1ec14b] transition text-white rounded-md flex items-center space-x-2"
                  onClick={handleCopy}
                >
                  <FaClipboard />
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              </>
            ) : (
              <p>Select a code snippet from the list</p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
