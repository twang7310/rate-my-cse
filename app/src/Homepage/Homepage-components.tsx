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
    
    const handleClick = () => {
        console.log('Button clicked: ' + classlevel);
        
    };
    
    return (
        <button className="leveltab" data-testid={`levelTab-${classlevel}`}
                onClick={ handleClick }
        >
            {classlevel}
        </button>
    );
}

const RatingBox: React.FC<{label: string, rating: string}> = ({ label, rating }) => {
  const dynamicClassName = `ratingbox ratingbox-${rating}`;

  return (
    <div className={dynamicClassName}>
      {label}
    </div>
  );
};


export const InnerPage: React.FC = () => {
    return (
        <div className="innerpage">
          {/* This is the content of the inner page */}
          <h1 className="welcome">Welcome to RateMyCSE</h1>
          <h3>Wondering if a UW CSE class is as hard as they say?</h3>
          <div className="howitworks">
            <h2>How it works:</h2>
            <h4 className="explanation">
              Students will post ratings based on 3 categories
            </h4>
            <RatingBox label="Difficulty" rating="diff" />
            <RatingBox label="Workload" rating="work" />
            <RatingBox label="Practicality" rating="prac" />
          </div>
        </div>
    );
}
