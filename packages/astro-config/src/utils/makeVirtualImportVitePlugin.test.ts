import { describe, it, expect, beforeEach } from "vitest";
import { makeVirtualImportVitePlugin } from "./makeVirtualImportVitePlugin";
import type { AstroVitePlugin } from "./makeVirtualImportVitePlugin";

describe("makeVirtualImportVitePlugin()", () => {
  let plugin: AstroVitePlugin;

  beforeEach(() => {
    plugin = makeVirtualImportVitePlugin(
      "myPlugin",
      "importFoo",
      "hello-world",
    );
  });

  it("should return a vite plugin matching the provided inputs", () => {
    expect(plugin).toEqual({
      name: "myPlugin",
      resolveId: expect.any(Function),
      load: expect.any(Function),
    });
  });

  it("should resolve the import name when the id matches", () => {
    if (!!plugin && typeof plugin.resolveId !== "function") {
      expect.unreachable("Something went wrong.");
    }

    const id = plugin.resolveId("importFoo");

    expect(id).toEqual("\0importFoo");
  });

  it("should not resolve the id if the import name does not match", () => {
    if (typeof plugin.resolveId !== "function") {
      expect.unreachable("Something went wrong.");
    }

    const id = plugin.resolveId("bogus");

    expect(id).toEqual(undefined);
  });

  it("should load the contents if the import name matches", () => {
    if (typeof plugin.load !== "function") {
      expect.unreachable("Something went wrong.");
    }

    const contents = plugin.load("\0importFoo");

    expect(contents).toEqual("hello-world");
  });

  it("should not load the contents if the import name does not match", () => {
    if (typeof plugin.load !== "function") {
      expect.unreachable("Something went wrong.");
    }

    const id = plugin.load("bogus");

    expect(id).toEqual(undefined);
  });
});
