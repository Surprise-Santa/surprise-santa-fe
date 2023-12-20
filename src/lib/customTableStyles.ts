import { TableStyles } from "react-data-table-component";

export const customStyles: TableStyles = {
    table: {
        style: {
            height: "fit-content",
        },
    },
    headRow: {
        style: {
            display: "flex",
            gap: ".5rem",
        },
    },
    headCells: {
        style: {
            padding: "0 10px",
            letterSpacing: "0.2px",
            fontSize: "17px",
        },
    },
    rows: {
        style: {
            display: "flex",
            gap: "0.5rem",
        },
    },
    cells: {
        style: {
            padding: "0 10px",
            letterSpacing: "0.2px",
            fontSize: "17px",
            minWidth: "unset",
        },
    },
};
