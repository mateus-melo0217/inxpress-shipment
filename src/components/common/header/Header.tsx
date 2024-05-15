import React, {useState} from "react";
import {HeaderNavLink} from "components/common/header/HeaderNavLink";
import {MobileHeaderNavLink} from "components/common/header/MobileHeaderNavLink";
import logo from "assets/images/logo.png";
import ToggleBtn from "assets/images/toggle-btn-top.svg";
import {IoMdSettings} from "react-icons/io";
import { AiOutlineMenu, AiOutlineCloseCircle } from "react-icons/ai"
import MenuDropdown from 'components/common/dropdown/Dropdown';
import { deleteToken } from "pages/bol_info/utility/Utility";
import { TOKEN } from "pages/bol_info/constants/BOLConstants";
import { useLocation } from 'react-router-dom';
import { checkUrlForSubstring } from "utils/routeHelpers";
import { useDispatch } from "react-redux";
import { OPEN_DEFAULT_SETTING_MODAL } from "actions";
// import { FaBell } from "react-icons/fa";
// import { FiSearch } from "react-icons/fi";

type PropTypes = {
    customerCode: string;
}

export default function Header({customerCode}: PropTypes) {
    const dispatch = useDispatch();
    const [isNavOpen, setIsNavOpen] = useState(false);
    const webshipToggleLink = process.env.REACT_APP_LINK_WEBSHIP_TOGGLE;
    const location = useLocation();

    const handleLogout = () => {
        deleteToken(TOKEN);
        if (process.env.REACT_APP_WEBSHIP_LOGOUT && typeof process.env.REACT_APP_WEBSHIP_LOGOUT === "string") {
            window.location.href = process.env.REACT_APP_WEBSHIP_LOGOUT;
        } else {
            console.error("REACT_APP_WEBSHIP_LOGOUT is not defined or is not a string");
        }
    }

    const handleDefaultSetting = () => {
        dispatch({ 
            type: OPEN_DEFAULT_SETTING_MODAL,
            payload: true
        });
    }

    return (
        <header className="lg:shadow-none shadow-xls px-8 py-3 grid grid-cols-2">
            <div className="flex items-center gap-8">
                <img src={logo} alt="inxpress-logo" className="w-56"/>
                {/* <form className="hidden customXl:!flex rounded-md bg-field-gray border border-solid border-border-gray py-4 px-10">
                    <button className="border-none mr-1 cursor-pointer">
                        <FiSearch size={'2.3rem'} />
                    </button>
                    <input
                        type="text"
                        className="border-0 bg-transparent focus:outline-0"
                        placeholder="Tracking number"
                    />
                </form> */}
                <div className="hidden customMs:block">
                    <div className="flex items-center h-full w-5/6">
                        <a href={`${webshipToggleLink}`}><img src={ToggleBtn} alt="inxpress-logo" className="pt-10 pb-3"/></a>
                    </div>
                </div>
            </div>

            <div className="flex gap-8 items-center flex-wrap-reverse justify-self-end">

                <nav className="w-full">
                    <ul className="flex justify-around list-none gap-6 items-center" id="navbarNav">
                        <div className="top:0 opacity-1 hidden customLg:!flex justify-around list-none gap-6 items-center">
                            {checkUrlForSubstring(location.pathname, "rate_aggregator") ? (
                                <React.Fragment>
                                    <HeaderNavLink to="/rate_aggregator/quotes">Quotes</HeaderNavLink>
                                    <HeaderNavLink to="/rate_aggregator/shipments_importer">Shipments Importer</HeaderNavLink>
                                </React.Fragment>
                            ) : checkUrlForSubstring(location.pathname, "freight_lite") ? (
                                <React.Fragment>
                                    <HeaderNavLink to="/freight_lite/direct_quote">Quote Request</HeaderNavLink>
                                    <HeaderNavLink to="/freight_lite/direct_quote_history">Freight History</HeaderNavLink>
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    {/* <HeaderNavLink to="overview">Overview</HeaderNavLink> */}
                                    <HeaderNavLink to="freight_history">Freight History</HeaderNavLink>
                                    <HeaderNavLink to="get_pricing">Get pricing</HeaderNavLink>
                                    {/* <HeaderNavLink to="reports">Reports</HeaderNavLink>
                                    <HeaderNavLink to="tools">Tools</HeaderNavLink> */}
                                    <HeaderNavLink to="saved_quotes">Saved Quotes</HeaderNavLink>
                                    {/* <HeaderNavLink to="/faq">FAQs</HeaderNavLink> */}
                                </React.Fragment>
                            )}
                        </div>
                        <div>
                            <MenuDropdown title={<IoMdSettings size='2.0em'/>} exCls="min-w-[200px] rounded-lg">
                                <button
                                    className="block text-left w-full px-8 py-2 text-sxl text-white hover:bg-gray-100 hover:text-blue-1"
                                    role="menuitem"
                                    onClick={handleDefaultSetting}
                                >
                                    Freight Default Settings
                                </button>
                                <button
                                    className="block text-left w-full px-8 py-2 pr-28 text-sxl text-white hover:bg-gray-100 hover:text-blue-1"
                                    role="menuitem"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </MenuDropdown>
                        </div>
                        <span className="w-[60px]">{customerCode}</span>
                        <img alt={''} src={`images/flags/24/us.png`} />

                        <button className="border-0 w-12 h-12 bg-transparent lg:hidden" type="button" onClick={() => setIsNavOpen((prev) => !prev)}>
                            {isNavOpen ? <AiOutlineCloseCircle className="w-full" /> : <AiOutlineMenu className="w-full"/>}
                        </button>
                    </ul>
                </nav>
                <div className={isNavOpen ? "absolute w-full h-screen top-[-30px] left-0 bg-white z-50 flex flex-col justify-evenly items-center" : "hidden"}>
                    <button className="border-0 w-12 h-12 bg-transparent absolute top-[55px] right-[17px]" type="button" onClick={() => setIsNavOpen((prev) => !prev)}>
                        <AiOutlineCloseCircle className="w-full h-full" />
                    </button>
                    <img src={logo} alt="inxpress-logo" className="w-56 absolute top-[60px]"/>
                    <ul className="flex flex-col items-center justify-between">
                        {/* <MobileHeaderNavLink setIsNavOpen={setIsNavOpen} to="overview">Overview</MobileHeaderNavLink> */}
                        <MobileHeaderNavLink setIsNavOpen={setIsNavOpen} to="freight_history">Freight History</MobileHeaderNavLink>
                        <MobileHeaderNavLink setIsNavOpen={setIsNavOpen} to="get_pricing">Get pricing</MobileHeaderNavLink>
                        {/* <MobileHeaderNavLink setIsNavOpen={setIsNavOpen} to="reports">Reports</MobileHeaderNavLink> */}
                        {/* <MobileHeaderNavLink setIsNavOpen={setIsNavOpen} to="tools">Tools</MobileHeaderNavLink> */}
                        <MobileHeaderNavLink setIsNavOpen={setIsNavOpen} to="/saved_quotes">Saved Quotes</MobileHeaderNavLink>
                        {/* <MobileHeaderNavLink setIsNavOpen={setIsNavOpen} to="/faq">FAQs</MobileHeaderNavLink> */}
                    </ul>
                </div>
            </div>

        </header>
    )
}