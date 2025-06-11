import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;

  try {
    const response = await fetch(`https://www.dnd5eapi.co/api/2014/spells/${id}`);

    if (!response.ok) {
      return NextResponse.json({ error: `Spell not found` }, { status: 404 });
    }

    const data = await response.json();

    const spell = {
      name: data.name,
      range: data.range,
      aoe: data.area_of_effect?.size ?? null,
      shape: data.area_of_effect?.type ?? null,
    };

    return NextResponse.json(spell);

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
