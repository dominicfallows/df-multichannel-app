const pathWithPrecedingSlash = (path: string) => {
  if (typeof path !== "string") {
    throw new Error("pathWithPrecedingSlash expects a string");
  }
  
  if (path.startsWith("/")) {
    return path;
  }

  return `/${path}`;
};
