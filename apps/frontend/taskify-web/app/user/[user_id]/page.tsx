import DashboardContainer from "@/containers/dashboard";
import { getWorkspaces } from "@/data/workspaces";

export default async function DashboardPage({ params }: { params: Promise<{ user_id: string }> }) {
    const { user_id } = await params;
    const workspacesResponse = await getWorkspaces();
    const workspaces = workspacesResponse.success ? workspacesResponse.data : [];

    return <DashboardContainer initialWorkspaces={workspaces} />;
}
