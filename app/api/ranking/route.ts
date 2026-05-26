import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";

type RankingEntry = {
  name: string;
  score: number;
  title: string;
};

const filePath = path.join(process.cwd(), "data", "ranking.json");

const readRankingFile = (): RankingEntry[] => {
  try {
    const file = fs.readFileSync(filePath, "utf-8");

    return JSON.parse(file) as RankingEntry[];
  } catch {
    return [];
  }
};

const writeRankingFile = (data: RankingEntry[]) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

export async function GET() {
  const rankings = readRankingFile();

  return NextResponse.json(rankings);
}

export async function POST(req: Request) {
  try {
    const body: RankingEntry = await req.json();

    const rankings = readRankingFile();

    rankings.push(body);

    rankings.sort((a: RankingEntry, b: RankingEntry) => b.score - a.score);

    const top10 = rankings.slice(0, 10);

    writeRankingFile(top10);

    return NextResponse.json(top10);
  } catch {
    return NextResponse.json(
      {
        error: "Erreur serveur",
      },
      {
        status: 500,
      },
    );
  }
}
