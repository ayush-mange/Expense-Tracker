import React , {ReactNode} from "react";
import Sidebar from "./components/sidebar/sidebar";

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({children}) => {
    return(
        <>
        <Sidebar/>
        <div className="ml-[22%] pt-[2%] mr-[2%]">{children}</div>
        </>
    )
} 

export default Layout;