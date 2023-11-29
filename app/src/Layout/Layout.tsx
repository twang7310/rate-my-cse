import {Header, LevelTab, Login, Logo, Sidebar} from "./Layout-components";

type LayoutProps = {
    children: React.ReactNode;
}

export const HomeLayout: React.FC<LayoutProps> = ( props: LayoutProps ) => {
    return (
        <div>
            <div className="homelayout">
                <Header>
                    <Logo/>
                    <Login/>
                </Header>
                <Sidebar>
                    <LevelTab classlevel='Home'/>
                    <LevelTab classlevel='CSE 100s'/>
                    <LevelTab classlevel='CSE 300s'/>
                    <LevelTab classlevel='CSE 400s'/>
                    <LevelTab classlevel='CSE 500s'/>
                </Sidebar>
            </div>
            {props.children}
        </div>
    );
}
