import {AppShell, Burger, Button, Group, Text} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {AppNavbar} from "./AppNavbar.tsx";
import {
    IconBrandAmongUs,
    IconDoorExit,
    IconHome,
    IconPencilPlus,
    IconShoppingBag,
    IconWallpaper
} from "@tabler/icons-react";
import {logout} from "../features/yoursalesannouncement/api/logout.ts";
import {useEffect, useState} from "react";

export const Layout = () => {
    const [mobileOpened, { toggle: toggleMobile, close: closeMobile }] = useDisclosure();
    const [desktopOpened, { toggle: toggleDesktop, close: closeDesktop }] = useDisclosure();
    const navigate = useNavigate();
    const location = useLocation();
    const showBurger = location.pathname === '/offers';
    const [isRed, setIsRed] = useState(false);

    useEffect(() => {
        closeMobile();
        closeDesktop();
    }, [location.pathname]);

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
                                color="yellow"
                                opened={mobileOpened}
                                onClick={toggleMobile}
                                hiddenFrom="sm"
                                size="sm"
                            />
                            <Burger
                                color="yellow"
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
                    <Group justify="end" style={{ flex: 1}}>
                        <Group ml="xl" gap={4} visibleFrom="sm" style={{ alignItems: "end" }}>
                            <Button c="white" variant="transparent" onClick={() => navigate('/offers')}>
                                Przeglądaj oferty <IconHome style={{ marginLeft: 4, color:"orange" }}/>
                            </Button>
                            <Button c="white" variant="transparent" onClick={() => navigate('/offers/new')}>
                                Stwórz ofertę <IconPencilPlus style={{ marginLeft: 4, color:"orange"  }}/>
                            </Button>
                            <Button c="white" variant="transparent" onClick={() => navigate('/myoffers')}>
                                Moje oferty <IconWallpaper style={{ marginLeft: 4, color:"orange"  }}/>
                            </Button>
                            <Button c="white" variant="transparent" onClick={() => navigate('/cart')}>
                                Twój koszyk <IconShoppingBag style={{ marginLeft: 4, color:"orange"  }} />
                            </Button>
                            <Button c="white" variant="transparent" onClick={handleLogout}>
                                Wyloguj <IconDoorExit style={{ marginLeft: 4, color:"orange"  }}/>
                            </Button>
                        </Group>
                    </Group>
                </Group>
            </AppShell.Header>
            <AppShell.Navbar c="white" style={{backgroundColor:"rgb(45,42,42)"}}>
                <AppNavbar/>
            </AppShell.Navbar>
            <AppShell.Main>
                <Outlet/>
            </AppShell.Main>
        </AppShell>
    )
}