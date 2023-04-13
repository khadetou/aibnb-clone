"use client";

import { PropsWithChildren } from "react";
import { useIsMounted } from "usehooks-ts";

const ClientOnly = ({ children }: PropsWithChildren) => {
  const isMounted = useIsMounted();
  if (!isMounted) return null;
  return <div>{children}</div>;
};

export default ClientOnly;
