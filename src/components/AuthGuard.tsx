// components/AuthGuard.tsx - Simple version
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter, useSegments } from "expo-router";
import { RootState } from "./redux/store";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const segments = useSegments();
  const router = useRouter();

  const publicRoutes = [
    "index",
    "signin",
    "signup",
    "verification",
    "resetPassword",
    "forgotPasswordVerification",
  ];

  useEffect(() => {
    const currentRoute = segments[0] || "index";
    const isPublicRoute = publicRoutes.includes(currentRoute);

    if (!isAuthenticated && !isPublicRoute) {
      router.replace("/signin");
    }
  }, [isAuthenticated, segments]);

  return <>{children}</>;
};

export default AuthGuard;
