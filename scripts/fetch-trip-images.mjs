import https from "node:https";
import path from "node:path";
import { createWriteStream } from "node:fs";
import { mkdir } from "node:fs/promises";

const images = [
  {
    filename: "bern.jpg",
    url: "https://unsplash.com/photos/MxyPC5Tgulc/download?force=true&w=1600",
  },
  {
    filename: "annecy.jpg",
    url: "https://unsplash.com/photos/RinqqoOeXlM/download?force=true&w=1600",
  },
  {
    filename: "nice-monaco.jpg",
    url: "https://unsplash.com/photos/8b7W_g0ZeGc/download?force=true&w=1600",
  },
  {
    filename: "st-tropez.jpg",
    url: "https://unsplash.com/photos/q717iK4xsMI/download?force=true&w=1600",
  },
  {
    filename: "lausanne.jpg",
    url: "https://unsplash.com/photos/RG0-tyf_yt4/download?force=true&w=1600",
  },
  {
    filename: "bern-farewell.jpg",
    url: "https://unsplash.com/photos/jYEWR8beevI/download?force=true&w=1600",
  },
];

function fetchImage(url, destination, redirects = 0) {
  return new Promise((resolve, reject) => {
    const request = https.get(
      url,
      {
        headers: {
          "User-Agent": "notrebeauvoyage-image-fetcher/1.0",
        },
      },
      (response) => {
        const statusCode = response.statusCode ?? 0;
        const location = response.headers.location;

        if (
          location &&
          statusCode >= 300 &&
          statusCode < 400
        ) {
          response.resume();

          if (redirects >= 5) {
            reject(new Error(`Too many redirects for ${url}`));
            return;
          }

          const nextUrl = new URL(location, url).toString();
          fetchImage(nextUrl, destination, redirects + 1).then(resolve).catch(reject);
          return;
        }

        if (statusCode < 200 || statusCode >= 300) {
          response.resume();
          reject(new Error(`Failed to fetch ${url} (${statusCode})`));
          return;
        }

        const file = createWriteStream(destination);

        response.pipe(file);

        file.on("finish", () => {
          file.close((error) => {
            if (error) {
              reject(error);
              return;
            }

            resolve();
          });
        });

        file.on("error", (error) => {
          reject(error);
        });
      },
    );

    request.on("error", reject);
  });
}

for (const image of images) {
  const destination = path.join("public/images/trip", image.filename);

  await mkdir(path.dirname(destination), { recursive: true });
  console.log(`Fetching ${image.filename}...`);
  await fetchImage(image.url, destination);
  console.log(`Saved ${destination}`);
}

console.log("All trip images fetched.");
