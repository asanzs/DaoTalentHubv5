const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error("Faltan las variables de entorno de Supabase.");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function run() {
  const users = [
    { 
      name: 'Talento_Prueba_B2C', 
      role: 'Fullstack Web3', 
      user_type: 'B2C', 
      rate: 45, 
      rating: 5, 
      availability: 'Full Time',
      skills: JSON.stringify(['React', 'Solidity', 'Next.js'])
    },
    { 
      name: 'Empresa_Piloto_B2B', 
      role: 'CTO', 
      user_type: 'B2B', 
      rate: 0, 
      rating: 5, 
      availability: 'Hiring',
      skills: JSON.stringify(['Management', 'Hiring'])
    }
  ];

  console.log("Iniciando inserción en la tabla 'talents'...");
  const { data, error } = await supabase.from('talents').insert(users).select();
  
  if (error) {
    console.error("Error al insertar los usuarios:", error);
  } else {
    console.log("Usuarios insertados exitosamente:");
    console.log(JSON.stringify(data, null, 2));
  }
}

run();
