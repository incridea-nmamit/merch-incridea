import { toast } from "react-hot-toast";

const createToast = (
  promise: Promise<unknown>,
  loadingText?: string,
  errorMessage?: string,
) => {
  const errorText = loadingText?.toLowerCase().replace("...", "");
  return toast.promise(
    promise,
    {
      loading: loadingText ?? "Loading...",
      success: "Copied to Clipboard",
      error: errorMessage ?? `Error ${errorText} 🫤`,
    },
    {
      position: "top-center",
    },
  );
};

export default createToast;
