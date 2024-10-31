import {AppShell, Burger, Group, Text, UnstyledButton} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import classes from './MobileNavbar.module.css';
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
import {useState} from "react";

export const Layout = () => {
    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
    const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(false);
    const navigate = useNavigate();
    const location = useLocation();
    const showBurger = location.pathname === '/offers';
    const [isRed, setIsRed] = useState(false);

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
            <AppShell.Header>
                <Group h="100%" px="md">
                    {showBurger && (
                        <>
                            <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
                            <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
                        </>
                    )}
                    {!showBurger && (
                        <>
                            <IconBrandAmongUs
                                style={{ marginRight: 4, color: isRed ? 'red' : 'black' }}
                                onClick={handleClick}
                            />
                        </>
                    )}
                    <Text size="xl" fw="bolder" style={{ display: 'flex', alignItems: 'center', textAlign: "right", marginLeft: 4 }}>
                        YourSaleAnnouncement
                    </Text>
                    <Group justify="end" style={{ flex: 1 }}>
                        <Group ml="xl" gap={4} visibleFrom="sm" style={{ alignItems: "end" }}>
                            <UnstyledButton onClick={() => navigate('/offers')} className={classes.control} style={{ display: 'flex', alignItems: 'center' }}>
                                Strona Główna <IconHome style={{ marginLeft: 4 }}/>
                            </UnstyledButton>
                            <UnstyledButton onClick={() => navigate('/offers/new')} className={classes.control} style={{ display: 'flex', alignItems: 'center' }}>
                                Stwórz ofertę <IconPencilPlus style={{ marginLeft: 4 }}/>
                            </UnstyledButton>
                            <UnstyledButton onClick={() => navigate('/myoffers')} className={classes.control} style={{ display: 'flex', alignItems: 'center' }}>
                                Moje oferty <IconWallpaper style={{ marginLeft: 4 }}/>
                            </UnstyledButton>
                            <UnstyledButton onClick={() => navigate('/cart')} className={classes.control} style={{ display: 'flex', alignItems: 'center' }}>
                                Twój koszyk <IconShoppingBag style={{ marginLeft: 4 }} />
                            </UnstyledButton>
                            <UnstyledButton onClick={handleLogout} className={classes.control} style={{ display: 'flex', alignItems: 'center' }}>
                                Wyloguj <IconDoorExit style={{ marginLeft: 4 }}/>
                            </UnstyledButton>
                        </Group>
                    </Group>
                </Group>
            </AppShell.Header>
            <AppShell.Navbar>
                <AppNavbar />
            </AppShell.Navbar>
            <AppShell.Main>
                <Outlet/>
            </AppShell.Main>
        </AppShell>
    )
}