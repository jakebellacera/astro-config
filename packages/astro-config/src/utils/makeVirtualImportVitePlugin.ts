export type AstroVitePlugin = {
  name: string;
  resolveId: (id: string) => string | undefined;
  load: (id: string) => string | undefined;
};

export const makeVirtualImportVitePlugin = (
  pluginName: string,
  importName: string,
  contents: string
): AstroVitePlugin => {
  return {
    name: pluginName,
    resolveId(id: string) {
      if (id === importName) {
        return `\0${importName}`;
      }

      return;
    },
    load(id: string) {
      if (id === `\0${importName}`) {
        return contents;
      }

      return;
    },
  };
};
