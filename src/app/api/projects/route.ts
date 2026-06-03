import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/utils/supabase/admin'; // use admin for server side if needed, or client

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, description, budget, companyId } = body;

    if (!title || !description) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 });
    }

    // Insert into supabase
    const { data, error } = await supabaseAdmin
      .from('projects')
      .insert([
        {
          title,
          description,
          budget,
          company_id: companyId || 'default-company',
          status: 'open',
        }
      ])
      .select();

    if (error) {
      console.error('Supabase Error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, project: data[0] });
  } catch (err: any) {
    console.error('API Error:', err);
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
