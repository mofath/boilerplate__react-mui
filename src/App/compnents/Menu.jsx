import { Menu as MuiMenu, MenuItem, Collapse, ListItemIcon, ListItemText } from '@mui/material';
import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

function MultiLevel({ menuItem }) {
    const [expanded, setExpanded] = useState(false);

    return (
        <>
            <MenuItem>
                <ListItemText>{menuItem.caption}</ListItemText>
                <ListItemIcon className="flex justify-end" onClick={() => setExpanded(!expanded)}>
                    <KeyboardArrowDownIcon />
                </ListItemIcon>
            </MenuItem>
            <Collapse in={expanded} className="px-5">
                {menuItem.subMenuItems?.map(item => (
                    <MenuItem key={item.key} onClick={item.onClick}>
                        {item.caption}
                    </MenuItem>
                ))}
            </Collapse>
        </>
    );
}

function SingleLevel({ menuItem }) {
    return <MenuItem onClick={menuItem.onClick}>{menuItem.caption}</MenuItem>;
}

export default function Menu({ anchorElement, open, onClose, menuItems, ...others }) {
    const renderMenuItems = () => {
        return menuItems.map(menuItem =>
            // eslint-disable-next-line no-prototype-builtins
            menuItem.hasOwnProperty('subMenuItems') ? (
                <MultiLevel key={menuItem.key} menuItem={menuItem} />
            ) : (
                <SingleLevel key={menuItem.key} menuItem={menuItem} />
            ),
        );
    };

    return (
        <MuiMenu {...others} anchorEl={anchorElement} open={open} onClose={onClose}>
            {renderMenuItems()}
        </MuiMenu>
    );
}
