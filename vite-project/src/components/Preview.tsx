import { useState } from "react";

const PreviewResult = ({ result }: { result: string }) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <button
        onClick={() => setShow(true)}
        className="text-blue-600 underline hover:text-blue-800 text-xs"
      >
        Preview
      </button>

      {show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-4 rounded shadow-lg max-w-xl w-full relative">
            <button
              onClick={() => setShow(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <h2 className="text-sm font-semibold mb-2">Preview Result</h2>
            <div
              className="prose prose-sm max-h-[60vh] overflow-y-auto text-xs"
              dangerouslySetInnerHTML={{ __html: result }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default PreviewResult;
