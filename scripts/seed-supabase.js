const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const envPath = path.resolve(__dirname, '../.env.local');
if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, 'utf8');
  envConfig.split('\n').forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;
    const match = trimmed.match(/^([^=]+)=(.*)$/);
    if (match) {
      process.env[match[1].trim()] = match[2].trim().replace(/^['"]|['"]$/g, '');
    }
  });
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("Error: Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function seedData() {
  try {
    console.log("Loading mock data...");
    const coursesPath = path.resolve(__dirname, '../src/lib/mocks/courses.json');
    const talentsPath = path.resolve(__dirname, '../src/lib/mocks/talent.json');

    const coursesRaw = JSON.parse(fs.readFileSync(coursesPath, 'utf8'));
    const talentsRaw = JSON.parse(fs.readFileSync(talentsPath, 'utf8'));

    // Map courses to DB schema
    const coursesData = (coursesRaw.courses ? Object.values(coursesRaw.courses) : []).map(c => {
      return {
        id: c.id,
        title: c.title,
        description: c.title + " - " + c.category,
        level: c.category,
        instructor: c.instructorName,
        price_usd: 0,
        price_tal: c.totalTal || 0,
        reward_tal: c.modules ? c.modules.reduce((acc, m) => acc + (m.talReward || 0), 0) : 0,
        modules: c.modules ? c.modules.length : 0
      };
    });

    // Map talents to DB schema
    const talentsData = talentsRaw.map(t => {
      return {
        id: t.id,
        name: t.name,
        role: t.role,
        avatar: t.avatar,
        rate: t.rate,
        rating: t.rating,
        availability: t.availability,
        skills: JSON.stringify(t.skills || []),
        user_type: 'B2C'
      };
    });

    if (coursesData.length > 0) {
      console.log(`Inserting ${coursesData.length} courses...`);
      const { error: coursesError } = await supabase.from('courses').upsert(coursesData, { onConflict: 'id' });
      if (coursesError) throw coursesError;
    }

    if (talentsData.length > 0) {
      console.log(`Inserting ${talentsData.length} talents...`);
      const { error: talentsError } = await supabase.from('talents').upsert(talentsData, { onConflict: 'id' });
      if (talentsError) throw talentsError;
    }

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedData();
