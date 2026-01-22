import React from 'react';
import { Badge } from '../ui/Badge';
import { Avatar } from '../ui/Avatar';

interface CardProps {
  title: string;
  description?: string;
  tags?: Array<{ text: string; variant: 'green' | 'blue' | 'red' | 'yellow' | 'purple' }>;
  dueDate?: string;
  metrics?: {
    comments?: number;
    attachments?: number;
    tasks?: { completed: number; total: number };
  };
  assignees?: Array<{ src?: string; fallback: string }>;
  image?: string;
  onClick?: () => void;
}

export const Card = ({
  title,
  tags = [],
  dueDate,
  metrics,
  assignees = [],
  image,
  onClick,
}: CardProps) => {
  return (
    <div
      onClick={onClick}
      className="group relative flex cursor-pointer flex-col gap-2 rounded-lg bg-card p-3 shadow-sm transition-all hover:bg-card/80 hover:shadow-card-hover border border-transparent hover:border-border"
    >
      {/* Optional Card Image Cover */}
      {image && (
        <div className="mb-1 -mx-3 -mt-3 overflow-hidden rounded-t-[3px]">
          <img src={image} alt="" className="h-32 w-full object-cover" />
        </div>
      )}

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag, i) => (
            <Badge key={i} variant={tag.variant}>{tag.text}</Badge>
          ))}
        </div>
      )}

      {/* Title */}
      <div>
        <h3 className="text-sm font-medium text-foreground leading-snug">{title}</h3>
      </div>

      {/* Progress Bar (if tasks exist) */}
      {metrics?.tasks && (
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-[10px] text-gray-500 font-medium">
            <span className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>
              {metrics.tasks.completed}/{metrics.tasks.total}
            </span>
            <span>{Math.round((metrics.tasks.completed / metrics.tasks.total) * 100)}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
            <div
              className={`h-full rounded-full ${metrics.tasks.completed === metrics.tasks.total ? 'bg-status-green-text' : 'bg-primary'}`}
              style={{ width: `${(metrics.tasks.completed / metrics.tasks.total) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Footer: Date, Metrics, Assignees */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-3 text-gray-500">
          {dueDate && (
            <div className="flex items-center gap-1 text-[11px] font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
              {dueDate}
            </div>
          )}
          {metrics?.comments !== undefined && (
            <div className="flex items-center gap-1 text-[11px]">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
              {metrics.comments}
            </div>
          )}
          {metrics?.attachments !== undefined && (
            <div className="flex items-center gap-1 text-[11px]">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" /></svg>
              {metrics.attachments}
            </div>
          )}
        </div>

        {assignees.length > 0 && (
          <div className="flex -space-x-1.5 overflow-hidden">
            {assignees.map((assignee, i) => (
              <Avatar key={i} src={assignee.src} fallback={assignee.fallback} size="sm" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
