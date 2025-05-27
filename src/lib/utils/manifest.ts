import type { Folder } from '$lib/types';

export function addFolderAtPath(root: Folder, path: string[], newFolder: Folder): Folder {
  if (path.length === 0) {
    return {
      ...root,
      children: [...root.children, newFolder],
    };
  }

  const [current, ...rest] = path;
  return {
    ...root,
    children: root.children.map((child) => {
      if (child.type === 1 && child.name === current) {
        return addFolderAtPath(child, rest, newFolder);
      }
      return child;
    }),
  };
}
