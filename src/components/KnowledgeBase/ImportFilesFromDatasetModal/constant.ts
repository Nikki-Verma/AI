export enum FilesFromDatasetStep {
  FOLDER = "FOLDER",
  FILES = "FILES",
  FILE_CONFIG = "FILE_CONFIG",
}

export const FilesFromDatasetOptions = {
  FOLDER: FilesFromDatasetStep.FOLDER,
  FILES: FilesFromDatasetStep.FILES,
  FILE_CONFIG: FilesFromDatasetStep.FILE_CONFIG,
};

export const SegmentIdentifierOptions = [
  { id: "\\n", label: "Next Line(\\n)", value: "\n" },
  { id: "space", label: "Space( )", value: " " },
];
