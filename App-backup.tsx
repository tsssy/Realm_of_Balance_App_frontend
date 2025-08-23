import { useState } from "react";

export default function App() {
  const [test, setTest] = useState("Hello World");

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Realm of Balance App
        </h1>
        <p className="text-xl text-gray-700 mb-8">
          前端应用正常运行！
        </p>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p className="text-lg">状态测试: {test}</p>
          <button 
            onClick={() => setTest("状态更新成功！")}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            点击测试状态
          </button>
        </div>
      </div>
    </div>
  );
}