import config from "@/lib/config";
 
export const getImageKitUrl = (path: string) => {
  const endpoint = config.env.imagekit.urlEndpoint.replace(/\/$/, "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${endpoint}${cleanPath}`;
};
 