import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import {GetDefaultRoute} from '../Helpers/utils';

type LayoutProps = {
    children: React.ReactNode;
}

export const HomeLayout: React.FC<LayoutProps> = ( props: LayoutProps ) => {
    return (
        <div className='homelayout'>
            <Header>
                <Logo/>
            </Header>
            <Sidebar>
                <LevelTab classlevel='Home'/>
                <LevelTab classlevel='CSE 100s'/>
                <LevelTab classlevel='CSE 300s'/>
                <LevelTab classlevel='CSE 400s'/>
                <LevelTab classlevel='CSE 500s'/>
            </Sidebar>
            {props.children}
        </div>
    );
}

type HeaderProps = {
  children: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ( props: HeaderProps ) => {
  return (
      <div className="header">
          {props.children}
      </div>
  );
}

export const Logo: React.FC = () => {
    
  const handleClick = () => {};
  
  return (
      <h1 className="logo" onClick={ handleClick }>
          RateMyCSE
      </h1>
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

export const GetClassNumber = ( label : string ) => {
    return label.split(" ", 2)[1];
}

export const LevelTab: React.FC<{ classlevel: string }> = ({ classlevel }) => {   
    const navigate = useNavigate();

    const handleClick = () => {
        if (classlevel === 'Home') {
            // Default route
            navigate('/' + GetDefaultRoute() + '/');
        } else {
            // Gets 'X00s' from 'CSE X00s' classlevel and routes to that page
            navigate('/' + GetDefaultRoute() + '/cse' + GetClassNumber(classlevel));
        }
    };
    
    return (
        <button className="leveltab" data-testid={`levelTab-${classlevel}`}
                onClick={ handleClick }
        >
            {classlevel}
        </button>
    );
}

export const HomePage: React.FC = () => {
    return (
        <div className="homepage">
            {/* This is the content of the inner page */}
        </div>
    );
}

interface ClassListProps {
    classLevelNumber: string;
}
  
export const ClassList: React.FC<ClassListProps> = ({ classLevelNumber }) => {
    const [classList, setClassList] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await fetch(`/api/GetClassData?level=${classLevelNumber}`);
            const data = await response.json();
            setClassList(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        };

        fetchData();
    }, [classLevelNumber]);

    return (
        <div className="innerpage">
          <div className="class-list">
            {classList.map((classItem) => (
              <div key={classItem.id} className="card">
                <div className="class-info">
                  <p className="class-number bold">{`CSE ${classItem.number}`}</p>
                  <p className="class-name bold">{classItem.name}</p>
                </div>
                <p className="class-description">Description: {classItem.description}</p>
              </div>
            ))}
          </div>
        </div>
      );
};  