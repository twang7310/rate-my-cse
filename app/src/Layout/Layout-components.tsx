import {useLocation, useNavigate} from 'react-router-dom';
import {clearUser, getSignInStatus, getEmail, setSignInStatus} from '../Login/LoginPage';
import {SearchBar} from '../utils/SearchBar';
import './Layout.css'

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
    const navigate = useNavigate();
    
    const handleClick = () => {
        navigate('/');
    };

    return (
        <h1 className="logo" onClick={ handleClick }>
            RateMyCSE
        </h1>
    );
}

export const Login: React.FC = () => {
    const location = useLocation();

    const navigate = useNavigate();
    const isSignedIn = getSignInStatus();
    const email = getEmail();

    const handleClick = () => {
        navigate('/login');
    };

    const handleSignOut = () => {
        setSignInStatus(false);
        clearUser();
        navigate('../');
    }

    const renderContent = () => {
        if (location.pathname !== '/') {
            return (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', position: 'relative', width: '40%', gap: '1vw' }}>
                    <SearchBar isHeader={true}/>
                    {isSignedIn ? (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '25px' }}>
                            <p className="email">{email}</p>
                            <p className="signout" onClick={handleSignOut}>Sign Out</p>
                        </div>
                    ) : (
                        <p className="login" onClick={handleClick}>
                            Sign In
                        </p>
                    )}
                </div>
            );
        } else {
            return (
                <div>
                    {isSignedIn ? (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '25px' }}>
                            <p className="email">{email}</p>
                            <p className="signout" onClick={handleSignOut}>Sign Out</p>
                        </div>
                    ) : (
                        <p className="login" onClick={handleClick}>
                            Sign In
                        </p>
                    )}
                </div>
            );
        }
    };
    
    return renderContent();
}

type SidebarProps = {
    children: React.ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = ( props: SidebarProps ) => {
    const location = useLocation();

    if (location.pathname.match(/rate-my-cse\/(login|signup)/)) {
        return null;
    }

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
            navigate('/');
        } else {
            // Gets 'X00s' from 'CSE X00s' classlevel and routes to that page
            navigate('/cse' + GetClassNumber(classlevel));
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