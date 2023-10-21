import React from 'react';

export const Header: React.FC = () => {
    return (
        <div className="header">
            {/* This is the content of the header */}
        </div>
    );
}

type SidebarProps = {
    children: React.ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = ( props: SidebarProps ) => {
    return (
        <div className="sidebar">
            {props.children}
        </div>
    );
}


export const LevelTab: React.FC<{ classlevel: string }> = ({ classlevel }) => {
    return (
        <div className="leveltab">
            <p>
                {classlevel}
            </p>
        </div>
    );
}