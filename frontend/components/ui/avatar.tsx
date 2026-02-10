import * as React from "react";
import { cn } from "@/lib/utils";

type AvatarContextValue = {
  imageLoaded: boolean;
  setImageLoaded: (loaded: boolean) => void;
};

const AvatarContext = React.createContext<AvatarContextValue>({
  imageLoaded: false,
  setImageLoaded: () => {},
});

const Avatar = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const [imageLoaded, setImageLoaded] = React.useState(false);
    
    return (
      <AvatarContext.Provider value={{ imageLoaded, setImageLoaded }}>
        <div ref={ref} className={cn("relative inline-flex h-8 w-8 shrink-0 overflow-hidden rounded-full", className)} {...props} />
      </AvatarContext.Provider>
    );
  }
);
Avatar.displayName = "Avatar";

const AvatarImage = React.forwardRef<HTMLImageElement, React.ImgHTMLAttributes<HTMLImageElement>>(
  ({ className, src, ...props }, ref) => {
    const { setImageLoaded } = React.useContext(AvatarContext);
    const [isError, setIsError] = React.useState(false);

    React.useEffect(() => {
      setImageLoaded(false);
      setIsError(false);
    }, [src, setImageLoaded]);

    if (!src || isError) {
      return null;
    }

    return (
      <img
        ref={ref}
        src={src}
        className={cn("aspect-square h-full w-full object-cover", className)}
        onLoad={() => setImageLoaded(true)}
        onError={() => {
          setImageLoaded(false);
          setIsError(true);
        }}
        {...props}
      />
    );
  }
);
AvatarImage.displayName = "AvatarImage";

const AvatarFallback = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => {
    const { imageLoaded } = React.useContext(AvatarContext);

    if (imageLoaded) {
      return null;
    }

    return (
      <span
        ref={ref}
        className={cn(
          "grid h-full w-full place-items-center bg-muted text-muted-foreground",
          className
        )}
        {...props}
      />
    );
  }
);
AvatarFallback.displayName = "AvatarFallback";

export { Avatar, AvatarImage, AvatarFallback };
