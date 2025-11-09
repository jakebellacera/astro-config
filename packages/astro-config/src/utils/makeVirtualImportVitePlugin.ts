export type AstroVitePlugin = {
  name: string;
  resolveId: (id: string) => string | undefined;
  load: (id: string) => string | undefined;
};

export const makeVirtualImportVitePlugin = (
  pluginName: string,
  importName: string,
  contents: string,
): AstroVitePlugin => {
  const resolvedId = `\0${importName}`;

  return {
    name: pluginName,
    resolveId(id: string) {
      if (id === importName) {
        return resolvedId;
      }

      return;
    },
    load(id: string) {
      if (id === resolvedId) {
        return contents;
      }

      return;
    },
  };
};
