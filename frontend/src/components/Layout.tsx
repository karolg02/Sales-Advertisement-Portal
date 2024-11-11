import {AppShell, Avatar, Burger, Button, Group, Popover, Text} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {AppNavbar} from "./AppNavbar.tsx";
import {
    IconBrandAmongUs,
    IconDoorExit,
    IconHome,
    IconPencilPlus,
    IconShoppingBag,
    IconWallpaper,
} from "@tabler/icons-react";
import {logout} from "../features/yoursalesannouncement/api/logout.ts";
import {useEffect, useState} from "react";
import {Notifications} from "@mantine/notifications";
import {userData} from "./store.ts";
import {useAtom} from "jotai";
import {getMe} from "./getme.ts";

export const Layout = () => {
    const [mobileOpened, { toggle: toggleMobile, close: closeMobile }] = useDisclosure();
    const [desktopOpened, { toggle: toggleDesktop, close: closeDesktop }] = useDisclosure();
    const navigate = useNavigate();
    const location = useLocation();
    const showBurger = location.pathname === '/offers';
    const [isRed, setIsRed] = useState(false);
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);
    const [show4, setShow4] = useState(false);
    const [, setUser] = useAtom(userData);

    useEffect(() => {
        closeMobile();
        closeDesktop();
    }, [location.pathname]);

    useEffect(() => {
        return () => {
            Notifications.clean();
        };
    }, [navigate]);

    const handleProfile = async () => {
        try {
            const response = await getMe();
            setUser(response);
            navigate(`/profile/${response.id}`);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleClick = () => {
        setIsRed(!isRed);
    };

    const handleLogout = async () => {
        await logout(navigate);
    };

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{
                width: 300,
                breakpoint: 'sm',
                collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
            }}
        >
            <AppShell.Header bg="dark" bd="0" >
                <Group h="100%" px="md">

                    {showBurger ? (
                        <>
                            <Burger
                                color="white"
                                opened={mobileOpened}
                                onClick={toggleMobile}
                                hiddenFrom="sm"
                                size="sm"
                            />
                            <Burger
                                color="white"
                                opened={desktopOpened}
                                onClick={toggleDesktop}
                                visibleFrom="sm"
                                size="sm"
                            />
                        </>
                    ) : (
                        <>
                            <IconBrandAmongUs
                                style={{ marginRight: 4, color: isRed ? 'red' : 'orange' }}
                                onClick={handleClick}
                            />
                        </>
                    )}

                    <Text c="white" size="xl" fw="bolder" style={{ display: 'flex', alignItems: 'center', textAlign: "right", marginLeft: 4}}>
                        YourSaleAnnouncement
                    </Text>
                    <Group justify="end" style={{ flex: "1"}}>
                        <Group ml="xl" gap={4} style={{ alignItems: "end" }}>
                            <Popover radius="xl" position="bottom" withArrow shadow="md" opened={show1}>
                                <Popover.Target>
                                    <Button
                                        onMouseEnter={() => setShow1(true)}
                                        onMouseLeave={() => setShow1(false)}
                                        className="buttonCover" variant="transparent" onClick={() => navigate('/offers')}>
                                        <IconHome/>
                                    </Button>
                                </Popover.Target>
                                <Popover.Dropdown style={{ pointerEvents: 'none' }}>
                                    <Text size="sm">Strona główna</Text>
                                </Popover.Dropdown>
                            </Popover>

                            <Popover radius="xl" position="bottom" withArrow shadow="md" opened={show2}>
                                <Popover.Target>
                                    <Button
                                        onMouseEnter={() => setShow2(true)}
                                        onMouseLeave={() => setShow2(false)}
                                        className="buttonCover" variant="transparent" onClick={() => navigate('/offers/new')}>
                                        <IconPencilPlus/>
                                    </Button>
                                </Popover.Target>
                                <Popover.Dropdown style={{ pointerEvents: 'none' }}>
                                    <Text size="sm">Dodaj oferte</Text>
                                </Popover.Dropdown>
                            </Popover>

                            <Popover radius="xl" position="bottom" withArrow shadow="md" opened={show3}>
                                <Popover.Target>
                                    <Button
                                        onMouseEnter={() => setShow3(true)}
                                        onMouseLeave={() => setShow3(false)}
                                        className="buttonCover" variant="transparent" onClick={() => navigate('/myoffers')}>
                                        <IconWallpaper/>
                                    </Button>
                                </Popover.Target>
                                <Popover.Dropdown style={{ pointerEvents: 'none' }}>
                                    <Text size="sm">Moje oferty</Text>
                                </Popover.Dropdown>
                            </Popover>

                            <Popover radius="xl" position="bottom" withArrow shadow="md" opened={show4}>
                                <Popover.Target>
                                    <Button
                                        onMouseEnter={() => setShow4(true)}
                                        onMouseLeave={() => setShow4(false)}
                                        className="buttonCover" variant="transparent" onClick={() => navigate('/mycart')}>
                                        <IconShoppingBag/>
                                    </Button>
                                </Popover.Target>
                                <Popover.Dropdown style={{ pointerEvents: 'none' }}>
                                    <Text size="sm">Koszyk</Text>
                                </Popover.Dropdown>
                            </Popover>


                            <Popover radius="lg" position="bottom" shadow="md" withArrow>
                                <Popover.Target>
                                    <Button className="buttonCover" variant="transparent">
                                        <Avatar variant="transparent" color="white" radius="xl" style={{ marginLeft: 4}}/>
                                    </Button>
                                </Popover.Target>
                                <Popover.Dropdown bg="dark">
                                    <Button className="buttonCover" variant="transparent" onClick={handleProfile}>
                                        Mój profil<Avatar variant="transparent" color="yellow" radius="xl" style={{ marginLeft: 4}}/>
                                    </Button>
                                    <Button className="buttonCover" variant="transparent" onClick={handleLogout}>
                                        Wyloguj <IconDoorExit style={{ marginLeft: 4, color:"orange"  }}/>
                                    </Button>
                                </Popover.Dropdown>
                            </Popover>
                        </Group>
                    </Group>
                </Group>
            </AppShell.Header>
            <AppShell.Navbar c="white" style={{backgroundColor:"rgb(45,42,42)"}}>
                <AppNavbar/>
            </AppShell.Navbar>
            <AppShell.Main bg="rgba(225,219,219,0.8)">
                <Outlet/>
            </AppShell.Main>
        </AppShell>
    )
}