import type { ReactNode } from "react";
import Link from "next/link";
import BrandMark from "@/components/app/BrandMark";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type AuthFormShellProps = {
  title: string;
  description: string;
  children: ReactNode;
  footerText?: string;
  footerLinkLabel?: string;
  footerLinkTo?: string;
};

const AuthFormShell = ({ title, description, children, footerText, footerLinkLabel, footerLinkTo }: AuthFormShellProps) => {
  return (
    <Card className="surface-panel w-full max-w-md">
      <CardHeader className="space-y-4 flex flex-col items-center text-center">
        <BrandMark />
        <div className="w-full">
          <CardTitle className="text-2xl">{title}</CardTitle>
          <CardDescription className="mt-1">{description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        {children}
        {footerText && footerLinkLabel && footerLinkTo && (
          <p className="text-center text-sm text-muted-foreground">
            {footerText}{" "}
            <Link className="font-medium text-primary" href={footerLinkTo}>
              {footerLinkLabel}
            </Link>
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default AuthFormShell;
