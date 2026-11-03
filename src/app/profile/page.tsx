import type { Metadata } from "next";
import PrivateRoute from "@/components/PrivateRoute";
import ProfileView from "@/components/ProfileView";

export const metadata: Metadata = { title: "BookNook | My Profile" };

export default function ProfilePage() {
  return (
    <PrivateRoute>
      <ProfileView />
    </PrivateRoute>
  );
}
