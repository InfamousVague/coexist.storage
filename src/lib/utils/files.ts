import { PredefinedColor } from "june-uikit";

export function getFiletypeColor(ext: string): PredefinedColor {
    ext = ext.toLowerCase();

    switch (ext) {
        // Text
        case 'txt':
        case 'rtf':
            return PredefinedColor.Tigerly;

        // Document
        case 'doc':
        case 'docx':
        case 'odt':
            return PredefinedColor.Summertime;

        // Spreadsheet
        case 'xls':
        case 'xlsx':
        case 'ods':
        case 'csv':
            return PredefinedColor.CreamyPeach;

        // Presentation
        case 'ppt':
        case 'pptx':
        case 'odp':
            return PredefinedColor.Tigerly;

        // Image
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'gif':
        case 'bmp':
        case 'webp':
            return PredefinedColor.FlamingoPink;

        // Video
        case 'mp4':
        case 'mkv':
        case 'mov':
        case 'avi':
        case 'webm':
            return PredefinedColor.MountainMajesty;

        // Audio
        case 'mp3':
        case 'wav':
        case 'ogg':
        case 'flac':
            return PredefinedColor.RougePink;

        // PDF
        case 'pdf':
            return PredefinedColor.Squeaky;

        // Archive
        case 'zip':
        case 'rar':
        case '7z':
        case 'tar':
        case 'gz':
            return PredefinedColor.PorcleanRose;

        // Code
        case 'js':
        case 'ts':
        case 'html':
        case 'css':
        case 'json':
        case 'xml':
        case 'py':
        case 'cpp':
        case 'java':
            return PredefinedColor.DeepRose;

        default:
            // Fallback color
            return PredefinedColor.AppleValley;
    }
}