import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const id = req.url.split('/').pop();

  if (!id) {
    return NextResponse.json({ error: 'Missing weapon ID' }, { status: 400 });
  }

  try {
    const response = await fetch(`https://www.dnd5eapi.co/api/2014/equipment/${id}`);

    if (!response.ok) {
      return NextResponse.json({ error: 'Weapon not found' }, { status: 404 });
    }

    const data = await response.json();

    const weapon = {
      name: data.name,
      rangeNormal: data.range["normal"] || 0,
      rangeLong: data.range["long"] || 0,
    };

    return NextResponse.json(weapon);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
