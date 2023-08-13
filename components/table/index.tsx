import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../../services/context";
import styles from "./styles.module.scss";
import axios from "axios";
import { Column, TableData } from "../../types";

const columns: readonly Column[] = [
  { id: "title", label: "Title", minWidth: 170 },
  { id: "genres", label: "Genre", minWidth: 100 },
  {
    id: "type",
    label: "Type",
    minWidth: 170,
  },
  {
    id: "year",
    label: "Year",
    minWidth: 170,
  },
];

function createData(
  title: string,
  genres: string,
  type: string,
  year: string
): TableData {
  return { title, genres, type, year };
}

type TableProps = {
  genres: any;
  titleType: string;
};

export default function StickyHeadTable({ genres, titleType }: TableProps) {
  const { tableData, setTableData } = useGlobalContext();

  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [rows, setRows] = useState<any>([]);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const addDataToRows = () => {
    const computedRows = tableData?.map(
      (row: { title: string; genres: string; type: string; year: string }) =>
        createData(row.title, row.genres, row.type, row.year)
    );
    setRows(computedRows);
  };

  useEffect(() => {
    addDataToRows();
  }, [tableData]);

  useEffect(() => {
    let relatedMovies = [];

    if (genres && titleType) {
      const limit = 50 / genres?.length;
      const fetchPromises = genres?.map(async (genre: { id: string }) => {
        const options = {
          method: "GET",
          url: `${process.env.NEXT_PUBLIC_MOVIES_DB_DOMAIN}/titles`,
          params: {
            titleType,
            genre: genre.id,
            info: "base_info",
            limit,
          },
          headers: {
            "X-RapidAPI-Key": process.env.NEXT_PUBLIC_MOVIES_DB_API_KEY,
            "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
          },
        };

        try {
          const response = await axios(options);
          return response.data.results;
        } catch (error) {
          console.error("Error fetching data:", error);
          return [];
        }
      });

      Promise.all(fetchPromises)
        .then((results) => {
          relatedMovies = results.flat();
          setTableData(relatedMovies);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [genres, titleType]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    if (search === "") {
      setRows(tableData);
      return;
    }

    const filteredData = tableData.filter(
      (row: {
        title: string;
        genres: string;
        type: string;
        year: { toString: () => string | string[] };
      }) =>
        row.title.toLowerCase().includes(search) ||
        row.genres.toLowerCase().includes(search) ||
        row.type.toLowerCase().includes(search) ||
        row.year.toString().includes(search)
    );

    setRows(filteredData);
  }, [search]);

  const handleSearch = (value: string) => {
    const searchTerm = value.toLowerCase();
    setSearch(searchTerm);
  };

  return (
    <>
      <input
        className={styles["search-input"]}
        type="text"
        name="search"
        placeholder="Search title, genre, type, year..."
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column, index: number) => (
                  <TableCell key={index} style={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: any, index: number) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return <TableCell key={column.id}>{value}</TableCell>;
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
