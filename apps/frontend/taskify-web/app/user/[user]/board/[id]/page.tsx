"use client";

import { Board } from "@/components/board/Board";
import { Card } from "@/components/board/Card";
import { Column } from "@/components/board/Column";
import { Navbar } from "@/components/layout/Navbar";
import { EditableText } from "@/components/ui/EditableText";
import { CardDetailModal } from "@/components/board/CardDetailModal";
import { useState } from "react";

export default function BoardPage() {
    const [selectedCard, setSelectedCard] = useState<{ title: string; listName: string } | null>(null);

    return (
        <div className="flex h-screen flex-col bg-background">
            <main className="flex-1 flex flex-col overflow-hidden">
                {/* Board Header (Optional simple version) */}
                <div className="flex h-14 items-center justify-between px-6 border-b border-border bg-background/50 backdrop-blur-sm">
                    <EditableText
                        initialText="Project Board"
                        className="text-lg font-bold"
                    />
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">Board Members:</span>
                        <div className="flex -space-x-2">
                            <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center text-xs font-bold text-red-600 border border-white">JD</div>
                            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-600 border border-white">AS</div>
                            <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-xs font-bold text-green-600 border border-white">RK</div>
                        </div>
                    </div>
                </div>

                <Board>
                    {/* TO DO Column */}
                    <Column title="To Do" count={2} headerColor="bg-gray-400">
                        <Card
                            title="Design new landing page"
                            tags={[{ text: "Design", variant: "purple" }, { text: "High Priority", variant: "red" }]}
                            dueDate="Jan 25"
                            metrics={{ comments: 5, attachments: 3, tasks: { completed: 2, total: 5 } }}
                            assignees={[{ fallback: "JD" }]}
                            onClick={() => setSelectedCard({ title: "Design new landing page", listName: "To Do" })}
                        />
                        <Card
                            title="Update API documentation"
                            tags={[{ text: "Documentation", variant: "blue" }]}
                            dueDate="Jan 22"
                            metrics={{ comments: 2, attachments: 1, tasks: { completed: 0, total: 3 } }}
                            assignees={[{ fallback: "AS" }, { fallback: "MK" }]}
                            onClick={() => setSelectedCard({ title: "Update API documentation", listName: "To Do" })}
                        />
                    </Column>

                    {/* IN PROGRESS Column */}
                    <Column title="In Progress" count={2} headerColor="bg-blue-400">
                        <Card
                            title="Implement user authentication"
                            tags={[{ text: "Backend", variant: "green" }, { text: "Security", variant: "yellow" }]}
                            description="JWT based auth with refresh tokens"
                            dueDate="Jan 20"
                            metrics={{ comments: 8, attachments: 2, tasks: { completed: 4, total: 6 } }}
                            assignees={[{ fallback: "RK" }]}
                            onClick={() => setSelectedCard({ title: "Implement user authentication", listName: "In Progress" })}
                        />
                        <Card
                            title="Mobile responsive fixes"
                            tags={[{ text: "Frontend", variant: "blue" }, { text: "Bug", variant: "red" }]}
                            dueDate="Jan 21"
                            metrics={{ comments: 3, tasks: { completed: 3, total: 4 } }}
                            assignees={[{ fallback: "LM" }]}
                            onClick={() => setSelectedCard({ title: "Mobile responsive fixes", listName: "In Progress" })}
                        />
                    </Column>

                    {/* REVIEW Column */}
                    <Column title="Review" count={1} headerColor="bg-yellow-400">
                        <Card
                            title="Code review: Payment integration"
                            tags={[{ text: "Review", variant: "purple" }, { text: "Backend", variant: "green" }]}
                            dueDate="Jan 19"
                            metrics={{ comments: 12, attachments: 4, tasks: { completed: 5, total: 5 } }}
                            assignees={[{ fallback: "TW" }]}
                            onClick={() => setSelectedCard({ title: "Code review: Payment integration", listName: "Review" })}
                        />
                    </Column>

                    {/* DONE Column */}
                    <Column title="Done" count={2} headerColor="bg-green-400">
                        <Card
                            title="Database migration setup"
                            tags={[{ text: "Database", variant: "green" }]}
                            dueDate="Jan 18"
                            metrics={{ comments: 4, attachments: 2, tasks: { completed: 7, total: 7 } }}
                            assignees={[{ fallback: "NK" }]}
                            onClick={() => setSelectedCard({ title: "Database migration setup", listName: "Done" })}
                        />
                        <Card
                            title="User onboarding flow"
                            tags={[{ text: "Frontend", variant: "blue" }, { text: "UX", variant: "purple" }]}
                            dueDate="Jan 17"
                            metrics={{ comments: 15, attachments: 5, tasks: { completed: 10, total: 10 } }}
                            assignees={[{ fallback: "SD" }]}
                            onClick={() => setSelectedCard({ title: "User onboarding flow", listName: "Done" })}
                        />
                    </Column>
                </Board>
            </main>

            {/* Card Detail Modal */}
            {selectedCard && (
                <CardDetailModal
                    isOpen={!!selectedCard}
                    onClose={() => setSelectedCard(null)}
                    card={{
                        title: selectedCard.title,
                        listName: selectedCard.listName,
                        description: "This is a detailed description of the card. You can edit this to add more context about the task.",
                    }}
                />
            )}
        </div>
    );
}
