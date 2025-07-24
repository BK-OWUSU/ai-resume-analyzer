import {type ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";
 

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatSize(bytes: number) {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const size: string[] = ['Bytes', 'KB', 'MB', 'GB', 'TB']

    //Determine the appropriate units by calculating the log

    const i: number = Math.floor(Math.log(bytes) / Math.log(k));
    const sizeInKiloBytes: number = bytes / Math.pow(k, i);
    const formattedSize: string = `${sizeInKiloBytes.toFixed(2)} ${size[i]}`;
    return formattedSize;
}

export const generateUUID = () => crypto.randomUUID();

