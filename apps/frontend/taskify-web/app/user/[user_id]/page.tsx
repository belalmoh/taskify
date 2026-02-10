import DashboardContainer from "@/containers/dashboard";
import { getWorkspaces } from "@/data/workspaces";
import { validateUser } from "@/data/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import Loading from "./loading";

export default async function DashboardPage({ params }: { params: Promise<{ user_id: string }> }) {
    const { user_id } = await params;
    const currentUser = await validateUser();
    if (!currentUser.success) {
        return redirect('/');
    } else if (currentUser.data.id !== Number(user_id)) {
        return redirect('/');
    }
    const workspacesResponse = await getWorkspaces();
    const workspaces = workspacesResponse.success ? workspacesResponse.data : [];

    return (
        <Suspense fallback={<Loading />}>
            <DashboardContainer initialWorkspaces={workspaces} />;
        </Suspense>
    )
}
