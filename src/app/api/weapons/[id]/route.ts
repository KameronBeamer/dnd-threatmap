import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;

  try {
    const response = await fetch(`https://www.dnd5eapi.co/api/2014/equipment/${id}`);

    if (!response.ok) {
      return NextResponse.json({ error: `Weapon not found` }, { status: 404 });
    }

    const data = await response.json();

    const weapon = {
      name: data.name,
      rangeNormal: data.range["normal"] || 0,
      rangeLong: data.range["long"] || 0,
    };

    return NextResponse.json(weapon);
    
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
