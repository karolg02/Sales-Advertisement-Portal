import {IconHome2} from "@tabler/icons-react";
import {NavLink,Text} from "@mantine/core";

export const AppNavbar = () => {
    return (
        <div>
            <Text size="xl">Kategorie</Text>
            <NavLink label="With icon" leftSection={<IconHome2 size="1rem" stroke={1.5} />}/>
            <NavLink label="With icon" leftSection={<IconHome2 size="1rem" stroke={1.5} />}/>
            <NavLink label="With icon" leftSection={<IconHome2 size="1rem" stroke={1.5} />}/>
            <NavLink label="With icon" leftSection={<IconHome2 size="1rem" stroke={1.5} />}/>
            <NavLink label="With icon" leftSection={<IconHome2 size="1rem" stroke={1.5} />}/>
        </div>
    )
}