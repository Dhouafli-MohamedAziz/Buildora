import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { code } = body;

    if (!code) {
      return NextResponse.json({ error: 'No code provided' }, { status: 400 });
    }

    const timestamp = Date.now();
    const fileName = `landing-${timestamp}.html`;

    const filePath = path.join(process.cwd(), 'public', fileName);

    fs.writeFileSync(filePath, code, 'utf8');

    return NextResponse.json({ success: true, url: `/${fileName}` });
  } catch (error) {
    console.error('Save error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
