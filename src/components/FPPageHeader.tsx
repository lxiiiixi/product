import React from 'react';

interface FPPageHeaderProps {
    icon: React.ReactNode;
    text: string;
}

function FPPageHeader({ icon, text }: FPPageHeaderProps) {
    return (
        <div className="flex items-center">
            <div className="bg-object-token text-white w-8 h-8 shadow rounded-lg text-xl flex justify-center items-center mr-3">
                {icon}
            </div>
            <h3 className=" text-main-textGray text-lg">{text}</h3>
        </div>
    );
}

export default FPPageHeader;
