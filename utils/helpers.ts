import { format, parseISO } from "date-fns";

export const formatDate = (dateFormat: string | undefined, date: string | null | undefined): string | null => {
  if (!date) return null;

  return format(parseISO(date), dateFormat || "MM/dd/yyyy");
};

interface SubSubMenu {
  id: string;
  path?: string;
}

interface SubMenu {
  id: string;
  path?: string;
  subSubMenu?: SubSubMenu[];
}

interface MenuItem {
  id: string;
  path?: string;
  subMenu?: SubMenu[];
}

export const isMenuSelected = (
  menuItems: MenuItem[],
  selectedPath: string
): string[] => {
  const resultIds: string[] = [];

  for (const menu of menuItems) {
    if (menu.path === selectedPath) {
      resultIds.push(menu.id);
    } else if (menu.subMenu) {
      for (const subMenu of menu.subMenu) {
        if (subMenu.path === selectedPath) {
          resultIds.push(menu.id, subMenu.id);
        } else if (subMenu.subSubMenu) {
          for (const subSubMenu of subMenu.subSubMenu) {
            if (subSubMenu.path === selectedPath) {
              resultIds.push(menu.id, subMenu.id, subSubMenu.id);
            }
          }
        }
      }
    }
  }

  return resultIds;
};
