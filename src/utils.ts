import { promises as fs } from "fs";
import path from "path";

export const getUser = () => {
  return process.env.USER || process.env.USERNAME || "";
};

export const getDesktopPaths = async () => {
  const user = getUser();
  const desktopPath = path.join("C:\\Users", user, "Desktop");
  const files = await fs.readdir(desktopPath);
  return files
    .filter((file) => file.endsWith(".exe"))
    .map((file) => path.join(desktopPath, file));
};

export const getStartMenuPaths = async () => {
  const startMenuPath =
    "C:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs";
  const files = await fs.readdir(startMenuPath);
  return files
    .filter((file) => file.endsWith(".exe"))
    .map((file) => path.join(startMenuPath, file));
};

export const saveListData = async (data: string[]) => {
  await fs.writeFile("listdata.json", JSON.stringify(data));
};

export const loadListData = async () => {
  try {
    const data = await fs.readFile("listdata.json", "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
};
