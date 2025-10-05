import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const logoFile = formData.get('logo') as File;
    const projectName = formData.get('projectName') as string;

    if (!logoFile) {
      return NextResponse.json({ success: false, message: 'No logo file provided' });
    }

    const projectFolder = path.join(process.cwd(), 'projects', projectName);
    await mkdir(projectFolder, { recursive: true });

    const logoPath = path.join(projectFolder, 'logo.png');
    const buffer = Buffer.from(await logoFile.arrayBuffer());
    await writeFile(logoPath, buffer);

    return NextResponse.json({ 
      success: true, 
      logoPath: `/projects/${projectName}/logo.png` 
    });
  } catch (error) {
    console.error('Upload logo error:', error);
    return NextResponse.json({ success: false, message: 'Failed to upload logo' });
  }
}
