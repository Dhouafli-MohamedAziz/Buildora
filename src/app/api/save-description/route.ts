import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  const { projectName, projectDescription } = await req.json();
  const folderPath = path.join(process.cwd(), 'public', 'generated_sites', projectName);

  try {
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    const descriptionPath = path.join(folderPath, 'description.txt');
    fs.writeFileSync(descriptionPath, projectDescription);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Save description error:', error);
    return NextResponse.json({ success: false });
  }
}
