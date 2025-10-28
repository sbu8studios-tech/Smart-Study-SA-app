import React from 'react';
import { ChatBubbleIcon } from './Icons.tsx';

interface CommentListProps {
    comments: { teacher: string; comment: string; date: string }[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
    if (!comments || comments.length === 0) {
        return <p className="text-sm text-text-secondary">No comments available.</p>;
    }
    return (
        <ul className="space-y-4">
            {comments.map((item, index) => (
                <li key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 bg-bg-secondary p-2 rounded-full mt-1">
                        <ChatBubbleIcon className="w-5 h-5 text-primary-500" />
                    </div>
                    <div>
                        <p className="font-semibold text-text-primary">{item.comment}</p>
                        <p className="text-xs text-text-secondary">
                            - {item.teacher}, {item.date}
                        </p>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default CommentList;