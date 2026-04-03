import https from "node:https";
import path from "node:path";
import { createWriteStream } from "node:fs";
import { mkdir } from "node:fs/promises";

const images = [
  {
    filename: "bern.jpg",
    url: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=1600&q=80",
  },
  {
    filename: "annecy.jpg",
    url: "https://images.unsplash.com/photo-1580820267682-426da823b514?w=1600&q=80",
  },
  {
    filename: "nice-monaco.jpg",
    url: "https://images.unsplash.com/photo-1491166617655-0723a0f3d54b?w=1600&q=80",
  },
  {
    filename: "st-tropez.jpg",
    url: "https://images.unsplash.com/photo-1533561052604-c3beb6d55b8d?w=1600&q=80",
  },
  {
    filename: "lausanne.jpg",
    url: "https://images.unsplash.com/photo-1574870111867-089730e5a72b?w=1600&q=80",
  },
  {
    filename: "bern-farewell.jpg",
    url: "https://images.unsplash.com/photo-1527668752968-14dc70a27c95?w=1600&q=80",
  },
];

async function fetchImage(url, dest) {
  await mkdir(path.dirname(dest), { recursive: true });

  return new Promise((resolve, reject) => {
    const file = createWriteStream(dest);

    https
      .get(url, (response) => {
        response.pipe(file);
        file.on("finish", () => {
          file.close();
          resolve();
        });
      })
      .on("error", reject);
  });
}

for (const img of images) {
  const dest = `public/images/trip/${img.filename}`;
  console.log(`Fetching ${img.filename}...`);
  await fetchImage(img.url, dest);
  console.log(`✓ Saved ${dest}`);
}

console.log("All images fetched.");
