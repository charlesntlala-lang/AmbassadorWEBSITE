import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export function GET() {
  try {
    const base = path.join(process.cwd(), "public", "images");
    const ais: string[] = [];
    const hero: string[] = [];

    const readDir = (sub: string, target: string[]) => {
      const dir = path.join(base, sub);
      if (fs.existsSync(dir)) {
        const files = fs.readdirSync(dir);
        files
          .filter((f) => !f.startsWith("."))
          .forEach((f) => {
            target.push(`/images/${sub}/${encodeURIComponent(f)}`);
          });
      }
    };

    readDir("ais", ais);
    readDir("hero", hero);

    return NextResponse.json({ ais, hero });
  } catch (err) {
    return NextResponse.json({ ais: [], hero: [] });
  }
}
