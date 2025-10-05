import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  try {
    const { projectName } = await req.json();

    if (!projectName) {
      return NextResponse.json({ success: false, message: 'Nom du projet manquant.' }, { status: 400 });
    }

    const projectPath = path.join(process.cwd(), 'public', 'projects', projectName);

    if (!fs.existsSync(projectPath)) {
      fs.mkdirSync(projectPath, { recursive: true });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur création dossier:', error);
    return NextResponse.json({ success: false, message: 'Erreur serveur' }, { status: 500 });
  }
}
