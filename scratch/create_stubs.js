const fs = require('fs');
const path = require('path');

const baseDir = path.join('c:', 'Users', 'Admin', 'OneDrive - THE HACIENDAS COMPANY (M365)', 'Documentos', 'CLAUDE CLAW', 'daotalenthubv5', 'src', 'app', '[locale]', 'dashboard');

const routes = ['profile', 'passport', 'missions', 'staking'];

routes.forEach(route => {
  const dirPath = path.join(baseDir, route);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  
  const content = `"use client";
import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function ${route.charAt(0).toUpperCase() + route.slice(1)}Page() {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6 bg-[#0B0C10]">
      <div className="max-w-4xl mx-auto">
        <Link href="/dashboard" className="text-[#00F5FF] text-sm font-bold flex items-center gap-1 hover:underline mb-8">
          <ChevronRight className="w-4 h-4 rotate-180" /> Volver al Dashboard
        </Link>
        <div className="p-12 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl text-center">
          <h1 className="text-3xl font-black text-white mb-4">Construyendo ${route}...</h1>
          <p className="text-gray-400">Esta sección está en desarrollo. Pronto podrás gestionar tus datos on-chain aquí.</p>
        </div>
      </div>
    </div>
  );
}
`;

  fs.writeFileSync(path.join(dirPath, 'page.tsx'), content);
  console.log(`Created ${route} page.`);
});
